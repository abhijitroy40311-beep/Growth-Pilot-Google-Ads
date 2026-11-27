import {
  validateContactForm,
  buildEmailJsTemplateParams,
} from './src/lib/validation.js';
import {
  readEmailJsServerConfig,
  dispatchEmailJsRest,
} from './src/lib/emailjsServer.js';
import {
  MAX_CONTACT_BODY_BYTES,
  buildStrictCorsHeaders,
  createRateLimiter,
  extractClientIp,
  isAllowedOrigin,
} from './src/lib/apiSecurity.js';

export interface WorkerAssetsBinding {
  fetch(request: Request): Promise<Response>;
}

export interface WorkerRateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface WorkerEnv {
  ASSETS?: WorkerAssetsBinding;
  CONTACT_RATE_LIMITER?: WorkerRateLimitBinding;
  EMAILJS_SERVICE_ID?: string;
  EMAILJS_TEMPLATE_ID?: string;
  EMAILJS_PUBLIC_KEY?: string;
  EMAILJS_PRIVATE_KEY?: string;
  CONTACT_EMAIL?: string;
  APP_URL?: string;
  VITE_EMAILJS_SERVICE_ID?: string;
  VITE_EMAILJS_TEMPLATE_ID?: string;
  VITE_EMAILJS_PUBLIC_KEY?: string;
  VITE_CONTACT_EMAIL?: string;
  VITE_APP_URL?: string;
  [key: string]: unknown;
}

const ROUTE_REDIRECTS: Record<string, string> = {
  '/work': '/projects',
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/faqs': '/faq',
  '/dental-implant-marketing': '/services',
};

const fallbackIsolateRateLimiter = createRateLimiter();

function extractStringEnv(env: WorkerEnv): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string') {
      result[key] = value;
    }
  }
  return result;
}

function jsonResponse(
  data: unknown,
  status = 200,
  corsHeaders: Record<string, string> = {},
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}

async function parseJsonRequestBodyWithLimit(
  request: Request
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; status: 400 | 413; error: string }> {
  const declaredLen = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(declaredLen) && declaredLen > MAX_CONTACT_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      error: 'Request payload exceeds maximum allowed size (64 KB).',
    };
  }

  let rawBytes: Uint8Array;
  try {
    const buffer = await request.arrayBuffer();
    rawBytes = new Uint8Array(buffer);
  } catch {
    return { ok: false, status: 400, error: 'Unable to read request body.' };
  }

  if (rawBytes.byteLength > MAX_CONTACT_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      error: 'Request payload exceeds maximum allowed size (64 KB).',
    };
  }

  const rawText = new TextDecoder().decode(rawBytes).trim();
  if (!rawText) {
    return { ok: true, body: {} };
  }

  try {
    const parsed = JSON.parse(rawText);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ok: false, status: 400, error: 'Request body must be a JSON object.' };
    }
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, status: 400, error: 'Invalid JSON request payload.' };
  }
}

export default {
  async fetch(request: Request, env: WorkerEnv = {}): Promise<Response> {
    const url = new URL(request.url);
    const normalizedPath =
      url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;

    const redirectTarget = ROUTE_REDIRECTS[normalizedPath];
    if (redirectTarget) {
      return Response.redirect(new URL(redirectTarget, url.origin).toString(), 301);
    }

    const stringEnv = extractStringEnv(env);
    const requestOrigin = request.headers.get('Origin');
    const configuredOrigins = [stringEnv.APP_URL, stringEnv.VITE_APP_URL, url.origin];

    if (normalizedPath === '/api/health') {
      const corsHeaders = buildStrictCorsHeaders(
        requestOrigin,
        'GET, HEAD, OPTIONS',
        configuredOrigins
      );

      if (request.method === 'OPTIONS') {
        if (requestOrigin && !isAllowedOrigin(requestOrigin, configuredOrigins)) {
          return new Response(null, { status: 403, headers: corsHeaders });
        }
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return jsonResponse({ ok: false, message: 'Method Not Allowed' }, 405, corsHeaders);
      }

      const emailConfig = readEmailJsServerConfig(stringEnv);
      return jsonResponse(
        {
          status: 'ok',
          service: 'GrowthPilot Cloudflare Worker API',
          timestamp: new Date().toISOString(),
          emailjs: {
            serviceId: emailConfig.serviceId,
            templateId: emailConfig.templateId,
            configured: Boolean(
              emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey
            ),
            privateKeyConfigured: Boolean(emailConfig.privateKey),
          },
        },
        200,
        corsHeaders
      );
    }

    if (normalizedPath === '/api/contact') {
      const corsHeaders = buildStrictCorsHeaders(
        requestOrigin,
        'POST, OPTIONS',
        configuredOrigins
      );

      if (request.method === 'OPTIONS') {
        if (requestOrigin && !isAllowedOrigin(requestOrigin, configuredOrigins)) {
          return new Response(null, { status: 403, headers: corsHeaders });
        }
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method !== 'POST') {
        return jsonResponse(
          { ok: false, message: 'Method Not Allowed. Use POST /api/contact.' },
          405,
          corsHeaders
        );
      }

      if (requestOrigin && !isAllowedOrigin(requestOrigin, configuredOrigins)) {
        return jsonResponse(
          { ok: false, message: 'Cross-origin request rejected.' },
          403,
          corsHeaders
        );
      }

      const clientIp = extractClientIp((name) => request.headers.get(name) ?? undefined);

      // 1. Distributed Cloudflare edge Rate Limiting binding (when active in production)
      if (env.CONTACT_RATE_LIMITER && typeof env.CONTACT_RATE_LIMITER.limit === 'function') {
        try {
          const edgeLimit = await env.CONTACT_RATE_LIMITER.limit({ key: clientIp });
          if (!edgeLimit.success) {
            return jsonResponse(
              {
                ok: false,
                message:
                  'Too many enquiries submitted recently from this connection. Please wait a few minutes and try again.',
              },
              429,
              corsHeaders,
              { 'Retry-After': '60' }
            );
          }
        } catch {
          // Fall through cleanly to local isolate limiter if edge binding is unavailable
        }
      }

      // 2. Best-effort per-isolate rate limiter defense-in-depth
      const isolateLimit = fallbackIsolateRateLimiter.check(clientIp);
      if (!isolateLimit.allowed) {
        return jsonResponse(
          {
            ok: false,
            message:
              'Too many enquiries submitted recently from this connection. Please wait a few minutes and try again.',
          },
          429,
          corsHeaders,
          { 'Retry-After': String(isolateLimit.retryAfterSeconds) }
        );
      }

      const parsed = await parseJsonRequestBodyWithLimit(request);
      if ('error' in parsed) {
        return jsonResponse({ ok: false, message: parsed.error }, parsed.status, corsHeaders);
      }

      const body = parsed.body;
      const validation = validateContactForm(body);
      if (!validation.valid) {
        return jsonResponse(
          {
            ok: false,
            message: 'Please correct the highlighted fields and try again.',
            errors: validation.errors,
          },
          400,
          corsHeaders
        );
      }

      const inquiryId =
        typeof body.inquiryId === 'string' && body.inquiryId.startsWith('GP-')
          ? body.inquiryId
          : `GP-${Date.now().toString(36).toUpperCase()}-${Math.random()
              .toString(36)
              .substring(2, 6)
              .toUpperCase()}`;

      const submittedAt =
        typeof body.submittedAt === 'string' ? body.submittedAt : new Date().toISOString();

      const emailConfig = readEmailJsServerConfig(stringEnv);
      const templateParams = buildEmailJsTemplateParams(
        validation.sanitized,
        inquiryId,
        submittedAt,
        emailConfig.recipientEmail
      );

      const origin = stringEnv.APP_URL || stringEnv.VITE_APP_URL || url.origin;
      const dispatchResult = await dispatchEmailJsRest({
        config: emailConfig,
        templateParams,
        origin,
      });

      const statusCode = dispatchResult.sent ? 201 : 502;
      return jsonResponse(
        {
          ok: dispatchResult.sent,
          inquiryId,
          submittedAt,
          emailjsServiceId: emailConfig.serviceId,
          emailjsTemplateId: emailConfig.templateId,
          emailDispatched: dispatchResult.sent,
          emailError: dispatchResult.err,
          message: dispatchResult.sent
            ? "Your project inquiry has been received successfully. Thank you for contacting GrowthPilot. We'll review your requirements and get back to you within 1–2 business days."
            : 'We could not deliver your inquiry email automatically right now. Please use WhatsApp or your Email App below to send your brief directly.',
          summary: {
            name: validation.sanitized.name,
            businessName: validation.sanitized.businessName,
            email: validation.sanitized.email,
            serviceOfInterest: validation.sanitized.serviceOfInterest,
          },
        },
        statusCode,
        corsHeaders
      );
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
