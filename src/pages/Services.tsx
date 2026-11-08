import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';
import { ScrollReveal } from '../components/animation/ScrollReveal';
import { scrollToTargetSmooth } from '../lib/scrollLogic';
import { useReducedMotion } from '../hooks/useReducedMotion';

const iconMap = {
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
};

export const Services: React.FC = () => {
  const reducedMotion = useReducedMotion();

  const structuredData = [
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'GrowthPilot Digital Growth & Google Ads Management Services',
      itemListElement: servicesData.map((s, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: s.title,
          description: s.fullDescription,
          provider: {
            '@type': 'Organization',
            name: siteConfig.brandName,
            url: siteConfig.domain,
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
        },
      })),
    },
  ];

  useDocumentMeta({
    title: 'Google Ads Management, PPC, Website Design & CRO Services | GrowthPilot',
    description:
      'Explore GrowthPilot’s Google Ads management services, PPC campaign optimization, lead-generation website design, landing page CRO, and GA4 conversion tracking.',
    path: '/services',
    structuredData,
  });

  return (
    <div className="bg-[#050505] text-white">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
              GrowthPilot Capabilities · Five Connected Disciplines
            </p>
            <AnimatedHeading
              as="h1"
              text="Everything You Need to Move Forward."
              highlightWords={['Move', 'Forward']}
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            />
            <p className="mt-5 text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
              Practical digital solutions designed around your business goals—from Google Ads management and high-converting lead generation websites to clean GA4 and Google Tag Manager measurement.
            </p>
          </div>

          {/* Anchor Jump Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-2">
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTargetSmooth(s.id, {
                    offset: 88,
                    duration: 640,
                    reducedMotion,
                  });
                }}
                className="rounded-lg border border-white/10 bg-[#0B0D10] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#A5AAB4] hover:border-[#08D9F5]/50 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {s.number}. {s.title}
              </a>
            ))}
            <Link
              to="/dental-implant-marketing"
              className="rounded-lg border border-[#08D9F5]/35 bg-[#0B0D10] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#08D9F5] hover:border-[#08D9F5] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Industry Focus: Dental Implant PPC →
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {servicesData.map((service, idx) => {
            const IconComponent = iconMap[service.iconName];

            return (
              <ScrollReveal key={service.id} initiallyVisible={idx === 0}>
                <article
                  id={service.id}
                  className="scroll-mt-24 rounded-2xl border border-white/10 bg-[#0B0D10] p-6 sm:p-10 lg:p-12"
                >
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#050505] text-[#08D9F5]">
                          <IconComponent className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-xs text-[#08D9F5]">
                          Service {service.number}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                        {service.fullDescription}
                      </p>

                      <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-xs sm:text-sm text-[#A5AAB4]">
                        <strong className="text-white">When to choose this service:</strong>{' '}
                        {service.idealFor}
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 rounded-xl gp-gradient-bg px-5 py-3 text-xs sm:text-sm font-semibold text-[#050505] transition-transform duration-150 hover:scale-[1.02]"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {service.id === 'google-ads' && (
                          <Link
                            to="/dental-implant-marketing"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#050505] px-4 py-3 text-xs sm:text-sm font-medium text-[#08D9F5] hover:border-[#08D9F5]/60 hover:text-white transition-colors"
                          >
                            <span>Dental Implant Google Ads Solution</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                      <div>
                        <h3 className="text-xs font-mono text-[#08D9F5]">
                          Core Capabilities
                        </h3>
                        <ul className="mt-3 space-y-2.5 text-sm text-white/90">
                          {service.capabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-2.5">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                                aria-hidden="true"
                              />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-white/10 pt-5">
                        <h3 className="text-xs font-mono text-white/75">
                          Typical Project Deliverables
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-[#A5AAB4]">
                          {service.deliverables.map((del) => (
                            <li key={del} className="flex items-start gap-2.5">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#08D9F5]"
                                aria-hidden="true"
                              />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;

