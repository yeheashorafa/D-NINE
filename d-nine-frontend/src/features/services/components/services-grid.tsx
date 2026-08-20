'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ServiceOffering } from '@/types/service';
import { ContentCategory } from '@/types/category';
import { ServicesFilter } from './services-filter';
import { ServiceOfferingCard } from './service-offering-card';
import { useProgressiveGrid } from '@/hooks/use-progressive-grid';
import { useIntersectionLoader } from '@/hooks/use-intersection-loader';
import { ProgressiveGridLoader } from '@/components/ui/progressive-grid-loader';

export interface ServicesGridProps {
  initialOfferings: ServiceOffering[];
  categories: ContentCategory[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ initialOfferings, categories }) => {
  const t = useTranslations('servicesPage');

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredOfferings = useMemo(() => {
    if (activeCategory === 'all') return initialOfferings;
    return initialOfferings.filter((o) => {
      return o.categorySlug === activeCategory || o.parentServiceSlug === activeCategory;
    });
  }, [initialOfferings, activeCategory]);

  const { visibleItems, hasMore, isLoadingMore, loadMore } = useProgressiveGrid({
    allItems: filteredOfferings,
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
      <ServicesFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(slug) => setActiveCategory(slug)}
      />

      {/* Grid Display */}
      {visibleItems.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((offering) => (
              <motion.div
                key={offering.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceOfferingCard offering={offering} />
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
