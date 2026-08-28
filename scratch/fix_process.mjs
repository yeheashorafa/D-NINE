import fs from 'fs';

const path = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/features/home/components/process-section.tsx';
let content = fs.readFileSync(path, 'utf-8');

// The file currently contains literal backslashes: \\\`0\\\$\\{idx + 1\\}\\\`
content = content.replace(/\\`0\\\$\\{idx \+ 1\\}\\`/g, '\`0${idx + 1}\`');

fs.writeFileSync(path, content);
console.log('Fixed process-section.tsx');
