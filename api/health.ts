import type { IncomingMessage, ServerResponse } from 'http';
import { readEmailJsServerConfig } from '../src/lib/emailjsServer.js';
import {
  buildStrictCorsHeaders,
  isAllowedOrigin,
} from '../src/lib/apiSecurity.js';

function applyHeaders(res: ServerResponse, headers: Record<string, string>) {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }
}

export default function handler(
  req: IncomingMessage & { method?: string },
  res: ServerResponse & {
    status?: (code: number) => typeof res;
    json?: (body: unknown) => void;
  }
) {
  const originHeader =
    typeof req.headers?.origin === 'string' ? req.headers.origin : undefined;
  const configuredOrigins = [process.env.APP_URL, process.env.VITE_APP_URL];
  const corsHeaders = buildStrictCorsHeaders(
    originHeader,
    'GET, HEAD, OPTIONS',
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
