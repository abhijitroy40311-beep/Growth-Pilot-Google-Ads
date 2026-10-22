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

export const siteConfig: SiteConfig = {
  brandName: 'GrowthPilot',
  tagline: 'Navigate Growth With Intelligence.',
  shortDescription:
    'Websites, performance marketing, and intelligent digital experiences designed to turn attention into meaningful enquiries and business opportunities.',
  domain: 'https://growthpilot.agency',
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
    serviceId: cleanEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID, 'service_1g1fike') || 'service_1g1fike',
    templateId: cleanEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 'template_a1gp7od') || 'template_a1gp7od',
    publicKey: cleanEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY, 'J6Z6BqADTVbe_oGTY') || 'J6Z6BqADTVbe_oGTY',
    privateKey: cleanEnv(import.meta.env.VITE_EMAILJS_PRIVATE_KEY, 'DI2V29MD3yRrzMUHrnOQZ') || 'DI2V29MD3yRrzMUHrnOQZ',
  },
  contact: {
    // Verified channels configured via .env
    email: cleanEnv(import.meta.env.VITE_CONTACT_EMAIL, 'abhijitroy40311@gmail.com'),
    phone: cleanEnv(import.meta.env.VITE_CONTACT_PHONE, '8777202487'),
    whatsapp:
      cleanEnv(import.meta.env.VITE_WHATSAPP_NUMBER) ||
      cleanEnv(import.meta.env.VITE_CONTACT_PHONE, '8777202487'),
    whatsappMessage:
      "Hi GrowthPilot team! I'd like to discuss a project and learn how we can work together.",
    location: cleanEnv(import.meta.env.VITE_CONTACT_LOCATION, 'Kolkata, India'),
    responseWindow: 'Within 1–2 business days',
    inquiryEndpoint: '/api/contact',
  },
  socials: {
    linkedin: cleanEnv(
      import.meta.env.VITE_SOCIAL_LINKEDIN,
      'https://www.linkedin.com/in/abhijit-roy-7b27a242b/'
    ),
    instagram: cleanEnv(
      import.meta.env.VITE_SOCIAL_INSTAGRAM,
      'https://www.instagram.com/the.growthpilot.agency/'
    ),
    facebook: cleanEnv(import.meta.env.VITE_SOCIAL_FACEBOOK, null),
  },
};
