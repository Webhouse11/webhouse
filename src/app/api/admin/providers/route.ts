import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { authenticateAdminRequest } from '@/src/lib/auth';
import {
  DbProviderRow,
  encryptCredential,
  getDailyProviderUsageCount,
  getGlobalAiSettings,
  getModelInfo,
  getOrderedProviders,
  getTotalMonthlySpendUsd,
  PROVIDER_CATALOG,
  ProviderId,
  resolveProviderCredentials,
  testProviderConnection,
} from '@/src/lib/aiProviders';

export const dynamic = 'force-dynamic';

const VALID_PROVIDERS = new Set<ProviderId>(['groq', 'openrouter', 'gemini', 'cloudflare']);

export async function GET(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor', 'viewer']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const rows = getOrderedProviders();
  const globalSettings = getGlobalAiSettings();
  const totalMonthlySpend = getTotalMonthlySpendUsd();

  const usageByProvider = db
    .prepare(
      `SELECT COALESCE(provider, 'gemini') as provider,
              COUNT(*) as totalRequests,
              SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successCount,
              SUM(CASE WHEN status = 'rate_limited' THEN 1 ELSE 0 END) as rateLimitCount,
              SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errorCount,
              ROUND(AVG(CASE WHEN status = 'success' THEN latency_ms END)) as avgLatencyMs
       FROM usage_logs
       GROUP BY COALESCE(provider, 'gemini')`
    )
    .all() as Array<{
    provider: string;
    totalRequests: number;
    successCount: number;
    rateLimitCount: number;
    errorCount: number;
    avgLatencyMs: number | null;
  }>;

  const usageMap = new Map(usageByProvider.map((u) => [u.provider, u]));

  const providers = rows.map((row) => {
    const creds = resolveProviderCredentials(row);
    const catalog = PROVIDER_CATALOG[row.id];
    const stats = usageMap.get(row.id);
    const dailyUsed = getDailyProviderUsageCount(row.id);
    const modelInfo = getModelInfo(row.id, row.selected_model);

    return {
      id: row.id,
      displayName: row.display_name,
      description: catalog.description,
      envVarName: catalog.envVarName,
      secondaryEnvVarName: catalog.secondaryEnvVarName || null,
      docsUrl: catalog.docsUrl,
      enabled: row.enabled === 1,
      isPrimary: row.is_primary === 1,
      priorityOrder: row.priority_order,
      selectedModel: row.selected_model,
      selectedModelIsPaid: modelInfo.isPaid,
      allowPaidModels: row.allow_paid_models === 1,
      dailyRequestLimit: row.daily_request_limit,
      dailyUsed,
      monthlyBudgetUsd: row.monthly_budget_usd,
      estimatedSpendUsd: Number((row.estimated_spend_usd || 0).toFixed(4)),
      models: catalog.models,
      credentials: {
        configured: creds.configured,
        source: creds.source,
        maskedKey: creds.maskedKey,
        maskedAccountId: creds.maskedAccountId,
      },
      health: {
        circuitState: row.circuit_state,
        consecutiveFailures: row.consecutive_failures,
        cooldownUntil: row.cooldown_until,
        lastError: row.last_error,
        lastErrorCode: row.last_error_code,
        lastLatencyMs: row.last_latency_ms,
        lastSuccessAt: row.last_success_at,
      },
      stats: {
        totalRequests: stats?.totalRequests || 0,
        successCount: stats?.successCount || 0,
        rateLimitCount: stats?.rateLimitCount || 0,
        errorCount: stats?.errorCount || 0,
        avgLatencyMs: Math.round(stats?.avgLatencyMs || row.last_latency_ms || 0),
      },
    };
  });

  return NextResponse.json({
    providers,
    globalSettings: {
      ...globalSettings,
      totalMonthlySpendUsd: totalMonthlySpend,
      encryptionKeyConfigured: Boolean(
        process.env.CREDENTIALS_ENCRYPTION_KEY?.trim() || process.env.SESSION_SECRET?.trim()
      ),
    },
  });
}

export async function PATCH(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();

    // Update global spending controls (Super Admin only)
    if (body.action === 'update_global') {
      if (auth.user.role !== 'super_admin') {
        return NextResponse.json(
          { error: 'Only Super Admins can change global spending budgets.' },
          { status: 403 }
        );
      }

      const maxSpend = Math.max(0, Number(body.maxMonthlySpendUsd) || 0);
      const allowPaidFallback = body.allowPaidFallback === true ? '1' : '0';

      db.prepare(
        `INSERT INTO ai_global_settings (key, value, updated_at) VALUES ('max_monthly_spend_usd', ?, CURRENT_TIMESTAMP)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
      ).run(String(maxSpend));

      db.prepare(
        `INSERT INTO ai_global_settings (key, value, updated_at) VALUES ('allow_paid_fallback', ?, CURRENT_TIMESTAMP)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
      ).run(allowPaidFallback);

      return NextResponse.json({ success: true });
    }

    // Reorder fallback chain
    if (body.action === 'reorder' && Array.isArray(body.order)) {
      const order = body.order.filter((id: unknown): id is ProviderId =>
        typeof id === 'string' && VALID_PROVIDERS.has(id as ProviderId)
      );
      if (order.length > 0) {
        const tx = db.transaction(() => {
          order.forEach((id, idx) => {
            db.prepare(
              `UPDATE ai_providers SET priority_order = ?, is_primary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
            ).run(idx + 1, idx === 0 ? 1 : 0, id);
          });
        });
        tx();
      }
      return NextResponse.json({ success: true });
    }

    const providerId = body.providerId as ProviderId;
    if (!providerId || !VALID_PROVIDERS.has(providerId)) {
      return NextResponse.json({ error: 'Valid providerId is required.' }, { status: 400 });
    }

    const existing = db
      .prepare('SELECT * FROM ai_providers WHERE id = ?')
      .get(providerId) as DbProviderRow | undefined;
    if (!existing) {
      return NextResponse.json({ error: 'Provider not found.' }, { status: 404 });
    }

    // Credentials, budget & paid-model authorization require super_admin
    const touchesSensitive =
      typeof body.apiKey === 'string' ||
      typeof body.accountId === 'string' ||
      body.clearCredentials === true ||
      typeof body.allowPaidModels === 'boolean' ||
      typeof body.monthlyBudgetUsd === 'number';

    if (touchesSensitive && auth.user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only Super Admins can manage API credentials, budgets, or paid models.' },
        { status: 403 }
      );
    }

    const enabled = typeof body.enabled === 'boolean' ? (body.enabled ? 1 : 0) : existing.enabled;
    const allowPaidModels =
      typeof body.allowPaidModels === 'boolean'
        ? body.allowPaidModels
          ? 1
          : 0
        : existing.allow_paid_models;

    let selectedModel = existing.selected_model;
    if (typeof body.selectedModel === 'string' && body.selectedModel.trim()) {
      const candidate = body.selectedModel.trim();
      const catalogEntry = PROVIDER_CATALOG[providerId];
      const modelMeta = catalogEntry.models.find((m) => m.id === candidate);
      if (!modelMeta) {
        return NextResponse.json({ error: 'Unsupported model selected.' }, { status: 400 });
      }
      if (modelMeta.isPaid && allowPaidModels !== 1) {
        return NextResponse.json(
          { error: 'Authorize Paid Models on this provider before selecting a paid model.' },
          { status: 400 }
        );
      }
      selectedModel = candidate;
    }

    const dailyLimit =
      typeof body.dailyRequestLimit === 'number' && body.dailyRequestLimit >= 0
        ? Math.min(100000, Math.round(body.dailyRequestLimit))
        : existing.daily_request_limit;

    const monthlyBudget =
      typeof body.monthlyBudgetUsd === 'number' && body.monthlyBudgetUsd >= 0
        ? Number(body.monthlyBudgetUsd)
        : existing.monthly_budget_usd;

    let encKey = existing.encrypted_api_key;
    let encAccountId = existing.encrypted_account_id;

    if (body.clearCredentials === true) {
      encKey = '';
      encAccountId = '';
    } else {
      if (typeof body.apiKey === 'string' && body.apiKey.trim()) {
        encKey = encryptCredential(body.apiKey);
      }
      if (typeof body.accountId === 'string' && body.accountId.trim()) {
        encAccountId = encryptCredential(body.accountId);
      }
    }

    const tx = db.transaction(() => {
      if (body.setAsPrimary === true) {
        db.prepare(`UPDATE ai_providers SET is_primary = 0`).run();
        db.prepare(
          `UPDATE ai_providers SET is_primary = 1, enabled = 1, priority_order = 1 WHERE id = ?`
        ).run(providerId);

        // Normalize other priority orders sequentially
        const others = db
          .prepare(`SELECT id FROM ai_providers WHERE id != ? ORDER BY priority_order ASC`)
          .all(providerId) as Array<{ id: string }>;
        others.forEach((o, i) => {
          db.prepare(`UPDATE ai_providers SET priority_order = ? WHERE id = ?`).run(i + 2, o.id);
        });
      }

      if (body.resetCircuit === true) {
        db.prepare(
          `UPDATE ai_providers
           SET circuit_state = 'closed', consecutive_failures = 0, cooldown_until = NULL, last_error = '', last_error_code = NULL
           WHERE id = ?`
        ).run(providerId);
      }

      db.prepare(
        `UPDATE ai_providers
         SET enabled = ?,
             selected_model = ?,
             allow_paid_models = ?,
             daily_request_limit = ?,
             monthly_budget_usd = ?,
             encrypted_api_key = ?,
             encrypted_account_id = ?,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      ).run(
        enabled,
        selectedModel,
        allowPaidModels,
        dailyLimit,
        monthlyBudget,
        encKey,
        encAccountId,
        providerId
      );
    });
    tx();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Update provider config error:', err);
    return NextResponse.json({ error: 'Failed to update provider settings.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = authenticateAdminRequest(request, ['super_admin', 'editor']);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const providerId = body.providerId as ProviderId;
    if (!providerId || !VALID_PROVIDERS.has(providerId)) {
      return NextResponse.json({ error: 'Valid providerId is required.' }, { status: 400 });
    }

    const result = await testProviderConnection(providerId);
    return NextResponse.json(result, { status: result.ok ? 200 : 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to test provider connection.' }, { status: 500 });
  }
}
