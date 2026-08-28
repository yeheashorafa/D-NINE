import { getSanityClient } from './migrate-static-content.js';

const TARGET_CONTENT_TYPES = [
  'contentCategory',
  'service',
  'serviceOffering',
  'project',
  'blogPost',
  'author',
  'homePage',
  'siteSettings',
  'servicesPage',
  'workPage',
  'blogPage',
  'aboutPage',
  'contactPage',
  'privacyPage',
  'termsPage',
];

const SINGLETON_TYPES = [
  'homePage',
  'siteSettings',
  'servicesPage',
  'workPage',
  'blogPage',
  'aboutPage',
  'contactPage',
  'privacyPage',
  'termsPage',
];

async function validate() {
  console.log('================================================================');
  console.log('🔍 D-NINE SANITY LIVE DATASET CONTENT & INTEGRITY VALIDATION');
  console.log('================================================================\n');

  const { client, dataset, error } = getSanityClient();
  if (error || !client) {
    console.error(`❌ Client Initialization Error: ${error}`);
    process.exit(1);
  }

  console.log(`📡 Querying Dataset: [${dataset}] with useCdn: false...\n`);

  // Fetch all target content documents with deep fields
  const contentDocs: Array<{ _id: string; _type: string; [key: string]: any }> = await client.fetch(
    `*[_type in $types]{
      _id,
      _type,
      filterLabels,
      contactMethods,
      offices,
      mission,
      vision,
      description,
      title,
      slug,
      category,
      primaryCategory,
      categories,
      parentService,
      author,
      relatedServices,
      featuredProjects,
      featuredServices,
      featuredPosts,
      image,
      coverImage,
      defaultSeo,
      media,
      heroBadge,
      heroTitle,
      heroSubtitle,
      agencyStory,
      body,
      heroSlides,
      email,
      phoneDisplay,
      name
    }`,
    { types: TARGET_CONTENT_TYPES }
  );

  const assetDocs: Array<{ _id: string; _type: string }> = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id, _type }`
  );
  const assetIdSet = new Set(assetDocs.map((a) => a._id));

  const counts: Record<string, number> = {};
  for (const doc of contentDocs) {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
  }

  console.log('📊 LIVE DOCUMENT COUNTS:');
  const expectedCounts: Record<string, number> = {
    contentCategory: 7,
    author: 1,
    service: 7,
    serviceOffering: 14,
    project: 18,
    blogPost: 12,
    homePage: 1,
    siteSettings: 1,
    servicesPage: 1,
    workPage: 1,
    blogPage: 1,
    aboutPage: 1,
    contactPage: 1,
    privacyPage: 1,
    termsPage: 1,
  };

  for (const [type, expected] of Object.entries(expectedCounts)) {
    const actual = counts[type] || 0;
    console.log(`   - ${type.padEnd(18)}: ${String(actual).padStart(2)} / ${expected} expected${SINGLETON_TYPES.includes(type) ? ' (singleton)' : ''}`);
  }
  console.log('----------------------------------------------------------------');
  console.log(`📦 TOTAL CONTENT DOCS:  ${contentDocs.length} / 68 expected`);
  console.log(`🖼️  TOTAL ASSET DOCS:    ${assetDocs.length} (image & file assets in dataset)`);
  console.log('----------------------------------------------------------------\n');

  const validationErrors: string[] = [];

  for (const [type, expected] of Object.entries(expectedCounts)) {
    const actual = counts[type] || 0;
    if (actual !== expected) {
      validationErrors.push(`Mismatch for _type '${type}': expected ${expected}, got ${actual}`);
    }
  }

  if (contentDocs.length !== 68) {
    validationErrors.push(`Total content documents mismatch: expected 68, got ${contentDocs.length}`);
  }

  const allDocIds = new Set(contentDocs.map((d) => d._id));
  let brokenRefs = 0;
  let checkedAssetRefs = 0;
  let brokenAssetRefs = 0;
  const slugsByType: Record<string, Set<string>> = {};

  const isLocalized = (field: any) => field && typeof field.ar === 'string' && typeof field.en === 'string';
  const isPortableText = (field: any) => field && Array.isArray(field.ar) && field.ar.length > 0 && Array.isArray(field.en) && field.en.length > 0;

  for (const doc of contentDocs) {
    // Check Singletons
    if (SINGLETON_TYPES.includes(doc._type)) {
      if (doc._id !== doc._type) {
        validationErrors.push(`Deterministic Singleton ID failed: [${doc._type}] has ID '${doc._id}' instead of '${doc._type}'`);
      }
    }

    // Slugs
    if (doc.slug?.current) {
      if (!slugsByType[doc._type]) slugsByType[doc._type] = new Set();
      if (slugsByType[doc._type].has(doc.slug.current)) {
        validationErrors.push(`Duplicate slug in [${doc._type}]: '${doc.slug.current}'`);
      }
      slugsByType[doc._type].add(doc.slug.current);
    }

    // Bilingual Titles (for non-singletons)
    if (!SINGLETON_TYPES.includes(doc._type) && doc._type !== 'contentCategory' && doc._type !== 'author') {
      if (!isLocalized(doc.title)) {
        validationErrors.push(`Missing or invalid bilingual title in doc [${doc._id}] (${doc._type})`);
      }
    }

    if (doc._type === 'author') {
      if (!isLocalized(doc.name)) {
        validationErrors.push(`Missing or invalid bilingual name in doc [${doc._id}] (${doc._type})`);
      }
    }

    // Specific Singleton Checks
    if (['servicesPage', 'workPage', 'blogPage', 'contactPage', 'aboutPage'].includes(doc._type)) {
      if (!isLocalized(doc.heroTitle)) validationErrors.push(`Missing localized heroTitle on ${doc._id}`);
      if (!isLocalized(doc.heroBadge)) validationErrors.push(`Missing localized heroBadge on ${doc._id}`);
    }

    if (doc._type === 'aboutPage') {
      
      if (!isPortableText(doc.agencyStory)) validationErrors.push(`Missing valid Portable Text for agencyStory on ${doc._id}`);
      if (!isPortableText(doc.mission)) validationErrors.push(`Missing valid Portable Text for mission on ${doc._id}`);
      if (!isPortableText(doc.vision)) validationErrors.push(`Missing valid Portable Text for vision on ${doc._id}`);

    }

    
    if (doc._type === 'contactPage') {
      if (!isPortableText(doc.description)) validationErrors.push(`Missing Portable Text description on ${doc._id}`);
      if (!Array.isArray(doc.contactMethods) || doc.contactMethods.length === 0) validationErrors.push('Missing contactMethods');
      if (!Array.isArray(doc.offices) || doc.offices.length === 0) validationErrors.push('Missing offices');
    }
    if (['privacyPage', 'termsPage'].includes(doc._type)) {
      if (!isLocalized(doc.title)) validationErrors.push(`Missing localized title on ${doc._id}`);
      if (!isPortableText(doc.body)) validationErrors.push(`Missing valid Portable Text body on ${doc._id}`);
    }

    if (doc._type === 'siteSettings') {
      if (!doc.defaultSeo || !isLocalized(doc.defaultSeo.metaTitle)) validationErrors.push(`Missing localized defaultSeo.metaTitle on siteSettings`);
      if (typeof doc.email !== 'string' || !doc.email.includes('@')) validationErrors.push(`Invalid or missing email on siteSettings`);
    }

    if (doc._type === 'homePage') {
      if (!Array.isArray(doc.heroSlides) || doc.heroSlides.length === 0) {
        validationErrors.push(`Missing heroSlides array on homePage`);
      } else {
        doc.heroSlides.forEach((slide: any, index: number) => {
          if (!slide.image?.asset?._ref) validationErrors.push(`Missing image asset on homePage heroSlide[${index}]`);
        });
      }
    }

    // Document References Check
    const checkRef = (refObj: any, context: string) => {
      if (refObj && refObj._ref && !allDocIds.has(refObj._ref)) {
        validationErrors.push(`Broken ${context} ref in doc [${doc._id}]: ${refObj._ref}`);
        brokenRefs++;
      }
    };

    checkRef(doc.category, 'category');
    checkRef(doc.primaryCategory, 'primaryCategory');
    checkRef(doc.parentService, 'parentService');
    checkRef(doc.author, 'author');

    if (Array.isArray(doc.categories)) doc.categories.forEach(c => checkRef(c, 'categories'));
    if (Array.isArray(doc.relatedServices)) doc.relatedServices.forEach(s => checkRef(s, 'relatedServices'));
    if (Array.isArray(doc.featuredProjects)) doc.featuredProjects.forEach(p => checkRef(p, 'featuredProjects'));
    if (Array.isArray(doc.featuredServices)) doc.featuredServices.forEach(s => checkRef(s, 'featuredServices'));
    if (Array.isArray(doc.featuredPosts)) doc.featuredPosts.forEach(p => checkRef(p, 'featuredPosts'));

    // Asset References Check
    const checkAssetRef = (ref?: string, context?: string) => {
      if (!ref) return;
      checkedAssetRefs++;
      if (!assetIdSet.has(ref)) {
        validationErrors.push(`Broken asset ref in doc [${doc._id}] (${context}): ${ref}`);
        brokenAssetRefs++;
      }
    };

    if (doc.image?.asset?._ref) checkAssetRef(doc.image.asset._ref, 'image');
    if (doc.coverImage?.asset?._ref) checkAssetRef(doc.coverImage.asset._ref, 'coverImage');
    if (doc.defaultSeo?.ogImage?.asset?._ref) checkAssetRef(doc.defaultSeo.ogImage.asset._ref, 'defaultSeo.ogImage');
    if (Array.isArray(doc.media)) {
      doc.media.forEach((m: any) => {
        if (m?.imageAsset?.asset?._ref) checkAssetRef(m.imageAsset.asset._ref, 'media.imageAsset');
        if (m?.poster?.asset?._ref) checkAssetRef(m.poster.asset._ref, 'media.poster');
      });
    }
  }

  if (brokenRefs === 0 && checkedAssetRefs > 0) {
    console.log('✓ Document Referential Integrity: 100% Verified (0 broken document references).');
  }
  if (brokenAssetRefs === 0) {
    console.log(`✓ Media Asset Integrity: 100% Verified (${checkedAssetRefs} asset references resolve to valid Sanity assets).`);
  }

  if (validationErrors.length > 0) {
    console.error('\n❌ Validation Errors Encountered:');
    validationErrors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  console.log('\n🎉 ALL SANITY LIVE VALIDATION CHECKS PASSED SUCCESSFULLY!\n');
}

validate().catch((err) => {
  console.error('Validation script fatal error:', err?.message || err);
  process.exit(1);
});



