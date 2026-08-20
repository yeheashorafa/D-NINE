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

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`relative p-2 text-slate-700 dark:text-slate-200 hover:text-brand-cyan dark:hover:text-brand-cyan rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 ${className}`}
      aria-label={t(isDark ? 'switchToLight' : 'switchToDark')}
      title={t(isDark ? 'switchToLight' : 'switchToDark')}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-700" />
      )}
    </button>
  );
};
