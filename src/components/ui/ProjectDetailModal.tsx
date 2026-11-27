import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../data/projects';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const htmlEl = document.documentElement;
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    htmlEl.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      htmlEl.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="gp-backdrop-enter fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 overflow-y-auto overscroll-contain backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="gp-popup-enter relative my-auto w-full max-w-3xl rounded-lg border border-white/15 bg-[#111318] p-5 sm:p-8 md:p-10 text-[#F4F5F7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#18C4A8]">
              <span>{project.statusLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A6ADBB]">{project.industry}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A6ADBB]">{project.category}</span>
            </div>
            <h2
              id="project-modal-title"
              className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F5F7]"
            >
              {project.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#090A0D] text-[#A6ADBB] transition-colors hover:border-white/35 hover:text-[#F4F5F7] focus-visible:outline-2 focus-visible:outline-[#18C4A8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm sm:text-base">
          <div className="rounded-md border border-white/10 bg-[#090A0D] p-4 text-xs text-[#A6ADBB]">
            <strong className="text-[#F4F5F7]">Transparency Note:</strong> This project is a{' '}
            <span className="text-[#18C4A8]">{project.statusLabel}</span> demonstrating how GrowthPilot structures websites, Google Ads campaigns, and conversion tracking without fabricating client statistics.
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-[#8890A0]">
                Problem Addressed
              </h3>
              <p className="mt-2 text-sm text-[#A6ADBB] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-[#18C4A8]">
                Architectural Solution
              </h3>
              <p className="mt-2 text-sm text-[#F4F5F7]/90 leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-[#F4F5F7]">
                Key Architectural Capabilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#A6ADBB]">
                {project.keyFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#F4F5F7]">
                Measurement &amp; Tracking Plan
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#A6ADBB]">
                {project.measurementPlan.map((plan) => (
                  <li key={plan} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#18C4A8]" aria-hidden="true" />
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-[#8890A0]">
              Disciplines:{' '}
              <span className="text-[#F4F5F7]">{project.servicesDelivered.join(' · ')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-md border border-white/20 bg-[#090A0D] px-4 py-2 text-xs sm:text-sm font-medium text-[#F4F5F7] hover:border-white/40 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#18C4A8]"
              >
                Close
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#F4F5F7] px-5 py-2 text-xs sm:text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#18C4A8]"
              >
                <span>Request a Similar Architecture</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
