'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Play } from 'lucide-react';
import { ProjectItem } from '@/types/project';

export interface WorkCardProps {
  project: ProjectItem;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const isVideoProject = project.primaryCategorySlug === 'video-production' || project.primaryCategorySlug === 'short-video-reels';

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-surface dark:bg-card border border-border/80 hover:border-brand-cyan/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Image
          src={project.image}
          alt={isArabic ? project.title.ar : project.title.en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isVideoProject && (
          <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
              {isArabic ? project.category.ar : project.category.en}
            </span>
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
          </div>

          <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {isArabic ? project.title.ar : project.title.en}
          </h3>

          <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
            {isArabic ? project.summary.ar : project.summary.en}
          </p>
        </div>

        <div className="pt-4">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-foreground group-hover:text-brand-cyan transition-colors"
          >
            <span>{isArabic ? 'عرض تفاصيل المشروع' : 'View Project Details'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
