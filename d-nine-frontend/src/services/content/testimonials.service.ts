import { TestimonialItem } from '@/types/testimonial';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { testimonialsForServiceQuery, testimonialsForProjectQuery } from '@/sanity/queries/testimonials.queries';
import { SanityTestimonialDoc } from '@/sanity/types';

import { STATIC_TESTIMONIALS } from '@/features/home/data/testimonials.data';

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTestimonialDoc[]>({
      query: `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(rating desc, _createdAt desc)`,
      tags: ['testimonials'],
    });
    return (data || []).map(mapSanityTestimonial);
  }
  return STATIC_TESTIMONIALS;
}

export async function getTestimonialsForService(slug: string): Promise<TestimonialItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTestimonialDoc[]>({
      query: testimonialsForServiceQuery,
      params: { slug },
      tags: ['testimonials', `service:${slug}`],
    });
    return (data || []).map(mapSanityTestimonial);
  }

  // Fallback for static mode if required, else empty
  return STATIC_TESTIMONIALS;
}

export async function getTestimonialsForProject(slug: string): Promise<TestimonialItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTestimonialDoc[]>({
      query: testimonialsForProjectQuery,
      params: { slug },
      tags: ['testimonials', `project:${slug}`],
    });
    return (data || []).map(mapSanityTestimonial);
  }

  // Fallback for static mode if required, else empty
  return STATIC_TESTIMONIALS;
}

export function mapSanityTestimonial(doc: SanityTestimonialDoc): TestimonialItem {
  return {
    id: doc._id,
    personName: doc.personName || { ar: '', en: '' },
    role: doc.role || { ar: '', en: '' },
    company: doc.company || { ar: '', en: '' },
    quote: doc.quote || { ar: '', en: '' },
    image: doc.image,
    imageAlt: doc.imageAlt,
    rating: doc.rating,
    featured: doc.featured,
  };
}
