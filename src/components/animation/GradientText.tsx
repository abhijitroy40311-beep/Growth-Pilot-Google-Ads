import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'strong' | 'em';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
}) => {
  return <Component className={`gp-gradient-text ${className}`}>{children}</Component>;
};
