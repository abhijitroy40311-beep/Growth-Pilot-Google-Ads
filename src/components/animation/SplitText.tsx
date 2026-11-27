import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SplitTextProps {
  id?: string;
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  splitType?: 'words' | 'lines';
  delay?: number;
  duration?: number;
}

/**
 * Adapted React Bits (TS-CSS) SplitText using the repository's existing gsap + gsap/SplitText.
 * Strictly skipped for above-the-fold <h1> tags and prefers-reduced-motion so LCP stays unaffected.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  id,
  text,
  as: Tag = 'h2',
  className = '',
  splitType = 'words',
  delay = 0,
  duration = 0.45,
}) => {
  const reducedMotion = useReducedMotion();
  const elRef = useRef<HTMLHeadingElement | null>(null);
  const shouldAnimate = Tag !== 'h1' && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate || typeof window === 'undefined') return;
    const node = elRef.current;
    if (!node) return;

    let cancelled = false;
    let revertFn: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;

    const triggerReveal = () => {
      void Promise.all([import('gsap'), import('gsap/SplitText')])
        .then(([{ default: gsap }, { SplitText: GsapSplitText }]) => {
          if (cancelled || !node) return;
          gsap.registerPlugin(GsapSplitText);

          const ctx = gsap.context(() => {
            const split = GsapSplitText.create(node, {
              type: splitType,
              aria: 'auto',
              reduceWhiteSpace: true,
            });
            const targets = splitType === 'lines' ? split.lines : split.words;
            if (!targets.length) {
              split.revert();
              return;
            }

            gsap.fromTo(
              targets,
              { y: 14, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration,
                delay,
                stagger: splitType === 'lines' ? 0.06 : 0.028,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                onComplete: () => {
                  split.revert();
                },
              }
            );
          }, elRef);

          revertFn = () => ctx.revert();
        })
        .catch(() => {
          // Graceful fallback: text remains completely visible at default opacity
        });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer?.disconnect();
            observer = null;
            triggerReveal();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -32px 0px' }
      );
      observer.observe(node);
    } else {
      triggerReveal();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      revertFn?.();
    };
  }, [shouldAnimate, splitType, delay, duration, text]);

  return (
    <Tag id={id} ref={elRef as React.Ref<HTMLHeadingElement>} className={className}>
      {text}
    </Tag>
  );
};
