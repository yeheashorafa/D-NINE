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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn('Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables.');
}

const previewUrl = process.env.NODE_ENV === 'production' 
  ? siteUrl.replace(/\/$/, '') + '/dashboard' 
  : 'http://localhost:3000/dashboard';

export default defineConfig({
  basePath: '/dashboard',
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
        origin: siteUrl.replace(/\/$/, ''),
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: singletonDocumentActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
});
