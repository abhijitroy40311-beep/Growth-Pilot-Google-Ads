import React from 'react';
import { siteConfig } from '../../data/siteConfig';

interface BrandLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'emblem-only';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  if (variant === 'emblem-only') {
    return (
      <img
        src={siteConfig.assets.emblemSvg}
        alt="GrowthPilot Emblem"
        width={48}
        height={48}
        decoding="async"
        referrerPolicy="no-referrer"
        className={`select-none object-contain ${className}`}
      />
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Controlled Blue/Cyan/Green Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 rounded-full opacity-75 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(22,119,255,0.28) 0%, rgba(8,217,245,0.18) 45%, rgba(0,230,168,0.10) 72%, transparent 100%)',
          }}
        />
        {/* Original Full GrowthPilot Brand Artwork Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-6 sm:p-8 shadow-2xl">
          <img
            src={siteConfig.assets.fullOriginalPng}
            alt="GrowthPilot — Navigate Growth With Intelligence."
            width={288}
            height={288}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className="relative z-10 w-56 sm:w-64 md:w-72 h-auto object-contain mx-auto"
          />
        </div>
      </div>
    );
  }

  const sizePx = variant === 'navbar' ? 32 : 36;

  // Navbar or Footer horizontal lockup using original emblem SVG + wordmark
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
      <img
        src={siteConfig.assets.emblemSvg}
        alt=""
        aria-hidden="true"
        width={sizePx}
        height={sizePx}
        loading={variant === 'navbar' ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className={variant === 'navbar' ? 'h-8 w-8 object-contain' : 'h-9 w-9 object-contain'}
      />
      <span className="font-extrabold tracking-tight text-lg sm:text-xl leading-none">
        <span className="text-white">Growth</span>
        <span className="gp-gradient-text">Pilot</span>
      </span>
    </span>
  );
};
