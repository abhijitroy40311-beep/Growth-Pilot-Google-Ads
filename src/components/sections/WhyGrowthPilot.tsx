import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { whyGrowthPilotPrinciples } from '../../data/process';
import { AnimatedContent } from '../animation/AnimatedContent';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

export const WhyGrowthPilot: React.FC = () => {
  return (
    <section
      id="stage-why"
      aria-labelledby="why-growthpilot-heading"
      className="border-t border-white/10 bg-[#090A0D] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="why-growthpilot-heading"
          index="06"
          eyebrow="Why GrowthPilot"
          title="An Independent Specialist Practice—Not a Retainer Factory."
          lead="Built around direct specialist execution, client-owned accounts, and transparent progress rather than inflated vanity metrics or generic guarantees."
          action={
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18C4A8] hover:text-[#F4F5F7] transition-colors whitespace-nowrap"
            >
              <span>About Abhijit Roy</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyGrowthPilotPrinciples.map((principle, idx) => (
            <AnimatedContent
              key={principle.number}
              delay={idx * 0.04}
              distance={10}
              className="flex h-full flex-col bg-[#111318] p-6 sm:p-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8] tabular-nums">
                {principle.number} // Standard
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#F4F5F7]">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                {principle.description}
              </p>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};
