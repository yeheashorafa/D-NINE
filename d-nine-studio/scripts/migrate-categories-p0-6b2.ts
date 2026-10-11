import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient, type SanityClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CategoryDefinition {
  key: string;
  id: string;
  order: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
}

export const CANONICAL_CATEGORIES: CategoryDefinition[] = [
  {
    key: 'motion-graphics',
    id: 'cat-motion-graphics',
    order: 1,
    title: {
      ar: 'الموشن جرافيك',
      en: 'Motion Graphics',
    },
    description: {
      ar: 'رسوم متحركة إبداعية ومؤثرات بصرية تنبض بالحياة وتبسط المفاهيم المعقدة بجاذبية فائقة.',
      en: 'Dynamic motion graphics and 2D/3D visual animations crafted to tell stories and engage audiences.',
    },
  },
  {
    key: 'video-editing',
    id: 'cat-video-editing',
    order: 2,
    title: {
      ar: 'المونتاج وتحرير الفيديو',
      en: 'Video Editing',
    },
    description: {
      ar: 'مونتاج سينمائي وإيقاع بصري متقن وتلوين احترافي يمنح فيديوهاتك طابعاً استثنائياً.',
      en: 'High-end video editing, pacing, color grading, and sound design tailored for impactful narratives.',
    },
  },
  {
    key: 'social-media-design',
    id: 'cat-social-media-design',
    order: 3,
    title: {
      ar: 'تصاميم السوشيال ميديا',
      en: 'Social Media Design',
    },
    description: {
      ar: 'تصاميم سوشيال ميديا مبتكرة تعزز تفاعل الجمهور وتبرز حضور علامتك الرقمية.',
      en: 'High-converting, visually striking social media assets designed for modern digital feeds.',
    },
  },
  {
    key: 'print-design',
    id: 'cat-print-design',
    order: 4,
    title: {
      ar: 'التصاميم والمطبوعات',
      en: 'Print Design',
    },
    description: {
      ar: 'تصاميم مطبوعات فاخرة ومنشورات وكتيبات دعائية تضمن أعلى معايير الجودة والتميز الملموس.',
      en: 'Premium editorial, packaging, publication, and tangible collateral built for flawless print execution.',
    },
  },
  {
    key: 'brand-identity',
    id: 'cat-brand-identity',
    order: 5,
    title: {
      ar: 'تصميم الشعارات والهويات البصرية',
      en: 'Brand Identity',
    },
    description: {
      ar: 'بناء أنظمة هوية متكاملة وشعارات استراتيجية تعبر عن روح العلامة التجارية وتدوم في الذاكرة.',
      en: 'Comprehensive brand identity systems, logo systems, and visual guidelines that stand the test of time.',
    },
  },
  {
    key: 'artificial-intelligence',
    id: 'cat-artificial-intelligence',
    order: 6,
    title: {
      ar: 'الذكاء الاصطناعي والإنتاج الرقمي',
      en: 'Artificial Intelligence',
    },
    description: {
      ar: 'تسخير أدوات وتقنيات الذكاء الاصطناعي التوليدي لابتكار أعمال بصرية رائدة وغير مسبوقة.',
      en: 'Cutting-edge generative AI workflows and visual synthesis pushing the boundaries of creative innovation.',
    },
  },
  {
    key: 'exhibitions',
    id: 'cat-exhibitions',
    order: 7,
    title: {
      ar: 'المعارض وتجهيز المساحات',
      en: 'Exhibitions',
    },
    description: {
      ar: 'تصميم أجنحة المعارض وتجهيز المساحات التفاعلية لتقديم تجارب حضور غامرة ومميزة.',
      en: 'Immersive exhibition booths, spatial branding, and interactive environmental design.',
    },
  },
  {
    key: 'festivals',
    id: 'cat-festivals',
    order: 8,
    title: {
      ar: 'المهرجانات والفعاليات',
      en: 'Festivals',
    },
    description: {
      ar: 'هويات بصرية وتغطيات شاملة للمهرجانات والفعاليات الكبرى تصنع زخماً جماهيرياً لا يُنسى.',
      en: 'Complete visual identity and experiential branding for grand-scale festivals and cultural celebrations.',
    },
  },
];

export const LEGACY_CATEGORY_IDS = [
  'cat-graphic-design',
  'cat-integrated-marketing',
  'cat-short-video-reels',
  'cat-social-content',
  'cat-social-management',
  'cat-video-production',
];

export const CANONICAL_CATEGORY_IDS = CANONICAL_CATEGORIES.map((c) => c.id);

export const PROJECT_CATEGORY_MAP: Record<string, string> = {
  'prj-01': 'brand-identity',
  'prj-02': 'video-editing',
  'prj-03': 'print-design',
  'prj-04': 'video-editing',
  'prj-05': 'social-media-design',
  'prj-06': 'video-editing',
  'prj-07': 'brand-identity',
  'prj-08': 'exhibitions',
  'prj-09': 'brand-identity',
  'prj-10': 'video-editing',
  'prj-11': 'social-media-design',
  'prj-12': 'brand-identity',
  'prj-13': 'video-editing',
  'prj-14': 'print-design',
  'prj-15': 'motion-graphics',
  'prj-16': 'social-media-design',
  'prj-17': 'motion-graphics',
  'prj-18': 'brand-identity',
};

export const EXPECTED_PROJECT_COUNT = 18;
export const EXPECTED_PROJECT_IDS = Object.keys(PROJECT_CATEGORY_MAP).sort();

export interface MigrationOptions {
  apply?: boolean;
  writeToken?: string;
  readToken?: string;
  envFilePath?: string;
}

export interface ProjectMigrationPlan {
  projectId: string;
  slug: string;
  titleAr?: string;
  oldPrimaryCategoryRef?: string;
  oldPrimaryCategorySlug?: string;
  oldCategoriesRefs: string[];
  newPrimaryCategoryRef: string;
  newPrimaryCategorySlug: string;
  newCategoriesRefs: string[];
  primaryRefChanged: boolean;
  categoriesCleared: boolean;
  remainingLegacyRefsInProject: string[];
}

export interface CategoryActionPlan {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  order: number;
  action: 'create' | 'update_in_place' | 'noop';
  reason: string;
  currentTitleAr?: string;
  currentOrder?: number;
}

export interface AuditReferenceItem {
  docId: string;
  docType: string;
  path: string;
  ref: string;
}

export interface GlobalAuditResult {
  totalDocsScanned: number;
  legacyCategoryDocCount: number;
  totalLegacyReferencesFound: number;
  referencesByDocType: Record<string, number>;
  projectLegacyPrimaryRefsCount: number;
  projectLegacyCategoriesRefsCount: number;
  nonProjectLegacyRefsCount: number;
  details: AuditReferenceItem[];
}

export interface DryRunReport {
  isDryRun: boolean;
  applyFlagProvided: boolean;
  writeTokenProvided: boolean;
  executedMutationsCount: number;
  documentsToCreate: CategoryActionPlan[];
  documentsToUpdate: Array<CategoryActionPlan | { id: string; type: 'project'; description: string }>;
  projectsBeforeCount: number;
  projectsAfterCount: number;
  projectPlans: ProjectMigrationPlan[];
  categoryDistribution: Record<string, number>;
  emptyCategories: string[];
  globalAudit: GlobalAuditResult;
  expectedLegacyRefsInProjectsAfterApply: number;
  transactionId?: string;
  errors: string[];
}

export function loadTokensFromEnv(envFilePath?: string): { readToken?: string; writeToken?: string } {
  const resolvedPath = envFilePath || path.resolve(__dirname, '../../d-nine-frontend/.env.local');
  if (!fs.existsSync(resolvedPath)) {
    return {};
  }
  const content = fs.readFileSync(resolvedPath, 'utf8');
  const parsed = dotenv.parse(content);
  return {
    readToken: parsed.SANITY_API_READ_TOKEN,
    writeToken: parsed.SANITY_API_WRITE_TOKEN,
  };
}

export function validateProjectList(projects: Array<{ _id: string }>): void {
  const projectIds = projects.map((p) => p._id).sort();
  if (projectIds.length !== EXPECTED_PROJECT_COUNT) {
    throw new Error(
      `Project validation failed: expected exactly ${EXPECTED_PROJECT_COUNT} projects, found ${projectIds.length}.`
    );
  }

  for (const expectedId of EXPECTED_PROJECT_IDS) {
    if (!projectIds.includes(expectedId)) {
      throw new Error(`Project validation failed: missing expected project ${expectedId}.`);
    }
  }

  for (const actualId of projectIds) {
    if (!PROJECT_CATEGORY_MAP[actualId]) {
      throw new Error(`Project validation failed: unexpected or unmapped project ID ${actualId}.`);
    }
  }
}

export function performGlobalAudit(docs: Array<Record<string, any>>): GlobalAuditResult {
  const referencesFound: AuditReferenceItem[] = [];

  function findRefs(val: any, currentPath: string, docId: string, docType: string) {
    if (!val || typeof val !== 'object') return;
    if (val._ref && typeof val._ref === 'string') {
      if (LEGACY_CATEGORY_IDS.includes(val._ref)) {
        referencesFound.push({
          docId,
          docType,
          path: currentPath,
          ref: val._ref,
        });
      }
    }
    for (const [k, v] of Object.entries(val)) {
      if (k === '_id' || k === '_type' || k === '_rev') continue;
      findRefs(v, currentPath ? `${currentPath}.${k}` : k, docId, docType);
    }
  }

  let legacyCategoryDocCount = 0;
  for (const doc of docs) {
    if (LEGACY_CATEGORY_IDS.includes(doc._id)) {
      legacyCategoryDocCount++;
      continue;
    }
    findRefs(doc, '', doc._id, doc._type || 'unknown');
  }

  const referencesByDocType: Record<string, number> = {};
  let projectLegacyPrimaryRefsCount = 0;
  let projectLegacyCategoriesRefsCount = 0;
  let nonProjectLegacyRefsCount = 0;

  for (const item of referencesFound) {
    referencesByDocType[item.docType] = (referencesByDocType[item.docType] || 0) + 1;
    if (item.docType === 'project') {
      if (item.path === 'primaryCategory') {
        projectLegacyPrimaryRefsCount++;
      } else if (item.path.startsWith('categories')) {
        projectLegacyCategoriesRefsCount++;
      }
    } else {
      nonProjectLegacyRefsCount++;
    }
  }

  return {
    totalDocsScanned: docs.length,
    legacyCategoryDocCount,
    totalLegacyReferencesFound: referencesFound.length,
    referencesByDocType,
    projectLegacyPrimaryRefsCount,
    projectLegacyCategoriesRefsCount,
    nonProjectLegacyRefsCount,
    details: referencesFound,
  };
}

export function calculateMigrationPlan(
  existingCategories: Array<{ _id: string; slug?: { current?: string }; title?: { ar?: string; en?: string }; order?: number; active?: boolean }>,
  existingProjects: Array<{
    _id: string;
    slug?: { current?: string };
    title?: { ar?: string; en?: string };
    primaryCategory?: { _ref?: string };
    resolvedPrimary?: { _id?: string; slug?: { current?: string } };
    categories?: Array<{ _ref?: string }>;
  }>
): {
  categoryPlans: CategoryActionPlan[];
  projectPlans: ProjectMigrationPlan[];
  categoryDistribution: Record<string, number>;
  emptyCategories: string[];
  expectedLegacyRefsInProjectsAfterApply: number;
} {
  validateProjectList(existingProjects);

  const existingCatMap = new Map(existingCategories.map((c) => [c._id, c]));

  const categoryPlans: CategoryActionPlan[] = CANONICAL_CATEGORIES.map((catDef) => {
    const existing = existingCatMap.get(catDef.id);
    if (!existing) {
      return {
        id: catDef.id,
        slug: catDef.key,
        titleAr: catDef.title.ar,
        titleEn: catDef.title.en,
        order: catDef.order,
        action: 'create',
        reason: 'Canonical category does not exist in Sanity and will be created with fixed ID',
      };
    }

    const needsTitleUpdate = existing.title?.ar !== catDef.title.ar || existing.title?.en !== catDef.title.en;
    const needsOrderUpdate = existing.order !== catDef.order;

    if (needsTitleUpdate || needsOrderUpdate) {
      return {
        id: catDef.id,
        slug: catDef.key,
        titleAr: catDef.title.ar,
        titleEn: catDef.title.en,
        order: catDef.order,
        action: 'update_in_place',
        reason: 'Canonical category exists (reused in-place safely) and will be updated with canonical title/order',
        currentTitleAr: existing.title?.ar,
        currentOrder: existing.order,
      };
    }

    return {
      id: catDef.id,
      slug: catDef.key,
      titleAr: catDef.title.ar,
      titleEn: catDef.title.en,
      order: catDef.order,
      action: 'noop',
      reason: 'Canonical category exists with identical properties',
      currentTitleAr: existing.title?.ar,
      currentOrder: existing.order,
    };
  });

  const categoryDistribution: Record<string, number> = {};
  for (const cat of CANONICAL_CATEGORIES) {
    categoryDistribution[cat.key] = 0;
  }

  let expectedLegacyRefsInProjectsAfterApply = 0;

  const projectPlans: ProjectMigrationPlan[] = existingProjects.map((p) => {
    const targetKey = PROJECT_CATEGORY_MAP[p._id];
    if (!targetKey) {
      throw new Error(`Project ${p._id} has no mapped canonical category!`);
    }

    categoryDistribution[targetKey] = (categoryDistribution[targetKey] || 0) + 1;

    const oldPrimaryRef = p.primaryCategory?._ref;
    const oldPrimarySlug = p.resolvedPrimary?.slug?.current;
    const oldCategoriesRefs = (p.categories || []).map((c) => c._ref || '').filter(Boolean);

    const newPrimaryRef = `cat-${targetKey}`;
    const primaryRefChanged = oldPrimaryRef !== newPrimaryRef;

    // RULE: To clean and simplify Dashboard, set categories to [] for all 18 projects
    const newCategoriesRefs: string[] = [];
    const categoriesCleared = oldCategoriesRefs.length > 0;

    // Remaining legacy refs verification
    const remainingLegacyRefs: string[] = [];
    if (LEGACY_CATEGORY_IDS.includes(newPrimaryRef)) {
      remainingLegacyRefs.push(newPrimaryRef);
      expectedLegacyRefsInProjectsAfterApply++;
    }
    for (const ref of newCategoriesRefs) {
      if (LEGACY_CATEGORY_IDS.includes(ref)) {
        remainingLegacyRefs.push(ref);
        expectedLegacyRefsInProjectsAfterApply++;
      }
    }

    return {
      projectId: p._id,
      slug: p.slug?.current || '',
      titleAr: p.title?.ar,
      oldPrimaryCategoryRef: oldPrimaryRef,
      oldPrimaryCategorySlug: oldPrimarySlug,
      oldCategoriesRefs: oldCategoriesRefs,
      newPrimaryCategoryRef: newPrimaryRef,
      newPrimaryCategorySlug: targetKey,
      newCategoriesRefs: newCategoriesRefs,
      primaryRefChanged: primaryRefChanged,
      categoriesCleared: categoriesCleared,
      remainingLegacyRefsInProject: remainingLegacyRefs,
    };
  });

  const emptyCategories = CANONICAL_CATEGORIES
    .map((c) => c.key)
    .filter((key) => categoryDistribution[key] === 0);

  return {
    categoryPlans,
    projectPlans,
    categoryDistribution,
    emptyCategories,
    expectedLegacyRefsInProjectsAfterApply,
  };
}

export async function runP06B2Migration(options: MigrationOptions = {}): Promise<DryRunReport> {
  const isApply = Boolean(options.apply);

  const envTokens = loadTokensFromEnv(options.envFilePath);
  const readToken = options.readToken !== undefined ? options.readToken : envTokens.readToken;
  const writeToken = options.writeToken !== undefined ? options.writeToken : envTokens.writeToken;

  if (!readToken) {
    throw new Error('SANITY_API_READ_TOKEN is missing or empty. Cannot read Sanity documents.');
  }

  // Safety constraint: Refuse any writes unless --apply is passed with a separate SANITY_API_WRITE_TOKEN
  if (isApply) {
    if (!writeToken) {
      throw new Error(
        'Execution rejected: --apply flag was passed but SANITY_API_WRITE_TOKEN is missing. ' +
        'Writes require a valid, explicit SANITY_API_WRITE_TOKEN.'
      );
    }
    if (writeToken === readToken) {
      throw new Error(
        'Execution rejected: SANITY_API_WRITE_TOKEN cannot be identical to SANITY_API_READ_TOKEN. ' +
        'Read token must never be used for mutations.'
      );
    }
  }

  const client: SanityClient = createClient({
    projectId: 'xg3zrwt3',
    dataset: 'development',
    useCdn: false,
    token: readToken,
    apiVersion: '2024-01-01',
    perspective: 'published',
  });

  // 1. Fetch all documents for global audit
  const allDocs = await client.fetch<Array<Record<string, any>>>('*[!(_id in path("_.**"))]');
  const globalAudit = performGlobalAudit(allDocs);

  // 2. Fetch categories and projects specifically
  const existingCategories = await client.fetch<Array<{
    _id: string;
    slug?: { current?: string };
    title?: { ar?: string; en?: string };
    order?: number;
    active?: boolean;
  }>>('*[_type == "contentCategory"] | order(order asc, _id asc)');

  const existingProjects = await client.fetch<Array<{
    _id: string;
    slug?: { current?: string };
    title?: { ar?: string; en?: string };
    primaryCategory?: { _ref?: string };
    resolvedPrimary?: { _id?: string; slug?: { current?: string } };
    categories?: Array<{ _ref?: string }>;
  }>>('*[_type == "project"] | order(_id asc) { _id, title, slug, primaryCategory, "resolvedPrimary": primaryCategory->{_id, slug}, categories }');

  const {
    categoryPlans,
    projectPlans,
    categoryDistribution,
    emptyCategories,
    expectedLegacyRefsInProjectsAfterApply,
  } = calculateMigrationPlan(existingCategories, existingProjects);

  const documentsToCreate = categoryPlans.filter((c) => c.action === 'create');
  const documentsToUpdate: Array<CategoryActionPlan | { id: string; type: 'project'; description: string }> = [
    ...categoryPlans.filter((c) => c.action === 'update_in_place'),
    ...projectPlans.map((p) => {
      const parts: string[] = [];
      if (p.primaryRefChanged) {
        parts.push(`primaryCategory: ${p.oldPrimaryCategoryRef} -> ${p.newPrimaryCategoryRef}`);
      }
      if (p.categoriesCleared) {
        parts.push(`categories: [${p.oldCategoriesRefs.join(', ')}] -> [] (cleared)`);
      }
      return {
        id: p.projectId,
        type: 'project' as const,
        description: parts.join(' | ') || 'No project field changes needed',
      };
    }),
  ];

  let executedMutationsCount = 0;
  let transactionId: string | undefined;

  if (isApply) {
    console.log('Initiating P0.6B2 Apply mutation transaction with write token...');
    const writeClient: SanityClient = createClient({
      projectId: 'xg3zrwt3',
      dataset: 'development',
      useCdn: false,
      token: writeToken,
      apiVersion: '2024-01-01',
    });

    const tx = writeClient.transaction();

    // 1. Create missing canonical categories
    for (const cat of documentsToCreate) {
      const docStub = {
        _id: cat.id,
        _type: 'contentCategory',
        title: {
          ar: cat.titleAr,
          en: cat.titleEn,
        },
        slug: {
          _type: 'slug',
          current: cat.slug,
        },
        order: cat.order,
        active: true,
      };
      tx.createIfNotExists(docStub);
      executedMutationsCount++;
    }

    // 2. Update cat-brand-identity in-place
    const updateCategories = categoryPlans.filter((c) => c.action === 'update_in_place');
    for (const cat of updateCategories) {
      tx.patch(cat.id, (patch) =>
        patch.set({
          title: {
            ar: cat.titleAr,
            en: cat.titleEn,
          },
          order: cat.order,
          active: true,
        })
      );
      executedMutationsCount++;
    }

    // 3. Update all 18 projects: primaryCategory & set categories to []
    for (const p of projectPlans) {
      tx.patch(p.projectId, (patch) =>
        patch.set({
          primaryCategory: {
            _type: 'reference',
            _ref: p.newPrimaryCategoryRef,
          },
          categories: [],
        })
      );
      executedMutationsCount++;
    }

    const commitResult = await tx.commit();
    transactionId = commitResult.transactionId;
    console.log(`Transaction successfully committed! ID: ${transactionId}`);
  }

  return {
    isDryRun: !isApply,
    applyFlagProvided: isApply,
    writeTokenProvided: Boolean(writeToken),
    executedMutationsCount,
    transactionId,
    documentsToCreate,
    documentsToUpdate,
    projectsBeforeCount: existingProjects.length,
    projectsAfterCount: existingProjects.length,
    projectPlans,
    categoryDistribution,
    emptyCategories,
    globalAudit,
    expectedLegacyRefsInProjectsAfterApply,
    errors: [],
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');

  runP06B2Migration({ apply })
    .then((report) => {
      console.log('================================================================');
      console.log('         P0.6B2 CATEGORIES & PROJECTS CLEANUP DRY RUN REPORT     ');
      console.log('================================================================');
      console.log(`Execution Mode          : ${report.isDryRun ? 'DRY RUN (Read Only)' : 'EXECUTE'}`);
      console.log(`Executed Mutations Count: ${report.executedMutationsCount}`);
      if (report.transactionId) {
        console.log(`Transaction ID          : ${report.transactionId}`);
      }
      console.log(`Projects Before / After : ${report.projectsBeforeCount} / ${report.projectsAfterCount}`);
      console.log('----------------------------------------------------------------');
      console.log('GLOBAL AUDIT: EXISTING LEGACY CATEGORY REFERENCES ACROSS SANITY:');
      console.log(`  Total docs scanned in dataset : ${report.globalAudit.totalDocsScanned}`);
      console.log(`  Total legacy references found : ${report.globalAudit.totalLegacyReferencesFound}`);
      console.log(`  Breakdown by document type    :`);
      for (const [docType, count] of Object.entries(report.globalAudit.referencesByDocType)) {
        console.log(`    - ${docType.padEnd(18)}: ${count} references`);
      }
      console.log(`  Project primaryCategory refs : ${report.globalAudit.projectLegacyPrimaryRefsCount}`);
      console.log(`  Project categories array refs : ${report.globalAudit.projectLegacyCategoriesRefsCount}`);
      console.log(`  Non-project documents refs    : ${report.globalAudit.nonProjectLegacyRefsCount} (in service, serviceOffering, blogPost)`);
      console.log('----------------------------------------------------------------');
      console.log('PROPOSED CHANGES FOR 18 PROJECTS:');
      for (const p of report.projectPlans) {
        console.log(`  [${p.projectId}] (${p.slug})`);
        console.log(`    * primaryCategory : [${p.oldPrimaryCategoryRef}] -> [${p.newPrimaryCategoryRef}] (${p.newPrimaryCategorySlug}) [${p.primaryRefChanged ? 'CHANGED' : 'UNCHANGED'}]`);
        console.log(`    * categories      : [${p.oldCategoriesRefs.join(', ') || 'empty'}] -> [${p.newCategoriesRefs.join(', ') || 'empty'}] [${p.categoriesCleared ? 'CLEARED TO []' : 'UNCHANGED'}]`);
      }
      console.log('----------------------------------------------------------------');
      console.log('PROJECT LEGACY REFERENCES AFTER PROPOSED APPLY:');
      console.log(`  Expected legacy references in 18 projects after apply : ${report.expectedLegacyRefsInProjectsAfterApply} (Zero!)`);
      console.log('----------------------------------------------------------------');
      console.log('CATEGORY DISTRIBUTION (PRIMARY ONLY):');
      for (const [cat, count] of Object.entries(report.categoryDistribution)) {
        console.log(`  * ${cat.padEnd(25)} : ${count} projects`);
      }
      console.log('----------------------------------------------------------------');
      console.log(`EMPTY CATEGORIES (${report.emptyCategories.length}):`, report.emptyCategories.join(', '));
      console.log('----------------------------------------------------------------');
      console.log('DOCUMENTS TO BE CREATED (Categories):');
      for (const doc of report.documentsToCreate) {
        console.log(`  + [${doc.id}] (${doc.slug}) "${doc.titleAr}" (order: ${doc.order})`);
      }
      console.log('----------------------------------------------------------------');
      console.log('DOCUMENTS TO BE UPDATED:');
      for (const doc of report.documentsToUpdate) {
        if ('type' in doc && doc.type === 'project') {
          console.log(`  ~ [${doc.id}] ${doc.description}`);
        } else if ('action' in doc) {
          console.log(`  ~ [${doc.id}] (${doc.slug}) Update title to "${doc.titleAr}" and order to ${doc.order}`);
        }
      }
      console.log('================================================================');
    })
    .catch((err) => {
      console.error('Migration error:', err.message);
      process.exit(1);
    });
}
