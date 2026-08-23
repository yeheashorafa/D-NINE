import { ProjectItem } from '@/types/project';
import { SanityProjectDoc } from '../types';

export function mapSanityProject(doc: SanityProjectDoc): ProjectItem {
  return {
    id: doc._id || doc.id || `prj-${doc.slug}`,
    slug: doc.slug,
    primaryCategorySlug: doc.primaryCategorySlug,
    categorySlugs: doc.categorySlugs || [doc.primaryCategorySlug],
    serviceSlug: doc.serviceSlug || doc.primaryCategorySlug,
    image: doc.image || `/media/work/${doc.slug}.jpg`,
    coverImage: doc.coverImage || `/media/work/${doc.slug}.jpg`,
    thumbnail: doc.thumbnail || `/media/work/${doc.slug}.jpg`,
    category: {
      ar: doc.category?.ar || '',
      en: doc.category?.en || '',
    },
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    clientName: {
      ar: doc.clientName?.ar || '',
      en: doc.clientName?.en || '',
    },
    year: doc.year || '2025',
    summary: {
      ar: doc.summary?.ar || '',
      en: doc.summary?.en || '',
    },
    challenge: {
      ar: doc.challenge?.ar || '',
      en: doc.challenge?.en || '',
    },
    strategy: {
      ar: doc.strategy?.ar || '',
      en: doc.strategy?.en || '',
    },
    solution: {
      ar: doc.solution?.ar || '',
      en: doc.solution?.en || '',
    },
    deliverables: {
      ar: doc.deliverables?.ar || [],
      en: doc.deliverables?.en || [],
    },
    metrics: (doc.metrics || []).map((m) => ({
      label: {
        ar: m.label?.ar || '',
        en: m.label?.en || '',
      },
      value: m.value,
    })),
    media: (doc.media || []).map((m) => ({
      type: m.type,
      src: m.src || `/media/work/${doc.slug}.jpg`,
      poster: m.poster,
      alt: {
        ar: m.alt?.ar || '',
        en: m.alt?.en || '',
      },
      caption: m.caption
        ? {
            ar: m.caption.ar || '',
            en: m.caption.en || '',
          }
        : undefined,
      aspectRatio: m.aspectRatio || '16:9',
    })),
    credits: doc.credits
      ? {
          ar: doc.credits.ar || '',
          en: doc.credits.en || '',
        }
      : undefined,
    featured: doc.featured ?? false,
    colorVariant: (doc.colorVariant as 'purple' | 'cyan' | 'amber') || 'purple',
  };
}
