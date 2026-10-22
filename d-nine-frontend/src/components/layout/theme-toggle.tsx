'use client';

import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const emptySubscribe = () => () => {};

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/30 dark:border-slate-700/30 ${className}`} aria-hidden="true" />
    );
  }

  const cycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';
  const actionLabel = t(isDark ? 'switchToLight' : 'switchToDark');
  const shortLabel = t(isDark ? 'lightMode' : 'darkMode');

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`relative inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white/90 px-2.5 text-xs font-bold text-slate-800 shadow-sm transition-all hover:border-brand-cyan hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100 ${className}`}
      aria-label={actionLabel}
      title={actionLabel}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-700" />
      )}
      <span className="hidden min-[480px]:inline" aria-hidden="true">
        {shortLabel}
      </span>
    </button>
  );
};
