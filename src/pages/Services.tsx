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
import { getRouteMetaByPath } from '../lib/routeMeta';
import { servicesData } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import { buildBreadcrumbSchema } from '../lib/seo';
import { AnimatedContent } from '../components/animation/AnimatedContent';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';
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
      name: 'GrowthPilot Google Ads Management & Digital Growth Services',
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
          areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'Australia' },
            { '@type': 'Country', name: 'Canada' },
            { '@type': 'Country', name: 'Ireland' },
            { '@type': 'Country', name: 'New Zealand' },
          ],
        },
      })),
    },
  ];

  const meta = getRouteMetaByPath('/services')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/services',
    structuredData,
  });

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      {/* Header */}
      <section className="border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <EditorialEyebrow label="Capabilities // Five Integrated Disciplines" />
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
              Search Campaigns, Websites &amp; Measurement Built Together.
            </h1>
            <p className="max-w-[62ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
              Practical acquisition systems for service businesses—combining high-intent Google Ads management, conversion-focused websites and landing pages, and trustworthy GA4 + GTM tracking.
            </p>
          </div>

          {/* Anchor Jump Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTargetSmooth(s.id, {
                    offset: window.innerWidth < 1024 ? 92 : 84,
                    duration: 580,
                    reducedMotion,
                  });
                }}
                className="inline-flex min-h-[40px] items-center rounded-md border border-white/12 bg-[#111318] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#A6ADBB] hover:border-[#18C4A8]/60 hover:text-[#F4F5F7] transition-colors whitespace-normal sm:whitespace-nowrap shrink-0"
              >
                <span className="font-mono text-[#18C4A8] mr-1.5">{s.number}.</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Catalog */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {servicesData.map((service, idx) => {
            const IconComponent = iconMap[service.iconName];

            return (
              <AnimatedContent key={service.id} initiallyVisible={idx === 0} distance={10}>
                <article
                  id={service.id}
                  className="scroll-mt-24 rounded-lg border border-white/10 bg-[#111318] p-6 sm:p-10 lg:p-12"
                >
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-[#090A0D] text-[#18C4A8]">
                          <IconComponent className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                          Discipline {service.number}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F5F7]">
                        {service.title}
                      </h2>

                      <p className="max-w-[60ch] text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                        {service.fullDescription}
                      </p>

                      <div className="rounded-md border border-white/10 bg-[#090A0D] p-4 text-xs sm:text-sm text-[#A6ADBB]">
                        <strong className="text-[#F4F5F7]">Best Fit:</strong>{' '}
                        {service.idealFor}
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          to="/contact"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#F4F5F7] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#090A0D] transition-colors hover:bg-[#18C4A8]"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                          Core Capabilities
                        </h3>
                        <ul className="mt-3 space-y-2.5 text-sm text-[#F4F5F7]/90">
                          {service.capabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-2.5">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                                aria-hidden="true"
                              />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-white/10 pt-5">
                        <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#8890A0]">
                          Project Deliverables
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-[#A6ADBB]">
                          {service.deliverables.map((del) => (
                            <li key={del} className="flex items-start gap-2.5">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#8890A0]"
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
              </AnimatedContent>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;
