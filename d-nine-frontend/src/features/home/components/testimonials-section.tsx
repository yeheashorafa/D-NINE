'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageSquareQuote } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Card } from '@/components/ui/card';
import { TestimonialItem } from '@/types/testimonial';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TestimonialsSectionProps {
  data?: {
    enabled?: boolean;
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
    selectedTestimonials?: TestimonialItem[];
    maxItems?: number;
  };
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const t = useTranslations('home.testimonials');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (data?.enabled === false) return null;
  const allItems = data?.selectedTestimonials || [];
  if (allItems.length === 0) return null;

  const max = data?.maxItems || allItems.length;
  const items = allItems.slice(0, max);
  if (items.length === 0) return null;

  const isSingle = items.length === 1;

  return (
    <section className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-magenta/10 text-brand-magenta text-xs sm:text-sm font-semibold">
            <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
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
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation={!isSingle}
            pagination={!isSingle ? { clickable: true } : false}
            autoplay={!isSingle ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            loop={!isSingle && items.length > 3}
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
                <Card className="h-full bg-surface border-border flex flex-col justify-between space-y-6 cursor-grab active:cursor-grabbing p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <MessageSquareQuote className="w-8 h-8 text-brand-magenta/20" />
                      {item.rating && (
                        <div className="flex gap-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-lg text-foreground italic leading-relaxed">
                      &ldquo;{item.quote?.[isArabic ? 'ar' : 'en']}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.personName?.[isArabic ? 'ar' : 'en'] || ''} fill className="object-cover" sizes="48px" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-foreground">
                        {item.personName?.[isArabic ? 'ar' : 'en']}
                      </h4>
                      <p className="text-sm text-text-muted">
                        {item.role?.[isArabic ? 'ar' : 'en']} {item.company?.[isArabic ? 'ar' : 'en'] ? `— ${item.company[isArabic ? 'ar' : 'en']}` : ''}
                      </p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </RevealSection>
      </div>
    </section>
  );
};
