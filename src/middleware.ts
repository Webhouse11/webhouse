import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic rate limiting map
const ipCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 1000; // Increased for development/preview

// List of common bot user agents to block if suspicious
const BOT_USER_AGENTS = [
  'HTTrack',
  'Wget',
  'curl',
  'python-requests',
  'Go-http-client',
  'Java/',
];

// Block sensitive paths
const SENSITIVE_PATHS = [
  '/.env',
  '/.git',
  '/wp-admin',
  '/wp-login.php',
  '/administrator',
  '/config.php',
  '/node_modules',
];

export function middleware(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;

  // 1. Block sensitive paths
  if (SENSITIVE_PATHS.some(path => pathname.startsWith(path))) {
    console.warn(`[Security] Blocked sensitive path access: ${pathname} from IP: ${ip}`);
    return new NextResponse(null, { status: 403 });
  }

  // 2. Block suspicious bots
  if (BOT_USER_AGENTS.some(bot => userAgent.includes(bot))) {
    // We don't block all curl/wget as developers might use them, 
    // but we can block them if they hit non-api routes frequently
    if (!pathname.startsWith('/api')) {
      console.warn(`[Security] Blocked suspicious bot UA: ${userAgent} from IP: ${ip}`);
      return new NextResponse(null, { status: 403 });
    }
  }

  // 3. Basic Rate Limiting
  const now = Date.now();
  const userData = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  ipCache.set(ip, userData);

  if (userData.count > MAX_REQUESTS) {
    console.error(`[Security] Rate limit exceeded by IP: ${ip}`);
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // 4. Add security headers to the response
  const response = NextResponse.next();
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
