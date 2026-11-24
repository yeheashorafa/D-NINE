import { vi } from 'vitest';
vi.mock('server-only', () => ({}));
vi.mock('../client', () => ({ client: {}, sanityFetch: vi.fn() }));
import { describe, it, expect } from 'vitest';
import { mapTestimonialsSection } from './section.mapper';
import { mapSanityTestimonial } from '../../services/content/testimonials.service';
import { SanityTestimonialsSection, SanityTestimonialDoc } from '../types';

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

    it('should keep all active testimonials', () => {
      const section: SanityTestimonialsSection = {
        enabled: true,
        selectedTestimonials: [mockTestimonial, { ...mockTestimonial, _id: 't2' }]
      };
      const result = mapTestimonialsSection(section);
      expect(result?.selectedTestimonials).toHaveLength(2);
    });
  });

});
