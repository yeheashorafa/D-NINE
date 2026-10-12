/* eslint-disable @typescript-eslint/no-explicit-any */
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { siteConfig } from '@/config/site.config';

export interface NavLink {
  label: { ar: string; en: string };
  href: string;
  isExternal?: boolean;
  isButton?: boolean;
}

export interface FooterColumn {
  title: { ar: string; en: string };
  links: NavLink[];
}

export interface SiteSettings {
  companyName: { ar: string; en: string };
  legalName: { ar: string; en: string };
  defaultSiteUrl: string;
  lightLogo?: string;
  darkLogo?: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string;
  locations: { ar: string[]; en: string[] };
  headerNav: NavLink[];
  footerDescription: { ar: string; en: string };
  footerColumns: FooterColumn[];
  copyrightText: { ar: string; en: string };
  socialLinks: Array<{ platform: string; url: string }>;
  defaultSeo?: {
    metaTitle?: { ar?: string; en?: string };
    metaDescription?: { ar?: string; en?: string };
    keywords?: { ar?: string[]; en?: string[] };
  };
  defaultOgImage?: string;
}

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName,
  legalName,
  defaultSiteUrl,
  "lightLogo": lightLogo.asset->url,
  "darkLogo": darkLogo.asset->url,
  email,
  phoneDisplay,
  phoneHref,
  whatsapp,
  locations,
  headerNav[]{
    label,
    href,
    isExternal,
    isButton
  },
  footerDescription,
  footerColumns[]{
    title,
    links[]{
      label,
      href,
      isExternal,
      isButton
    }
  },
  copyrightText,
  socialLinks[]{
    platform,
    url
  },
  defaultSeo {
    metaTitle,
    metaDescription,
    keywords
  },
  "defaultOgImage": defaultOgImage.asset->url
}`;

export async function getSiteSettings(options: { stega?: boolean } = {}): Promise<SiteSettings> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
      stega: options.stega,
    });

    if (data) {
      return {
        companyName: { ar: data.companyName?.ar || 'دي ناين', en: data.companyName?.en || 'D-NINE' },
        legalName: { ar: data.legalName?.ar || '', en: data.legalName?.en || '' },
        defaultSiteUrl: data.defaultSiteUrl || siteConfig.url,
        lightLogo: data.lightLogo || undefined,
        darkLogo: data.darkLogo || undefined,
        email: data.email || siteConfig.contact.email,
        phoneDisplay: data.phoneDisplay || siteConfig.contact.phone.display,
        phoneHref: data.phoneHref || siteConfig.contact.phone.href,
        whatsapp: data.whatsapp || '',
        locations: {
          ar: data.locations?.ar || [siteConfig.contact.locations.ar],
          en: data.locations?.en || [siteConfig.contact.locations.en],
        },
        headerNav: (data.headerNav || []).map((nav: any) => ({
          label: { ar: nav.label?.ar || '', en: nav.label?.en || '' },
          href: nav.href || '#',
          isExternal: nav.isExternal || false,
          isButton: nav.isButton || false,
        })),
        footerDescription: {
          ar: data.footerDescription?.ar || '',
          en: data.footerDescription?.en || '',
        },
        footerColumns: (data.footerColumns || []).map((col: any) => ({
          title: { ar: col.title?.ar || '', en: col.title?.en || '' },
          links: (col.links || []).map((link: any) => ({
            label: { ar: link.label?.ar || '', en: link.label?.en || '' },
            href: link.href || '#',
            isExternal: link.isExternal || false,
            isButton: link.isButton || false,
          })),
        })),
        copyrightText: {
          ar: data.copyrightText?.ar || 'جميع الحقوق محفوظة',
          en: data.copyrightText?.en || 'All rights reserved',
        },
        socialLinks: data.socialLinks || [],
        defaultSeo: data.defaultSeo || undefined,
        defaultOgImage: data.defaultOgImage || undefined,
      };
    }
  }

  // Fallback to static
  return {
    companyName: { ar: 'دي ناين', en: siteConfig.name },
    legalName: { ar: siteConfig.legalName, en: siteConfig.legalName },
    defaultSiteUrl: siteConfig.url,
    lightLogo: undefined,
    darkLogo: undefined,
    email: siteConfig.contact.email,
    phoneDisplay: siteConfig.contact.phone.display,
    phoneHref: siteConfig.contact.phone.href,
    whatsapp: siteConfig.contact.phone.href, // fallback
    locations: {
      ar: [siteConfig.contact.locations.ar],
      en: [siteConfig.contact.locations.en],
    },
    headerNav: [], // Fallback header nav handled in component
    footerDescription: { ar: '', en: '' },
    footerColumns: [],
    copyrightText: { ar: `© ${new Date().getFullYear()} ${siteConfig.name}`, en: `© ${new Date().getFullYear()} ${siteConfig.name}` },
    socialLinks: [
      { platform: 'instagram', url: siteConfig.socials.instagram },
      { platform: 'linkedin', url: siteConfig.socials.linkedin },
      { platform: 'twitter', url: siteConfig.socials.twitter },
    ],
    defaultSeo: undefined,
    defaultOgImage: undefined,
  };
}
