import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { AboutPage } from '@/features/about/about-page';
import { getAboutPage } from '@/sanity/services/page.service';
import { getSiteSettings } from '@/services/content/settings.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getAboutPage({ stega: false });
  const siteSettings = await getSiteSettings({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'من نحن | دي ناين' : 'About Us | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'تعرف على وكالة دي ناين.' : 'Learn about D-NINE agency.'));

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `/${locale}/about`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [
        {
          url: '/media/seo/d-nine-og.jpg',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
  };
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <AboutPage />;
}
