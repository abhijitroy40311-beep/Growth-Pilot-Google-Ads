import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { AnimatedHeading } from '../animation/AnimatedHeading';

export const FinalCTASection: React.FC = () => {
  return (
    <section
      id="stage-contact"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[680px] rounded-full blur-3xl opacity-45"
        style={{
          background:
            'radial-gradient(circle, rgba(22,119,255,0.24) 0%, rgba(8,217,245,0.16) 45%, rgba(0,230,168,0.12) 75%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-[#0B0D10]/95 p-8 sm:p-12 md:p-16 shadow-2xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono text-[#08D9F5]">
                06 · Ready When You Are
              </div>
              <AnimatedHeading
                id="final-cta-heading"
                as="h2"
                text="Let's Talk About Your Next Move."
                highlightWords={['Next', 'Move']}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
              />
              <p className="max-w-xl text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
                Tell us a little about your business and what you want to improve. We will review your goals and outline a clear, practical path forward.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-xl gp-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
                >
                  <span>Start Your Project Inquiry</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#050505] px-5 py-3.5 text-sm sm:text-base font-medium text-white hover:border-[#08D9F5]/50 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Review Services</span>
                </Link>
              </div>
            </div>

            {/* Final Stage Brand Emblem Companion Anchor */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div className="relative aspect-square h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src={siteConfig.assets.emblemSvg}
                  alt="GrowthPilot Emblem"
                  width={112}
                  height={112}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-4 text-center text-xs font-mono text-white/80">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
