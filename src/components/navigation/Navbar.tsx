import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import { primaryNavItems, homeSectionQuickLinks } from '../../data/navigation';
import { BrandLogo } from '../ui/BrandLogo';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrolled = () => {
      const isPastThreshold = window.scrollY > 20;
      setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
      rafRef.current = null;
    };

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu automatically if viewport is resized to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Prevent background page scroll while mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavLinkClick = (targetPath: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === targetPath) {
      scrollToTargetSmooth(0, { reducedMotion });
    }
  };

  const handleSectionQuickJump = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    scrollToTargetSmooth(
      sectionId === 'stage-hero' ? 0 : sectionId,
      {
        offset: window.innerWidth < 1280 ? 112 : 76,
        duration: 640,
        reducedMotion,
      }
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || mobileMenuOpen
            ? 'border-b border-white/10 bg-[#050505]/92 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
            : 'border-b border-transparent bg-[#050505]/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-[4.25rem] max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Logo */}
          <Link
            to="/"
            onClick={() => handleNavLinkClick('/')}
            aria-label="GrowthPilot Home"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-md shrink-0"
          >
            <BrandLogo variant="navbar" />
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {primaryNavItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavLinkClick(item.path)}
                  className={`relative py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-sm ${
                    isActive
                      ? 'text-white'
                      : 'text-[#A5AAB4] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#1677FF] via-[#08D9F5] to-[#00E6A8]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA + Smooth Animated Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              to="/contact"
              onClick={() => handleNavLinkClick('/contact')}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg gp-gradient-bg px-4 py-2 text-xs sm:text-sm font-semibold text-[#050505] shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
            >
              <span>Let&apos;s Grow Together</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5] ${
                mobileMenuOpen
                  ? 'border-[#08D9F5]/60 bg-[#0B0D10] text-[#08D9F5] shadow-[0_0_20px_rgba(8,217,245,0.2)]'
                  : 'border-white/15 bg-[#0B0D10]/90 text-white hover:border-[#08D9F5]/50'
              }`}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              </span>
              <div aria-hidden="true" className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
                <span
                  className={`block h-0.5 rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen ? 'w-0 opacity-0 translate-x-2' : 'w-3.5 opacity-100 ml-auto'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Smooth Animated Mobile & Tablet Navigation Drawer (Overlay positioned at top-full for zero page reflow) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="absolute top-full left-0 right-0 z-50 overflow-hidden border-b border-white/10 bg-[#0B0D10]/98 shadow-[0_24px_48px_rgba(0,0,0,0.75)] backdrop-blur-2xl lg:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <div className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6 max-h-[calc(100dvh-4.25rem)] overflow-y-auto">
              <div className="flex flex-col space-y-1.5">
                {primaryNavItems.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);

                  return (
                    <div key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => handleNavLinkClick(item.path)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'border border-[#08D9F5]/30 bg-white/[0.06] text-white shadow-sm'
                            : 'border border-transparent text-[#A5AAB4] hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#08D9F5]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00E6A8]" />
                            Current
                          </span>
                        ) : (
                          <span aria-hidden="true" className="text-xs font-mono text-white/40">→</span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Smooth Section Quick-Jump Bar when on Home Page */}
              {location.pathname === '/' && (
                <div className="mt-4 rounded-xl border border-white/10 bg-[#050505]/80 p-3.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#08D9F5]">
                    <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Smooth Scroll · Homepage Sections</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {homeSectionQuickLinks.map((sec) => (
                      <button
                        key={sec.sectionId}
                        type="button"
                        onClick={() => handleSectionQuickJump(sec.sectionId)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0D10] px-2.5 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-[#08D9F5]/50 hover:text-white active:scale-[0.98]"
                      >
                        <span className="font-mono text-[10px] text-[#08D9F5]">
                          {sec.stageCode}
                        </span>
                        <span>{sec.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  to="/contact"
                  onClick={() => handleNavLinkClick('/contact')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gp-gradient-bg px-4 py-3.5 text-sm font-semibold text-[#050505] shadow-md transition-transform active:scale-[0.99]"
                >
                  <span>Let&apos;s Grow Together</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Smooth Backdrop Overlay for Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-xs lg:hidden transition-opacity duration-200"
        />
      )}
    </>
  );
};

