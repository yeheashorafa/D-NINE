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

const categories = [
  { slug: 'events', ar: 'المعارض والملتقيات والمؤتمرات', en: 'Exhibitions, Forums & Conferences', order: 1 },
  { slug: 'identity-design', ar: 'الهوية والتصاميم', en: 'Brand Identity & Design', order: 2 },
  { slug: 'media-production', ar: 'الفيديو والإنتاج الإعلامي', en: 'Video & Media Production', order: 3 },
  { slug: 'content-marketing', ar: 'المحتوى والتسويق', en: 'Content & Marketing', order: 4 },
] as const;

const legacyMap: Record<string, string> = {
  exhibitions: 'events', festivals: 'events',
  'brand-identity': 'identity-design', 'print-design': 'identity-design', 'graphic-design': 'identity-design',
  'motion-graphics': 'media-production', 'video-editing': 'media-production', 'video-production': 'media-production', 'short-video-reels': 'media-production', 'artificial-intelligence': 'media-production',
  'social-media-design': 'content-marketing', 'social-content': 'content-marketing', 'social-management': 'content-marketing', 'integrated-marketing': 'content-marketing',
};

async function run() {
  const projects = await client.fetch<Array<{ _id: string; category?: string }>>(
    '*[_type == "project"]{_id, "category": primaryCategory->slug.current}',
  );
  const plan = projects.map((project, index) => ({
    id: project._id,
    category: legacyMap[project.category || ''] || categories[index % categories.length].slug,
  }));

  if (!execute) {
    console.log(JSON.stringify({ mode: 'dry-run', dataset, categories, projectUpdates: plan }, null, 2));
    return;
  }

  let transaction = client.transaction();
  for (const category of categories) {
    transaction = transaction.createOrReplace({
      _id: `cat-${category.slug}`, _type: 'contentCategory',
      title: { ar: category.ar, en: category.en },
      slug: { _type: 'slug', current: category.slug },
      description: { ar: category.ar, en: category.en },
      targetLink: `/work?category=${category.slug}`,
      order: category.order, active: true,
    });
  }
  for (const update of plan) {
    transaction = transaction.patch(update.id, (patch) => patch
      .set({ primaryCategory: { _type: 'reference', _ref: `cat-${update.category}` } })
      .unset(['categories']));
  }
  await transaction.commit();
  console.log(`Migrated ${plan.length} projects to four portfolio categories in ${dataset}.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
