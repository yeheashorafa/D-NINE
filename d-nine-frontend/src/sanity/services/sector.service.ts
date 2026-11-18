import { sanityFetch } from '../client';
import { contentSource } from '../env';
import { sectorPageBySlugQuery } from '../queries/sector.queries';
import { SECTORS, type SectorContent, type SectorSlug } from '@/features/client-revision/client-content';
import type { SanityLocalizedString, SanitySeo } from '../types';

export interface SectorPageData extends SectorContent {
  imageAlt?: SanityLocalizedString;
  contactTitle?: SanityLocalizedString;
  seo?: SanitySeo;
}

type SanitySectorPage = Partial<SectorPageData> & { slug?: string };

export async function getSectorPage(slug: string, options: { stega?: boolean } = {}): Promise<SectorPageData | null> {
  const fallback = SECTORS.find((sector) => sector.slug === slug);
  if (!fallback) return null;

  if (contentSource !== 'sanity') return fallback;

  const data = await sanityFetch<SanitySectorPage | null>({
    query: sectorPageBySlugQuery,
    params: { slug },
    tags: ['sector-pages', `sector:${slug}`],
    stega: options.stega,
  });

  if (!data) return fallback;
  return {
    ...fallback,
    ...data,
    slug: fallback.slug,
    title: data.title || fallback.title,
    intro: data.intro || fallback.intro,
    services: data.services?.length ? data.services : fallback.services,
    packages: data.packages?.length ? data.packages : fallback.packages,
    relatedCategorySlugs: data.relatedCategorySlugs?.length ? data.relatedCategorySlugs : fallback.relatedCategorySlugs,
    image: data.image || fallback.image,
  };
}

export function isSectorSlug(slug: string): slug is SectorSlug {
  return SECTORS.some((sector) => sector.slug === slug);
}
