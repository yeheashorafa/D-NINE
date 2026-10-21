import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { HomePage } from '@/features/home/home-page';
import { getHomePage } from '@/sanity/services/page.service';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getHomePage({ stega: false });

  const configuredTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || '');
  const configuredDescription = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || '');
  const seoTitle = configuredTitle && !/^(home|الرئيسية)\s*\|\s*(d-nine|دي ناين)$/i.test(configuredTitle)
    ? configuredTitle
    : isArabic
      ? 'دي ناين للإنتاج الإعلامي وتصميم الهوية'
      : 'Creative Agency for Media Production & Brand Identity';
  const usesGenericDescription = /^(D-NINE Creative Agency|وكالة دي ناين للإنتاج الإعلامي)$/i.test(configuredDescription);
  const seoDesc = configuredDescription && !usesGenericDescription
    ? configuredDescription
    : isArabic
      ? 'دي ناين وكالة إبداعية متخصصة في الإنتاج الإعلامي، تصميم الهوية البصرية، الجرافيك، وإنتاج الفيديو والمحتوى الرقمي في الرياض ودبي.'
      : 'D-NINE is a creative agency in Riyadh and Dubai specializing in media production, brand identity, graphic design, video, and digital content.';

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: '/',
  });
}

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <HomePage />;
}
