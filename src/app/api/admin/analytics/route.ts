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
  const sessionId = searchParams.get('sessionId')?.trim();

  if (sessionId) {
    const session = db.prepare('SELECT * FROM chat_sessions WHERE id = ?').get(sessionId);
    const messages = db
      .prepare('SELECT id, role, content, answered, latency_ms, created_at FROM chat_messages WHERE session_id = ? ORDER BY id ASC')
      .all(sessionId);
    return NextResponse.json({ session, messages });
  }

  const totalConversations = (db.prepare('SELECT COUNT(*) as c FROM chat_sessions').get() as { c: number }).c;
  const totalMessages = (db.prepare("SELECT COUNT(*) as c FROM chat_messages WHERE role = 'user'").get() as { c: number }).c;
  const totalEnquiries = (db.prepare('SELECT COUNT(*) as c FROM enquiries').get() as { c: number }).c;
  const pendingUnanswered = (db.prepare("SELECT COUNT(*) as c FROM unanswered_questions WHERE status = 'pending'").get() as { c: number }).c;
  const failedResponses = (db.prepare("SELECT COUNT(*) as c FROM usage_logs WHERE status = 'error'").get() as { c: number }).c;
  const rateLimitedCount = (db.prepare("SELECT COUNT(*) as c FROM usage_logs WHERE status = 'rate_limited'").get() as { c: number }).c;

  const tokenStats = db
    .prepare(
      `SELECT COALESCE(AVG(latency_ms), 0) as avgLatency, COALESCE(SUM(prompt_tokens), 0) as totalPromptTokens, COALESCE(SUM(output_tokens), 0) as totalOutputTokens
       FROM usage_logs WHERE status = 'success'`
    )
    .get() as { avgLatency: number; totalPromptTokens: number; totalOutputTokens: number };

  const requestedServices = db
    .prepare(
      `SELECT recommended_service as service, COUNT(*) as count
       FROM chat_sessions
       WHERE recommended_service IS NOT NULL AND recommended_service != ''
       GROUP BY recommended_service
       ORDER BY count DESC
       LIMIT 8`
    )
    .all();

  const topUserQuestions = db
    .prepare(
      `SELECT content as question, COUNT(*) as count
       FROM chat_messages
       WHERE role = 'user'
       GROUP BY LOWER(TRIM(content))
       ORDER BY count DESC, MAX(created_at) DESC
       LIMIT 10`
    )
    .all();

  const recentEnquiries = db
    .prepare('SELECT id, full_name, business_name, service_interest, estimated_budget, status, created_at FROM enquiries ORDER BY created_at DESC LIMIT 8')
    .all();

  const unansweredQuestions = db
    .prepare('SELECT * FROM unanswered_questions ORDER BY created_at DESC LIMIT 50')
    .all();

  const recentSessions = db
    .prepare('SELECT id, visitor_name, detected_intent, recommended_service, message_count, created_at, updated_at FROM chat_sessions ORDER BY updated_at DESC LIMIT 30')
    .all();

  const recentErrors = db
    .prepare("SELECT id, endpoint, COALESCE(provider, 'gemini') as provider, model, status, error_message, created_at FROM usage_logs WHERE status != 'success' ORDER BY created_at DESC LIMIT 15")
    .all();

  const providerBreakdown = db
    .prepare(
      `SELECT COALESCE(provider, 'gemini') as provider,
              COUNT(*) as total,
              SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successes,
              SUM(CASE WHEN status = 'rate_limited' THEN 1 ELSE 0 END) as rateLimits,
              SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors,
              ROUND(AVG(CASE WHEN status = 'success' THEN latency_ms END)) as avgLatencyMs,
              COALESCE(SUM(estimated_cost_usd), 0) as spendUsd
       FROM usage_logs
       GROUP BY COALESCE(provider, 'gemini')`
    )
    .all();

  const kbStats = db
    .prepare(
      `SELECT COUNT(*) as total,
        SUM(CASE WHEN embedding IS NOT NULL AND embedding != '' THEN 1 ELSE 0 END) as indexed
       FROM knowledge_items WHERE is_active = 1`
    )
    .get() as { total: number; indexed: number };

  return NextResponse.json({
    summary: {
      totalConversations,
      totalMessages,
      totalEnquiries,
      pendingUnanswered,
      failedResponses,
      rateLimitedCount,
      avgLatencyMs: Math.round(tokenStats.avgLatency || 0),
      totalPromptTokens: tokenStats.totalPromptTokens || 0,
      totalOutputTokens: tokenStats.totalOutputTokens || 0,
      kbTotal: kbStats.total || 0,
      kbIndexed: kbStats.indexed || 0,
    },
    requestedServices,
    topUserQuestions,
    recentEnquiries,
    unansweredQuestions,
    recentSessions,
    recentErrors,
    providerBreakdown,
  });
}

export async function DELETE(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId')?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required.' }, { status: 400 });
  }

  db.transaction(() => {
    db.prepare('DELETE FROM chat_messages WHERE session_id = ?').run(sessionId);
    db.prepare('DELETE FROM chat_sessions WHERE id = ?').run(sessionId);
  })();

  return NextResponse.json({ success: true });
}
