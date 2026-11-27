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
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { AnimatedContent } from '../components/animation/AnimatedContent';
import { EditorialEyebrow, EditorialSectionHeader } from '../components/ui/EditorialPrimitives';
import { Magnet } from '../components/animation/Magnet';

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

  const meta = getRouteMetaByPath('/dental-implant-marketing')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/dental-implant-marketing',
    structuredData,
  });

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      {/* Hero Section */}
      <section className="border-b border-white/10 pt-12 pb-16 sm:pt-18 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs text-[#8890A0]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-[#F4F5F7] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="hover:text-[#F4F5F7] transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#18C4A8]" aria-current="page">
                Dental Implant Marketing
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-5">
            <EditorialEyebrow label="Industry Playbook // Dental Implant PPC & Consultation Funnels" />
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
              Google Ads Management for Dental Implant Clinics.
            </h1>
            <p className="max-w-[62ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
              High-value dental implant treatments require search campaigns built around patient intent, clear consultation landing pages, and accurate call and form tracking. As an independent Google Ads specialist, I help dental implant clinics across the US, UK, Australia, Canada, Ireland, and New Zealand turn local search demand into qualified consultation enquiries—without agency bloat or long-term lock-in.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Magnet>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md bg-[#F4F5F7] px-6 py-3 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors hover:bg-[#18C4A8]"
                >
                  <span>Request a Dental Campaign &amp; Page Review</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Magnet>
              <Link
                to="/services"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm sm:text-base font-medium text-[#F4F5F7] hover:border-white/45 hover:bg-white/[0.04] transition-colors"
              >
                <span>View All Service Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="border-b border-white/10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EditorialSectionHeader
            index="01"
            eyebrow="Acquisition Architecture"
            title="How I Structure Dental Implant PPC & Landing Pages"
            lead="Prospective implant patients compare treatment options, recovery expectations, and financing before booking an exam. Each campaign connects search intent directly to a dedicated consultation pathway."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {implantPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <AnimatedContent key={pillar.step} initiallyVisible={idx < 2} distance={10}>
                  <article className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#111318] p-6 sm:p-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8] tabular-nums">
                          Pillar {pillar.step}
                        </span>
                        <Icon className="h-5 w-5 text-[#A6ADBB]" aria-hidden="true" />
                      </div>

                      <h3 className="mt-5 text-xl sm:text-2xl font-bold text-[#F4F5F7]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                        {pillar.description}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm text-[#F4F5F7]/90">
                        {pillar.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                              aria-hidden="true"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaign Alignment & Checklist */}
      <section className="border-b border-white/10 bg-[#111318] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6 space-y-5">
              <EditorialEyebrow index="02" label="Campaign & Conversion Alignment" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F5F7]">
                Aligning Search Intent With Front-Desk Consultation Enquiries
              </h2>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                When a dental clinic runs Google Search Ads without separating procedure types or filtering out informational queries, budget is quickly consumed by clicks that never become appointments.
              </p>
              <p className="text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                I align every step of the patient enquiry funnel: high-intent search keywords, clear ad copy written inside local advertising guidelines, a dedicated dental implant landing page, and verified tracking for phone calls and consultation forms. You always retain full ownership of your Google Ads account and pay Google directly for ad spend.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#F4F5F7]">
                <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#090A0D] px-3.5 py-2">
                  <PhoneCall className="h-3.5 w-3.5 text-[#18C4A8]" aria-hidden="true" />
                  <span>Verified Call &amp; Form Tracking</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#090A0D] px-3.5 py-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#18C4A8]" aria-hidden="true" />
                  <span>Direct Specialist · No Lock-In</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-lg border border-white/10 bg-[#090A0D] p-6 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                Clinic Readiness Deliverables
              </h3>
              <ul className="mt-5 divide-y divide-white/10 border-t border-white/10 text-sm text-[#A6ADBB]">
                {campaignReadinessChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                      aria-hidden="true"
                    />
                    <span className="text-[#F4F5F7]/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-white/10 pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors"
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
      <section className="bg-[#090A0D] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F5F7]">
            Planning Google Ads or a Dedicated Landing Page for Your Clinic?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#A6ADBB]">
            Share your clinic’s location, priority implant procedures, and current website URL. I will review your setup personally and outline a clear, practical recommendation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Magnet>
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md bg-[#F4F5F7] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors hover:bg-[#18C4A8]"
              >
                <span>Start Your Dental Clinic Enquiry</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnet>
            <Link
              to="/faq"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-white/20 bg-transparent px-6 py-3.5 text-sm sm:text-base font-medium text-[#F4F5F7] hover:border-white/45 transition-colors"
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
