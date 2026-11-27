import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { AnimatedContent } from '../components/animation/AnimatedContent';
import { EditorialEyebrow, EditorialSectionHeader } from '../components/ui/EditorialPrimitives';
import { Magnet } from '../components/animation/Magnet';

const practiceFacts = [
  { label: 'Founder & Specialist', value: 'Abhijit Roy (1-on-1 client engagement)' },
  { label: 'Base & Coordination', value: 'Kolkata, India (IST) · AU, UK, IE & US East overlap' },
  { label: 'Verified Analytics ID', value: 'Google Analytics Credential #201105118' },
  { label: 'Billing Model', value: 'Clients own ad accounts and pay Google directly' },
];

const philosophyPhases = [
  {
    step: '01',
    title: 'Understand',
    detail:
      'Clarify your trade economics, catchment area, buyer urgency, and what separates a profitable lead from wasted clicks.',
  },
  {
    step: '02',
    title: 'Plan',
    detail:
      'Map out campaign segmentation, negative keyword protection, page hierarchy, and verified primary conversion triggers.',
  },
  {
    step: '03',
    title: 'Build',
    detail:
      'Develop responsive landing pages, structured Search campaigns, and clean GA4 + Google Tag Manager configurations.',
  },
  {
    step: '04',
    title: 'Measure',
    detail:
      'Verify enquiry form submissions, phone clicks, and WhatsApp events using clean debugging—without inflating vanity counts.',
  },
  {
    step: '05',
    title: 'Improve',
    detail:
      'Review real search-term logs and visitor drop-offs systematically to refine targeting, bids, and enquiry conversion paths.',
  },
];

const operatingValues = [
  {
    code: '01',
    title: 'Clarity Over Complexity',
    description:
      'Recommendations are written in plain business language—explaining what is being changed, why it matters commercially, and what input is needed.',
  },
  {
    code: '02',
    title: 'Integrated Execution',
    description:
      'Paid search, landing page experience, and analytics tracking are handled together so clicks never stall on slow or confusing pages.',
  },
  {
    code: '03',
    title: 'Honest Attribution',
    description:
      'I separate raw engagement from genuine business enquiries so bidding decisions rely on confirmed leads rather than inflated surface numbers.',
  },
  {
    code: '04',
    title: 'Respect for Budget & Ownership',
    description:
      'You keep administrative control of every Google Ads and analytics asset with transparent scope and zero long-term lock-in traps.',
  },
];

export const About: React.FC = () => {
  const meta = getRouteMetaByPath('/about')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/about',
    structuredData: buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  });

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      {/* Hero Section */}
      <section className="border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <EditorialEyebrow label={`About GrowthPilot · ${siteConfig.tagline}`} />
              <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
                Direct Specialist Execution. Transparent Paid Search &amp; Measurement.
              </h1>
              <p className="max-w-[62ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
                GrowthPilot is an independent Google Ads and conversion-focused web consultancy operated directly by Abhijit Roy. I work with HVAC, solar, dental, roofing, epoxy flooring, plumbing, and local service businesses across the US, UK, Australia, Canada, Ireland, New Zealand, and India—connecting search intent with clear landing pages and reliable GA4 attribution.
              </p>
            </div>

            <aside
              aria-label="Consultant Profile Ledger"
              className="lg:col-span-5 rounded-lg border border-white/12 bg-[#111318]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
                  Consultant Credentials
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#18C4A8]">
                  Test
                </span>
              </div>
              <dl className="divide-y divide-white/10 px-5 sm:px-6">
                {practiceFacts.map((fact) => (
                  <div key={fact.label} className="py-3.5 space-y-1">
                    <dt className="font-mono text-xs uppercase tracking-wider text-[#8890A0]">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-[#F4F5F7]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Approach & Why Specialist */}
      <section className="border-b border-white/10 bg-[#111318] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <AnimatedContent initiallyVisible className="lg:col-span-6 space-y-4">
              <EditorialEyebrow index="01" label="Why Independent" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
                Accountability Without Agency Layers
              </h2>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                Many service businesses sign retainer contracts with multi-tier agencies only to find their ad campaigns passed to junior coordinators splitting attention across dozens of unrelated accounts.
              </p>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                Working with GrowthPilot means the person auditing your search terms, refining negative keywords, shaping your landing page copy, and verifying GTM tags is the same specialist advising you directly on calls and WhatsApp.
              </p>
            </AnimatedContent>

            <AnimatedContent
              initiallyVisible
              className="lg:col-span-6 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0 space-y-4"
            >
              <EditorialEyebrow index="02" label="How Campaigns & Pages Align" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
                Connecting Search Intent, Web Architecture &amp; Data
              </h2>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                Paid search underperforms when keyword strategy, landing-page clarity, and tracking operate in silos. Every engagement integrates all three:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#F4F5F7]/90">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                  <span>Intent-matched landing pages written for buyer questions and immediate calls</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                  <span>Disciplined negative keyword guardrails blocking irrelevant or low-intent clicks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                  <span>Clean GA4 &amp; Tag Manager tracking for verified forms, calls, and WhatsApp enquiries</span>
                </li>
              </ul>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Operating Sequence */}
      <section className="border-b border-white/10 bg-[#090A0D] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EditorialSectionHeader
            index="03"
            eyebrow="Working Sequence"
            title="Understand → Plan → Build → Measure → Improve"
            lead="A repeatable sequence that keeps decisions grounded in commercial priorities rather than vanity metrics."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {philosophyPhases.map((phase, idx) => (
              <AnimatedContent
                key={phase.step}
                delay={idx * 0.04}
                distance={8}
                className="flex h-full flex-col bg-[#111318] p-6"
              >
                <div className="font-mono text-xs text-[#18C4A8] tabular-nums">
                  Phase {phase.step}
                </div>
                <h3 className="mt-3 text-xl font-bold text-[#F4F5F7]">{phase.title}</h3>
                <p className="mt-2.5 text-sm text-[#A6ADBB] leading-relaxed">{phase.detail}</p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-b border-white/10 bg-[#111318] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <EditorialEyebrow index="04" label="Working Standards" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F5F7]">
                What to Expect When Working Together
              </h2>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                No exaggerated revenue promises, fabricated screenshots, or opaque retainers. You receive straightforward reporting tied to verified enquiry paths and full administrative control of your Google Ads and GA4 properties.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {operatingValues.map((val, idx) => (
                <AnimatedContent key={val.title} delay={idx * 0.04} distance={10}>
                  <div className="h-full rounded-lg border border-white/10 bg-[#090A0D] p-6">
                    <div className="font-mono text-xs text-[#18C4A8] tabular-nums">
                      {val.code} // Standard
                    </div>
                    <h3 className="mt-2.5 text-lg font-bold text-[#F4F5F7]">{val.title}</h3>
                    <p className="mt-2 text-sm text-[#A6ADBB] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#090A0D] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F5F7]">
            Ready to Review Your Campaigns or Landing Pages?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#A6ADBB]">
            Share your service industry, target market, and website URL for a direct personal review.
          </p>
          <div className="mt-8 flex justify-center">
            <Magnet>
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md bg-[#F4F5F7] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8]"
              >
                <span>Request a Free Account Review</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnet>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
