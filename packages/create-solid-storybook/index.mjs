#!/usr/bin/env node
import { execSync } from 'child_process';
import { cpSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const exampleDir = join(__dirname, 'template');

const target = process.argv[2] || 'solid-storybook';
const cwd = process.cwd();
const outputDir = join(cwd, target);

if (!existsSync(exampleDir)) {
    console.error(`❌ Example directory not found at ${ exampleDir }`);
    process.exit(1);
}

console.log(`📦 Copying example to: ${ outputDir }`);
cpSync(exampleDir, outputDir, { recursive: true });

console.log('📦 Installing dependencies...');
execSync(`cd ${ target } && npm install`, { stdio: 'inherit' });

console.log('\n✅ Done! Run this to start:\n');
console.log(`  cd ${ target }`);
console.log('  npm run storybook\n');

execSync(`cd ${ target } && npm run storybook`, { stdio: 'inherit' });
