'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';

export interface Floating3DAssetProps {
  src?: string;
  variant?: 'cube' | 'torus' | 'sphere' | 'abstract';
  size?: number | 'sm' | 'md' | 'lg' | { sm?: number; md?: number; lg?: number };
  logicalPlacement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'center-start' | 'center-end';
  floatDistance?: number;
  rotationRange?: number;
  responsiveVisibility?: string;
  className?: string;
}

export const Floating3DAsset: React.FC<Floating3DAssetProps> = ({
  src,
  variant = 'cube',
  size = 240,
  logicalPlacement = 'top-end',
  floatDistance = 18,
  rotationRange = 5,
  responsiveVisibility = 'hidden lg:block',
  className = '',
}) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();

  // Resolve size
  let pxSize = 240;
  if (typeof size === 'number') {
    pxSize = size;
  } else if (typeof size === 'string') {
    if (size === 'sm') pxSize = 140;
    else if (size === 'md') pxSize = 240;
    else if (size === 'lg') pxSize = 360;
  } else if (size && typeof size === 'object') {
    pxSize = size.lg || 240;
  }

  // Resolve image asset src from existing public/media/3d assets
  const variantAssetMap: Record<string, string> = {
    cube: '/media/3d/expertise-creativity.webp',
    torus: '/media/3d/stronger-branding.webp',
    sphere: '/media/3d/strategic-impact.webp',
    abstract: '/media/3d/convert-designs.webp',
  };
  const defaultAsset = variantAssetMap[variant] || '/media/3d/expertise-creativity.webp';
  const imageSrc = src || defaultAsset;

  const getPlacementClasses = () => {
    switch (logicalPlacement) {
      case 'top-start':
        return `top-12 ${isArabic ? 'right-6 lg:right-16' : 'left-6 lg:left-16'}`;
      case 'top-end':
        return `top-12 ${isArabic ? 'left-6 lg:left-16' : 'right-6 lg:right-16'}`;
      case 'bottom-start':
        return `bottom-12 ${isArabic ? 'right-6 lg:right-16' : 'left-6 lg:left-16'}`;
      case 'bottom-end':
        return `bottom-12 ${isArabic ? 'left-6 lg:left-16' : 'right-6 lg:right-16'}`;
      case 'center-start':
        return `top-1/2 -translate-y-1/2 ${isArabic ? 'right-6 lg:right-16' : 'left-6 lg:left-16'}`;
      case 'center-end':
        return `top-1/2 -translate-y-1/2 ${isArabic ? 'left-6 lg:left-16' : 'right-6 lg:right-16'}`;
      default:
        return `top-12 ${isArabic ? 'left-6 lg:left-16' : 'right-6 lg:right-16'}`;
    }
  };

  const placementClasses = getPlacementClasses();

  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute z-0 pointer-events-none ${placementClasses} ${responsiveVisibility} ${className}`}
        aria-hidden="true"
        style={{ width: pxSize, height: pxSize }}
      >
        <Image
          src={imageSrc}
          alt=""
          width={pxSize}
          height={pxSize}
          className="object-contain drop-shadow-2xl"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute z-0 pointer-events-none ${placementClasses} ${responsiveVisibility} ${className}`}
      animate={{
        y: [0, floatDistance, 0],
        rotate: [0, rotationRange, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
      style={{ width: pxSize, height: pxSize }}
    >
      <Image
        src={imageSrc}
        alt=""
        width={pxSize}
        height={pxSize}
        className="object-contain drop-shadow-2xl"
        aria-hidden="true"
      />
    </motion.div>
  );
};
