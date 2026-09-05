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
  'siteSettings'
]);

export const singletonDocumentActions = (input: any[], context: any) => {
  if (singletonTypes.has(context.schemaType)) {
    return input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action));
  }
  return input;
};

export const singletonNewDocumentOptions = (input: any[], context: any) => {
  if (context.creationContext && singletonTypes.has(context.creationContext.type)) {
     return input.filter((template) => !singletonTypes.has(template.templateId));
  }
  return input.filter((template) => !singletonTypes.has(template.templateId));
};
