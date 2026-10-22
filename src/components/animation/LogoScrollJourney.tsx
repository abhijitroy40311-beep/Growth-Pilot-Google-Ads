import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { LOGO_JOURNEY_STAGES, resolveJourneyStage, LogoJourneyStage } from '../../lib/filterLogic';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LogoScrollJourneyProps {
  containerSelector?: string;
}

const STAGE_SECTION_IDS: Record<LogoJourneyStage['id'], string> = {
  hero: 'stage-hero',
  about: 'stage-story',
  services: 'stage-services',
  process: 'stage-process',
  projects: 'stage-why',
  results: 'stage-faq',
  contact: 'stage-contact',
};

export const LogoScrollJourney: React.FC<LogoScrollJourneyProps> = ({
  containerSelector = '#home-journey-container',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const carriageRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);
  const mobileSymbolRef = useRef<HTMLDivElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);
  const arrowOverlayRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  const reducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<LogoJourneyStage>(LOGO_JOURNEY_STAGES[0]);
  const [showMobileRibbon, setShowMobileRibbon] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const containerEl = document.querySelector(containerSelector);
    const carriageEl = carriageRef.current;
    const symbolEl = symbolRef.current;
    const mobileSymbolEl = mobileSymbolRef.current;
    const mobileBarEl = mobileProgressBarRef.current;
    const glowEl = glowRef.current;
    const arrowEl = arrowOverlayRef.current;
    const trailEl = trailRef.current;

    if (!containerEl) return;

    let scrollRafId: number | null = null;
    const updateMobileVisibility = () => {
      const scrolledDown = window.scrollY > 140;
      setShowMobileRibbon((prev) => (prev !== scrolledDown ? scrolledDown : prev));
      scrollRafId = null;
    };
    const onScrollThrottled = () => {
      if (scrollRafId === null) {
        scrollRafId = window.requestAnimationFrame(updateMobileVisibility);
      }
    };
    updateMobileVisibility();
    window.addEventListener('scroll', onScrollThrottled, { passive: true });

    if (reducedMotion) {
      let reducedRafId: number | null = null;
      const handleReducedScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
        const stage = resolveJourneyStage(progress);
        setActiveStage((prev) => (prev.stageIndex !== stage.stageIndex ? stage : prev));
        if (mobileBarEl) {
          mobileBarEl.style.transform = `scaleX(${progress.toFixed(3)})`;
        }
        reducedRafId = null;
      };
      const onReducedScroll = () => {
        if (reducedRafId === null) {
          reducedRafId = window.requestAnimationFrame(handleReducedScroll);
        }
      };
      handleReducedScroll();
      window.addEventListener('scroll', onReducedScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScrollThrottled);
        window.removeEventListener('scroll', onReducedScroll);
        if (scrollRafId !== null) window.cancelAnimationFrame(scrollRafId);
        if (reducedRafId !== null) window.cancelAnimationFrame(reducedRafId);
      };
    }

    let isCancelled = false;
    let hasInitializedGsap = false;
    let revertCtx: (() => void) | null = null;
    let resizeTimeout: number | null = null;
    let onResizeHandler: (() => void) | null = null;

    const initGsapJourney = () => {
      if (hasInitializedGsap || isCancelled) return;
      hasInitializedGsap = true;
      window.removeEventListener('scroll', initGsapJourney);
      window.removeEventListener('wheel', initGsapJourney);
      window.removeEventListener('touchmove', initGsapJourney);
      window.removeEventListener('keydown', initGsapJourney);

      void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (isCancelled) return;
          gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          if (carriageEl) {
            gsap.set(carriageEl, { x: 0, y: 0, force3D: true });
          }
          if (symbolEl) {
            gsap.set(symbolEl, {
              scale: 1,
              rotation: 0,
              rotationY: 0,
              transformPerspective: 900,
              force3D: true,
            });
          }
          if (mobileSymbolEl) {
            gsap.set(mobileSymbolEl, {
              scale: 1,
              rotation: 0,
              rotationY: 0,
              transformPerspective: 600,
              force3D: true,
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerEl,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.55,
              onUpdate: (self) => {
                const stage = resolveJourneyStage(self.progress);
                setActiveStage((prev) => (prev.stageIndex !== stage.stageIndex ? stage : prev));
                if (mobileBarEl) {
                  mobileBarEl.style.transform = `scaleX(${self.progress.toFixed(4)})`;
                }
              },
            },
          });

          const bothSymbols = [symbolEl, mobileSymbolEl].filter(Boolean);

      // STAGE 1 -> STAGE 2 (ABOUT / STORY): Scale down & move along dedicated right rail
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            x: -4,
            y: 68,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            scale: 0.86,
            rotation: 28,
            rotationY: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        );
      }
      if (glowEl) {
        tl.to(
          glowEl,
          {
            scale: 0.85,
            opacity: 0.55,
            duration: 1,
          },
          0
        );
      }

      // STAGE 2 -> STAGE 3 (SERVICES): Rotate ~135deg so arrow points toward next stage
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            x: 0,
            y: 146,
            duration: 1,
            ease: 'power2.inOut',
          },
          1
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            scale: 0.9,
            rotation: 135,
            rotationY: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          1
        );
      }
      if (glowEl) {
        tl.to(
          glowEl,
          {
            scale: 0.95,
            opacity: 0.7,
            duration: 1,
          },
          1
        );
      }

      // STAGE 3 -> STAGE 4 (PROCESS): Controlled 3D vertical flip (full 360deg so symbol is never mirrored)
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            x: -6,
            y: 224,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          2
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            scale: 0.94,
            rotation: 45,
            rotationY: 360,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          2
        );
      }
      if (glowEl) {
        tl.to(
          glowEl,
          {
            scale: 1.05,
            opacity: 0.8,
            duration: 1.1,
          },
          2
        );
      }

      // STAGE 4 -> STAGE 5 (PROJECTS / ARCHITECTURE): Smooth curved motion path with subtle gradient trail
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            keyframes: [
              { x: -14, y: 278 },
              { x: -2, y: 332 },
            ],
            duration: 1.1,
            ease: 'sine.inOut',
          },
          3.1
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            keyframes: [
              { rotation: 18, scale: 0.88 },
              { rotation: 32, scale: 0.92 },
            ],
            duration: 1.1,
            ease: 'sine.inOut',
          },
          3.1
        );
      }

      if (trailEl) {
        tl.fromTo(
          trailEl,
          { opacity: 0, strokeDashoffset: 240 },
          { opacity: 0.85, strokeDashoffset: 0, duration: 1.1, ease: 'power1.out' },
          3.1
        );
      }

      // STAGE 5 -> STAGE 6 (RESULTS / PROGRESS): Arrow rotates upward to symbolize progress + expanding glow
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            x: -4,
            y: 398,
            duration: 1,
            ease: 'back.out(1.4)',
          },
          4.2
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            scale: 0.98,
            rotation: -14,
            duration: 1,
            ease: 'back.out(1.4)',
          },
          4.2
        );
      }
      if (glowEl) {
        tl.to(
          glowEl,
          {
            scale: 1.4,
            opacity: 0.95,
            duration: 1,
            ease: 'power2.out',
          },
          4.2
        );
      }

      if (arrowEl) {
        tl.fromTo(
          arrowEl,
          { scale: 1, x: 0, y: 0 },
          { scale: 1.12, x: 2, y: -2, duration: 0.5, yoyo: true, repeat: 1 },
          4.2
        );
      }

      // STAGE 6 -> STAGE 7 (CONTACT): Settle beside the final call to action
      if (carriageEl) {
        tl.to(
          carriageEl,
          {
            x: 0,
            y: 462,
            duration: 1,
            ease: 'power3.out',
          },
          5.2
        );
      }
      if (bothSymbols.length > 0) {
        tl.to(
          bothSymbols,
          {
            scale: 0.94,
            rotation: 0,
            duration: 1,
            ease: 'power3.out',
          },
          5.2
        );
      }
          if (glowEl) {
            tl.to(
              glowEl,
              {
                scale: 1.15,
                opacity: 0.8,
                duration: 1,
              },
              5.2
            );
          }
        }, wrapperRef);

        revertCtx = () => ctx.revert();

        onResizeHandler = () => {
          if (resizeTimeout !== null) {
            window.clearTimeout(resizeTimeout);
          }
          resizeTimeout = window.setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        };
        window.addEventListener('resize', onResizeHandler, { passive: true });
      }
    );
    };

    if (window.scrollY > 4) {
      initGsapJourney();
    } else {
      window.addEventListener('scroll', initGsapJourney, { passive: true, once: true });
      window.addEventListener('wheel', initGsapJourney, { passive: true, once: true });
      window.addEventListener('touchmove', initGsapJourney, { passive: true, once: true });
      window.addEventListener('keydown', initGsapJourney, { passive: true, once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('scroll', initGsapJourney);
      window.removeEventListener('wheel', initGsapJourney);
      window.removeEventListener('touchmove', initGsapJourney);
      window.removeEventListener('keydown', initGsapJourney);
      if (scrollRafId !== null) window.cancelAnimationFrame(scrollRafId);
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      if (onResizeHandler) window.removeEventListener('resize', onResizeHandler);
      if (revertCtx) revertCtx();
    };
  }, [containerSelector, reducedMotion]);

  const handleAdvanceStage = () => {
    const nextIdx = activeStage.stageIndex < LOGO_JOURNEY_STAGES.length ? activeStage.stageIndex : 0;
    const nextStage = LOGO_JOURNEY_STAGES[nextIdx];
    const targetSectionId = STAGE_SECTION_IDS[nextStage.id] || 'stage-hero';
    scrollToTargetSmooth(targetSectionId, { offset: 108, duration: 680, reducedMotion });
  };

  return (
    <div
      ref={wrapperRef}
      data-testid="logo-scroll-journey"
      data-stage={activeStage.id}
    >
      {/* Desktop (>= 1280px): Right-Rail Curved Trajectory & 3D Emblem Carriage */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-2.5 top-24 z-30 hidden xl:flex flex-col items-center w-16 select-none"
      >
        <svg
          width="56"
          height="520"
          viewBox="0 0 56 520"
          fill="none"
          className="absolute inset-x-1 top-2 overflow-visible opacity-65"
        >
          <defs>
            <linearGradient id="gp-journey-trail-grad" x1="0" y1="0" x2="0" y2="520" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1677FF" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#08D9F5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00E6A8" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M 28 16 C 24 115, 32 195, 22 275 C 12 340, 32 405, 28 490"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            ref={trailRef}
            d="M 28 16 C 24 115, 32 195, 22 275 C 12 340, 32 405, 28 490"
            stroke="url(#gp-journey-trail-grad)"
            strokeWidth="2"
            strokeDasharray="240"
            strokeDashoffset="240"
            strokeLinecap="round"
          />
        </svg>

        <div ref={carriageRef} className="relative flex flex-col items-center will-change-transform">
          <div
            ref={symbolRef}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-[#0B0D10]/95 p-2 shadow-2xl backdrop-blur-md will-change-transform"
          >
            <div
              ref={glowRef}
              className="absolute -inset-2.5 rounded-full opacity-65 blur-lg"
              style={{
                background:
                  'linear-gradient(110deg, rgba(22,119,255,0.45), rgba(8,217,245,0.4), rgba(0,230,168,0.45))',
              }}
            />
            <img
              src={siteConfig.assets.emblemSvg}
              alt=""
              width={32}
              height={32}
              decoding="async"
              referrerPolicy="no-referrer"
              className="relative z-10 h-full w-full object-contain"
            />
            <img
              ref={arrowOverlayRef}
              src={siteConfig.assets.arrowSvg}
              alt=""
              width={32}
              height={32}
              decoding="async"
              referrerPolicy="no-referrer"
              className="pointer-events-none absolute inset-2 z-20 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-contain opacity-90"
            />
          </div>

          <div className="mt-1.5 rounded border border-white/10 bg-[#050505]/90 px-1.5 py-0.5 text-center font-mono text-[10px] leading-tight text-[#08D9F5] whitespace-nowrap">
            0{activeStage.stageIndex}/07
          </div>
        </div>
      </div>

      {/* Mobile & Tablet (< 1280px): Slim Top-Docked Journey Ribbon under Sticky Navbar (Never overlaps content cards) */}
      <div
        className={`fixed top-16 sm:top-[4.25rem] left-0 right-0 z-30 xl:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showMobileRibbon
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 border-b border-white/10 bg-[#050505]/92 px-4 sm:px-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 min-w-0">
            <div
              ref={mobileSymbolRef}
              className="relative flex h-5 w-5 shrink-0 items-center justify-center will-change-transform"
            >
              <img
                src={siteConfig.assets.emblemSvg}
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="truncate font-mono text-[11px] text-[#08D9F5]">
              {activeStage.label}
            </span>
            <span className="hidden sm:inline truncate text-xs text-[#A5AAB4]">
              — {activeStage.description}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-16 sm:w-24 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                ref={mobileProgressBarRef}
                className="h-full w-full origin-left gp-gradient-bg will-change-transform"
                style={{ transform: 'scaleX(0.14)' }}
              />
            </div>
            <button
              type="button"
              onClick={handleAdvanceStage}
              aria-label={`Jump to next section from ${activeStage.label}`}
              className="font-mono text-[11px] text-white/85 hover:text-[#08D9F5] transition-colors"
            >
              0{activeStage.stageIndex}/07 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
