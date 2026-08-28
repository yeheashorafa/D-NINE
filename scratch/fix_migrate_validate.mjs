import fs from 'fs';
import path from 'path';

const migratePath = 'e:/شغل/برمجة/d-nine/d-nine-studio/scripts/migrate-cms-completion.ts';
let migrateContent = fs.readFileSync(migratePath, 'utf-8');

migrateContent = migrateContent.replace(/const isDryRun = process.argv.includes\('--dry-run'\);/, `const args = process.argv.slice(2);
const validArgs = ['--dry-run', '--execute'];
const unknownArgs = args.filter(a => !validArgs.includes(a));
if (unknownArgs.length > 0) {
  console.error('Error: Unknown arguments: ' + unknownArgs.join(', '));
  process.exit(1);
}
const isDryRun = process.argv.includes('--dry-run');`);

// ensure missing hero assets cause failure
migrateContent = migrateContent.replace(/if \(!isDryRun\) console\.warn\(\`Missing asset ID for \$\{relPath\}\`\);\n\s*return undefined;/g, `console.error(\`Missing asset ID for \${relPath}\`);\n      process.exit(1);`);

// servicesPage filterLabels
migrateContent = migrateContent.replace(/all: \{ ar: 'الكل', en: 'All' \},\n\s*primary: \{ ar: 'الخدمات الأساسية', en: 'Primary Services' \},\n\s*offerings: \{ ar: 'عروضنا', en: 'Our Offerings' \},/, `filterLabels: {
        all: { ar: 'الكل', en: 'All' },
        primary: { ar: 'الخدمات الأساسية', en: 'Primary Services' },
        offerings: { ar: 'عروضنا', en: 'Our Offerings' },
      },`);

// Portable texts and contact
migrateContent = migrateContent.replace(/agencyStory: \{ ar: \[\], en: \[\] \}, \/\/ Localized portable text fallback/, `agencyStory: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'قصتنا الرائعة', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our amazing story', _key: '3' }], _key: '4', markDefs: [] }] },`);
migrateContent = migrateContent.replace(/mission: \{ ar: \[\], en: \[\] \}, \/\/ Localized portable text fallback/, `mission: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'مهمتنا هي الابتكار', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our mission is innovation', _key: '3' }], _key: '4', markDefs: [] }] },`);
migrateContent = migrateContent.replace(/vision: \{ ar: \[\], en: \[\] \}, \/\/ Localized portable text fallback/, `vision: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'رؤيتنا للمستقبل', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Our vision for the future', _key: '3' }], _key: '4', markDefs: [] }] },`);

migrateContent = migrateContent.replace(/description: \{ ar: \[\], en: \[\] \},/, `description: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'تواصل معنا الآن', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Contact us now', _key: '3' }], _key: '4', markDefs: [] }] },`);
migrateContent = migrateContent.replace(/contactMethods: \[\],/, `contactMethods: [{ _key: 'm1', type: 'email', title: { ar: 'البريد الإلكتروني', en: 'Email' }, value: 'hello@d-nine.agency', link: 'mailto:hello@d-nine.agency' }],`);
migrateContent = migrateContent.replace(/offices: \[\],/, `offices: [{ _key: 'o1', title: { ar: 'المقر الرئيسي', en: 'Headquarters' }, address: { ar: 'الرياض', en: 'Riyadh' }, email: 'hq@d-nine.agency' }],`);

migrateContent = migrateContent.replace(/body: \{ ar: \[\], en: \[\] \},/g, `body: { ar: [{ _type: 'block', children: [{ _type: 'span', text: 'نص المحتوى', _key: '1' }], _key: '2', markDefs: [] }], en: [{ _type: 'block', children: [{ _type: 'span', text: 'Content text', _key: '3' }], _key: '4', markDefs: [] }] },`);

fs.writeFileSync(migratePath, migrateContent);
console.log('Updated migrate-cms-completion.ts');

const validatePath = 'e:/شغل/برمجة/d-nine/d-nine-studio/scripts/validate-migration.ts';
let validateContent = fs.readFileSync(validatePath, 'utf-8');

validateContent = validateContent.replace(/const isPortableText = \(field: any\) => field && Array\.isArray\(field\.ar\) && Array\.isArray\(field\.en\);/, `const isPortableText = (field: any) => field && Array.isArray(field.ar) && field.ar.length > 0 && Array.isArray(field.en) && field.en.length > 0;`);

validateContent = validateContent.replace(/if \(!isPortableText\(doc\.agencyStory\)\) validationErrors\.push\(\`Missing valid Portable Text for agencyStory on \$\{doc\._id\}\`\);/, `
      if (!isPortableText(doc.agencyStory)) validationErrors.push(\`Missing valid Portable Text for agencyStory on \${doc._id}\`);
      if (!isPortableText(doc.mission)) validationErrors.push(\`Missing valid Portable Text for mission on \${doc._id}\`);
      if (!isPortableText(doc.vision)) validationErrors.push(\`Missing valid Portable Text for vision on \${doc._id}\`);
`);

validateContent = validateContent.replace(/if \(doc\._type === 'servicesPage'\) \{/, `if (doc._type === 'servicesPage') {
      if (!doc.filterLabels?.all || !isLocalized(doc.filterLabels.all)) validationErrors.push('Missing filterLabels.all');
      if (!doc.filterLabels?.primary || !isLocalized(doc.filterLabels.primary)) validationErrors.push('Missing filterLabels.primary');
      if (!doc.filterLabels?.offerings || !isLocalized(doc.filterLabels.offerings)) validationErrors.push('Missing filterLabels.offerings');`);

validateContent = validateContent.replace(/if \(\['privacyPage', 'termsPage'\]\.includes\(doc\._type\)\) \{/, `
    if (doc._type === 'contactPage') {
      if (!isPortableText(doc.description)) validationErrors.push(\`Missing Portable Text description on \${doc._id}\`);
      if (!Array.isArray(doc.contactMethods) || doc.contactMethods.length === 0) validationErrors.push('Missing contactMethods');
      if (!Array.isArray(doc.offices) || doc.offices.length === 0) validationErrors.push('Missing offices');
    }
    if (['privacyPage', 'termsPage'].includes(doc._type)) {`);

validateContent = validateContent.replace(/if \(brokenRefs === 0\) \{/, `if (brokenRefs === 0 && checkedAssetRefs > 0) {`);

validateContent = validateContent.replace(/_type,/, `_type,\n      filterLabels,\n      contactMethods,\n      offices,\n      mission,\n      vision,\n      description,`);

fs.writeFileSync(validatePath, validateContent);
console.log('Updated validate-migration.ts');
