import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient, type SanityClient } from '@sanity/client';
import { CONTENT_CATEGORIES } from './data/categories.data.js';
import { PRIMARY_SERVICES } from './data/services.data.js';
import { SERVICE_OFFERINGS } from './data/service-offerings.data.js';
import { PROJECTS_DATA } from './data/projects.data.js';
import { BLOG_POSTS_DATA } from './data/blog-posts.data.js';
import { PROCESS_TIMELINE_STEPS } from './data/agency.data.js';
import { AssetRegistry } from './upload-assets.js';
import {
  validateBilingualField,
  convertBlogSectionsToPortableText,
} from './migration-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STUDIO_ROOT = path.resolve(__dirname, '..');
const FRONTEND_PUBLIC_DIR = path.resolve(__dirname, '../../d-nine-frontend/public');

function loadStudioEnv(): {
  projectId: string;
  dataset: string;
  writeToken: string;
} {
  const envFiles = [
    path.join(STUDIO_ROOT, '.env.local'),
    path.join(STUDIO_ROOT, '.env'),
  ];

  const envVars: Record<string, string> = { ...process.env as Record<string, string> };

  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (!envVars[key]) {
            envVars[key] = val;
          }
        }
      }
    }
  }

  const projectId = envVars.SANITY_STUDIO_PROJECT_ID || envVars.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const dataset = envVars.SANITY_STUDIO_DATASET || envVars.NEXT_PUBLIC_SANITY_DATASET || 'development';
  const writeToken = envVars.SANITY_API_WRITE_TOKEN || '';

  return { projectId, dataset, writeToken };
}

export function getSanityClient(): { client: SanityClient | null; dataset: string; error?: string } {
  const { projectId, dataset, writeToken } = loadStudioEnv();

  if (dataset !== 'development') {
    return {
      client: null,
      dataset,
      error: `Safety constraint violation: dataset must be 'development', but received '${dataset}'. Aborting.`,
    };
  }

  if (!projectId) {
    return {
      client: null,
      dataset,
      error: 'Missing SANITY_STUDIO_PROJECT_ID in environment variables.',
    };
  }

  if (!writeToken) {
    return {
      client: null,
      dataset,
      error: 'Missing SANITY_API_WRITE_TOKEN in environment variables.',
    };
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2025-01-01',
    useCdn: false,
    token: writeToken,
  });

  return { client, dataset };
}

interface MigrationStats {
  categories: number;
  authors: number;
  services: number;
  serviceOfferings: number;
  projects: number;
  blogPosts: number;
  singletons: number;
  totalDocs: number;
  uniqueAssets: number;
  missingFiles: string[];
  validationErrors: string[];
  missingReferences: string[];
}

const TARGET_CONTENT_TYPES = [
  'contentCategory',
  'service',
  'serviceOffering',
  'project',
  'blogPost',
  'author',
  'homePage',
  'siteSettings',
];

export async function runMigration(isDryRun: boolean = true) {
  console.log('================================================================');
  console.log(`🚀 D-NINE SANITY STATIC CONTENT MIGRATION [${isDryRun ? 'CONNECTED DRY-RUN' : 'LIVE MIGRATION'}]`);
  console.log('================================================================\n');

  // 1. Check client connection and dataset pre-state
  const { client, dataset, error: clientErr } = getSanityClient();
  if (clientErr || !client) {
    console.error(`❌ Client Initialization Error: ${clientErr}`);
    throw new Error(clientErr);
  }

  console.log(`📡 Connected to Sanity Project. Target Dataset: [${dataset}]`);

  // Query only target content types and asset types (never touching system documents)
  let preContentDocs: Array<{ _id: string; _type: string }> = [];
  let preAssetDocs: Array<{ _id: string; _type: string }> = [];
  try {
    preContentDocs = await client.fetch(
      `*[_type in $types]{ _id, _type }`,
      { types: TARGET_CONTENT_TYPES }
    );
    preAssetDocs = await client.fetch(
      `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id, _type }`
    );
  } catch (err: any) {
    console.error('❌ Failed to connect to Sanity dataset:', err?.message || err);
    throw new Error(`Sanity connectivity failed: ${err?.message || err}`);
  }

  console.log(`\n📦 DATASET PRE-MIGRATION STATE:`);
  console.log(`   - Existing Content Documents: ${preContentDocs.length}`);
  console.log(`   - Existing Asset Documents:   ${preAssetDocs.length}`);

  if (preContentDocs.length > 0) {
    const countsByType: Record<string, number> = {};
    for (const d of preContentDocs) {
      countsByType[d._type] = (countsByType[d._type] || 0) + 1;
    }
    console.log(`   - Content Breakdown:`, JSON.stringify(countsByType, null, 2));
  } else {
    console.log(`   - Dataset is currently clean of target content documents.`);
  }

  const assetRegistry = new AssetRegistry(FRONTEND_PUBLIC_DIR);
  const validationErrors: string[] = [];
  const missingReferences: string[] = [];
  const registeredIds = new Set<string>();
  const registeredSlugsByType: Record<string, Set<string>> = {
    contentCategory: new Set(),
    service: new Set(),
    serviceOffering: new Set(),
    project: new Set(),
    blogPost: new Set(),
  };

  const checkDuplicateId = (id: string, type: string) => {
    if (registeredIds.has(id)) {
      validationErrors.push(`[${type}] Duplicate document _id detected: '${id}'`);
    }
    registeredIds.add(id);
  };

  const checkDuplicateSlug = (slug: string, type: string) => {
    if (registeredSlugsByType[type].has(slug)) {
      validationErrors.push(`[${type}] Duplicate slug detected: '${slug}'`);
    }
    registeredSlugsByType[type].add(slug);
  };

  // 1. Content Categories (7)
  const categoryDocs: any[] = [];
  for (const cat of CONTENT_CATEGORIES) {
    const docId = cat.id || `cat-${cat.slug}`;
    checkDuplicateId(docId, 'contentCategory');
    checkDuplicateSlug(cat.slug, 'contentCategory');
    validateBilingualField(docId, 'title', cat.title, validationErrors);
    if (cat.description) {
      validateBilingualField(docId, 'description', cat.description, validationErrors);
    }

    categoryDocs.push({
      _id: docId,
      _type: 'contentCategory',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      order: cat.order,
      active: cat.active,
    });
  }

  // 2. Authors (1)
  const authorDocs: any[] = [
    {
      _id: 'author-dnine-creative-team',
      _type: 'author',
      name: {
        ar: 'فريق الإنتاج الإبداعي — دي ناين',
        en: 'D-NINE Creative Team',
      },
      role: {
        ar: 'قسم الإنتاج والاستراتيجيات الإبداعية',
        en: 'Creative Production & Strategy Dept.',
      },
      bio: {
        ar: 'فريق متخصص في تصميم الهوية البصرية، صناعة الفيديوهات، وإدارة الحملات الإعلانية المتكاملة عبر الشرق الأوسط.',
        en: 'Specialized agency team delivering brand identity, video production, and integrated creative campaigns across the GCC.',
      },
      image: undefined, // Populated after asset sync
      active: true,
    },
  ];
  checkDuplicateId('author-dnine-creative-team', 'author');

  // Register Assets from Services, Projects, Blog, Offerings, Author, SEO
  assetRegistry.registerFile('/media/team/team-1.jpg');
  assetRegistry.registerFile('/media/seo/d-nine-og.jpg');
  assetRegistry.registerFile('/media/video/showreel-poster.jpg');

  for (const srv of PRIMARY_SERVICES) {
    if (srv.image) assetRegistry.registerFile(srv.image);
  }
  for (const off of SERVICE_OFFERINGS) {
    if (off.image) assetRegistry.registerFile(off.image);
  }
  for (const prj of PROJECTS_DATA) {
    if (prj.image || prj.coverImage) assetRegistry.registerFile(prj.coverImage || prj.image);
    if (prj.poster) assetRegistry.registerFile(prj.poster);
    for (const m of prj.media || []) {
      if (m.type === 'video') {
        if (m.poster) assetRegistry.registerFile(m.poster);
      } else {
        if (m.src) assetRegistry.registerFile(m.src);
      }
    }
  }
  for (const post of BLOG_POSTS_DATA) {
    if (post.image) assetRegistry.registerFile(post.image);
  }

  // Sync assets with Sanity if live write
  let assetSyncStats = { existingInDataset: 0, newlyUploaded: 0, totalAssets: 0, errors: [] as string[] };
  if (!isDryRun) {
    console.log('\n🔄 Syncing Assets with Sanity...');
    assetSyncStats = await assetRegistry.syncWithSanity(client);
    console.log(`   - Existing Assets Reused: ${assetSyncStats.existingInDataset}`);
    console.log(`   - Newly Uploaded Assets:  ${assetSyncStats.newlyUploaded}`);
    if (assetSyncStats.errors.length > 0) {
      validationErrors.push(...assetSyncStats.errors);
    }
  }

  // Helper to build image object
  const makeImageObject = (relPath?: string, alt?: { ar: string; en: string }) => {
    if (!relPath) return undefined;
    const assetId = assetRegistry.getAssetId(relPath);
    if (!assetId) return undefined;
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
      alt: alt || { ar: '', en: '' },
    };
  };

  // 3. Primary Services (7)
  const serviceDocs: any[] = [];
  for (const srv of PRIMARY_SERVICES) {
    const docId = srv.id || `srv-${srv.slug}`;
    checkDuplicateId(docId, 'service');
    checkDuplicateSlug(srv.slug, 'service');
    validateBilingualField(docId, 'title', srv.title, validationErrors);
    validateBilingualField(docId, 'shortDescription', srv.shortDescription, validationErrors);
    validateBilingualField(docId, 'fullDescription', srv.fullDescription, validationErrors);

    const targetCatId = `cat-${srv.categorySlug}`;
    if (!registeredIds.has(targetCatId)) {
      missingReferences.push(`[${docId}] Reference category not found: '${targetCatId}'`);
    }

    const imgObj = srv.image ? makeImageObject(srv.image, srv.title) : undefined;

    serviceDocs.push({
      _id: docId,
      _type: 'service',
      title: srv.title,
      slug: { _type: 'slug', current: srv.slug },
      category: { _type: 'reference', _ref: targetCatId },
      iconName: srv.iconName,
      image: imgObj,
      featured: srv.featured,
      order: PRIMARY_SERVICES.indexOf(srv) + 1,
      shortDescription: srv.shortDescription,
      fullDescription: srv.fullDescription,
      benefits: srv.benefits,
      deliverables: srv.deliverables?.en?.map((del: any, i: number) => ({
        _key: `del_${i}`,
        _type: 'serviceDeliverable',
        title: {
          ar: srv.deliverables.ar?.[i]?.title || del.title,
          en: del.title,
        },
        description: {
          ar: srv.deliverables.ar?.[i]?.description || del.description,
          en: del.description,
        },
      })) || [],
      processSteps: srv.processSteps?.en?.map((stp: any, i: number) => ({
        _key: `stp_${i}`,
        _type: 'serviceProcessStep',
        stepNumber: stp.stepNumber,
        title: {
          ar: srv.processSteps.ar?.[i]?.title || stp.title,
          en: stp.title,
        },
        description: {
          ar: srv.processSteps.ar?.[i]?.description || stp.description,
          en: stp.description,
        },
      })) || [],
      faqs: srv.faqs?.en?.map((faq: any, i: number) => ({
        _key: `faq_${i}`,
        _type: 'serviceFaq',
        question: {
          ar: srv.faqs.ar?.[i]?.question || faq.question,
          en: faq.question,
        },
        answer: {
          ar: srv.faqs.ar?.[i]?.answer || faq.answer,
          en: faq.answer,
        },
      })) || [],
    });
  }

  // 4. Service Offerings (14)
  const offeringDocs: any[] = [];
  for (const off of SERVICE_OFFERINGS) {
    const docId = off.id || `off-${off.slug}`;
    checkDuplicateId(docId, 'serviceOffering');
    checkDuplicateSlug(off.slug, 'serviceOffering');
    validateBilingualField(docId, 'title', off.title, validationErrors);
    validateBilingualField(docId, 'description', off.description, validationErrors);

    const parentSrvId = `srv-${off.parentServiceSlug}`;
    const targetCatId = `cat-${off.categorySlug}`;
    if (!registeredIds.has(parentSrvId)) {
      missingReferences.push(`[${docId}] Reference parent service not found: '${parentSrvId}'`);
    }
    if (!registeredIds.has(targetCatId)) {
      missingReferences.push(`[${docId}] Reference category not found: '${targetCatId}'`);
    }

    const imgObj = off.image ? makeImageObject(off.image, off.title) : undefined;

    offeringDocs.push({
      _id: docId,
      _type: 'serviceOffering',
      title: off.title,
      slug: { _type: 'slug', current: off.slug },
      parentService: { _type: 'reference', _ref: parentSrvId },
      category: { _type: 'reference', _ref: targetCatId },
      image: imgObj,
      description: off.description,
      featured: off.featured,
      order: SERVICE_OFFERINGS.indexOf(off) + 1,
    });
  }

  // 5. Projects (18)
  const projectDocs: any[] = [];
  for (const prj of PROJECTS_DATA) {
    const docId = prj.id || `prj-${prj.slug}`;
    checkDuplicateId(docId, 'project');
    checkDuplicateSlug(prj.slug, 'project');
    validateBilingualField(docId, 'title', prj.title, validationErrors);
    validateBilingualField(docId, 'clientName', prj.clientName, validationErrors);
    validateBilingualField(docId, 'summary', prj.summary, validationErrors);

    const primaryCatId = `cat-${prj.primaryCategorySlug}`;
    if (!registeredIds.has(primaryCatId)) {
      missingReferences.push(`[${docId}] Primary category not found: '${primaryCatId}'`);
    }

    const additionalCategoryRefs = (prj.categorySlugs || [])
      .filter((slug: string) => slug !== prj.primaryCategorySlug)
      .map((slug: string) => {
        const catRefId = `cat-${slug}`;
        if (!registeredIds.has(catRefId)) {
          missingReferences.push(`[${docId}] Additional category not found: '${catRefId}'`);
        }
        return { _key: `cat_ref_${slug}`, _type: 'reference', _ref: catRefId };
      });

    const coverImgObj = makeImageObject(prj.coverImage || prj.image, prj.title);

    const mediaItems: any[] = (prj.media || []).map((m: any, idx: number) => {
      const altObj = typeof m.alt === 'object' ? m.alt : { ar: m.alt || '', en: m.alt || '' };
      if (m.type === 'video') {
        const posterObj = m.poster ? makeImageObject(m.poster, altObj) : undefined;
        return {
          _key: `med_${idx}`,
          _type: 'projectMedia',
          type: 'video',
          videoUrl: m.src,
          poster: posterObj,
          aspectRatio: m.aspectRatio || '16:9',
          alt: altObj,
          caption: m.caption,
        };
      }
      const imageAssetObj = m.src ? makeImageObject(m.src, altObj) : undefined;
      return {
        _key: `med_${idx}`,
        _type: 'projectMedia',
        type: 'image',
        imageAsset: imageAssetObj,
        aspectRatio: m.aspectRatio || '16:9',
        alt: altObj,
        caption: m.caption,
      };
    });

    projectDocs.push({
      _id: docId,
      _type: 'project',
      title: prj.title,
      slug: { _type: 'slug', current: prj.slug },
      clientName: prj.clientName,
      year: prj.year || '2025',
      primaryCategory: { _type: 'reference', _ref: primaryCatId },
      categories: additionalCategoryRefs,
      featured: prj.featured || false,
      colorVariant: prj.colorVariant || 'purple',
      order: PROJECTS_DATA.indexOf(prj) + 1,
      coverImage: coverImgObj,
      summary: prj.summary,
      challenge: prj.challenge,
      strategy: prj.strategy,
      solution: prj.solution,
      deliverables: prj.deliverables,
      metrics: (prj.metrics || []).map((met: any, idx: number) => ({
        _key: `met_${idx}`,
        _type: 'projectMetric',
        label: met.label,
        value: met.value,
      })),
      media: mediaItems,
      credits: prj.credits,
    });
  }

  // 6. Blog Posts (12)
  const blogDocs: any[] = [];
  for (const post of BLOG_POSTS_DATA) {
    const docId = post.id || `post-${post.slug}`;
    checkDuplicateId(docId, 'blogPost');
    checkDuplicateSlug(post.slug, 'blogPost');
    validateBilingualField(docId, 'title', post.title, validationErrors);
    validateBilingualField(docId, 'excerpt', post.excerpt, validationErrors);

    const catId = `cat-${post.categorySlug}`;
    if (!registeredIds.has(catId)) {
      missingReferences.push(`[${docId}] Blog category not found: '${catId}'`);
    }

    const relatedServiceRefs = (post.relatedServiceSlugs || []).map((slug: string) => {
      const srvRefId = `srv-${slug}`;
      if (!registeredIds.has(srvRefId)) {
        missingReferences.push(`[${docId}] Related service not found: '${srvRefId}'`);
      }
      return { _key: `srv_ref_${slug}`, _type: 'reference', _ref: srvRefId };
    });

    const coverImgObj = post.image ? makeImageObject(post.image, post.title) : undefined;
    const { ar: arBody, en: enBody } = convertBlogSectionsToPortableText(post.sections || []);

    blogDocs.push({
      _id: docId,
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: { _type: 'reference', _ref: catId },
      relatedServices: relatedServiceRefs,
      author: { _type: 'reference', _ref: 'author-dnine-creative-team' },
      publishedAt: post.publishedAt ? `${post.publishedAt}T12:00:00Z` : new Date().toISOString(),
      readTimeMinutes: post.readTimeMinutes || 5,
      featured: post.featured || false,
      coverImage: coverImgObj,
      excerpt: post.excerpt,
      body: {
        ar: arBody,
        en: enBody,
      },
      tags: post.tags,
    });
  }

  // 7. Singletons (2)
  const homePageDoc = {
    _id: 'homePage',
    _type: 'homePage',
    heroHeadline: {
      ar: 'دي ناين — نصنع هوية تلهم وعالمًا بصريًا يتحرك',
      en: 'D-NINE — Crafting Iconic Identities & Cinematic Motion',
    },
    heroSubtitle: {
      ar: 'وكالة إبداعية متكاملة في الرياض ودبي تجمع بين الفكرة الاستراتيجية والتنفيذ السينمائي الفاخر.',
      en: 'Full-service creative agency in Riyadh & Dubai bridging strategic brand thinking and cinematic production.',
    },
    featuredProjects: projectDocs
      .filter((p) => p.featured)
      .slice(0, 6)
      .map((p) => ({ _key: `f_prj_${p._id}`, _type: 'reference', _ref: p._id })),
    featuredServices: serviceDocs
      .filter((s) => s.featured)
      .map((s) => ({ _key: `f_srv_${s._id}`, _type: 'reference', _ref: s._id })),
    featuredPosts: blogDocs
      .filter((b) => b.featured)
      .map((b) => ({ _key: `f_blg_${b._id}`, _type: 'reference', _ref: b._id })),
    processTimeline: PROCESS_TIMELINE_STEPS.map((step, idx) => ({
      _key: `proc_${idx}`,
      _type: 'serviceProcessStep',
      stepNumber: step.step,
      title: step.title,
      description: step.description,
    })),
  };
  checkDuplicateId('homePage', 'homePage');

  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: {
      ar: 'دي ناين للإنتاج الإعلامي والتصميم',
      en: 'D-NINE Creative Agency & Media Production',
    },
    legalName: {
      ar: 'مؤسسة دي ناين لخدمات الدعاية والإعلان',
      en: 'D-NINE Advertising & Media Production Est.',
    },
    email: 'info@dnine.agency',
    phone: '+966 50 000 0000 [PENDING_OFFICIAL_NUMBER]',
    locations: {
      ar: ['الرياض — المملكة العربية السعودية', 'دبي — الإمارات العربية المتحدة'],
      en: ['Riyadh, Kingdom of Saudi Arabia', 'Dubai, United Arab Emirates'],
    },
    socialLinks: [
      { _key: 'soc_x', _type: 'socialLink', platform: 'x', url: 'https://x.com/dnineagency' },
      { _key: 'soc_insta', _type: 'socialLink', platform: 'instagram', url: 'https://instagram.com/dnineagency' },
      { _key: 'soc_in', _type: 'socialLink', platform: 'linkedin', url: 'https://linkedin.com/company/dnineagency' },
      { _key: 'soc_tk', _type: 'socialLink', platform: 'tiktok', url: 'https://tiktok.com/@dnineagency' },
    ],
    defaultSeo: {
      metaTitle: {
        ar: 'دي ناين — وكالة إبداعية وإنتاج إعلامي',
        en: 'D-NINE — Creative Agency & Media Production',
      },
      metaDescription: {
        ar: 'وكالة متخصصة في تصميم الهوية البصرية، إنتاج الفيديو، والحملات الإبداعية في الرياض ودبي.',
        en: 'Premier creative agency specializing in branding, video production, and integrated campaigns.',
      },
      ogImage: makeImageObject('/media/seo/d-nine-og.jpg'),
    },
  };
  checkDuplicateId('siteSettings', 'siteSettings');

  // Attach author image
  authorDocs[0].image = makeImageObject('/media/team/team-1.jpg', authorDocs[0].name);

  const allDocuments = [
    ...categoryDocs,
    ...authorDocs,
    ...serviceDocs,
    ...offeringDocs,
    ...projectDocs,
    ...blogDocs,
    homePageDoc,
    siteSettingsDoc,
  ];

  const stats: MigrationStats = {
    categories: categoryDocs.length,
    authors: authorDocs.length,
    services: serviceDocs.length,
    serviceOfferings: offeringDocs.length,
    projects: projectDocs.length,
    blogPosts: blogDocs.length,
    singletons: 2,
    totalDocs: allDocuments.length,
    uniqueAssets: assetRegistry.getUniqueAssetCount(),
    missingFiles: assetRegistry.getMissingFiles(),
    validationErrors,
    missingReferences,
  };

  // Print Detailed Report
  console.log('\n----------------------------------------------------------------');
  console.log(`📊 ${isDryRun ? 'DRY-RUN AUDIT REPORT' : 'LIVE MIGRATION EXECUTION'}:`);
  console.log('----------------------------------------------------------------');
  console.log(`✓ Content Categories:     ${stats.categories}`);
  console.log(`✓ Authors:                ${stats.authors}`);
  console.log(`✓ Primary Services:       ${stats.services}`);
  console.log(`✓ Service Offerings:      ${stats.serviceOfferings}`);
  console.log(`✓ Projects & Cases:       ${stats.projects}`);
  console.log(`✓ Blog Posts:             ${stats.blogPosts}`);
  console.log(`✓ Singletons:             ${stats.singletons} (homePage, siteSettings)`);
  console.log(`----------------------------------------------------------------`);
  console.log(`📦 TOTAL TARGET DOCUMENTS:  ${stats.totalDocs}`);
  console.log(`🖼️  UNIQUE ASSETS DETECTED:  ${stats.uniqueAssets}`);
  console.log('----------------------------------------------------------------\n');

  if (stats.missingFiles.length > 0) {
    console.log('⚠️ Missing Asset Files:');
    stats.missingFiles.forEach((f) => console.log(`   - ${f}`));
  } else {
    console.log('✓ All referenced local public assets verified on disk.');
  }

  if (stats.missingReferences.length > 0) {
    console.log('\n❌ Missing References:');
    stats.missingReferences.forEach((r) => console.log(`   - ${r}`));
  } else {
    console.log('✓ Referential Integrity: 100% Verified (0 broken references).');
  }

  if (stats.validationErrors.length > 0) {
    console.log('\n❌ Validation & Schema Errors:');
    stats.validationErrors.forEach((e) => console.log(`   - ${e}`));
  } else {
    console.log('✓ Bilingual Field Validation: 100% Passed for all Arabic and English content.');
  }

  if (stats.validationErrors.length > 0 || stats.missingReferences.length > 0) {
    throw new Error('Pre-flight validation failed with errors. Aborting migration.');
  }

  // 4. Live Write Execution (createIfNotExists in safe dependency batches)
  if (!isDryRun) {
    console.log(`\n🚀 Executing Live Migration on Dataset [${dataset}]...`);

    // Check which IDs already exist before mutation
    const docIds = allDocuments.map((d) => d._id);
    const existingInSanity: string[] = await client.fetch(
      `*[_id in $docIds]._id`,
      { docIds }
    );
    const existingSet = new Set(existingInSanity);

    // Validate if there are conflicting document IDs or types in dataset
    for (const preDoc of preContentDocs) {
      if (!docIds.includes(preDoc._id)) {
        console.warn(`⚠️ Detected pre-existing content document outside migration set: ${preDoc._id} (${preDoc._type})`);
      }
    }

    let createdCount = 0;
    let reusedCount = 0;
    let failedCount = 0;

    // Dependency-safe order batches
    const batches = [
      { name: 'Content Categories', docs: categoryDocs },
      { name: 'Authors', docs: authorDocs },
      { name: 'Primary Services', docs: serviceDocs },
      { name: 'Service Offerings', docs: offeringDocs },
      { name: 'Projects', docs: projectDocs },
      { name: 'Blog Posts', docs: blogDocs },
      { name: 'Singletons (homePage, siteSettings)', docs: [homePageDoc, siteSettingsDoc] },
    ];

    for (const batch of batches) {
      console.log(`   ↳ Processing ${batch.name} (${batch.docs.length} documents)...`);
      for (const doc of batch.docs) {
        const isExisting = existingSet.has(doc._id);
        if (isExisting) {
          reusedCount++;
        } else {
          try {
            await client.createIfNotExists(doc);
            createdCount++;
            existingSet.add(doc._id);
          } catch (err: any) {
            failedCount++;
            console.error(`❌ Failed to write document '${doc._id}' (${doc._type}):`, err?.message || err);
            throw err;
          }
        }
      }
    }

    console.log('\n================================================================');
    console.log('🎉 LIVE MIGRATION COMPLETED SUCCESSFULLY:');
    console.log(`   - Target Dataset:             ${dataset}`);
    console.log(`   - Assets Uploaded (New):      ${assetSyncStats.newlyUploaded}`);
    console.log(`   - Assets Reused (Existing):   ${assetSyncStats.existingInDataset}`);
    console.log(`   - Documents Created (New):    ${createdCount}`);
    console.log(`   - Documents Reused/Skipped:   ${reusedCount}`);
    console.log(`   - Documents Failed:           ${failedCount}`);
    console.log(`   - Total Target Documents:     ${allDocuments.length}`);
    console.log('================================================================\n');

    return { stats, allDocuments, createdCount, reusedCount, failedCount, assetSyncStats };
  }

  console.log('\n================================================================');
  console.log('🎉 CONNECTED DRY-RUN SUCCEEDED — READY FOR SAFE INITIAL MIGRATION');
  console.log('================================================================\n');

  return { stats, allDocuments };
}

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].includes('migrate-static-content')) {
  const args = new Set(process.argv.slice(2));
  const isDryRun = args.has('--dry-run');
  const isExecute = args.has('--execute');

  if (isDryRun === isExecute) {
    console.error('❌ Usage Error: Migration script requires exactly one mode flag: either --dry-run or --execute.');
    console.error('   Usage: npm run content:migrate:dry --workspace=d-nine-studio  (for connected dry run)');
    console.error('   Usage: npm run content:migrate     --workspace=d-nine-studio  (for live initial migration write)');
    process.exit(1);
  }

  runMigration(isDryRun).catch((err) => {
    console.error('Migration failed with fatal error:', err?.message || err);
    process.exit(1);
  });
}



