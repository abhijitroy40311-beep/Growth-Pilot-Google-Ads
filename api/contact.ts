import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateContactForm,
  buildEmailJsTemplateParams,
} from '../src/lib/validation';

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

  const serviceId =
    process.env.VITE_EMAILJS_SERVICE_ID ||
    process.env.EMAILJS_SERVICE_ID ||
    'service_1g1fike';
  const templateId =
    process.env.VITE_EMAILJS_TEMPLATE_ID ||
    process.env.EMAILJS_TEMPLATE_ID ||
    'template_a1gp7od';
  const publicKey =
    process.env.VITE_EMAILJS_PUBLIC_KEY ||
    process.env.EMAILJS_PUBLIC_KEY ||
    'J6Z6BqADTVbe_oGTY';
  const privateKey =
    process.env.EMAILJS_PRIVATE_KEY ||
    process.env.VITE_EMAILJS_PRIVATE_KEY ||
    'DI2V29MD3yRrzMUHrnOQZ';
  const recipientEmail =
    process.env.VITE_CONTACT_EMAIL || 'abhijitroy40311@gmail.com';

  let emailDispatched = Boolean(body.clientEmailSent);
  let emailError: string | null = emailDispatched
    ? null
    : typeof body.clientEmailError === 'string'
    ? body.clientEmailError
    : null;

  if (!emailDispatched && serviceId && templateId && publicKey) {
    try {
      const templateParams = buildEmailJsTemplateParams(
        validation.sanitized,
        inquiryId,
        submittedAt,
        recipientEmail
      );
      const emailResponse = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin:
              process.env.APP_URL ||
              process.env.VITE_APP_URL ||
              'https://growthpilotagency-nine.vercel.app',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            ...(privateKey ? { accessToken: privateKey } : {}),
            template_params: templateParams,
          }),
        }
      );

      const responseText = await emailResponse.text();
      if (emailResponse.ok) {
        emailDispatched = true;
        emailError = null;
      } else {
        emailError = `EmailJS (${serviceId} / ${templateId}): ${responseText}`;
      }
    } catch (err) {
      emailError =
        err instanceof Error ? err.message : 'Unable to reach EmailJS API.';
    }
  }

  sendJson(res, 201, {
    ok: true,
    inquiryId,
    submittedAt,
    emailjsServiceId: serviceId,
    emailjsTemplateId: templateId,
    emailDispatched,
    emailError,
    message: emailDispatched
      ? 'Thank you. Your project inquiry has been sent directly to our inbox via EmailJS.'
      : 'Your inquiry has been verified and logged by our server.',
    summary: {
      name: validation.sanitized.name,
      businessName: validation.sanitized.businessName,
      email: validation.sanitized.email,
      serviceOfInterest: validation.sanitized.serviceOfInterest,
    },
  });
}
