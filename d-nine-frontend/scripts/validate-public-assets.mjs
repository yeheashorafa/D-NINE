import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFilesRecursively(fullPath, fileList);
    } else if (/\.(ts|tsx|js|jsx|json)$/.test(item)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const sourceFiles = [
  ...getFilesRecursively(path.join(rootDir, 'src')),
  ...getFilesRecursively(path.join(rootDir, 'config')),
];

const assetRegex = /['"](\/(?:media|slider|brand)\/[^'"]+)['"]/g;

let missingCount = 0;
const checkedPaths = new Map();

for (const filePath of sourceFiles) {
  const relativeSource = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  let match;

  while ((match = assetRegex.exec(content)) !== null) {
    const assetUrl = match[1];

    if (assetUrl.includes('${')) {
      continue;
    }

    const physicalPath = path.join(publicDir, assetUrl.replace(/^\//, ''));

    if (!checkedPaths.has(assetUrl)) {
      const exists = fs.existsSync(physicalPath);
      checkedPaths.set(assetUrl, exists);
      if (!exists) {
        console.error(`❌ MISSING ASSET: ${assetUrl}`);
        console.error(`   Referenced in: ${relativeSource}`);
        console.error(`   Expected file at: ${physicalPath}\n`);
        missingCount++;
      }
    } else if (!checkedPaths.get(assetUrl)) {
      console.error(`❌ MISSING ASSET: ${assetUrl}`);
      console.error(`   Referenced in: ${relativeSource}\n`);
    }
  }
}

if (missingCount > 0) {
  console.error(`\n❌ Asset Validation Failed: ${missingCount} missing static asset reference(s) found.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ Asset Validation Passed: All ${checkedPaths.size} static asset references resolved cleanly to public/ files.\n`);
  process.exit(0);
}
