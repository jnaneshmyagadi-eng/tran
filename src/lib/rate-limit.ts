/**
 * In-memory rate limiter for free-tier protection.
 * Production should use Redis / Upstash for multi-instance.
 * Never allow unlimited expensive AI calls from anonymous users.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const LIMITS = {
  /** Unauthenticated: max translate calls per IP per hour */
  anon_per_hour: 10,
  /** Authenticated free: max per hour */
  free_per_hour: 60,
  /** Max characters per request */
  max_chars: 5000,
  /** Max audio size bytes (~2 min webm) */
  max_audio_bytes: 3 * 1024 * 1024,
};

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs = 60 * 60 * 1000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  if (b.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { allowed: true, remaining: limit - b.count, resetAt: b.resetAt };
}

export function rateLimitForAnon(ip: string) {
  return checkRateLimit(`anon:${ip}`, LIMITS.anon_per_hour);
}

export function rateLimitForUser(userId: string) {
  return checkRateLimit(`user:${userId}`, LIMITS.free_per_hour);
}

export { LIMITS };
