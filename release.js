import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const type = process.argv[2] || 'patch';

const packages = [
    'create-solid-storybook',
    '@kachurun/storybook-solid-template',
];

const header = packages.map(pkg => `"${ pkg }": ${ type }`).join('\n');

const content = `---
${ header }
---

Automated ${ type } release.
`;

if (!existsSync('.changeset')) {
    mkdirSync('.changeset');
}

writeFileSync('.changeset/auto-release.md', content);
console.log('📝 Created .changeset/auto-release.md');

execSync('npx changeset version', { stdio: 'inherit' });
execSync('npx changeset publish', { stdio: 'inherit' });
