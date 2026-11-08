import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToTargetSmooth } from '../../lib/scrollLogic';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      const shouldShow = window.scrollY > 520;
      setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(checkScroll);
      }
    };

    checkScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    scrollToTargetSmooth(0, {
      duration: 640,
      reducedMotion,
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-20 right-4 sm:bottom-[5.25rem] sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-[#0B0D10]/92 text-white shadow-xl backdrop-blur-md transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#08D9F5]/60 hover:text-[#08D9F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

