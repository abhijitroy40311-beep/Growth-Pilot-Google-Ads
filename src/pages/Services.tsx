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
import { AnimatedHeading } from '../components/animation/AnimatedHeading';
import { ScrollReveal } from '../components/animation/ScrollReveal';

const iconMap = {
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
};

export const Services: React.FC = () => {
  useDocumentMeta({
    title: 'Services — GrowthPilot | Websites, Google Ads, CRO & Analytics',
    description:
      'Explore GrowthPilot’s practical digital services: Website Design & Development, Google Ads, Conversion Optimization, Analytics & Tracking, and Digital Strategy.',
    path: '/services',
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
              Practical digital solutions designed around your business goals—from high-converting websites and search campaigns to clean analytics measurement.
            </p>
          </div>

          {/* Anchor Jump Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-2">
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border border-white/10 bg-[#0B0D10] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#A5AAB4] hover:border-[#08D9F5]/50 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {s.number}. {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName];

            return (
              <ScrollReveal key={service.id}>
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

                      <div className="pt-2">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 rounded-xl gp-gradient-bg px-5 py-3 text-xs sm:text-sm font-semibold text-[#050505] transition-transform duration-150 hover:scale-[1.02]"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
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
