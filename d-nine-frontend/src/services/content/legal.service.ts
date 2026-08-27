import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';

export interface LegalPageData {
  title: { ar: string; en: string };
  lastUpdated: string;
  body: { ar: any; en: any }; // PortableText blocks
}

const legalQuery = (type: string) => `*[_type == "${type}"][0]{
  title,
  lastUpdated,
  body
}`;

export async function getLegalPageData(type: 'privacy' | 'terms'): Promise<LegalPageData | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: legalQuery(type),
      tags: [type],
    });

    if (data) {
      return {
        title: { ar: data.title?.ar || '', en: data.title?.en || '' },
        lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
        body: { ar: data.body?.ar || [], en: data.body?.en || [] },
      };
    }
  }

  return null;
}
