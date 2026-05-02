import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET() {
  try {
    const posts = db.prepare("SELECT * FROM blog_posts ORDER BY published_at DESC").all();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, category, image_url } = body;
    const info = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt, content, author, category, image_url);
    return NextResponse.json({ id: info.lastInsertRowid });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
