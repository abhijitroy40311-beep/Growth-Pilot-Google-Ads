export interface NavItem {
  label: string;
  path: string;
  sectionId?: string;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Home', path: '/', sectionId: 'stage-hero' },
  { label: 'Services', path: '/services', sectionId: 'stage-services' },
  { label: 'Projects', path: '/projects', sectionId: 'stage-projects' },
  { label: 'About', path: '/about', sectionId: 'stage-story' },
  { label: 'Contact', path: '/contact', sectionId: 'stage-contact' },
];

export interface HomeSectionLink {
  label: string;
  sectionId: string;
  stageCode: string;
}

export const homeSectionQuickLinks: HomeSectionLink[] = [
  { label: 'Overview', sectionId: 'stage-hero', stageCode: '01' },
  { label: 'Diagnosis', sectionId: 'stage-story', stageCode: '02' },
  { label: 'Services', sectionId: 'stage-services', stageCode: '03' },
  { label: 'Industries', sectionId: 'stage-industries', stageCode: '04' },
  { label: 'Process', sectionId: 'stage-process', stageCode: '05' },
  { label: 'Tracking', sectionId: 'stage-measurement', stageCode: '06' },
  { label: 'Why Direct', sectionId: 'stage-why', stageCode: '07' },
  { label: 'FAQ', sectionId: 'stage-faq', stageCode: '08' },
  { label: 'Contact', sectionId: 'stage-contact', stageCode: '09' },
];

export const footerNavigation = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Google Ads Management', path: '/services#google-ads' },
    { label: 'Website Design & Development', path: '/services#website-development' },
    { label: 'Dental Implant Marketing', path: '/dental-implant-marketing' },
    { label: 'Conversion Optimization', path: '/services#conversion-optimization' },
    { label: 'Analytics & Tracking', path: '/services#analytics-tracking' },
    { label: 'Digital Strategy', path: '/services#digital-strategy' },
  ],
  resources: [
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Free Account Review', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
};
