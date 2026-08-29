import type { SanityTestimonialsSection, SanityTeamSection } from '../types';
import { mapSanityTestimonial } from '../../services/content/testimonials.service';
import { mapSanityTeamMember } from '../../services/content/team.service';

export function mapTestimonialsSection(section?: SanityTestimonialsSection) {
  if (!section) return undefined;
  if (section.enabled === false) return undefined;

  const maxItems = section.maxItems || 6;
  const rawTestimonials = section.selectedTestimonials || [];
  const validTestimonials = rawTestimonials
    .filter((t): t is NonNullable<typeof t> => !!t && t.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
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
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, maxItems)
    .map(mapSanityTeamMember);

  if (validMembers.length === 0) return undefined;

  return {
    ...section,
    selectedTeamMembers: validMembers,
  };
}
