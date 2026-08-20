'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ProjectItem } from '@/types/project';
import { ContentCategory } from '@/types/category';
import { WorkFilter } from './work-filter';
import { WorkCard } from './work-card';
import { useProgressiveGrid } from '@/hooks/use-progressive-grid';
import { useIntersectionLoader } from '@/hooks/use-intersection-loader';
import { ProgressiveGridLoader } from '@/components/ui/progressive-grid-loader';

export interface WorkGridProps {
  initialProjects: ProjectItem[];
  categories: ContentCategory[];
}

export const WorkGrid: React.FC<WorkGridProps> = ({ initialProjects, categories }) => {
  const t = useTranslations('workPage');

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return initialProjects;
    return initialProjects.filter((p) => {
      return (
        p.primaryCategorySlug === activeCategory ||
        (p.categorySlugs && p.categorySlugs.includes(activeCategory))
      );
    });
  }, [initialProjects, activeCategory]);

  const { visibleItems, hasMore, isLoadingMore, loadMore } = useProgressiveGrid({
    allItems: filteredProjects,
    batchSize: 6,
    resetDependencies: [activeCategory],
  });

  const { sentinelRef } = useIntersectionLoader({
    onLoadMore: loadMore,
    hasMore,
    isLoading: isLoadingMore,
  });

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <WorkFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => setActiveCategory(slug)}
      />

      {/* Grid Display */}
      {visibleItems.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <WorkCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-16 text-center text-text-muted">
          <p>{t('empty')}</p>
        </div>
      )}

      {/* Pexels-Style Progressive Loader */}
      {(hasMore || isLoadingMore) && (
        <ProgressiveGridLoader isLoading={true} sentinelRef={sentinelRef} />
      )}
    </div>
  );
};
