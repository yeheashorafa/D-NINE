import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import {schemaTypes} from './src/schemaTypes';
import {structure} from './src/structure';
import { locations, mainDocuments } from './src/presentation/resolve';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'development';
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

const singletonTypes = new Set([
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

export default defineConfig({
  name: 'default',
  title: 'D-NINE CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: {
        locations,
        mainDocuments,
      },
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action));
      }
      return input;
    },
    newDocumentOptions: (input, context) => {
      if (singletonTypes.has(context.creationContext.type)) {
         return input.filter((template) => !singletonTypes.has(template.templateId));
      }
      // Also broadly filter them out everywhere
      return input.filter((template) => !singletonTypes.has(template.templateId));
    },
  },
});
