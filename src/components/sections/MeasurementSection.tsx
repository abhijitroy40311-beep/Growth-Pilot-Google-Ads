import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AnimatedContent } from '../animation/AnimatedContent';
import { DotGrid } from '../animation/DotGrid';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

const trackingArchitecture = [
  {
    code: '01',
    title: 'Primary vs. Secondary Signal Separation',
    description:
      'Automated bidding should only optimize toward verified quote forms, booked calls, and confirmed WhatsApp enquiries—never raw pageviews or accidental UI clicks.',
  },
  {
    code: '02',
    title: 'GA4 + Google Tag Manager Verification',
    description:
      'Every trigger (`generate_lead`, `phone_click`, `whatsapp_click`, `email_click`) is verified via Tag Manager preview and deduplicated by inquiry ID so conversion counts remain accurate.',
  },
  {
    code: '03',
    title: 'Search-Term & Campaign Attribution',
    description:
      'UTM parameters and lead reference metadata trace enquiries back to specific campaigns and keyword themes without exposing unnecessary sensitive personal data.',
  },
  {
    code: '04',
    title: 'Transparent Billing & Client Ownership',
    description:
      'Ad spend goes directly from your billing method to Google Ads. Your GTM container, GA4 property, and historical search data stay under your company administration.',
  },
];

export const MeasurementSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="stage-measurement"
      aria-labelledby="measurement-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#111318] py-16 sm:py-24 lg:py-28"
    >
      <DotGrid containerRef={sectionRef} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="measurement-heading"
          index="05"
          eyebrow="Conversion Tracking & Measurement"
          title="Reliable Attribution Before Scaling Spend."
          lead="Without verified conversion tracking, Smart Bidding chases low-value clicks and reporting hides which services actually drive phone calls or quotes."
          action={
            <Link
              to="/projects?category=Analytics+%26+Strategy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors whitespace-nowrap"
            >
              <span>View Measurement Blueprint</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {trackingArchitecture.map((item, idx) => (
            <AnimatedContent key={item.code} delay={idx * 0.04} distance={10}>
              <article className="h-full rounded-lg border border-white/10 bg-[#090A0D] p-6 sm:p-8">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8] tabular-nums">
                  {item.code} // Measurement Control
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#F4F5F7]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                  {item.description}
                </p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};
