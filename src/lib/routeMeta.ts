export interface RouteMetaEntry {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  sitemap?: {
    changefreq: 'weekly' | 'monthly' | 'yearly';
    priority: string;
  };
}

export const SITE_CANONICAL_DOMAIN = 'https://growthpilotagency-ten.vercel.app';

export const CANONICAL_ROUTE_META: RouteMetaEntry[] = [
  {
    path: '/',
    title: 'Google Ads Specialist for Service Businesses | GrowthPilot',
    description:
      'Google Ads specialist helping HVAC, solar, dental, epoxy flooring, roofing, and plumbing businesses across the US, UK, Australia, Canada, and Ireland generate qualified enquiries.',
    sitemap: { changefreq: 'weekly', priority: '1.0' },
  },
  {
    path: '/services',
    title: 'Google Ads Management, PPC, Website Design & CRO Services | GrowthPilot',
    description:
      'Explore GrowthPilot’s Google Ads management services, PPC campaign optimization, lead-generation website design, landing page CRO, and GA4 conversion tracking.',
    sitemap: { changefreq: 'weekly', priority: '0.95' },
  },
  {
    path: '/about',
    title: 'About GrowthPilot | Google Ads Specialist & Digital Growth Consultant',
    description:
      'Learn how GrowthPilot combines Google Ads management, conversion-focused website development, CRO, and GA4 measurement to help businesses generate qualified inquiries.',
    sitemap: { changefreq: 'monthly', priority: '0.85' },
  },
  {
    path: '/projects',
    title: 'Lead Generation Website Design & PPC Funnel Blueprints | GrowthPilot',
    description:
      'Inspect GrowthPilot’s demonstration architectures for lead generation website design, Google Ads search campaigns, landing page CRO, and GA4 tracking.',
    sitemap: { changefreq: 'weekly', priority: '0.85' },
  },
  {
    path: '/contact',
    title: 'Contact Abhijit Roy | Google Ads Specialist | GrowthPilot',
    description:
      'Contact Abhijit Roy at GrowthPilot to discuss Google Ads campaign management, landing page optimization, or GA4 and Google Tag Manager conversion tracking for your service business.',
    sitemap: { changefreq: 'monthly', priority: '0.9' },
  },
  {
    path: '/faq',
    title: 'Google Ads Management, Website Design & CRO FAQs | GrowthPilot',
    description:
      'Find straightforward answers about GrowthPilot’s Google Ads management services, lead-generation website development, GA4 conversion tracking, and project workflow.',
    sitemap: { changefreq: 'monthly', priority: '0.75' },
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — GrowthPilot',
    description:
      'Learn how GrowthPilot collects, uses, stores, and protects personal information when you visit our website or submit a project enquiry.',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions — GrowthPilot',
    description:
      'Terms and conditions governing the use of the GrowthPilot website, demonstration architectures, and project inquiries.',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
  },
  {
    path: '/thank-you',
    title: 'Thank You — GrowthPilot | Project Inquiry Received',
    description:
      'Thank you for submitting your project inquiry to GrowthPilot. Your brief has been delivered and will be reviewed within 1–2 business days.',
    noindex: true,
  },
];

export function getRouteMetaByPath(path: string): RouteMetaEntry | undefined {
  return CANONICAL_ROUTE_META.find((entry) => entry.path === path);
}

