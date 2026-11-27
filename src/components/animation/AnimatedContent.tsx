import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  initiallyVisible?: boolean;
  className?: string;
}

/**
 * Adapted React Bits (TS-CSS) AnimatedContent built purely with IntersectionObserver + CSS compositor transforms.
 * Zero extra runtime dependencies and automatic bypass under prefers-reduced-motion.
 */
export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 14,
  direction = 'vertical',
  reverse = false,
  duration = 400,
  delay = 0,
  threshold = 0.06,
  initiallyVisible = false,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const bypass = reducedMotion || initiallyVisible;
  const [visible, setVisible] = useState<boolean>(bypass);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bypass) {
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
      { threshold, rootMargin: '24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [bypass, threshold]);

  if (bypass) {
    return <div className={className}>{children}</div>;
  }

  const signedDistance = reverse ? -distance : distance;
  const hiddenTransform =
    direction === 'horizontal'
      ? `translate3d(${signedDistance}px, 0, 0)`
      : `translate3d(0, ${signedDistance}px, 0)`;

  return (
    <div
      ref={containerRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : hiddenTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: delay > 0 ? `${Math.round(delay * 1000)}ms` : undefined,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
