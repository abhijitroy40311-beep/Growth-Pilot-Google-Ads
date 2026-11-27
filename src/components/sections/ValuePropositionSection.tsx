import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimatedContent } from '../animation/AnimatedContent';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

const diagnosticPairs = [
  {
    code: '01',
    leak: 'Generic homepages trying to convert every service at once',
    fix: 'Dedicated landing pages matching the exact trade query, service area, and call or quote flow.',
  },
  {
    code: '02',
    leak: 'Broad keyword matching funding job seekers, DIY terms & outside-area clicks',
    fix: 'Intent-segmented Search campaigns protected by active negative keyword exclusions and strict location radius rules.',
  },
  {
    code: '03',
    leak: 'Bidding optimizing for raw traffic or button taps with broken GA4 setups',
    fix: 'Verified GTM + GA4 primary events tied strictly to real form submissions, qualified phone calls, and WhatsApp enquiries.',
  },
  {
    code: '04',
    leak: 'Sales-to-junior handoffs inside bloated agency retainers',
    fix: 'Direct 1-on-1 collaboration with Abhijit Roy across campaign build, landing page CRO, and weekly search-term audits.',
  },
];

export const ValuePropositionSection: React.FC = () => {
  return (
    <section
      id="stage-story"
      aria-labelledby="value-prop-heading"
      className="border-t border-white/10 bg-[#111318] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="value-prop-heading"
          index="01"
          eyebrow="Value Proposition"
          title="Most Ad Waste Happens Between the Click and the Enquiry."
          lead="More traffic rarely fixes a broken funnel. Profitable local search connects high-intent keywords, message-matched service pages, and trustworthy conversion attribution."
          action={
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors"
            >
              <span>Request a Diagnostic Review</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 border-t border-white/10">
          <div className="hidden lg:grid lg:grid-cols-12 border-b border-white/10 py-3 text-xs font-mono uppercase tracking-[0.12em] text-[#8890A0]">
            <div className="lg:col-span-1">Ref</div>
            <div className="lg:col-span-5 pr-8">Common Budget Leak</div>
            <div className="lg:col-span-6 pl-6 border-l border-white/10">
              GrowthPilot Remediation Standard
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {diagnosticPairs.map((item, idx) => (
              <AnimatedContent key={item.code} delay={idx * 0.04} distance={10}>
                <div className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-baseline lg:gap-0">
                  <div className="lg:col-span-1 font-mono text-xs text-[#18C4A8] tabular-nums">
                    {item.code}
                  </div>
                  <div className="lg:col-span-5 lg:pr-8">
                    <span className="lg:hidden block font-mono text-[11px] uppercase tracking-wider text-[#8890A0] mb-1">
                      Common Budget Leak
                    </span>
                    <p className="text-base font-medium text-[#A6ADBB] leading-relaxed">
                      {item.leak}
                    </p>
                  </div>
                  <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-6">
                    <span className="lg:hidden block font-mono text-[11px] uppercase tracking-wider text-[#18C4A8] mb-1">
                      GrowthPilot Approach
                    </span>
                    <p className="text-base font-medium text-[#F4F5F7] leading-relaxed">
                      {item.fix}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
