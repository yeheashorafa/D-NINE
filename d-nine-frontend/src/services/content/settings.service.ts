import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { siteConfig } from '@/config/site.config';

export interface NavLink {
  label: { ar: string; en: string };
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: { ar: string; en: string };
  links: NavLink[];
}

export interface SiteSettings {
  companyName: { ar: string; en: string };
  legalName: { ar: string; en: string };
  defaultSiteUrl: string;
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
}

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName,
  legalName,
  defaultSiteUrl,
  email,
  phoneDisplay,
  phoneHref,
  whatsapp,
  locations,
  headerNav[]{
    label,
    href,
    isExternal
  },
  footerDescription,
  footerColumns[]{
    title,
    links[]{
      label,
      href,
      isExternal
    }
  },
  copyrightText,
  socialLinks[]{
    platform,
    url
  }
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    });

    if (data) {
      return {
        companyName: { ar: data.companyName?.ar || 'دي ناين', en: data.companyName?.en || 'D-NINE' },
        legalName: { ar: data.legalName?.ar || '', en: data.legalName?.en || '' },
        defaultSiteUrl: data.defaultSiteUrl || siteConfig.url,
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
          })),
        })),
        copyrightText: {
          ar: data.copyrightText?.ar || 'جميع الحقوق محفوظة',
          en: data.copyrightText?.en || 'All rights reserved',
        },
        socialLinks: data.socialLinks || [],
      };
    }
  }

  // Fallback to static
  return {
    companyName: { ar: 'دي ناين', en: siteConfig.name },
    legalName: { ar: siteConfig.legalName, en: siteConfig.legalName },
    defaultSiteUrl: siteConfig.url,
    email: siteConfig.contact.email,
    phoneDisplay: siteConfig.contact.phone.display,
    phoneHref: siteConfig.contact.phone.href,
    whatsapp: siteConfig.contact.phone.href, // fallback
    locations: {
      ar: [siteConfig.contact.locations.ar],
      en: [siteConfig.contact.locations.en],
    },
    headerNav: [], // You can define default static header nav here
    footerDescription: { ar: '', en: '' },
    footerColumns: [],
    copyrightText: { ar: `© ${new Date().getFullYear()} ${siteConfig.name}`, en: `© ${new Date().getFullYear()} ${siteConfig.name}` },
    socialLinks: [
      { platform: 'instagram', url: siteConfig.socials.instagram },
      { platform: 'linkedin', url: siteConfig.socials.linkedin },
      { platform: 'twitter', url: siteConfig.socials.twitter },
    ],
  };
}
