import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cancelActiveSmoothScroll } from '../../lib/scrollLogic';

interface PageTransitionProps {
  children: React.ReactNode;
}

function forceScrollToTopInstant() {
  if (typeof window === 'undefined') return;
  cancelActiveSmoothScroll();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
  }
}

async function refreshScrollTriggerSafely() {
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.refresh();
  } catch {
    // Ignore if ScrollTrigger is not active on current route
  }
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    hasMountedRef.current = true;
  }, []);

  // Synchronously jump to the very top (0,0) before browser paints the new page
  useLayoutEffect(() => {
    forceScrollToTopInstant();
    const rafId = window.requestAnimationFrame(() => {
      forceScrollToTopInstant();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  useEffect(() => {
    forceScrollToTopInstant();
    const refreshTimer = window.setTimeout(() => {
      if (window.scrollY > 0) {
        forceScrollToTopInstant();
      }
      void refreshScrollTriggerSafely();
    }, 80);
    return () => window.clearTimeout(refreshTimer);
  }, [pathname, reducedMotion]);

  const animateEntrance = hasMountedRef.current && !reducedMotion;

  return (
    <div
      key={pathname}
      className={animateEntrance ? 'gp-page-enter' : undefined}
    >
      {children}
    </div>
  );
};
