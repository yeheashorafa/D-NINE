// Objects
import { localizedString } from './objects/localized-string';
import { localizedText } from './objects/localized-text';
import { localizedPortableText } from './objects/localized-portable-text';
import { localizedStringArray } from './objects/localized-string-array';
import { seo } from './objects/seo';
import { projectMedia } from './objects/project-media';
import { serviceDeliverable } from './objects/service-deliverable';
import { serviceProcessStep } from './objects/service-process-step';
import { serviceFaq } from './objects/service-faq';
import { projectMetric } from './objects/project-metric';
import { socialLink } from './objects/social-link';
import { cta } from './objects/cta';
import { heroSlide } from './objects/hero-slide';
import { creativeSnapshot } from './objects/creative-snapshot';
import { bookACallSection } from './objects/book-a-call-section';
import { navLink } from './objects/nav-link';
import { footerColumn } from './objects/footer-column';

import { contentCategory } from './documents/content-category';
import { service } from './documents/service';
import { serviceOffering } from './documents/service-offering';
import { project } from './documents/project';
import { blogPost } from './documents/blog-post';
import { author } from './documents/author';
import { homePage } from './documents/home-page';
import { aboutPage } from './documents/about-page';
import { servicesPage } from './documents/services-page';
import { workPage } from './documents/work-page';
import { blogPage } from './documents/blog-page';
import { contactPage } from './documents/contact-page';
import { privacyPage } from './documents/privacy-page';
import { termsPage } from './documents/terms-page';
import { siteSettings } from './documents/site-settings';

export const schemaTypes = [
  // Object Types
  localizedString,
  localizedText,
  localizedPortableText,
  localizedStringArray,
  seo,
  projectMedia,
  serviceDeliverable,
  serviceProcessStep,
  serviceFaq,
  projectMetric,
  socialLink,
  cta,
  heroSlide,
  creativeSnapshot,
  bookACallSection,
  navLink,
  footerColumn,

  // Document Types
  contentCategory,
  service,
  serviceOffering,
  project,
  blogPost,
  author,
  homePage,
  aboutPage,
  servicesPage,
  workPage,
  blogPage,
  contactPage,
  privacyPage,
  termsPage,
  siteSettings,
];
