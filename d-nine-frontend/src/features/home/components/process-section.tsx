'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';

export const ProcessSection: React.FC<{ data?: { stepNumber?: string; title?: { ar?: string; en?: string }; description?: { ar?: string; en?: string } }[] }> = ({ data }) => {
  const t = useTranslations('home.process');

  const steps = data?.length ? data : [
    {
      stepNumber: '01',
      title: { ar: t('steps.0.title'), en: t('steps.0.title') },
      description: { ar: t('steps.0.description'), en: t('steps.0.description') },
    },
    {
      stepNumber: '02',
      title: { ar: t('steps.1.title'), en: t('steps.1.title') },
      description: { ar: t('steps.1.description'), en: t('steps.1.description') },
    },
    {
      stepNumber: '03',
      title: { ar: t('steps.2.title'), en: t('steps.2.title') },
      description: { ar: t('steps.2.description'), en: t('steps.2.description') },
    },
  ];

  const locale = useLocale();
  const isArabic = locale === 'ar';



  return (
    <section className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple dark:text-brand-purple-light text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h2>
        </RevealSection>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <RevealSection key={idx}>
              <div className="p-8 rounded-3xl bg-surface/80 dark:bg-surface/50 border border-border/80 shadow-sm relative h-full flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black text-brand-cyan/30 dark:text-brand-cyan/20">
                    {item.stepNumber || `0${idx + 1}`}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-brand-cyan" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">{item.title?.[isArabic ? 'ar' : 'en']}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description?.[isArabic ? 'ar' : 'en']}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
