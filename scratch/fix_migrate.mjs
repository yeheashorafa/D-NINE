import fs from 'fs';

const path = 'e:/شغل/برمجة/d-nine/d-nine-studio/scripts/migrate-cms-completion.ts';
let content = fs.readFileSync(path, 'utf-8');

// Modify the logic to force update fields that are empty arrays or empty objects
const fixReplacement = `
      // Check for empty fields to force patch
      const forcePatchFields: any = {};
      for (const [k, v] of Object.entries(cleanedDoc)) {
        if (k === '_type') continue;
        const existingVal = existingDocsMap.get(id)?.[k];
        if (existingVal && typeof existingVal === 'object') {
          // If existing is empty array, or if it has { ar: [], en: [] } where length is 0
          if (Array.isArray(existingVal) && existingVal.length === 0) {
            forcePatchFields[k] = v;
          } else if (!Array.isArray(existingVal) && existingVal.ar && Array.isArray(existingVal.ar) && existingVal.ar.length === 0) {
            forcePatchFields[k] = v;
          } else if (!Array.isArray(existingVal) && Object.keys(existingVal).length === 0) {
             forcePatchFields[k] = v;
          }
        } else if (existingVal === undefined || existingVal === null || existingVal === '') {
          forcePatchFields[k] = v;
        }
      }
      
      const { _type, ...fieldsToPatch } = cleanedDoc;
      if (Object.keys(forcePatchFields).length > 0) {
         transaction = transaction.patch(id, (p) => p.set(forcePatchFields).setIfMissing(fieldsToPatch));
      } else {
         transaction = transaction.patch(id, (p) => p.setIfMissing(fieldsToPatch));
      }
`;

content = content.replace(/const \{ _type, \.\.\.fieldsToPatch \} = cleanedDoc;\s*transaction = transaction\.patch\(id, \(p\) => p\.setIfMissing\(fieldsToPatch\)\);/g, fixReplacement);

fs.writeFileSync(path, content);
console.log('Fixed migrate-cms-completion.ts');
