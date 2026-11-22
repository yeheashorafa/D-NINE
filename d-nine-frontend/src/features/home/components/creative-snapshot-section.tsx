'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Play,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Floating3DAsset } from '@/components/motion/floating-3d-asset';
import { Modal } from '@/components/ui/modal';
import type { SanityHomePageDoc } from '@/sanity/types';
import type { SectorContent } from '@/features/sectors/sector-content';
import { SectorCards } from '@/features/sectors/sector-cards';
import type { ContentCategory } from '@/types/category';

export interface CreativeSnapshotSectionProps {
  data?: NonNullable<SanityHomePageDoc['creativeSnapshot']>;
  sectors?: SectorContent[];
  /** Legacy test/caller compatibility; sector cards are now the public taxonomy. */
  categories?: ContentCategory[];
}

export const CreativeSnapshotSection: React.FC<CreativeSnapshotSectionProps> = ({
  data,
  sectors = [],
  categories,
}) => {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const t = useTranslations('home.creativeSnapshot');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const closeShowreel = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setShowreelOpen(false);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Top Split: Introduction & Cinematic Showreel Poster */}
        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Badge, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan-dark dark:text-brand-cyan-light text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{data?.badge?.[locale] || t('badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {data?.title?.[locale] || t('heading')}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {data?.description?.[locale] || t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {data?.videoUrl && (
                <button
                  type="button"
                  onClick={() => setShowreelOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-purple/25 hover:opacity-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan active:scale-95"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current text-white" />
                  </div>
                  <span>{data?.ctaWatchShowreel?.[locale] || t('ctaWatchShowreel')}</span>
                </button>
              )}

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface dark:bg-surface-muted text-foreground font-bold text-sm sm:text-base border border-border hover:border-brand-cyan/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              >
                <span>{data?.ctaExploreWork?.[locale] || t('ctaExploreWork')}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>

          {/* Right Column: Showreel Video Poster Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-36 right-20 z-20 hidden sm:block pointer-events-none">
              <Floating3DAsset variant="cube" size="sm" className="opacity-80" />
            </div>

            <div
              onClick={() => {
                if (data?.videoUrl) setShowreelOpen(true);
              }}
              className="group relative rounded-3xl overflow-hidden border border-border bg-slate-900 shadow-2xl cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && data?.videoUrl) {
                  e.preventDefault();
                  setShowreelOpen(true);
                }
              }}
              aria-label={data?.ctaWatchShowreel?.[locale] || t('ctaWatchShowreel')}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={data?.videoThumbnail || '/media/video/showreel-poster.jpg'}
                  alt="D-NINE Showreel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {data?.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-brand flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                  <span className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-bold">
                    {data?.videoBadgeText?.[locale] || 'D-NINE SHOWREEL'}
                  </span>
                  {data?.videoDuration && (
                    <span className="bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {data.videoDuration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Two main sectors replace the previous eight service cards. */}
        {sectors.length > 0 && (
          <RevealSection className="pt-6">
            <SectorCards sectors={sectors} />
          </RevealSection>
        )}
        {sectors.length === 0 && categories && categories.length > 0 && (
          <RevealSection className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category) => <Link key={category.slug} href={category.targetLink || `/work?category=${category.slug}`} className="p-5 rounded-3xl border border-border bg-surface"><h3 className="font-extrabold text-foreground">{category.title[locale]}</h3></Link>)}
            </div>
          </RevealSection>
        )}
      </div>

      {/* Accessible Showreel Modal */}
      <Modal
        isOpen={showreelOpen}
        onClose={closeShowreel}
        title="D-NINE Showreel"
        maxWidth="4xl"
      >
        <div className="relative mx-auto aspect-video max-h-[78dvh] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            ref={videoRef}
            src={data?.videoUrl || '/media/video/showreel.mp4'}
            poster={data?.videoThumbnail || '/media/video/showreel-poster.jpg'}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </section>
  );
};
