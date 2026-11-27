import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { processSteps } from '../../data/process';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EditorialSectionHeader } from '../ui/EditorialPrimitives';

export const GrowthTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      setActiveIndex(processSteps.length - 1);
      return;
    }

    const sectionEl = sectionRef.current;
    const lineEl = progressLineRef.current;
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
                  scrub: 0.35,
                  onUpdate: (self) => {
                    const stepIdx = Math.min(
                      processSteps.length - 1,
                      Math.floor(self.progress * processSteps.length)
                    );
                    setActiveIndex((prev) => (prev !== stepIdx ? stepIdx : prev));
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
        { rootMargin: '250px 0px' }
      );
      observer.observe(sectionEl);
    } else {
      initTimeline();
    }

    return () => {
      isCancelled = true;
      observer?.disconnect();
      revertCtx?.();
    };
  }, [reducedMotion]);

  return (
    <section
      id="stage-process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="border-t border-white/10 bg-[#090A0D] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialSectionHeader
          headingId="process-heading"
          index="04"
          eyebrow="Campaign Management Process"
          title="Six Deliberate Phases From Audit to Ongoing Optimization."
          lead="Every engagement follows a transparent build sequence so tracking, landing experience, and keyword controls are verified before budget scales."
        />

        <div className="relative mt-12 pl-8 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-[2px] bg-white/10"
          />
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-[2px] bg-[#18C4A8] origin-top"
            style={{ transform: reducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
          />

          <div className="divide-y divide-white/10 border-y border-white/10">
            {processSteps.map((step, index) => {
              const isIlluminated = index <= activeIndex;

              return (
                <div
                  key={step.stepNumber}
                  className="relative py-7 sm:py-9 transition-colors duration-200"
                >
                  {/* Step Marker Node */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[33px] sm:-left-[45px] top-8 flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[11px] transition-colors duration-200 ${
                      isIlluminated
                        ? 'border-[#18C4A8] bg-[#111318] text-[#18C4A8]'
                        : 'border-white/20 bg-[#090A0D] text-[#8890A0]'
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-7">
                      <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                        {step.code}
                      </div>
                      <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#F4F5F7]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-[60ch] text-sm sm:text-base text-[#A6ADBB] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="lg:col-span-5 border-t border-white/10 pt-4 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#8890A0]">
                        Phase Deliverables
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-[#F4F5F7]/90">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
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
