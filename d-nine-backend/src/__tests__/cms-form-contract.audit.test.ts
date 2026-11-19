import { describe, expect, it } from 'vitest';
import {
  CANONICAL_CATEGORY_KEYS,
  contactSubmissionSchema,
  bookCallRequestSchema,
} from '@d-nine/contracts';

const baseContact = {
  fullName: 'Audit Visitor',
  email: 'visitor@example.com',
  message: 'Please send me more information about your services.',
  locale: 'en' as const,
};

describe('Public CMS category slugs must be accepted by the API', () => {
  for (const serviceSlug of CANONICAL_CATEGORY_KEYS) {
    it(`accepts contact serviceSlug ${serviceSlug}`, () => {
      const parsed = contactSubmissionSchema.safeParse({ ...baseContact, serviceSlug });
      expect(parsed.success, JSON.stringify(parsed.error?.issues ?? [])).toBe(true);
    });

    it(`accepts book-call serviceSlug ${serviceSlug}`, () => {
      const parsed = bookCallRequestSchema.safeParse({
        ...baseContact,
        serviceSlug,
        preferredDate: '2026-12-01',
        preferredTime: '10:00',
        timezone: 'Asia/Riyadh',
      });
      expect(parsed.success, JSON.stringify(parsed.error?.issues ?? [])).toBe(true);
    });
  }

  it('rejects an arbitrary unconfigured service category', () => {
    expect(
      contactSubmissionSchema.safeParse({
        ...baseContact,
        serviceSlug: 'unknown-service',
      }).success
    ).toBe(false);
  });
});
