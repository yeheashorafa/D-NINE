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
import { useLocale } from 'next-intl';
import { PORTFOLIO_GROUPS, type PortfolioGroupSlug } from '@/features/client-revision/client-content';

export interface WorkGridProps {
  initialProjects: ProjectItem[];
  categories: ContentCategory[];
}

export function WorkGrid({ initialProjects, categories }: WorkGridProps) {
  const locale = useLocale() as 'ar' | 'en';
  const [selectedGroup, setSelectedGroup] = useState<PortfolioGroupSlug>('events');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const group = PORTFOLIO_GROUPS.find((item) => item.slug === selectedGroup) || PORTFOLIO_GROUPS[0];
  const groupCategories = categories.filter((category) =>
    (category.portfolioGroup ?? (group.categories.includes(category.slug) ? selectedGroup : undefined)) === selectedGroup
  );

  const filteredProjects = useMemo(() => {
    const acceptedCategories = selectedCategory ? [selectedCategory] : group.categories;
    return initialProjects.filter((p) => {
      return (
        acceptedCategories.includes(p.primaryCategorySlug) ||
        (p.categorySlugs && p.categorySlugs.some((slug) => acceptedCategories.includes(slug)))
      );
    });
  }, [initialProjects, group.categories, selectedCategory]);

  const { visibleItems, hasMore, isLoadingMore, loadMore } = useProgressiveGrid({
    allItems: filteredProjects,
    batchSize: 6,
    resetDependencies: [selectedGroup, selectedCategory],
  });

  const { sentinelRef } = useIntersectionLoader({
    onLoadMore: loadMore,
    hasMore,
    isLoading: isLoadingMore,
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6" aria-label={locale === 'ar' ? 'التصنيفات الرئيسية للأعمال' : 'Main work categories'}>
        {PORTFOLIO_GROUPS.map((item) => (
          <button key={item.slug} type="button" aria-pressed={selectedGroup === item.slug} onClick={() => { setSelectedGroup(item.slug); setSelectedCategory(null); }} className={`min-h-16 rounded-2xl border px-4 py-3 text-sm font-extrabold transition-all ${selectedGroup === item.slug ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-lg' : 'bg-surface dark:bg-card border-border text-foreground hover:border-brand-cyan/50'}`}>
            {item.title[locale]}
          </button>
        ))}
      </div>

      {/* Detailed canonical categories remain available beneath each main group. */}
      {groupCategories.length > 0 && (
        <div className="mb-10">
          <button type="button" onClick={() => setSelectedCategory(null)} className={`mx-auto mb-3 block rounded-full px-5 py-2 text-xs font-bold border ${selectedCategory === null ? 'bg-brand-cyan text-slate-950 border-brand-cyan' : 'border-border text-text-muted'}`}>{locale === 'ar' ? 'عرض الكل في هذا القطاع' : 'View all in this sector'}</button>
        <WorkFilter
          categories={groupCategories}
          activeCategory={selectedCategory || ''}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />
        </div>
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
