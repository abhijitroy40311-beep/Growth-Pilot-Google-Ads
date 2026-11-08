import { useEffect, useLayoutEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { cancelActiveSmoothScroll } from '../lib/scrollLogic';
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
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      cancelActiveSmoothScroll();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [path]);

  useEffect(() => {
    document.title = title;

    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : siteConfig.domain;
    const canonicalHref = buildCanonicalUrl(path, origin);

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalHref);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalHref);
    }

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


