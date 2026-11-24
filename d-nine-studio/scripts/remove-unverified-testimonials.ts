import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });

const execute = process.argv.includes('--execute');
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error('SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.');
}

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-11-23' });
const unverifiedEnglishNames = [
  'Ahmed Mahmoud',
  'Sarah Khaled',
  'Majed Al-Otaibi',
  'Dana Al-Harbi',
  'Faisal Al-Dosari',
  'Renad Al-Qahtani',
  'Tariq Al-Naimi',
  'Mona Al-Anzi',
];

async function run() {
  const documents = await client.fetch<Array<{ _id: string; personName?: { en?: string } }>>(
    '*[_type == "testimonial" && personName.en in $names]{_id, personName}',
    { names: unverifiedEnglishNames },
  );

  if (!execute) {
    console.log(JSON.stringify({ mode: 'dry-run', dataset, delete: documents }, null, 2));
    return;
  }

  let transaction = client.transaction();
  for (const pageId of ['homePage', 'aboutPage', 'servicesPage']) {
    transaction = transaction.patch(pageId, (patch) => patch.unset(['testimonials.selectedTestimonials']));
  }
  for (const document of documents) transaction = transaction.delete(document._id);
  await transaction.commit();
  console.log(`Removed ${documents.length} unverified testimonial documents from ${dataset}.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
