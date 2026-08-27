import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts } from '@/services/content/blog.service';
import { getCategories } from '@/services/content/categories.service';
import { BlogGrid } from './components/blog-grid';
import { Sparkles } from 'lucide-react';

import { getBlogPage } from '@/sanity/services/page.service';
import { getLocale } from 'next-intl/server';

export async function BlogPage() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const [posts, categories, pageData] = await Promise.all([
    getAllBlogPosts(),
    getCategories(),
    getBlogPage(),
  ]);

  const badge = pageData?.heroBadge?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'المدونة' : 'Blog');
  const title = pageData?.heroTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'أحدث المقالات' : 'Latest Articles');
  const subtitle = pageData?.heroSubtitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'اقرأ أحدث أفكارنا ورؤانا.' : 'Read our latest thoughts and insights.');
  
  const searchPlaceholder = pageData?.searchPlaceholder?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'ابحث عن مقال...' : 'Search for an article...');
  const allLabel = isArabic ? 'كل الفئات' : 'All Categories';

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{badge}</span>
            </div>
          )}
          {title && (
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-text-muted text-base sm:text-lg whitespace-pre-wrap">
              {subtitle}
            </p>
          )}
        </div>

        {/* Blog Grid with Search and Progressive Loading */}
        <BlogGrid 
          initialPosts={posts} 
          categories={categories} 
          searchPlaceholder={searchPlaceholder}
          allLabel={allLabel}
        />
      </div>
    </main>
  );
}
