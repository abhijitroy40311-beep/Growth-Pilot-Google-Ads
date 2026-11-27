import { siteConfig } from '../data/siteConfig';

/**
 * Normalizes a route path into a clean canonical URL without trailing slashes
 * (except for root "/") or query/hash fragments.
 */
export function buildCanonicalUrl(path: string, origin: string = siteConfig.domain): string {
  const cleanOrigin = (origin || siteConfig.domain).replace(/\/+$/, '');
  const rawPath = (path || '/').split('?')[0].split('#')[0].trim();
  if (!rawPath || rawPath === '/') {
    return `${cleanOrigin}/`;
  }
  const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');
  return `${cleanOrigin}${withoutTrailingSlash || '/'}`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
  origin: string = siteConfig.domain
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path, origin),
    })),
  };
}

export function buildOrganizationAndWebSiteSchema(
  origin: string = siteConfig.domain
): Record<string, unknown> {
  const baseUrl = buildCanonicalUrl('/', origin).replace(/\/$/, '');
  const sameAs = [
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
    siteConfig.socials.facebook,
  ].filter(Boolean) as string[];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${baseUrl}/#service`,
        name: siteConfig.brandName,
        slogan: siteConfig.tagline,
        description:
          'Independent Google Ads management, PPC campaign optimization, conversion-focused landing pages, and GA4/GTM conversion tracking for international service businesses.',
        url: `${baseUrl}/`,
        logo: `${baseUrl}${siteConfig.assets.fullOriginalPng}`,
        image: `${baseUrl}${siteConfig.assets.fullOriginalPng}`,
        ...(siteConfig.contact.email ? { email: `mailto:${siteConfig.contact.email}` } : {}),
        ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
        founder: {
          '@id': `${baseUrl}/#founder`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'IN',
        },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Ireland' },
          { '@type': 'Country', name: 'New Zealand' },
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
        knowsAbout: [
          'Google Ads Management for Service Businesses',
          'Google Search Ads & PPC Campaign Optimization',
          'Google Ads for HVAC Companies',
          'Google Ads for Solar Installation Companies',
          'Google Ads for Dental Implant Clinics',
          'Google Ads for Epoxy Flooring Contractors',
          'Google Ads for Roofing and Plumbing Businesses',
          'Google Analytics 4 & Google Tag Manager Conversion Tracking',
          'Landing Page Conversion Rate Optimization',
        ],
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#founder`,
        name: 'Abhijit Roy',
        jobTitle: 'Google Ads Specialist',
        worksFor: {
          '@id': `${baseUrl}/#service`,
        },
        ...(siteConfig.socials.linkedin ? { sameAs: [siteConfig.socials.linkedin] } : {}),
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Google Analytics Certification',
          credentialCategory: 'certification',
          identifier: '201105118',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Google',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: siteConfig.brandName,
        publisher: {
          '@id': `${baseUrl}/#service`,
        },
      },
    ],
  };
}
