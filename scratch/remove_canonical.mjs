import fs from 'fs';
import path from 'path';

const queriesPath = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/sanity/queries';
const files = fs.readdirSync(queriesPath);

for (const file of files) {
  const filePath = path.join(queriesPath, file);
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('canonicalUrl')) {
      content = content.replace(/,\s*canonicalUrl/g, '');
      fs.writeFileSync(filePath, content);
      console.log(\`Removed canonicalUrl from \${file}\`);
    }
  }
}
