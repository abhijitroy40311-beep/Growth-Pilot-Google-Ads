import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { serviceIndustriesData, targetMarketsData } from '../../data/industries';
import { AnimatedContent } from '../animation/AnimatedContent';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

export const IndustriesSection: React.FC = () => {
  return (
    <section
      id="stage-industries"
      aria-labelledby="industries-heading"
      className="border-t border-white/10 bg-[#111318] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="industries-heading"
          index="03"
          eyebrow="Industries & Markets"
          title="Built for High-Intent Service Businesses Across Seven Markets."
          lead="Each trade has distinct buyer urgency, seasonal demand, and lead-handling workflows—never recycled one-size templates."
          action={
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors whitespace-nowrap"
            >
              <span>Inspect Reference Blueprints</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        {/* 6 Trade Verticals */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {serviceIndustriesData.map((trade, idx) => (
            <AnimatedContent
              key={trade.code}
              delay={idx * 0.03}
              distance={8}
              className="flex h-full flex-col justify-between bg-[#090A0D] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#18C4A8] tabular-nums">
                    {trade.code} // Trade Vertical
                  </span>
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#F4F5F7]">
                  {trade.name}
                </h3>
                <p className="mt-2.5 text-sm text-[#A6ADBB] leading-relaxed">
                  {trade.searchIntentFocus}
                </p>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                  Primary Outcome
                </div>
                <div className="mt-1 text-xs font-medium text-[#F4F5F7]">
                  <span>{trade.primaryConversion}</span>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* Aligned Trades + International Coverage */}
        <div className="mt-10 rounded-lg border border-white/10 bg-[#090A0D] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4 space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>International Service Coverage</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#F4F5F7]">
                English-Language Search &amp; Cross-Timezone Delivery
              </h3>
              <p className="text-sm text-[#A6ADBB] leading-relaxed">
                Alongside the six trades above, I work with other qualified local and commercial service operators across seven core markets, scheduling calls across AU, UK, IE, US, CA, NZ, and India hours.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {targetMarketsData.map((market) => (
                <div
                  key={market.code}
                  className="rounded-md border border-white/10 bg-[#111318] px-3.5 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#F4F5F7]">
                      {market.country}
                    </span>
                    <span className="font-mono text-[11px] text-[#18C4A8]">
                      {market.code}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8890A0] leading-snug">
                    {market.callWindowNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
