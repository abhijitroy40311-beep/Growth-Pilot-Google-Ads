import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Home, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const quickRoutes = [
  {
    label: 'About Us',
    path: '/about',
    description: 'Learn how GrowthPilot combines web architecture, Google Ads, and CRO.',
  },
  {
    label: 'Services',
    path: '/services',
    description: 'Explore Website Development, Google Ads, CRO, and GA4 Tracking.',
  },
  {
    label: 'Projects',
    path: '/projects',
    description: 'Inspect interactive demo concepts and growth engineering blueprints.',
  },
  {
    label: 'FAQs',
    path: '/faq',
    description: 'Read answers on deliverables, timelines, and engagement structure.',
  },
];

export const NotFound: React.FC = () => {
  const location = useLocation();

  useDocumentMeta({
    title: '404 Page Not Found — GrowthPilot',
    description:
      'The page you requested could not be found. Return to the GrowthPilot homepage or explore our digital growth services.',
    path: location.pathname,
    noindex: true,
  });

  return (
    <section
      aria-labelledby="not-found-heading"
      data-testid="not-found-page"
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-28 lg:py-32 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 gp-grid-bg opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(8,217,245,0.12),rgba(0,230,168,0.05)_45%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#08D9F5]/30 bg-[#050505] px-3.5 py-1.5 font-mono text-xs text-[#08D9F5]">
            <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Error 404 · Route Not Found</span>
          </div>

          <h1
            id="not-found-heading"
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            This page doesn&apos;t exist on{' '}
            <span className="gp-gradient-text">GrowthPilot</span>.
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
            We couldn&apos;t find a page matching{' '}
            <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm text-white">
              {location.pathname}
            </code>
            . The link may be outdated, or the URL may have been typed incorrectly.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl gp-gradient-bg px-6 py-3.5 text-sm font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02]"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#050505] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#08D9F5]/50 hover:text-[#08D9F5]"
            >
              <span>Contact GrowthPilot</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#A5AAB4]">
              Explore Verified Pages
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#050505] p-4 transition-colors hover:border-[#08D9F5]/40"
                >
                  <div>
                    <div className="flex items-center justify-between text-sm font-bold text-white group-hover:text-[#08D9F5] transition-colors">
                      <span>{route.label}</span>
                      <ArrowRight
                        className="h-4 w-4 text-[#A5AAB4] transition-transform group-hover:translate-x-0.5 group-hover:text-[#08D9F5]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-[#A5AAB4] leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
