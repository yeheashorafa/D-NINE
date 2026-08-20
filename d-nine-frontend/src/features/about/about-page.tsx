import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Sparkles, Palette, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';

export async function AboutPage() {
  const t = await getTranslations('about');

  const values = [
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
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            {t('hero.subtitle')}
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
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
          </div>
        </RevealSection>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RevealSection className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold text-brand-cyan">
              {t('missionVision.missionTitle')}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {t('missionVision.missionDesc')}
            </p>
          </RevealSection>

          <RevealSection className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">
              {t('missionVision.visionTitle')}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {t('missionVision.visionDesc')}
            </p>
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
            {values.map((v, idx) => {
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
