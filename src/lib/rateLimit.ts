interface Bucket {
  timestamps: number[];
}

const globalForRateLimit = globalThis as unknown as {
  __webhouseRateBuckets?: Map<string, Bucket>;
};

const buckets =
  globalForRateLimit.__webhouseRateBuckets || new Map<string, Bucket>();
if (!globalForRateLimit.__webhouseRateBuckets) {
  globalForRateLimit.__webhouseRateBuckets = buckets;
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const existing = buckets.get(key) || { timestamps: [] };
  const active = existing.timestamps.filter((t) => t > cutoff);

  if (active.length >= maxRequests) {
    const oldest = active[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, { timestamps: active });
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  active.push(now);
  buckets.set(key, { timestamps: active });

  if (buckets.size > 5000) {
    for (const [k, b] of buckets.entries()) {
      const fresh = b.timestamps.filter((t) => t > cutoff);
      if (fresh.length === 0) buckets.delete(k);
      else buckets.set(k, { timestamps: fresh });
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - active.length,
    retryAfterSeconds: 0,
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'anonymous';
}
