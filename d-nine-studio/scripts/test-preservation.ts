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
  console.log('Patching existing documents with test data...');
  await client.transaction()
    .createIfNotExists({ _type: 'servicesPage', _id: 'servicesPage' })
    .createIfNotExists({ _type: 'privacyPage', _id: 'privacyPage' })
    .createIfNotExists({ _type: 'contactPage', _id: 'contactPage' })
    .patch('servicesPage', p => p.set({ heroTitle: { ar: 'Edited Title AR', en: 'Edited Title EN' } }))
    .patch('privacyPage', p => p.set({ body: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'Edited privacy text', _key: '1' }], _key: '2', markDefs: [] }] } }))
    .patch('contactPage', p => p.set({ contactMethods: [{ _key: 'm1_test', type: 'phone', title: { ar: 'الهاتف', en: 'Phone' }, value: '12345', link: 'tel:12345' }] }))
    .commit();

  console.log('Running execute migration...');
  execSync('npm run content:complete', { stdio: 'inherit' });

  console.log('Verifying preservation...');
  const services = await client.getDocument('servicesPage');
  const privacy = await client.getDocument('privacyPage');
  const contact = await client.getDocument('contactPage');
if (!services) {
  throw new Error('servicesPage was not found after the preservation test');
}

if (!privacy) {
  throw new Error('privacyPage was not found after the preservation test');
}

if (!contact) {
  throw new Error('contactPage was not found after the preservation test');
}
  assert.strictEqual(services.heroTitle.ar, 'Edited Title AR');
  assert.strictEqual(services.heroTitle.en, 'Edited Title EN');
  assert.strictEqual(privacy.body.ar[0].children[0].text, 'Edited privacy text');
  assert.strictEqual(contact.contactMethods[0].value, '12345');

  console.log('✅ PRESERVATION TEST PASSED: Existing fields were not overwritten.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
