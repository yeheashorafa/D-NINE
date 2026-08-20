'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';

interface SliderNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  currentSlide?: number;
  totalSlides?: number;
  className?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  variant?: 'circle' | 'capsule';
}

export const SliderNav: React.FC<SliderNavProps> = ({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  currentSlide,
  totalSlides,
  className = '',
  prevAriaLabel,
  nextAriaLabel,
  variant = 'circle'
}) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const defaultPrevLabel = isRtl ? 'الشريحة السابقة' : 'Previous slide';
  const defaultNextLabel = isRtl ? 'الشريحة التالية' : 'Next slide';

  const renderArrowLeft = () => (
    <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
  );

  const renderArrowRight = () => (
    <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
  );

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {typeof currentSlide === 'number' && typeof totalSlides === 'number' && (
        <div className="px-3 py-1 rounded-full text-xs font-extrabold tracking-widest bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-cyan-400 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
          {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      )}

      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label={prevAriaLabel || defaultPrevLabel}
        className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
          variant === 'circle' ? 'w-11 h-11 rounded-full' : 'px-4 py-2 rounded-full'
        } ${
          prevDisabled
            ? 'opacity-40 cursor-not-allowed bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 text-slate-400 dark:text-slate-600'
            : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 text-slate-800 dark:text-slate-100 hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-cyan hover:text-white hover:border-transparent hover:scale-105 active:scale-95 shadow-md hover:shadow-cyan-500/20 backdrop-blur-md'
        }`}
      >
        {isRtl ? renderArrowRight() : renderArrowLeft()}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label={nextAriaLabel || defaultNextLabel}
        className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
          variant === 'circle' ? 'w-11 h-11 rounded-full' : 'px-4 py-2 rounded-full'
        } ${
          nextDisabled
            ? 'opacity-40 cursor-not-allowed bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/40 dark:border-slate-700/40 text-slate-400 dark:text-slate-600'
            : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 text-slate-800 dark:text-slate-100 hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-cyan hover:text-white hover:border-transparent hover:scale-105 active:scale-95 shadow-md hover:shadow-cyan-500/20 backdrop-blur-md'
        }`}
      >
        {isRtl ? renderArrowLeft() : renderArrowRight()}
      </button>
    </div>
  );
};