import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { ServicesPage } from '@/features/services/services-page';
import { getServicesPage } from '@/sanity/services/page.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getServicesPage();

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'خدماتنا | دي ناين' : 'Services | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'استكشف خدمات دي ناين' : 'Explore D-NINE services'));

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `/${locale}/services`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function ServicesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <ServicesPage />;
}
