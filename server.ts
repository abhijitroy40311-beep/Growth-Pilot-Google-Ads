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
} from './src/lib/validation.js';
import {
  readEmailJsServerConfig,
  dispatchEmailJsRest,
} from './src/lib/emailjsServer.js';
import {
  buildStrictCorsHeaders,
  createRateLimiter,
  extractClientIp,
  isAllowedOrigin,
} from './src/lib/apiSecurity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

export interface StoredInquiry extends ContactFormPayload {
  id: string;
  submittedAt: string;
  emailDispatched: boolean;
  emailError?: string | null;
}

const inquiriesStore: StoredInquiry[] = [];
const contactRateLimiter = createRateLimiter();

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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const publicPath = path.join(__dirname, 'public');
  const distPath = path.join(__dirname, 'dist');

  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.path.startsWith('/assets/aistudio/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  // Legacy alias redirects matching vercel.json
  const routeRedirects: Record<string, string> = {
    '/work': '/projects',
    '/about-us': '/about',
    '/contact-us': '/contact',
    '/faqs': '/faq',
  };
  app.use((req, res, next) => {
    const normalizedPath = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
    const redirectTarget = routeRedirects[normalizedPath];
    if (redirectTarget) {
      res.redirect(301, redirectTarget);
      return;
    }
    next();
  });

  // Single-source-of-truth robots.txt and sitemap.xml served from public/
  app.get('/robots.txt', (req, res) => {
    const robotsFile = path.join(publicPath, 'robots.txt');
    if (tryServeStaticFile(req, res, robotsFile, 'public, max-age=3600')) {
      return;
    }
    res.status(404).type('text/plain').send('robots.txt not found');
  });

  app.get('/sitemap.xml', (req, res) => {
    const sitemapFile = path.join(publicPath, 'sitemap.xml');
    if (tryServeStaticFile(req, res, sitemapFile, 'public, max-age=3600')) {
      return;
    }
    res.status(404).type('text/plain').send('sitemap.xml not found');
  });

  app.use(express.json({ limit: '64kb' }));
  app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errObj = err as { type?: string; status?: number };
    if (errObj?.type === 'entity.too.large' || errObj?.status === 413) {
      res.status(413).json({
        ok: false,
        message: 'Request payload exceeds maximum allowed size (64 KB).',
      });
      return;
    }
    if (errObj?.type === 'entity.parse.failed' || errObj?.status === 400) {
      res.status(400).json({
        ok: false,
        message: 'Invalid JSON request payload.',
      });
      return;
    }
    next(err);
  });

  app.use('/api', (req, res, next) => {
    const originHeader = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
    const configuredOrigins = [process.env.APP_URL, process.env.VITE_APP_URL];
    const allowedMethods = req.path === '/health' ? 'GET, HEAD, OPTIONS' : 'POST, OPTIONS';
    const corsHeaders = buildStrictCorsHeaders(originHeader, allowedMethods, configuredOrigins);
    for (const [k, v] of Object.entries(corsHeaders)) {
      res.setHeader(k, v);
    }
    if (req.method === 'OPTIONS') {
      if (originHeader && !isAllowedOrigin(originHeader, configuredOrigins)) {
        res.status(403).end();
        return;
      }
      res.status(204).end();
      return;
    }
    if (req.method === 'POST' && originHeader && !isAllowedOrigin(originHeader, configuredOrigins)) {
      res.status(403).json({
        ok: false,
        message: 'Cross-origin request rejected.',
      });
      return;
    }
    next();
  });

  app.get('/api/health', (_req, res) => {
    const emailConfig = readEmailJsServerConfig();

    res.json({
      status: 'ok',
      service: 'GrowthPilot Backend API',
      emailjs: {
        serviceId: emailConfig.serviceId,
        templateId: emailConfig.templateId,
        configured: Boolean(
          emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey
        ),
        privateKeyConfigured: Boolean(emailConfig.privateKey),
      },
      inquiriesCount: inquiriesStore.length,
    });
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp = extractClientIp(
      (name) => req.headers[name],
      req.socket.remoteAddress
    );

    const rateCheck = contactRateLimiter.check(clientIp);
    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
      res.status(429).json({
        ok: false,
        message:
          'Too many enquiries submitted recently from this connection. Please wait a few minutes and try again.',
      });
      return;
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

    const emailConfig = readEmailJsServerConfig();
    const templateParams = buildEmailJsTemplateParams(
      validation.sanitized,
      inquiryId,
      submittedAt,
      emailConfig.recipientEmail
    );

    const origin =
      process.env.APP_URL || process.env.VITE_APP_URL || `http://localhost:${PORT}`;

    const dispatchResult = await dispatchEmailJsRest({
      config: emailConfig,
      templateParams,
      origin,
    });

    const record: StoredInquiry = {
      ...validation.sanitized,
      id: inquiryId,
      submittedAt,
      emailDispatched: dispatchResult.sent,
      emailError: dispatchResult.err,
    };

    inquiriesStore.unshift(record);

    const statusCode = dispatchResult.sent ? 201 : 502;

    res.status(statusCode).json({
      ok: dispatchResult.sent,
      inquiryId: record.id,
      submittedAt: record.submittedAt,
      emailjsServiceId: emailConfig.serviceId,
      emailjsTemplateId: emailConfig.templateId,
      emailDispatched: dispatchResult.sent,
      emailError: dispatchResult.err,
      message: dispatchResult.sent
        ? "Your project inquiry has been received successfully. Thank you for contacting GrowthPilot. We'll review your requirements and get back to you within 1–2 business days."
        : 'We could not deliver your inquiry email automatically right now. Please use WhatsApp or your Email App below to send your brief directly.',
      summary: {
        name: record.name,
        businessName: record.businessName,
        email: record.email,
        serviceOfInterest: record.serviceOfInterest,
      },
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve compressed production build assets from dist/ strictly in production mode
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

      // Serve route-specific prerendered dist/<route>/index.html when available, else dist/index.html
      if (!req.path.startsWith('/api/') && !path.extname(req.path)) {
        const cleanRouteDir = safeRelPath.replace(/^[/\\]+|[/\\]+$/g, '');
        const routeHtmlPath = cleanRouteDir
          ? path.join(distPath, cleanRouteDir, 'index.html')
          : distIndex;
        if (tryServeStaticFile(req, res, routeHtmlPath, 'no-cache')) {
          return;
        }
        if (tryServeStaticFile(req, res, distIndex, 'no-cache')) {
          return;
        }
      }

      next();
    });

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

