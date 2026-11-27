import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { buildWhatsAppContactUrl } from '../../lib/validation';
import { trackConversionEvent } from '../../lib/analytics';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EditorialEyebrow } from '../ui/EditorialPrimitives';
import { Magnet } from '../animation/Magnet';
import { GradientText } from '../animation/GradientText';

const engagementLedgerRows = [
  {
    label: 'Specialist',
    value: 'Abhijit Roy — hands-on execution from audit through ongoing management',
  },
  {
    label: 'Core Trades',
    value: 'HVAC, Solar, Dental, Roofing, Epoxy Flooring, Plumbing & local service trades',
  },
  {
    label: 'Markets',
    value: 'United States, UK, Australia, Canada, Ireland, New Zealand & India',
  },
  {
    label: 'Primary Outcomes',
    value: 'Qualified phone calls, WhatsApp threads, quote forms & consultation bookings',
  },
  {
    label: 'Ownership',
    value: '100% client-owned Google Ads & GA4 accounts; direct ad-platform billing',
  },
];

export const HeroSection: React.FC = () => {
  const reducedMotion = useReducedMotion();

  const whatsappDirectHref = buildWhatsAppContactUrl(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappMessage
  );

  const scrollToNextSection = () => {
    scrollToTargetSmooth('stage-story', {
      offset: window.innerWidth < 1024 ? 84 : 76,
      duration: 620,
      reducedMotion,
    });
  };

  return (
    <section
      id="stage-hero"
      aria-labelledby="hero-heading"
      className="relative bg-[#090A0D] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Clear Positioning, Outcome & Immediate Contact Paths */}
          <div className="lg:col-span-7 space-y-6">
            <EditorialEyebrow
              label="Google Ads Specialist · Service Businesses"
              tone="teal"
            />

            <h1
              id="hero-heading"
              className="text-[2.35rem] sm:text-5xl lg:text-[3.55rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.06]"
            >
              <GradientText>Google Ads</GradientText> That Turn Local Search Into Qualified Enquiries.
            </h1>

            <p className="max-w-[62ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
              I plan, build, and manage search campaigns, high-clarity landing pages, and verified GA4 attribution directly for HVAC, solar, dental, roofing, epoxy flooring, and plumbing businesses across the US, UK, Australia, Canada, Ireland, New Zealand, and India.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Magnet>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md bg-[#F4F5F7] px-6 py-3 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                >
                  <span>Request a Free Account Review</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Magnet>

              <Link
                to="/services"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm sm:text-base font-medium text-[#F4F5F7] transition-colors duration-150 hover:border-white/45 hover:bg-white/[0.04] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>

            {/* Direct Specialist Contact Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-sm text-[#A6ADBB]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8890A0]">
                Direct Channels:
              </span>
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  onClick={() =>
                    trackConversionEvent('email_click', {
                      contact_method: 'email',
                      event_label: 'hero_direct_email',
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-[#F4F5F7] hover:text-[#18C4A8] transition-colors break-all"
                >
                  <Mail className="h-3.5 w-3.5 text-[#18C4A8] shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              )}
              <a
                href={whatsappDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent('whatsapp_click', {
                    contact_method: 'whatsapp',
                    event_label: 'hero_direct_whatsapp',
                  })
                }
                className="inline-flex items-center gap-1.5 text-[#F4F5F7] hover:text-[#18C4A8] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#18C4A8] shrink-0" aria-hidden="true" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Specification Panel */}
          <aside
            aria-label="Professional Specification"
            className="lg:col-span-5 rounded-lg border border-white/12 bg-[#111318]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4F5F7]">
                Overview
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#18C4A8]">
                No Agency Handoffs
              </span>
            </div>

            <dl className="divide-y divide-white/10 px-5 sm:px-6">
              {engagementLedgerRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-1.5 py-3.5 sm:grid-cols-12 sm:gap-4"
                >
                  <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-wider text-[#8890A0]">
                    {row.label}
                  </dt>
                  <dd className="sm:col-span-8 text-sm text-[#F4F5F7] leading-snug">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center justify-between border-t border-white/10 bg-[#090A0D]/55 px-5 py-3.5 sm:px-6">
              <span className="font-mono text-xs text-[#A6ADBB]">
                Reply window: {siteConfig.contact.responseWindow}
              </span>
              <button
                type="button"
                onClick={scrollToNextSection}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#18C4A8] hover:text-[#F4F5F7] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] rounded-sm"
              >
                <span>How It Works</span>
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
