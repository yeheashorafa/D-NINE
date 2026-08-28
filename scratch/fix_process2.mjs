import fs from 'fs';

const path = 'e:/شغل/برمجة/d-nine/d-nine-frontend/src/features/home/components/process-section.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Use literal string replacement
content = content.replace('{item.stepNumber || \\`0\\${idx + 1}\\`}', '{item.stepNumber || `0${idx + 1}`}');

fs.writeFileSync(path, content);
console.log('Fixed process-section.tsx (for real)');
