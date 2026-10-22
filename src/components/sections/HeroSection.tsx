import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { AnimatedHeading } from '../animation/AnimatedHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';

export const HeroSection: React.FC = () => {
  const reducedMotion = useReducedMotion();

  const scrollToNextSection = () => {
    scrollToTargetSmooth('stage-story', {
      offset: 76,
      duration: 680,
      reducedMotion,
    });
  };

  return (
    <section
      id="stage-hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden bg-[#050505] pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-20"
    >
      {/* Subtle Grid & Controlled Gradient Lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-65" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[760px] rounded-full blur-3xl opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(22,119,255,0.22) 0%, rgba(8,217,245,0.14) 42%, rgba(0,230,168,0.08) 70%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Core Proposition, Heading, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-xs sm:text-sm font-mono tracking-wide text-[#08D9F5]">
              {siteConfig.tagline}
            </p>

            <AnimatedHeading
              id="hero-heading"
              as="h1"
              text="Turn Your Digital Presence Into Growth."
              highlightWords={['Digital', 'Presence', 'Growth']}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            />

            <p className="max-w-2xl text-base sm:text-lg text-[#A5AAB4] leading-relaxed">
              Websites, performance marketing, and intelligent digital experiences designed to turn attention into meaningful enquiries and business opportunities.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl gp-gradient-bg px-6 py-3.5 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
              >
                <span>Let&apos;s Build Your Growth</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#0B0D10] px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-colors duration-150 hover:border-[#08D9F5]/60 hover:bg-white/[0.04] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Quiet Unboxed Capability Strip (Zero-Pill Discipline) */}
            <div className="pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#A5AAB4]">
              <span>Website Architecture</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Google Ads &amp; Search</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Conversion Optimization</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>GA4 &amp; GTM Measurement</span>
            </div>
          </div>

          {/* Right Column: Prominent Original GrowthPilot Brand Artwork with Directional Arrow Reveal & Light Sweep */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Controlled Blue/Cyan/Green Glow behind Logo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-3xl opacity-75 blur-2xl"
                style={{
                  background:
                    'linear-gradient(110deg, rgba(22,119,255,0.28), rgba(8,217,245,0.22), rgba(0,230,168,0.24))',
                }}
              />

              {/* Primary Brand Showcase Card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#050505] p-6 sm:p-8 shadow-2xl">
                {/* Subtle Traveling Gradient Light Sweep (Compositor-thread CSS animation) */}
                {!reducedMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-1/2 z-20 gp-light-sweep"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(8,217,245,0.10) 50%, transparent 100%)',
                    }}
                  />
                )}

                {/* Animated Vector Emblem & Directional Arrow Reveal Above Original Brand Lockup */}
                <div className="relative mx-auto flex flex-col items-center">
                  <div className="relative h-36 w-36 sm:h-44 sm:w-44 flex items-center justify-center">
                    <img
                      src={siteConfig.assets.emblemSvg}
                      alt="GrowthPilot Circular Growth Emblem"
                      width={176}
                      height={176}
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain select-none"
                    />
                    <img
                      src={siteConfig.assets.arrowSvg}
                      alt=""
                      aria-hidden="true"
                      width={176}
                      height={176}
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      referrerPolicy="no-referrer"
                      className={`pointer-events-none absolute inset-0 h-full w-full object-contain ${
                        reducedMotion ? '' : 'gp-arrow-enter'
                      }`}
                    />
                  </div>

                  {/* Original Uploaded Brand Lockup */}
                  <div className="mt-4 text-center">
                    <div className="font-extrabold tracking-tight text-3xl sm:text-4xl">
                      <span className="text-white">Growth</span>
                      <span className="gp-gradient-text">Pilot</span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm tracking-[0.18em] text-white/85 font-light">
                      Navigate Growth With Intelligence.
                    </p>
                  </div>

                  {/* Journey Stage Readout Footer */}
                  <div className="mt-6 w-full border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#A5AAB4] font-mono">
                    <span>The Growth Journey</span>
                    <span>Every Scroll Moves You Forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 mx-auto mt-10 flex justify-center">
        <button
          type="button"
          onClick={scrollToNextSection}
          aria-label="Scroll to Growth Story section"
          className="group inline-flex items-center gap-2 text-xs font-mono text-[#A5AAB4] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-md px-3 py-1.5"
        >
          <span>Begin the Growth Journey</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#08D9F5] transition-transform duration-200 group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
