import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedHeadingProps {
  id?: string;
  text: string;
  highlightWords?: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  id,
  text,
  highlightWords = [],
  as: Tag = 'h2',
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const isPrimaryHeroHeading = Tag === 'h1';
  const [inView, setInView] = useState(isPrimaryHeroHeading || reducedMotion);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isPrimaryHeroHeading || reducedMotion) {
      setInView(true);
      return;
    }

    const el = headingRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPrimaryHeroHeading, reducedMotion]);

  const words = text.split(' ');
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  return (
    <Tag id={id} ref={headingRef} className={className}>
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,!?—-]/g, '').toLowerCase();
        const isHighlighted = highlightSet.has(cleanWord);

        if (reducedMotion || isPrimaryHeroHeading) {
          return (
            <React.Fragment key={idx}>
              {isHighlighted ? (
                <span className="gp-gradient-text">{word}</span>
              ) : (
                word
              )}
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={idx}>
            <span
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
              className={`inline-block transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              } ${isHighlighted ? 'gp-gradient-text' : ''}`}
            >
              {word}
            </span>
            {idx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

