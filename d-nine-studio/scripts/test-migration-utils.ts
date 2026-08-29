import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveDeterministicId } from './utils/migration-utils.js';

test('resolveDeterministicId - Explicit ID is preserved', () => {
  const result = resolveDeterministicId('team', 'existing-id', 'John Doe');
  assert.equal(result, 'existing-id');
});

test('resolveDeterministicId - English label creates a deterministic normalized ID', () => {
  const result = resolveDeterministicId('team', undefined, 'Jane Doe');
  assert.equal(result, 'team-jane-doe');
});

test('resolveDeterministicId - Spaces and special characters are normalized', () => {
  const result = resolveDeterministicId('team', undefined, 'Dr. John O\'Connor Jr. - CEO');
  assert.equal(result, 'team-dr-john-o-connor-jr-ceo');
});

test('resolveDeterministicId - Missing ID and missing English label throws', () => {
  assert.throws(
    () => resolveDeterministicId('team', undefined, undefined),
    { message: /Cannot create team document ID: explicit ID and English label are missing./ }
  );
});

test('resolveDeterministicId - Whitespace-only values throw', () => {
  assert.throws(
    () => resolveDeterministicId('team', '   ', '   '),
    { message: /Cannot create team document ID: explicit ID and English label are missing./ }
  );
});
