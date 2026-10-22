import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cancelActiveSmoothScroll, scrollToTargetSmooth } from '../../lib/scrollLogic';

interface PageTransitionProps {
  children: React.ReactNode;
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
  const { pathname, hash } = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    cancelActiveSmoothScroll();

    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = window.setTimeout(() => {
        scrollToTargetSmooth(targetId, {
          offset: 76,
          duration: 650,
          reducedMotion,
          onComplete: () => {
            void refreshScrollTriggerSafely();
          },
        });
      }, 75);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const refreshTimer = window.setTimeout(() => {
      void refreshScrollTriggerSafely();
    }, 100);
    return () => window.clearTimeout(refreshTimer);
  }, [pathname, hash, reducedMotion]);

  return <>{children}</>;
};

