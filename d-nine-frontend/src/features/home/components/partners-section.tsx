'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Handshake } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/keyboard';

import { RevealSection } from '@/components/motion/reveal-section';
import { SwiperCarouselNavigation } from '@/components/ui/carousel-navigation';
import { PartnerItem } from '@/types/partner';

export interface PartnersSectionProps {
  partners?: PartnerItem[];
  header?: {
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
  };
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners = [],
  header,
}) => {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();
  const swiperRef = React.useRef<SwiperClass | null>(null);
  const pauseReasonsRef = React.useRef<Set<string>>(new Set());
  const interactionTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const cleanupListenersRef = React.useRef<(() => void) | null>(null);

  // Display all published partners with valid logo and name (ignoring legacy active field)
  const activePartners = (partners || []).filter((p) => p && p.logo && (p.name?.ar || p.name?.en));

  // Dynamically pause/resume if prefersReducedMotion changes at runtime
  const prevReducedMotionRef = React.useRef(prefersReducedMotion);
  React.useEffect(() => {
    if (prevReducedMotionRef.current === prefersReducedMotion) {
      return;
    }
    prevReducedMotionRef.current = prefersReducedMotion;

    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    if (prefersReducedMotion) {
      if (typeof swiper.autoplay.pause === 'function') {
        swiper.autoplay.pause();
      }
      if (typeof swiper.autoplay.stop === 'function') {
        swiper.autoplay.stop();
      }
    } else if (pauseReasonsRef.current.size === 0) {
      if (typeof swiper.autoplay.resume === 'function') {
        swiper.autoplay.resume();
      }
      if (typeof swiper.autoplay.start === 'function') {
        swiper.autoplay.start();
      }
    }
  }, [prefersReducedMotion]);

  // Clean up any pending timer and listeners on unmount
  React.useEffect(() => {
    return () => {
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
        interactionTimerRef.current = null;
      }
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current();
        cleanupListenersRef.current = null;
      }
    };
  }, []);

  const pauseAutoplay = React.useCallback((reason: 'hover' | 'focus' | 'interaction') => {
    pauseReasonsRef.current.add(reason);
    const swiper = swiperRef.current;
    if (swiper && swiper.autoplay) {
      if (typeof swiper.autoplay.pause === 'function') {
        swiper.autoplay.pause();
      }
      if (typeof swiper.autoplay.stop === 'function') {
        swiper.autoplay.stop();
      }
    }
  }, []);

  const resumeAutoplay = React.useCallback((reason: 'hover' | 'focus' | 'interaction') => {
    pauseReasonsRef.current.delete(reason);

    // If reduced motion is preferred or any other pause reason remains, do NOT resume
    if (prefersReducedMotion || pauseReasonsRef.current.size > 0) {
      return;
    }

    const swiper = swiperRef.current;
    if (swiper && swiper.autoplay) {
      if (typeof swiper.autoplay.resume === 'function') {
        swiper.autoplay.resume();
      }
      if (typeof swiper.autoplay.start === 'function') {
        swiper.autoplay.start();
      }
    }
  }, [prefersReducedMotion]);

  // If no partners are published or active, hide the section cleanly
  if (activePartners.length === 0) {
    return null;
  }

  const isEnoughForLoop = activePartners.length >= 6;

  return (
    <section id="partners" className="py-16 sm:py-24 relative bg-background transition-colors duration-300 overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Handshake className="w-4 h-4" aria-hidden="true" />
            <span>{header?.badge?.[locale] || header?.badge?.ar || header?.badge?.en || (isArabic ? 'شركاء النجاح' : 'Our Partners')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {header?.title?.[locale] || header?.title?.ar || header?.title?.en || (isArabic ? 'شركاء نفخر بالعمل معهم' : 'Partners We Are Proud to Work With')}
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            {header?.subtitle?.[locale] || header?.subtitle?.ar || header?.subtitle?.en || (isArabic
              ? 'نعتز بالثقة التي أولتنا إياها نخبة من العلامات التجارية والمؤسسات الرائدة'
              : 'Trusted by ambitious brands and forward-thinking enterprises across the region')}
          </p>
        </RevealSection>

        {/* Partners Logos & Names Carousel */}
        <RevealSection>
          <div
            className="relative group px-1 sm:px-2"
            onMouseEnter={() => pauseAutoplay('hover')}
            onMouseLeave={() => resumeAutoplay('hover')}
          >
            <Swiper
              modules={[Autoplay, A11y, Keyboard]}
              spaceBetween={24}
              slidesPerView={2}
              loop={isEnoughForLoop}
              autoplay={
                prefersReducedMotion
                  ? false
                  : {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: false,
                    }
              }
              keyboard={{ enabled: true, onlyInViewport: true }}
              dir={isArabic ? 'rtl' : 'ltr'}
              watchOverflow={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                const el = swiper.el;
                if (!el) return;

                // Safe pause on focus inside carousel, resume on blur
                const handleFocusIn = () => {
                  pauseAutoplay('focus');
                };

                const handleFocusOut = (e: FocusEvent) => {
                  if (!el.contains(e.relatedTarget as Node)) {
                    resumeAutoplay('focus');
                  }
                };

                el.addEventListener('focusin', handleFocusIn);
                el.addEventListener('focusout', handleFocusOut);

                // Store cleanup in ref for safe unmount
                cleanupListenersRef.current = () => {
                  el.removeEventListener('focusin', handleFocusIn);
                  el.removeEventListener('focusout', handleFocusOut);
                };
              }}
              onDestroy={() => {
                if (cleanupListenersRef.current) {
                  cleanupListenersRef.current();
                  cleanupListenersRef.current = null;
                }
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 32,
                },
              }}
              className="!pb-4 !pt-2"
            >
              {activePartners.map((partner) => {
                const partnerName = partner.name?.[locale] || partner.name?.[isArabic ? 'ar' : 'en'] || partner.name?.en || partner.name?.ar || 'Partner';
                const logoAlt =
                  partner.logoAlt?.[locale] ||
                  partner.logoAlt?.ar ||
                  partner.logoAlt?.en ||
                  partnerName;

                return (
                  <SwiperSlide key={partner.id} className="h-auto">
                    <div
                      className="relative w-full h-36 sm:h-40 p-4 rounded-2xl bg-surface/60 dark:bg-card/60 border border-border/60 hover:border-brand-cyan/40 hover:bg-surface hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between grayscale hover:grayscale-0 opacity-85 hover:opacity-100 group select-none"
                    >
                      {/* Logo */}
                      <div className="relative w-full h-20 sm:h-24 flex items-center justify-center">
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={logoAlt}
                            fill
                            className="object-contain filter transition-all duration-200"
                            sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                          />
                        ) : (
                          <Handshake className="w-8 h-8 text-brand-cyan/40" aria-hidden="true" />
                        )}
                      </div>

                      {/* Partner Name Only (Localized) */}
                      <span className="text-xs sm:text-sm font-semibold text-foreground text-center line-clamp-1 w-full px-1">
                        {partnerName}
                      </span>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="flex justify-center mt-6">
                <SwiperCarouselNavigation
                  hidden={activePartners.length <= 2}
                  onInteraction={() => {
                    pauseAutoplay('interaction');
                    if (interactionTimerRef.current) {
                      clearTimeout(interactionTimerRef.current);
                    }
                    interactionTimerRef.current = setTimeout(() => {
                      resumeAutoplay('interaction');
                      interactionTimerRef.current = null;
                    }, 4000);
                  }}
                />
              </div>
            </Swiper>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
