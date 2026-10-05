'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageSquareQuote } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Card } from '@/components/ui/card';
import { TestimonialItem } from '@/types/testimonial';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { SwiperCarouselNavigation } from '@/components/ui/carousel-navigation';
import { useReducedMotion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';

interface TestimonialsSectionProps {
  data?: {
    enabled?: boolean;
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
    selectedTestimonials?: TestimonialItem[];
    maxItems?: number;
    maxCount?: number;
  };
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const swiperRef = React.useRef<import('swiper').Swiper | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('home.testimonials');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';

  if (data?.enabled === false) return null;
  const allItems = data?.selectedTestimonials || [];
  const max = data?.maxCount || data?.maxItems || allItems.length;
  const items = allItems.slice(0, max);
  if (items.length === 0) return null;

  const isSingle = items.length === 1;

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300 overflow-hidden">
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

        <div
          className="relative group"
          onFocusCapture={() => swiperRef.current?.autoplay?.pause()}
          onBlurCapture={() => swiperRef.current?.autoplay?.resume()}
        >
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            modules={[Pagination, A11y, Autoplay, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation={false}
            pagination={!isSingle ? { clickable: true } : false}
            autoplay={!isSingle && !prefersReducedMotion ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            speed={prefersReducedMotion ? 0 : 300}
            loop={!isSingle && items.length > 3}
            keyboard={{ enabled: true, onlyInViewport: true }}
            dir={isArabic ? 'rtl' : 'ltr'}
            watchOverflow={true}
            className="!pb-16 motion-reduce:transition-none"
            a11y={{
              prevSlideMessage: tCommon('carousel.prev'),
              nextSlideMessage: tCommon('carousel.next'),
              paginationBulletMessage: tCommon('carousel.pagination') + ' {{index}}',
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
                        <Image src={item.image} alt={item.imageAlt?.[isArabic ? 'ar' : 'en'] || item.personName?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'صورة العميل' : 'Client photo')} fill className="object-cover" sizes="48px" />
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
            <SwiperCarouselNavigation hidden={isSingle} className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between z-10 pointer-events-none px-2 sm:px-4 md:-mx-4 lg:-mx-6 w-[calc(100%+16px)] sm:w-[calc(100%+32px)] md:w-[calc(100%+32px)] lg:w-[calc(100%+48px)] -ml-2 sm:-ml-4 md:ml-0 lg:ml-0" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};
