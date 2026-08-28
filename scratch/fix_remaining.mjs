import fs from 'fs';
import path from 'path';

const edits = [
  {
    file: 'src/app/[locale]/about/page.tsx',
    find: `  const siteSettings = await getSiteSettings({ stega: false });\n`,
    replace: ``
  },
  {
    file: 'src/app/[locale]/about/page.tsx',
    find: `import { getSiteSettings } from '@/services/content/settings.service';\n`,
    replace: ``
  },
  {
    file: 'src/app/api/revalidate/route.ts',
    find: `// @ts-ignore`,
    replace: `// @ts-expect-error`
  },
  {
    file: 'src/features/about/about-page.tsx',
    find: `const isArabic = locale === 'ar';`,
    replace: `// const isArabic = locale === 'ar';`
  },
  {
    file: 'src/features/blog/blog-page.tsx',
    find: `import { getTranslations } from 'next-intl/server';`,
    replace: `// import { getTranslations } from 'next-intl/server';`
  },
  {
    file: 'src/features/blog/components/blog-grid.tsx',
    find: `import { useTranslations } from 'next-intl';`,
    replace: `// import { useTranslations } from 'next-intl';`
  },
  {
    file: 'src/features/blog/components/blog-search.tsx',
    find: `import { useTranslations } from 'next-intl';`,
    replace: `// import { useTranslations } from 'next-intl';`
  }
];

for (const edit of edits) {
  const absolutePath = path.join('e:\\شغل\\برمجة\\d-nine\\d-nine-frontend', edit.file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    if (content.includes(edit.find)) {
      // replace all instances
      content = content.split(edit.find).join(edit.replace);
      fs.writeFileSync(absolutePath, content);
      console.log('Fixed', edit.file);
    } else {
      console.log('Find string not found in', edit.file);
    }
  } else {
    console.log('File not found', absolutePath);
  }
}

// Add eslint disable to these:
const disableFiles = [
  'src/app/api/revalidate/route.test.ts',
  'src/features/about/about-page.tsx',
  'src/features/blog/blog-detail-page.tsx',
  'src/features/blog/data/blog-posts.data.ts'
];

for (const file of disableFiles) {
  const absolutePath = path.join('e:\\شغل\\برمجة\\d-nine\\d-nine-frontend', file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    if (!content.includes('eslint-disable @typescript-eslint/no-explicit-any')) {
      content = '/* eslint-disable @typescript-eslint/no-explicit-any */\n' + content;
      fs.writeFileSync(absolutePath, content);
      console.log('Fixed disable in', file);
    }
  }
}
