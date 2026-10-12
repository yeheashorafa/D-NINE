import { ContentCategory } from '@/types/category';
import { CONTENT_CATEGORIES } from '@/features/taxonomy/data/content-categories.data';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { categoriesQuery, categoryBySlugQuery } from '@/sanity/queries/categories.queries';
import { mapSanityCategory } from '@/sanity/mappers/category.mapper';
import { SanityCategoryDoc } from '@/sanity/types';

import { CANONICAL_CATEGORY_KEYS } from '@d-nine/contracts';

export async function getCategories(options: { stega?: boolean } = {}): Promise<ContentCategory[]> {
  const canonicalMap = new Map(CONTENT_CATEGORIES.map((c) => [c.slug, c]));

  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityCategoryDoc[]>({
      query: categoriesQuery,
      tags: ['categories'],
      stega: options.stega,
    });

    const mapped = (data || []).map(mapSanityCategory);

    // Second-layer defensive filter: keep only canonical keys and prevent duplicates
    const sanityBySlug = new Map<string, ContentCategory>();
    for (const item of mapped) {
      if (
        item.active !== false &&
        (CANONICAL_CATEGORY_KEYS as readonly string[]).includes(item.slug) &&
        !sanityBySlug.has(item.slug)
      ) {
        sanityBySlug.set(item.slug, item);
      }
    }

    // Build exactly the 8 canonical categories in canonical order 1–8.
    // If any single category is missing in Sanity, inject safe fallback for that category without repeating others.
    const result: ContentCategory[] = [];
    for (let i = 0; i < CANONICAL_CATEGORY_KEYS.length; i++) {
      const key = CANONICAL_CATEGORY_KEYS[i];
      const sanityCat = sanityBySlug.get(key);
      if (sanityCat) {
        result.push({
          ...sanityCat,
          order: i + 1,
        });
      } else {
        const fallbackCat = canonicalMap.get(key);
        if (fallbackCat) {
          result.push({
            ...fallbackCat,
            order: i + 1,
          });
        }
      }
    }

    if (result.length > 0) {
      return result;
    }
  }

  // Deterministic fallback to the 8 canonical categories in order 1–8
  return CANONICAL_CATEGORY_KEYS.map((key, idx) => {
    const cat = canonicalMap.get(key)!;
    return {
      ...cat,
      order: idx + 1,
    };
  });
}

export async function getCategoryBySlug(slug: string): Promise<ContentCategory | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityCategoryDoc | null>({
      query: categoryBySlugQuery,
      params: { slug },
      tags: ['categories', `category:${slug}`],
    });
    if (data) {
      return mapSanityCategory(data);
    }
  }

  const category = CONTENT_CATEGORIES.find((c) => c.slug === slug && c.active);
  return category || null;
}
