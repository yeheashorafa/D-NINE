import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(currentDir, '..');

const frontendNextDir = path.join(monorepoRoot, 'd-nine-frontend', '.next');
const frontendBuildIdFile = path.join(frontendNextDir, 'BUILD_ID');
const rootNextDir = path.join(monorepoRoot, '.next');
const rootBuildIdFile = path.join(rootNextDir, 'BUILD_ID');

if (!fs.existsSync(frontendBuildIdFile)) {
  console.error(
    `Error: Frontend build output is missing at ${frontendBuildIdFile}. Please run the frontend build first.`
  );
  process.exit(1);
}

function copyDirectoryRecursively(source, destination) {
  const stat = fs.lstatSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyDirectoryRecursively(
        path.join(source, entry),
        path.join(destination, entry)
      );
    }
  } else {
    fs.copyFileSync(source, destination);
  }
}

try {
  if (fs.existsSync(rootNextDir)) {
    fs.rmSync(rootNextDir, { recursive: true, force: true });
  }

  copyDirectoryRecursively(frontendNextDir, rootNextDir);

  if (!fs.existsSync(rootBuildIdFile)) {
    console.error(
      `Error: Root build verification failed. ${rootBuildIdFile} does not exist after copying.`
    );
    process.exit(1);
  }

  console.log('Hostinger output prepared successfully: copied .next to monorepo root.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error preparing Hostinger output: ${message}`);
  process.exit(1);
}
