import React from 'react';
import { AnimatedContent } from './AnimatedContent';

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
  yOffset = 14,
  className = '',
  initiallyVisible = false,
}) => {
  return (
    <AnimatedContent
      delay={delay}
      distance={yOffset}
      initiallyVisible={initiallyVisible}
      className={className}
    >
      {children}
    </AnimatedContent>
  );
};
