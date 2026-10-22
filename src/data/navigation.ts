export interface NavItem {
  label: string;
  path: string;
  sectionId?: string;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Home', path: '/', sectionId: 'stage-hero' },
  { label: 'About Us', path: '/about', sectionId: 'stage-story' },
  { label: 'Projects', path: '/projects', sectionId: 'stage-projects' },
  { label: 'Services', path: '/services', sectionId: 'stage-services' },
  { label: 'Contact Us', path: '/contact', sectionId: 'stage-contact' },
];

export interface HomeSectionLink {
  label: string;
  sectionId: string;
  stageCode: string;
}

export const homeSectionQuickLinks: HomeSectionLink[] = [
  { label: 'Top', sectionId: 'stage-hero', stageCode: '01' },
  { label: 'Story', sectionId: 'stage-story', stageCode: '02' },
  { label: 'Services', sectionId: 'stage-services', stageCode: '03' },
  { label: 'Process', sectionId: 'stage-process', stageCode: '04' },
  { label: 'Why Us', sectionId: 'stage-why', stageCode: '05' },
  { label: 'FAQ', sectionId: 'stage-faq', stageCode: '06' },
  { label: 'Next Move', sectionId: 'stage-contact', stageCode: '07' },
];

export const footerNavigation = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
  ],
  services: [
    { label: 'Website Development', path: '/services#website-development' },
    { label: 'Google Ads', path: '/services#google-ads' },
    { label: 'Conversion Optimization', path: '/services#conversion-optimization' },
    { label: 'Analytics & Tracking', path: '/services#analytics-tracking' },
    { label: 'Digital Strategy', path: '/services#digital-strategy' },
  ],
  resources: [
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Project Inquiry', path: '/contact#inquiry-form' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
};
