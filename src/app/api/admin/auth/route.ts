import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import {
  authenticateAdminRequest,
  hashPassword,
  isAdminInitialized,
  signAdminToken,
  verifyEnvPasscode,
  verifyPassword,
  AdminRole,
} from '@/src/lib/auth';
import { checkRateLimit, getClientIp } from '@/src/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const initialized = isAdminInitialized();
  const envPasscodeConfigured = Boolean(process.env.ADMIN_PASSCODE?.trim());

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const res = authenticateAdminRequest(request);
    if ('user' in res) {
      return NextResponse.json({ initialized, envPasscodeConfigured, user: res.user });
    }
  }

  return NextResponse.json({ initialized, envPasscodeConfigured, user: null });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`admin-auth:${clientIp}`, 15, 10 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Too many authentication attempts. Try again in ${rate.retryAfterSeconds}s.` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const action = typeof body.action === 'string' ? body.action : 'login';

    if (action === 'setup') {
      const existingCount = (db.prepare('SELECT COUNT(*) as c FROM admin_users').get() as { c: number }).c;
      if (existingCount > 0) {
        return NextResponse.json(
          { error: 'Admin system is already initialized. Please sign in.' },
          { status: 403 }
        );
      }

      const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 150) : '';
      const password = typeof body.password === 'string' ? body.password : '';

      if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
        return NextResponse.json(
          { error: 'Please enter your name, a valid email, and a password of at least 8 characters.' },
          { status: 400 }
        );
      }

      const passwordHash = hashPassword(password);
      const info = db
        .prepare('INSERT INTO admin_users (email, name, role, password_hash, is_active) VALUES (?, ?, ?, ?, 1)')
        .run(email, name, 'super_admin', passwordHash);

      const user = { id: Number(info.lastInsertRowid), email, name, role: 'super_admin' as AdminRole };
      const token = signAdminToken(user);
      return NextResponse.json({ success: true, token, user });
    }

    if (typeof body.passcode === 'string' && body.passcode.trim()) {
      if (!verifyEnvPasscode(body.passcode.trim())) {
        return NextResponse.json({ error: 'Invalid admin passcode.' }, { status: 401 });
      }
      const user = {
        id: 0,
        email: 'owner@webhousemedia.com.ng',
        name: 'Webhouse Super Admin',
        role: 'super_admin' as AdminRole,
      };
      const token = signAdminToken(user);
      return NextResponse.json({ success: true, token, user });
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const row = db
      .prepare('SELECT id, email, name, role, password_hash, is_active FROM admin_users WHERE email = ?')
      .get(email) as
      | { id: number; email: string; name: string; role: AdminRole; password_hash: string; is_active: number }
      | undefined;

    if (!row || row.is_active !== 1 || !verifyPassword(password, row.password_hash)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const user = { id: row.id, email: row.email, name: row.name, role: row.role };
    const token = signAdminToken(user);
    return NextResponse.json({ success: true, token, user });
  } catch (err) {
    console.error('Admin auth error:', err);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
