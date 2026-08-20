import React from 'react';
import { BlogPage } from '@/features/blog/blog-page';

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <BlogPage />;
}
