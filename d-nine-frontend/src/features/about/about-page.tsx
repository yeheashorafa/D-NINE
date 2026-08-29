/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { getAboutPage } from '@/sanity/services/page.service';
import { Sparkles, Palette, Award, ShieldCheck, HeartHandshake, Code, Camera, Video, PenTool } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { CustomPortableText } from '@/sanity/components/portable-text';
import { TeamSection } from '../home/components/team-section';
import { TestimonialsSection } from '../home/components/testimonials-section';

// Helper to map string icon names to Lucide components safely
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Palette, Award, ShieldCheck, HeartHandshake, Code, Camera, Video, PenTool
  };
  return icons[iconName] || Palette;
};

export async function AboutPage() {
  const t = await getTranslations('about');
  const locale = await getLocale() as 'ar' | 'en';
  const pageData = await getAboutPage();
  // const isArabic = locale === 'ar';

  const valuesFromCMS = pageData?.values && pageData.values.length > 0;

  const defaultValues = [
    {
      icon: Palette,
      title: t('values.items.0.title'),
      desc: t('values.items.0.description'),
    },
    {
      icon: ShieldCheck,
      title: t('values.items.1.title'),
      desc: t('values.items.1.description'),
    },
    {
      icon: Award,
      title: t('values.items.2.title'),
      desc: t('values.items.2.description'),
    },
    {
      icon: HeartHandshake,
      title: t('values.items.3.title'),
      desc: t('values.items.3.description'),
    },
  ];

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* About Hero */}
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{pageData?.heroBadge?.[locale] || t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {pageData?.heroTitle?.[locale] || t('hero.title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {pageData?.heroSubtitle?.[locale] || t('hero.subtitle')}
          </p>
        </RevealSection>

        {/* Agency Story */}
        <RevealSection className="p-8 sm:p-12 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple uppercase tracking-wider">
            <span>{t('story.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t('story.title')}
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed text-base sm:text-lg">
            {pageData?.agencyStory?.[locale] ? (
              <CustomPortableText value={pageData.agencyStory[locale]} />
            ) : (
              <>
                <p>{t('story.p1')}</p>
                <p>{t('story.p2')}</p>
              </>
            )}
          </div>
        </RevealSection>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RevealSection className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold text-brand-cyan">
              {t('missionVision.missionTitle')}
            </h3>
            <div className="text-text-muted leading-relaxed prose prose-sm dark:prose-invert">
              {pageData?.mission?.[locale] ? (
                <CustomPortableText value={pageData.mission[locale]} />
              ) : (
                <p>{t('missionVision.missionDesc')}</p>
              )}
            </div>
          </RevealSection>

          <RevealSection className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">
              {t('missionVision.visionTitle')}
            </h3>
            <div className="text-text-muted leading-relaxed prose prose-sm dark:prose-invert">
              {pageData?.vision?.[locale] ? (
                <CustomPortableText value={pageData.vision[locale]} />
              ) : (
                <p>{t('missionVision.visionDesc')}</p>
              )}
            </div>
          </RevealSection>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
              {t('values.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
              {t('values.title')}
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesFromCMS ? (pageData.values || []).map((v: any, idx: number) => {
              const IconComp = getIconComponent(v.iconName);
              return (
                <RevealSection key={idx}>
                  <div className="p-6 rounded-3xl bg-surface/80 dark:bg-card border border-border h-full space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground">{v.title?.[locale] || v.title?.en}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{v.description?.[locale] || v.description?.en}</p>
                  </div>
                </RevealSection>
              );
            }) : defaultValues.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <RevealSection key={idx}>
                  <div className="p-6 rounded-3xl bg-surface/80 dark:bg-card border border-border h-full space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground">{v.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{v.desc}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <TeamSection data={pageData?.teamSection} />

        {/* Testimonials Section */}
        <TestimonialsSection data={pageData?.testimonialsSection} />
      </div>
    </main>
  );
}
