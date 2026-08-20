import React from 'react';
import { BlogDetailPage } from '@/features/blog/blog-detail-page';
import { getAllBlogPosts } from '@/services/content/blog.service';
import { routing } from '@/i18n/routing';

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
