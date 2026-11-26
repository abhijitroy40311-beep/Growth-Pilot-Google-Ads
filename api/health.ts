import type { IncomingMessage, ServerResponse } from 'http';
import { readEmailJsServerConfig } from '../src/lib/emailjsServer.js';

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

  const emailConfig = readEmailJsServerConfig();

  const payload = {
    status: 'ok',
    service: 'GrowthPilot Serverless API',
    timestamp: new Date().toISOString(),
    emailjs: {
      serviceId: emailConfig.serviceId,
      templateId: emailConfig.templateId,
      configured: Boolean(
        emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey
      ),
      privateKeyConfigured: Boolean(emailConfig.privateKey),
    },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}
