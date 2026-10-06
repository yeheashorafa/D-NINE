import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(currentDir, '..');

const frontendDir = path.join(monorepoRoot, 'd-nine-frontend');
const frontendNextDir = path.join(frontendDir, '.next');
const frontendBuildIdFile = path.join(frontendNextDir, 'BUILD_ID');
const frontendStandaloneDir = path.join(frontendNextDir, 'standalone');
const frontendPublicDir = path.join(frontendDir, 'public');
const frontendStaticDir = path.join(frontendNextDir, 'static');

const rootNextDir = path.join(monorepoRoot, '.next');
const rootBuildIdFile = path.join(rootNextDir, 'BUILD_ID');
const rootStandaloneDir = path.join(rootNextDir, 'standalone');

if (!fs.existsSync(frontendBuildIdFile)) {
  console.error(
    `Error: Frontend build output is missing at ${frontendBuildIdFile}. Please run the frontend build first.`
  );
  process.exit(1);
}

if (!fs.existsSync(frontendStandaloneDir)) {
  console.error(
    `Error: Frontend standalone directory is missing at ${frontendStandaloneDir}. Ensure output: 'standalone' is enabled.`
  );
  process.exit(1);
}

function findStandaloneServerJs(searchDir) {
  const directPath = path.join(searchDir, 'd-nine-frontend', 'server.js');
  if (fs.existsSync(directPath)) return directPath;

  const rootPath = path.join(searchDir, 'server.js');
  if (fs.existsSync(rootPath)) return rootPath;

  function traverse(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        const found = traverse(fullPath);
        if (found) return found;
      } else if (entry.name === 'server.js') {
        return fullPath;
      }
    }
    return null;
  }

  return traverse(searchDir);
}

const frontendServerJs = findStandaloneServerJs(frontendStandaloneDir);
if (!frontendServerJs) {
  console.error('Error: Could not locate generated server.js within standalone build output.');
  process.exit(1);
}

const frontendStandaloneAppDir = path.dirname(frontendServerJs);

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

const BOOTSTRAP_SERVER_JS = `'use strict';

const path = require('node:path');
const fs = require('node:fs');

const nestedAppDir = path.resolve(__dirname, 'd-nine-frontend');
const nestedServerJs = path.join(nestedAppDir, 'server.js');

if (!fs.existsSync(nestedServerJs)) {
  console.error(
    '[Hostinger Bootstrap Error] Missing nested server.js at: ' + nestedServerJs
  );
  process.exit(1);
}

process.chdir(nestedAppDir);
require(nestedServerJs);
`;

try {
  // 1. Ensure assets exist inside native nested app directory
  if (fs.existsSync(frontendPublicDir)) {
    const targetPublic = path.join(frontendStandaloneAppDir, 'public');
    copyDirectoryRecursively(frontendPublicDir, targetPublic);
  }

  if (fs.existsSync(frontendStaticDir)) {
    const targetStatic = path.join(frontendStandaloneAppDir, '.next', 'static');
    copyDirectoryRecursively(frontendStaticDir, targetStatic);
  }

  // 2. Create small root standalone bootstrap entry at .next/standalone/server.js
  const frontendStandaloneBootstrapJs = path.join(frontendStandaloneDir, 'server.js');
  fs.writeFileSync(frontendStandaloneBootstrapJs, BOOTSTRAP_SERVER_JS, 'utf8');

  // 3. Copy completed frontend .next directory to monorepo root .next
  if (fs.existsSync(rootNextDir)) {
    fs.rmSync(rootNextDir, { recursive: true, force: true });
  }

  copyDirectoryRecursively(frontendNextDir, rootNextDir);

  // 4. Verify root output
  if (!fs.existsSync(rootBuildIdFile)) {
    console.error(
      `Error: Root build verification failed. ${rootBuildIdFile} does not exist after copying.`
    );
    process.exit(1);
  }

  if (!fs.existsSync(rootStandaloneDir)) {
    console.error(
      `Error: Root standalone verification failed. ${rootStandaloneDir} does not exist after copying.`
    );
    process.exit(1);
  }

  const rootNestedServerJs = path.join(rootStandaloneDir, 'd-nine-frontend', 'server.js');
  const rootBootstrapServerJs = path.join(rootStandaloneDir, 'server.js');

  if (!fs.existsSync(rootNestedServerJs)) {
    console.error(
      `Error: Root nested server.js verification failed. Missing at ${rootNestedServerJs}.`
    );
    process.exit(1);
  }

  if (!fs.existsSync(rootBootstrapServerJs)) {
    console.error(
      `Error: Root bootstrap server.js verification failed. Missing at ${rootBootstrapServerJs}.`
    );
    process.exit(1);
  }

  const relativeNestedServerJs = path.relative(monorepoRoot, rootNestedServerJs).replace(/\\/g, '/');
  const relativeBootstrapServerJs = path.relative(monorepoRoot, rootBootstrapServerJs).replace(/\\/g, '/');

  console.log(`- BUILD_ID found: ${path.relative(monorepoRoot, rootBuildIdFile).replace(/\\/g, '/')}`);
  console.log(`- standalone directory found: ${path.relative(monorepoRoot, rootStandaloneDir).replace(/\\/g, '/')}`);
  console.log(`- exact relative path of native server.js: ${relativeNestedServerJs}`);
  console.log(`- exact relative path of bootstrap server.js: ${relativeBootstrapServerJs}`);
  console.log('- public assets prepared in nested standalone app');
  console.log('- static assets prepared in nested standalone app');
  console.log('- root .next copy prepared');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error preparing Hostinger output: ${message}`);
  process.exit(1);
}
