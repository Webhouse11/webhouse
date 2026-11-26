import { NextResponse } from 'next/server';
import { authenticateAdminRequest } from '@/src/lib/auth';
import { reindexAllKnowledge } from '@/src/lib/rag';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const forceAll = body.forceAll === true;
    const result = await reindexAllKnowledge(forceAll);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('Reindex error:', err);
    return NextResponse.json({ error: 'Failed to reindex knowledge entries.' }, { status: 500 });
  }
}
