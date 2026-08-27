import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { HomePage } from '@/features/home/home-page';
import { getHomePage } from '@/sanity/services/page.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getHomePage();

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'الرئيسية | دي ناين' : 'Home | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'وكالة دي ناين للإنتاج الإعلامي' : 'D-NINE Creative Agency'));

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `/${locale}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <HomePage />;
}
