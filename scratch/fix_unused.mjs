import fs from 'fs';
import path from 'path';

const edits = [
  {
    file: 'src/features/services/components/services-filter.tsx',
    find: `import { useLocale, useTranslations } from 'next-intl';`,
    replace: `import { useLocale } from 'next-intl';`
  },
  {
    file: 'src/features/services/components/services-grid.tsx',
    find: `const t = useTranslations('services');`,
    replace: `// const t = useTranslations('services');`
  },
  {
    file: 'src/features/services/services-page.tsx',
    find: `import { getTranslations } from 'next-intl/server';`,
    replace: `// import { getTranslations } from 'next-intl/server';`
  },
  {
    file: 'src/features/work/components/work-filter.tsx',
    find: `import { useLocale, useTranslations } from 'next-intl';`,
    replace: `import { useLocale } from 'next-intl';`
  },
  {
    file: 'src/features/work/components/work-grid.tsx',
    find: `import { useTranslations } from 'next-intl';`,
    replace: `// import { useTranslations } from 'next-intl';`
  },
  {
    file: 'src/features/work/components/work-grid.tsx',
    find: `const t = useTranslations('work');`,
    replace: `// const t = useTranslations('work');`
  },
  {
    file: 'src/features/work/work-page.tsx',
    find: `import { getTranslations } from 'next-intl/server';`,
    replace: `// import { getTranslations } from 'next-intl/server';`
  },
  {
    file: 'src/sanity/queries/page.queries.ts',
    find: `const basePageFields = \``,
    replace: `export const basePageFields = \``
  }
];

for (const edit of edits) {
  const absolutePath = path.join('e:\\شغل\\برمجة\\d-nine\\d-nine-frontend', edit.file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    if (content.includes(edit.find)) {
      content = content.replace(edit.find, edit.replace);
      fs.writeFileSync(absolutePath, content);
      console.log('Fixed', edit.file);
    } else {
      console.log('Find string not found in', edit.file);
    }
  } else {
    console.log('File not found', absolutePath);
  }
}
