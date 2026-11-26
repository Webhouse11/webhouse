import crypto from 'crypto';
import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { authenticateAdminRequest } from '@/src/lib/auth';
import { indexKnowledgeItem } from '@/src/lib/rag';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = typeof body.status === 'string' ? body.status : 'resolved';
    const addToKnowledge = body.addToKnowledge === true;
    const kbTitle = typeof body.kbTitle === 'string' ? body.kbTitle.trim().slice(0, 200) : '';
    const kbCategory = typeof body.kbCategory === 'string' ? body.kbCategory.trim().slice(0, 60) : 'faq';
    const kbContent = typeof body.kbContent === 'string' ? body.kbContent.trim().slice(0, 10000) : '';

    if (!id) {
      return NextResponse.json({ error: 'Valid unanswered question ID is required.' }, { status: 400 });
    }

    let createdKbId: string | null = null;
    if (addToKnowledge && kbTitle && kbContent) {
      createdKbId = `kb-faq-${crypto.randomUUID().slice(0, 8)}`;
      db.prepare(
        `INSERT INTO knowledge_items (id, title, category, source_url, content, tags, is_active, updated_by)
         VALUES (?, ?, ?, '/contact', ?, ?, 1, ?)`
      ).run(createdKbId, kbTitle, kbCategory, kbContent, JSON.stringify(['faq', 'admin-resolved']), auth.user.email);
      await indexKnowledgeItem(createdKbId);
    }

    db.prepare('UPDATE unanswered_questions SET status = ? WHERE id = ?').run(status, id);
    return NextResponse.json({ success: true, createdKbId });
  } catch (err) {
    console.error('Unanswered update error:', err);
    return NextResponse.json({ error: 'Failed to update unanswered question.' }, { status: 500 });
  }
}
