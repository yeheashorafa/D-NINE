import { ContentCategory } from '@/types/category';
import { CONTENT_CATEGORIES } from '@/features/taxonomy/data/content-categories.data';

export async function getCategories(): Promise<ContentCategory[]> {
  return CONTENT_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<ContentCategory | null> {
  const category = CONTENT_CATEGORIES.find((c) => c.slug === slug && c.active);
  return category || null;
}
