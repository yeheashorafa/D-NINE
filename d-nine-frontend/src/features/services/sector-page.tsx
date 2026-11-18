import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, PackageCheck } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { RevealSection } from '@/components/motion/reveal-section';
import { getAllProjects } from '@/services/content/projects.service';
import { WorkCard } from '@/features/work/components/work-card';
import type { SectorPageData } from '@/sanity/services/sector.service';

export async function SectorPage({ sector }: { sector: SectorPageData }) {
  const locale = (await getLocale()) as 'ar' | 'en';
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const projects = (await getAllProjects())
    .filter((project) => sector.relatedCategorySlugs.includes(project.primaryCategorySlug) || project.categorySlugs.some((slug) => sector.relatedCategorySlugs.includes(slug)))
    .slice(0, 6);

  return (
    <main className="pt-24 sm:pt-28 bg-background min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-14 items-center">
          <RevealSection className="space-y-6">
            <p className="text-sm font-bold text-brand-cyan">{locale === 'ar' ? 'قطاع رئيسي' : 'Core Sector'}</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-foreground text-balance">{sector.title[locale]}</h1>
            <p className="text-lg leading-9 text-text-muted max-w-3xl">{sector.intro[locale]}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-white font-bold shadow-lg hover:opacity-95">
              {locale === 'ar' ? 'ناقش مشروعك معنا' : 'Discuss your project with us'} <Arrow className="w-4 h-4" />
            </Link>
          </RevealSection>
          <RevealSection className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <Image src={sector.image} alt={sector.imageAlt?.[locale] || sector.title[locale]} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </RevealSection>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-surface/60 dark:bg-card/30" aria-labelledby="sector-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="max-w-3xl mb-10"><h2 id="sector-services-heading" className="text-3xl sm:text-5xl font-extrabold text-foreground">{locale === 'ar' ? 'خدمات القطاع' : 'Sector Services'}</h2></RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sector.services.map((service, index) => (
              <RevealSection key={service[locale]}><div className="h-full flex gap-4 rounded-2xl border border-border bg-background p-5"><span className="w-9 h-9 shrink-0 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center"><Check className="w-5 h-5" /></span><div><span className="text-xs font-bold text-brand-purple">0{index + 1}</span><h3 className="mt-1 font-bold text-foreground leading-7">{service[locale]}</h3></div></div></RevealSection>
            ))}
          </div>
        </div>
      </section>

      {sector.packages?.length ? (
        <section className="py-16 sm:py-24" aria-labelledby="packages-heading"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><RevealSection className="text-center mb-10"><h2 id="packages-heading" className="text-3xl sm:text-5xl font-extrabold text-foreground">{locale === 'ar' ? 'باقات D9' : 'D9 Packages'}</h2></RevealSection><div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">{sector.packages.map((item) => <RevealSection key={item.title.en}><article className="h-full rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10 p-7 sm:p-9"><PackageCheck className="w-10 h-10 text-brand-cyan mb-5" /><h3 className="text-2xl font-extrabold text-foreground">{item.title[locale]}</h3><p className="mt-4 leading-8 text-text-muted">{item.description[locale]}</p><Link href="/contact" className="inline-flex mt-6 font-bold text-brand-purple dark:text-brand-cyan">{locale === 'ar' ? 'اطلب الباقة' : 'Request this package'}</Link></article></RevealSection>)}</div></div></section>
      ) : null}

      <section className="py-16 sm:py-24 bg-surface/60 dark:bg-card/30" aria-labelledby="sector-work-heading"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><RevealSection className="flex items-end justify-between gap-4 mb-10"><h2 id="sector-work-heading" className="text-3xl sm:text-5xl font-extrabold text-foreground">{locale === 'ar' ? 'أعمال مختارة' : 'Selected Work'}</h2><Link href="/work" className="font-bold text-brand-cyan">{locale === 'ar' ? 'جميع الأعمال' : 'All work'}</Link></RevealSection>{projects.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((project) => <WorkCard key={project.id} project={project} />)}</div> : <p className="text-text-muted">{locale === 'ar' ? 'ستظهر المشاريع المرتبطة بهذا القطاع هنا فور إضافتها من لوحة التحكم.' : 'Projects linked to this sector will appear here as soon as they are added in the dashboard.'}</p>}</div></section>

      <section className="py-16 sm:py-24"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><RevealSection className="rounded-[2rem] bg-slate-950 text-white p-8 sm:p-12 text-center"><h2 className="text-3xl sm:text-5xl font-extrabold">{sector.contactTitle?.[locale] || (locale === 'ar' ? 'حوّل فكرتك إلى مشروع مؤثر' : 'Turn your idea into an impactful project')}</h2><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-7 py-3.5 font-bold">{locale === 'ar' ? 'تواصل معنا' : 'Contact us'} <Arrow className="w-4 h-4" /></Link></RevealSection></div></section>
    </main>
  );
}
