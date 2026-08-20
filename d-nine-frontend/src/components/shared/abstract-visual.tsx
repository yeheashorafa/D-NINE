'use client';

import React from 'react';

interface AbstractVisualProps {
  slug: string;
  variant?: 'purple-cyan' | 'cyan-purple' | 'dark-purple' | 'cyan-dark' | 'purple-light' | 'cyan-light';
  className?: string;
  height?: string | number;
  badgeText?: string;
}

/**
 * Deterministic hash function mapping string seed to a stable integer
 */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export const AbstractVisual: React.FC<AbstractVisualProps> = ({
  slug,
  variant = 'purple-cyan',
  className = '',
  height = '100%',
  badgeText
}) => {
  const seed = hashSeed(slug);
  
  // Stable deterministic parameters derived from seed
  const circle1X = 20 + (seed % 60);
  const circle1Y = 30 + ((seed >> 2) % 40);
  const circle1R = 80 + ((seed >> 4) % 60);

  const circle2X = 200 + ((seed >> 3) % 150);
  const circle2Y = 150 + ((seed >> 5) % 100);
  const circle2R = 100 + ((seed >> 6) % 80);

  const waveControlY1 = 80 + ((seed >> 7) % 60);
  const waveControlY2 = 180 + ((seed >> 8) % 60);

  // Gradient selection based on variant
  const getGradientColors = () => {
    switch (variant) {
      case 'cyan-purple':
        return { start: '#16B5C5', mid: '#168CA8', end: '#6D2878', bg: '#091522' };
      case 'dark-purple':
        return { start: '#4C1D63', mid: '#6D2878', end: '#168CA8', bg: '#0D0817' };
      case 'cyan-dark':
        return { start: '#16B5C5', mid: '#101426', end: '#4C1D63', bg: '#08121C' };
      case 'purple-light':
        return { start: '#6D2878', mid: '#9C36AD', end: '#16B5C5', bg: '#180B22' };
      case 'cyan-light':
        return { start: '#16B5C5', mid: '#38D4E3', end: '#6D2878', bg: '#0A1D24' };
      case 'purple-cyan':
      default:
        return { start: '#6D2878', mid: '#4C1D63', end: '#16B5C5', bg: '#100B1C' };
    }
  };

  const colors = getGradientColors();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex items-center justify-center select-none ${className}`}
      style={{ height, backgroundColor: colors.bg }}
    >
      <svg
        className="w-full h-full absolute inset-0 object-cover pointer-events-none"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} stopOpacity="0.85" />
            <stop offset="50%" stopColor={colors.mid} stopOpacity="0.75" />
            <stop offset="100%" stopColor={colors.end} stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id={`glow-${slug}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.start} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.bg} stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>

        {/* Background Subtle Grid */}
        <rect width="100%" height="100%" fill={`url(#grid-${slug})`} className="text-white" />

        {/* Ambient Glow */}
        <circle cx={circle2X} cy={circle2Y} r={circle2R * 1.5} fill={`url(#glow-${slug})`} />

        {/* Flowing Organic Wave */}
        <path
          d={`M -20 ${waveControlY1} C 100 ${waveControlY1 - 40}, 250 ${waveControlY2 + 40}, 420 ${waveControlY2} L 420 320 L -20 320 Z`}
          fill={`url(#grad-${slug})`}
          opacity="0.7"
        />

        {/* Abstract Glowing Accent Circles */}
        <circle cx={circle1X} cy={circle1Y} r={circle1R} fill={`url(#grad-${slug})`} opacity="0.4" />
        <circle
          cx={circle2X}
          cy={circle2Y}
          r={circle2R}
          stroke={colors.end}
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.3"
        />

        {/* Dynamic Abstract Lines */}
        <path
          d="M 50 250 L 350 50"
          stroke="url(#grad-${slug})"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        <path
          d="M 20 280 L 380 80"
          stroke="url(#grad-${slug})"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
      </svg>

      {/* Decorative Foreground Overlay */}
      <div className="relative z-10 p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan shadow-sm" />
        </div>
        {badgeText && (
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/15 shadow-sm">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
