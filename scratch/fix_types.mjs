import fs from 'fs';
import path from 'path';

const typesPath = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/sanity/types.ts';
let typesContent = fs.readFileSync(typesPath, 'utf-8');

// Replace seo?: any with seo?: SanitySeo
typesContent = typesContent.replace(/seo\?:\s*any;/g, 'seo?: SanitySeo;');
// Add SanitySeo and page types
typesContent += `

export interface SanitySeo {
  metaTitle?: SanityLocalizedString;
  metaDescription?: SanityLocalizedString;
  keywords?: SanityLocalizedString;
}

export interface SanityHomePageDoc {
  _id: string;
  id?: string;
  heroSlides?: any[];
  creativeSnapshot?: any;
  featuredProjects?: any[];
  featuredServices?: any[];
  processTimeline?: any[];
  testimonials?: any[];
  faqs?: any[];
  latestNews?: any[];
  seo?: SanitySeo;
}

export interface SanityAboutPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  agencyStory?: any;
  mission?: any;
  vision?: any;
  values?: any[];
  media?: string[];
  cta?: any;
  seo?: SanitySeo;
}

export interface SanityServicesPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  filterLabels?: {
    all?: SanityLocalizedString;
    primary?: SanityLocalizedString;
    offerings?: SanityLocalizedString;
  };
  seo?: SanitySeo;
}

export interface SanityWorkPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  allCategoriesLabel?: SanityLocalizedString;
  seo?: SanitySeo;
}

export interface SanityBlogPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  searchPlaceholder?: SanityLocalizedString;
  featuredPosts?: any[];
  seo?: SanitySeo;
}

export interface SanityContactPageDoc {
  _id: string;
  id?: string;
  heroBadge?: SanityLocalizedString;
  heroTitle?: SanityLocalizedString;
  heroSubtitle?: SanityLocalizedString;
  description?: any;
  contactMethods?: any[];
  offices?: any[];
  seo?: SanitySeo;
}

export interface SanityPrivacyPageDoc {
  _id: string;
  id?: string;
  title?: SanityLocalizedString;
  lastUpdated?: string;
  body?: any;
  seo?: SanitySeo;
}

export interface SanityTermsPageDoc {
  _id: string;
  id?: string;
  title?: SanityLocalizedString;
  lastUpdated?: string;
  body?: any;
  seo?: SanitySeo;
}
`;

fs.writeFileSync(typesPath, typesContent);

const servicePath = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/sanity/services/page.service.ts';
let serviceContent = fs.readFileSync(servicePath, 'utf-8');

// Replace any in page.service.ts and add mappers
// But wait, the mappers don't exist yet, I'll just change the return type to the interface.

serviceContent = `
import { sanityFetch } from '../client';
import { contentSource } from '../env';
import {
  homePageQuery,
  aboutPageQuery,
  servicesPageQuery,
  workPageQuery,
  blogPageQuery,
  contactPageQuery,
  privacyPageQuery,
  termsPageQuery,
} from '../queries/page.queries';
import { siteSettingsQuery } from '../queries/settings.queries';
import type { 
  SanityHomePageDoc, 
  SanityAboutPageDoc, 
  SanityServicesPageDoc, 
  SanityWorkPageDoc, 
  SanityBlogPageDoc, 
  SanityContactPageDoc, 
  SanityPrivacyPageDoc, 
  SanityTermsPageDoc 
} from '../types';

function enforceSanityDoc<T>(data: T | null, name: string): T {
  if (contentSource === 'sanity' && !data) {
    throw new Error(\`\${name} document is missing or malformed in Sanity.\`);
  }
  return data as T;
}

export async function getHomePage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityHomePageDoc | null>({
    query: homePageQuery,
    tags: ['home-page', 'homePage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Home page');
}

export async function getAboutPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityAboutPageDoc | null>({
    query: aboutPageQuery,
    tags: ['about-page', 'aboutPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'About page');
}

export async function getServicesPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityServicesPageDoc | null>({
    query: servicesPageQuery,
    tags: ['services-page', 'servicesPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Services page');
}

export async function getWorkPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityWorkPageDoc | null>({
    query: workPageQuery,
    tags: ['work-page', 'workPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Work page');
}

export async function getBlogPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityBlogPageDoc | null>({
    query: blogPageQuery,
    tags: ['blog-page', 'blogPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Blog page');
}

export async function getContactPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityContactPageDoc | null>({
    query: contactPageQuery,
    tags: ['contact-page', 'contactPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Contact page');
}

export async function getPrivacyPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityPrivacyPageDoc | null>({
    query: privacyPageQuery,
    tags: ['privacy-page', 'privacyPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Privacy page');
}

export async function getTermsPage(options: { stega?: boolean } = {}) {
  const data = await sanityFetch<SanityTermsPageDoc | null>({
    query: termsPageQuery,
    tags: ['terms-page', 'termsPage'],
    stega: options.stega,
  });
  return enforceSanityDoc(data, 'Terms page');
}

export async function getSiteSettings(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: siteSettingsQuery,
    tags: ['site-settings', 'siteSettings'],
    stega: options.stega,
  });
}
`;

fs.writeFileSync(servicePath, serviceContent.trim());
console.log('Updated types and service');
