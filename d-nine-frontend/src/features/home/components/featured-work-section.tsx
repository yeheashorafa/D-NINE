'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProjectItem } from '@/types/project';
import { ContentCategory } from '@/types/category';
import { RevealSection } from '@/components/motion/reveal-section';

export interface FeaturedWorkSectionProps {
  projects: ProjectItem[];
  categories: ContentCategory[];
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({
  projects,
  categories,
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('home.featuredWork');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') return true;
    return (
      project.primaryCategorySlug === selectedCategory ||
      (project.categorySlugs && project.categorySlugs.includes(selectedCategory))
    );
  });

  return (
    <section className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple dark:text-brand-purple-light text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {t('title')}
          </h2>
        </RevealSection>

        {/* Category Tabs */}
        <RevealSection className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-cyan/40'
            }`}
            aria-pressed={selectedCategory === 'all'}
          >
            {t('all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-cyan/40'
              }`}
              aria-pressed={selectedCategory === cat.slug}
            >
              {isArabic ? cat.title.ar : cat.title.en}
            </button>
          ))}
        </RevealSection>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 6).map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={isArabic ? project.title.ar : project.title.en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                      {isArabic ? project.category.ar : project.category.en}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{project.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-cyan transition-colors">
                    {isArabic ? project.title.ar : project.title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {isArabic ? project.summary.ar : project.summary.en}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white hover:text-brand-cyan transition-colors"
                    >
                      <span>{t('viewCaseStudy')}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-extrabold text-sm sm:text-base hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            <span>{t('viewAll')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
