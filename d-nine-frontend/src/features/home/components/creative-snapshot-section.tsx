'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Play, Sparkles, Film, Palette, Scissors, ArrowRight, ArrowLeft } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Floating3DAsset } from '@/components/motion/floating-3d-asset';
import { Modal } from '@/components/ui/modal';

export interface CreativeSnapshotSectionProps {
  data?: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    stats: Array<{ value: string; label: { ar: string; en: string } }>;
    videoUrl?: string;
  };
}

export const CreativeSnapshotSection: React.FC<CreativeSnapshotSectionProps> = ({ data }) => {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const t = useTranslations('home.creativeSnapshot');
  const [showreelOpen, setShowreelOpen] = useState(false);

  // We map 'stats' from CMS to capabilities, or fallback to default
  const hasStats = data?.stats && data.stats.length > 0;
  
  const defaultCapabilities = [
    {
      icon: Palette,
      title: t('capabilities.design.title'),
      desc: t('capabilities.design.desc'),
    },
    {
      icon: Film,
      title: t('capabilities.production.title'),
      desc: t('capabilities.production.desc'),
    },
    {
      icon: Scissors,
      title: t('capabilities.editing.title'),
      desc: t('capabilities.editing.desc'),
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Capabilities (~50-55% desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan-dark dark:text-brand-cyan-light text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{t('badge')}</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {data?.title?.[locale] || t('heading')}
            </h2>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {data?.description?.[locale] || t('description')}
            </p>

            {/* 3 Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {hasStats ? data.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface/80 dark:bg-surface/50 border border-border/80 dark:border-border/50 shadow-sm backdrop-blur-sm space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-purple/10 text-brand-purple dark:text-brand-purple-light flex items-center justify-center font-bold text-lg">
                    {stat.value}
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{stat.label[locale] || stat.label.en}</h3>
                </div>
              )) : defaultCapabilities.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface/80 dark:bg-surface/50 border border-border/80 dark:border-border/50 shadow-sm backdrop-blur-sm space-y-2"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-purple/10 text-brand-purple dark:text-brand-purple-light flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{cap.title}</h3>
                    <p className="text-xs text-text-muted leading-snug">{cap.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-purple/25 hover:opacity-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan active:scale-95"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current text-white" />
                </div>
                <span>{t('ctaWatchShowreel')}</span>
              </button>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface dark:bg-surface-muted text-foreground font-bold text-sm sm:text-base border border-border hover:border-brand-cyan/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
                <span>{t('ctaExploreWork')}</span>
                {isArabic ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Link>
            </div>
          </div>

          {/* Right Column: Cinematic Video Poster & 3D Decorative Asset (~45-50% desktop) */}
          <div className="lg:col-span-5 relative">
            {/* 3D Decorative Asset */}
            <div className="absolute -top-48 right-28 z-20 hidden sm:block pointer-events-none">
              <Floating3DAsset
                variant="cube"
                size="sm"
                className="opacity-80"
              />
            </div>

            {/* Compact Video Poster Card */}
            <div
              onClick={() => setShowreelOpen(true)}
              className="group relative rounded-3xl overflow-hidden border border-border bg-slate-900 shadow-2xl cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowreelOpen(true);
                }
              }}
              aria-label={t('ctaWatchShowreel')}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/media/video/showreel-poster.jpg"
                  alt="D-NINE Showreel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                />

                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-brand flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                  <span className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    D-NINE SHOWREEL
                  </span>
                  <span className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    01:45
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* Accessible Showreel Modal */}
      <Modal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        title="D-NINE Showreel"
        maxWidth="4xl"
      >
        <div className="relative aspect-[16/9] w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
          <video
            src="/media/video/showreel.mp4"
            poster="/media/video/showreel-poster.jpg"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            <track kind="captions" src="" label="English" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </section>
  );
};
