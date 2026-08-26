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
});
