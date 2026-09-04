import { vi } from 'vitest';
vi.mock('server-only', () => ({}));
vi.mock('../client', () => ({ client: {}, sanityFetch: vi.fn() }));
import { describe, it, expect } from 'vitest';
import { mapTestimonialsSection, mapTeamSection } from './section.mapper';
import { mapSanityTestimonial } from '../../services/content/testimonials.service';
import { mapSanityTeamMember } from '../../services/content/team.service';
import { SanityTestimonialsSection, SanityTeamSection, SanityTestimonialDoc, SanityTeamMemberDoc } from '../types';

describe('section.mapper', () => {
  describe('Testimonials Mapping', () => {
    const mockTestimonial: SanityTestimonialDoc = {
      _id: 't1',
      personName: { en: 'John Doe', ar: 'جون دو' },
      role: { en: 'CEO', ar: 'مدير تنفيذي' },
      company: { en: 'Acme', ar: 'أكمي' },
      quote: { en: 'Great service!', ar: 'خدمة رائعة!' },
      rating: 5,
    };

    it('should map Arabic/English fields correctly (Static/Sanity parity)', () => {
      const mapped = mapSanityTestimonial(mockTestimonial);
      expect(mapped.id).toBe('t1');
      expect(mapped.personName).toEqual({ en: 'John Doe', ar: 'جون دو' });
      expect(mapped.role).toEqual({ en: 'CEO', ar: 'مدير تنفيذي' });
      expect(mapped.company).toEqual({ en: 'Acme', ar: 'أكمي' });
      expect(mapped.quote).toEqual({ en: 'Great service!', ar: 'خدمة رائعة!' });
      expect(mapped.rating).toBe(5);
    });

    it('should return undefined when enabled is false', () => {
      const section: SanityTestimonialsSection = { enabled: false, selectedTestimonials: [mockTestimonial] };
      expect(mapTestimonialsSection(section)).toBeUndefined();
    });

    it('should return undefined when section is empty or no valid testimonials', () => {
      expect(mapTestimonialsSection({ enabled: true, selectedTestimonials: [] })).toBeUndefined();
      expect(mapTestimonialsSection({ enabled: true })).toBeUndefined();
    });

    it('should filter inactive/null items and preserve reference-array order (ignoring document order)', () => {
      const section: SanityTestimonialsSection = {
        enabled: true,
        selectedTestimonials: [
          { ...mockTestimonial, _id: 't3', order: 99 },
          null as unknown as SanityTestimonialDoc, // Simulate missing reference
          { ...mockTestimonial, _id: 't2', active: false }, // Simulate inactive
          { ...mockTestimonial, _id: 't1', order: 1 }
        ]
      };
      const result = mapTestimonialsSection(section);
      expect(result?.selectedTestimonials).toHaveLength(2);
      expect(result?.selectedTestimonials?.[0].id).toBe('t3'); // First valid item
      expect(result?.selectedTestimonials?.[1].id).toBe('t1'); // Second valid item
    });

    it('should respect maxItems', () => {
      const section: SanityTestimonialsSection = {
        enabled: true,
        maxItems: 1,
        selectedTestimonials: [mockTestimonial, { ...mockTestimonial, _id: 't2' }]
      };
      const result = mapTestimonialsSection(section);
      expect(result?.selectedTestimonials).toHaveLength(1);
    });
  });

  describe('Team Mapping', () => {
    const mockMember: SanityTeamMemberDoc = {
      _id: 'm1',
      name: { en: 'Jane Doe', ar: 'جين دو' },
      role: { en: 'Designer', ar: 'مصممة' },
    };

    it('should map Arabic/English fields correctly', () => {
      const mapped = mapSanityTeamMember(mockMember);
      expect(mapped.id).toBe('m1');
      expect(mapped.name).toEqual({ en: 'Jane Doe', ar: 'جين دو' });
      expect(mapped.role).toEqual({ en: 'Designer', ar: 'مصممة' });
    });

    it('should return undefined when enabled is false', () => {
      const section: SanityTeamSection = { enabled: false, selectedTeamMembers: [mockMember] };
      expect(mapTeamSection(section)).toBeUndefined();
    });

    it('should return undefined when section is empty', () => {
      expect(mapTeamSection({ enabled: true })).toBeUndefined();
    });

    it('should filter invalid/inactive items and preserve reference-array order (ignoring document order)', () => {
      const section: SanityTeamSection = {
        enabled: true,
        selectedTeamMembers: [
          { ...mockMember, _id: 'm3', order: 99 },
          undefined as unknown as SanityTeamMemberDoc,
          { ...mockMember, _id: 'm2', active: false },
          { ...mockMember, _id: 'm1', order: 1 }
        ]
      };
      const result = mapTeamSection(section);
      expect(result?.selectedTeamMembers).toHaveLength(2);
      expect(result?.selectedTeamMembers?.[0].id).toBe('m3'); // First valid item
      expect(result?.selectedTeamMembers?.[1].id).toBe('m1'); // Second valid item
    });

    it('should respect maxItems', () => {
      const section: SanityTeamSection = {
        enabled: true,
        maxItems: 1,
        selectedTeamMembers: [mockMember, { ...mockMember, _id: 'm2' }]
      };
      const result = mapTeamSection(section);
      expect(result?.selectedTeamMembers).toHaveLength(1);
    });
  });
});
