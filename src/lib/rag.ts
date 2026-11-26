import db from '@/src/lib/db';
import { cosineSimilarity, generateEmbedding } from '@/src/lib/gemini';

export interface KnowledgeRow {
  id: string;
  title: string;
  category: string;
  source_url: string;
  content: string;
  tags: string;
  embedding: string | null;
  is_active: number;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface RetrievedChunk {
  id: string;
  title: string;
  category: string;
  sourceUrl: string;
  content: string;
  score: number;
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'can', 'may', 'might', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
  'about', 'and', 'or', 'but', 'if', 'then', 'than', 'that', 'this', 'these',
  'those', 'it', 'its', 'you', 'your', 'we', 'our', 'me', 'my', 'i', 'how',
  'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'much', 'many',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9₦$]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

function computeKeywordScore(query: string, doc: { title: string; category: string; tags: string[]; content: string }): number {
  const qLower = query.toLowerCase();
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return 0;

  const titleLower = doc.title.toLowerCase();
  const contentLower = doc.content.toLowerCase();
  const tagsLower = doc.tags.map((t) => t.toLowerCase());

  let score = 0;

  for (const token of qTokens) {
    if (titleLower.includes(token)) score += 3.0;
    if (tagsLower.some((tag) => tag.includes(token))) score += 2.5;
    if (doc.category.toLowerCase().includes(token)) score += 1.5;

    const regex = new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    const matches = contentLower.match(regex);
    if (matches) {
      score += Math.min(matches.length, 5) * 0.7;
    } else if (contentLower.includes(token)) {
      score += 0.4;
    }
  }

  const highSignalPhrases = [
    'brandbox', 'postpilot', 'digitacademy', 'bulk video', 'ai video',
    'sales funnel', 'e-commerce', 'ecommerce', 'whatsapp', 'pricing', 'cost',
    'how much', 'academy', 'course', 'portfolio', 'case study', 'contact',
    'privacy', 'terms', 'refund', 'saas', 'mobile app', 'website', 'product research',
  ];
  for (const phrase of highSignalPhrases) {
    if (qLower.includes(phrase)) {
      if (titleLower.includes(phrase) || tagsLower.some((t) => t.includes(phrase))) {
        score += 4.5;
      } else if (contentLower.includes(phrase)) {
        score += 2.0;
      }
    }
  }

  return Math.min(1, score / (qTokens.length * 4.5));
}

export async function retrieveKnowledge(query: string, topK = 6): Promise<{
  chunks: RetrievedChunk[];
  topScore: number;
  usedVectorSearch: boolean;
}> {
  const rows = db
    .prepare('SELECT * FROM knowledge_items WHERE is_active = 1')
    .all() as KnowledgeRow[];

  const blogRows = db
    .prepare('SELECT id, title, slug, excerpt, content, category FROM blog_posts ORDER BY published_at DESC LIMIT 20')
    .all() as Array<{ id: number; title: string; slug: string; excerpt: string; content: string; category: string }>;

  const hasAnyEmbedding = rows.some((r) => Boolean(r.embedding));
  let queryEmbedding: number[] | null = null;
  if (hasAnyEmbedding) {
    queryEmbedding = await generateEmbedding(query);
  }

  const scored: RetrievedChunk[] = [];

  for (const row of rows) {
    let parsedTags: string[] = [];
    try {
      parsedTags = JSON.parse(row.tags || '[]');
    } catch {
      parsedTags = [];
    }

    const kwScore = computeKeywordScore(query, {
      title: row.title,
      category: row.category,
      tags: parsedTags,
      content: row.content,
    });

    let vecScore = 0;
    if (queryEmbedding && row.embedding) {
      try {
        const docVec = JSON.parse(row.embedding) as number[];
        const sim = cosineSimilarity(queryEmbedding, docVec);
        vecScore = Math.max(0, sim);
      } catch {
        vecScore = 0;
      }
    }

    const combined =
      queryEmbedding && row.embedding
        ? vecScore * 0.6 + kwScore * 0.4
        : kwScore;

    scored.push({
      id: row.id,
      title: row.title,
      category: row.category,
      sourceUrl: row.source_url || '/',
      content: row.content,
      score: Number(combined.toFixed(4)),
    });
  }

  for (const post of blogRows) {
    const text = `${post.excerpt || ''}\n${post.content || ''}`.trim();
    if (!text) continue;
    const kwScore = computeKeywordScore(query, {
      title: post.title || 'Blog Post',
      category: 'blog',
      tags: [post.category || 'blog'],
      content: text,
    });
    if (kwScore > 0.12) {
      scored.push({
        id: `blog-${post.id}`,
        title: `Blog Article: ${post.title}`,
        category: 'blog',
        sourceUrl: `/blog/${post.slug}`,
        content: text.slice(0, 1800),
        score: Number((kwScore * 0.85).toFixed(4)),
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const selected = scored.slice(0, topK);
  const topScore = selected[0]?.score ?? 0;

  return {
    chunks: selected,
    topScore,
    usedVectorSearch: Boolean(queryEmbedding),
  };
}

export async function indexKnowledgeItem(id: string): Promise<boolean> {
  const row = db.prepare('SELECT * FROM knowledge_items WHERE id = ?').get(id) as KnowledgeRow | undefined;
  if (!row) return false;

  const textForEmbedding = `${row.title}\nCategory: ${row.category}\nTags: ${row.tags}\n${row.content}`;
  const vector = await generateEmbedding(textForEmbedding);
  if (!vector) return false;

  db.prepare('UPDATE knowledge_items SET embedding = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(
    JSON.stringify(vector),
    id
  );
  return true;
}

export async function reindexAllKnowledge(forceAll = false): Promise<{
  total: number;
  indexed: number;
  failed: number;
}> {
  const rows = (forceAll
    ? db.prepare('SELECT id FROM knowledge_items WHERE is_active = 1').all()
    : db.prepare('SELECT id FROM knowledge_items WHERE is_active = 1 AND (embedding IS NULL OR embedding = "")').all()) as Array<{ id: string }>;

  let indexed = 0;
  let failed = 0;

  for (const row of rows) {
    const ok = await indexKnowledgeItem(row.id);
    if (ok) indexed++;
    else failed++;
  }

  const totalRow = db.prepare('SELECT COUNT(*) as count FROM knowledge_items WHERE is_active = 1').get() as { count: number };
  return {
    total: totalRow.count,
    indexed,
    failed,
  };
}

export function chunkDocumentText(text: string, maxChars = 1400): string[] {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];
  if (normalized.length <= maxChars) return [normalized];

  const paragraphs = normalized.split(/\n{2,}/);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    if (current.length + para.length + 2 <= maxChars) {
      current = current ? `${current}\n\n${para}` : para;
    } else {
      if (current) chunks.push(current);
      if (para.length <= maxChars) {
        current = para;
      } else {
        let remaining = para;
        while (remaining.length > maxChars) {
          let splitAt = remaining.lastIndexOf('. ', maxChars);
          if (splitAt < maxChars * 0.4) splitAt = remaining.lastIndexOf(' ', maxChars);
          if (splitAt < 1) splitAt = maxChars;
          chunks.push(remaining.slice(0, splitAt + 1).trim());
          remaining = remaining.slice(splitAt + 1).trim();
        }
        current = remaining;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
