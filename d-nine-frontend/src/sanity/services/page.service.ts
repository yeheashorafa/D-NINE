import { sanityFetch } from '../client';
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

export async function getHomePage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: homePageQuery,
    tags: ['home-page'],
    stega: options.stega,
  });
}

export async function getAboutPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: aboutPageQuery,
    tags: ['about-page'],
    stega: options.stega,
  });
}

export async function getServicesPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: servicesPageQuery,
    tags: ['services-page'],
    stega: options.stega,
  });
}

export async function getWorkPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: workPageQuery,
    tags: ['work-page'],
    stega: options.stega,
  });
}

export async function getBlogPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: blogPageQuery,
    tags: ['blog-page'],
    stega: options.stega,
  });
}

export async function getContactPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: contactPageQuery,
    tags: ['contact-page'],
    stega: options.stega,
  });
}

export async function getPrivacyPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: privacyPageQuery,
    tags: ['privacy-page'],
    stega: options.stega,
  });
}

export async function getTermsPage(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: termsPageQuery,
    tags: ['terms-page'],
    stega: options.stega,
  });
}

export async function getSiteSettings(options: { stega?: boolean } = {}) {
  return await sanityFetch<any>({
    query: siteSettingsQuery,
    tags: ['site-settings'],
    stega: options.stega,
  });
}
