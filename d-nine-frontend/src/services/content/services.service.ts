import { ServiceItem, ServiceOffering } from '@/types/service';
import { PRIMARY_SERVICES } from '@/features/services/data/services.data';
import { SERVICE_OFFERINGS } from '@/features/services/data/service-offerings.data';
import { ContentPage, ContentQueryParams } from './content-page.types';

export async function getServices(): Promise<ServiceItem[]> {
  return PRIMARY_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const service = PRIMARY_SERVICES.find((s) => s.slug === slug);
  return service || null;
}

export async function getAllServiceSlugs(): Promise<string[]> {
  return PRIMARY_SERVICES.map((s) => s.slug);
}

export async function getServiceOfferings(
  params: ContentQueryParams = {}
): Promise<ContentPage<ServiceOffering>> {
  const { categorySlug, limit = 6, cursor } = params;

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
  return SERVICE_OFFERINGS;
}
