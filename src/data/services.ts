export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: 'Globe' | 'Target' | 'TrendingUp' | 'BarChart3' | 'Compass';
  capabilities: string[];
  deliverables: string[];
  idealFor: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Design & Development',
    shortDescription:
      'Modern, responsive websites and high-clarity landing pages engineered to turn visitor attention into structured business enquiries.',
    fullDescription:
      'Your website should do more than exist online—it should guide prospective customers from their first question to a confident enquiry. We design and build fast, accessible websites structured around clear user journeys, strong messaging hierarchy, and technical SEO foundations.',
    iconName: 'Globe',
    capabilities: [
      'Modern responsive websites',
      'Landing pages & business websites',
      'Conversion-focused layouts',
      'Contact forms and WhatsApp integration',
      'Performance and technical SEO foundations',
    ],
    deliverables: [
      'Custom responsive frontend architecture',
      'Structured enquiry forms and direct contact routing',
      'On-page semantic HTML, metadata, and speed optimization',
      'Cross-device and accessibility verification',
    ],
    idealFor:
      'Businesses launching a new digital presence or replacing an outdated website that fails to generate consistent enquiries.',
  },
  {
    id: 'google-ads',
    number: '02',
    title: 'Google Ads & Performance Marketing',
    shortDescription:
      'Search and performance campaigns structured around high-intent keywords, disciplined negative keyword filtering, and aligned landing pages.',
    fullDescription:
      'Paid traffic is only valuable when it reaches people actively looking for what you offer and directs them to a relevant destination. We plan, configure, and refine Google Ads campaigns with careful keyword selection, geographic focus, and conversion tracking.',
    iconName: 'Target',
    capabilities: [
      'Campaign planning and setup',
      'Keyword and negative keyword research',
      'Location targeting',
      'Ad copy and landing page optimization',
      'Conversion tracking & ongoing performance analysis',
    ],
    deliverables: [
      'Structured campaign and ad group architecture',
      'Search intent mapping and negative keyword lists',
      'Ad copy variations aligned with landing page messaging',
      'Verified conversion action setup and review cycles',
    ],
    idealFor:
      'Service providers and commercial teams seeking qualified search visibility with transparent measurement.',
  },
  {
    id: 'conversion-optimization',
    number: '03',
    title: 'Conversion Optimization',
    shortDescription:
      'Practical improvements to user journeys, page clarity, calls to action, and enquiry flows so existing traffic performs better.',
    fullDescription:
      'Before spending more on traffic, it pays to remove friction from the path visitors already take. We audit how users navigate your pages, clarify your value proposition, simplify forms, and structure calls to action around real customer questions.',
    iconName: 'TrendingUp',
    capabilities: [
      'User journey analysis',
      'Landing page improvements',
      'Clear calls to action',
      'Form and enquiry flow improvements',
      'Data-informed recommendations',
    ],
    deliverables: [
      'Page-by-page friction and clarity audit',
      'Refined headline, layout, and CTA hierarchy',
      'Streamlined multi-step or single-step enquiry forms',
      'Prioritized implementation roadmap',
    ],
    idealFor:
      'Organizations already receiving website traffic that want to improve the proportion of visitors who reach out.',
  },
  {
    id: 'analytics-tracking',
    number: '04',
    title: 'Analytics & Tracking',
    shortDescription:
      'Clean GA4 and Google Tag Manager configurations that record meaningful actions—form submissions, calls, and key engagement events.',
    fullDescription:
      'Sound decisions require trustworthy data. We implement and audit Google Analytics 4 and Google Tag Manager setups so you can see which channels, pages, and campaigns contribute to real business enquiries.',
    iconName: 'BarChart3',
    capabilities: [
      'GA4 and Google Tag Manager integration',
      'Relevant conversion event tracking',
      'Call, form, and WhatsApp click tracking where technically supported',
      'Campaign measurement and reporting',
    ],
    deliverables: [
      'Google Tag Manager container setup and trigger auditing',
      'GA4 custom event and conversion configuration',
      'UTM parameter structure and attribution hygiene',
      'Clear summary documentation of tracked events',
    ],
    idealFor:
      'Teams running marketing campaigns or website updates who need clarity on what visitors actually do before inquiring.',
  },
  {
    id: 'digital-strategy',
    number: '05',
    title: 'Digital Strategy',
    shortDescription:
      'Structured research into your market, competitors, and customer journey to establish a realistic, prioritized digital growth roadmap.',
    fullDescription:
      'Execution works best when anchored in strategy. We evaluate your current positioning, research how prospective customers search and compare options in your sector, and map a step-by-step plan aligned with your commercial priorities.',
    iconName: 'Compass',
    capabilities: [
      'Growth opportunity research',
      'Competitor and market analysis',
      'Customer journey planning',
      'Practical improvement roadmaps',
    ],
    deliverables: [
      'Digital presence and competitor landscape review',
      'Customer acquisition and enquiry funnel blueprint',
      'Channel prioritization and budget allocation framework',
      'Phased 90-day implementation sequence',
    ],
    idealFor:
      'Founders and business leaders who want a clear, objective plan before committing budget to development or advertising.',
  },
];
