import {
  validateContactForm,
  buildEmailJsTemplateParams,
} from './src/lib/validation.js';
import {
  readEmailJsServerConfig,
  dispatchEmailJsRest,
} from './src/lib/emailjsServer.js';

export interface WorkerAssetsBinding {
  fetch(request: Request): Promise<Response>;
}

export interface WorkerEnv {
  ASSETS?: WorkerAssetsBinding;
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
};

function extractStringEnv(env: WorkerEnv): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string') {
      result[key] = value;
    }
  }
  return result;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
}

async function parseJsonRequestBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const raw = (await request.text()).trim();
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
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

    if (normalizedPath === '/api/health') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return jsonResponse({ ok: false, message: 'Method Not Allowed' }, 405);
      }

      const emailConfig = readEmailJsServerConfig(stringEnv);
      return jsonResponse({
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
      });
    }

    if (normalizedPath === '/api/contact') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      if (request.method !== 'POST') {
        return jsonResponse(
          { ok: false, message: 'Method Not Allowed. Use POST /api/contact.' },
          405
        );
      }

      const body = await parseJsonRequestBody(request);
      const validation = validateContactForm(body);
      if (!validation.valid) {
        return jsonResponse(
          {
            ok: false,
            message: 'Please correct the highlighted fields and try again.',
            errors: validation.errors,
          },
          400
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
        statusCode
      );
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
