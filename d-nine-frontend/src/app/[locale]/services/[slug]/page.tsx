import React from 'react';
import { ServiceDetailPage } from '@/features/services/service-detail-page';
import { getServices, getServiceBySlug } from '@/services/content/services.service';
import { routing } from '@/i18n/routing';

import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isArabic = locale === 'ar';
  
  const service = await getServiceBySlug(slug, { stega: false });
  if (!service) {
    return {
      title: isArabic ? 'خدمة غير موجودة | دي ناين' : 'Service Not Found | D-NINE',
    };
  }

  const seoTitle = stegaClean(service.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || `${service.title?.[isArabic ? 'ar' : 'en']} | D-NINE`);
  const seoDesc = stegaClean(service.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || service.shortDescription?.[isArabic ? 'ar' : 'en']);

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: service.seo?.canonicalUrl || `/${locale}/services/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
  };
}

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
