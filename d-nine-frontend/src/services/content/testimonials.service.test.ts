import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTestimonials, getTestimonialsForService, getTestimonialsForProject } from './testimonials.service';
import { STATIC_TESTIMONIALS } from '@/features/home/data/testimonials.data';
import * as envModule from '@/sanity/env';

// Mock env module to control contentSource
vi.mock('@/sanity/env', () => ({
  contentSource: 'static',
  assertSanityConfig: vi.fn(),
}));

describe('testimonials.service in static mode', () => {
  beforeEach(() => {
    // @ts-expect-error - overriding readonly for testing
    envModule.contentSource = 'static';
  });

  it('getTestimonials should return STATIC_TESTIMONIALS', async () => {
    const result = await getTestimonials();
    expect(result).toEqual(STATIC_TESTIMONIALS);
  });

  it('getTestimonialsForService should return STATIC_TESTIMONIALS', async () => {
    const result = await getTestimonialsForService('some-service');
    expect(result).toEqual(STATIC_TESTIMONIALS);
  });

  it('getTestimonialsForProject should return STATIC_TESTIMONIALS', async () => {
    const result = await getTestimonialsForProject('some-project');
    expect(result).toEqual(STATIC_TESTIMONIALS);
  });
});
