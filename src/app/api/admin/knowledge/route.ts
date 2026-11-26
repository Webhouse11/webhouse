import crypto from 'crypto';
import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { authenticateAdminRequest } from '@/src/lib/auth';
import { chunkDocumentText, indexKnowledgeItem, KnowledgeRow } from '@/src/lib/rag';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor', 'viewer']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category')?.trim() || '';
  const query = searchParams.get('q')?.trim().toLowerCase() || '';

  const rows = db
    .prepare('SELECT * FROM knowledge_items ORDER BY updated_at DESC')
    .all() as KnowledgeRow[];

  const filtered = rows
    .filter((r) => {
      if (category && category !== 'all' && r.category !== category) return false;
      if (query) {
        const hay = `${r.title} ${r.category} ${r.content} ${r.tags}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    })
    .map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      source_url: r.source_url,
      content: r.content,
      tags: (() => {
        try {
          return JSON.parse(r.tags || '[]');
        } catch {
          return [];
        }
      })(),
      hasEmbedding: Boolean(r.embedding),
      is_active: r.is_active === 1,
      updated_by: r.updated_by,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));

  return NextResponse.json({ items: filtered });
}

export async function POST(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const title = typeof body.title === 'string' ? body.title.trim().slice(0, 200) : '';
    const category = typeof body.category === 'string' ? body.category.trim().slice(0, 60) : 'general';
    const sourceUrl = typeof body.source_url === 'string' ? body.source_url.trim().slice(0, 200) : '/';
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const tags: string[] = Array.isArray(body.tags)
      ? body.tags.map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 20)
      : [];
    const chunkDocument = body.chunkDocument === true;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const createdIds: string[] = [];

    if (chunkDocument && content.length > 1500) {
      const chunks = chunkDocumentText(content, 1400).slice(0, 30);
      for (let i = 0; i < chunks.length; i++) {
        const id = `kb-doc-${crypto.randomUUID().slice(0, 8)}`;
        const chunkTitle = chunks.length > 1 ? `${title} (Part ${i + 1}/${chunks.length})` : title;
        db.prepare(
          `INSERT INTO knowledge_items (id, title, category, source_url, content, tags, is_active, updated_by)
           VALUES (?, ?, ?, ?, ?, ?, 1, ?)`
        ).run(id, chunkTitle, category, sourceUrl, chunks[i], JSON.stringify(tags), auth.user.email);
        createdIds.push(id);
        await indexKnowledgeItem(id);
      }
    } else {
      const id = `kb-${crypto.randomUUID().slice(0, 8)}`;
      db.prepare(
        `INSERT INTO knowledge_items (id, title, category, source_url, content, tags, is_active, updated_by)
         VALUES (?, ?, ?, ?, ?, ?, 1, ?)`
      ).run(id, title, category, sourceUrl, content.slice(0, 15000), JSON.stringify(tags), auth.user.email);
      createdIds.push(id);
      await indexKnowledgeItem(id);
    }

    return NextResponse.json({ success: true, createdIds });
  } catch (err) {
    console.error('Create knowledge error:', err);
    return NextResponse.json({ error: 'Failed to create knowledge entry.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const id = typeof body.id === 'string' ? body.id.trim() : '';
    if (!id) {
      return NextResponse.json({ error: 'Knowledge ID is required.' }, { status: 400 });
    }

    const existing = db.prepare('SELECT * FROM knowledge_items WHERE id = ?').get(id) as KnowledgeRow | undefined;
    if (!existing) {
      return NextResponse.json({ error: 'Knowledge entry not found.' }, { status: 404 });
    }

    const title = typeof body.title === 'string' ? body.title.trim().slice(0, 200) : existing.title;
    const category = typeof body.category === 'string' ? body.category.trim().slice(0, 60) : existing.category;
    const sourceUrl = typeof body.source_url === 'string' ? body.source_url.trim().slice(0, 200) : existing.source_url;
    const content = typeof body.content === 'string' ? body.content.trim().slice(0, 15000) : existing.content;
    const tags = Array.isArray(body.tags)
      ? JSON.stringify(body.tags.map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 20))
      : existing.tags;
    const isActive = typeof body.is_active === 'boolean' ? (body.is_active ? 1 : 0) : existing.is_active;

    db.prepare(
      `UPDATE knowledge_items
       SET title = ?, category = ?, source_url = ?, content = ?, tags = ?, is_active = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(title, category, sourceUrl, content, tags, isActive, auth.user.email, id);

    const indexed = isActive === 1 ? await indexKnowledgeItem(id) : false;

    return NextResponse.json({ success: true, indexed });
  } catch (err) {
    console.error('Update knowledge error:', err);
    return NextResponse.json({ error: 'Failed to update knowledge entry.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim();
  if (!id) {
    return NextResponse.json({ error: 'Knowledge ID is required.' }, { status: 400 });
  }

  const info = db.prepare('DELETE FROM knowledge_items WHERE id = ?').run(id);
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Knowledge entry not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
