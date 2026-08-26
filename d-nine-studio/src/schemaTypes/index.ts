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

// Documents
import { contentCategory } from './documents/content-category';
import { service } from './documents/service';
import { serviceOffering } from './documents/service-offering';
import { project } from './documents/project';
import { blogPost } from './documents/blog-post';
import { author } from './documents/author';
import { homePage } from './documents/home-page';
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

  // Document Types
  contentCategory,
  service,
  serviceOffering,
  project,
  blogPost,
  author,
  homePage,
  siteSettings,
];
