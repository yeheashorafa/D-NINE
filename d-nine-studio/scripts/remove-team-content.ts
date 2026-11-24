import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env.local') });
const execute = process.argv.includes('--execute');
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error('SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.');

const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-11-22' });

async function run() {
  const documentIds = await client.fetch<string[]>('*[_type == "teamMember"]._id');
  if (!execute) {
    console.log(JSON.stringify({ mode: 'dry-run', dataset, unset: ['homePage.teamPreview', 'aboutPage.team'], delete: documentIds }, null, 2));
    return;
  }

  let transaction = client.transaction()
    .patch('homePage', (patch) => patch.unset(['teamPreview']))
    .patch('aboutPage', (patch) => patch.unset(['team']));
  for (const id of documentIds) transaction = transaction.delete(id);
  await transaction.commit();
  console.log(`Removed ${documentIds.length} obsolete staff documents from ${dataset}.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
