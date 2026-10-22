import React from 'react';
import { whyGrowthPilotPrinciples } from '../../data/process';
import { AnimatedHeading } from '../animation/AnimatedHeading';
import { ScrollReveal } from '../animation/ScrollReveal';
import { siteConfig } from '../../data/siteConfig';

export const WhyGrowthPilot: React.FC = () => {
  return (
    <section
      id="stage-why"
      aria-labelledby="why-growthpilot-heading"
      className="relative border-t border-white/10 bg-[#050505] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="text-xs font-mono text-[#08D9F5]">
              04 · Operating Principles
            </div>
            <AnimatedHeading
              id="why-growthpilot-heading"
              as="h2"
              text="Built Around Progress, Not Empty Promises."
              highlightWords={['Progress', 'Promises']}
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            />
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A5AAB4]">
              We do not rely on exaggerated claims or vanity metrics. Our work is structured around clarity, technical discipline, and practical commercial progress.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0D10] px-4 py-3">
              <img
                src={siteConfig.assets.emblemSvg}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-7 w-7 object-contain"
              />
              <span className="text-xs font-mono text-white/85">
                Understand → Plan → Build → Measure → Improve
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyGrowthPilotPrinciples.map((principle, idx) => (
            <ScrollReveal key={principle.number} delay={idx * 0.05}>
              <div className="h-full rounded-2xl gp-card-surface p-6 sm:p-8">
                <div className="font-mono text-xs text-[#08D9F5]">
                  {principle.number}. Core Principle
                </div>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
