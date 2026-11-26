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
  `);

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
} catch (error) {
  console.warn('Database schema initialization skipped or failed (possibly read-only environment):', error);
}

export default db;
