import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  projectsData,
  projectCategories,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';
import { filterProjects } from '../lib/filterLogic';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectDetailModal } from '../components/ui/ProjectDetailModal';
import { AnimatedHeading } from '../components/animation/AnimatedHeading';

export const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get('category') as ProjectCategory | null;
  const validInitialCategory =
    initialCategoryParam && projectCategories.includes(initialCategoryParam)
      ? initialCategoryParam
      : 'All';

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>(validInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const param = searchParams.get('category') as ProjectCategory | null;
    if (param && projectCategories.includes(param)) {
      setSelectedCategory(param);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category }, { replace: true });
    }
  };

  useDocumentMeta({
    title: 'Projects — GrowthPilot | Filterable Digital Architecture Gallery',
    description:
      'Browse and filter GrowthPilot’s demonstration website architectures, landing page funnels, Google Ads blueprints, and GA4 measurement setups.',
    path: '/projects',
  });

  const filteredProjects = filterProjects(
    projectsData,
    selectedCategory,
    searchQuery
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <section className="relative border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 gp-grid-bg opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-mono text-[#08D9F5]">
              Project Gallery · Clearly Labeled Demo &amp; Reference Architectures
            </p>
            <AnimatedHeading
              as="h1"
              text="Explore Our Digital Growth Blueprints."
              highlightWords={['Digital', 'Growth', 'Blueprints']}
              className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white"
            />
            <p className="mt-4 text-base sm:text-lg text-[#A5AAB4]">
              Filter by capability to inspect how we structure websites, search campaigns, conversion funnels, and analytics tracking.
            </p>
          </div>

          {/* Interactive Filter Controls & Search Bar */}
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B0D10] p-1.5"
            >
              {projectCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'gp-gradient-bg text-[#050505] font-semibold shadow-sm'
                        : 'text-[#A5AAB4] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <label htmlFor="project-search-input" className="sr-only">
                Search projects by keyword or industry
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A5AAB4]"
                aria-hidden="true"
              />
              <input
                id="project-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search industry or service..."
                className="w-full rounded-xl border border-white/15 bg-[#0B0D10] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A5AAB4]/60 focus:border-[#08D9F5] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-[#A5AAB4]">
            <span className="tabular-nums">
              Showing {filteredProjects.length} of {projectsData.length} demonstration projects
            </span>
            {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 text-[#08D9F5] hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-12 text-center">
              <h2 className="text-lg font-bold text-white">
                No projects match your current filter
              </h2>
              <p className="mt-2 text-sm text-[#A5AAB4]">
                Try selecting &ldquo;All&rdquo; categories or clearing your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                }}
                className="mt-5 rounded-lg gp-gradient-bg px-4 py-2 text-xs font-semibold text-[#050505]"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(item) => setActiveProject(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};

export default Projects;
