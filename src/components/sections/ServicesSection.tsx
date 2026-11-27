import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../ui/ServiceCard';
import { AnimatedContent } from '../animation/AnimatedContent';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="stage-services"
      aria-labelledby="services-heading"
      className="border-t border-white/10 bg-[#090A0D] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="services-heading"
          index="02"
          eyebrow="Core Capabilities"
          title="Search Campaigns, Landing Pages & Measurement Under One Roof."
          lead="Disconnected freelancers create handoff gaps between ads, website speed, and analytics. Every service below works as an integrated acquisition system."
          action={
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors whitespace-nowrap"
            >
              <span>Compare All 5 Disciplines</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, idx) => (
            <AnimatedContent
              key={service.id}
              delay={idx * 0.04}
              distance={12}
              className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
            >
              <ServiceCard service={service} featured={idx === 0} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};
