'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '@/types/project';
import { ContentCategory } from '@/types/category';
import { WorkFilter } from './work-filter';
import { WorkCard } from './work-card';
import { useProgressiveGrid } from '@/hooks/use-progressive-grid';
import { useIntersectionLoader } from '@/hooks/use-intersection-loader';
import { ProgressiveGridLoader } from '@/components/ui/progressive-grid-loader';
import { PORTFOLIO_GROUPS } from '@/features/sectors/sector-content';

export interface WorkGridProps {
  initialProjects: ProjectItem[];
  categories: ContentCategory[];
}

export function WorkGrid({ initialProjects, categories }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive effective active category: selected category or first available canonical category
  const activeCategory = selectedCategory ?? PORTFOLIO_GROUPS[0].slug;


  const filteredProjects = useMemo(() => {
    const activeGroup = PORTFOLIO_GROUPS.find((group) => group.slug === activeCategory);
    if (!activeGroup) return initialProjects;
    return initialProjects.filter((p) => {
      return (
        activeGroup.categorySlugs.includes(p.primaryCategorySlug) ||
        (p.categorySlugs && p.categorySlugs.some((slug) => activeGroup.categorySlugs.includes(slug)))
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
      {/* Category Tabs: 4x2 responsive layout without All Categories */}
      {categories.length > 0 && (
        <WorkFilter
          activeCategory={activeCategory}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />
      )}


      {/* Grid Display */}
      {visibleItems.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
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
          <p>لا توجد مشاريع متوفرة في هذا القسم حالياً.</p>
        </div>
      )}

      {/* Progressive Loader */}
      {(hasMore || isLoadingMore) && (
        <ProgressiveGridLoader isLoading={true} sentinelRef={sentinelRef} />
      )}
    </div>
  );
}
