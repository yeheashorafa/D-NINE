'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Accordion } from '@/components/ui/accordion';

export const FaqsSection: React.FC<{ data?: { question?: { ar?: string; en?: string }; answer?: { ar?: string; en?: string } }[] }> = ({ data }) => {
  const t = useTranslations('home.faqs');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (!data || data.length === 0) return null;

  const accordionItems = data.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question?.[isArabic ? 'ar' : 'en'] || '',
    content: faq.answer?.[isArabic ? 'ar' : 'en'] || '',
  }));

  return (
    <section className="py-16 sm:py-24 relative bg-background transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h2>
        </RevealSection>

        <RevealSection>
          <Accordion items={accordionItems} />
        </RevealSection>
      </div>
    </section>
  );
};
