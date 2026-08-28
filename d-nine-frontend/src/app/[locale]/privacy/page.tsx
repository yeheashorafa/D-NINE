import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { PrivacyPage } from '@/features/legal/privacy-page';
import { getPrivacyPage } from '@/sanity/services/page.service';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getPrivacyPage({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'سياسة الخصوصية | دي ناين' : 'Privacy Policy | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'سياسة الخصوصية لوكالة دي ناين.' : 'Privacy Policy for D-NINE agency.'));

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: '/privacy'
  });
}

export default async function PrivacyRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <PrivacyPage />;
}