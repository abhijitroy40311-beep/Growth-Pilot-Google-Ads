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
      'Yes. We build modern, responsive websites and dedicated landing pages for small and medium-sized businesses as well as growing commercial teams. Every site is structured around clarity, fast performance, mobile usability, and guiding visitors toward a real enquiry.',
    category: 'Services & Scope',
  },
  {
    id: 'google-ads-management',
    question: 'Can you manage Google Ads campaigns?',
    answer:
      'Yes. We handle Google Ads campaign planning, account setup, keyword and negative keyword research, location targeting, ad copy creation, landing page alignment, conversion tracking, and ongoing performance reviews. We focus on attracting relevant search intent rather than unmeasured clicks.',
    category: 'Measurement & Ads',
  },
  {
    id: 'measure-campaign-performance',
    question: 'How do you measure campaign performance?',
    answer:
      'We use Google Analytics 4 (GA4) and Google Tag Manager (GTM) alongside platform conversion tracking to measure meaningful actions such as enquiry form submissions, phone clicks, and WhatsApp interactions where technically supported. While no agency can guarantee specific advertising returns, proper tracking ensures decisions are guided by actual data.',
    category: 'Measurement & Ads',
  },
  {
    id: 'improve-existing-website',
    question: 'Can you improve an existing website?',
    answer:
      'Yes. If your current website has a solid technical foundation, we can audit the user journey, refine landing page copy and layout, improve calls to action, streamline enquiry forms, and configure accurate event tracking without requiring a full rebuild. If a rebuild is more cost-effective, we will explain why clearly.',
    category: 'Services & Scope',
  },
  {
    id: 'how-project-begins',
    question: 'How does a project begin?',
    answer:
      'Every project starts with an initial discovery conversation where we learn about your business, target customers, current digital setup, and primary objectives. From there, we review your existing assets and provide a clear proposal outlining recommended priorities, deliverables, and next steps.',
    category: 'Process & Timeline',
  },
  {
    id: 'website-project-timeline',
    question: 'How long does a website project take?',
    answer:
      'Project timelines depend on the scope, number of pages, custom functionality, and how quickly content and feedback are finalized. A focused landing page takes less time than a multi-page business website with custom integrations. Before starting, we provide a realistic schedule tailored to your specific project scope.',
    category: 'Process & Timeline',
  },
  {
    id: 'information-needed',
    question: 'What information do you need from me?',
    answer:
      'To begin, it helps to share an overview of your services or products, who your ideal customers are, any brand assets (such as your logo), your current website URL if you have one, and what a qualified enquiry looks like for your business. We guide you through everything step by step.',
    category: 'Process & Timeline',
  },
  {
    id: 'ongoing-support',
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Depending on your needs, we can provide ongoing Google Ads management, periodic conversion optimization updates, analytics monitoring, or website maintenance after launch. Ongoing support is always scoped transparently based on what your business actually requires.',
    category: 'Pricing & Support',
  },
  {
    id: 'pricing-and-payment',
    question: 'How do project pricing and payment work?',
    answer:
      'Because every business has different requirements, we do not use one-size-fits-all pricing packages. After understanding your goals and scope, we provide a written proposal detailing the exact deliverables and investment. Project work is typically structured around clear project milestones, while ongoing campaign management is billed on an agreed recurring schedule.',
    category: 'Pricing & Support',
  },
];
