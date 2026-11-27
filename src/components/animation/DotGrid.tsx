import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DotGridProps {
  /** Container element tracked passively for pointer proximity so foreground cards stay interactive. */
  containerRef: React.RefObject<HTMLElement | null>;
  dotGap?: number;
  baseRadius?: number;
  activeRadius?: number;
  proximity?: number;
  className?: string;
}

interface DotPoint {
  x: number;
  y: number;
  glow: number;
}

function getDesktopFinePointer(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Contained Canvas 2D dot matrix adapted from React Bits for MeasurementSection.
 * Uses existing project ink (#F4F5F7) and signal (#18C4A8) tokens only, runs on
 * desktop fine-pointer devices with an auto-idling rAF loop, pauses off-screen via
 * IntersectionObserver, and renders a static CSS fallback (.gp-dot-matrix) on
 * mobile, touch, or prefers-reduced-motion.
 */
export const DotGrid: React.FC<DotGridProps> = ({
  containerRef,
  dotGap = 26,
  baseRadius = 1.1,
  activeRadius = 1.9,
  proximity = 120,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const [isDesktopPointer, setIsDesktopPointer] = useState<boolean>(getDesktopFinePointer);
  const [canvasUnavailable, setCanvasUnavailable] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktopPointer(event.matches);
    };
    setIsDesktopPointer(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const interactiveEnabled = !reducedMotion && isDesktopPointer && !canvasUnavailable;

  useEffect(() => {
    if (!interactiveEnabled) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasUnavailable(true);
      return;
    }

    let dots: DotPoint[] = [];
    let logicalWidth = 0;
    let logicalHeight = 0;
    let rafId: number | null = null;
    let inView = typeof IntersectionObserver === 'undefined';

    const pointer = { x: 0, y: 0, active: false };
    const proximitySq = proximity * proximity;

    const drawDots = () => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const glow = dot.glow;
        if (glow <= 0.005) {
          ctx.fillStyle = 'rgba(244, 245, 247, 0.14)';
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, baseRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Interpolate between existing --text-primary (#F4F5F7) and --accent-signal (#18C4A8)
          const r = Math.round(244 + (24 - 244) * glow);
          const g = Math.round(245 + (196 - 245) * glow);
          const b = Math.round(247 + (168 - 247) * glow);
          const alpha = (0.14 + glow * 0.42).toFixed(3);
          const radius = baseRadius + (activeRadius - baseRadius) * glow;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const stopRaf = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const buildGrid = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      logicalWidth = width;
      logicalHeight = height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / dotGap) + 1;
      const rows = Math.floor(height / dotGap) + 1;
      const offsetX = (width - (cols - 1) * dotGap) / 2;
      const offsetY = (height - (rows - 1) * dotGap) / 2;

      const nextDots: DotPoint[] = [];
      for (let row = 0; row < rows; row += 1) {
        const y = offsetY + row * dotGap;
        for (let col = 0; col < cols; col += 1) {
          nextDots.push({
            x: offsetX + col * dotGap,
            y,
            glow: 0,
          });
        }
      }
      dots = nextDots;
      drawDots();
    };

    const tick = () => {
      rafId = null;
      let needsNextFrame = false;

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        let target = 0;

        if (inView && pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < proximitySq) {
            const raw = 1 - Math.sqrt(distSq) / proximity;
            target = raw * raw;
          }
        }

        const delta = target - dot.glow;
        if (Math.abs(delta) > 0.002) {
          dot.glow += delta * 0.14;
          needsNextFrame = true;
        } else {
          dot.glow = target;
        }
      }

      drawDots();

      if (needsNextFrame && inView) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const scheduleTick = () => {
      if (rafId === null && inView) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!inView || event.pointerType === 'touch') return;
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      scheduleTick();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      scheduleTick();
    };

    buildGrid();

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = Boolean(entries[0]?.isIntersecting);
          inView = visible;
          if (!visible) {
            stopRaf();
            pointer.active = false;
            for (let i = 0; i < dots.length; i += 1) {
              dots[i].glow = 0;
            }
            drawDots();
          }
        },
        { rootMargin: '80px 0px', threshold: 0.01 }
      );
      intersectionObserver.observe(container);
    }

    let resizeObserver: ResizeObserver | null = null;
    const handleWindowResize = () => buildGrid();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => buildGrid());
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleWindowResize, { passive: true });
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      stopRaf();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [interactiveEnabled, containerRef, dotGap, baseRadius, activeRadius, proximity]);

  if (!interactiveEnabled) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 gp-dot-matrix ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
    />
  );
};
