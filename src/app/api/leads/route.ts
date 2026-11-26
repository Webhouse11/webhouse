import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { authenticateAdminRequest } from '@/src/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authResult = authenticateAdminRequest(request);
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    const safeName = typeof name === 'string' ? name.trim().slice(0, 120) : '';
    const safeEmail = typeof email === 'string' ? email.trim().slice(0, 150) : '';
    const safePhone = typeof phone === 'string' ? phone.trim().slice(0, 50) : '';
    const safeMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : '';

    if (!safeName || !safeEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const info = db
      .prepare('INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)')
      .run(safeName, safeEmail, safePhone, safeMessage);
    return NextResponse.json({ id: info.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}
