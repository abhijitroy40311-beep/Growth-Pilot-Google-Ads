import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  ShieldCheck,
  PhoneCall,
  Layout,
  BarChart3,
  Check,
  ArrowRight,
  Filter,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';
import { ScrollReveal } from '../components/animation/ScrollReveal';

const implantPillars = [
  {
    icon: Target,
    step: '01',
    title: 'High-Intent Dental Implant Search Structuring',
    description:
      'I separate high-value implant procedures—such as full-arch restoration, All-on-4 consultations, and single-tooth dental implants—into distinct Google Search ad groups so ad copy matches what prospective patients are actively searching for.',
    points: [
      'Dedicated ad groups for full-arch, multi-tooth, and single dental implant queries',
      'Radius, postcode, and zip-code location targeting around your clinic’s actual catchment area',
      'Ad scheduling aligned with front-desk phone coverage and consultation booking hours',
    ],
  },
  {
    icon: Filter,
    step: '02',
    title: 'Disciplined Negative Keyword Protection',
    description:
      'Dental search traffic often includes irrelevant queries that drain ad spend. I maintain structured negative keyword lists to filter out non-patient and low-intent searches before they cost your clinic budget.',
    points: [
      'Excludes dental assistant jobs, hygienist salaries, and continuing education courses',
      'Filters out unrelated general dentistry, free-clinic lookups, and DIY repair terms',
      'Ongoing search-term audits to keep budget focused on consultation-ready prospects',
    ],
  },
  {
    icon: Layout,
    step: '03',
    title: 'Conversion-Focused Implant Consultation Landing Pages',
    description:
      'Sending paid dental implant traffic to a general practice homepage forces visitors to hunt for information. I structure dedicated consultation landing pages built around patient questions, treatment clarity, and low-friction booking.',
    points: [
      'Message-matched headlines addressing implant options, candidacy, and consultation steps',
      'Prominent mobile click-to-call buttons and concise consultation request forms',
      'Fast mobile loading speed built for strong Core Web Vitals on cellular connections',
    ],
  },
  {
    icon: BarChart3,
    step: '04',
    title: 'Privacy-Safe Call & Consultation Conversion Tracking',
    description:
      'Know which campaigns and search terms generate genuine consultation requests—not just raw clicks. I configure Google Analytics 4 (GA4) and Google Tag Manager (GTM) to track verified enquiry actions without exposing patient data.',
    points: [
      'Primary conversions tracked strictly on verified consultation form submissions and qualified calls',
      'Button and click-to-call interactions kept as secondary signals so Smart Bidding stays accurate',
      'Privacy-conscious setup avoiding patient health details (PHI) in analytics tags across US, UK, and AU rules',
    ],
  },
];

const campaignReadinessChecklist = [
  'Direct specialist management by Abhijit Roy—no junior account managers or hand-offs',
  'Clear separation between full-arch / All-on-4 campaigns and single-implant search ad groups',
  'Dedicated landing page structure with clinician credentials, consultation steps, and FAQ clarity',
  'Negative keyword guardrails blocking career, academic, and non-implant search terms',
  'Verified GA4, Google Tag Manager, and Google Ads conversion actions for real enquiries',
  'Transparent monthly reporting where you own your ad account and pay Google directly',
];

export const DentalImplantMarketing: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Google Ads for Dental Implant Clinics', path: '/dental-implant-marketing' },
      ]),
      {
        '@type': 'Service',
        name: 'Google Ads Management for Dental Implant Clinics',
        serviceType: 'Dental Implant Google Ads Management & Conversion Tracking',
        provider: {
          '@type': 'ProfessionalService',
          name: siteConfig.brandName,
          url: siteConfig.domain,
        },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Ireland' },
          { '@type': 'Country', name: 'New Zealand' },
        ],
        description:
          'Independent Google Ads management, dental implant PPC campaign structuring, consultation landing pages, and privacy-safe GA4/GTM call and form tracking for dental clinics internationally.',
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SEOHead
        title="Google Ads for Dental Implant Clinics | Independent PPC Specialist | GrowthPilot"
        description="Independent Google Ads management for dental implant clinics across the US, UK, Australia, Canada, and Ireland. High-intent Search campaigns, negative keywords, and privacy-safe GA4 conversion tracking."
        path="/dental-implant-marketing"
        schema={structuredData}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs font-mono text-[#A5AAB4]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#08D9F5]" aria-current="page">
                Dental Implant Marketing
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
              Industry Solution · Dental Implant PPC &amp; Consultation Funnels
            </p>
            <AnimatedHeading
              as="h1"
              text="Google Ads Management for Dental Implant Clinics."
              highlightWords={['Google', 'Ads', 'Dental', 'Implant']}
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            />
            <p className="mt-5 text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
              High-value dental implant treatments require search campaigns built around patient intent, clear consultation landing pages, and accurate call and form tracking. As an independent Google Ads specialist, I help dental implant clinics across the US, UK, Australia, Canada, Ireland, and New Zealand turn local search demand into qualified consultation enquiries—without agency bloat or long-term lock-in.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl gp-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02]"
              >
                <span>Request a Dental Campaign &amp; Landing Page Review</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#0B0D10] px-6 py-3.5 text-sm sm:text-base font-medium text-white hover:border-[#08D9F5]/60 transition-colors"
              >
                <span>View All Service Industries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of Dental Implant Google Ads & Funnel Architecture */}
      <section className="py-16 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#08D9F5]">
              01 · Dental Implant Lead Generation Architecture
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              How I Structure Dental Implant PPC &amp; Landing Pages
            </h2>
            <p className="mt-3 text-base text-[#A5AAB4] leading-relaxed">
              Prospective implant patients compare treatment options, recovery expectations, and financing before booking an exam. Each campaign connects search intent directly to a dedicated consultation pathway.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {implantPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.step} initiallyVisible={idx < 2}>
                  <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0D10] p-6 sm:p-8">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#050505] text-[#08D9F5]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-xs text-[#00E6A8]">
                          Pillar {pillar.step}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl sm:text-2xl font-bold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                        {pillar.description}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm text-white/90">
                        {pillar.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                              aria-hidden="true"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Dental Implant Campaigns Require Dedicated Landing Pages & Negative Keywords */}
      <section className="py-16 sm:py-24 border-b border-white/10 bg-[#0B0D10]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-[#00E6A8]">
                02 · Campaign &amp; Conversion Alignment
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Aligning Search Intent With Front-Desk Consultation Enquiries
              </h2>
              <p className="text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                When a dental clinic runs Google Search Ads without separating procedure types or filtering out informational queries, budget is quickly consumed by clicks that never become appointments.
              </p>
              <p className="text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                I align every step of the patient enquiry funnel: high-intent search keywords, clear ad copy written inside local advertising guidelines, a dedicated dental implant landing page, and verified tracking for phone calls and consultation forms. You always retain full ownership of your Google Ads account and pay Google directly for ad spend.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#08D9F5]">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#050505] px-3 py-1.5">
                  <PhoneCall className="h-3.5 w-3.5 text-[#00E6A8]" aria-hidden="true" />
                  <span>Verified Call &amp; Form Tracking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#050505] px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#08D9F5]" aria-hidden="true" />
                  <span>Direct Specialist · No Lock-In</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#050505] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white">
                What Your Dental Clinic Receives
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#A5AAB4]">
                {campaignReadinessChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#08D9F5]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/10 pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#08D9F5] hover:text-[#00E6A8] transition-colors"
                >
                  <span>Discuss Your Dental Clinic’s Growth Goals</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-[#050505]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Planning Google Ads or a Dedicated Landing Page for Your Clinic?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#A5AAB4]">
            Share your clinic’s location, priority implant procedures, and current website URL. I will review your setup personally and outline a clear, practical recommendation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl gp-gradient-bg px-7 py-4 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02]"
            >
              <span>Start Your Dental Clinic Enquiry</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#0B0D10] px-6 py-4 text-sm sm:text-base font-medium text-white hover:border-[#08D9F5]/50 transition-colors"
            >
              <span>Read Campaign &amp; Process FAQs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DentalImplantMarketing;
