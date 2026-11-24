import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });
const execute = process.argv.includes('--execute');
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error('SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.');

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-11-23' });

async function run() {
  const legacyIds = await client.fetch<string[]>('*[_type in ["service", "serviceOffering"]]._id');
  if (!execute) {
    console.log(JSON.stringify({ mode: 'dry-run', dataset, delete: legacyIds }, null, 2));
    return;
  }

  let transaction = client.transaction()
    .patch('homePage', (patch) => patch.unset(['featuredServices']))
    .patch('homePage', (patch) => patch.unset(['testimonials.selectedTestimonials']))
    .patch('aboutPage', (patch) => patch.unset(['testimonials.selectedTestimonials']))
    .patch('servicesPage', (patch) => patch.unset(['testimonials.selectedTestimonials']));

  const referencingDocs = await client.fetch<Array<{ _id: string }>>(
    '*[defined(relatedServices) || defined(relatedService)]{_id}',
  );
  for (const doc of referencingDocs) {
    transaction = transaction.patch(doc._id, (patch) => patch.unset(['relatedServices', 'relatedService']));
  }
  for (const id of legacyIds) transaction = transaction.delete(id);
  await transaction.commit();
  console.log(`Removed ${legacyIds.length} legacy service documents from ${dataset}.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
