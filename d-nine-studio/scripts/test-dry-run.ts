import { createClient } from '@sanity/client';
import { resolve } from 'path';
import { config } from 'dotenv';
import { execSync } from 'child_process';
import assert from 'assert';

config({ path: resolve(process.cwd(), '.env.local') });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = 'development';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-01-01',
});

async function main() {
  console.log('Fetching dataset snapshot BEFORE dry run...');
  const beforeDocs = await client.fetch(`*[] | order(_id asc) { _id, _rev, _updatedAt }`);

  console.log('Running dry run...');
  execSync('npm run content:complete:dry', { stdio: 'inherit' });

  console.log('Fetching dataset snapshot AFTER dry run...');
  const afterDocs = await client.fetch(`*[] | order(_id asc) { _id, _rev, _updatedAt }`);

  try {
    assert.deepStrictEqual(beforeDocs, afterDocs);
    console.log('✅ DRY RUN PROVEN: Zero mutations occurred (_id, _rev, _updatedAt match identically).');
  } catch (error) {
    console.error('❌ DRY RUN FAILED: Mutations detected during dry run!');
    console.error(error);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
