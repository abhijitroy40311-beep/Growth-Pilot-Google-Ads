export type FAQCategory = 'All' | 'Services & Scope' | 'Process & Timeline' | 'Measurement & Ads' | 'Pricing & Support';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: Exclude<FAQCategory, 'All'>;
}

export const faqCategories: FAQCategory[] = [
  'All',
  'Services & Scope',
  'Process & Timeline',
  'Measurement & Ads',
  'Pricing & Support',
];

export const faqsData: FAQItem[] = [
  {
    id: 'services-provided',
    question: 'What services does GrowthPilot provide?',
    answer:
      'GrowthPilot focuses on five core areas: Website Design & Development, Google Ads & Performance Marketing, Conversion Optimization (CRO), Analytics & Tracking (GA4 and Google Tag Manager), and Digital Growth Strategy. Each service can be engaged individually or combined into a cohesive growth roadmap depending on your business goals.',
    category: 'Services & Scope',
  },
  {
    id: 'small-businesses',
    question: 'Do you build websites for small businesses?',
    answer:
      'Yes. I build modern, responsive websites and dedicated landing pages for independent service operators and growing commercial teams across HVAC, solar, dental, roofing, epoxy flooring, plumbing, and related trades. Every site is structured around clarity, fast loading, mobile usability, and guiding visitors toward a real enquiry.',
    category: 'Services & Scope',
  },
  {
    id: 'google-ads-management',
    question: 'Can you manage Google Ads campaigns?',
    answer:
      'Yes. I handle Google Ads campaign planning, account structuring, keyword and negative keyword research, location targeting, ad copy writing, landing page alignment, conversion tracking, and ongoing optimization. Every account stays under your direct ownership with transparent visibility into budget and search terms.',
    category: 'Measurement & Ads',
  },
  {
    id: 'measure-campaign-performance',
    question: 'How do you measure campaign performance?',
    answer:
      'I configure Google Analytics 4 (GA4) and Google Tag Manager (GTM) alongside Google Ads conversion tracking to record verified actions such as enquiry form submissions, phone calls, and WhatsApp interactions where supported. While no ethical specialist guarantees fixed returns in advance, clean tracking ensures decisions rest on verified data rather than guesswork.',
    category: 'Measurement & Ads',
  },
  {
    id: 'improve-existing-website',
    question: 'Can you improve an existing website?',
    answer:
      'Yes. If your current website has a solid technical foundation, I can audit the user journey, refine landing page copy and layout, improve calls to action, streamline enquiry forms, and configure accurate event tracking without requiring a full rebuild. If a focused rebuild is more cost-effective, I will explain why plainly.',
    category: 'Services & Scope',
  },
  {
    id: 'how-project-begins',
    question: 'How does a project begin?',
    answer:
      'Every engagement starts directly with an initial discovery conversation covering your service lines, target geographic markets, current website or ad account, and what a profitable enquiry looks like. From there, I inspect your setup personally and share a written scope outlining recommended priorities and next steps.',
    category: 'Process & Timeline',
  },
  {
    id: 'website-project-timeline',
    question: 'How long does a website project take?',
    answer:
      'Project timelines depend on scope, page count, custom functionality, and review turnaround. A dedicated Google Ads landing page moves faster than a multi-page business site with custom integrations. Before starting, I provide a realistic milestone schedule tailored to your scope.',
    category: 'Process & Timeline',
  },
  {
    id: 'information-needed',
    question: 'What information do you need from me?',
    answer:
      'To review your setup, it helps to share your priority services, target geographic regions, current website URL if active, and any existing Google Ads or analytics context. From there, we walk through access and requirements step by step.',
    category: 'Process & Timeline',
  },
  {
    id: 'ongoing-support',
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Depending on your priorities, I provide ongoing Google Ads campaign management, regular search-term audits, landing page refinements, and analytics maintenance—without long-term contract lock-in.',
    category: 'Pricing & Support',
  },
  {
    id: 'pricing-and-payment',
    question: 'How do project pricing and payment work?',
    answer:
      'Because every market, competition level, and website scope differs, I do not force one-size-fits-all retainer tiers. After reviewing your goals and current setup, I provide a straightforward written proposal detailing exact deliverables, milestone pricing for build work, or flat recurring terms for ongoing Google Ads management. Ad spend is always billed directly by Google to your own payment method.',
    category: 'Pricing & Support',
  },
];
