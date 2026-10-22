import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

interface DocumentMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export function useDocumentMeta({ title, description, path = '/' }: DocumentMetaOptions) {
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
