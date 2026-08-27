import { ContentCategory } from '@/types/category';
import { CONTENT_CATEGORIES } from '@/features/taxonomy/data/content-categories.data';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { categoriesQuery, categoryBySlugQuery } from '@/sanity/queries/categories.queries';
import { mapSanityCategory } from '@/sanity/mappers/category.mapper';
import { SanityCategoryDoc } from '@/sanity/types';

export async function getCategories(options: { stega?: boolean } = {}): Promise<ContentCategory[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityCategoryDoc[]>({
      query: categoriesQuery,
      tags: ['categories'],
      stega: options.stega,
    });
    return (data || []).map(mapSanityCategory);
  }

  return CONTENT_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<ContentCategory | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityCategoryDoc | null>({
      query: categoryBySlugQuery,
      params: { slug },
      tags: ['categories', `category:${slug}`],
    });
    return data ? mapSanityCategory(data) : null;
  }

  const category = CONTENT_CATEGORIES.find((c) => c.slug === slug && c.active);
  return category || null;
}
