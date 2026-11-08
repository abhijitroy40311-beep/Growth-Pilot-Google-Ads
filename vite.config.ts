import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const SPA_ROUTES = [
  'about',
  'projects',
  'work',
  'services',
  'dental-implant-marketing',
  'contact',
  'thank-you',
  'faq',
  'privacy-policy',
  'terms-and-conditions',
];

function spaRouteHtmlFallbackPlugin(): Plugin {
  return {
    name: 'gp-spa-route-html-fallback',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
      for (const route of SPA_ROUTES) {
        const routeDir = path.join(distDir, route);
        fs.mkdirSync(routeDir, {recursive: true});
        fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent, 'utf-8');
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
              if (id.includes('motion') || id.includes('framer-motion')) {
                return 'vendor-motion';
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
