import { buildGranularSetIfMissing } from './utils/migration-utils.js';

function testMigrationLogic() {
  const existingMock = {
    heroTitle: { en: 'Edited Hero', ar: 'معدل' },
    contactMethods: [], // intentionally empty
    body: { ar: [{ _type: 'block' }] } // partially edited object
  };
  const sourceMock = {
    heroTitle: { en: 'Default', ar: 'الافتراضي' },
    heroSubtitle: { en: 'New Sub' },
    contactMethods: [{ type: 'email', value: 'a@b.com' }], // should not overwrite empty array
    body: { en: [{ _type: 'block' }] } // should add body.en
  };
  const result = buildGranularSetIfMissing(sourceMock, existingMock);
  
  if (result['heroTitle.en'] !== undefined || result['heroTitle.ar'] !== undefined) {
    throw new Error('Test failed: heroTitle was overwritten');
  }
  if (result['contactMethods'] !== undefined) {
    throw new Error('Test failed: contactMethods array was overwritten');
  }
  if (result['body.en'] === undefined) {
    throw new Error('Test failed: missing body.en was not added');
  }
  if (result['heroSubtitle'] === undefined) {
    throw new Error('Test failed: missing heroSubtitle was not added');
  }
  console.log('✅ Inline migration logic tests passed.');
}

testMigrationLogic();
