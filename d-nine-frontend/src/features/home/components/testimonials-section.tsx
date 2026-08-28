'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageSquareQuote } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Card } from '@/components/ui/card';
import { SanityTestimonial } from '@/sanity/types';

export const TestimonialsSection: React.FC<{ data?: SanityTestimonial[] }> = ({ data }) => {
  const t = useTranslations('home.testimonials');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-magenta/10 text-brand-magenta text-xs sm:text-sm font-semibold">
            <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <RevealSection key={idx}>
              <Card className="h-full bg-surface border-border flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <MessageSquareQuote className="w-8 h-8 text-brand-magenta/20" />
                  <p className="text-lg text-foreground italic leading-relaxed">
                    &ldquo;{item.text?.[isArabic ? 'ar' : 'en']}&rdquo;
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">
                    {item.author?.[isArabic ? 'ar' : 'en']}
                  </h4>
                  <p className="text-sm text-text-muted">
                    {item.role?.[isArabic ? 'ar' : 'en']} {item.company ? `— ${item.company}` : ''}
                  </p>
                </div>
              </Card>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
