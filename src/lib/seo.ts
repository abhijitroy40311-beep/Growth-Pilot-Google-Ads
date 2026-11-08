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
): Record<string, unknown>[] {
  const baseUrl = buildCanonicalUrl('/', origin).replace(/\/$/, '');
  const sameAs = [
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
    siteConfig.socials.facebook,
  ].filter(Boolean) as string[];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteConfig.brandName,
      url: `${baseUrl}/`,
      logo: `${baseUrl}${siteConfig.assets.fullOriginalPng}`,
      description:
        'GrowthPilot is a digital growth and Google Ads management agency providing search campaign management, conversion-focused website development, landing page optimization, and GA4/GTM conversion tracking.',
      ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      knowsAbout: [
        'Google Ads Management Services',
        'PPC Campaign Management',
        'Lead Generation Website Design',
        'Landing Page Conversion Rate Optimization',
        'Google Analytics 4 & Google Tag Manager Setup',
        'Dental Implant Google Ads & Lead Generation',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: siteConfig.brandName,
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
    },
  ];
}
