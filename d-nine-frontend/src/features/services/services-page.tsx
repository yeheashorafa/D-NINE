import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAllServiceOfferings } from '@/services/content/services.service';
import { getCategories } from '@/services/content/categories.service';
import { ServicesGrid } from './components/services-grid';
import { Sparkles } from 'lucide-react';

export async function ServicesPage() {
  const t = await getTranslations('servicesPage');
  const [offerings, categories] = await Promise.all([
    getAllServiceOfferings(),
    getCategories(),
  ]);

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid with Progressive Loading */}
        <ServicesGrid initialOfferings={offerings} categories={categories} />
      </div>
    </main>
  );
}
