'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ProjectMedia } from '@/types/media';

export interface ProjectGalleryProps {
  media?: ProjectMedia[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ media }) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-8 my-10">
      {media.map((item, idx) => {
        if (item.type === 'video') {
          return (
            <div
              key={idx}
              className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-border"
            >
              <video
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                {item.captions && <track kind="captions" src={item.captions} label="English" />}
              </video>
            </div>
          );
        }

        const altText =
          typeof item.alt === 'object'
            ? isArabic
              ? item.alt.ar
              : item.alt.en
            : item.alt || 'Project Media';

        return (
          <div key={idx} className="space-y-2">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-lg">
              <Image
                src={item.src}
                alt={altText}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            {item.caption && (
              <p className="text-xs sm:text-sm text-text-muted text-center italic">
                {isArabic ? item.caption.ar : item.caption.en}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
