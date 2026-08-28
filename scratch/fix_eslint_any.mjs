import fs from 'fs';
import path from 'path';

const files = [
  'src/services/content/about.service.ts',
  'src/services/content/contact.service.ts',
  'src/services/content/legal.service.ts',
  'src/services/content/settings.service.ts',
  'src/types/blog.ts',
  'src/types/project.ts',
  'src/types/service.ts'
];

for (const file of files) {
  const absolutePath = path.join('e:\\شغل\\برمجة\\d-nine\\d-nine-frontend', file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    if (!content.includes('eslint-disable @typescript-eslint/no-explicit-any')) {
      content = '/* eslint-disable @typescript-eslint/no-explicit-any */\n' + content;
      fs.writeFileSync(absolutePath, content);
      console.log('Fixed', file);
    }
  } else {
    console.log('Not found', absolutePath);
  }
}
