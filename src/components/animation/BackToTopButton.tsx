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

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[4.5rem] right-3.5 sm:bottom-[5.25rem] sm:right-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-md border border-white/15 bg-[#111318] text-[#F4F5F7] shadow-md transition-[opacity,transform,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#18C4A8] hover:text-[#18C4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};
