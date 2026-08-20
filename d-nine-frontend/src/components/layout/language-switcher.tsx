'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const locale = useLocale();
  const t = useTranslations('nav');

  const handleLanguageChange = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;

      // Replace leading locale segment (/ar or /en)
      let newPathname = pathname;
      if (pathname.startsWith(`/${locale}`)) {
        newPathname = `/${nextLocale}${pathname.slice(locale.length + 1)}`;
      } else {
        newPathname = `/${nextLocale}${pathname}`;
      }

      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `${newPathname}${search}${hash}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-purple dark:hover:text-brand-cyan rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple/40 ${className}`}
      aria-label={`Switch to ${locale === 'ar' ? 'English' : 'العربية'}`}
    >
      <Globe className="w-3.5 h-3.5 text-brand-purple dark:text-brand-cyan" />
      <span>{t('switchLang')}</span>
    </button>
  );
};

