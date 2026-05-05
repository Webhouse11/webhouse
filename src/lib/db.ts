import Database from 'better-sqlite3';
import path from 'path';

// Define DB path relative to project root
const dbPath = path.resolve(process.cwd(), 'webhouse.db');

// Use a global variable to preserve the database connection across hot reloads in development
const globalForDb = global as unknown as { db: Database.Database | undefined };

const db = globalForDb.db ?? new Database(dbPath);

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

// Initialize tables
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
`);

export default db;
