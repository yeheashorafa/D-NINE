import { ContentCategory } from '@/types/category';
import { SanityCategoryDoc } from '../types';

export function mapSanityCategory(doc: SanityCategoryDoc): ContentCategory {
  return {
    id: doc._id || doc.id || `cat-${doc.slug}`,
    slug: doc.slug,
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    description: doc.description
      ? {
          ar: doc.description.ar || '',
          en: doc.description.en || '',
        }
      : undefined,
    order: doc.order ?? 0,
    active: doc.active ?? true,
  };
}
