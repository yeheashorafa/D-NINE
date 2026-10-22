'use client';

import React, { useState, useRef, useCallback } from 'react';
import { getImageProps } from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';

export interface Slide {
  id?: string;
  _key?: string;
  // 4 localized artwork fields
  desktopImageAr?: string;
  mobileImageAr?: string;
  desktopImageEn?: string;
  mobileImageEn?: string;
  alt?: { ar?: string; en?: string };
  active?: boolean;

  // Legacy fallback fields
  image?: string;
  imageAlt?: { ar?: string; en?: string };
  mobileImage?: string;
  mobileImageAlt?: { ar?: string; en?: string };
}

const DEFAULT_SLIDES: Slide[] = [
  { id: '1', image: '/slider/slide-01.jpg', alt: { ar: 'شريحة العرض الأولى — وكالة دي ناين الإبداعية', en: 'Hero Slide 1 — D-NINE Creative Agency' } },
  { id: '2', image: '/slider/slide-02.jpg', alt: { ar: 'شريحة العرض الثانية — الإنتاج الإعلامي وصناعة المحتوى', en: 'Hero Slide 2 — Media Production & Content Creation' } },
  { id: '3', image: '/slider/slide-03.jpg', alt: { ar: 'شريحة العرض الثالثة — الهوية البصرية والتصميم الاستراتيجي', en: 'Hero Slide 3 — Visual Identity & Strategic Design' } },
  { id: '4', image: '/slider/slide-04.jpg', alt: { ar: 'شريحة العرض الرابعة — التسويق الرقمي وإدارة الحملات', en: 'Hero Slide 4 — Digital Marketing & Campaign Management' } },
];

export interface HeroSliderProps {
  data?: {
    slides: Slide[];
  };
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ data }) => {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();

  // Filter only active slides
  const validSlides = (data?.slides || []).filter((s) => s.active !== false);
  const slides = validSlides.length > 0 ? validSlides : DEFAULT_SLIDES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [isAnimating, slides.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [isAnimating, slides.length]);

  const handleGoTo = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    },
    [isAnimating, currentIndex]
  );

  // Auto-play timer
  React.useEffect(() => {
    if (!isPlaying || prefersReducedMotion || isPaused) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prefersReducedMotion, isPaused, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (isArabic) handleNext(); else handlePrev();
    } else if (e.key === 'ArrowRight') {
      if (isArabic) handlePrev(); else handleNext();
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  // Resolve localized desktop and mobile images with robust cascading fallbacks
  const resolvedDesktopImage = isArabic
    ? (currentSlide.desktopImageAr || currentSlide.image || currentSlide.desktopImageEn || '/slider/slide-01.jpg')
    : (currentSlide.desktopImageEn || currentSlide.image || currentSlide.desktopImageAr || '/slider/slide-01.jpg');

  const resolvedMobileImage = isArabic
    ? (currentSlide.mobileImageAr || currentSlide.mobileImage || resolvedDesktopImage)
    : (currentSlide.mobileImageEn || currentSlide.mobileImage || resolvedDesktopImage);

  const resolvedAltText =
    currentSlide.alt?.[locale] ||
    currentSlide.alt?.ar ||
    currentSlide.alt?.en ||
    currentSlide.imageAlt?.[locale] ||
    currentSlide.imageAlt?.en ||
    (isArabic ? `شريحة العرض ${currentIndex + 1} — دي ناين` : `Hero Slide ${currentIndex + 1} — D-NINE`);

  // Build one responsive <picture> instead of rendering separate mobile and
  // desktop <Image> trees. This prevents the browser from discovering two
  // competing LCP candidates and keeps the first visible artwork high priority.
  const { props: mobileImageProps } = getImageProps({
    src: resolvedMobileImage,
    alt: resolvedAltText,
    fill: true,
    quality: 75,
    sizes: '100vw',
  });
  const { props: desktopImageProps } = getImageProps({
    src: resolvedDesktopImage,
    alt: resolvedAltText,
    fill: true,
    quality: 75,
    sizes: '100vw',
  });

  // Direction-aware cinematic transition. The small pan and zoom keep the
  // full-screen hero engaging without using rotation or aggressive effects.
  const getSlideVariant = (): Variants => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0, scale: 1 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 1, transition: { duration: 0.3 } },
      };
    }

    const isNext = direction === 'next';
    const entersFromRight = (isNext && !isArabic) || (!isNext && isArabic);
    const enterOffset = entersFromRight ? '2.5%' : '-2.5%';
    const exitOffset = entersFromRight ? '-1.5%' : '1.5%';

    return {
      initial: {
        opacity: 0,
        x: enterOffset,
        scale: 1.055,
      },
      animate: {
        opacity: 1,
        x: '0%',
        scale: 1,
        transition: {
          duration: 1.15,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        opacity: 0,
        x: exitOffset,
        scale: 1.015,
        transition: {
          duration: 0.75,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    };
  };

  return (
    <section
      className="relative w-full h-[100svh] overflow-hidden bg-[#0b031d] text-white select-none focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label={isArabic ? 'معرض الأعمال والمشاريع البارزة' : 'Featured Work & Agency Showcase'}
    >
      {/* Accessible Localized H1 Heading */}
      <h1 className="sr-only">
        {isArabic
          ? 'دي ناين — وكالة إبداعية متخصصة في الإنتاج الإعلامي والهوية البصرية'
          : 'D-NINE — Creative Agency Specializing in Media Production & Brand Identity'}
      </h1>

      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isArabic
          ? `الشريحة ${currentIndex + 1} من ${slides.length}`
          : `Slide ${currentIndex + 1} of ${slides.length}`}
      </div>

      {/* Main Slide Presentation Container */}
      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.div
          key={currentSlide.id || currentSlide._key || String(currentIndex)}
          variants={getSlideVariant()}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* A single responsive artwork candidate for the active viewport. */}
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={mobileImageProps.srcSet}
              sizes={mobileImageProps.sizes}
            />
            <img
              {...desktopImageProps}
              alt={resolvedAltText}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              className="pointer-events-none object-cover object-center"
            />
          </picture>

          {/* Color Wash Accent Overlay during Slide Transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-cyan/20 pointer-events-none z-10" />

          {/* A restrained light veil adds depth while the artwork settles. */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-y-0 -left-1/3 w-2/3 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10"
              initial={{ x: '-35%', opacity: 0 }}
              animate={{ x: '210%', opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top & Bottom Contrast Gradients */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b031d] via-[#0b031d]/60 to-transparent pointer-events-none z-20" />

      {/* Floating Interactive Control Dock */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Arrow Controls */}
        <div className="flex items-center gap-3">
          <CarouselNavigation 
            variant="hero" 
            onPrev={handlePrev} 
            onNext={handleNext} 
            prevDisabled={isAnimating} 
            nextDisabled={isAnimating} 
          />

          {/* Autoplay Pause / Resume Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan ml-1"
            aria-label={isPlaying ? (isArabic ? 'إيقاف التبديل التلقائي' : 'Pause slideshow') : (isArabic ? 'تشغيل التبديل التلقائي' : 'Play slideshow')}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>

        {/* Counter & Animated Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-300">
            {new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', { minimumIntegerDigits: 2 }).format(currentIndex + 1)} / {new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', { minimumIntegerDigits: 2 }).format(slides.length)}
          </span>

          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleGoTo(idx)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-10 sm:w-12 bg-white/30'
                    : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={isArabic ? `الانتقال إلى الشريحة ${idx + 1}` : `Go to slide ${idx + 1}`}
              >
                {currentIndex === idx && isPlaying && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-cyan origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                )}
                {currentIndex === idx && (!isPlaying || prefersReducedMotion) && (
                  <div className="absolute inset-0 bg-brand-cyan" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
