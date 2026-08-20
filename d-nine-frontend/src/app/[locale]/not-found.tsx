import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-background">
      <h1 className="text-6xl font-black text-brand-cyan mb-4 font-mono">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('title')}</h2>
      <p className="text-text-muted text-sm sm:text-base max-w-md mb-8">{t('desc')}</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-brand text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all"
      >
        {t('homeBtn')}
      </Link>
    </main>
  );
}
