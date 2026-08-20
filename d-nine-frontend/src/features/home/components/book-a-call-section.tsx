'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { RevealSection } from '@/components/motion/reveal-section';
import { ArrowUpRight } from 'lucide-react';
import { getButtonClasses } from '@/components/ui/button';

export const BookACallSection: React.FC = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('home.bookACall');

  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse / Pointer Parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    damping: 45,
    stiffness: 350,
  };

  const x1 = useSpring(
    useTransform(mouseX, [0, 1], [-20, 20]),
    springConfig
  );

  const y1 = useSpring(
    useTransform(mouseY, [0, 1], [-20, 20]),
    springConfig
  );

  const x2 = useSpring(
    useTransform(mouseX, [0, 1], [25, -25]),
    springConfig
  );

  const y2 = useSpring(
    useTransform(mouseY, [0, 1], [25, -25]),
    springConfig
  );

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width;
    const pointerY = (event.clientY - rect.top) / rect.height;

    mouseX.set(pointerX);
    mouseY.set(pointerY);
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion) return;

    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden bg-[var(--book-call-bg,#fdfbf7)] py-20 transition-colors duration-500 dark:bg-[#0B1626] lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="relative overflow-hidden rounded-[3rem] border border-slate-200/80 bg-[var(--book-call-card-bg,#ffffff)] p-10 text-center shadow-2xl transition-colors duration-500 dark:border-slate-800 dark:bg-[#0F1D30] md:p-16 lg:p-24">
            {/* Background Radial Glow */}
            <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30">
              <div className="absolute left-0 top-0 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400/20 via-brand-purple/10 to-transparent blur-3xl" />

              <div className="absolute bottom-0 right-0 h-[35rem] w-[35rem] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-brand-cyan/20 via-blue-500/10 to-transparent blur-3xl" />
            </div>

            {/* Dynamic Bezier Animated Curved Lines */}
            {!prefersReducedMotion && (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-30 dark:opacity-40"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d={
                    isArabic
                      ? 'M100,20 Q60,90 0,30'
                      : 'M0,20 Q40,90 100,30'
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  className="text-amber-500 dark:text-amber-400"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.2,
                    ease: 'easeInOut',
                  }}
                />

                <motion.path
                  d={
                    isArabic
                      ? 'M100,75 Q40,10 0,80'
                      : 'M0,75 Q60,10 100,80'
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  className="text-brand-cyan"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.2,
                    delay: 0.4,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            )}

            {/* Orange Star Icon */}
            <motion.div
              style={{
                x: prefersReducedMotion ? 0 : x1,
                y: prefersReducedMotion ? 0 : y1,
              }}
              className={`pointer-events-none absolute top-8 hidden h-24 w-24 md:block lg:h-28 lg:w-28 ${
                isArabic
                  ? 'right-8 lg:right-12'
                  : 'left-8 lg:left-12'
              }`}
              aria-hidden="true"
            >
              <Image
                src="/media/3d/star-icon.webp"
                alt=""
                fill
                className="object-contain drop-shadow-xl"
                sizes="112px"
              />
            </motion.div>

            {/* Blue Plane Icon */}
            <motion.div
              style={{
                x: prefersReducedMotion ? 0 : x2,
                y: prefersReducedMotion ? 0 : y2,
              }}
              className={`pointer-events-none absolute bottom-8 hidden h-28 w-28 md:block lg:h-32 lg:w-32 ${
                isArabic
                  ? 'left-8 lg:left-12'
                  : 'right-8 lg:right-12'
              }`}
              aria-hidden="true"
            >
              <Image
                src="/media/3d/plan-icon.webp"
                alt=""
                fill
                className="object-contain drop-shadow-xl"
                sizes="128px"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="relative z-10 mx-auto flex max-w-2xl flex-col items-center space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.h2
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl"
              >
                {t('title')}
              </motion.h2>

              <motion.p
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg md:text-xl"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  className={getButtonClasses({
                    variant: 'dark',
                    size: 'lg',
                    className:
                      'gap-2 rounded-full px-9 py-4 text-base font-extrabold shadow-2xl transition-all hover:scale-105',
                  })}
                >
                  <span>{t('cta')}</span>

                  <ArrowUpRight
                    className={`h-5 w-5 ${
                      isArabic ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};