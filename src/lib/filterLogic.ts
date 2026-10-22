import { ProjectCategory, ProjectItem } from '../data/projects';
import { FAQCategory, FAQItem } from '../data/faqs';

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      project.title,
      project.industry,
      project.category,
      project.summary,
      ...project.servicesDelivered,
    ]
      .join(' ')
      .toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function filterFAQs(
  faqs: FAQItem[],
  category: FAQCategory,
  searchQuery: string = ''
): FAQItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return faqs.filter((faq) => {
    const matchesCategory = category === 'All' || faq.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      faq.question.toLowerCase().includes(normalizedQuery) ||
      faq.answer.toLowerCase().includes(normalizedQuery)
    );
  });
}

export interface LogoJourneyStage {
  stageIndex: number; // 1 to 7
  id: 'hero' | 'about' | 'services' | 'process' | 'projects' | 'results' | 'contact';
  label: string;
  description: string;
  rotationDeg: number;
  rotateYDeg: number;
  scale: number;
  glowIntensity: number;
  xPercentViewport: number;
  yPercentViewport: number;
}

export const LOGO_JOURNEY_STAGES: LogoJourneyStage[] = [
  {
    stageIndex: 1,
    id: 'hero',
    label: 'Stage 01 · Ignition',
    description: 'Navigate Growth With Intelligence',
    rotationDeg: 0,
    rotateYDeg: 0,
    scale: 1,
    glowIntensity: 0.9,
    xPercentViewport: 88,
    yPercentViewport: 22,
  },
  {
    stageIndex: 2,
    id: 'about',
    label: 'Stage 02 · Diagnosis',
    description: 'Identifying visitor friction',
    rotationDeg: 28,
    rotateYDeg: 0,
    scale: 0.78,
    glowIntensity: 0.65,
    xPercentViewport: 92,
    yPercentViewport: 34,
  },
  {
    stageIndex: 3,
    id: 'services',
    label: 'Stage 03 · Capabilities',
    description: 'Solutions aligned with business goals',
    rotationDeg: 135,
    rotateYDeg: 0,
    scale: 0.82,
    glowIntensity: 0.75,
    xPercentViewport: 91,
    yPercentViewport: 46,
  },
  {
    stageIndex: 4,
    id: 'process',
    label: 'Stage 04 · Process',
    description: 'A clear 6-step roadmap',
    rotationDeg: 90,
    rotateYDeg: 360, // Full 360 vertical flip so symbol never remains mirrored
    scale: 0.85,
    glowIntensity: 0.8,
    xPercentViewport: 92,
    yPercentViewport: 56,
  },
  {
    stageIndex: 5,
    id: 'projects',
    label: 'Stage 05 · Architecture',
    description: 'Curved trajectory through work',
    rotationDeg: 42,
    rotateYDeg: 360,
    scale: 0.8,
    glowIntensity: 0.85,
    xPercentViewport: 89,
    yPercentViewport: 68,
  },
  {
    stageIndex: 6,
    id: 'results',
    label: 'Stage 06 · Progress',
    description: 'Upward vector & transparent tracking',
    rotationDeg: -12,
    rotateYDeg: 360,
    scale: 0.92,
    glowIntensity: 1.0,
    xPercentViewport: 91,
    yPercentViewport: 78,
  },
  {
    stageIndex: 7,
    id: 'contact',
    label: 'Stage 07 · Launch',
    description: 'Ready for your next move',
    rotationDeg: 0,
    rotateYDeg: 360,
    scale: 0.88,
    glowIntensity: 0.95,
    xPercentViewport: 90,
    yPercentViewport: 86,
  },
];

export function resolveJourneyStage(progress: number): LogoJourneyStage {
  const clamped = Math.max(0, Math.min(1, progress));
  const index = Math.min(
    LOGO_JOURNEY_STAGES.length - 1,
    Math.floor(clamped * LOGO_JOURNEY_STAGES.length)
  );
  return LOGO_JOURNEY_STAGES[index];
}
