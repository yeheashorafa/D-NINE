import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveDeterministicId, buildGranularSetIfMissing } from './utils/migration-utils.js';

describe('migration-utils', () => {
  describe('resolveDeterministicId', () => {
    test('preserves explicit IDs', () => {
      const id = resolveDeterministicId('service', 'explicit-id-123', 'English Label');
      assert.strictEqual(id, 'explicit-id-123');
    });

    test('generates deterministic IDs from English labels', () => {
      const id = resolveDeterministicId('service', undefined, '  Graphic Design!  ');
      assert.strictEqual(id, 'service-graphic-design');
    });

    test('throws for invalid/empty inputs', () => {
      assert.throws(() => resolveDeterministicId('service', undefined, undefined), /explicit ID and English label are missing/);
      assert.throws(() => resolveDeterministicId('service', '   ', '   '), /explicit ID and English label are missing/);
      assert.throws(() => resolveDeterministicId('service', undefined, '!!!'), /explicit ID and English label are missing/);
    });
  });

  describe('buildGranularSetIfMissing', () => {
    test('builds set for nested missing values', () => {
      const source = {
        seo: { metaTitle: { ar: 'SEO Title' } },
        title: 'New Title'
      };
      const existing = {
        seo: {}
      } as Record<string, unknown>;

      const setOps = buildGranularSetIfMissing(source, existing);

      assert.deepStrictEqual(setOps, {
        'seo.metaTitle': { ar: 'SEO Title' },
        'title': 'New Title'
      });
    });

    test('preserves existing nested values', () => {
      const source = {
        seo: { metaTitle: { ar: 'SEO Title' } }
      };
      const existing = {
        seo: { metaTitle: { ar: 'Existing Arabic' } }
      } as Record<string, unknown>;

      const setOps = buildGranularSetIfMissing(source, existing);
      assert.deepStrictEqual(setOps, {});
    });

    test('handles arrays and Sanity _key behavior', () => {
      const source = {
        blocks: [{ _key: '1', text: 'hello' }],
        _type: 'should-ignore',
        _id: 'should-ignore',
        _key: 'should-ignore',
        validData: 'ok'
      };
      const existing = {
        blocks: []
      } as Record<string, unknown>;

      const setOps = buildGranularSetIfMissing(source, existing);
      assert.deepStrictEqual(setOps, {
        validData: 'ok'
      });
    });

    test('does not mutate input objects', () => {
      const source = { seo: { title: 'A' } };
      const existing = { seo: {} } as Record<string, unknown>;
      const sourceClone = JSON.parse(JSON.stringify(source));
      const existingClone = JSON.parse(JSON.stringify(existing));

      buildGranularSetIfMissing(source, existing);

      assert.deepStrictEqual(source, sourceClone);
      assert.deepStrictEqual(existing, existingClone);
    });
  });
});
