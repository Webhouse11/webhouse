import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { AdminRole, authenticateAdminRequest, hashPassword } from '@/src/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const users = db
    .prepare('SELECT id, email, name, role, is_active, created_at FROM admin_users ORDER BY created_at DESC')
    .all();

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 150) : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const role = (['super_admin', 'editor', 'viewer'].includes(body.role) ? body.role : 'editor') as AdminRole;

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return NextResponse.json(
        { error: 'Valid name, email, and password (min 8 chars) are required.' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    const info = db
      .prepare('INSERT INTO admin_users (email, name, role, password_hash, is_active) VALUES (?, ?, ?, ?, 1)')
      .run(email, name, role, passwordHash);

    return NextResponse.json({
      success: true,
      user: { id: info.lastInsertRowid, email, name, role, is_active: 1 },
    });
  } catch {
    return NextResponse.json({ error: 'Email already exists or failed to create user.' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!id) {
      return NextResponse.json({ error: 'Valid user ID is required.' }, { status: 400 });
    }
    if (id === auth.user.id) {
      return NextResponse.json({ error: 'Cannot modify your own active super admin status.' }, { status: 400 });
    }

    if (typeof body.is_active === 'boolean') {
      db.prepare('UPDATE admin_users SET is_active = ? WHERE id = ?').run(body.is_active ? 1 : 0, id);
    }
    if (['super_admin', 'editor', 'viewer'].includes(body.role)) {
      db.prepare('UPDATE admin_users SET role = ? WHERE id = ?').run(body.role, id);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update admin user.' }, { status: 500 });
  }
}
