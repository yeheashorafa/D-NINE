import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts } from '@/services/content/blog.service';
import { getCategories } from '@/services/content/categories.service';
import { BlogGrid } from './components/blog-grid';
import { Sparkles } from 'lucide-react';

export async function BlogPage() {
  const t = await getTranslations('blogPage');
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getCategories(),
  ]);

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog Grid with Search and Progressive Loading */}
        <BlogGrid initialPosts={posts} categories={categories} />
      </div>
    </main>
  );
}
