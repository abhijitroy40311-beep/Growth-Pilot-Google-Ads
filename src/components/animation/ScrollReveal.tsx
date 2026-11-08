import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  initiallyVisible?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  yOffset = 20,
  className = '',
  initiallyVisible = false,
}) => {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion || initiallyVisible);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || initiallyVisible) {
      setVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, initiallyVisible]);

  if (reducedMotion || initiallyVisible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${yOffset}px, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '500ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: delay > 0 ? `${Math.round(delay * 1000)}ms` : undefined,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

