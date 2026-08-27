import { createClient } from '@sanity/client';
import { resolve } from 'path';
import { config } from 'dotenv';
import type { SanityDocumentStub } from '@sanity/client';

type MigrationDocument = SanityDocumentStub & {
  _id: string;
  _type: string;
};
// Load environment variables from studio/.env.local
config({ path: resolve(process.cwd(), '.env.local') });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = 'development'; // Use development dataset only
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
  console.log('Starting migration to seed CMS with required singletons...');

  const singletons: MigrationDocument[] = [
    {
      _id: 'servicesPage',
      _type: 'servicesPage',
      hero: {
        badge: { ar: 'خدماتنا', en: 'Our Services' },
        title: { ar: 'نقدم لك أفضل الحلول', en: 'We provide the best solutions' },
        subtitle: { ar: 'استكشف ما يمكننا تقديمه لعملك.', en: 'Explore what we can do for your business.' },
      },
      seo: {
        metaTitle: { ar: 'خدماتنا | دي ناين', en: 'Services | D-NINE' },
        metaDescription: { ar: 'تعرف على خدمات وكالة دي ناين.', en: 'Learn about D-NINE services.' },
      },
    },
    {
      _id: 'workPage',
      _type: 'workPage',
      hero: {
        badge: { ar: 'أعمالنا', en: 'Our Work' },
        title: { ar: 'معرض أعمالنا', en: 'Our Portfolio' },
        subtitle: { ar: 'تصفح مشاريعنا السابقة.', en: 'Browse our past projects.' },
      },
      seo: {
        metaTitle: { ar: 'أعمالنا | دي ناين', en: 'Work | D-NINE' },
        metaDescription: { ar: 'تعرف على مشاريع وكالة دي ناين.', en: 'Learn about D-NINE projects.' },
      },
    },
    {
      _id: 'blogPage',
      _type: 'blogPage',
      hero: {
        badge: { ar: 'المدونة', en: 'Blog' },
        title: { ar: 'أحدث المقالات', en: 'Latest Articles' },
        subtitle: { ar: 'اقرأ أحدث أفكارنا ورؤانا.', en: 'Read our latest thoughts and insights.' },
      },
      seo: {
        metaTitle: { ar: 'المدونة | دي ناين', en: 'Blog | D-NINE' },
        metaDescription: { ar: 'مدونة دي ناين.', en: 'D-NINE Blog.' },
      },
    },
    {
      _id: 'aboutPage',
      _type: 'aboutPage',
      hero: {
        badge: { ar: 'من نحن', en: 'About Us' },
        title: { ar: 'قصة نجاح', en: 'A Success Story' },
        subtitle: { ar: 'بداية الرحلة', en: 'The beginning of the journey' }
      },
      story: {
        badge: { ar: 'قصتنا', en: 'Our Story' },
        title: { ar: 'كيف بدأنا', en: 'How we started' },
        paragraphs: { ar: ['نحن دي ناين...'], en: ['We are D-NINE...'] }
      },
      mission: {
        title: { ar: 'رسالتنا', en: 'Our Mission' },
        description: { ar: 'تقديم الأفضل', en: 'Delivering the best' }
      },
      vision: {
        title: { ar: 'رؤيتنا', en: 'Our Vision' },
        description: { ar: 'الريادة عالمياً', en: 'Global leadership' }
      },
      values: {
        badge: { ar: 'قيمنا', en: 'Our Values' },
        title: { ar: 'مبادئنا الأساسية', en: 'Core Principles' },
        items: []
      }
    },
    {
      _id: 'contactPage',
      _type: 'contactPage',
      hero: {
        badge: { ar: 'تواصل معنا', en: 'Contact Us' },
        title: { ar: 'نحن هنا لخدمتك', en: 'We are here to serve you' },
        subtitle: { ar: 'يسعدنا تواصلك معنا', en: 'We look forward to hearing from you' }
      },
      contactInfo: {
        phone: '+966 50 000 0000',
        email: 'hello@d-nine.agency',
        address: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' }
      }
    },
    {
      _id: 'privacyPage',
      _type: 'privacyPage',
      title: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
      lastUpdated: '2024-01-01',
      body: { ar: [], en: [] }
    },
    {
      _id: 'termsPage',
      _type: 'termsPage',
      title: { ar: 'الشروط والأحكام', en: 'Terms of Service' },
      lastUpdated: '2024-01-01',
      body: { ar: [], en: [] }
    }
  ];

  for (const doc of singletons) {
    try {
      console.log(`Creating if not exists ${doc._id}...`);
      await client.createIfNotExists(doc);
    } catch (error) {
      console.error(`Failed to create ${doc._id}:`, error);
    }
  }

  // Set if missing for homePage and siteSettings
  console.log('Patching homePage if fields are missing...');
  try {
    await client
      .patch('homePage')
      .setIfMissing({
        seo: {
          metaTitle: { ar: 'الرئيسية | دي ناين', en: 'Home | D-NINE' },
          metaDescription: { ar: 'وكالة دي ناين للإنتاج الإعلامي', en: 'D-NINE Creative Agency' },
        },
      })
      .commit();
  } catch (err) {
    console.error('Failed to patch homePage:', err);
  }

  console.log('Patching siteSettings if fields are missing...');
  try {
    await client
      .patch('siteSettings')
      .setIfMissing({
        seo: {
          metaTitle: { ar: 'دي ناين', en: 'D-NINE' },
        },
      })
      .commit();
  } catch (err) {
    console.error('Failed to patch siteSettings:', err);
  }

  console.log('Migration completed successfully.');
}

main().catch(console.error);
