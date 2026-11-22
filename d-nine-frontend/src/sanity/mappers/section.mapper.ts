import type { SanityTestimonialsSection, SanityPartnerDoc } from '../types';
import { mapSanityTestimonial } from '../../services/content/testimonials.service';
import { PartnerItem } from '@/types/partner';

export function mapSanityPartner(doc: SanityPartnerDoc): PartnerItem {
  const arName = doc.name?.ar || '';
  const enName = doc.name?.en || arName;
  return {
    id: doc._id || doc.id || 'partner',
    name: {
      ar: arName,
      en: enName,
    },
    logo: doc.logo || '',
    logoAlt: doc.logoAlt
      ? {
          ar: doc.logoAlt.ar || arName,
          en: doc.logoAlt.en || enName,
        }
      : undefined,
    url: doc.url,
    order: doc.order ?? 0,
    active: doc.active ?? true,
  };
}
export function mapPartnersList(partners?: SanityPartnerDoc[]): PartnerItem[] {
  if (!partners || partners.length === 0) return [];
  return partners
    .filter((p) => p && p.logo && (p.name?.ar || p.name?.en))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(mapSanityPartner);
}

export function mapTestimonialsSection(section?: SanityTestimonialsSection) {
  if (!section) return undefined;
  if (section.enabled === false) return undefined;

  const rawTestimonials = section.selectedTestimonials || [];
  const validTestimonials = rawTestimonials
    .filter((t): t is NonNullable<typeof t> => !!t && t.active !== false)
    .map(mapSanityTestimonial);

  if (validTestimonials.length === 0) return undefined;

  return {
    ...section,
    selectedTestimonials: validTestimonials,
  };
}
