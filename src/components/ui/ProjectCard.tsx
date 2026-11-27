import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ProjectItem } from '../../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

function renderBlueprintSchematic(layoutType: ProjectItem['previewTheme']['layoutType']) {
  switch (layoutType) {
    case 'b2b-portal':
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="col-span-2 space-y-2 rounded-sm border border-white/12 bg-[#090A0D] p-2.5">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#8890A0]">
              <span>SPEC MATRIX</span>
              <span className="text-[#18C4A8]">ISO/RFQ</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-2.5 rounded-[2px] bg-white/12" />
              <div className="h-2.5 rounded-[2px] bg-[#18C4A8]/45" />
              <div className="h-2.5 rounded-[2px] bg-white/12" />
            </div>
            <div className="h-1.5 w-3/4 rounded-[2px] bg-white/30" />
          </div>
          <div className="col-span-1 flex flex-col justify-between rounded-sm border border-[#18C4A8]/35 bg-[#090A0D] p-2.5">
            <span className="font-mono text-[10px] text-[#18C4A8]">RFQ STEP</span>
            <div className="h-2 w-full rounded-[2px] bg-[#18C4A8]" />
          </div>
        </div>
      );

    case 'split-funnel':
      return (
        <div className="my-auto grid grid-cols-12 gap-2 py-2">
          <div className="col-span-7 space-y-2 rounded-sm border border-white/12 bg-[#090A0D] p-2.5">
            <div className="h-1.5 w-12 rounded-[2px] bg-[#18C4A8]" />
            <div className="h-2 w-11/12 rounded-[2px] bg-white/75" />
            <div className="flex gap-1.5 pt-1">
              <div className="h-2.5 w-12 rounded-[2px] bg-[#F4F5F7]" />
              <div className="h-2.5 w-10 rounded-[2px] bg-white/15" />
            </div>
          </div>
          <div className="col-span-5 flex flex-col justify-between rounded-sm border border-[#18C4A8]/35 bg-[#090A0D] p-2.5">
            <span className="font-mono text-[10px] text-[#18C4A8]">CALLBACK</span>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-[2px] bg-white/20" />
              <div className="h-2 w-full rounded-[2px] bg-[#18C4A8]" />
            </div>
          </div>
        </div>
      );

    case 'search-architecture':
      return (
        <div className="my-auto space-y-2 py-2">
          <div className="flex items-center justify-between rounded-sm border border-white/12 bg-[#090A0D] px-2.5 py-1.5 font-mono text-[10px]">
            <span className="text-[#A6ADBB]">SEARCH</span>
            <span className="text-white/30">→</span>
            <span className="text-[#F4F5F7]">PAGE</span>
            <span className="text-white/30">→</span>
            <span className="text-[#18C4A8]">GA4 LEAD</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm border border-white/12 bg-[#090A0D] p-2">
              <div className="font-mono text-[10px] text-[#8890A0]">Negatives</div>
              <div className="mt-1.5 h-1.5 w-4/5 rounded-[2px] bg-white/40" />
            </div>
            <div className="rounded-sm border border-white/12 bg-[#090A0D] p-2">
              <div className="font-mono text-[10px] text-[#8890A0]">UTM Match</div>
              <div className="mt-1.5 h-1.5 w-3/4 rounded-[2px] bg-[#18C4A8]" />
            </div>
          </div>
        </div>
      );

    case 'local-lead-engine':
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="col-span-1 rounded-sm border border-white/12 bg-[#090A0D] p-2 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-[#8890A0]">CHECKLIST</span>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-[2px] bg-[#18C4A8]" />
              <div className="h-1.5 w-4/5 rounded-[2px] bg-white/30" />
            </div>
          </div>
          <div className="col-span-2 rounded-sm border border-[#18C4A8]/35 bg-[#090A0D] p-2.5 flex flex-col justify-between">
            <div className="flex justify-between font-mono text-[10px]">
              <span className="text-[#F4F5F7]">ASSESSMENT</span>
              <span className="text-[#18C4A8]">1 → 3</span>
            </div>
            <div className="h-2 w-full rounded-[2px] bg-[#18C4A8]" />
          </div>
        </div>
      );

    case 'analytics-schema':
      return (
        <div className="my-auto rounded-sm border border-white/12 bg-[#090A0D] p-2.5 space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#8890A0]">
            <span>GTM → GA4 EVENT</span>
            <span className="text-[#18C4A8]">VERIFIED</span>
          </div>
          <div className="flex items-end gap-1.5 h-8 pt-1">
            <div className="w-1/5 h-3 rounded-[2px] bg-white/15" />
            <div className="w-1/5 h-5 rounded-[2px] bg-white/25" />
            <div className="w-1/5 h-4 rounded-[2px] bg-[#3B82F6]/65" />
            <div className="w-1/5 h-6 rounded-[2px] bg-[#18C4A8]/75" />
            <div className="w-1/5 h-7 rounded-[2px] bg-[#18C4A8]" />
          </div>
        </div>
      );

    case 'service-platform':
    default:
      return (
        <div className="my-auto grid grid-cols-3 gap-2 py-2">
          <div className="rounded-sm border border-white/12 bg-[#090A0D] p-2 space-y-1.5">
            <div className="h-1.5 w-8 rounded-[2px] bg-white/40" />
            <div className="h-3 w-full rounded-[2px] bg-white/10" />
          </div>
          <div className="rounded-sm border border-white/12 bg-[#090A0D] p-2 space-y-1.5">
            <div className="h-1.5 w-8 rounded-[2px] bg-[#3B82F6]/70" />
            <div className="h-3 w-full rounded-[2px] bg-white/10" />
          </div>
          <div className="rounded-sm border border-[#18C4A8]/40 bg-[#090A0D] p-2 space-y-1.5">
            <div className="h-1.5 w-8 rounded-[2px] bg-[#18C4A8]" />
            <div className="h-3 w-full rounded-[2px] bg-[#18C4A8]/55" />
          </div>
        </div>
      );
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#111318] transition-colors duration-150 hover:border-white/25">
      <div>
        {/* Technical Schematic Frame */}
        <div className="border-b border-white/10 bg-[#090A0D] p-4 sm:p-5">
          <div className="flex h-44 flex-col justify-between rounded-md border border-white/10 bg-[#111318] p-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 font-mono text-[11px] text-[#8890A0]">
              <span className="truncate">
                {project.statusLabel} · {project.category}
              </span>
              <span className="text-[#18C4A8] shrink-0">REF</span>
            </div>

            {renderBlueprintSchematic(project.previewTheme.layoutType)}

            <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-[#8890A0]">
              <span className="truncate">{project.industry}</span>
              <span className="text-[#18C4A8] whitespace-nowrap shrink-0">Blueprint</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#8890A0]">
            <span className="text-[#18C4A8]">{project.statusLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
          </div>

          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-[#F4F5F7]">
            {project.title}
          </h3>

          <p className="mt-2.5 text-sm text-[#A6ADBB] leading-relaxed">
            {project.summary}
          </p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#F4F5F7]/85">
              <Layers className="h-3.5 w-3.5 text-[#18C4A8]" aria-hidden="true" />
              <span>Scope Covered</span>
            </div>
            <p className="mt-1.5 text-xs text-[#8890A0]">
              {project.servicesDelivered.join(' · ')}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-1">
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`View Project ${project.title}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#18C4A8] transition-colors hover:text-[#F4F5F7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18C4A8] rounded-sm"
        >
          <span>Inspect Blueprint</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};
