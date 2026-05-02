import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET() {
  try {
    const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    const info = db.prepare("INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)").run(name, email, phone, message);
    return NextResponse.json({ id: info.lastInsertRowid });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}
