'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RevealSection } from '@/components/motion/reveal-section';
import { SECTORS, type SectorContent } from '@/features/client-revision/client-content';

interface SectorOverviewSectionProps {
  sectors?: SectorContent[];
}

export function SectorOverviewSection({ sectors = SECTORS }: SectorOverviewSectionProps) {
  const locale = useLocale() as 'ar' | 'en';
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-24 bg-background" aria-labelledby="sectors-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-sm font-bold text-brand-cyan mb-3">{locale === 'ar' ? 'القطاعات الرئيسية' : 'Core Sectors'}</p>
          <h2 id="sectors-heading" className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {locale === 'ar' ? 'خبرات مترابطة من الفكرة إلى الأثر' : 'Connected expertise from idea to impact'}
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {sectors.map((sector) => (
            <RevealSection key={sector.slug}>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-surface dark:bg-card shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={sector.image} alt={sector.title[locale]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="p-6 sm:p-8 space-y-5">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">{sector.title[locale]}</h3>
                  <p className="text-text-muted leading-8">{sector.intro[locale]}</p>
                  <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2 text-sm text-foreground/85">
                    {sector.services.slice(0, 4).map((service) => <li key={service[locale]} className="flex gap-2"><span className="text-brand-cyan" aria-hidden="true">•</span><span>{service[locale]}</span></li>)}
                  </ul>
                  <Link href={`/services/sectors/${sector.slug}`} className="inline-flex items-center gap-2 font-bold text-brand-purple dark:text-brand-cyan hover:gap-3 transition-all">
                    {locale === 'ar' ? 'استكشف القطاع' : 'Explore this sector'}
                    <Arrow className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
