import crypto from 'crypto';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import db from '@/src/lib/db';

export type ProviderId = 'groq' | 'openrouter' | 'gemini' | 'cloudflare';

export interface ProviderModelOption {
  id: string;
  label: string;
  isPaid: boolean;
  inputCostPer1M: number;
  outputCostPer1M: number;
}

export interface ProviderCatalogEntry {
  id: ProviderId;
  name: string;
  description: string;
  envVarName: string;
  secondaryEnvVarName?: string;
  docsUrl: string;
  defaultModel: string;
  models: ProviderModelOption[];
}

export const PROVIDER_CATALOG: Record<ProviderId, ProviderCatalogEntry> = {
  groq: {
    id: 'groq',
    name: 'Groq Cloud',
    description: 'Ultra-fast free-tier inference (Primary default)',
    envVarName: 'GROQ_API_KEY',
    docsUrl: 'https://console.groq.com/keys',
    defaultModel: 'llama-3.3-70b-versatile',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B Versatile (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B Instant (Ultra Fast Free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'qwen/qwen3-32b', label: 'Qwen 3 32B (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'openai/gpt-oss-120b', label: 'GPT-OSS 120B (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
    ],
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    description: 'Multi-model gateway prioritizing free community endpoints',
    envVarName: 'OPENROUTER_API_KEY',
    docsUrl: 'https://openrouter.ai/keys',
    defaultModel: 'openrouter/free',
    models: [
      { id: 'openrouter/free', label: 'OpenRouter Auto Free Router (:free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B IT (:free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'google/gemma-4-26b-a4b-it:free', label: 'Gemma 4 26B A4B IT (:free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'nvidia/nemotron-3.5-lightning:free', label: 'Nemotron 3.5 Lightning (:free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', label: 'Nemotron 3 Nano 30B (:free)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini (Paid — Requires Authorization)', isPaid: true, inputCostPer1M: 0.15, outputCostPer1M: 0.6 },
    ],
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Official Google GenAI SDK provider + Knowledge embeddings',
    envVarName: 'GEMINI_API_KEY',
    docsUrl: 'https://aistudio.google.com/apikey',
    defaultModel: 'gemini-4-hydrogen',
    models: [
      { id: 'gemini-4-hydrogen', label: 'Gemini 4 Hydrogen (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'gemini-3.1-flash-lite', label: 'Gemini 3.1 Flash Lite (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: 'gemini-4-neon', label: 'Gemini 4 Neon (Paid — Requires Authorization)', isPaid: true, inputCostPer1M: 1.25, outputCostPer1M: 5.0 },
    ],
  },
  cloudflare: {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    description: 'Edge inference (10,000 free Neurons/day)',
    envVarName: 'CLOUDFLARE_API_TOKEN',
    secondaryEnvVarName: 'CLOUDFLARE_ACCOUNT_ID',
    docsUrl: 'https://dash.cloudflare.com/',
    defaultModel: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
    models: [
      { id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', label: 'Llama 3.3 70B FP8 Fast (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: '@cf/meta/llama-3.1-8b-instruct-fast', label: 'Llama 3.1 8B Instruct Fast (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
      { id: '@cf/qwen/qwen2.5-coder-32b-instruct', label: 'Qwen 2.5 Coder 32B (Free Tier)', isPaid: false, inputCostPer1M: 0, outputCostPer1M: 0 },
    ],
  },
};

export interface DbProviderRow {
  id: ProviderId;
  display_name: string;
  enabled: number;
  is_primary: number;
  priority_order: number;
  selected_model: string;
  allow_paid_models: number;
  daily_request_limit: number;
  monthly_budget_usd: number;
  estimated_spend_usd: number;
  encrypted_api_key: string;
  encrypted_account_id: string;
  circuit_state: 'closed' | 'open' | 'half_open';
  consecutive_failures: number;
  cooldown_until: string | null;
  last_error: string;
  last_error_code: number | null;
  last_latency_ms: number;
  last_success_at: string | null;
  updated_at: string;
}

const globalForKey = globalThis as unknown as { __webhouseCredEncKey?: Buffer };

function getEncryptionKey(): Buffer {
  const raw = process.env.CREDENTIALS_ENCRYPTION_KEY?.trim() || process.env.SESSION_SECRET?.trim();
  if (raw && raw.length >= 16) {
    return crypto.createHash('sha256').update(raw).digest();
  }
  if (!globalForKey.__webhouseCredEncKey) {
    globalForKey.__webhouseCredEncKey = crypto.randomBytes(32);
  }
  return globalForKey.__webhouseCredEncKey;
}

export function encryptCredential(plain: string): string {
  const trimmed = plain.trim();
  if (!trimmed) return '';
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(trimmed, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptCredential(encoded: string | null | undefined): string {
  if (!encoded || !encoded.includes(':')) return '';
  try {
    const [ivHex, tagHex, dataHex] = encoded.split(':');
    if (!ivHex || !tagHex || !dataHex) return '';
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      getEncryptionKey(),
      Buffer.from(ivHex, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    const plain = Buffer.concat([
      decipher.update(Buffer.from(dataHex, 'hex')),
      decipher.final(),
    ]);
    return plain.toString('utf8');
  } catch {
    return '';
  }
}

export function maskSecret(secret: string): string | null {
  const s = secret.trim();
  if (!s) return null;
  if (s.length <= 8) return '••••••••';
  return `${s.slice(0, 4)}••••${s.slice(-4)}`;
}

function getCleanEnv(name: string): string {
  const val = process.env[name]?.trim() || '';
  if (!val || val === 'MY_GEMINI_API_KEY' || val === 'MY_APP_URL') return '';
  return val;
}

export function resolveProviderCredentials(row: DbProviderRow): {
  apiKey: string;
  accountId: string;
  source: 'admin' | 'env' | 'none';
  configured: boolean;
  maskedKey: string | null;
  maskedAccountId: string | null;
} {
  const catalog = PROVIDER_CATALOG[row.id];
  const adminKey = decryptCredential(row.encrypted_api_key);
  const envKey = getCleanEnv(catalog.envVarName);

  const apiKey = adminKey || envKey;
  const source: 'admin' | 'env' | 'none' = adminKey ? 'admin' : envKey ? 'env' : 'none';

  let accountId = '';
  if (row.id === 'cloudflare') {
    const adminAcc = decryptCredential(row.encrypted_account_id);
    const envAcc = getCleanEnv('CLOUDFLARE_ACCOUNT_ID');
    accountId = adminAcc || envAcc;
  }

  const configured = row.id === 'cloudflare' ? Boolean(apiKey && accountId) : Boolean(apiKey);

  return {
    apiKey,
    accountId,
    source,
    configured,
    maskedKey: maskSecret(apiKey),
    maskedAccountId: accountId ? maskSecret(accountId) : null,
  };
}

export function getGlobalAiSettings(): {
  maxMonthlySpendUsd: number;
  allowPaidFallback: boolean;
} {
  const rows = db.prepare('SELECT key, value FROM ai_global_settings').all() as Array<{
    key: string;
    value: string;
  }>;
  const map = new Map(rows.map((r) => [r.key, r.value]));
  return {
    maxMonthlySpendUsd: Math.max(0, Number(map.get('max_monthly_spend_usd') || '0') || 0),
    allowPaidFallback: map.get('allow_paid_fallback') === '1',
  };
}

export function getDailyProviderUsageCount(providerId: ProviderId): number {
  const row = db
    .prepare(
      `SELECT COUNT(*) as c FROM usage_logs
       WHERE provider = ? AND status = 'success' AND date(created_at) = date('now')`
    )
    .get(providerId) as { c: number } | undefined;
  return row?.c || 0;
}

export function getTotalMonthlySpendUsd(): number {
  const row = db
    .prepare(
      `SELECT COALESCE(SUM(estimated_cost_usd), 0) as total FROM usage_logs
       WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`
    )
    .get() as { total: number } | undefined;
  return Number((row?.total || 0).toFixed(4));
}

export function getModelInfo(providerId: ProviderId, modelId: string): ProviderModelOption {
  const catalog = PROVIDER_CATALOG[providerId];
  return (
    catalog.models.find((m) => m.id === modelId) ||
    catalog.models[0]
  );
}

export function getOrderedProviders(): DbProviderRow[] {
  return db
    .prepare(
      `SELECT * FROM ai_providers
       ORDER BY is_primary DESC, priority_order ASC`
    )
    .all() as DbProviderRow[];
}

export function checkProviderEligibility(
  row: DbProviderRow,
  globalSettings: { maxMonthlySpendUsd: number; allowPaidFallback: boolean },
  totalMonthlySpend: number
): { eligible: boolean; reason?: string } {
  if (row.enabled !== 1) {
    return { eligible: false, reason: 'Disabled by administrator' };
  }

  const creds = resolveProviderCredentials(row);
  if (!creds.configured) {
    return { eligible: false, reason: 'API credentials not configured' };
  }

  if (row.circuit_state === 'open' && row.cooldown_until) {
    const cooldownMs = new Date(row.cooldown_until + 'Z').getTime();
    if (!Number.isNaN(cooldownMs) && Date.now() < cooldownMs) {
      return { eligible: false, reason: `In cooldown until ${row.cooldown_until}` };
    }
    db.prepare(`UPDATE ai_providers SET circuit_state = 'half_open' WHERE id = ?`).run(row.id);
  }

  const dailyUsed = getDailyProviderUsageCount(row.id);
  if (row.daily_request_limit > 0 && dailyUsed >= row.daily_request_limit) {
    return { eligible: false, reason: `Daily limit reached (${dailyUsed}/${row.daily_request_limit})` };
  }

  const modelInfo = getModelInfo(row.id, row.selected_model);
  if (modelInfo.isPaid) {
    if (row.allow_paid_models !== 1 || !globalSettings.allowPaidFallback) {
      return { eligible: false, reason: 'Paid model requires administrator authorization' };
    }
    if (row.monthly_budget_usd <= 0 || row.estimated_spend_usd >= row.monthly_budget_usd) {
      return { eligible: false, reason: 'Provider monthly spending cap reached' };
    }
    if (
      globalSettings.maxMonthlySpendUsd <= 0 ||
      totalMonthlySpend >= globalSettings.maxMonthlySpendUsd
    ) {
      return { eligible: false, reason: 'Global monthly spending cap reached' };
    }
  }

  return { eligible: true };
}

class ProviderHttpError extends Error {
  statusCode: number;
  retryAfterSeconds?: number;
  category: 'auth' | 'rate_limit' | 'transient';

  constructor(
    message: string,
    statusCode: number,
    category: 'auth' | 'rate_limit' | 'transient',
    retryAfterSeconds?: number
  ) {
    super(message);
    this.statusCode = statusCode;
    this.category = category;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

function classifyHttpError(status: number, bodyText: string, retryAfterHeader?: string | null): ProviderHttpError {
  const lower = bodyText.toLowerCase();
  let retryAfterSec = retryAfterHeader ? Number(retryAfterHeader) : undefined;
  if (retryAfterSec !== undefined && (Number.isNaN(retryAfterSec) || retryAfterSec <= 0)) {
    retryAfterSec = undefined;
  }

  if (
    status === 401 ||
    status === 403 ||
    lower.includes('api_key_invalid') ||
    lower.includes('invalid api key') ||
    lower.includes('incorrect api key') ||
    lower.includes('authentication') ||
    status === 404
  ) {
    return new ProviderHttpError(bodyText.slice(0, 300), status, 'auth');
  }

  if (
    status === 429 ||
    lower.includes('resource_exhausted') ||
    lower.includes('rate limit') ||
    lower.includes('too many requests') ||
    lower.includes('quota')
  ) {
    return new ProviderHttpError(bodyText.slice(0, 300), status || 429, 'rate_limit', retryAfterSec);
  }

  return new ProviderHttpError(bodyText.slice(0, 300), status || 503, 'transient');
}

export function recordProviderSuccess(
  providerId: ProviderId,
  modelId: string,
  latencyMs: number,
  promptTokens: number,
  outputTokens: number
): number {
  const model = getModelInfo(providerId, modelId);
  const estimatedCost = model.isPaid
    ? (promptTokens / 1_000_000) * model.inputCostPer1M +
      (outputTokens / 1_000_000) * model.outputCostPer1M
    : 0;

  db.prepare(
    `UPDATE ai_providers
     SET circuit_state = 'closed',
         consecutive_failures = 0,
         cooldown_until = NULL,
         last_error = '',
         last_error_code = NULL,
         last_latency_ms = ?,
         estimated_spend_usd = estimated_spend_usd + ?,
         last_success_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).run(latencyMs, estimatedCost, providerId);

  return estimatedCost;
}

export function recordProviderFailure(
  providerId: ProviderId,
  err: unknown
): { category: 'auth' | 'rate_limit' | 'transient'; statusCode: number; message: string } {
  let category: 'auth' | 'rate_limit' | 'transient' = 'transient';
  let statusCode = 503;
  let retryAfterSeconds = 60;
  let message = err instanceof Error ? err.message : String(err);

  if (err instanceof ProviderHttpError) {
    category = err.category;
    statusCode = err.statusCode;
    if (err.retryAfterSeconds) retryAfterSeconds = Math.min(600, Math.max(30, err.retryAfterSeconds));
  } else {
    const lower = message.toLowerCase();
    if (lower.includes('401') || lower.includes('403') || lower.includes('api_key_invalid')) {
      category = 'auth';
      statusCode = lower.includes('401') ? 401 : 403;
    } else if (lower.includes('429') || lower.includes('resource_exhausted') || lower.includes('quota')) {
      category = 'rate_limit';
      statusCode = 429;
      retryAfterSeconds = 120;
    } else if (lower.includes('timeout') || lower.includes('aborted')) {
      category = 'transient';
      statusCode = 504;
    }
  }

  const row = db
    .prepare('SELECT consecutive_failures FROM ai_providers WHERE id = ?')
    .get(providerId) as { consecutive_failures: number } | undefined;
  const nextFailures = (row?.consecutive_failures || 0) + 1;

  let openCircuit = false;
  let cooldownSec = 60;
  if (category === 'auth') {
    openCircuit = true;
    cooldownSec = 900; // 15 minutes until admin fixes config
  } else if (category === 'rate_limit') {
    openCircuit = true;
    cooldownSec = retryAfterSeconds || 120;
  } else if (nextFailures >= 2) {
    openCircuit = true;
    cooldownSec = 60;
  }

  if (openCircuit) {
    db.prepare(
      `UPDATE ai_providers
       SET circuit_state = 'open',
           consecutive_failures = ?,
           cooldown_until = datetime('now', '+' || ? || ' seconds'),
           last_error = ?,
           last_error_code = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(nextFailures, cooldownSec, message.slice(0, 400), statusCode, providerId);
  } else {
    db.prepare(
      `UPDATE ai_providers
       SET consecutive_failures = ?,
           last_error = ?,
           last_error_code = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(nextFailures, message.slice(0, 400), statusCode, providerId);
  }

  return { category, statusCode, message };
}

export interface ConversationTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Keeps recent turns intact while compacting older turns into a brief summary
 * to minimize token usage and preserve continuity across provider switches.
 */
export function compactConversationHistory(
  history: ConversationTurn[],
  keepRecent = 6
): ConversationTurn[] {
  if (history.length <= keepRecent) {
    return history;
  }
  const older = history.slice(0, history.length - keepRecent);
  const recent = history.slice(history.length - keepRecent);

  const summaryLines = older
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Webhouse AI'}: ${m.content.replace(/\s+/g, ' ').slice(0, 140)}`)
    .slice(-6)
    .join(' | ');

  return [
    {
      role: 'user',
      content: `[Earlier conversation summary for context continuity: ${summaryLines}]`,
    },
    {
      role: 'assistant',
      content: 'Got it, continuing seamlessly from our conversation above! 😊',
    },
    ...recent,
  ];
}

export interface StreamCallbacks {
  onText: (chunk: string) => void;
}

export interface StreamOutcome {
  provider: ProviderId;
  model: string;
  promptTokens: number;
  outputTokens: number;
  latencyMs: number;
}

async function streamOpenAiCompatible(
  url: string,
  headers: Record<string, string>,
  model: string,
  systemPrompt: string,
  messages: ConversationTurn[],
  userMessage: string,
  timeoutMs: number,
  callbacks: StreamCallbacks
): Promise<{ promptTokens: number; outputTokens: number }> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: AbortSignal.timeout(timeoutMs),
    body: JSON.stringify({
      model,
      stream: true,
      stream_options: { include_usage: true },
      max_tokens: 750,
      temperature: 0.65,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => response.statusText);
    throw classifyHttpError(response.status, errBody, response.headers.get('retry-after'));
  }

  if (!response.body) {
    throw new ProviderHttpError('Empty response stream from provider', 502, 'transient');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let promptTokens = 0;
  let outputTokens = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || !line.startsWith('data:')) continue;
      const dataStr = line.slice(5).trim();
      if (dataStr === '[DONE]') continue;

      try {
        const parsed = JSON.parse(dataStr);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (typeof delta === 'string' && delta.length > 0) {
          callbacks.onText(delta);
        }
        if (parsed?.usage) {
          promptTokens = parsed.usage.prompt_tokens || promptTokens;
          outputTokens = parsed.usage.completion_tokens || outputTokens;
        }
      } catch {
        // ignore partial SSE comments/keepalives
      }
    }
  }

  return { promptTokens, outputTokens };
}

async function streamGeminiProvider(
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: ConversationTurn[],
  userMessage: string,
  timeoutMs: number,
  callbacks: StreamCallbacks
): Promise<{ promptTokens: number; outputTokens: number }> {
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const contents = [
    ...messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ];

  const useThinking = model === 'gemini-4-hydrogen' || model === 'gemini-4-neon';

  const responseStream = await ai.models.generateContentStream({
    model,
    contents,
    config: useThinking
      ? {
          systemInstruction: systemPrompt,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          abortSignal: AbortSignal.timeout(timeoutMs),
        }
      : {
          systemInstruction: systemPrompt,
          abortSignal: AbortSignal.timeout(timeoutMs),
        },
  });

  let promptTokens = 0;
  let outputTokens = 0;

  for await (const chunk of responseStream) {
    if (chunk.usageMetadata) {
      promptTokens = chunk.usageMetadata.promptTokenCount || promptTokens;
      outputTokens = chunk.usageMetadata.candidatesTokenCount || outputTokens;
    }
    const piece = chunk.text || '';
    if (piece) {
      callbacks.onText(piece);
    }
  }

  return { promptTokens, outputTokens };
}

async function streamCloudflareProvider(
  apiToken: string,
  accountId: string,
  model: string,
  systemPrompt: string,
  messages: ConversationTurn[],
  userMessage: string,
  timeoutMs: number,
  callbacks: StreamCallbacks
): Promise<{ promptTokens: number; outputTokens: number }> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${model}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    signal: AbortSignal.timeout(timeoutMs),
    body: JSON.stringify({
      stream: true,
      max_tokens: 750,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => response.statusText);
    throw classifyHttpError(response.status, errBody, response.headers.get('retry-after'));
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/event-stream')) {
    const data = await response.json();
    const text = data?.result?.response || '';
    if (text) callbacks.onText(text);
    return { promptTokens: 0, outputTokens: 0 };
  }

  if (!response.body) {
    throw new ProviderHttpError('Empty Cloudflare response stream', 502, 'transient');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || !line.startsWith('data:')) continue;
      const dataStr = line.slice(5).trim();
      if (dataStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(dataStr);
        if (typeof parsed?.response === 'string' && parsed.response.length > 0) {
          callbacks.onText(parsed.response);
        }
      } catch {
        // ignore
      }
    }
  }

  return { promptTokens: 0, outputTokens: 0 };
}

async function resolveActiveGroqModel(apiKey: string, excludeModel?: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: Array<{ id?: string }> };
    const candidates = (data.data || [])
      .map((m) => m.id || '')
      .filter(
        (id) =>
          id &&
          id !== excludeModel &&
          !/whisper|tts|orpheus|guard|safeguard|embed/i.test(id)
      );
    if (candidates.length === 0) return null;
    const preferred = [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3-32b',
    ];
    for (const p of preferred) {
      if (candidates.includes(p)) return p;
    }
    return candidates[0];
  } catch {
    return null;
  }
}

export async function runWithProviderFallback(params: {
  sessionId: string;
  systemPrompt: string;
  history: ConversationTurn[];
  userMessage: string;
  callbacks: StreamCallbacks;
}): Promise<StreamOutcome> {
  const ordered = getOrderedProviders();
  const globalSettings = getGlobalAiSettings();
  const totalMonthlySpend = getTotalMonthlySpendUsd();
  const compactedHistory = compactConversationHistory(params.history, 6);

  const eligibleRows: DbProviderRow[] = [];
  for (const row of ordered) {
    const check = checkProviderEligibility(row, globalSettings, totalMonthlySpend);
    if (check.eligible) {
      eligibleRows.push(row);
    }
  }

  if (eligibleRows.length === 0) {
    throw new Error('ALL_PROVIDERS_UNAVAILABLE');
  }

  let lastError: unknown = null;

  for (let i = 0; i < eligibleRows.length; i++) {
    const row = eligibleRows[i];
    const creds = resolveProviderCredentials(row);
    let model = row.selected_model || PROVIDER_CATALOG[row.id].defaultModel;
    const attemptStart = Date.now();
    let emittedAnyText = false;

    const guardedCallbacks: StreamCallbacks = {
      onText: (piece) => {
        if (piece) emittedAnyText = true;
        params.callbacks.onText(piece);
      },
    };

    try {
      let usage = { promptTokens: 0, outputTokens: 0 };

      if (row.id === 'groq') {
        try {
          usage = await streamOpenAiCompatible(
            'https://api.groq.com/openai/v1/chat/completions',
            { Authorization: `Bearer ${creds.apiKey}` },
            model,
            params.systemPrompt,
            compactedHistory,
            params.userMessage,
            10000,
            guardedCallbacks
          );
        } catch (groqErr) {
          const msg = groqErr instanceof Error ? groqErr.message.toLowerCase() : '';
          if (!emittedAnyText && (msg.includes('model_not_found') || msg.includes('does not exist'))) {
            const discovered = await resolveActiveGroqModel(creds.apiKey, model);
            if (discovered) {
              model = discovered;
              db.prepare(`UPDATE ai_providers SET selected_model = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 'groq'`).run(model);
              usage = await streamOpenAiCompatible(
                'https://api.groq.com/openai/v1/chat/completions',
                { Authorization: `Bearer ${creds.apiKey}` },
                model,
                params.systemPrompt,
                compactedHistory,
                params.userMessage,
                10000,
                guardedCallbacks
              );
            } else {
              throw groqErr;
            }
          } else {
            throw groqErr;
          }
        }
      } else if (row.id === 'openrouter') {
        try {
          usage = await streamOpenAiCompatible(
            'https://openrouter.ai/api/v1/chat/completions',
            {
              Authorization: `Bearer ${creds.apiKey}`,
              'HTTP-Referer': 'https://www.webhousemedia.com.ng',
              'X-Title': 'Webhouse AI',
            },
            model,
            params.systemPrompt,
            compactedHistory,
            params.userMessage,
            12000,
            guardedCallbacks
          );
        } catch (orErr) {
          const msg = orErr instanceof Error ? orErr.message.toLowerCase() : '';
          if (!emittedAnyText && model !== 'openrouter/free' && (msg.includes('unavailable for free') || msg.includes('404'))) {
            model = 'openrouter/free';
            db.prepare(`UPDATE ai_providers SET selected_model = 'openrouter/free', updated_at = CURRENT_TIMESTAMP WHERE id = 'openrouter'`).run();
            usage = await streamOpenAiCompatible(
              'https://openrouter.ai/api/v1/chat/completions',
              {
                Authorization: `Bearer ${creds.apiKey}`,
                'HTTP-Referer': 'https://www.webhousemedia.com.ng',
                'X-Title': 'Webhouse AI',
              },
              model,
              params.systemPrompt,
              compactedHistory,
              params.userMessage,
              12000,
              guardedCallbacks
            );
          } else {
            throw orErr;
          }
        }
      } else if (row.id === 'gemini') {
        try {
          usage = await streamGeminiProvider(
            creds.apiKey,
            model,
            params.systemPrompt,
            compactedHistory,
            params.userMessage,
            9000,
            guardedCallbacks
          );
        } catch (geminiErr) {
          const gMsg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);
          const gLower = gMsg.toLowerCase();
          if (
            !emittedAnyText &&
            model !== 'gemini-3.1-flash-lite' &&
            (gLower.includes('503') ||
              gLower.includes('429') ||
              gLower.includes('resource_exhausted') ||
              gLower.includes('timeout') ||
              gLower.includes('aborted'))
          ) {
            // Try free lightweight Gemini model once before leaving Gemini provider
            usage = await streamGeminiProvider(
              creds.apiKey,
              'gemini-3.1-flash-lite',
              params.systemPrompt,
              compactedHistory,
              params.userMessage,
              10000,
              guardedCallbacks
            );
          } else {
            throw geminiErr;
          }
        }
      } else if (row.id === 'cloudflare') {
        usage = await streamCloudflareProvider(
          creds.apiKey,
          creds.accountId,
          model,
          params.systemPrompt,
          compactedHistory,
          params.userMessage,
          12000,
          guardedCallbacks
        );
      }

      const latencyMs = Date.now() - attemptStart;
      const estCost = recordProviderSuccess(
        row.id,
        model,
        latencyMs,
        usage.promptTokens,
        usage.outputTokens
      );

      try {
        db.prepare(
          `INSERT INTO usage_logs (session_id, endpoint, provider, model, status, latency_ms, prompt_tokens, output_tokens, estimated_cost_usd)
           VALUES (?, '/api/chat', ?, ?, 'success', ?, ?, ?, ?)`
        ).run(
          params.sessionId,
          row.id,
          model,
          latencyMs,
          usage.promptTokens,
          usage.outputTokens,
          estCost
        );
      } catch {
        // ignore telemetry log error
      }

      return {
        provider: row.id,
        model,
        promptTokens: usage.promptTokens,
        outputTokens: usage.outputTokens,
        latencyMs,
      };
    } catch (err) {
      lastError = err;
      const failure = recordProviderFailure(row.id, err);
      const latencyMs = Date.now() - attemptStart;

      try {
        db.prepare(
          `INSERT INTO usage_logs (session_id, endpoint, provider, model, status, error_message, latency_ms)
           VALUES (?, '/api/chat', ?, ?, ?, ?, ?)`
        ).run(
          params.sessionId,
          row.id,
          model,
          failure.category === 'rate_limit' ? 'rate_limited' : 'error',
          failure.message.slice(0, 400),
          latencyMs
        );
      } catch {
        // ignore
      }

      // If chunks already streamed to the visitor, cannot switch mid-response cleanly
      if (emittedAnyText) {
        throw err;
      }

      // Otherwise immediately continue to the next eligible fallback provider!
    }
  }

  throw lastError || new Error('ALL_PROVIDERS_UNAVAILABLE');
}

export async function testProviderConnection(providerId: ProviderId): Promise<{
  ok: boolean;
  providerId: ProviderId;
  model: string;
  latencyMs: number;
  reply?: string;
  error?: string;
}> {
  const row = db
    .prepare('SELECT * FROM ai_providers WHERE id = ?')
    .get(providerId) as DbProviderRow | undefined;

  if (!row) {
    return { ok: false, providerId, model: '', latencyMs: 0, error: 'Provider not found' };
  }

  const creds = resolveProviderCredentials(row);
  let model = row.selected_model || PROVIDER_CATALOG[providerId].defaultModel;

  if (!creds.configured) {
    return {
      ok: false,
      providerId,
      model,
      latencyMs: 0,
      error: `Missing credentials (${PROVIDER_CATALOG[providerId].envVarName}).`,
    };
  }

  const start = Date.now();
  let reply = '';
  try {
    if (providerId === 'groq') {
      try {
        await streamOpenAiCompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          { Authorization: `Bearer ${creds.apiKey}` },
          model,
          'Reply concisely.',
          [],
          'Reply with: OK',
          8000,
          { onText: (c) => (reply += c) }
        );
      } catch (groqErr) {
        const msg = groqErr instanceof Error ? groqErr.message.toLowerCase() : '';
        if (msg.includes('model_not_found') || msg.includes('does not exist')) {
          const discovered = await resolveActiveGroqModel(creds.apiKey, model);
          if (discovered) {
            model = discovered;
            db.prepare(`UPDATE ai_providers SET selected_model = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 'groq'`).run(model);
            await streamOpenAiCompatible(
              'https://api.groq.com/openai/v1/chat/completions',
              { Authorization: `Bearer ${creds.apiKey}` },
              model,
              'Reply concisely.',
              [],
              'Reply with: OK',
              8000,
              { onText: (c) => (reply += c) }
            );
          } else {
            throw groqErr;
          }
        } else {
          throw groqErr;
        }
      }
    } else if (providerId === 'openrouter') {
      try {
        await streamOpenAiCompatible(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            Authorization: `Bearer ${creds.apiKey}`,
            'HTTP-Referer': 'https://www.webhousemedia.com.ng',
            'X-Title': 'Webhouse AI',
          },
          model,
          'Reply concisely.',
          [],
          'Reply with: OK',
          10000,
          { onText: (c) => (reply += c) }
        );
      } catch (orErr) {
        const msg = orErr instanceof Error ? orErr.message.toLowerCase() : '';
        if (model !== 'openrouter/free' && (msg.includes('unavailable for free') || msg.includes('404'))) {
          model = 'openrouter/free';
          db.prepare(`UPDATE ai_providers SET selected_model = 'openrouter/free', updated_at = CURRENT_TIMESTAMP WHERE id = 'openrouter'`).run();
          await streamOpenAiCompatible(
            'https://openrouter.ai/api/v1/chat/completions',
            {
              Authorization: `Bearer ${creds.apiKey}`,
              'HTTP-Referer': 'https://www.webhousemedia.com.ng',
              'X-Title': 'Webhouse AI',
            },
            model,
            'Reply concisely.',
            [],
            'Reply with: OK',
            10000,
            { onText: (c) => (reply += c) }
          );
        } else {
          throw orErr;
        }
      }
    } else if (providerId === 'gemini') {
      await streamGeminiProvider(
        creds.apiKey,
        model,
        'Reply concisely.',
        [],
        'Reply with: OK',
        8000,
        { onText: (c) => (reply += c) }
      );
    } else if (providerId === 'cloudflare') {
      await streamCloudflareProvider(
        creds.apiKey,
        creds.accountId,
        model,
        'Reply concisely.',
        [],
        'Reply with: OK',
        10000,
        { onText: (c) => (reply += c) }
      );
    }

    const latencyMs = Date.now() - start;
    recordProviderSuccess(providerId, model, latencyMs, 0, 0);
    return {
      ok: true,
      providerId,
      model,
      latencyMs,
      reply: reply.trim().slice(0, 80) || 'OK',
    };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const failure = recordProviderFailure(providerId, err);
    return {
      ok: false,
      providerId,
      model,
      latencyMs,
      error: `HTTP ${failure.statusCode}: ${failure.message.slice(0, 180)}`,
    };
  }
}
