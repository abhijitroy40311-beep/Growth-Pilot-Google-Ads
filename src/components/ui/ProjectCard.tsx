import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ProjectItem } from '../../data/projects';
import { siteConfig } from '../../data/siteConfig';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

function renderBlueprintGraphic(layoutType: ProjectItem['previewTheme']['layoutType']) {
  switch (layoutType) {
    case 'b2b-portal':
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="col-span-2 space-y-1.5 rounded-lg border border-white/10 bg-[#050505] p-2.5">
            <div className="flex items-center justify-between text-[9px] font-mono text-[#A5AAB4]">
              <span>SPEC MATRIX</span>
              <span className="text-[#08D9F5]">ISO/RFQ</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              <div className="h-3 rounded bg-white/15" />
              <div className="h-3 rounded bg-[#1677FF]/40" />
              <div className="h-3 rounded bg-white/15" />
            </div>
            <div className="h-1.5 w-3/4 rounded bg-white/40" />
          </div>
          <div className="col-span-1 flex flex-col justify-between rounded-lg border border-[#08D9F5]/30 bg-[#050505] p-2.5">
            <span className="font-mono text-[9px] text-[#08D9F5]">RFQ Step</span>
            <div className="h-2 w-full rounded gp-gradient-bg" />
          </div>
        </div>
      );

    case 'split-funnel':
      return (
        <div className="my-auto grid grid-cols-12 gap-2 py-2">
          <div className="col-span-7 space-y-1.5 rounded-lg border border-white/10 bg-[#050505] p-2.5">
            <div className="h-1.5 w-12 rounded bg-[#08D9F5]/80" />
            <div className="h-2 w-11/12 rounded bg-white/85" />
            <div className="flex gap-1.5 pt-1">
              <div className="h-2.5 w-12 rounded gp-gradient-bg" />
              <div className="h-2.5 w-10 rounded bg-white/15" />
            </div>
          </div>
          <div className="col-span-5 flex flex-col justify-between rounded-lg border border-[#00E6A8]/30 bg-[#050505] p-2.5">
            <span className="font-mono text-[9px] text-[#00E6A8]">Booking Flow</span>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-white/20" />
              <div className="h-2 w-full rounded bg-[#00E6A8]/70" />
            </div>
          </div>
        </div>
      );

    case 'search-architecture':
      return (
        <div className="my-auto space-y-2 py-2">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#050505] px-2.5 py-1.5 text-[9px] font-mono">
            <span className="text-[#1677FF]">Search Intent</span>
            <span className="text-white/40">→</span>
            <span className="text-[#08D9F5]">Landing Match</span>
            <span className="text-white/40">→</span>
            <span className="text-[#00E6A8]">GA4 Event</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/10 bg-[#050505] p-2">
              <div className="text-[9px] font-mono text-[#A5AAB4]">Exact Keywords</div>
              <div className="mt-1 h-1.5 w-4/5 rounded bg-[#1677FF]/80" />
            </div>
            <div className="rounded-lg border border-white/10 bg-[#050505] p-2">
              <div className="text-[9px] font-mono text-[#A5AAB4]">UTM Capture</div>
              <div className="mt-1 h-1.5 w-3/4 rounded bg-[#00E6A8]/80" />
            </div>
          </div>
        </div>
      );

    case 'local-lead-engine':
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="col-span-1 rounded-lg border border-white/10 bg-[#050505] p-2 flex flex-col justify-between">
            <span className="font-mono text-[9px] text-[#A5AAB4]">Readiness</span>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-[#00E6A8]/70" />
              <div className="h-1.5 w-4/5 rounded bg-[#08D9F5]/60" />
            </div>
          </div>
          <div className="col-span-2 rounded-lg border border-[#08D9F5]/30 bg-[#050505] p-2.5 flex flex-col justify-between">
            <div className="flex justify-between text-[9px] font-mono">
              <span className="text-white">Site Assessment</span>
              <span className="text-[#00E6A8]">Step 1 → 3</span>
            </div>
            <div className="h-2 w-full rounded gp-gradient-bg" />
          </div>
        </div>
      );

    case 'analytics-schema':
      return (
        <div className="my-auto rounded-lg border border-white/10 bg-[#050505] p-2.5 space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#A5AAB4]">
            <span>GTM Container → GA4 Schema</span>
            <span className="text-[#08D9F5]">Verified</span>
          </div>
          <div className="flex items-end gap-1.5 h-8 pt-1">
            <div className="w-1/5 h-3 rounded-sm bg-[#1677FF]/50" />
            <div className="w-1/5 h-5 rounded-sm bg-[#1677FF]/80" />
            <div className="w-1/5 h-4 rounded-sm bg-[#08D9F5]/70" />
            <div className="w-1/5 h-6 rounded-sm bg-[#08D9F5]" />
            <div className="w-1/5 h-7 rounded-sm bg-[#00E6A8]" />
          </div>
        </div>
      );

    case 'service-platform':
    default:
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="rounded-lg border border-white/10 bg-[#050505] p-2 space-y-1">
            <div className="h-1.5 w-8 rounded bg-[#1677FF]" />
            <div className="h-3 w-full rounded bg-white/10" />
          </div>
          <div className="rounded-lg border border-white/10 bg-[#050505] p-2 space-y-1">
            <div className="h-1.5 w-8 rounded bg-[#08D9F5]" />
            <div className="h-3 w-full rounded bg-white/10" />
          </div>
          <div className="rounded-lg border border-[#00E6A8]/30 bg-[#050505] p-2 space-y-1">
            <div className="h-1.5 w-8 rounded bg-[#00E6A8]" />
            <div className="h-3 w-full rounded gp-gradient-bg opacity-80" />
          </div>
        </div>
      );
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl gp-card-surface transition-all duration-200 hover:-translate-y-0.5">
      <div>
        {/* Architectural Visual Preview Header */}
        <div className="relative h-52 w-full overflow-hidden border-b border-white/10 bg-[#050505] p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${project.previewTheme.accentFrom}44 0%, ${project.previewTheme.accentTo}22 50%, transparent 80%)`,
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-45" />

          {/* Architectural Wireframe Diagram inside the preview */}
          <div className="relative z-10 flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#0B0D10]/90 p-4 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 text-[11px] font-mono text-[#A5AAB4]">
              <span className="truncate">{project.statusLabel} · {project.category}</span>
              <span className="relative inline-flex aspect-square h-3.5 w-3.5 shrink-0 items-center justify-center overflow-hidden">
                <img
                  src={siteConfig.assets.arrowSvg}
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </span>
            </div>

            {renderBlueprintGraphic(project.previewTheme.layoutType)}

            <div className="flex items-center justify-between gap-3 text-[11px] font-mono text-[#A5AAB4]">
              <span className="truncate">{project.industry}</span>
              <span className="text-[#00E6A8] whitespace-nowrap shrink-0">Blueprint</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-7">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#A5AAB4]">
            <span className="text-[#08D9F5]">{project.statusLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
          </div>

          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-white">
            {project.title}
          </h3>

          <p className="mt-2.5 text-sm text-[#A5AAB4] leading-relaxed">
            {project.summary}
          </p>

          {/* Services Delivered (Unboxed inline list with separators) */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center gap-1.5 text-xs font-mono text-white/75">
              <Layers className="h-3.5 w-3.5 text-[#08D9F5]" aria-hidden="true" />
              <span>Services Delivered</span>
            </div>
            <p className="mt-1.5 text-xs text-[#A5AAB4]">
              {project.servicesDelivered.join(' · ')}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2">
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`View Project ${project.title}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#08D9F5] transition-colors hover:text-[#00E6A8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08D9F5] rounded-sm"
        >
          <span>View Project</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};
