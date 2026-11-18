import React from 'react';
// import { getTranslations } from 'next-intl/server';
import { getAllServiceOfferings } from '@/services/content/services.service';
import { getCategories } from '@/services/content/categories.service';
import { ServicesGrid } from './components/services-grid';
import { Sparkles } from 'lucide-react';
import { TestimonialsSection } from '../home/components/testimonials-section';

import { getServicesPage } from '@/sanity/services/page.service';
import { getLocale } from 'next-intl/server';

export async function ServicesPage() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';
  
  const [offerings, categories, pageData] = await Promise.all([
    getAllServiceOfferings(),
    getCategories(),
    getServicesPage(),
  ]);

  const badge = pageData?.heroBadge?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'خدماتنا' : 'Our Services');
  const title = pageData?.heroTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'نقدم لك أفضل الحلول' : 'We provide the best solutions');
  const subtitle = pageData?.heroSubtitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'استكشف ما يمكننا تقديمه لعملك.' : 'Explore what we can do for your business.');
  
  const filterLabels = {
    all: pageData?.filterLabels?.all?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'الكل' : 'All'),
    primary: pageData?.filterLabels?.primary?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'الخدمات الأساسية' : 'Primary Services'),
    offerings: pageData?.filterLabels?.offerings?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'عروضنا' : 'Our Offerings'),
  };

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{badge}</span>
            </div>
          )}
          {title && (
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-text-muted text-base sm:text-lg whitespace-pre-wrap">
              {subtitle}
            </p>
          )}
        </div>

        {/* Services Grid with Progressive Loading */}
        <ServicesGrid 
          initialOfferings={offerings} 
          categories={categories} 
          labels={filterLabels}
        />

        {/* Testimonials Section */}
        <TestimonialsSection data={pageData?.testimonialsSection} />
      </div>
    </main>
  );
}
