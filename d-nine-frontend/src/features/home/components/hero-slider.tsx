'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { Link } from '@/i18n/navigation';

/**
 * PENDING_LICENSED_DNINE_SLIDER_EXPORTS
 * Note: The slide artwork currently contains external studio marks.
 * Prior to production deployment, slide images must be replaced with official licensed D-NINE exports.
 */
export interface Slide {
  id?: string;
  _key?: string;
  image: string;
  category?: { ar?: string; en?: string };
  title?: { ar?: string; en?: string };
  description?: { ar?: string; en?: string };
  ctaText?: { ar?: string; en?: string };
  ctaLink?: string;
}

const DEFAULT_SLIDES: Slide[] = [
  { id: '1', image: '/slider/slide-01.jpg', category: { ar: 'شريحة ١', en: 'Slide 1' }, title: { ar: 'عنوان ١', en: 'Title 1' }, description: { ar: '', en: '' }, ctaText: { ar: '', en: '' }, ctaLink: '' },
  { id: '2', image: '/slider/slide-02.jpg', category: { ar: 'شريحة ٢', en: 'Slide 2' }, title: { ar: 'عنوان ٢', en: 'Title 2' }, description: { ar: '', en: '' }, ctaText: { ar: '', en: '' }, ctaLink: '' },
  { id: '3', image: '/slider/slide-03.jpg', category: { ar: 'شريحة ٣', en: 'Slide 3' }, title: { ar: 'عنوان ٣', en: 'Title 3' }, description: { ar: '', en: '' }, ctaText: { ar: '', en: '' }, ctaLink: '' },
  { id: '4', image: '/slider/slide-04.jpg', category: { ar: 'شريحة ٤', en: 'Slide 4' }, title: { ar: 'عنوان ٤', en: 'Title 4' }, description: { ar: '', en: '' }, ctaText: { ar: '', en: '' }, ctaLink: '' },
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

  const slides = data?.slides && data.slides.length > 0 ? data.slides : DEFAULT_SLIDES;

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

  const currentSlide = slides[currentIndex];

  // Clip Path Masks for Direction-Aware Reveal
  const getMaskVariant = (): Variants => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0, scale: 1 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 1, transition: { duration: 0.3 } },
      };
    }

    const isNext = direction === 'next';
    const isRtl = isArabic;

    // Direction calculation respecting RTL
    const slideFromRight = (isNext && !isRtl) || (!isNext && isRtl);

    return {
      initial: {
        clipPath: slideFromRight
          ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
          : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        scale: 1.05,
      },
      animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        scale: 1,
        transition: {
          duration: 1.0,
          ease: [0.76, 0, 0.24, 1],
        },
      },
      exit: {
        clipPath: slideFromRight
          ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
          : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        scale: 0.96,
        transition: {
          duration: 1.0,
          ease: [0.76, 0, 0.24, 1],
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
          variants={getMaskVariant()}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Dual-Layer Responsive Art-Directed Image Container */}
          {/* Layer 1: Blurred/Dimmed Background for Mobile & Ultra-Wide fill */}
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-40 blur-xl scale-110">
            <Image
              src={currentSlide.image}
              alt=""
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="pointer-events-none"
            />
          </div>

          {/* Layer 2: Sharp Un-cropped Artwork Foreground */}
          <div className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={currentSlide.image}
                alt={isArabic ? `شريحة ${currentIndex + 1}` : `Hero Slide ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1600px"
                className="pointer-events-none drop-shadow-2xl"
              />
            </div>
            
            {/* Slide Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-0 pointer-events-none">
              <div className="max-w-2xl space-y-4 pointer-events-auto drop-shadow-md">
                {currentSlide.category && (currentSlide.category.ar || currentSlide.category.en) && (
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold tracking-widest uppercase">
                    {currentSlide.category[locale] || currentSlide.category.en}
                  </span>
                )}
                
                {currentSlide.title && (currentSlide.title.ar || currentSlide.title.en) && (
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                    {currentSlide.title[locale] || currentSlide.title.en}
                  </h2>
                )}
                
                {currentSlide.description && (currentSlide.description.ar || currentSlide.description.en) && (
                  <p className="text-lg sm:text-xl text-white/90 max-w-lg leading-relaxed font-medium">
                    {currentSlide.description[locale] || currentSlide.description.en}
                  </p>
                )}
                
                {currentSlide.ctaLink && currentSlide.ctaText && (currentSlide.ctaText.ar || currentSlide.ctaText.en) && (
                  <div className="pt-4">
                    <Link
                      href={currentSlide.ctaLink}
                      className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-slate-950 font-extrabold text-sm sm:text-base hover:bg-brand-cyan hover:text-slate-950 transition-colors duration-300 shadow-xl"
                    >
                      {currentSlide.ctaText[locale] || currentSlide.ctaText.en}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color Wash Accent Overlay during Slide Transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-cyan/20 pointer-events-none z-10" />
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
