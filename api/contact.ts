import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateContactForm,
  buildEmailJsTemplateParams,
} from '../src/lib/validation.js';
import {
  readEmailJsServerConfig,
  dispatchEmailJsRest,
} from '../src/lib/emailjsServer.js';

function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

async function parseRequestBody(
  req: IncomingMessage & { body?: unknown }
): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8').trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw) as Record<string, unknown>);
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(
  req: IncomingMessage & { method?: string; body?: unknown },
  res: ServerResponse
) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

  const body = await parseRequestBody(req);
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
