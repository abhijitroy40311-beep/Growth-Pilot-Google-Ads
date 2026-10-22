export type ProjectCategory =
  | 'All'
  | 'Website Architecture'
  | 'Landing Pages & CRO'
  | 'Performance Marketing'
  | 'Analytics & Strategy';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  statusLabel: 'Demo Architecture' | 'Concept Showcase' | 'Reference Blueprint';
  industry: string;
  category: Exclude<ProjectCategory, 'All'>;
  servicesDelivered: string[];
  summary: string;
  challenge: string;
  approach: string;
  keyFeatures: string[];
  measurementPlan: string[];
  previewTheme: {
    accentFrom: string;
    accentTo: string;
    layoutType: 'split-funnel' | 'search-architecture' | 'analytics-schema' | 'service-platform' | 'b2b-portal' | 'local-lead-engine';
  };
  featured: boolean;
}

/**
 * Clearly labeled demo and reference architectures as required by Section 12:
 * "If real case studies or performance data are unavailable:
 *  - Use clearly labeled demo projects.
 *  - Do not imply that concept websites are completed client engagements.
 *  - Do not fabricate conversions, revenue, or ROAS figures.
 *  - Make project content easy to replace through a central data file."
 */
export const projectsData: ProjectItem[] = [
  {
    id: 'demo-apex-industrial',
    slug: 'apex-precision-engineering-demo',
    title: 'Apex Precision Engineering — B2B Enquiry Platform',
    statusLabel: 'Demo Architecture',
    industry: 'Industrial & B2B Manufacturing',
    category: 'Website Architecture',
    servicesDelivered: [
      'Website Design & Development',
      'Conversion Optimization',
      'Analytics & Tracking',
    ],
    summary:
      'A reference B2B website architecture designed to organize complex technical capabilities into a clear specification-to-RFQ enquiry flow.',
    challenge:
      'Technical buyers often leave industrial websites when capability specifications are buried in PDFs or when requesting a quote requires navigating vague contact pages.',
    approach:
      'Structured the information architecture around buyer intent: clear capability matrices, scannable tolerance specifications, and a guided Request-for-Quote (RFQ) form with event tracking.',
    keyFeatures: [
      'Structured capability & material specification matrix',
      'Multi-step technical RFQ enquiry form with file/spec fields',
      'Mobile-responsive engineering catalog layout',
      'GA4 event triggers on specification downloads and form steps',
    ],
    measurementPlan: [
      'RFQ form initiation vs. completion tracking in GA4',
      'Capability category engagement depth via GTM scroll triggers',
      'Direct phone and email click attribution by landing page',
    ],
    previewTheme: {
      accentFrom: '#1677FF',
      accentTo: '#08D9F5',
      layoutType: 'b2b-portal',
    },
    featured: true,
  },
  {
    id: 'demo-veridian-clinic',
    slug: 'veridian-specialist-clinic-demo',
    title: 'Veridian Specialist Clinic — Local Search & Booking Funnel',
    statusLabel: 'Concept Showcase',
    industry: 'Healthcare & Professional Services',
    category: 'Landing Pages & CRO',
    servicesDelivered: [
      'Landing Pages',
      'Google Ads Structure',
      'Conversion Optimization',
    ],
    summary:
      'A conversion-focused landing page and search campaign blueprint built for local appointment and consultation enquiries.',
    challenge:
      'Service businesses running search ads frequently lose prospective enquiries by sending high-intent visitors to a generic homepage with competing navigation links.',
    approach:
      'Designed a dedicated service landing architecture with immediate trust clarity, transparent consultation steps, mobile click-to-call / WhatsApp routing, and a low-friction callback request form.',
    keyFeatures: [
      'Message-matched hero section aligned with search intent',
      'Clear 3-step consultation expectation timeline',
      'Accessible mobile enquiry bar for phone, WhatsApp, and form booking',
      'Location and operating hours structured data markup',
    ],
    measurementPlan: [
      'GTM tracking for consultation form submissions',
      'Click-to-call and WhatsApp trigger tracking on mobile viewports',
      'Search keyword-to-enquiry source attribution via UTM capture',
    ],
    previewTheme: {
      accentFrom: '#08D9F5',
      accentTo: '#00E6A8',
      layoutType: 'split-funnel',
    },
    featured: true,
  },
  {
    id: 'demo-northstar-logistics',
    slug: 'northstar-commercial-search-architecture',
    title: 'Northstar Commercial — Search Campaign & Attribution Blueprint',
    statusLabel: 'Reference Blueprint',
    industry: 'Commercial Services & Logistics',
    category: 'Performance Marketing',
    servicesDelivered: [
      'Google Ads & Performance Marketing',
      'Analytics & Tracking',
      'Digital Strategy',
    ],
    summary:
      'A campaign planning and attribution demonstration illustrating how high-intent search themes map to dedicated landing pages and clean GA4 events.',
    challenge:
      'Broad keyword targeting and unverified conversion tracking often cause advertising budgets to be spent on irrelevant informational searches.',
    approach:
      'Built a segmented campaign structure separating commercial service queries from research queries, paired with negative keyword guardrails and GTM conversion validation.',
    keyFeatures: [
      'Intent-segmented ad group structure with negative keyword taxonomy',
      'Dedicated landing page routing per service line',
      'Hidden UTM parameter capture inside lead forms',
      'Clean GA4 conversion event schema avoiding duplicate page-load triggers',
    ],
    measurementPlan: [
      'Verified form_submit conversion event with campaign parameters',
      'Search term relevance audit cadence and negative keyword expansion',
      'Landing page interaction diagnostics',
    ],
    previewTheme: {
      accentFrom: '#1677FF',
      accentTo: '#00E6A8',
      layoutType: 'search-architecture',
    },
    featured: true,
  },
  {
    id: 'demo-solaris-energy',
    slug: 'solaris-commercial-energy-cro',
    title: 'Solaris Commercial — Assessment & Enquiry Flow Redesign',
    statusLabel: 'Demo Architecture',
    industry: 'Clean Energy & Commercial Installations',
    category: 'Landing Pages & CRO',
    servicesDelivered: [
      'Conversion Optimization',
      'Website Design & Development',
      'Digital Strategy',
    ],
    summary:
      'A demonstration of transforming a dense, text-heavy service page into a structured site-assessment enquiry journey.',
    challenge:
      'Commercial property owners needed clarity on eligibility, installation phases, and assessment requirements before committing to a consultation call.',
    approach:
      'Replaced long unbroken text blocks with an interactive readiness checklist, clear process milestones, and a concise property assessment inquiry form.',
    keyFeatures: [
      'Interactive project readiness & scope selector',
      'Scannable installation process breakdown',
      'Technical FAQ accordion addressing common buyer objections',
      'Fast-loading semantic layout optimized for Core Web Vitals',
    ],
    measurementPlan: [
      'Step completion tracking across the inquiry flow',
      'FAQ topic expansion tracking to identify common visitor concerns',
      'Core Web Vitals and mobile usability validation',
    ],
    previewTheme: {
      accentFrom: '#00E6A8',
      accentTo: '#1677FF',
      layoutType: 'local-lead-engine',
    },
    featured: false,
  },
  {
    id: 'demo-vanguard-advisory',
    slug: 'vanguard-advisory-analytics-schema',
    title: 'Vanguard Advisory — Multi-Channel Measurement & GA4 Architecture',
    statusLabel: 'Reference Blueprint',
    industry: 'B2B Consulting & Advisory',
    category: 'Analytics & Strategy',
    servicesDelivered: [
      'Analytics & Tracking',
      'Digital Strategy',
      'Conversion Optimization',
    ],
    summary:
      'An analytics governance and measurement blueprint demonstrating how B2B service firms can track meaningful engagement without data noise.',
    challenge:
      'Default analytics setups track pageviews but rarely distinguish between a bounced visitor and a prospective client who reviewed service pages and submitted an inquiry.',
    approach:
      'Defined a structured measurement plan in Google Tag Manager and GA4 focusing on high-intent actions: service comparison views, consultation form completions, and direct contact clicks.',
    keyFeatures: [
      'Documented GTM trigger and variable naming taxonomy',
      'Custom GA4 events for consultation requests and guide requests',
      'Cross-page journey funnel visualization blueprint',
      'Privacy-conscious consent and tag firing rules',
    ],
    measurementPlan: [
      'End-to-end verification in GTM Preview & GA4 DebugView',
      'Channel-to-enquiry attribution reporting structure',
      'Quarterly tag hygiene and broken-link auditing',
    ],
    previewTheme: {
      accentFrom: '#08D9F5',
      accentTo: '#1677FF',
      layoutType: 'analytics-schema',
    },
    featured: false,
  },
  {
    id: 'demo-atelier-architectural',
    slug: 'atelier-architectural-systems-web',
    title: 'Atelier Architectural Systems — Modular Web Presence',
    statusLabel: 'Concept Showcase',
    industry: 'Architecture & Building Systems',
    category: 'Website Architecture',
    servicesDelivered: [
      'Website Design & Development',
      'Digital Strategy',
      'Analytics & Tracking',
    ],
    summary:
      'A modular digital showcase concept designed for architectural and building-system providers to present specifications and capture project consultations.',
    challenge:
      'Architects and commercial developers require rapid access to system capabilities and project suitability before initiating a project inquiry.',
    approach:
      'Created a high-contrast, fast-loading specification showcase paired with direct project inquiry routing and clean technical SEO metadata.',
    keyFeatures: [
      'Filterable system application catalog',
      'Project inquiry routing by project stage and sector',
      'Accessible keyboard navigation and reduced-motion support',
      'Structured Schema.org metadata and clean URL hierarchy',
    ],
    measurementPlan: [
      'System category filter interaction tracking',
      'Consultation form submission tracking by project type',
      'Organic search landing page engagement monitoring',
    ],
    previewTheme: {
      accentFrom: '#1677FF',
      accentTo: '#00E6A8',
      layoutType: 'service-platform',
    },
    featured: false,
  },
];

export const projectCategories: ProjectCategory[] = [
  'All',
  'Website Architecture',
  'Landing Pages & CRO',
  'Performance Marketing',
  'Analytics & Strategy',
];
