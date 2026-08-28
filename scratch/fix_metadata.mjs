import fs from 'fs';
import path from 'path';

const files = [
  'about/page.tsx',
  'blog/page.tsx',
  'blog/[slug]/page.tsx',
  'contact/page.tsx',
  'privacy/page.tsx',
  'services/page.tsx',
  'services/[slug]/page.tsx',
  'terms/page.tsx',
  'work/page.tsx',
  'work/[slug]/page.tsx'
];

const basePath = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/app/[locale]';

for (const file of files) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Add import if not exists
    if (!content.includes('import { constructMetadata } from')) {
      content = content.replace(/(import {[^}]+} from '@\/sanity\/services\/[^']+';\r?\n)/, "$1import { constructMetadata } from '@/lib/seo';\n");
    }
    
    // Replace return block
    const returnRegex = /return \{\s*title:\s*seoTitle,\s*description:\s*seoDesc,[\s\S]*?openGraph:\s*\{[\s\S]*?\}\s*,?\s*\};/m;
    const pathValue = file.replace('/page.tsx', '').replace('[slug]', '${slug}');
    let newReturn = `return constructMetadata({\n    title: seoTitle,\n    description: seoDesc,\n    locale,\n    path: '${pathValue === 'page.tsx' ? '/' : '/' + pathValue}'\n  });`;
    if (file.includes('[slug]')) {
      newReturn = `return constructMetadata({\n    title: seoTitle,\n    description: seoDesc,\n    locale,\n    path: \`/${pathValue}\`\n  });`;
    }
    content = content.replace(returnRegex, newReturn);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
