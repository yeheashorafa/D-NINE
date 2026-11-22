'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChartNoAxesCombined,
  CirclePlay,
  Clapperboard,
  ClipboardList,
  Film,
  Fingerprint,
  Gauge,
  Handshake,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Palette,
  PanelsTopLeft,
  Presentation,
  RadioTower,
  Sparkles,
  Users,
  UsersRound,
} from 'lucide-react';
import type { SectorContent } from './sector-content';

const ICONS = {
  Camera,
  ChartNoAxesCombined,
  CirclePlay,
  Clapperboard,
  ClipboardList,
  Film,
  Fingerprint,
  Gauge,
  Handshake,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Palette,
  PanelsTopLeft,
  Presentation,
  RadioTower,
  Users,
  UsersRound,
};

interface SectorServicesTabsProps {
  sectors: SectorContent[];
  header?: {
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
  };
  compact?: boolean;
}

export function SectorServicesTabs({ sectors, header, compact = false }: SectorServicesTabsProps) {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const [activeSlug, setActiveSlug] = useState(sectors[0]?.slug ?? '');
  const activeSector = sectors.find((sector) => sector.slug === activeSlug) ?? sectors[0];

  if (!activeSector) return null;

  const badge = header?.badge?.[locale] || (isArabic ? 'خدماتنا' : 'Our Services');
  const title = header?.title?.[locale] || (isArabic ? 'حلول متكاملة من الفكرة إلى الأثر' : 'Integrated Solutions from Idea to Impact');
  const subtitle = header?.subtitle?.[locale] || (isArabic
    ? 'اختر القطاع واستكشف الخدمات التي نبنيها حول احتياج مشروعك.'
    : 'Choose a sector and explore services shaped around your project needs.');

  return (
    <section className={compact ? 'py-8' : 'py-16 sm:py-24'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/10 px-3.5 py-1.5 text-xs font-semibold text-brand-cyan sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {badge}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="text-base leading-7 text-text-muted sm:text-lg">{subtitle}</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label={badge}>
          {sectors.map((sector) => (
            <button
              key={sector.slug}
              type="button"
              role="tab"
              aria-selected={activeSector.slug === sector.slug}
              aria-controls={`sector-panel-${sector.slug}`}
              onClick={() => setActiveSlug(sector.slug)}
              className={`rounded-full border px-5 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan sm:px-7 ${
                activeSector.slug === sector.slug
                  ? 'scale-[1.02] border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white dark:bg-white dark:text-slate-950'
                  : 'border-border bg-surface text-text-muted hover:border-brand-cyan/50 hover:text-foreground'
              }`}
            >
              {sector.title[locale]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSector.slug}
            id={`sector-panel-${activeSector.slug}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-8"
          >
            <p className="mx-auto max-w-4xl text-center text-base leading-8 text-text-muted sm:text-lg">
              {activeSector.introduction[locale]}
            </p>

            {activeSector.serviceGroups.map((group, groupIndex) => (
              <div key={`${activeSector.slug}-${groupIndex}`} className="space-y-4">
                {group.title && (
                  <h3 className="text-center text-xl font-extrabold text-foreground sm:text-2xl">
                    {group.title[locale]}
                  </h3>
                )}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => {
                    const Icon = ICONS[item.iconName as keyof typeof ICONS] || Sparkles;
                    return (
                      <Link
                        key={item.slug}
                        href={`/services/sectors/${activeSector.slug}#${item.slug}`}
                        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                      >
                        <span className="absolute inset-y-0 start-0 w-1 bg-gradient-brand transition-all duration-300 group-hover:w-1.5" aria-hidden="true" />
                        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-brand group-hover:text-white dark:bg-brand-cyan/10 dark:text-brand-cyan-light">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <h4 className="text-lg font-extrabold leading-snug text-foreground">{item.title[locale]}</h4>
                        <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{item.description[locale]}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-cyan-dark dark:text-brand-cyan-light">
                          {isArabic ? 'تفاصيل الخدمة' : 'Service details'}
                          {isArabic ? <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="text-center">
              <Link href={`/services/sectors/${activeSector.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-extrabold text-foreground transition-colors hover:border-brand-cyan">
                {isArabic ? 'استكشف القطاع كاملًا' : 'Explore the full sector'}
                {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
