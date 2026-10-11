'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { ContentCategory } from '@/types/category';

export interface WorkFilterProps {
  categories: ContentCategory[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const WorkFilter: React.FC<WorkFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className="w-full mb-10">
      {/* 4 columns x 2 rows on desktop, responsive on tablet/mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-5xl mx-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`min-h-[48px] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center text-center leading-snug border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan select-none ${
                isActive
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-lg scale-[1.02]'
                  : 'bg-surface dark:bg-card border-border text-text-muted hover:text-foreground hover:border-brand-cyan/40 hover:bg-surface-hover'
              }`}
              aria-pressed={isActive}
            >
              <span>{isArabic ? cat.title.ar : cat.title.en}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
