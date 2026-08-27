import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { getAboutPageData } from '@/services/content/about.service';
import { Sparkles, Palette, Award, ShieldCheck, HeartHandshake, Code, Camera, Video, PenTool } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';

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
  const pageData = await getAboutPageData();

  const valuesFromCMS = pageData.values.items && pageData.values.items.length > 0;

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
            <span>{pageData.hero.badge[locale] || t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {pageData.hero.title[locale] || t('hero.title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            {pageData.hero.subtitle[locale] || t('hero.subtitle')}
          </p>
        </RevealSection>

        {/* Agency Story */}
        <RevealSection className="p-8 sm:p-12 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple uppercase tracking-wider">
            <span>{pageData.story.badge[locale] || t('story.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {pageData.story.title[locale] || t('story.title')}
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed text-base sm:text-lg">
            {pageData.story.paragraphs[locale] && pageData.story.paragraphs[locale].length > 0 ? (
              pageData.story.paragraphs[locale].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))
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
              {pageData.mission.title[locale] || t('missionVision.missionTitle')}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {pageData.mission.description[locale] || t('missionVision.missionDesc')}
            </p>
          </RevealSection>

          <RevealSection className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">
              {pageData.vision.title[locale] || t('missionVision.visionTitle')}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {pageData.vision.description[locale] || t('missionVision.visionDesc')}
            </p>
          </RevealSection>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
              {pageData.values.badge[locale] || t('values.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
              {pageData.values.title[locale] || t('values.title')}
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesFromCMS ? pageData.values.items.map((v, idx) => {
              const IconComp = getIconComponent(v.icon);
              return (
                <RevealSection key={idx}>
                  <div className="p-6 rounded-3xl bg-surface/80 dark:bg-card border border-border h-full space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground">{v.title[locale] || v.title.en}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{v.description[locale] || v.description.en}</p>
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
      </div>
    </main>
  );
}
