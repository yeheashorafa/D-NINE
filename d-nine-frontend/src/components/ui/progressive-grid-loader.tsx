'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useReducedMotion } from 'motion/react';

export interface ProgressiveGridLoaderProps {
  isLoading: boolean;
  label?: string;
  sentinelRef?: React.Ref<HTMLDivElement>;
}

export const ProgressiveGridLoader: React.FC<ProgressiveGridLoaderProps> = ({
  isLoading,
  label,
  sentinelRef,
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();

  const defaultLabel = isArabic ? 'جاري تحميل المزيد...' : 'Loading more items...';
  const displayLabel = label || defaultLabel;

  return (
    <div
      ref={sentinelRef}
      className="w-full py-10 flex flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      {isLoading && (
        <>
          {/* Pexels-inspired dual-dot bouncing loader */}
          <div className="relative flex items-center justify-center w-12 h-6" aria-hidden="true">
            {prefersReducedMotion ? (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-cyan" />
                <span className="w-4 h-4 rounded-full bg-brand-purple" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Dot 1: Brand Cyan */}
                <span className="w-3 h-3 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.3s] shadow-sm shadow-brand-cyan/50" />
                {/* Dot 2: Larger Brand Purple */}
                <span className="w-4 h-4 rounded-full bg-brand-purple animate-bounce [animation-delay:-0.15s] shadow-sm shadow-brand-purple/50" />
              </div>
            )}
          </div>

          <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 select-none">
            {displayLabel}
          </span>
        </>
      )}
    </div>
  );
};
