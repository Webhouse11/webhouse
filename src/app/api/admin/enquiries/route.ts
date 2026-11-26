import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { authenticateAdminRequest } from '@/src/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor', 'viewer']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status')?.trim() || '';

  const enquiries = statusFilter && statusFilter !== 'all'
    ? db.prepare('SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC').all(statusFilter)
    : db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();

  const legacyLeads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 50').all();

  return NextResponse.json({ enquiries, legacyLeads });
}

export async function PATCH(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = typeof body.status === 'string' ? body.status.trim() : '';
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 2000) : '';

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'archived'];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Valid enquiry ID and status are required.' }, { status: 400 });
    }

    const info = db
      .prepare('UPDATE enquiries SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, notes, id);

    if (info.changes === 0) {
      return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update enquiry.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  if (!id) {
    return NextResponse.json({ error: 'Valid enquiry ID is required.' }, { status: 400 });
  }

  db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
  return NextResponse.json({ success: true });
}
