'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SectorContent } from './sector-content';

export function SectorCards({ sectors }: { sectors: SectorContent[] }) {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {sectors.map((sector) => (
        <Link key={sector.slug} href={`/services/sectors/${sector.slug}`} className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-cyan/60 hover:shadow-2xl">
          {sector.image && <Image src={sector.image} alt={sector.title[locale]} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">{sector.title[locale]}</h3>
            <p className="mt-3 max-w-xl text-sm sm:text-base leading-7 text-white/80 line-clamp-3">{sector.introduction[locale]}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-cyan-light">{isArabic ? 'استكشف القطاع' : 'Explore sector'} {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
