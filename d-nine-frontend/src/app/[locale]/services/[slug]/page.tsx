import React from 'react';
import { ServiceDetailPage } from '@/features/services/service-detail-page';
import { getServices } from '@/services/content/services.service';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const services = await getServices();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }

  return params;
}

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  return <ServiceDetailPage slug={slug} />;
}
