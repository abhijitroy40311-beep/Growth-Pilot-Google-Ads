import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Home, MessageSquare } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

interface DestinationRoute {
  path: string;
  label: string;
}

const availableDestinations: DestinationRoute[] = [
  {
    path: '/services',
    label: 'Google Ads services',
  },
  {
    path: '/projects',
    label: 'Selected work',
  },
  {
    path: '/contact',
    label: 'Start a conversation',
  },
];

export const NotFound: React.FC = () => {
  const location = useLocation();
  const requestedPath = location.pathname || '/';

  useDocumentMeta({
    title: '404 Page Not Found — GrowthPilot',
    description:
      'We could not find the page you requested. Choose a verified GrowthPilot destination or return to the homepage.',
    path: requestedPath,
    noindex: true,
  });

  return (
    <section
      aria-labelledby="not-found-heading"
      data-testid="not-found-page"
      className="flex min-h-[calc(100vh-5rem)] items-center bg-[#090A0D] py-14 sm:py-20 lg:py-24 text-[#F4F5F7]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left column — Error message & primary actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                404 // Route Unavailable
              </p>

              <h1
                id="not-found-heading"
                className="text-[2.15rem] sm:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.06]"
              >
                Confirmed: this page is gone.
              </h1>

              <div className="max-w-[46ch] space-y-2 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                <p>
                  We couldn&apos;t find the page you were looking for. The address may be incorrect or the link may be outdated.
                </p>
                <p>Choose a working destination below, or head back home.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#F4F5F7] px-5 py-2.5 text-sm font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] hover:text-[#090A0D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
              >
                <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Back home</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[rgba(244,245,247,0.20)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#F4F5F7] transition-colors duration-150 hover:border-[#18C4A8]/70 hover:bg-[#161920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                <span>Contact GrowthPilot</span>
              </Link>
            </div>
          </div>

          {/* Right column — Terminal-style client route check panel */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-[rgba(244,245,247,0.10)] bg-[#111318]">
              {/* Terminal header bar */}
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(244,245,247,0.10)] bg-[#161920] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8890A0]/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8890A0]/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8890A0]/40" />
                  </div>
                  <span className="truncate font-mono text-xs text-[#8890A0]">
                    growthpilot: route-check
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8890A0] shrink-0">route</span>
              </div>

              {/* Terminal output body */}
              <div className="space-y-6 p-5 font-mono text-xs sm:p-7 sm:text-sm">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[#A6ADBB]">
                  <span className="select-none text-[#18C4A8]" aria-hidden="true">
                    $
                  </span>
                  <span>route-check</span>
                  <span className="break-all text-[#F4F5F7] [overflow-wrap:anywhere]">
                    {requestedPath}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold tracking-[0.06em] text-[#F4F5F7]">
                    STATUS 404
                  </p>
                  <p className="text-xs text-[#8890A0]">route not found</p>
                </div>

                <div
                  className="py-1 text-5xl sm:text-6xl font-extrabold tracking-[0.08em] text-[#F4F5F7] tabular-nums leading-none select-none"
                  aria-hidden="true"
                >
                  404
                </div>

                <nav aria-label="Available destinations" className="space-y-2.5">
                  <p className="text-xs text-[#8890A0]">available destinations:</p>
                  <ul className="space-y-1">
                    {availableDestinations.map((dest) => (
                      <li key={dest.path}>
                        <Link
                          to={dest.path}
                          className="group flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md px-2.5 py-2 -mx-2.5 min-h-[40px] transition-colors duration-150 hover:bg-[#161920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                        >
                          <span className="inline-flex items-center gap-2 min-w-[7.5rem] text-[#F4F5F7] group-hover:text-[#18C4A8] transition-colors">
                            <ArrowRight
                              className="h-3.5 w-3.5 shrink-0 text-[#18C4A8] transition-transform duration-150 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                            <span>{dest.path}</span>
                          </span>
                          <span className="text-[#8890A0] group-hover:text-[#A6ADBB] transition-colors">
                            {dest.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex items-center gap-2 pt-1 text-[#A6ADBB]" aria-hidden="true">
                  <span className="select-none text-[#18C4A8]">$</span>
                  <span className="inline-block h-4 w-2 bg-[#F4F5F7]/85" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
