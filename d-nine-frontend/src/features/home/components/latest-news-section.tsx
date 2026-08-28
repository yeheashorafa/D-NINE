'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Newspaper } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { BlogCard } from '@/features/blog/components/blog-card';
import { BlogPost } from '@/types/blog';
import { SanityBlogPostDoc } from '@/sanity/types';

export const LatestNewsSection: React.FC<{ data?: SanityBlogPostDoc[] }> = ({ data }) => {
  const t = useTranslations('home.latestNews');

  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Newspaper className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge') || 'Latest Insights'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('title') || 'Featured News & Articles'}
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 3).map((post, idx) => (
            <RevealSection key={idx} delay={idx * 0.1}>
              <BlogCard post={post as unknown as BlogPost} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
