import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Define DB path relative to process.cwd() or similar
// In these environments, '.' is usually the project root
const dbPath = path.resolve(process.cwd(), 'webhouse.db');

// Ensure directory exists if we were putting it in a subdir, 
// but it's in root so it's fine.

// Use a global variable to preserve the database connection across hot reloads in development
const globalForDb = global as unknown as { db: Database.Database | undefined };

let db: Database.Database;

try {
  if (globalForDb.db) {
    db = globalForDb.db;
  } else {
    db = new Database(dbPath, { timeout: 10000 }); // Add timeout to prevent indefinite hang
    if (process.env.NODE_ENV !== 'production') {
      globalForDb.db = db;
    }
  }
} catch (error) {
  console.error("Database connection error:", error);
  // Fallback to in-memory if disk is unavailable/locked
  db = new Database(':memory:');
}

// Initialize tables
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
  `);
} catch (error) {
  console.error("Database schema initialization error:", error);
}

export default db;
