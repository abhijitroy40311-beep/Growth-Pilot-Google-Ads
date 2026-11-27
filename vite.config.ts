import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {
  CANONICAL_ROUTE_META,
  RouteMetaEntry,
  SITE_CANONICAL_DOMAIN,
} from './src/lib/routeMeta.ts';

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderRouteHtml(baseHtml: string, route: RouteMetaEntry): string {
  const canonicalUrl =
    route.path === '/'
      ? `${SITE_CANONICAL_DOMAIN}/`
      : `${SITE_CANONICAL_DOMAIN}${route.path}`;
  const robotsValue = route.noindex ? 'noindex, nofollow' : 'index, follow';
  const safeTitleText = escapeHtmlText(route.title);
  const safeTitleAttr = escapeHtmlAttr(route.title);
  const safeDescAttr = escapeHtmlAttr(route.description);
  const safeCanonical = escapeHtmlAttr(canonicalUrl);

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitleText}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*content="[^"]*"[^>]*>/i,
      `<meta name="description" content="${safeDescAttr}" />`
    )
    .replace(
      /<meta\s+name="robots"[^>]*content="[^"]*"[^>]*>/i,
      `<meta name="robots" content="${robotsValue}" />`
    )
    .replace(
      /<link\s+rel="canonical"[^>]*href="[^"]*"[^>]*>/i,
      `<link rel="canonical" href="${safeCanonical}" />`
    )
    .replace(
      /<meta\s+property="og:url"[^>]*content="[^"]*"[^>]*>/i,
      `<meta property="og:url" content="${safeCanonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"[^>]*content="[^"]*"[^>]*>/i,
      `<meta property="og:title" content="${safeTitleAttr}" />`
    )
    .replace(
      /<meta\s+property="og:description"[^>]*content="[^"]*"[^>]*>/i,
      `<meta property="og:description" content="${safeDescAttr}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[^>]*content="[^"]*"[^>]*>/i,
      `<meta name="twitter:title" content="${safeTitleAttr}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[^>]*content="[^"]*"[^>]*>/i,
      `<meta name="twitter:description" content="${safeDescAttr}" />`
    );
}

function spaRouteHtmlFallbackPlugin(): Plugin {
  return {
    name: 'gp-spa-route-html-fallback',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
      for (const route of CANONICAL_ROUTE_META) {
        if (route.path === '/') {
          fs.writeFileSync(indexHtmlPath, renderRouteHtml(htmlContent, route), 'utf-8');
          continue;
        }
        const routeSlug = route.path.replace(/^\/+|\/+$/g, '');
        if (!routeSlug) continue;
        const routeDir = path.join(distDir, routeSlug);
        fs.mkdirSync(routeDir, {recursive: true});
        fs.writeFileSync(
          path.join(routeDir, 'index.html'),
          renderRouteHtml(htmlContent, route),
          'utf-8'
        );
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), spaRouteHtmlFallbackPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      rolldownOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (
                id.includes('react-router') ||
                id.includes('@remix-run') ||
                id.includes('react-dom') ||
                id.includes('/react/')
              ) {
                return 'vendor-react';
              }
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
