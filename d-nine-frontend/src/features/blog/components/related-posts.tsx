'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/types/blog';
import { BlogCard } from './blog-card';
import { getRelatedBlogPosts } from '../utils/blog-relations';

export interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts }) => {
  const t = useTranslations('blogDetail');

  const related = getRelatedBlogPosts(currentPost, allPosts, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {t('relatedArticles')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {related.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
