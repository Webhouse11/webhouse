import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("webhouse.db");

// Initialize Database
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

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    icon TEXT,
    features TEXT
  );

  CREATE TABLE IF NOT EXISTS training_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    duration TEXT,
    price TEXT
  );
`);

// Seed initial blog post
const postCount = db.prepare("SELECT COUNT(*) as count FROM blog_posts").get().count;
if (postCount === 0) {
  db.prepare(`
    INSERT INTO blog_posts (title, slug, content, excerpt, category, author, meta_title, meta_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "Building Scalable Digital Systems for 2026",
    "building-scalable-digital-systems-2026",
    "Digital systems are the backbone of modern business...",
    "Learn how to design and build digital infrastructures that scale with your business growth.",
    "Strategy",
    "Webhouse Team",
    "Scalable Digital Systems | Webhouse Media",
    "How to build digital infrastructures for modern business scale."
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/leads", (req, res) => {
    const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
    res.json(leads);
  });

  app.post("/api/leads", (req, res) => {
    const { name, email, phone, message } = req.body;
    const info = db.prepare("INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)").run(name, email, phone, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/leads/:id", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/leads/:id", (req, res) => {
    db.prepare("DELETE FROM leads WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/blog", (req, res) => {
    const posts = db.prepare("SELECT * FROM blog_posts ORDER BY published_at DESC").all();
    res.json(posts);
  });

  app.post("/api/blog", (req, res) => {
    const { title, slug, excerpt, content, author, category, image, icon_name } = req.body;
    const info = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image, icon_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt, content, author, category, image, icon_name);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/blog/:id", (req, res) => {
    db.prepare("DELETE FROM blog_posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/blog/:slug", (req, res) => {
    const post = db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(req.params.slug);
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
