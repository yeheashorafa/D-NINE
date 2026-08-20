'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ContentCategory } from '@/types/category';

export interface BlogFilterProps {
  categories: ContentCategory[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('blogPage');

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
          activeCategory === 'all'
            ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md scale-105'
            : 'bg-surface dark:bg-card border border-border text-text-muted hover:text-foreground hover:border-brand-cyan/40'
        }`}
        aria-pressed={activeCategory === 'all'}
      >
        {t('allFilter')}
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelectCategory(cat.slug)}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
            activeCategory === cat.slug
              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md scale-105'
              : 'bg-surface dark:bg-card border border-border text-text-muted hover:text-foreground hover:border-brand-cyan/40'
          }`}
          aria-pressed={activeCategory === cat.slug}
        >
          {isArabic ? cat.title.ar : cat.title.en}
        </button>
      ))}
    </div>
  );
};
