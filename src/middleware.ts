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
  return NextResponse.next();
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
