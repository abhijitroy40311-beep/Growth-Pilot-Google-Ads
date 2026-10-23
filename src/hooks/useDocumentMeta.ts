import { useEffect, useLayoutEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { cancelActiveSmoothScroll } from '../lib/scrollLogic';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export function useDocumentMeta({ title, description, path = '/' }: DocumentMetaOptions) {
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

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : siteConfig.domain;
      canonical.setAttribute('href', `${origin}${path}`);
    }
  }, [title, description, path]);
}

