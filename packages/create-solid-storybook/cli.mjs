#!/usr/bin/env node
import { execSync } from 'child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = '@kachurun/storybook-solid-template';
const target = process.argv[2] || 'solid-storybook';
const cwd = process.cwd();
const outputDir = resolve(cwd, target);
const tempDir = resolve(__dirname, '.tmp-npm-pack');

// 1. Скачаем .tgz в temp
rmSync(tempDir, { recursive: true, force: true });
mkdirSync(tempDir, { recursive: true });

console.log(`📦 Downloading ${ pkg }...`);
const tgzName = execSync(`npm pack ${ pkg }`, { cwd: tempDir }).toString().trim();
const tgzPath = join(tempDir, tgzName);
const extractDir = join(tempDir, 'pkg');

mkdirSync(extractDir, { recursive: true });
execSync(`tar -xzf "${ tgzPath }" -C "${ extractDir }" --strip-components=1`);

if (!existsSync(extractDir)) {
    console.error(`❌ No template/ directory found in ${ pkg }`);
    process.exit(1);
}

console.log(`📂 Copying template to: ${ outputDir }`);
rmSync(outputDir, { recursive: true, force: true });
cpSync(extractDir, outputDir, { recursive: true });

console.log('📦 Installing dependencies...');
execSync(`cd ${ outputDir } && npm install`, { stdio: 'inherit' });

console.log('\n✅ Done! Run this to start:\n');
console.log(`  cd ${ target }`);
console.log('  npm run storybook\n');
execSync(`cd ${ outputDir } && npm run storybook`, { stdio: 'inherit' });
