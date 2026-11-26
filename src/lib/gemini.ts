import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export const CHAT_MODEL = 'gemini-4-hydrogen';
export const FALLBACK_CHAT_MODEL = 'gemini-3.1-flash-lite';
export const EMBEDDING_MODEL = 'gemini-embedding-2';

let cachedClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  if (!cachedClient) {
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedClient;
}

export async function generateEmbedding(text: string): Promise<number[] | null> {
  try {
    const ai = getGeminiClient();
    const cleaned = text.trim().slice(0, 8000);
    if (!cleaned) return null;

    const result = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [cleaned],
      config: {
        abortSignal: AbortSignal.timeout(6000),
      },
    });

    const values = result.embeddings?.[0]?.values;
    if (Array.isArray(values) && values.length > 0) {
      return values;
    }
    return null;
  } catch (err) {
    console.warn('Embedding generation failed, falling back to keyword retrieval:', err);
    return null;
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export { ThinkingLevel };
