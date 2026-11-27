import Database from 'better-sqlite3';
import path from 'path';
import { WEBHOUSE_KNOWLEDGE_SEED } from '@/src/lib/knowledgeSeed';

const dbPath = path.resolve(process.cwd(), 'webhouse.db');

const globalForDb = global as unknown as { db: Database.Database | undefined };

let db: Database.Database;

try {
  if (globalForDb.db) {
    db = globalForDb.db;
  } else {
    db = new Database(dbPath, { timeout: 10000 });
    db.pragma('journal_mode = WAL');
    if (process.env.NODE_ENV !== 'production') {
      globalForDb.db = db;
    }
  }
} catch (error) {
  console.warn('Standard database connection failed, attempting readonly mode:', error);
  try {
    db = new Database(dbPath, { readonly: true, timeout: 10000 });
  } catch (readOnlyError) {
    console.error('Database connection error (both RW and RO):', readOnlyError);
    db = new Database(':memory:');
  }
}

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      slug TEXT UNIQUE,
      content TEXT,
      excerpt TEXT,
      category TEXT,
      author TEXT,
      image_url TEXT,
      meta_title TEXT,
      meta_description TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS knowledge_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      source_url TEXT DEFAULT '',
      content TEXT NOT NULL,
      tags TEXT DEFAULT '[]',
      embedding TEXT DEFAULT NULL,
      is_active INTEGER DEFAULT 1,
      updated_by TEXT DEFAULT 'system',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id TEXT PRIMARY KEY,
      visitor_name TEXT,
      visitor_email TEXT,
      visitor_phone TEXT,
      detected_intent TEXT,
      recommended_service TEXT,
      message_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      retrieved_ids TEXT DEFAULT '[]',
      answered INTEGER DEFAULT 1,
      latency_ms INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      full_name TEXT NOT NULL,
      business_name TEXT DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_interest TEXT NOT NULL,
      project_description TEXT NOT NULL,
      estimated_budget TEXT DEFAULT '',
      preferred_contact TEXT DEFAULT 'WhatsApp',
      consent_given INTEGER NOT NULL DEFAULT 1,
      status TEXT DEFAULT 'new',
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS unanswered_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      question TEXT NOT NULL,
      assistant_response TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS usage_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      endpoint TEXT NOT NULL,
      model TEXT NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT DEFAULT '',
      latency_ms INTEGER DEFAULT 0,
      prompt_tokens INTEGER DEFAULT 0,
      output_tokens INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'editor',
      password_hash TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ai_providers (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1,
      is_primary INTEGER NOT NULL DEFAULT 0,
      priority_order INTEGER NOT NULL,
      selected_model TEXT NOT NULL,
      allow_paid_models INTEGER NOT NULL DEFAULT 0,
      daily_request_limit INTEGER NOT NULL DEFAULT 500,
      monthly_budget_usd REAL NOT NULL DEFAULT 0,
      estimated_spend_usd REAL NOT NULL DEFAULT 0,
      encrypted_api_key TEXT DEFAULT '',
      encrypted_account_id TEXT DEFAULT '',
      circuit_state TEXT NOT NULL DEFAULT 'closed',
      consecutive_failures INTEGER NOT NULL DEFAULT 0,
      cooldown_until DATETIME DEFAULT NULL,
      last_error TEXT DEFAULT '',
      last_error_code INTEGER DEFAULT NULL,
      last_latency_ms INTEGER DEFAULT 0,
      last_success_at DATETIME DEFAULT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ai_global_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations for existing usage_logs table
  const usageCols = db.prepare('PRAGMA table_info(usage_logs)').all() as Array<{ name: string }>;
  const usageColNames = new Set(usageCols.map((c) => c.name));
  if (!usageColNames.has('provider')) {
    db.exec(`ALTER TABLE usage_logs ADD COLUMN provider TEXT DEFAULT 'gemini'`);
  }
  if (!usageColNames.has('estimated_cost_usd')) {
    db.exec(`ALTER TABLE usage_logs ADD COLUMN estimated_cost_usd REAL DEFAULT 0`);
  }

  // Seed default knowledge base if empty
  const countRow = db.prepare('SELECT COUNT(*) as count FROM knowledge_items').get() as { count: number };
  if (countRow.count === 0) {
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO knowledge_items (id, title, category, source_url, content, tags, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, 'system_seed')
    `);
    const seedTransaction = db.transaction(() => {
      for (const item of WEBHOUSE_KNOWLEDGE_SEED) {
        insertStmt.run(
          item.id,
          item.title,
          item.category,
          item.source_url,
          item.content,
          JSON.stringify(item.tags)
        );
      }
    });
    seedTransaction();
  }

  // Seed default multi-provider configuration if empty (Groq Primary -> OpenRouter -> Gemini -> Cloudflare)
  const providerCount = db.prepare('SELECT COUNT(*) as count FROM ai_providers').get() as { count: number };
  if (providerCount.count === 0) {
    const insertProvider = db.prepare(`
      INSERT OR IGNORE INTO ai_providers (
        id, display_name, enabled, is_primary, priority_order,
        selected_model, allow_paid_models, daily_request_limit, monthly_budget_usd
      ) VALUES (?, ?, ?, ?, ?, ?, 0, ?, 0)
    `);
    const seedProviders = db.transaction(() => {
      insertProvider.run('groq', 'Groq Cloud', 1, 1, 1, 'llama-3.3-70b-versatile', 1000);
      insertProvider.run('openrouter', 'OpenRouter', 1, 0, 2, 'openrouter/free', 500);
      insertProvider.run('gemini', 'Google Gemini', 1, 0, 3, 'gemini-4-hydrogen', 500);
      insertProvider.run('cloudflare', 'Cloudflare Workers AI', 0, 0, 4, '@cf/meta/llama-3.3-70b-instruct-fp8-fast', 500);
    });
    seedProviders();
  } else {
    db.prepare(
      `UPDATE ai_providers SET selected_model = 'openrouter/free' WHERE id = 'openrouter' AND selected_model = 'meta-llama/llama-3.3-70b-instruct:free'`
    ).run();
  }

  // Seed default global cost/usage settings
  const insertSetting = db.prepare(`INSERT OR IGNORE INTO ai_global_settings (key, value) VALUES (?, ?)`);
  insertSetting.run('max_monthly_spend_usd', '0');
  insertSetting.run('allow_paid_fallback', '0');
} catch (error) {
  console.warn('Database schema initialization skipped or failed (possibly read-only environment):', error);
}

export default db;
