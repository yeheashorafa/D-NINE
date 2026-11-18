'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, CalendarRange, Megaphone } from 'lucide-react';
import type { SectorContent } from './sector-content';

export function SectorCards({ sectors }: { sectors: SectorContent[] }) {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {sectors.map((sector, index) => {
        const Icon = index === 0 ? CalendarRange : Megaphone;
        return (
          <Link key={sector.slug} href={`/services/sectors/${sector.slug}`} className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">
            <div className="absolute inset-y-0 start-0 w-1 bg-gradient-brand opacity-70 transition-all duration-300 group-hover:w-1.5 group-hover:opacity-100" aria-hidden="true" />
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple transition-transform duration-300 group-hover:scale-105 dark:bg-brand-cyan/10 dark:text-brand-cyan-light" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-foreground">{sector.title[locale]}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{sector.introduction[locale]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-cyan-dark dark:text-brand-cyan-light">
                  {isArabic ? 'استكشف القطاع' : 'Explore sector'}
                  {isArabic ? <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
