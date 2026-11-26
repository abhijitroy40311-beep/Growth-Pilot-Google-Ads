import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateContactForm,
  buildEmailJsTemplateParams,
} from '../src/lib/validation.js';
import {
  readEmailJsServerConfig,
  dispatchEmailJsRest,
} from '../src/lib/emailjsServer.js';
import {
  MAX_CONTACT_BODY_BYTES,
  buildStrictCorsHeaders,
  createRateLimiter,
  extractClientIp,
  isAllowedOrigin,
} from '../src/lib/apiSecurity.js';

const contactRateLimiter = createRateLimiter();

function applyHeaders(res: ServerResponse, headers: Record<string, string>) {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }
}

function sendJson(
  res: ServerResponse,
  statusCode: number,
  data: unknown,
  extraHeaders: Record<string, string> = {}
) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  applyHeaders(res, extraHeaders);
  res.end(JSON.stringify(data));
}

async function parseRequestBody(
  req: IncomingMessage & { body?: unknown }
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; status: 400 | 413; error: string }> {
  const declaredLen = Number(req.headers?.['content-length'] || '0');
  if (Number.isFinite(declaredLen) && declaredLen > MAX_CONTACT_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      error: 'Request payload exceeds maximum allowed size (64 KB).',
    };
  }

  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    const serialized = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
    if (serialized > MAX_CONTACT_BODY_BYTES) {
      return {
        ok: false,
        status: 413,
        error: 'Request payload exceeds maximum allowed size (64 KB).',
      };
    }
    return { ok: true, body: req.body as Record<string, unknown> };
  }

  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body, 'utf8') > MAX_CONTACT_BODY_BYTES) {
      return {
        ok: false,
        status: 413,
        error: 'Request payload exceeds maximum allowed size (64 KB).',
      };
    }
    const trimmed = req.body.trim();
    if (!trimmed) return { ok: true, body: {} };
    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ok: false, status: 400, error: 'Request body must be a JSON object.' };
      }
      return { ok: true, body: parsed as Record<string, unknown> };
    } catch {
      return { ok: false, status: 400, error: 'Invalid JSON request payload.' };
    }
  }

  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    let oversized = false;

    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.byteLength;
      if (totalBytes > MAX_CONTACT_BODY_BYTES) {
        oversized = true;
        chunks.length = 0;
        return;
      }
      if (!oversized) {
        chunks.push(Buffer.from(chunk));
      }
    });

    req.on('end', () => {
      if (oversized) {
        resolve({
          ok: false,
          status: 413,
          error: 'Request payload exceeds maximum allowed size (64 KB).',
        });
        return;
      }

      const raw = Buffer.concat(chunks).toString('utf-8').trim();
      if (!raw) {
        resolve({ ok: true, body: {} });
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          resolve({ ok: false, status: 400, error: 'Request body must be a JSON object.' });
          return;
        }
        resolve({ ok: true, body: parsed as Record<string, unknown> });
      } catch {
        resolve({ ok: false, status: 400, error: 'Invalid JSON request payload.' });
      }
    });

    req.on('error', () => resolve({ ok: false, status: 400, error: 'Unable to read request body.' }));
  });
}

export default async function handler(
  req: IncomingMessage & { method?: string; body?: unknown },
  res: ServerResponse
) {
  const originHeader =
    typeof req.headers?.origin === 'string' ? req.headers.origin : undefined;
  const configuredOrigins = [process.env.APP_URL, process.env.VITE_APP_URL];
  const corsHeaders = buildStrictCorsHeaders(
    originHeader,
    'POST, OPTIONS',
    configuredOrigins
  );
  applyHeaders(res, corsHeaders);

  if (req.method === 'OPTIONS') {
    if (originHeader && !isAllowedOrigin(originHeader, configuredOrigins)) {
      res.statusCode = 403;
      res.end();
      return;
    }
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, {
      ok: false,
      message: 'Method Not Allowed. Use POST /api/contact.',
    });
    return;
  }

  if (originHeader && !isAllowedOrigin(originHeader, configuredOrigins)) {
    sendJson(res, 403, {
      ok: false,
      message: 'Cross-origin request rejected.',
    });
    return;
  }

  const clientIp = extractClientIp(
    (name) => req.headers?.[name],
    req.socket?.remoteAddress
  );
  const rateCheck = contactRateLimiter.check(clientIp);
  if (!rateCheck.allowed) {
    sendJson(
      res,
      429,
      {
        ok: false,
        message:
          'Too many enquiries submitted recently from this connection. Please wait a few minutes and try again.',
      },
      { 'Retry-After': String(rateCheck.retryAfterSeconds) }
    );
    return;
  }

  const parsed = await parseRequestBody(req);
  if ('error' in parsed) {
    sendJson(res, parsed.status, {
      ok: false,
      message: parsed.error,
    });
    return;
  }

  const body = parsed.body;
  const validation = validateContactForm(body);

  if (!validation.valid) {
    sendJson(res, 400, {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: validation.errors,
    });
    return;
  }

  const inquiryId =
    typeof body.inquiryId === 'string' && body.inquiryId.startsWith('GP-')
      ? body.inquiryId
      : `GP-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`;

  const submittedAt =
    typeof body.submittedAt === 'string'
      ? body.submittedAt
      : new Date().toISOString();

  const emailConfig = readEmailJsServerConfig();
  const templateParams = buildEmailJsTemplateParams(
    validation.sanitized,
    inquiryId,
    submittedAt,
    emailConfig.recipientEmail
  );

  const origin =
    process.env.APP_URL ||
    process.env.VITE_APP_URL ||
    'https://growthpilotagency-ten.vercel.app';

  const dispatchResult = await dispatchEmailJsRest({
    config: emailConfig,
    templateParams,
    origin,
  });

  const statusCode = dispatchResult.sent ? 201 : 502;

  sendJson(res, statusCode, {
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
  });
}
