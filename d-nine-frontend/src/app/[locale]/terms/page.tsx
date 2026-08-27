import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { TermsPage } from '@/features/legal/terms-page';
import { getTermsPage } from '@/sanity/services/page.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getTermsPage({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'الشروط والأحكام | دي ناين' : 'Terms & Conditions | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'الشروط والأحكام لوكالة دي ناين.' : 'Terms & Conditions for D-NINE agency.'));

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `/${locale}/terms`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function TermsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <TermsPage />;
}