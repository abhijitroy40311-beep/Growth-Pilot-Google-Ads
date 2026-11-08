import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0B0D10] p-6 sm:p-8 md:p-10 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#08D9F5]">
              <span>{project.statusLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A5AAB4]">{project.industry}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A5AAB4]">{project.category}</span>
            </div>
            <h2
              id="project-modal-title"
              className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#050505] text-[#A5AAB4] hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-[#08D9F5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm sm:text-base">
          <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-xs text-[#A5AAB4]">
            <strong className="text-white">Transparency Note:</strong> This project is a{' '}
            <span className="text-[#08D9F5]">{project.statusLabel}</span> demonstrating how GrowthPilot structures websites, search campaigns, and conversion tracking without fabricating client statistics.
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-mono text-[#08D9F5]">The Problem</h3>
              <p className="mt-2 text-sm text-[#A5AAB4] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono text-[#00E6A8]">The GrowthPilot Approach</h3>
              <p className="mt-2 text-sm text-[#A5AAB4] leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Key Architectural Capabilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#A5AAB4]">
                {project.keyFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00E6A8]" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Measurement &amp; Tracking Plan
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#A5AAB4]">
                {project.measurementPlan.map((plan) => (
                  <li key={plan} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#08D9F5]" aria-hidden="true" />
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-[#A5AAB4]">
              Services: <span className="text-white">{project.servicesDelivered.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/15 bg-[#050505] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-white/30 whitespace-nowrap shrink-0"
              >
                Close
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg gp-gradient-bg px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] whitespace-nowrap shrink-0"
              >
                <span>Request a Similar Solution</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
