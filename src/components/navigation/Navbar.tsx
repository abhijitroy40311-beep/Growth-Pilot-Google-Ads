import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import { primaryNavItems, homeSectionQuickLinks } from '../../data/navigation';
import { BrandLogo } from '../ui/BrandLogo';
import { Magnet } from '../animation/Magnet';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const closeMobileMenu = useCallback((restoreFocus: boolean = false) => {
    setMobileMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        toggleButtonRef.current?.focus();
      });
    }
  }, []);

  useEffect(() => {
    const updateScrolled = () => {
      const isPastThreshold = window.scrollY > 16;
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
    if (!mobileMenuOpen) return;

    const focusTimer = window.requestAnimationFrame(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      firstFocusable?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMobileMenu(true);
        return;
      }

      if (e.key === 'Tab' && headerRef.current) {
        const focusables = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])'
          )
        ).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && !el.closest('[inert]');
        });

        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const htmlEl = document.documentElement;
    if (mobileMenuOpen) {
      htmlEl.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      htmlEl.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      htmlEl.style.overflow = '';
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
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    window.requestAnimationFrame(() => {
      scrollToTargetSmooth(sectionId === 'stage-hero' ? 0 : sectionId, {
        offset: window.innerWidth < 1024 ? 84 : 76,
        duration: 600,
        reducedMotion,
      });
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || mobileMenuOpen
            ? 'border-b border-white/12 bg-[#090A0D]/95 backdrop-blur-sm'
            : 'border-b border-white/8 bg-[#090A0D]/85'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-[4.25rem] max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={() => handleNavLinkClick('/')}
            aria-label="GrowthPilot Home"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8] rounded-sm shrink-0"
          >
            <BrandLogo variant="navbar" />
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8"
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
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8] rounded-sm ${
                    isActive ? 'text-[#F4F5F7]' : 'text-[#A6ADBB] hover:text-[#F4F5F7]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#18C4A8] origin-left transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-45'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <Magnet>
                <Link
                  to="/contact"
                  onClick={() => handleNavLinkClick('/contact')}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#F4F5F7] px-4 py-2 text-xs sm:text-sm font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                >
                  <span>Request Account Review</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Magnet>
            </div>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() =>
                mobileMenuOpen ? closeMobileMenu(false) : setMobileMenuOpen(true)
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors duration-150 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] ${
                mobileMenuOpen
                  ? 'border-[#18C4A8]/70 bg-[#111318] text-[#18C4A8]'
                  : 'border-white/15 bg-[#111318] text-[#F4F5F7] hover:border-white/35'
              }`}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              </span>
              <div aria-hidden="true" className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-0.5 w-5 bg-current transform transition-transform duration-200 origin-center ${
                    mobileMenuOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-[width,opacity,transform] duration-200 ${
                    mobileMenuOpen ? 'w-0 opacity-0 translate-x-2' : 'w-3.5 opacity-100 ml-auto'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transform transition-transform duration-200 origin-center ${
                    mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer */}
        <nav
          ref={drawerRef}
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          aria-hidden={!mobileMenuOpen}
          inert={!mobileMenuOpen || undefined}
          className={`absolute top-full left-0 right-0 z-50 lg:hidden border-b border-white/12 bg-[#111318] origin-top transition-[opacity,transform,visibility] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 visible pointer-events-auto'
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6 max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain">
            <div className="flex flex-col divide-y divide-white/8 border-y border-white/8">
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
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[48px] items-center justify-between px-2 py-3 text-base font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] ${
                      isActive ? 'text-[#F4F5F7]' : 'text-[#A6ADBB] hover:text-[#F4F5F7]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#18C4A8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#18C4A8]" />
                        Active
                      </span>
                    ) : (
                      <span aria-hidden="true" className="font-mono text-xs text-white/40">
                        →
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {location.pathname === '/' && (
              <div className="mt-4 rounded-md border border-white/10 bg-[#090A0D] p-3.5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#18C4A8]">
                  <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Jump to Section</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {homeSectionQuickLinks.map((sec) => (
                    <button
                      key={sec.sectionId}
                      type="button"
                      onClick={() => handleSectionQuickJump(sec.sectionId)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-white/12 bg-[#111318] px-3 py-1.5 text-xs font-medium text-[#F4F5F7] transition-colors hover:border-[#18C4A8]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
                    >
                      <span className="font-mono text-[11px] text-[#18C4A8]">
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
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#F4F5F7] px-4 py-3 text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
              >
                <span>Request Free Account Review</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div
        aria-hidden="true"
        onClick={() => closeMobileMenu(true)}
        className={`fixed inset-0 z-40 bg-black/75 lg:hidden transition-[opacity,visibility] duration-200 ${
          mobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      />
    </>
  );
};
