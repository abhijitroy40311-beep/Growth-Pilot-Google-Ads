import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { processSteps } from '../../data/process';
import { siteConfig } from '../../data/siteConfig';
import { AnimatedHeading } from '../animation/AnimatedHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const GrowthTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const arrowMarkerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      setActiveIndex(processSteps.length - 1);
      return;
    }

    const sectionEl = sectionRef.current;
    const lineEl = progressLineRef.current;
    const arrowEl = arrowMarkerRef.current;

    if (!sectionEl || !lineEl) return;

    let isCancelled = false;
    let revertCtx: (() => void) | null = null;

    const initTimeline = () => {
      void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (isCancelled) return;
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            gsap.fromTo(
              lineEl,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionEl,
                  start: 'top 65%',
                  end: 'bottom 70%',
                  scrub: 0.4,
                  onUpdate: (self) => {
                    const stepIdx = Math.min(
                      processSteps.length - 1,
                      Math.floor(self.progress * processSteps.length)
                    );
                    setActiveIndex((prev) => (prev !== stepIdx ? stepIdx : prev));
                    if (arrowEl) {
                      gsap.set(arrowEl, {
                        y: `${self.progress * 100}%`,
                      });
                    }
                  },
                },
              }
            );
          }, sectionRef);

          revertCtx = () => ctx.revert();
        }
      );
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer?.disconnect();
            observer = null;
            initTimeline();
          }
        },
        { rootMargin: '300px 0px' }
      );
      observer.observe(sectionEl);
    } else {
      initTimeline();
    }

    return () => {
      isCancelled = true;
      if (observer) observer.disconnect();
      if (revertCtx) revertCtx();
    };
  }, [reducedMotion]);

  return (
    <section
      id="stage-process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative border-t border-white/10 bg-[#0B0D10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#08D9F5]">
            03 · How We Make Your Service Better
          </div>
          <AnimatedHeading
            id="process-heading"
            as="h2"
            text="A Clear Process. Smarter Growth."
            highlightWords={['Clear', 'Smarter', 'Growth']}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          />
          <p className="mt-4 text-base sm:text-lg text-[#A5AAB4]">
            Every project follows a structured six-step methodology from initial discovery through launch and measurable refinement.
          </p>
        </div>

        {/* Connected Timeline */}
        <div className="relative mt-14 pl-8 sm:pl-12">
          {/* Background Track Line */}
          <div
            aria-hidden="true"
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 bg-white/10"
          />
          {/* Animated Gradient Progress Line */}
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 gp-gradient-bg origin-top"
            style={{ transform: reducedMotion ? 'scaleY(1)' : undefined }}
          />

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const isIlluminated = index <= activeIndex;

              return (
                <div
                  key={step.stepNumber}
                  className={`relative rounded-2xl border p-6 sm:p-8 transition-colors duration-200 ${
                    isIlluminated
                      ? 'border-[#08D9F5]/35 bg-[#050505]'
                      : 'border-white/10 bg-[#050505]/70'
                  }`}
                >
                  {/* Milestone Node on the Track */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[29px] sm:-left-[41px] top-7 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-mono transition-colors duration-200 ${
                      isIlluminated
                        ? 'border-[#00E6A8] bg-[#050505] text-[#00E6A8] shadow-[0_0_14px_rgba(8,217,245,0.45)]'
                        : 'border-white/20 bg-[#0B0D10] text-[#A5AAB4]'
                    }`}
                  >
                    {index === activeIndex ? (
                      <span className="relative inline-flex aspect-square h-3.5 w-3.5 shrink-0 items-center justify-center overflow-hidden">
                        <img
                          src={siteConfig.assets.arrowSvg}
                          alt=""
                          width={14}
                          height={14}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain"
                        />
                      </span>
                    ) : (
                      step.stepNumber
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-7">
                      <div className="font-mono text-xs text-[#08D9F5]">
                        {step.code}
                      </div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="lg:col-span-5 border-t border-white/10 pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
                      <div className="text-xs font-mono text-white/75">
                        Key Deliverables
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-[#A5AAB4]">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]"
                              aria-hidden="true"
                            />
                            <span className="text-white/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
