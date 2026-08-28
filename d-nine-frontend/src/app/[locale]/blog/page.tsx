import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { BlogPage } from '@/features/blog/blog-page';
import { getBlogPage } from '@/sanity/services/page.service';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getBlogPage({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'المدونة | دي ناين' : 'Blog | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'أحدث المقالات من دي ناين' : 'Latest insights from D-NINE'));

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: '/blog'
  });
}

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <BlogPage />;
}
