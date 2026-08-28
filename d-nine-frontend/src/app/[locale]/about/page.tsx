import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { AboutPage } from '@/features/about/about-page';
import { getAboutPage } from '@/sanity/services/page.service';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getAboutPage({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'من نحن | دي ناين' : 'About Us | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'تعرف على وكالة دي ناين.' : 'Learn about D-NINE agency.'));

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: '/about'
  });
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <AboutPage />;
}
