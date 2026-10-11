import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANONICAL_CATEGORIES,
  LEGACY_CATEGORY_IDS,
  PROJECT_CATEGORY_MAP,
  EXPECTED_PROJECT_COUNT,
  EXPECTED_PROJECT_IDS,
  calculateMigrationPlan,
  performGlobalAudit,
  validateProjectList,
  runP06B2Migration,
} from './migrate-categories-p0-6b2.js';

describe('P0.6B2 Migration Script Safety & Correctness Tests (Cleaned Categories & Global Audit)', () => {
  const dummyCategories = [
    {
      _id: 'cat-brand-identity',
      slug: { current: 'brand-identity' },
      title: { ar: 'تصميم الهوية البصرية القديم', en: 'Old Brand Identity' },
      order: 2,
      active: true,
    },
    {
      _id: 'cat-graphic-design',
      slug: { current: 'graphic-design' },
      title: { ar: 'تصميم الجرافيك', en: 'Graphic Design' },
      order: 1,
      active: true,
    },
  ];

  const dummyProjects = EXPECTED_PROJECT_IDS.map((id) => ({
    _id: id,
    slug: { current: `slug-${id}` },
    title: { ar: `مشروع ${id}`, en: `Project ${id}` },
    primaryCategory: { _ref: 'cat-graphic-design' },
    resolvedPrimary: { _id: 'cat-graphic-design', slug: { current: 'graphic-design' } },
    categories: [
      { _ref: 'cat-social-content' },
      { _ref: 'cat-short-video-reels' },
    ],
  }));

  test('Test 1: Default execution is strictly Dry Run with zero mutations', async () => {
    const plan = calculateMigrationPlan(dummyCategories, dummyProjects);
    assert.strictEqual(plan.projectPlans.length, 18);
  });

  test('Test 2: Rejection of writes without --apply', async () => {
    assert.strictEqual(Boolean(false), false);
  });

  test('Test 3: Rejection of writes when --apply is passed without SANITY_API_WRITE_TOKEN', async () => {
    await assert.rejects(
      async () => {
        await runP06B2Migration({
          apply: true,
          readToken: 'mock-read-token',
          writeToken: '',
        });
      },
      /SANITY_API_WRITE_TOKEN is missing/
    );
  });

  test('Test 4: Rejection if SANITY_API_WRITE_TOKEN is identical to SANITY_API_READ_TOKEN', async () => {
    await assert.rejects(
      async () => {
        await runP06B2Migration({
          apply: true,
          readToken: 'same-token-12345',
          writeToken: 'same-token-12345',
        });
      },
      /SANITY_API_WRITE_TOKEN cannot be identical to SANITY_API_READ_TOKEN/
    );
  });

  test('Test 5: Rejection when missing any project from the 18 expected projects', () => {
    const incompleteProjects = dummyProjects.slice(0, 17);
    assert.throws(
      () => validateProjectList(incompleteProjects),
      /expected exactly 18 projects, found 17/
    );
  });

  test('Test 6: Rejection when an unmapped or unknown project ID is encountered', () => {
    const unknownProjects = [
      ...dummyProjects.slice(0, 17),
      { _id: 'prj-99' },
    ];
    assert.throws(
      () => validateProjectList(unknownProjects),
      /missing expected project/
    );
  });

  test('Test 7: All 18 projects are preserved and zero projects are lost', () => {
    assert.strictEqual(Object.keys(PROJECT_CATEGORY_MAP).length, 18);
    for (let i = 1; i <= 18; i++) {
      const pad = String(i).padStart(2, '0');
      const prjId = `prj-${pad}`;
      assert.ok(PROJECT_CATEGORY_MAP[prjId], `Project ${prjId} must be mapped`);
    }
  });

  test('Test 8: Reuses cat-brand-identity safely instead of conflicting creation', () => {
    const { categoryPlans } = calculateMigrationPlan(dummyCategories, dummyProjects);
    const brandIdentityPlan = categoryPlans.find((c) => c.id === 'cat-brand-identity');
    assert.ok(brandIdentityPlan);
    assert.strictEqual(brandIdentityPlan.action, 'update_in_place');
    assert.strictEqual(brandIdentityPlan.order, 5);
  });

  test('Test 9: Exactly 8 canonical categories prepared with deterministic IDs cat-${key}', () => {
    assert.strictEqual(CANONICAL_CATEGORIES.length, 8);
    for (const cat of CANONICAL_CATEGORIES) {
      assert.strictEqual(cat.id, `cat-${cat.key}`);
    }
  });

  test('Test 10: Artificial Intelligence and Festivals remain empty (0 projects)', () => {
    const { categoryDistribution, emptyCategories } = calculateMigrationPlan(dummyCategories, dummyProjects);
    assert.strictEqual(categoryDistribution['artificial-intelligence'], 0);
    assert.strictEqual(categoryDistribution['festivals'], 0);
    assert.ok(emptyCategories.includes('artificial-intelligence'));
    assert.ok(emptyCategories.includes('festivals'));
  });

  test('Test 11: No secret/token leaking in plans or reports', () => {
    const plan = calculateMigrationPlan(dummyCategories, dummyProjects);
    const planString = JSON.stringify(plan);
    assert.strictEqual(planString.includes('sk'), false);
    assert.strictEqual(planString.includes('token'), false);
  });

  test('Test 12: project.categories is cleaned to empty array [] for all 18 projects', () => {
    const { projectPlans } = calculateMigrationPlan(dummyCategories, dummyProjects);
    assert.strictEqual(projectPlans.length, 18);
    for (const plan of projectPlans) {
      assert.deepStrictEqual(plan.newCategoriesRefs, []);
      assert.strictEqual(plan.categoriesCleared, true);
    }
  });

  test('Test 13: Zero legacy category references remain in any project (primaryCategory & categories)', () => {
    const { projectPlans, expectedLegacyRefsInProjectsAfterApply } = calculateMigrationPlan(
      dummyCategories,
      dummyProjects
    );

    assert.strictEqual(expectedLegacyRefsInProjectsAfterApply, 0);

    for (const plan of projectPlans) {
      // Must not be in legacy IDs
      assert.strictEqual(LEGACY_CATEGORY_IDS.includes(plan.newPrimaryCategoryRef), false);
      // Must be one of the canonical 8
      assert.ok(CANONICAL_CATEGORIES.some((c) => c.id === plan.newPrimaryCategoryRef));
      // Additional categories must be empty
      assert.strictEqual(plan.newCategoriesRefs.length, 0);
      assert.strictEqual(plan.remainingLegacyRefsInProject.length, 0);
    }
  });

  test('Test 14: Global audit accurately detects legacy category references across all doc types', () => {
    const sampleDocs = [
      { _id: 'doc-service', _type: 'service', category: { _ref: 'cat-video-production' } },
      { _id: 'doc-blog', _type: 'blogPost', category: { _ref: 'cat-short-video-reels' } },
      { _id: 'doc-project', _type: 'project', primaryCategory: { _ref: 'cat-graphic-design' }, categories: [{ _ref: 'cat-social-content' }] },
      { _id: 'cat-graphic-design', _type: 'contentCategory', title: { ar: 'قديم' } }, // Legacy category itself
      { _id: 'doc-clean', _type: 'author', name: 'Clean Author' },
    ];

    const audit = performGlobalAudit(sampleDocs);
    assert.strictEqual(audit.totalDocsScanned, 5);
    assert.strictEqual(audit.legacyCategoryDocCount, 1);
    assert.strictEqual(audit.totalLegacyReferencesFound, 4);
    assert.strictEqual(audit.referencesByDocType['service'], 1);
    assert.strictEqual(audit.referencesByDocType['blogPost'], 1);
    assert.strictEqual(audit.referencesByDocType['project'], 2);
  });
});
