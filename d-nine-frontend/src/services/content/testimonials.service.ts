import { TestimonialItem } from '@/types/testimonial';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { testimonialsForServiceQuery, testimonialsForProjectQuery } from '@/sanity/queries/testimonials.queries';
import { SanityTestimonialDoc } from '@/sanity/types';

export async function getTestimonialsForService(slug: string): Promise<TestimonialItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTestimonialDoc[]>({
      query: testimonialsForServiceQuery,
      params: { slug },
      tags: ['testimonials', `service:${slug}`],
      stega: false,
    });
    return (data || []).map(mapSanityTestimonial);
  }

  // Fallback for static mode if required, else empty
  return [];
}

export async function getTestimonialsForProject(slug: string): Promise<TestimonialItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTestimonialDoc[]>({
      query: testimonialsForProjectQuery,
      params: { slug },
      tags: ['testimonials', `project:${slug}`],
      stega: false,
    });
    return (data || []).map(mapSanityTestimonial);
  }

  // Fallback for static mode if required, else empty
  return [];
}

export function mapSanityTestimonial(doc: SanityTestimonialDoc): TestimonialItem {
  return {
    id: doc._id,
    personName: doc.personName || { ar: '', en: '' },
    role: doc.role || { ar: '', en: '' },
    company: doc.company || { ar: '', en: '' },
    quote: doc.quote || { ar: '', en: '' },
    image: doc.image,
    rating: doc.rating,
    featured: doc.featured,
  };
}
