import { createClient } from '@sanity/client';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import type { SanityDocumentStub } from '@sanity/client';
import { AssetRegistry } from './upload-assets.js';
import { buildGranularSetIfMissing, resolveDeterministicId } from './utils/migration-utils.js';
import { STATIC_TEAM_MEMBERS } from '../../d-nine-frontend/src/features/home/data/team.data.js';
import { STATIC_TESTIMONIALS } from '../../d-nine-frontend/src/features/home/data/testimonials.data.js';

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

  const missingFiles = assetRegistry.getMissingFiles();

  if (missingFiles.length > 0) {
    throw new Error(
      `Missing required local assets:\n${missingFiles.join('\n')}`
    );
  }

  if (!isDryRun) {
    console.log('🔄 Syncing missing assets...');

    const syncResult = await assetRegistry.syncWithSanity(client);

    if (syncResult.errors.length > 0) {
      throw new Error(
        `Asset synchronization failed:\n${syncResult.errors.join('\n')}`
      );
    }
  }

  const makeImageObject = (
    relPath: string,
    alt: { ar: string; en: string }
  ) => {
    if (isDryRun) {
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          // In-memory planning reference only. Never sent to Sanity.
          _ref: `dry-run-asset-${relPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        },
        alt,
      };
    }

    const assetId = assetRegistry.getAssetId(relPath);

    if (!assetId) {
      throw new Error(`Missing Sanity asset ID for ${relPath}`);
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

  const teamRefs = STATIC_TEAM_MEMBERS.map(m => {
    const docId = resolveDeterministicId('team', m.id, m.name.en);
    return { _key: `team_${docId}`, _type: 'reference', _ref: docId };
  });

  const testimonialRefs = STATIC_TESTIMONIALS.map(t => {
    const docId = resolveDeterministicId('testimonial', t.id, t.personName.en);
    return { _key: `test_${docId}`, _type: 'reference', _ref: docId };
  });

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
      testimonials: {
        enabled: testimonialRefs.length > 0,
        title: { ar: 'اراء العملاء', en: 'Testimonials' },
        selectedTestimonials: testimonialRefs,
        maxItems: 6,
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
      heroTitle: { ar: 'نحن دي ناين', en: 'We are D-NINE' },
      heroSubtitle: { ar: 'نقدم لك أفضل الحلول الإبداعية', en: 'We provide you with the best creative solutions' },
      agencyStory: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'دي ناين هي وكالة إبداعية رائدة متخصصة في تقديم حلول متكاملة في التصميم والإنتاج الإعلامي. انطلقنا برؤية طموحة لتمكين العلامات التجارية من تحقيق أهدافها.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'D-NINE is a leading creative agency specializing in comprehensive design and media production solutions. We launched with an ambitious vision to empower brands to achieve their goals.', _key: '3' }], _key: '4', markDefs: [] }]
      },
      mission: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'مهمتنا هي صياغة قصص بصرية مبتكرة تعزز من حضور عملائنا في السوق، مع الالتزام بأعلى معايير الجودة والإبداع في كل مشروع.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our mission is to craft innovative visual stories that enhance our clients\' market presence, committing to the highest standards of quality and creativity in every project.', _key: '3' }], _key: '4', markDefs: [] }]
      },
      vision: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'أن نكون الوكالة الخيار الأول للإبداع والإنتاج الإعلامي في منطقة الشرق الأوسط وشمال أفريقيا، من خلال تقديم أعمال استثنائية تلهم الجماهير.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'To be the creative and media production agency of choice in the MENA region, delivering exceptional work that inspires audiences.', _key: '3' }], _key: '4', markDefs: [] }]
      },
      values: [],
      seo: {
        metaTitle: { ar: 'من نحن | دي ناين', en: 'About | D-NINE' },
        metaDescription: { ar: 'تعرف على قصة وكالة دي ناين.', en: 'Learn about D-NINE agency story.' },
      },
      team: {
        enabled: teamRefs.length > 0,
        title: { ar: 'فريق العمل', en: 'Our Team' },
        selectedTeamMembers: teamRefs,
        maxItems: 8,
      },
      testimonials: {
        enabled: testimonialRefs.length > 0,
        title: { ar: 'اراء العملاء', en: 'Testimonials' },
        selectedTestimonials: testimonialRefs,
        maxItems: 6,
      },
    },
    contactPage: {
      _type: 'contactPage',
      heroBadge: { ar: 'تواصل معنا', en: 'Contact Us' },
      heroTitle: { ar: 'نحن هنا لخدمتك', en: 'We are here to serve you' },
      heroSubtitle: { ar: 'يسعدنا تواصلك معنا لبدء مشروعك القادم', en: 'We look forward to hearing from you to start your next project' },
      description: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'فريق دي ناين متاح دائماً للإجابة على استفساراتك ومناقشة تفاصيل مشروعك. لا تتردد في الاتصال بنا عبر أي من القنوات المتاحة أدناه.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'The D-NINE team is always available to answer your inquiries and discuss your project details. Feel free to reach out through any of the channels below.', _key: '3' }], _key: '4', markDefs: [] }]
      },
      contactMethods: [
        { _key: 'm1', type: 'email', title: { ar: 'البريد الإلكتروني', en: 'Email' }, value: 'hello@d-nine.agency', link: 'mailto:hello@d-nine.agency' },
        { _key: 'm2', type: 'phone', title: { ar: 'رقم الهاتف', en: 'Phone' }, value: '+966 50 123 4567', link: 'tel:+966501234567' }
      ],
      offices: [{ _key: 'o1', title: { ar: 'المقر الرئيسي - الرياض', en: 'Headquarters - Riyadh' }, address: { ar: 'شارع التحلية، الرياض، المملكة العربية السعودية', en: 'Tahlia Street, Riyadh, Saudi Arabia' }, email: 'hq@d-nine.agency', phone: '+966 50 123 4567' }],
      seo: {
        metaTitle: { ar: 'تواصل معنا | دي ناين', en: 'Contact | D-NINE' },
        metaDescription: { ar: 'تواصل مع وكالة دي ناين.', en: 'Contact D-NINE agency.' },
      },
    },
    privacyPage: {
      _type: 'privacyPage',
      title: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
      lastUpdated: '2024-01-01',
      body: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'في دي ناين، نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيف نجمع ونستخدم ونشارك معلوماتك عند استخدام خدماتنا.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'At D-NINE, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and share your information when using our services.', _key: '3' }], _key: '4', markDefs: [] }]
      },
      seo: {
        metaTitle: { ar: 'سياسة الخصوصية | دي ناين', en: 'Privacy Policy | D-NINE' },
      },
    },
    termsPage: {
      _type: 'termsPage',
      title: { ar: 'الشروط والأحكام', en: 'Terms of Service' },
      lastUpdated: '2024-01-01',
      body: {
        ar: [{ _type: 'block', children: [{ _type: 'span', text: 'استخدامك لموقع وخدمات دي ناين يخضع لهذه الشروط والأحكام. يرجى قراءتها بعناية قبل المضي قدماً في أي تعاون معنا.', _key: '1' }], _key: '2', markDefs: [] }],
        en: [{ _type: 'block', children: [{ _type: 'span', text: 'Your use of D-NINE website and services is subject to these terms and conditions. Please read them carefully before proceeding with any collaboration.', _key: '3' }], _key: '4', markDefs: [] }]
      },
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
      teamPreview: {
        enabled: teamRefs.length > 0,
        title: { ar: 'فريق العمل', en: 'Our Team' },
        selectedTeamMembers: teamRefs,
        maxItems: 8,
      },
      testimonials: {
        enabled: testimonialRefs.length > 0,
        title: { ar: 'اراء العملاء', en: 'Testimonials' },
        selectedTestimonials: testimonialRefs,
        maxItems: 6,
      },
      seo: {
        metaTitle: { ar: 'الرئيسية | دي ناين', en: 'Home | D-NINE' },
        metaDescription: { ar: 'وكالة دي ناين للإنتاج الإعلامي', en: 'D-NINE Creative Agency' },
      },
    }
  };

  const ids = Object.keys(singletons);

  // Fetch full documents to compare fields
  const existingDocs = await client.fetch(`*[_id in $ids]`, { ids });
  const existingDocsMap = new Map<string, any>(existingDocs.map((doc: any) => [doc._id, doc]));

  // Helper imported from ./utils/migration-utils.js

  if (isDryRun) {
    console.log('DRY RUN: Planning mutations...');
    for (const [id, doc] of Object.entries(singletons)) {
      const cleanedDoc = clean(doc);
      if (!existingDocsMap.has(id)) {
        console.log(`- Would CREATE document: ${id}`);
      } else {
        const existing = existingDocsMap.get(id);
        const granularPaths = buildGranularSetIfMissing(cleanedDoc, existing);
        if (Object.keys(granularPaths).length > 0) {
          console.log(`- Would PATCH document: ${id} with setIfMissing:`, Object.keys(granularPaths));
        } else {
          console.log(`- No changes needed for document: ${id}`);
        }
      }
    }
    console.log('DRY RUN complete. Zero mutations performed.');
    return;
  }

  // Execute Mode
  let transaction = client.transaction();
  let hasMutations = false;

  for (const [id, doc] of Object.entries(singletons)) {
    const cleanedDoc = clean(doc);
    if (!existingDocsMap.has(id)) {
      console.log(`Adding CREATE to transaction for: ${id}`);
      transaction = transaction.createIfNotExists({ _id: id, ...cleanedDoc });
      hasMutations = true;
    } else {
      const existing = existingDocsMap.get(id);
      const granularPaths = buildGranularSetIfMissing(cleanedDoc, existing);
      if (Object.keys(granularPaths).length > 0) {
        console.log(`Adding PATCH to transaction for: ${id}`, Object.keys(granularPaths));
        transaction = transaction.patch(id, (p) => p.setIfMissing(granularPaths));
        hasMutations = true;
      }
    }
  }

  if (!hasMutations) {
    console.log('No mutations needed. All documents are up to date.');
    return;
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