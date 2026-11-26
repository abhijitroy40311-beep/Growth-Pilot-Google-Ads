import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { buildCanonicalUrl } from '../lib/seo';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function useDocumentMeta({
  title,
  description,
  path = '/',
  noindex = false,
  structuredData,
}: DocumentMetaOptions) {
  useEffect(() => {
    document.title = title;

    const isLocalhost =
      typeof window !== 'undefined' &&
      /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    const origin = isLocalhost ? window.location.origin : siteConfig.domain;
    const canonicalHref = buildCanonicalUrl(path, origin);

    const setMetaContent = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaContent('meta[name="description"]', 'name', 'description', description);
    setMetaContent(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow'
    );
    setMetaContent('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaContent('meta[property="og:url"]', 'property', 'og:url', canonicalHref);
    setMetaContent('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaContent('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    const scriptId = 'gp-route-jsonld';
    let ldScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id = scriptId;
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(structuredData);
    } else if (ldScript) {
      ldScript.remove();
    }
  }, [title, description, path, noindex, structuredData]);
}


