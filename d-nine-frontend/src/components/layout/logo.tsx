'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'sm' | 'md' | 'lg';
  size?: 'header' | 'footer' | 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant,
  size,
  priority = true,
}) => {
  const activeVariant = size || variant || 'header';
  // Dimensions tailored to cropped logo aspect ratio (252x107 ~ 2.355:1)
  // Header Mobile: ~118px wide (118x50)
  // Header Desktop: ~160px wide (160x68)
  // Footer: ~220px wide (220x93)
  
  const sizeClasses = {
    header: 'w-[100px] sm:w-[130px] h-auto',
    footer: 'w-[140px] sm:w-[160px] h-auto',
    sm: 'w-[95px] h-auto',
    md: 'w-[130px] h-auto',
    lg: 'w-[160px] h-auto',
  }[activeVariant];

  return (
    <Link
      href="/"
      className={`inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md transition-opacity hover:opacity-90 active:scale-95 ${className}`}
      aria-label="D-NINE — Marketing & Media"
    >
      <div className={`relative flex items-center ${sizeClasses}`}>
        {/* Light Mode Logo */}
        <Image
          src="/brand/d-nine-logo-light.png"
          alt="D-NINE — Creative Agency"
          width={252}
          height={107}
          priority={priority}
          className="w-full h-auto object-contain dark:hidden block"
        />

        {/* Dark Mode Logo */}
        <Image
          src="/brand/d-nine-logo-dark.png"
          alt="D-NINE — Creative Agency"
          width={252}
          height={107}
          priority={priority}
          className="w-full h-auto object-contain hidden dark:block"
        />
      </div>
    </Link>
  );
};
