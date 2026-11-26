export const MAX_CONTACT_BODY_BYTES = 64 * 1024; // 64 KB
export const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
export const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 8;

const STATIC_ALLOWED_ORIGIN_SET = new Set<string>([
  'https://growthpilotagency-ten.vercel.app',
  'https://growthpilot-google-ads.agancy.workers.dev',
]);

/**
 * Normalizes a candidate origin string to `scheme://host[:port]` or returns null.
 */
export function normalizeOrigin(rawOrigin: string | undefined | null): string | null {
  if (!rawOrigin) return null;
  try {
    const parsed = new URL(rawOrigin.trim());
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

/**
 * Checks whether an HTTP Origin header is permitted to invoke GrowthPilot APIs.
 * Restricts cross-origin access to approved production origins and local HTTP dev hosts
 * without using wildcard (`*`) access control.
 */
export function isAllowedOrigin(
  rawOrigin: string | undefined | null,
  extraAllowedOrigins: Array<string | undefined | null> = []
): boolean {
  const normalized = normalizeOrigin(rawOrigin);
  if (!normalized) return false;

  if (STATIC_ALLOWED_ORIGIN_SET.has(normalized)) {
    return true;
  }

  for (const extra of extraAllowedOrigins) {
    const normalizedExtra = normalizeOrigin(extra);
    if (normalizedExtra && normalizedExtra === normalized) {
      return true;
    }
  }

  try {
    const parsed = new URL(normalized);
    if (
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
    ) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Builds strict CORS and security headers for approved origins only.
 * Always emits `Vary: Origin` and omits `Access-Control-Allow-Origin` for unknown origins.
 */
export function buildStrictCorsHeaders(
  rawOrigin: string | undefined | null,
  allowedMethods: string,
  extraAllowedOrigins: Array<string | undefined | null> = []
): Record<string, string> {
  const headers: Record<string, string> = {
    Vary: 'Origin',
    'Access-Control-Allow-Methods': allowedMethods,
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  const normalized = normalizeOrigin(rawOrigin);
  if (normalized && isAllowedOrigin(normalized, extraAllowedOrigins)) {
    headers['Access-Control-Allow-Origin'] = normalized;
  }

  return headers;
}

/**
 * Extracts best-effort client IP address across Cloudflare Workers, Vercel, and Express.
 */
export function extractClientIp(
  getHeader: (name: string) => string | string[] | undefined,
  fallbackRemote?: string
): string {
  const headerToStr = (name: string): string => {
    const v = getHeader(name);
    return Array.isArray(v) ? String(v[0] || '') : String(v || '');
  };

  const cfIp = headerToStr('cf-connecting-ip').trim();
  if (cfIp) return cfIp;

  const forwarded = headerToStr('x-forwarded-for')
    .split(',')[0]
    ?.trim();
  if (forwarded) return forwarded;

  return (fallbackRemote || '').trim() || 'unknown';
}

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check: (key: string, nowMs?: number) => RateLimitCheckResult;
  reset: () => void;
}

/**
 * Creates a memory-bounded sliding-window rate limiter for local/fallback protection.
 * Note: For distributed Cloudflare Worker production traffic, pair with Cloudflare's
 * `ratelimits` binding and dashboard WAF Rate Limiting rules.
 */
export function createRateLimiter(options?: {
  windowMs?: number;
  maxRequests?: number;
  maxTrackedKeys?: number;
}): RateLimiter {
  const windowMs = options?.windowMs ?? DEFAULT_RATE_LIMIT_WINDOW_MS;
  const maxRequests = options?.maxRequests ?? DEFAULT_RATE_LIMIT_MAX_REQUESTS;
  const maxTrackedKeys = options?.maxTrackedKeys ?? 2000;
  const store = new Map<string, { count: number; windowStart: number }>();

  const sweepExpired = (nowMs: number) => {
    for (const [k, entry] of store.entries()) {
      if (nowMs - entry.windowStart >= windowMs) {
        store.delete(k);
      }
    }
  };

  return {
    check(key: string, nowMs: number = Date.now()): RateLimitCheckResult {
      const normalizedKey = (key || 'unknown').trim() || 'unknown';
      const existing = store.get(normalizedKey);

      if (!existing || nowMs - existing.windowStart >= windowMs) {
        if (store.size >= maxTrackedKeys) {
          sweepExpired(nowMs);
        }
        if (store.size >= maxTrackedKeys) {
          const oldestKey = store.keys().next().value;
          if (oldestKey !== undefined) store.delete(oldestKey);
        }
        store.set(normalizedKey, { count: 1, windowStart: nowMs });
        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - 1),
          retryAfterSeconds: Math.ceil(windowMs / 1000),
        };
      }

      if (existing.count >= maxRequests) {
        const retryAfterMs = Math.max(1000, windowMs - (nowMs - existing.windowStart));
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
        };
      }

      existing.count += 1;
      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - existing.count),
        retryAfterSeconds: Math.ceil((windowMs - (nowMs - existing.windowStart)) / 1000),
      };
    },
    reset() {
      store.clear();
    },
  };
}
