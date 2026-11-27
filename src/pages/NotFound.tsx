import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Home, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const quickRoutes = [
  {
    label: 'Services',
    path: '/services',
    description: 'Explore Google Ads management, website architecture, CRO, and GA4 tracking.',
  },
  {
    label: 'About',
    path: '/about',
    description: 'Learn how Abhijit Roy runs GrowthPilot as an independent specialist practice.',
  },
  {
    label: 'Projects',
    path: '/projects',
    description: 'Inspect clearly labeled demo concepts and attribution blueprints.',
  },
  {
    label: 'FAQs',
    path: '/faq',
    description: 'Read straightforward answers on timelines, deliverables, and pricing.',
  },
];

export const NotFound: React.FC = () => {
  const location = useLocation();

  useDocumentMeta({
    title: '404 Page Not Found — GrowthPilot',
    description:
      'The page you requested could not be found. Return to the GrowthPilot homepage or explore our Google Ads and conversion services.',
    path: location.pathname,
    noindex: true,
  });

  return (
    <section
      aria-labelledby="not-found-heading"
      data-testid="not-found-page"
      className="min-h-[80vh] bg-[#090A0D] py-20 sm:py-28 lg:py-32 text-[#F4F5F7]"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/12 bg-[#111318] p-6 sm:p-10 lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-md border border-[#18C4A8]/40 bg-[#090A0D] px-3.5 py-1.5 font-mono text-xs text-[#18C4A8]">
            <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Error 404 · Route Not Found</span>
          </div>

          <h1
            id="not-found-heading"
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.1]"
          >
            This page doesn&apos;t exist on GrowthPilot.
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
            No page matches{' '}
            <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm text-[#F4F5F7]">
              {location.pathname}
            </code>
            . Return to the homepage or choose one of the verified sections below.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-md bg-[#F4F5F7] px-6 py-3 text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-[#F4F5F7] transition-colors hover:border-white/45"
            >
              <span>Contact GrowthPilot</span>
              <ArrowUpRight className="h-4 w-4 text-[#18C4A8]" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#8890A0]">
              Verified Routes
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="group flex flex-col justify-between rounded-md border border-white/10 bg-[#090A0D] p-4 transition-colors hover:border-[#18C4A8]/50"
                >
                  <div>
                    <div className="flex items-center justify-between text-sm font-bold text-[#F4F5F7] group-hover:text-[#18C4A8] transition-colors">
                      <span>{route.label}</span>
                      <ArrowRight
                        className="h-4 w-4 text-[#8890A0] transition-transform group-hover:translate-x-0.5 group-hover:text-[#18C4A8]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-[#A6ADBB] leading-relaxed">
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
