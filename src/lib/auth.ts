import crypto from 'crypto';
import db from '@/src/lib/db';

export type AdminRole = 'super_admin' | 'editor' | 'viewer';

export interface AdminSessionUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

const globalForSecret = globalThis as unknown as { __webhouseSessionSecret?: string };

function getSessionSecret(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16) {
    return process.env.SESSION_SECRET;
  }
  if (!globalForSecret.__webhouseSessionSecret) {
    globalForSecret.__webhouseSessionSecret = crypto.randomBytes(32).toString('hex');
  }
  return globalForSecret.__webhouseSessionSecret;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, originalHex] = parts;
  const derived = crypto.scryptSync(password, salt, 64);
  const original = Buffer.from(originalHex, 'hex');
  if (derived.length !== original.length) return false;
  return crypto.timingSafeEqual(derived, original);
}

export function verifyEnvPasscode(candidate: string): boolean {
  const envPasscode = process.env.ADMIN_PASSCODE?.trim();
  if (!envPasscode) return false;
  const a = crypto.createHash('sha256').update(candidate).digest();
  const b = crypto.createHash('sha256').update(envPasscode).digest();
  return crypto.timingSafeEqual(a, b);
}

export function signAdminToken(user: Omit<AdminSessionUser, 'exp'>, ttlHours = 8): string {
  const payload: AdminSessionUser = {
    ...user,
    exp: Date.now() + ttlHours * 60 * 60 * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token: string): AdminSessionUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', getSessionSecret())
      .update(encodedPayload)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as AdminSessionUser;
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function authenticateAdminRequest(
  request: Request,
  allowedRoles: AdminRole[] = ['super_admin', 'editor', 'viewer']
): { user: AdminSessionUser } | { error: string; status: number } {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized: Missing admin credentials', status: 401 };
  }
  const token = authHeader.slice(7).trim();
  const payload = verifyAdminToken(token);
  if (!payload) {
    return { error: 'Unauthorized: Invalid or expired session', status: 401 };
  }

  if (payload.id > 0) {
    const dbUser = db
      .prepare('SELECT id, email, name, role, is_active FROM admin_users WHERE id = ?')
      .get(payload.id) as { id: number; email: string; name: string; role: AdminRole; is_active: number } | undefined;

    if (!dbUser || dbUser.is_active !== 1) {
      return { error: 'Unauthorized: Account disabled or not found', status: 401 };
    }
    payload.role = dbUser.role;
  }

  if (!allowedRoles.includes(payload.role)) {
    return { error: 'Forbidden: Insufficient role permissions', status: 403 };
  }

  return { user: payload };
}

export function isAdminInitialized(): boolean {
  const envPasscode = process.env.ADMIN_PASSCODE?.trim();
  if (envPasscode) return true;
  const row = db.prepare('SELECT COUNT(*) as count FROM admin_users WHERE is_active = 1').get() as { count: number };
  return row.count > 0;
}
