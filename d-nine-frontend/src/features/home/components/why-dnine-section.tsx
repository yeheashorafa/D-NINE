'use client';

import { useLocale } from 'next-intl';
import { BadgeCheck, Layers3, Puzzle, Route, Sparkles, type LucideIcon } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { WHY_DNINE } from '@/features/sectors/sector-content';

const icons: Record<string, LucideIcon> = { BadgeCheck, Layers3, Puzzle, Route };

type WhyItem = { iconName: string; title: { ar?: string; en?: string }; description: { ar?: string; en?: string } };

export function WhyDnineSection({ items }: { items?: WhyItem[] }) {
  const locale = useLocale() as 'ar' | 'en';
  const content = items?.length ? items : WHY_DNINE;
  return <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,.08),transparent_35%)]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <RevealSection className="max-w-3xl mx-auto text-center mb-12 space-y-3">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan"><Sparkles className="w-4 h-4" />D-NINE</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground">{locale === 'ar' ? 'لماذا دي ناين؟' : 'Why D-NINE?'}</h2>
      </RevealSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{content.map((item, index) => { const Icon = icons[item.iconName] || Sparkles; return <RevealSection key={index}><article className="h-full p-6 rounded-3xl border border-border bg-surface/80 dark:bg-card transition-all hover:-translate-y-1 hover:border-brand-cyan/50"><div className="w-12 h-12 rounded-2xl bg-gradient-brand text-white flex items-center justify-center mb-5"><Icon className="w-5 h-5" /></div><h3 className="font-extrabold text-lg text-foreground">{item.title[locale] || item.title.ar || item.title.en}</h3><p className="mt-3 text-sm leading-7 text-text-muted">{item.description[locale] || item.description.ar || item.description.en}</p></article></RevealSection>; })}</div>
    </div>
  </section>;
}
