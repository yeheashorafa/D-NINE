import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import {
  schemaTypes,
  structure,
  locations,
  mainDocuments,
  singletonDocumentActions,
  singletonNewDocumentOptions
} from '@d-nine/sanity-config';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'development';
const previewUrl = process.env.SANITY_STUDIO_PRESENTATION_URL || '';

if (process.env.NODE_ENV === 'production' && !previewUrl) {
  throw new Error('SANITY_STUDIO_PRESENTATION_URL must be set in production');
}

const fallbackPreviewUrl = previewUrl || 'http://localhost:3000';
const isDev = process.env.NODE_ENV === 'development';

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
        origin: fallbackPreviewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    ...(isDev ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: singletonDocumentActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
});
