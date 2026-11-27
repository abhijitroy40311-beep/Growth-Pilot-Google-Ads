import React from 'react';
import { siteConfig } from '../../data/siteConfig';

interface BrandLogoProps {
  variant?: 'navbar' | 'footer' | 'emblem-only';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  if (variant === 'emblem-only') {
    return (
      <span
        className={`relative inline-flex aspect-square h-11 w-11 shrink-0 items-center justify-center overflow-hidden ${className}`}
      >
        <img
          src={siteConfig.assets.emblemSvg}
          alt="GrowthPilot Emblem"
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full select-none object-contain"
        />
      </span>
    );
  }

  const sizePx = variant === 'navbar' ? 30 : 34;

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <span
        className={`relative inline-flex aspect-square shrink-0 items-center justify-center overflow-hidden ${
          variant === 'navbar' ? 'h-[30px] w-[30px]' : 'h-[34px] w-[34px]'
        }`}
      >
        <img
          src={siteConfig.assets.emblemSvg}
          alt=""
          aria-hidden="true"
          width={sizePx}
          height={sizePx}
          loading={variant === 'navbar' ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="font-display font-bold tracking-[-0.03em] text-lg sm:text-[1.2rem] leading-none text-[#F4F5F7]">
        <span>Growth</span>
        <span className="text-[#18C4A8]">Pilot</span>
      </span>
    </span>
  );
};
