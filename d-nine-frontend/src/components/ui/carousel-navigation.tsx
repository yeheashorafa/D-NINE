'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'motion/react';
import { useSwiper } from 'swiper/react';

export interface CarouselNavigationProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
  variant?: 'default' | 'hero';
  hidden?: boolean;
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className,
  variant = 'default',
  hidden = false,
}) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();

  if (hidden) return null;

  const defaultPrevLabel = isRtl ? 'الشريحة السابقة' : 'Previous slide';
  const defaultNextLabel = isRtl ? 'الشريحة التالية' : 'Next slide';

  const renderArrowLeft = () => (
    <ChevronLeft className={cn("w-5 h-5", !prefersReducedMotion && "transition-transform duration-300 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5")} />
  );

  const renderArrowRight = () => (
    <ChevronRight className={cn("w-5 h-5", !prefersReducedMotion && "transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5")} />
  );

  const buttonBaseClass = cn(
    "group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full",
    "transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2",
    "min-w-[44px] min-h-[44px] pointer-events-auto", // Accessible touch target
    !prefersReducedMotion && "active:scale-95"
  );

  const defaultVariantClass = cn(
    "bg-background/80 border border-border text-foreground shadow-sm backdrop-blur-md",
    "hover:bg-gradient-to-r hover:from-brand-purple/10 hover:to-brand-cyan/10 hover:border-brand-cyan/30",
    "dark:bg-slate-900/80 dark:border-white/10 dark:hover:border-brand-cyan/40",
    !prefersReducedMotion && "hover:shadow-lg hover:shadow-brand-cyan/10"
  );

  const heroVariantClass = cn(
    "bg-white/10 border border-white/20 text-white backdrop-blur-md",
    "hover:bg-white/20 hover:border-white/30",
    !prefersReducedMotion && "hover:shadow-lg hover:shadow-brand-cyan/20"
  );

  const disabledClass = "opacity-40 cursor-not-allowed hover:bg-transparent hover:border-border hover:shadow-none pointer-events-none";

  return (
    <div className={cn("inline-flex items-center gap-3 sm:gap-4 select-none", className)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label={defaultPrevLabel}
        className={cn(
          "swiper-button-prev",
          buttonBaseClass,
          variant === 'hero' ? heroVariantClass : defaultVariantClass,
          prevDisabled && disabledClass
        )}
      >
        {isRtl ? renderArrowRight() : renderArrowLeft()}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label={defaultNextLabel}
        className={cn(
          "swiper-button-next",
          buttonBaseClass,
          variant === 'hero' ? heroVariantClass : defaultVariantClass,
          nextDisabled && disabledClass
        )}
      >
        {isRtl ? renderArrowLeft() : renderArrowRight()}
      </button>
    </div>
  );
};

export const SwiperCarouselNavigation: React.FC<Omit<CarouselNavigationProps, 'onPrev' | 'onNext' | 'prevDisabled' | 'nextDisabled'>> = (props) => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
  const [isEnd, setIsEnd] = useState(swiper.isEnd);
  const [isLocked, setIsLocked] = useState(swiper.isLocked);

  useEffect(() => {
    const handleUpdate = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      setIsLocked(swiper.isLocked);
    };
    
    swiper.on('slideChange', handleUpdate);
    swiper.on('update', handleUpdate);
    swiper.on('resize', handleUpdate);
    
    return () => {
      swiper.off('slideChange', handleUpdate);
      swiper.off('update', handleUpdate);
      swiper.off('resize', handleUpdate);
    };
  }, [swiper]);

  if (isLocked || props.hidden) return null;

  return (
    <CarouselNavigation
      {...props}
      onPrev={() => swiper.slidePrev()}
      onNext={() => swiper.slideNext()}
      prevDisabled={isBeginning && !swiper.params.loop}
      nextDisabled={isEnd && !swiper.params.loop}
    />
  );
};
