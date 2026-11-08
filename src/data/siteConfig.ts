export interface SiteConfig {
  brandName: string;
  tagline: string;
  shortDescription: string;
  domain: string;
  assets: {
    emblemSvg: string;
    arrowSvg: string;
    faviconSvg: string;
    emblemTransparentPng: string;
    lockupTransparentPng: string;
    logoTransparentPng: string;
    wordmarkTransparentPng: string;
    fullOriginalPng: string;
  };
  emailjs: {
    serviceId: string;
    templateId: string;
    publicKey: string;
    privateKey: string;
  };
  contact: {
    /**
     * Configurable contact channels.
     * Set to verified values when provided; leave null when unverified so fake details are never displayed.
     */
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    whatsappMessage: string;
    location: string | null;
    responseWindow: string;
    inquiryEndpoint: string;
    healthEndpoint: string;
  };
  socials: {
    linkedin: string | null;
    instagram: string | null;
    facebook: string | null;
  };
}

function cleanEnv(value: string | undefined, fallback: string | null = null): string | null {
  if (!value) return fallback;
  const trimmed = value.trim();
  if (!trimmed || /^(none|null|undefined|false)$/i.test(trimmed)) {
    return fallback;
  }
  return trimmed;
}

const metaEnv: Record<string, string | undefined> =
  (import.meta as { env?: Record<string, string | undefined> }).env || {};

export const siteConfig: SiteConfig = {
  brandName: 'GrowthPilot',
  tagline: 'Navigate Growth With Intelligence.',
  shortDescription:
    'Google Ads management services, conversion-focused website design, landing page optimization, and GA4 tracking designed to generate qualified business inquiries.',
  domain:
    cleanEnv(metaEnv.VITE_APP_URL, 'https://growthpilotagency-nine.vercel.app') ||
    'https://growthpilotagency-nine.vercel.app',
  assets: {
    emblemSvg: '/assets/aistudio/growthpilot-emblem_d5dbc453.svg',
    arrowSvg: '/assets/aistudio/growthpilot-arrow_46f22e63.svg',
    faviconSvg: '/assets/aistudio/favicon_130b28cb.svg',
    emblemTransparentPng: '/assets/aistudio/growthpilot-emblem-transparent_37ade5e6.png',
    lockupTransparentPng: '/assets/aistudio/growthpilot-lockup-transparent_9fdbc0ee.png',
    logoTransparentPng: '/assets/aistudio/growthpilot-logo-transparent_014201d5.png',
    wordmarkTransparentPng: '/assets/aistudio/growthpilot-wordmark-transparent_5785379e.png',
    fullOriginalPng: '/assets/aistudio/GrowthPilot__Navigate_Growth_with_Intelligence_00a6f627_00a6f627.png',
  },
  emailjs: {
    serviceId: cleanEnv(metaEnv.VITE_EMAILJS_SERVICE_ID, 'service_1g1fike') || 'service_1g1fike',
    templateId: cleanEnv(metaEnv.VITE_EMAILJS_TEMPLATE_ID, 'template_a1gp7od') || 'template_a1gp7od',
    publicKey: cleanEnv(metaEnv.VITE_EMAILJS_PUBLIC_KEY, 'J6Z6BqADTVbe_oGTY') || 'J6Z6BqADTVbe_oGTY',
    privateKey: cleanEnv(metaEnv.VITE_EMAILJS_PRIVATE_KEY, 'DI2V29MD3yRrzMUHrnOQZ') || 'DI2V29MD3yRrzMUHrnOQZ',
  },
  contact: {
    // Verified channels configured via .env
    email: cleanEnv(metaEnv.VITE_CONTACT_EMAIL, 'abhijitroy40311@gmail.com'),
    phone: cleanEnv(metaEnv.VITE_CONTACT_PHONE, '8777202487'),
    whatsapp:
      cleanEnv(metaEnv.VITE_WHATSAPP_NUMBER) ||
      cleanEnv(metaEnv.VITE_CONTACT_PHONE, '8777202487'),
    whatsappMessage:
      "Hi GrowthPilot team! I'd like to discuss a project and learn how we can work together.",
    location: cleanEnv(metaEnv.VITE_CONTACT_LOCATION, 'Kolkata, India'),
    responseWindow: 'Within 1–2 business days',
    inquiryEndpoint: cleanEnv(metaEnv.VITE_INQUIRY_API_ENDPOINT, '/api/contact') || '/api/contact',
    healthEndpoint: cleanEnv(metaEnv.VITE_HEALTH_API_ENDPOINT, '/api/health') || '/api/health',
  },
  socials: {
    linkedin: cleanEnv(
      metaEnv.VITE_SOCIAL_LINKEDIN,
      'https://www.linkedin.com/in/abhijit-roy-7b27a242b/'
    ),
    instagram: cleanEnv(
      metaEnv.VITE_SOCIAL_INSTAGRAM,
      'https://www.instagram.com/the.growthpilot.agency/'
    ),
    facebook: cleanEnv(metaEnv.VITE_SOCIAL_FACEBOOK, null),
  },
};

