import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../ui/ServiceCard';
import { AnimatedHeading } from '../animation/AnimatedHeading';
import { ScrollReveal } from '../animation/ScrollReveal';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="stage-services"
      aria-labelledby="services-heading"
      className="relative border-t border-white/10 bg-[#050505] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-[#08D9F5]">
              02 · Core Digital Capabilities
            </div>
            <AnimatedHeading
              id="services-heading"
              as="h2"
              text="Everything You Need to Move Forward."
              highlightWords={['Move', 'Forward']}
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            />
            <p className="mt-4 text-base sm:text-lg text-[#A5AAB4]">
              Practical digital solutions designed around your business goals.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08D9F5] hover:text-[#00E6A8] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Compare All 5 Services</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              delay={idx * 0.05}
              className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
            >
              <ServiceCard service={service} featured={idx === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
