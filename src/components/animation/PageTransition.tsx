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
  const htmlEl = document.documentElement;
  const prevBehavior = htmlEl ? htmlEl.style.scrollBehavior : '';
  if (htmlEl) {
    htmlEl.style.scrollBehavior = 'auto';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  if (htmlEl) {
    htmlEl.scrollTop = 0;
    htmlEl.scrollLeft = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
  }
  if (htmlEl) {
    window.requestAnimationFrame(() => {
      htmlEl.style.scrollBehavior = prevBehavior;
    });
  }
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname, hash } = useLocation();
  const reducedMotion = useReducedMotion();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    hasMountedRef.current = true;
  }, []);

  // Synchronously position at top (0,0) before paint on route change, or scroll to #hash if provided
  useLayoutEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const rafId = window.requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    forceScrollToTopInstant();
    const rafId = window.requestAnimationFrame(() => {
      forceScrollToTopInstant();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname, hash, reducedMotion]);

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



