import type { SanityTestimonialsSection, SanityTeamSection, SanityPartnerDoc } from '../types';
import { mapSanityTestimonial } from '../../services/content/testimonials.service';
import { mapSanityTeamMember } from '../../services/content/team.service';
import { PartnerItem } from '@/types/partner';

export function mapSanityPartner(doc: SanityPartnerDoc): PartnerItem {
  return {
    id: doc._id || doc.id || 'partner',
    name: {
      ar: doc.name?.ar || '',
      en: doc.name?.en || '',
    },
    logo: doc.logo || '',
    logoAlt: doc.logoAlt
      ? {
          ar: doc.logoAlt.ar || '',
          en: doc.logoAlt.en || '',
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

  const maxItems = section.maxItems || 6;
  const rawTestimonials = section.selectedTestimonials || [];
  const validTestimonials = rawTestimonials
    .filter((t): t is NonNullable<typeof t> => !!t && t.active !== false)
    .slice(0, maxItems)
    .map(mapSanityTestimonial);

  if (validTestimonials.length === 0) return undefined;

  return {
    ...section,
    selectedTestimonials: validTestimonials,
  };
}

export function mapTeamSection(section?: SanityTeamSection) {
  if (!section) return undefined;
  if (section.enabled === false) return undefined;

  const maxItems = section.maxItems || 8;
  const rawMembers = section.selectedTeamMembers || [];
  const validMembers = rawMembers
    .filter((m): m is NonNullable<typeof m> => !!m && m.active !== false)
    .slice(0, maxItems)
    .map(mapSanityTeamMember);

  if (validMembers.length === 0) return undefined;

  return {
    ...section,
    selectedTeamMembers: validMembers,
  };
}
