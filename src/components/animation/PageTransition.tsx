import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cancelActiveSmoothScroll, scrollToTargetSmooth } from '../../lib/scrollLogic';

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

  // Single authoritative scroll coordinator on route / hash changes (zero conflicting smooth-scroll fights)
  useLayoutEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const rafId = window.requestAnimationFrame(() => {
        scrollToTargetSmooth(targetId, {
          offset: window.innerWidth < 1280 ? 112 : 80,
          duration: reducedMotion ? 0 : 480,
          reducedMotion,
        });
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    forceScrollToTopInstant();
  }, [pathname, hash, reducedMotion]);

  const animateEntrance = hasMountedRef.current && !reducedMotion;

  return (
    <div key={pathname} className={animateEntrance ? 'gp-page-enter' : undefined}>
      {children}
    </div>
  );
};
