import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  className?: string;
}

const DEFAULT_BRAND_COLORS = ['#18C4A8', '#2CD9BC', '#3B82F6', '#2CD9BC', '#18C4A8'];

/**
 * Adapted React Bits GradientText using pure CSS background-clip keyframes.
 * Preserves existing brand accent tokens, keeps immediate LCP visibility,
 * and freezes gently at static gradient position under prefers-reduced-motion.
 */
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = DEFAULT_BRAND_COLORS,
  animationSpeed = 6,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const gradientStops = colors.join(', ');

  return (
    <span
      className={`gp-gradient-text ${reducedMotion ? 'gp-gradient-text--static' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientStops})`,
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </span>
  );
};
