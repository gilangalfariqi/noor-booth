/**
 * Simple in-memory rate limiter for booking submissions.
 * Resets on server restart. For production, use Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS = 5; // max 5 booking attempts per IP per hour

/**
 * Check and increment rate limit for a given key (usually IP address).
 * Returns `{ allowed: boolean, remaining: number }`.
 */
export function rateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // Create or reset entry
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  store.set(key, entry);
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

/** Clean up expired entries to prevent memory leaks */
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}
