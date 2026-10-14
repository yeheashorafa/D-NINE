export { schemaTypes } from './schemaTypes';
export { structure } from './structure';
export { locations, mainDocuments } from './presentation/resolve';

export const singletonTypes = new Set([
  'homePage',
  'aboutPage',
  'servicesPage',
  'workPage',
  'blogPage',
  'contactPage',
  'privacyPage',
  'termsPage',
  'siteSettings',
  'themeSettings',
]);

export const CANONICAL_CATEGORY_DOCUMENT_IDS = new Set([
  'cat-motion-graphics',
  'cat-video-editing',
  'cat-social-media-design',
  'cat-print-design',
  'cat-brand-identity',
  'cat-artificial-intelligence',
  'cat-exhibitions',
  'cat-festivals',
]);

export const singletonDocumentActions = (input: any[], context: any) => {
  // Singletons: only allow publish, discardChanges, restore
  if (singletonTypes.has(context.schemaType)) {
    return input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action));
  }
  // Canonical Categories: prevent delete, duplicate, unpublish
  if (context.schemaType === 'contentCategory') {
    return input.filter(({ action }) => action && !['delete', 'duplicate', 'unpublish'].includes(action));
  }
  return input;
};

export const singletonNewDocumentOptions = (input: any[], context: any) => {
  // Filter out singletons and contentCategory creation templates from Studio
  const blockedTemplates = new Set([...singletonTypes, 'contentCategory']);
  if (context.creationContext && blockedTemplates.has(context.creationContext.type)) {
     return input.filter((template) => !blockedTemplates.has(template.templateId));
  }
  return input.filter((template) => !blockedTemplates.has(template.templateId));
};
