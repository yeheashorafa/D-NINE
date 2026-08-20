'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Sparkles, Palette, Video, Smartphone, Image as ImageIcon, Share2, Megaphone } from 'lucide-react';
import { ServiceItem } from '@/types/service';
import { RevealSection } from '@/components/motion/reveal-section';

export interface CoreServicesSectionProps {
  services: ServiceItem[];
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Palette,
  Sparkles,
  Smartphone,
  Video,
  Image: ImageIcon,
  Share2,
  Megaphone,
};

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({ services }) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('home.coreServices');

  return (
    <section className="py-16 sm:py-24 relative bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </RevealSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Palette;
            return (
              <RevealSection key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-6 sm:p-8 rounded-3xl bg-surface/80 dark:bg-surface/40 border border-border/80 hover:border-brand-cyan/50 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-brand-cyan transition-colors">
                      {isArabic ? service.title.ar : service.title.en}
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {isArabic ? service.shortDescription.ar : service.shortDescription.en}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-1.5 text-xs font-extrabold text-brand-cyan group-hover:underline">
                    <span>{t('learnMore')}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </RevealSection>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-surface dark:bg-surface-muted text-foreground border border-border font-extrabold text-sm sm:text-base hover:border-brand-cyan transition-all shadow-sm active:scale-95"
          >
            <span>{t('viewAll')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
