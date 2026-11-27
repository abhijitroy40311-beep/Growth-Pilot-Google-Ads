import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import { buildBreadcrumbSchema } from '../lib/seo';
import {
  projectsData,
  projectCategories,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';
import { filterProjects } from '../lib/filterLogic';
import { AnimatedContent } from '../components/animation/AnimatedContent';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectDetailModal } from '../components/ui/ProjectDetailModal';
import { EditorialEyebrow } from '../components/ui/EditorialPrimitives';

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

  const meta = getRouteMetaByPath('/projects')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/projects',
    structuredData: buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
  });

  const filteredProjects = filterProjects(
    projectsData,
    selectedCategory,
    searchQuery
  );

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F5F7]">
      <section className="border-b border-white/10 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <EditorialEyebrow label="Project Gallery // Clearly Labeled Reference Architectures" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.08]">
              Search Architecture, Landing Pages &amp; Measurement Blueprints.
            </h1>
            <p className="max-w-[62ch] text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
              Every project below is transparently marked as a Demonstration Architecture, Concept Showcase, or Reference Blueprint—showing system structure without fabricated client performance claims.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 rounded-md border border-white/12 bg-[#111318] p-1.5"
            >
              {projectCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`inline-flex min-h-[40px] items-center rounded-sm px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8] ${
                      isActive
                        ? 'bg-[#F4F5F7] text-[#090A0D] font-semibold'
                        : 'text-[#A6ADBB] hover:text-[#F4F5F7]'
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
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8890A0]"
                aria-hidden="true"
              />
              <input
                id="project-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search industry or service..."
                className="w-full min-h-[44px] rounded-md border border-white/15 bg-[#111318] pl-10 pr-4 py-2 text-sm text-[#F4F5F7] placeholder-[#8890A0] focus:border-[#18C4A8] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-[#8890A0]">
            <span className="tabular-nums">
              Showing {filteredProjects.length} of {projectsData.length} demonstration blueprints
            </span>
            {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 text-[#18C4A8] hover:text-[#F4F5F7] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-[#111318] p-12 text-center">
              <h2 className="text-lg font-bold text-[#F4F5F7]">
                No blueprints match your current filter
              </h2>
              <p className="mt-2 text-sm text-[#A6ADBB]">
                Try selecting &ldquo;All&rdquo; categories or clearing your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                }}
                className="mt-5 min-h-[40px] rounded-md bg-[#F4F5F7] px-4 py-2 text-xs font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors"
              >
                Show All Blueprints
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, idx) => (
                <AnimatedContent
                  key={project.id}
                  delay={Math.min(idx, 5) * 0.035}
                  distance={10}
                  duration={360}
                  className="h-full [&>article]:h-full"
                >
                  <ProjectCard
                    project={project}
                    onSelect={(item) => setActiveProject(item)}
                  />
                </AnimatedContent>
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
