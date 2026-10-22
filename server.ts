import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { createServer as createViteServer } from 'vite';
import {
  validateContactForm,
  ContactFormPayload,
  buildEmailJsTemplateParams,
} from './src/lib/validation';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface StoredInquiry extends ContactFormPayload {
  id: string;
  submittedAt: string;
  emailDispatched: boolean;
  emailError?: string | null;
}

const inquiriesStore: StoredInquiry[] = [];
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 8;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

const COMPRESSIBLE_EXTS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.svg',
  '.txt',
  '.xml',
]);

const compressedFileCache = new Map<string, Buffer>();

function sendCompressedBuffer(
  req: express.Request,
  res: express.Response,
  rawBuffer: Buffer,
  cacheKeyPrefix: string,
  contentType: string
) {
  res.setHeader('Content-Type', contentType);
  res.setHeader('Vary', 'Accept-Encoding');

  const acceptEncoding = String(req.headers['accept-encoding'] || '');
  let encoding: 'br' | 'gzip' | null = null;
  if (acceptEncoding.includes('br')) {
    encoding = 'br';
  } else if (acceptEncoding.includes('gzip')) {
    encoding = 'gzip';
  }

  if (!encoding || rawBuffer.byteLength < 256) {
    res.setHeader('Content-Length', rawBuffer.byteLength);
    res.status(200).end(rawBuffer);
    return;
  }

  const cacheKey = `${cacheKeyPrefix}:${encoding}`;
  let compressed = compressedFileCache.get(cacheKey);
  if (!compressed) {
    compressed =
      encoding === 'br'
        ? zlib.brotliCompressSync(rawBuffer, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
          },
        })
        : zlib.gzipSync(rawBuffer, { level: 6 });
    if (compressedFileCache.size > 200) {
      compressedFileCache.clear();
    }
    compressedFileCache.set(cacheKey, compressed);
  }

  res.setHeader('Content-Encoding', encoding);
  res.setHeader('Content-Length', compressed.byteLength);
  res.status(200).end(compressed);
}

function tryServeStaticFile(
  req: express.Request,
  res: express.Response,
  filePath: string,
  cacheControl: string
): boolean {
  try {
    if (!fs.existsSync(filePath)) return false;
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Cache-Control', cacheControl);

    const rawBuffer = fs.readFileSync(filePath);
    if (COMPRESSIBLE_EXTS.has(ext)) {
      sendCompressedBuffer(
        req,
        res,
        rawBuffer,
        `${filePath}:${stat.mtimeMs}`,
        contentType
      );
    } else {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', rawBuffer.byteLength);
      res.status(200).end(rawBuffer);
    }
    return true;
  } catch {
    return false;
  }
}

function resolveRequestOrigin(req: express.Request): string {
  const forwardedProto = (req.headers['x-forwarded-proto'] as string)
    ?.split(',')[0]
    ?.trim();
  const proto = forwardedProto || req.protocol || 'https';
  const host =
    (req.headers['x-forwarded-host'] as string)?.split(',')[0]?.trim() ||
    req.headers.host ||
    'growthpilot.agency';
  return `${proto}://${host}`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.path.startsWith('/assets/aistudio/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  // Valid SEO robots.txt with absolute Sitemap URL
  app.get('/robots.txt', (req, res) => {
    const origin = resolveRequestOrigin(req);
    const robotsTxt = [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${origin}/sitemap.xml`,
      '',
    ].join('\n');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    sendCompressedBuffer(
      req,
      res,
      Buffer.from(robotsTxt, 'utf-8'),
      `robots:${origin}`,
      'text/plain; charset=utf-8'
    );
  });

  // Valid XML Sitemap with absolute URLs
  app.get('/sitemap.xml', (req, res) => {
    const origin = resolveRequestOrigin(req);
    const routes = [
      { path: '/', changefreq: 'weekly', priority: '1.0' },
      { path: '/about', changefreq: 'monthly', priority: '0.8' },
      { path: '/projects', changefreq: 'weekly', priority: '0.9' },
      { path: '/services', changefreq: 'weekly', priority: '0.9' },
      { path: '/contact', changefreq: 'monthly', priority: '0.9' },
      { path: '/faq', changefreq: 'monthly', priority: '0.7' },
      { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
      { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
      .map(
        (r) =>
          `  <url>\n    <loc>${origin}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>\n`;
    res.setHeader('Cache-Control', 'public, max-age=3600');
    sendCompressedBuffer(
      req,
      res,
      Buffer.from(xml, 'utf-8'),
      `sitemap:${origin}`,
      'application/xml; charset=utf-8'
    );
  });

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    const serviceId =
      process.env.VITE_EMAILJS_SERVICE_ID ||
      process.env.EMAILJS_SERVICE_ID ||
      'service_1g1fike';
    const templateId =
      process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID || '';
    const publicKey =
      process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY || '';

    res.json({
      status: 'ok',
      service: 'GrowthPilot Backend API',
      emailjs: {
        serviceId,
        templateId,
        configured: Boolean(serviceId && templateId && publicKey),
      },
      inquiriesCount: inquiriesStore.length,
    });
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const now = Date.now();
    const rateRecord = rateLimitMap.get(clientIp);
    if (!rateRecord || now - rateRecord.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(clientIp, { count: 1, windowStart: now });
    } else {
      if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        res.status(429).json({
          ok: false,
          message:
            'Too many enquiries submitted recently from this connection. Please wait a few minutes and try again.',
        });
        return;
      }
      rateRecord.count += 1;
    }

    const validation = validateContactForm(req.body || {});
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    const inquiryId =
      typeof req.body?.inquiryId === 'string' && req.body.inquiryId.startsWith('GP-')
        ? req.body.inquiryId
        : `GP-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`;
    const submittedAt =
      typeof req.body?.submittedAt === 'string'
        ? req.body.submittedAt
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
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || 'DI2V29MD3yRrzMUHrnOQZ';
    const recipientEmail = process.env.VITE_CONTACT_EMAIL || 'abhijitroy40311@gmail.com';

    let emailDispatched = Boolean(req.body?.clientEmailSent);
    let emailError: string | null = emailDispatched ? null : req.body?.clientEmailError || null;

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
              Origin: process.env.APP_URL || 'http://localhost:3000',
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
          console.error('EmailJS API returned error:', emailResponse.status, responseText);
        }
      } catch (err) {
        emailError =
          err instanceof Error ? err.message : 'Unable to reach EmailJS API.';
        console.error('Server-side EmailJS exception:', err);
      }
    } else if (!emailDispatched && (!templateId || !publicKey)) {
      emailError =
        'EmailJS Template ID or Public Key is missing in environment variables.';
    }

    const record: StoredInquiry = {
      ...validation.sanitized,
      id: inquiryId,
      submittedAt,
      emailDispatched,
      emailError,
    };

    inquiriesStore.unshift(record);

    res.status(201).json({
      ok: true,
      inquiryId: record.id,
      submittedAt: record.submittedAt,
      emailjsServiceId: serviceId,
      emailjsTemplateId: templateId,
      emailDispatched,
      emailError,
      message: emailDispatched
        ? 'Thank you. Your project inquiry has been sent directly to our inbox via EmailJS.'
        : 'Your inquiry has been logged on our server, but EmailJS could not send the email notification yet.',
      summary: {
        name: record.name,
        businessName: record.businessName,
        email: record.email,
        serviceOfInterest: record.serviceOfInterest,
      },
    });
  });

  const distPath = path.join(__dirname, 'dist');
  const publicPath = path.join(__dirname, 'public');

  // Serve compressed production build assets from dist/ when available
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }

    const distIndex = path.join(distPath, 'index.html');
    if (!fs.existsSync(distIndex)) {
      next();
      return;
    }

    const safeRelPath = path.normalize(req.path).replace(/^(\.\.(\/|\\|$))+/, '');
    const candidateDistFile = path.join(distPath, safeRelPath);
    const candidatePublicFile = path.join(publicPath, safeRelPath);

    if (req.path !== '/' && path.extname(req.path)) {
      const isImmutableAsset =
        req.path.startsWith('/assets/') || req.path.startsWith('/assets/aistudio/');
      const cacheHeader = isImmutableAsset
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=3600';

      if (tryServeStaticFile(req, res, candidateDistFile, cacheHeader)) {
        return;
      }
      if (tryServeStaticFile(req, res, candidatePublicFile, cacheHeader)) {
        return;
      }
    }

    // SPA route fallback to minified dist/index.html
    if (!req.path.startsWith('/api/') && !path.extname(req.path)) {
      if (tryServeStaticFile(req, res, distIndex, 'no-cache')) {
        return;
      }
    }

    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.get('*', (req, res) => {
      tryServeStaticFile(req, res, path.join(distPath, 'index.html'), 'no-cache');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GrowthPilot server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

