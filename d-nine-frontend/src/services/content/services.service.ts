import { ServiceItem, ServiceOffering } from '@/types/service';
import { PRIMARY_SERVICES } from '@/features/services/data/services.data';
import { SERVICE_OFFERINGS } from '@/features/services/data/service-offerings.data';
import { ContentPage, ContentQueryParams } from './content-page.types';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import {
  servicesQuery,
  serviceBySlugQuery,
  allServiceSlugsQuery,
  serviceOfferingsQuery,
  countServiceOfferingsQuery,
  allServiceOfferingsQuery,
} from '@/sanity/queries/services.queries';
import { mapSanityService, mapSanityServiceOffering } from '@/sanity/mappers/service.mapper';
import { SanityServiceDoc, SanityServiceOfferingDoc } from '@/sanity/types';

export async function getServices(): Promise<ServiceItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityServiceDoc[]>({
      query: servicesQuery,
      tags: ['services'],
    });
    return (data || []).map(mapSanityService);
  }

  return PRIMARY_SERVICES;
}

export async function getServiceBySlug(slug: string, options: { stega?: boolean } = {}): Promise<ServiceItem | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityServiceDoc | null>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: ['services', `service:${slug}`],
      stega: options.stega,
    });
    return data ? mapSanityService(data) : null;
  }

  const service = PRIMARY_SERVICES.find((s) => s.slug === slug);
  return service || null;
}

export async function getAllServiceSlugs(): Promise<string[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<string[]>({
      query: allServiceSlugsQuery,
      tags: ['services'],
      stega: false,
    });
    return data || [];
  }

  return PRIMARY_SERVICES.map((s) => s.slug);
}

export async function getServiceOfferings(
  params: ContentQueryParams = {}
): Promise<ContentPage<ServiceOffering>> {
  const { categorySlug, limit = 6, cursor } = params;

  if (contentSource === 'sanity') {
    assertSanityConfig();
    const offset = cursor ? parseInt(cursor, 10) : 0;
    const end = offset + limit;

    const [itemsData, total] = await Promise.all([
      sanityFetch<SanityServiceOfferingDoc[]>({
        query: serviceOfferingsQuery,
        params: {
          categorySlug: categorySlug || 'all',
          offset,
          end,
        },
        tags: ['service-offerings'],
      }),
      sanityFetch<number>({
        query: countServiceOfferingsQuery,
        params: {
          categorySlug: categorySlug || 'all',
        },
        tags: ['service-offerings'],
      }),
    ]);

    const items = (itemsData || []).map(mapSanityServiceOffering);
    const hasMore = offset + limit < total;

    return {
      items,
      nextCursor: hasMore ? (offset + limit).toString() : null,
      hasMore,
      total,
    };
  }

  let items = SERVICE_OFFERINGS;

  if (categorySlug && categorySlug !== 'all') {
    items = items.filter(
      (off) => off.categorySlug === categorySlug || off.parentServiceSlug === categorySlug
    );
  }

  const offset = cursor ? parseInt(cursor, 10) : 0;
  const sliced = items.slice(offset, offset + limit);
  const nextOffset = offset + limit;
  const hasMore = nextOffset < items.length;

  return {
    items: sliced,
    nextCursor: hasMore ? nextOffset.toString() : null,
    hasMore,
    total: items.length,
  };
}

export async function getAllServiceOfferings(): Promise<ServiceOffering[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityServiceOfferingDoc[]>({
      query: allServiceOfferingsQuery,
      tags: ['service-offerings'],
    });
    return (data || []).map(mapSanityServiceOffering);
  }

  return SERVICE_OFFERINGS;
}
