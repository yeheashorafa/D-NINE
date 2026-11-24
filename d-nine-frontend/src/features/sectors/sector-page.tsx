'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { BadgeCheck, Layers3, PackageCheck, Sparkles } from 'lucide-react';
import type { SectorContent } from './sector-content';
import type { ProjectItem } from '@/types/project';
import type { ContentCategory } from '@/types/category';
import { WorkCard } from '@/features/work/components/work-card';

export function SectorPage({ sector, projects, categories }: { sector: SectorContent; projects: ProjectItem[]; categories: ContentCategory[] }) {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const availableCategories = categories.filter((category) => sector.relatedCategorySlugs.includes(category.slug));
  const [activeCategory, setActiveCategory] = useState(availableCategories[0]?.slug || 'all');
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const belongsToSector = sector.relatedCategorySlugs.includes(project.primaryCategorySlug) || project.categorySlugs.some((slug) => sector.relatedCategorySlugs.includes(slug));
    if (!belongsToSector) return false;
    return activeCategory === 'all' || project.primaryCategorySlug === activeCategory || project.categorySlugs.includes(activeCategory);
  }), [projects, sector.relatedCategorySlugs, activeCategory]);

  return <main className="pt-28 sm:pt-36 pb-20 bg-background min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <header className="max-w-4xl space-y-5">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-cyan"><Sparkles className="w-4 h-4" />{isArabic ? 'قطاع رئيسي' : 'Main Sector'}</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground leading-tight">{sector.title[locale]}</h1>
        <p className="text-lg sm:text-xl leading-9 text-text-muted">{sector.introduction[locale]}</p>
      </header>

      <section className="space-y-8">
        <div className="flex items-center gap-3"><Layers3 className="text-brand-purple" /><h2 className="text-3xl font-extrabold text-foreground">{isArabic ? 'الخدمات' : 'Services'}</h2></div>
        <div className="grid md:grid-cols-2 gap-6">
          {sector.serviceGroups.map((group, index) => <article key={index} className="rounded-3xl border border-border bg-surface/80 dark:bg-card p-6 sm:p-8">
            {group.title && <h3 className="text-xl font-extrabold text-foreground mb-5">{group.title[locale]}</h3>}
            <ul className="space-y-4">{group.items.map((item) => <li id={item.slug} key={item.slug} className="scroll-mt-32 flex gap-3 text-text-muted leading-7"><BadgeCheck className="w-5 h-5 shrink-0 mt-1 text-brand-cyan" /><span><strong className="block text-foreground">{item.title[locale]}</strong>{item.description[locale]}</span></li>)}</ul>
          </article>)}
        </div>
      </section>

      {sector.packages.length > 0 && <section className="space-y-8">
        <div className="flex items-center gap-3"><PackageCheck className="text-brand-cyan" /><h2 className="text-3xl font-extrabold text-foreground">{isArabic ? 'الباقات' : 'Packages'}</h2></div>
        <div className="grid md:grid-cols-2 gap-6">{sector.packages.map((item, index) => <article key={index} className="rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 p-7 sm:p-9"><h3 className="text-2xl font-extrabold text-foreground">{item.title[locale]}</h3><p className="mt-4 leading-8 text-text-muted">{item.description[locale]}</p></article>)}</div>
      </section>}

      <section className="space-y-8">
        <h2 className="text-3xl font-extrabold text-foreground">{isArabic ? 'أعمال مرتبطة' : 'Related Work'}</h2>
        {availableCategories.length > 0 && <div className="flex flex-wrap gap-2"><button onClick={() => setActiveCategory('all')} className={`px-5 py-2.5 rounded-full font-bold text-sm border ${activeCategory === 'all' ? 'bg-foreground text-background' : 'border-border text-text-muted'}`}>{isArabic ? 'الكل' : 'All'}</button>{availableCategories.map((category) => <button key={category.slug} onClick={() => setActiveCategory(category.slug)} className={`px-5 py-2.5 rounded-full font-bold text-sm border ${activeCategory === category.slug ? 'bg-foreground text-background' : 'border-border text-text-muted'}`}>{category.title[locale]}</button>)}</div>}
        {filteredProjects.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredProjects.map((project) => <WorkCard key={project.id} project={project} />)}</div> : <p className="rounded-2xl border border-border p-8 text-center text-text-muted">{isArabic ? 'ستظهر المشاريع المرتبطة هنا عند إضافتها من لوحة التحكم.' : 'Related projects will appear here when added from the dashboard.'}</p>}
      </section>
    </div>
  </main>;
}
