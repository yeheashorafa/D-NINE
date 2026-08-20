'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ProjectMedia } from '@/types/media';

export interface ProjectMediaRendererProps {
  media: ProjectMedia;
  className?: string;
  priority?: boolean;
}

export const ProjectMediaRenderer: React.FC<ProjectMediaRendererProps> = ({
  media,
  className = '',
  priority = false,
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const altText =
    typeof media.alt === 'object'
      ? isArabic
        ? media.alt.ar
        : media.alt.en
      : media.alt || '';

  if (media.type === 'video') {
    return (
      <div className={`relative aspect-[16/9] w-full overflow-hidden bg-slate-950 ${className}`}>
        <video
          src={media.src}
          poster={media.poster}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          {media.captions && <track kind="captions" src={media.captions} label="English" />}
        </video>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden ${className}`}>
      <Image
        src={media.src}
        alt={altText}
        fill
        priority={priority}
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover"
      />
    </div>
  );
};
