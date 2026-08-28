import React from 'react';
import { BlogDetailPage } from '@/features/blog/blog-detail-page';
import { getAllBlogPosts, getBlogPostBySlug } from '@/services/content/blog.service';
import { routing } from '@/i18n/routing';

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { stegaClean } from '@sanity/client/stega';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isArabic = locale === 'ar';
  
  const post = await getBlogPostBySlug(slug, { stega: false });
  if (!post) {
    return {
      title: isArabic ? 'مقال غير موجود | دي ناين' : 'Post Not Found | D-NINE',
    };
  }

  const seoTitle = stegaClean(post.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || `${post.title?.[isArabic ? 'ar' : 'en']} | D-NINE`);
  const seoDesc = stegaClean(post.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || post.excerpt?.[isArabic ? 'ar' : 'en']);

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: `/blog/${slug}`
  });
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export default async function BlogDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
