import { sanityFetch } from '../client';
import { contentSource } from '../env';
import { sectorBySlugQuery, sectorsQuery } from '../queries/sector.queries';
import { DEFAULT_SECTORS, type SectorContent, type SectorSlug } from '@/features/sectors/sector-content';

function normalizeSector(value: Partial<SectorContent>): SectorContent | null {
  const fallback = DEFAULT_SECTORS.find((item) => item.slug === value.slug);
  if (!fallback) return null;
  return {
    ...fallback,
    ...value,
    title: value.title || fallback.title,
    introduction: value.introduction || fallback.introduction,
    serviceGroups: value.serviceGroups?.length ? value.serviceGroups : fallback.serviceGroups,
    packages: value.packages || fallback.packages,
    relatedCategorySlugs: value.relatedCategorySlugs?.length ? value.relatedCategorySlugs : fallback.relatedCategorySlugs,
  };
}

export async function getSectors(options: { stega?: boolean } = {}): Promise<SectorContent[]> {
  if (contentSource !== 'sanity') return DEFAULT_SECTORS;
  const data = await sanityFetch<Partial<SectorContent>[]>({ query: sectorsQuery, tags: ['sectorPage', 'sectors'], stega: options.stega });
  const normalized = (data || []).map(normalizeSector).filter((item): item is SectorContent => Boolean(item));
  return normalized.length ? normalized : DEFAULT_SECTORS;
}

export async function getSector(slug: SectorSlug, options: { stega?: boolean } = {}): Promise<SectorContent | null> {
  if (contentSource !== 'sanity') return DEFAULT_SECTORS.find((item) => item.slug === slug) || null;
  const data = await sanityFetch<Partial<SectorContent> | null>({ query: sectorBySlugQuery, params: { slug }, tags: [`sector:${slug}`, 'sectorPage'], stega: options.stega });
  return normalizeSector(data || { slug });
}

export function isSectorSlug(value: string): value is SectorSlug {
  return DEFAULT_SECTORS.some((item) => item.slug === value);
}
