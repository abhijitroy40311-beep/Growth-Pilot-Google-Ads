import React from 'react';
import { SplitText } from './SplitText';

interface AnimatedHeadingProps {
  id?: string;
  text: string;
  highlightWords?: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/**
 * Editorial heading component keeping above-the-fold <h1> instantaneously painted
 * and delegating scrolled sub-headings cleanly to restrained SplitText reveals.
 */
export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  id,
  text,
  as: Tag = 'h2',
  className = '',
}) => {
  return <SplitText id={id} text={text} as={Tag} className={className} splitType="words" />;
};
