'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/types/blog';
import { ContentCategory } from '@/types/category';
import { BlogSearch } from './blog-search';
import { BlogFilter } from './blog-filter';
import { BlogCard } from './blog-card';
import { useProgressiveGrid } from '@/hooks/use-progressive-grid';
import { useIntersectionLoader } from '@/hooks/use-intersection-loader';
import { ProgressiveGridLoader } from '@/components/ui/progressive-grid-loader';

export interface BlogGridProps {
  initialPosts: BlogPost[];
  categories: ContentCategory[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ initialPosts, categories }) => {
  const t = useTranslations('blogPage');

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    let items = initialPosts;

    if (activeCategory !== 'all') {
      items = items.filter((p) => p.categorySlug === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((post) => {
        const matchTitle =
          post.title.ar.toLowerCase().includes(q) || post.title.en.toLowerCase().includes(q);
        const matchExcerpt =
          post.excerpt.ar.toLowerCase().includes(q) || post.excerpt.en.toLowerCase().includes(q);
        const matchTag =
          post.tags.ar.some((t) => t.toLowerCase().includes(q)) ||
          post.tags.en.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchExcerpt || matchTag;
      });
    }

    return items;
  }, [initialPosts, activeCategory, searchQuery]);

  const { visibleItems, hasMore, isLoadingMore, loadMore } = useProgressiveGrid({
    allItems: filteredPosts,
    batchSize: 6,
    resetDependencies: [activeCategory, searchQuery],
  });

  const { sentinelRef } = useIntersectionLoader({
    onLoadMore: loadMore,
    hasMore,
    isLoading: isLoadingMore,
  });

  return (
    <div className="w-full">
      {/* Search Input */}
      <BlogSearch
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Category Tabs */}
      <BlogFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => setActiveCategory(slug)}
      />

      {/* Grid Display */}
      {visibleItems.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-16 text-center text-text-muted">
          <p>{t('empty')}</p>
        </div>
      )}

      {/* Progressive Loader */}
      {(hasMore || isLoadingMore) && (
        <ProgressiveGridLoader isLoading={true} sentinelRef={sentinelRef} />
      )}
    </div>
  );
};
