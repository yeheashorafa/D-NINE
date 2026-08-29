'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Users } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Card } from '@/components/ui/card';
import { TeamMemberItem } from '@/types/team';
import Image from 'next/image';
import { CustomPortableText } from '@/sanity/components/portable-text';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TeamSectionProps {
  data?: {
    enabled?: boolean;
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
    selectedTeamMembers?: TeamMemberItem[];
    maxItems?: number;
    ctaLabel?: { ar?: string; en?: string };
    ctaPath?: string;
  };
}

export const TeamSection: React.FC<TeamSectionProps> = ({ data }) => {
  const t = useTranslations('home.team');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (data?.enabled === false) return null;
  const allItems = data?.selectedTeamMembers || [];
  if (allItems.length === 0) return null;

  const max = data?.maxItems || allItems.length;
  const items = allItems.slice(0, max);
  if (items.length === 0) return null;

  const isSingle = items.length === 1;

  return (
    <section className="py-16 sm:py-24 relative bg-background transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs sm:text-sm font-semibold">
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>{data?.badge?.[isArabic ? 'ar' : 'en'] || t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {data?.title?.[isArabic ? 'ar' : 'en'] || t('title')}
          </h2>
          {(data?.subtitle?.ar || data?.subtitle?.en) && (
            <p className="text-lg text-text-muted mt-4">
              {data.subtitle[isArabic ? 'ar' : 'en']}
            </p>
          )}
        </RevealSection>

        <RevealSection>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: Math.min(items.length, 4) }
            }}
            navigation={!isSingle}
            pagination={!isSingle ? { clickable: true } : false}
            dir={isArabic ? 'rtl' : 'ltr'}
            watchOverflow={true}
            className="!pb-16"
            a11y={{
              prevSlideMessage: tCommon('carousel.prev'),
              nextSlideMessage: tCommon('carousel.next'),
              paginationBulletMessage: tCommon('carousel.pagination'),
            }}
          >
            {items.map((item, idx) => (
              <SwiperSlide key={item.id || idx} className="h-auto">
                <Card className="h-full bg-surface border-border flex flex-col items-center text-center p-6 space-y-4 cursor-grab active:cursor-grabbing">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-brand-primary/10">
                    {item.image ? (
                      <Image src={item.image} alt={item.name?.[isArabic ? 'ar' : 'en'] || ''} fill className="object-cover" sizes="128px" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                        <Users className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-xl">
                      {item.name?.[isArabic ? 'ar' : 'en']}
                    </h4>
                    <p className="text-sm font-medium text-brand-primary mt-1">
                      {item.role?.[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>
                  {item.bio && (
                    <div className="text-sm text-text-muted">
                      <CustomPortableText value={item.bio[isArabic ? 'ar' : 'en']} />
                    </div>
                  )}
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </RevealSection>
      </div>
    </section>
  );
};
