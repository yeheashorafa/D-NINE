import { ServiceItem, ServiceOffering } from '@/types/service';
import { SanityServiceDoc, SanityServiceOfferingDoc } from '../types';

export function mapSanityService(doc: SanityServiceDoc): ServiceItem {
  return {
    id: doc._id || doc.id || `srv-${doc.slug}`,
    slug: doc.slug,
    categorySlug: doc.categorySlug,
    iconName: doc.iconName || 'Sparkles',
    image: doc.image || `/media/services/${doc.slug}.jpg`,
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    shortDescription: {
      ar: doc.shortDescription?.ar || '',
      en: doc.shortDescription?.en || '',
    },
    fullDescription: {
      ar: doc.fullDescription?.ar || '',
      en: doc.fullDescription?.en || '',
    },
    benefits: {
      ar: doc.benefits?.ar || [],
      en: doc.benefits?.en || [],
    },
    deliverables: {
      ar: (doc.deliverables || []).map((d) => ({
        title: d.title?.ar || '',
        description: d.description?.ar || '',
      })),
      en: (doc.deliverables || []).map((d) => ({
        title: d.title?.en || '',
        description: d.description?.en || '',
      })),
    },
    processSteps: {
      ar: (doc.processSteps || []).map((p) => ({
        stepNumber: p.stepNumber,
        title: p.title?.ar || '',
        description: p.description?.ar || '',
      })),
      en: (doc.processSteps || []).map((p) => ({
        stepNumber: p.stepNumber,
        title: p.title?.en || '',
        description: p.description?.en || '',
      })),
    },
    faqs: {
      ar: (doc.faqs || []).map((f) => ({
        question: f.question?.ar || '',
        answer: f.answer?.ar || '',
      })),
      en: (doc.faqs || []).map((f) => ({
        question: f.question?.en || '',
        answer: f.answer?.en || '',
      })),
    },
    featured: doc.featured ?? true,
    seo: doc.seo,
  };
}

export function mapSanityServiceOffering(doc: SanityServiceOfferingDoc): ServiceOffering {
  return {
    id: doc._id || doc.id || `off-${doc.slug}`,
    slug: doc.slug,
    parentServiceSlug: doc.parentServiceSlug,
    categorySlug: doc.categorySlug,
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    description: {
      ar: doc.description?.ar || '',
      en: doc.description?.en || '',
    },
    image: doc.image || `/media/services/${doc.parentServiceSlug}.jpg`,
    featured: doc.featured ?? false,
  };
}
