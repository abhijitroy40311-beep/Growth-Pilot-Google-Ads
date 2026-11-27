import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagnetProps {
  children: React.ReactNode;
  disabled?: boolean;
  maxOffset?: number;
  strength?: number;
  wrapperClassName?: string;
}

/**
 * Adapted React Bits (TS-CSS) Magnet micro-interaction using pointer geometry + CSS transitions.
 * Strictly capped (default 4px max) and disabled on touch viewports and prefers-reduced-motion.
 */
export const Magnet: React.FC<MagnetProps> = ({
  children,
  disabled = false,
  maxOffset = 4,
  strength = 0.16,
  wrapperClassName = 'inline-block',
}) => {
  const reducedMotion = useReducedMotion();
  const [pointerFine, setPointerFine] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setPointerFine(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const isEnabled = !disabled && !reducedMotion && pointerFine;

  const clamp = (value: number, limit: number) =>
    Math.max(-limit, Math.min(limit, value));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setActive(true);
    setOffset({
      x: clamp((e.clientX - centerX) * strength, maxOffset),
      y: clamp((e.clientY - centerY) * strength, maxOffset),
    });
  };

  const handleMouseLeave = () => {
    setActive(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={isEnabled ? handleMouseMove : undefined}
      onMouseLeave={isEnabled ? handleMouseLeave : undefined}
      className={wrapperClassName}
    >
      <div
        style={{
          transform: isEnabled
            ? `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`
            : undefined,
          transition: active
            ? 'transform 90ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
