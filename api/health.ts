import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(
  req: IncomingMessage & { method?: string },
  res: ServerResponse & {
    status?: (code: number) => typeof res;
    json?: (body: unknown) => void;
  }
) {
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, message: 'Method Not Allowed' }));
    return;
  }

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

  const payload = {
    status: 'ok',
    service: 'GrowthPilot Serverless API',
    timestamp: new Date().toISOString(),
    emailjs: {
      serviceId,
      templateId,
      configured: Boolean(serviceId && templateId && publicKey),
    },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}
