'use client';

import { BadgeCheck, Layers3, Puzzle, Route } from 'lucide-react';
import { useLocale } from 'next-intl';
import { RevealSection } from '@/components/motion/reveal-section';
import { WHY_D9 } from '@/features/client-revision/client-content';

const icons = { BadgeCheck, Layers3, Puzzle, Route };

export function WhyDnineSection({ items = WHY_D9 }: { items?: typeof WHY_D9 }) {
  const locale = useLocale() as 'ar' | 'en';

  return (
    <section className="py-16 sm:py-24 bg-surface/60 dark:bg-card/30" aria-labelledby="why-dnine-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <p className="text-sm font-bold text-brand-cyan">{locale === 'ar' ? 'لماذا دي ناين؟' : 'Why D-NINE?'}</p>
          <h2 id="why-dnine-heading" className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {locale === 'ar' ? 'نفكر في النتيجة قبل أن نبدأ التنفيذ' : 'We think about the outcome before execution begins'}
          </h2>
        </RevealSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const Icon = icons[item.iconName as keyof typeof icons] || BadgeCheck;
            return (
              <RevealSection key={item.title.en}>
                <article className="h-full rounded-3xl border border-border bg-background p-6 sm:p-7">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5"><Icon className="w-6 h-6" aria-hidden="true" /></div>
                  <p className="text-xs font-bold text-brand-purple mb-2">0{index + 1}</p>
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{item.title[locale]}</h3>
                  <p className="text-sm leading-7 text-text-muted">{item.description[locale]}</p>
                </article>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
