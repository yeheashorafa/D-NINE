'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ServiceOffering } from '@/types/service';

export interface ServiceOfferingCardProps {
  offering: ServiceOffering;
}

export const ServiceOfferingCard: React.FC<ServiceOfferingCardProps> = ({ offering }) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-surface dark:bg-card border border-border/80 hover:border-brand-cyan/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Image
          src={offering.image}
          alt={isArabic ? offering.title.ar : offering.title.en}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
            {offering.parentServiceSlug}
          </span>
          <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {isArabic ? offering.title.ar : offering.title.en}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed">
            {isArabic ? offering.description.ar : offering.description.en}
          </p>
        </div>

        <div className="pt-4">
          <Link
            href={`/services/${offering.parentServiceSlug}#${offering.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-foreground group-hover:text-brand-cyan transition-colors"
          >
            <span>{isArabic ? 'تفاصيل الخدمة الرئيسية' : 'Primary Service Details'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
