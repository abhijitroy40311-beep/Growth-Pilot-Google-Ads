export type DeviceViewportMode = 'mobile' | 'tablet' | 'desktop';

/**
 * Smooth cubic easing function for programmatic scroll animations.
 * Input t is clamped to [0, 1].
 */
export function easeInOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Classifies viewport width into mobile (< 768px), tablet (768px - 1279px), or desktop (>= 1280px).
 */
export function resolveDeviceViewportMode(width: number): DeviceViewportMode {
  if (width < 768) return 'mobile';
  if (width < 1280) return 'tablet';
  return 'desktop';
}

/**
 * Computes the clamped document scroll Y coordinate for an element,
 * compensating for the sticky navbar height.
 */
export function calculateScrollTargetY(
  elementRectTop: number,
  currentScrollY: number,
  navbarOffset: number = 76,
  maxScrollY?: number
): number {
  const rawTarget = Math.max(0, Math.round(elementRectTop + currentScrollY - navbarOffset));
  if (typeof maxScrollY === 'number' && maxScrollY >= 0) {
    return Math.min(rawTarget, Math.round(maxScrollY));
  }
  return rawTarget;
}

let activeScrollRafId: number | null = null;

/**
 * Cancels any in-progress programmatic smooth scroll animation.
 */
export function cancelActiveSmoothScroll(): void {
  if (activeScrollRafId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(activeScrollRafId);
    activeScrollRafId = null;
  }
}

export interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  reducedMotion?: boolean;
  onComplete?: () => void;
}

/**
 * Smoothly scrolls the window to either a numeric Y position or a DOM element ID/selector
 * using a requestAnimationFrame cubic easing loop that works consistently across desktop,
 * tablet, and mobile browsers.
 */
export function scrollToTargetSmooth(
  target: number | string | HTMLElement,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const {
    offset = 76,
    duration = 680,
    reducedMotion = false,
    onComplete,
  } = options;

  let targetY = 0;

  if (typeof target === 'number') {
    targetY = Math.max(0, target);
  } else {
    const el =
      typeof target === 'string'
        ? document.getElementById(target.replace(/^#/, '')) || document.querySelector<HTMLElement>(target)
        : target;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    targetY = calculateScrollTargetY(rect.top, window.scrollY, offset, maxScroll);
  }

  cancelActiveSmoothScroll();

  if (reducedMotion || duration <= 0) {
    window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
    onComplete?.();
    return;
  }

  const startY = window.scrollY;
  const deltaY = targetY - startY;

  if (Math.abs(deltaY) < 2) {
    onComplete?.();
    return;
  }

  const startTime = performance.now();

  const cleanupInterruptListeners = () => {
    window.removeEventListener('wheel', handleUserInterrupt);
    window.removeEventListener('touchstart', handleUserInterrupt);
  };

  const handleUserInterrupt = () => {
    cancelActiveSmoothScroll();
    cleanupInterruptListeners();
  };

  window.addEventListener('wheel', handleUserInterrupt, { passive: true, once: true });
  window.addEventListener('touchstart', handleUserInterrupt, { passive: true, once: true });

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);

    window.scrollTo({
      top: Math.round(startY + deltaY * eased),
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    if (progress < 1) {
      activeScrollRafId = window.requestAnimationFrame(step);
    } else {
      activeScrollRafId = null;
      cleanupInterruptListeners();
      onComplete?.();
    }
  };

  activeScrollRafId = window.requestAnimationFrame(step);
}
