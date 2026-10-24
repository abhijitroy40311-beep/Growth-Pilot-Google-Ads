
import { useEffect, useLayoutEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { cancelActiveSmoothScroll } from '../lib/scrollLogic';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path?: string;
}

/**
 * Create a meta tag if it does not exist, then update its content.
 */
function setMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string
): void {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

/**
 * Build an absolute canonical URL using the configured production domain.
 */
function getCanonicalUrl(path: string): string {
  let origin: string;

  try {
    origin = new URL(siteConfig.domain).origin;
  } catch {
    origin = window.location.origin;

    console.error(
      'SEO: siteConfig.domain must be a valid absolute URL, including https://.'
    );
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(normalizedPath, `${origin}/`);

  // Canonical URLs should not contain tracking parameters or fragments.
  url.search = '';
  url.hash = '';

  return url.href;
}

function setCanonicalUrl(href: string): void {
  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

export function useDocumentMeta({
  title,
  description,
  path = '/',
}: DocumentMetaOptions): void {
  useLayoutEffect(() => {
    cancelActiveSmoothScroll();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [path]);

  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(path);

    // Search engine metadata
    document.title = title;
    setMetaTag('name', 'description', description);

    // Social sharing metadata
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);

    // Preferred URL for this page
    setCanonicalUrl(canonicalUrl);
  }, [title, description, path]);
}
