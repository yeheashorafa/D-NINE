'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from './logo';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import { getButtonClasses } from '@/components/ui/button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Handle header scroll backdrop state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock, escape key & focus restoration
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          toggleBtnRef.current?.focus();
        }

        // Focus trap
        if (e.key === 'Tab' && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
    toggleBtnRef.current?.focus();
  };


  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/work', label: t('work') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/' || pathname === ''
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-extrabold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    isActive
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Language, Theme Toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />


            {/* Desktop Contact CTA */}
            <div className="hidden sm:block">
              <Link
                href="/contact"
                className={getButtonClasses({
                  variant: 'primary',
                  size: 'md',
                  className: 'rounded-full font-extrabold shadow-lg shadow-brand-purple/20'
                })}
              >
                {t('contact')}
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseMenu}
              className="lg:hidden fixed inset-0 top-[73px] bg-slate-950/60 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              id="mobile-menu-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t('home')}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed inset-x-0 top-[73px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-50 transition-colors"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/' || pathname === ''
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleCloseMenu}
                      className={`px-5 py-3.5 rounded-2xl text-base font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-purple/15 to-brand-cyan/15 text-brand-purple dark:text-cyan-300 border border-brand-cyan/30'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-brand-purple dark:text-cyan-300'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      />
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
                  <Link
                    href="/contact"
                    onClick={handleCloseMenu}
                    className={getButtonClasses({
                      variant: 'primary',
                      size: 'lg',
                      className: 'w-full justify-center rounded-2xl font-extrabold shadow-xl',
                    })}
                  >
                    {t('contact')}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

