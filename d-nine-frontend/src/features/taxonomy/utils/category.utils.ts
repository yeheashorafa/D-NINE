import { ContentCategory } from '@/types/category';
import { LocalizedText } from '@/types/localized';

export function getCategoryTitle(
  category: ContentCategory | undefined | null,
  locale: string
): string {
  if (!category) return '';
  return locale === 'ar' ? category.title.ar : category.title.en;
}

export function formatCategoryLabel(label: LocalizedText, locale: string): string {
  return locale === 'ar' ? label.ar : label.en;
}
