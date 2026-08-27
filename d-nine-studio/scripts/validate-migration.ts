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

  // 1. Fetch all target content documents
  const contentDocs: Array<{ _id: string; _type: string; [key: string]: any }> = await client.fetch(
    `*[_type in $types]{
      _id,
      _type,
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
      media
    }`,
    { types: TARGET_CONTENT_TYPES }
  );

  // 2. Fetch all asset documents
  const assetDocs: Array<{ _id: string; _type: string }> = await client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id, _type }`
  );
  const assetIdSet = new Set(assetDocs.map((a) => a._id));

  const counts: Record<string, number> = {};
  for (const doc of contentDocs) {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
  }

  console.log('📊 LIVE DOCUMENT COUNTS:');
  console.log(`   - contentCategory:   ${counts['contentCategory'] || 0} / 7 expected`);
  console.log(`   - author:            ${counts['author'] || 0} / 1 expected`);
  console.log(`   - service:           ${counts['service'] || 0} / 7 expected`);
  console.log(`   - serviceOffering:   ${counts['serviceOffering'] || 0} / 14 expected`);
  console.log(`   - project:           ${counts['project'] || 0} / 18 expected`);
  console.log(`   - blogPost:          ${counts['blogPost'] || 0} / 12 expected`);
  console.log(`   - homePage:          ${counts['homePage'] || 0} / 1 expected (singleton)`);
  console.log(`   - siteSettings:      ${counts['siteSettings'] || 0} / 1 expected (singleton)`);
  console.log(`   - servicesPage:      ${counts['servicesPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - workPage:          ${counts['workPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - blogPage:          ${counts['blogPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - aboutPage:         ${counts['aboutPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - contactPage:       ${counts['contactPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - privacyPage:       ${counts['privacyPage'] || 0} / 1 expected (singleton)`);
  console.log(`   - termsPage:         ${counts['termsPage'] || 0} / 1 expected (singleton)`);
  console.log('----------------------------------------------------------------');
  console.log(`📦 TOTAL CONTENT DOCS:  ${contentDocs.length} / 68 expected`);
  console.log(`🖼️  TOTAL ASSET DOCS:    ${assetDocs.length} (image & file assets in dataset)`);
  console.log('----------------------------------------------------------------\n');

  const validationErrors: string[] = [];

  // Assert expected counts
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
    if (actual !== expected) {
      validationErrors.push(`Mismatch for _type '${type}': expected ${expected}, got ${actual}`);
    }
  }

  if (contentDocs.length !== 68) {
    validationErrors.push(`Total content documents mismatch: expected 68, got ${contentDocs.length}`);
  }

  // 2. Referential integrity check
  if (contentDocs.length === 0) {
    console.log('⚠️ Referential Integrity: Not evaluable (dataset has 0 content documents).');
    validationErrors.push('Referential integrity validation cannot pass when dataset has 0 content documents.');
  } else {
    const allDocIds = new Set(contentDocs.map((d) => d._id));
    let brokenRefs = 0;
    let checkedAssetRefs = 0;
    let brokenAssetRefs = 0;

    // Check slugs uniqueness
    const slugsByType: Record<string, Set<string>> = {};
    for (const doc of contentDocs) {
      if (doc.slug && doc.slug.current) {
        if (!slugsByType[doc._type]) slugsByType[doc._type] = new Set();
        if (slugsByType[doc._type].has(doc.slug.current)) {
          validationErrors.push(`Duplicate slug in [${doc._type}]: '${doc.slug.current}'`);
        }
        slugsByType[doc._type].add(doc.slug.current);
      }

      // Check bilingual titles
      if (doc._type !== 'homePage' && doc._type !== 'siteSettings' && doc.title) {
        if (!doc.title.ar || typeof doc.title.ar !== 'string' || doc.title.ar.trim() === '') {
          validationErrors.push(`Missing Arabic title in doc [${doc._id}] (${doc._type})`);
        }
        if (!doc.title.en || typeof doc.title.en !== 'string' || doc.title.en.trim() === '') {
          validationErrors.push(`Missing English title in doc [${doc._id}] (${doc._type})`);
        }
      }

      // Check document references
      if (doc.category && doc.category._ref && !allDocIds.has(doc.category._ref)) {
        validationErrors.push(`Broken category ref in doc [${doc._id}]: ${doc.category._ref}`);
        brokenRefs++;
      }
      if (doc.primaryCategory && doc.primaryCategory._ref && !allDocIds.has(doc.primaryCategory._ref)) {
        validationErrors.push(`Broken primaryCategory ref in doc [${doc._id}]: ${doc.primaryCategory._ref}`);
        brokenRefs++;
      }
      if (Array.isArray(doc.categories)) {
        for (const catRef of doc.categories) {
          if (catRef && catRef._ref && !allDocIds.has(catRef._ref)) {
            validationErrors.push(`Broken category ref in doc [${doc._id}]: ${catRef._ref}`);
            brokenRefs++;
          }
        }
      }
      if (doc.parentService && doc.parentService._ref && !allDocIds.has(doc.parentService._ref)) {
        validationErrors.push(`Broken parentService ref in doc [${doc._id}]: ${doc.parentService._ref}`);
        brokenRefs++;
      }
      if (doc.author && doc.author._ref && !allDocIds.has(doc.author._ref)) {
        validationErrors.push(`Broken author ref in doc [${doc._id}]: ${doc.author._ref}`);
        brokenRefs++;
      }
      if (Array.isArray(doc.relatedServices)) {
        for (const srvRef of doc.relatedServices) {
          if (srvRef && srvRef._ref && !allDocIds.has(srvRef._ref)) {
            validationErrors.push(`Broken relatedService ref in doc [${doc._id}]: ${srvRef._ref}`);
            brokenRefs++;
          }
        }
      }
      if (Array.isArray(doc.featuredProjects)) {
        for (const pRef of doc.featuredProjects) {
          if (pRef && pRef._ref && !allDocIds.has(pRef._ref)) {
            validationErrors.push(`Broken featuredProject ref in [${doc._id}]: ${pRef._ref}`);
            brokenRefs++;
          }
        }
      }
      if (Array.isArray(doc.featuredServices)) {
        for (const sRef of doc.featuredServices) {
          if (sRef && sRef._ref && !allDocIds.has(sRef._ref)) {
            validationErrors.push(`Broken featuredService ref in [${doc._id}]: ${sRef._ref}`);
            brokenRefs++;
          }
        }
      }
      if (Array.isArray(doc.featuredPosts)) {
        for (const bRef of doc.featuredPosts) {
          if (bRef && bRef._ref && !allDocIds.has(bRef._ref)) {
            validationErrors.push(`Broken featuredPost ref in [${doc._id}]: ${bRef._ref}`);
            brokenRefs++;
          }
        }
      }

      // Check asset references
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
        for (const m of doc.media) {
          if (m?.imageAsset?.asset?._ref) checkAssetRef(m.imageAsset.asset._ref, 'media.imageAsset');
          if (m?.poster?.asset?._ref) checkAssetRef(m.poster.asset._ref, 'media.poster');
        }
      }
    }

    if (brokenRefs === 0) {
      console.log('✓ Document Referential Integrity: 100% Verified (0 broken document references).');
    }
    if (brokenAssetRefs === 0) {
      console.log(`✓ Media Asset Integrity: 100% Verified (${checkedAssetRefs} asset references resolve to valid Sanity assets).`);
    }
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



