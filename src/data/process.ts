export interface ProcessStep {
  stepNumber: string;
  code: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: '01',
    code: 'STEP 01 — DISCOVER',
    title: 'Discover',
    description:
      'We understand your business, target customers, goals, and current challenges.',
    deliverables: [
      'Initial consultation',
      'Goal definition',
      'Business and audience understanding',
    ],
  },
  {
    stepNumber: '02',
    code: 'STEP 02 — AUDIT & RESEARCH',
    title: 'Audit & Research',
    description:
      'We evaluate your existing website, customer journey, advertising opportunities, and tracking setup.',
    deliverables: [
      'Opportunity analysis',
      'Keyword and competitor research where relevant',
      'Technical and conversion review',
    ],
  },
  {
    stepNumber: '03',
    code: 'STEP 03 — STRATEGY',
    title: 'Strategy',
    description:
      'We define the priorities, recommended solutions, and measurement plan.',
    deliverables: [
      'Project roadmap',
      'Service recommendations',
      'Defined success metrics',
    ],
  },
  {
    stepNumber: '04',
    code: 'STEP 04 — BUILD & IMPLEMENT',
    title: 'Build & Implement',
    description:
      'We develop the website, landing pages, campaigns, or tracking improvements agreed upon for the project.',
    deliverables: [
      'Responsive implementation',
      'Quality assurance',
      'Tracking configuration',
    ],
  },
  {
    stepNumber: '05',
    code: 'STEP 05 — TEST & LAUNCH',
    title: 'Test & Launch',
    description:
      'We test user journeys, forms, navigation, mobile layouts, tracking, and campaign settings before launch.',
    deliverables: [
      'Functional testing',
      'Performance checks',
      'Launch readiness',
    ],
  },
  {
    stepNumber: '06',
    code: 'STEP 06 — MEASURE & IMPROVE',
    title: 'Measure & Improve',
    description:
      'We review available data and refine the experience based on actual performance.',
    deliverables: [
      'Performance monitoring',
      'Actionable recommendations',
      'Ongoing optimization when included in the service agreement',
    ],
  },
];

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export const whyGrowthPilotPrinciples: PrincipleItem[] = [
  {
    number: '01',
    title: 'Strategy Before Execution',
    description:
      'Every project begins by clarifying who you want to reach, what action matters most, and why visitors should trust your business before writing code or launching ads.',
  },
  {
    number: '02',
    title: 'Clear Communication',
    description:
      'We explain recommendations in plain business terms—what we are building, why it matters, and what inputs are required at each stage.',
  },
  {
    number: '03',
    title: 'Conversion-Focused Design',
    description:
      'Visual polish serves a purpose: guiding visitors logically toward a call, form submission, or consultation inquiry without distraction.',
  },
  {
    number: '04',
    title: 'Measurement and Transparency',
    description:
      'We configure analytics and event tracking so you can see how users interact with your website and campaigns without guesswork.',
  },
  {
    number: '05',
    title: 'Continuous Improvement',
    description:
      'Digital growth is iterative. We use real campaign and user behavior insights to refine landing pages, targeting, and enquiry flows over time.',
  },
  {
    number: '06',
    title: 'Solutions Aligned With Business Goals',
    description:
      'We recommend only the services and scope that fit your current stage, operational capacity, and commercial objectives.',
  },
];
