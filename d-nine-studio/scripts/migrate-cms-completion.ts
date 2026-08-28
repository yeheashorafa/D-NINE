import { createClient } from '@sanity/client';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import type { SanityDocumentStub } from '@sanity/client';
import { AssetRegistry } from './upload-assets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FRONTEND_PUBLIC_DIR = resolve(__dirname, '../../d-nine-frontend/public');

// Load environment variables from studio/.env.local
config({ path: resolve(process.cwd(), '.env.local') });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = 'development'; // strictly development
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const args = process.argv.slice(2);
const validArgs = ['--dry-run', '--execute'];
const unknownArgs = args.filter(a => !validArgs.includes(a));
if (unknownArgs.length > 0) {
  console.error('Error: Unknown arguments: ' + unknownArgs.join(', '));
  process.exit(1);
}
const isDryRun = process.argv.includes('--dry-run');
const isExecute = process.argv.includes('--execute');

if ((isDryRun && isExecute) || (!isDryRun && !isExecute)) {
  console.error('Error: Exactly one of --dry-run or --execute must be specified.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-01-01',
});

// Helper to omit undefined values
function clean(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(clean).filter((v) => v !== undefined);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => [k, clean(v)])
        .filter(([, v]) => v !== undefined)
    );
  }
  return obj;
}

async function main() {
  console.log(`Starting migration to seed CMS with required singletons... [Mode: ${isDryRun ? 'DRY RUN' : 'EXECUTE'}]`);

  const assetRegistry = new AssetRegistry(FRONTEND_PUBLIC_DIR);
  assetRegistry.registerFile('/slider/slide-01.jpg');
  assetRegistry.registerFile('/slider/slide-02.jpg');
  assetRegistry.registerFile('/slider/slide-03.jpg');
  assetRegistry.registerFile('/slider/slide-04.jpg');

  if (!isDryRun) {
    console.log('🔄 Syncing missing assets...');
    await assetRegistry.syncWithSanity(client);
  }

  const makeImageObject = (relPath: string, alt: { ar: string; en: string }) => {
    const assetId = assetRegistry.getAssetId(relPath);
    if (!assetId) {
      console.error(`Missing asset ID for ${relPath}`);
      process.exit(1);
    }
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
      alt,
    };
  };

  const heroSlides = [
    {
      _key: 'slide_1',
      _type: 'heroSlide',
      category: { ar: 'شريحة ١', en: 'Slide 1' },
      title: { ar: 'عنوان ١', en: 'Title 1' },
      description: { ar: '', en: '' },
      ctaText: { ar: '', en: '' },
      ctaLink: '',
      active: true,
      image: makeImageObject('/slider/slide-01.jpg', { ar: 'شريحة ١', en: 'Slide 1' }),
    },
    {
      _key: 'slide_2',
      _type: 'heroSlide',
      category: { ar: 'شريحة ٢', en: 'Slide 2' },
      title: { ar: 'عنوان ٢', en: 'Title 2' },
      description: { ar: '', en: '' },
      ctaText: { ar: '', en: '' },
      ctaLink: '',
      active: true,
      image: makeImageObject('/slider/slide-02.jpg', { ar: 'شريحة ٢', en: 'Slide 2' }),
    },
    {
      _key: 'slide_3',
      _type: 'heroSlide',
      category: { ar: 'شريحة ٣', en: 'Slide 3' },
      title: { ar: 'عنوان ٣', en: 'Title 3' },
      description: { ar: '', en: '' },
      ctaText: { ar: '', en: '' },
      ctaLink: '',
      active: true,
      image: makeImageObject('/slider/slide-03.jpg', { ar: 'شريحة ٣', en: 'Slide 3' }),
    },
    {
      _key: 'slide_4',
      _type: 'heroSlide',
      category: { ar: 'شريحة ٤', en: 'Slide 4' },
      title: { ar: 'عنوان ٤', en: 'Title 4' },
      description: { ar: '', en: '' },
      ctaText: { ar: '', en: '' },
      ctaLink: '',
      active: true,
      image: makeImageObject('/slider/slide-04.jpg', { ar: 'شريحة ٤', en: 'Slide 4' }),
    },
  ];

  const singletons: Record<string, SanityDocumentStub> = {
    servicesPage: {
      _type: 'servicesPage',
      heroBadge: { ar: 'خدماتنا', en: 'Our Services' },
      heroTitle: { ar: 'نقدم لك أفضل الحلول', en: 'We provide the best solutions' },
      heroSubtitle: { ar: 'استكشف ما يمكننا تقديمه لعملك.', en: 'Explore what we can do for your business.' },
      filterLabels: {
        all: { ar: 'الكل', en: 'All' },
        primary: { ar: 'الخدمات الأساسية', en: 'Primary Services' },
        offerings: { ar: 'عروضنا', en: 'Our Offerings' },
      },
      seo: {
        metaTitle: { ar: 'خدماتنا | دي ناين', en: 'Services | D-NINE' },
        metaDescription: { ar: 'تعرف على خدمات وكالة دي ناين.', en: 'Learn about D-NINE services.' },
      },
    },
    workPage: {
      _type: 'workPage',
      heroBadge: { ar: 'أعمالنا', en: 'Our Work' },
      heroTitle: { ar: 'معرض أعمالنا', en: 'Our Portfolio' },
      heroSubtitle: { ar: 'تصفح مشاريعنا السابقة.', en: 'Browse our past projects.' },
      allCategoriesLabel: { ar: 'كل الفئات', en: 'All Categories' },
      seo: {
        metaTitle: { ar: 'أعمالنا | دي ناين', en: 'Work | D-NINE' },
        metaDescription: { ar: 'تعرف على مشاريع وكالة دي ناين.', en: 'Learn about D-NINE projects.' },
      },
    },
    blogPage: {
      _type: 'blogPage',
      heroBadge: { ar: 'المدونة', en: 'Blog' },
      heroTitle: { ar: 'أحدث المقالات', en: 'Latest Articles' },
      heroSubtitle: { ar: 'اقرأ أحدث أفكارنا ورؤانا.', en: 'Read our latest thoughts and insights.' },
      searchPlaceholder: { ar: 'ابحث عن مقال...', en: 'Search for an article...' },
      seo: {
        metaTitle: { ar: 'المدونة | دي ناين', en: 'Blog | D-NINE' },
        metaDescription: { ar: 'مدونة دي ناين.', en: 'D-NINE Blog.' },
      },
    },
    aboutPage: {
      _type: 'aboutPage',
      heroBadge: { ar: 'من نحن', en: 'About Us' },
      heroTitle: { ar: 'قصة نجاح', en: 'A Success Story' },
      heroSubtitle: { ar: 'بداية الرحلة', en: 'The beginning of the journey' },
      agencyStory: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'قصتنا الرائعة', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our amazing story', _key: '3' }], _key: '4', markDefs: [] }] },
      mission: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'مهمتنا هي الابتكار', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our mission is innovation', _key: '3' }], _key: '4', markDefs: [] }] },
      vision: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'رؤيتنا للمستقبل', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our vision for the future', _key: '3' }], _key: '4', markDefs: [] }] },
      values: [],
      seo: {
        metaTitle: { ar: 'من نحن | دي ناين', en: 'About | D-NINE' },
        metaDescription: { ar: 'قصتنا.', en: 'Our story.' },
      },
    },
    contactPage: {
      _type: 'contactPage',
      heroBadge: { ar: 'تواصل معنا', en: 'Contact Us' },
      heroTitle: { ar: 'نحن هنا لخدمتك', en: 'We are here to serve you' },
      heroSubtitle: { ar: 'يسعدنا تواصلك معنا', en: 'We look forward to hearing from you' },
      description: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'تواصل معنا الآن', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Contact us now', _key: '3' }], _key: '4', markDefs: [] }] },
      contactMethods: [{ _key: 'm1', type: 'email', title: { ar: 'البريد الإلكتروني', en: 'Email' }, value: 'hello@d-nine.agency', link: 'mailto:hello@d-nine.agency' }],
      offices: [{ _key: 'o1', title: { ar: 'المقر الرئيسي', en: 'Headquarters' }, address: { ar: 'الرياض', en: 'Riyadh' }, email: 'hq@d-nine.agency' }],
      seo: {
        metaTitle: { ar: 'تواصل معنا | دي ناين', en: 'Contact | D-NINE' },
        metaDescription: { ar: 'تواصل معنا.', en: 'Contact us.' },
      },
    },
    privacyPage: {
      _type: 'privacyPage',
      title: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
      lastUpdated: '2024-01-01',
      body: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'نص المحتوى', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Content text', _key: '3' }], _key: '4', markDefs: [] }] },
      seo: {
        metaTitle: { ar: 'سياسة الخصوصية | دي ناين', en: 'Privacy Policy | D-NINE' },
      },
    },
    termsPage: {
      _type: 'termsPage',
      title: { ar: 'الشروط والأحكام', en: 'Terms of Service' },
      lastUpdated: '2024-01-01',
      body: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'نص المحتوى', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Content text', _key: '3' }], _key: '4', markDefs: [] }] },
      seo: {
        metaTitle: { ar: 'الشروط والأحكام | دي ناين', en: 'Terms of Service | D-NINE' },
      },
    },
    siteSettings: {
      _type: 'siteSettings',
      companyName: { ar: 'دي ناين', en: 'D-NINE' },
      email: 'hello@d-nine.agency',
      defaultSeo: {
        metaTitle: { ar: 'دي ناين', en: 'D-NINE' },
      },
    },
    homePage: {
      _type: 'homePage',
      heroSlides,
      seo: {
        metaTitle: { ar: 'الرئيسية | دي ناين', en: 'Home | D-NINE' },
        metaDescription: { ar: 'وكالة دي ناين للإنتاج الإعلامي', en: 'D-NINE Creative Agency' },
      },
    }
  };

  const ids = Object.keys(singletons);

  const existingDocs = await client.fetch(`*[_id in $ids] { _id, _rev, _updatedAt }`, { ids });
  const existingDocsMap = new Map<string, any>(existingDocs.map((doc: any) => [doc._id, doc]));

  if (isDryRun) {
    console.log('DRY RUN: Planning mutations...');
    console.table(existingDocs);
    for (const [id, doc] of Object.entries(singletons)) {
      if (!existingDocsMap.has(id)) {
        console.log(`- Would CREATE document: ${id}`);
      } else {
        console.log(`- Would PATCH document: ${id} with setIfMissing`);
      }
    }
    console.log('DRY RUN complete. Zero mutations performed.');
    return;
  }

  // Execute Mode
  let transaction = client.transaction();

  for (const [id, doc] of Object.entries(singletons)) {
    const cleanedDoc = clean(doc);
    if (!existingDocsMap.has(id)) {
      console.log(`Adding CREATE to transaction for: ${id}`);
      transaction = transaction.createIfNotExists({ _id: id, ...cleanedDoc });
    } else {
      console.log(`Adding PATCH to transaction for: ${id}`);
      // Remove _type from setIfMissing to avoid patch errors
      
      // Check for empty fields to force patch
      const forcePatchFields: Record<string, any> = {};
      for (const [k, v] of Object.entries(cleanedDoc)) {
        if (k === '_type') continue;
        const existingVal = existingDocsMap.get(id)?.[k];
        if (existingVal && typeof existingVal === 'object') {
          // If existing is empty array, or if it has { ar: [], en: [] } where length is 0
          if (Array.isArray(existingVal) && existingVal.length === 0) {
            forcePatchFields[k] = v;
          } else if (!Array.isArray(existingVal) && existingVal.ar && Array.isArray(existingVal.ar) && existingVal.ar.length === 0) {
            forcePatchFields[k] = v;
          } else if (!Array.isArray(existingVal) && Object.keys(existingVal).length === 0) {
             forcePatchFields[k] = v;
          }
        } else if (existingVal === undefined || existingVal === null || existingVal === '') {
          forcePatchFields[k] = v;
        }
      }
      
      const { _type, ...fieldsToPatch } = cleanedDoc;
      if (Object.keys(forcePatchFields).length > 0) {
         transaction = transaction.patch(id, (p) => p.set(forcePatchFields).setIfMissing(fieldsToPatch));
      } else {
         transaction = transaction.patch(id, (p) => p.setIfMissing(fieldsToPatch));
      }

    }
  }

  try {
    await transaction.commit();
    console.log('All patches committed successfully.');
  } catch (error) {
    console.error('Mutation transaction failed:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unhandled script error:', err);
  process.exit(1);
});
