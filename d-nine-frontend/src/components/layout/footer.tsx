import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { getServices } from '@/services/content/services.service';
import { SiteSettings } from '@/services/content/settings.service';
import { siteConfig } from '@/config/site.config';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export interface FooterProps {
  settings?: SiteSettings;
}

export async function Footer({ settings }: FooterProps) {
  const t = await getTranslations();
  const locale = await getLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  const services = await getServices();

  const quickLinks = settings?.footerColumns && settings.footerColumns.length > 0
    ? settings.footerColumns[0].links.map(link => ({ href: link.href, label: link.label[locale] || link.label.en }))
    : [
        { href: '/', label: t('nav.home') },
        { href: '/about', label: t('nav.about') },
        { href: '/services', label: t('nav.services') },
        { href: '/work', label: t('nav.work') },
        { href: '/blog', label: t('nav.blog') },
        { href: '/contact', label: t('nav.contact') },
      ];

  const tagline = settings?.footerDescription 
    ? settings.footerDescription[locale] || settings.footerDescription.en || t('footer.tagline')
    : t('footer.tagline');

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-cyan/5 dark:bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="footer" />
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              {tagline}
            </p>
            <div className="flex items-center gap-3">
              {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                settings.socialLinks.map(social => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors shadow-sm dark:shadow-none uppercase text-xs font-bold"
                  >
                    {social.platform}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors shadow-sm dark:shadow-none"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                    </svg>
                  </a>
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-purple hover:border-brand-purple/40 transition-colors shadow-sm dark:shadow-none"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors shadow-sm dark:shadow-none"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-950 dark:text-white font-bold text-base mb-4 tracking-wide uppercase">
              {settings?.footerColumns?.[0]?.title?.[locale] || t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-slate-950 dark:text-white font-bold text-base mb-4 tracking-wide uppercase">
              {settings?.footerColumns?.[1]?.title?.[locale] || t('footer.services')}
            </h3>
            <ul className="space-y-3 text-sm">
              {settings?.footerColumns?.[1] ? (
                settings.footerColumns[1].links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label[locale] || link.label.en}</span>
                    </Link>
                  </li>
                ))
              ) : (
                services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{service.title[locale as 'ar' | 'en']}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-slate-950 dark:text-white font-bold text-base mb-4 tracking-wide uppercase">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  {settings?.locations?.[locale]?.[0] || (isArabic
                    ? siteConfig.contact.locations.ar
                    : siteConfig.contact.locations.en)}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-cyan shrink-0" />
                <a
                  href={settings?.phoneHref || siteConfig.contact.phone.href}
                  dir="ltr"
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  {settings?.phoneDisplay || siteConfig.contact.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-cyan shrink-0" />
                <a
                  href={`mailto:${settings?.email || siteConfig.contact.email}`}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  {settings?.email || siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{settings?.copyrightText?.[locale] || t('footer.allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
