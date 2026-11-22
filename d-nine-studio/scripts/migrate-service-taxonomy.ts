import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { sectorTemplates } from '../../packages/sanity-config/src/sector-templates.js';

config({ path: resolve(process.cwd(), '.env.local') });

const execute = process.argv.includes('--execute');
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error('SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.');
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-11-22' });

const sectorIds = ['sector-events', 'sector-media'];
const sectorDocuments = sectorTemplates.map((template, index) => ({
  _id: sectorIds[index],
  _type: 'sectorPage',
  ...(template.value || {}),
}));

const servicesPagePatch = {
  heroBadge: { ar: 'خدماتنا', en: 'Our Services' },
  heroTitle: { ar: 'حلول متكاملة من الفكرة إلى الأثر', en: 'Integrated Solutions from Idea to Impact' },
  heroSubtitle: {
    ar: 'اختر القطاع واستكشف الخدمات التي نبنيها حول احتياج مشروعك.',
    en: 'Choose a sector and explore services shaped around your project needs.',
  },
};

async function run() {
  if (!execute) {
    console.log(JSON.stringify({ mode: 'dry-run', dataset, sectorDocuments, servicesPagePatch }, null, 2));
    return;
  }

  let transaction = client.transaction();
  for (const document of sectorDocuments) transaction = transaction.createOrReplace(document);
  transaction = transaction
    .createIfNotExists({ _id: 'servicesPage', _type: 'servicesPage' })
    .patch('servicesPage', (patch) => patch.set(servicesPagePatch));
  await transaction.commit();
  console.log(`Updated services taxonomy in Sanity dataset: ${dataset}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
