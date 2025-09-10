#!/usr/bin/env node
import { execSync } from 'child_process';
import { Command } from 'commander';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { extract } from 'tar';
import { fileURLToPath } from 'url';

const program = new Command();

const tag = getTagFromPackageJson();

const configFiles = ['tsconfig.json', 'vite.config.ts', 'vitest.config.ts', '.gitignore'];

// Install dependencies
const packages = [
    'storybook',
    'storybook-solidjs-vite',
    'solid-js',
    '@chromatic-com/storybook',
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-vitest',
    '@vitest/coverage-v8',
    'playwright',
    'vitest',
    '@vitest/browser',
];
    
program
    .name('create-solid-storybook')
    .description('Scaffold a new Storybook project with SolidJS integration')
    .argument('[directory]', 'directory to create the project in', 'solid-storybook')
    .option('-f, --force', 'overwrite existing directory if it exists')
    .option('-i, --ignore-node-version', 'skip Node.js version check (not recommended)')
    .addHelpText('after', `
Examples:
  # Create a new project in directory 'solid-storybook' (default)
  npx create-solid-storybook
  
  # Create a new project in the current directory
  npx create-solid-storybook .

  # Create a new project in a specific directory
  npx create-solid-storybook my-project

  # Create a new project and overwrite if directory exists
  npx create-solid-storybook my-project --force

  # Create a new project and skip Node.js version check
  npx create-solid-storybook my-project --ignore-node-version

Learn more:
  https://github.com/kachurun/create-solid-storybook
`).parse();

const options = program.opts();
const target = program.args[0] || 'solid-storybook';

function getTagFromPackageJson() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pkgJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
    return pkgJson.publishConfig?.tag || 'latest';
}

function checkNodeVersion() {
    if (options.ignoreNodeVersion) {
        console.log('⚠️  Node.js version check skipped');

        return;
    }

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pkgJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
    const requiredVersion = pkgJson.engines.node.replace('>=', '');
    const currentVersion = process.version.slice(1); // Remove 'v' prefix

    const compareVersions = (v1, v2) => {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < 3; i++) {
            if (parts1[i] > parts2[i]) {
                return 1;
            }
            if (parts1[i] < parts2[i]) {
                return -1;
            }
        }

        return 0;
    };

    if (compareVersions(currentVersion, requiredVersion) < 0) {
        console.error('\n❌ Node.js version error');
        console.error(`This project requires Node.js version ${ requiredVersion } or higher.`);
        console.error(`You are currently using Node.js ${ currentVersion }.`);
        console.error('\nTo bypass this check, you can use the --ignore-node-version flag.');
        console.error('However, this may lead to compatibility issues.\n');
        console.error('Example:');
        console.error('  npx create-solid-storybook my-project --ignore-node-version\n');
        process.exit(1);
    }
}

function checkDirectory(target, force) {
    const storybookDir = join(target, '.storybook');

    if (existsSync(storybookDir)) {
        if (!force) {
            console.error('\n❌ Storybook already exists');
            console.error(`The directory "${ target }" already contains a Storybook setup.`);
            console.error('\nTo create a new Storybook setup in this directory, you can:');
            console.error('1. Use a different directory');
            console.error('2. Remove the existing .storybook directory');
            console.error('3. Use the --force flag to overwrite the existing setup\n');
            console.error('Example:');
            console.error(`  npx create-solid-storybook ${ target } --force\n`);
            process.exit(1);
        }

        console.log(`⚠️  Storybook setup already exists in "${ target }". Using --force to overwrite...`);
    }
}

function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent || '';

    if (userAgent.includes('bun')) {
        return 'bun';
    }
    if (userAgent.includes('yarn')) {
        return 'yarn';
    }
    if (userAgent.includes('pnpm')) {
        return 'pnpm';
    }

    return 'npm';
}

function getPackageManagerCommands(pkgManager) {
    if (pkgManager === 'yarn') {
        return {
            install: 'yarn',
            run: 'yarn',
            add: 'yarn add',
            addDev: 'yarn add -D',
        };
    }

    return {
        install: `${ pkgManager } install`,
        run: `${ pkgManager } run`,
        add: `${ pkgManager } add`,
        addDev: `${ pkgManager } add -D`,
    };
}

function updatePackageJson(target) {
    const pkgJsonPath = join(target, 'package.json');
    let packageJson;

    if (existsSync(pkgJsonPath)) {
        packageJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
    }
    else {
        packageJson = {
            name: target,
            version: '0.0.0',
            private: true,
        };
    }

    // Update scripts
    packageJson.scripts = {
        ...packageJson.scripts || {},
        storybook: 'storybook dev -p 6006',
        'build-storybook': 'storybook build',
    };

    writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, 2));
}

async function copyTemplateFiles(target) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pkg = `@kachurun/storybook-solid-template@${ tag }`;
    const tempDir = resolve(__dirname, '.tmp-npm-pack');
    const extractDir = join(tempDir, 'storybook-solid-template');

    // Clean and create temp directory
    rmSync(tempDir, { recursive: true, force: true });
    mkdirSync(tempDir, { recursive: true });

    // Download and extract template
    console.log(`⬇️ Downloading ${ pkg }...`);
    const tgzName = execSync(`npm pack ${ pkg }`, { cwd: tempDir }).toString().trim();
    const tgzPath = join(tempDir, tgzName);

    mkdirSync(extractDir, { recursive: true });

    await extract({
        file: tgzPath,
        cwd: extractDir,
        strip: 1,
    });

    // Copy .storybook directory
    const storybookDir = join(extractDir, '.storybook');
    const targetStorybookDir = join(target, '.storybook');

    console.log('📂 Copying .storybook configuration...');
    cpSync(storybookDir, targetStorybookDir, { recursive: true });

    // Copy stories directory (only if doesn't exist)
    const storiesDir = join(extractDir, 'stories');
    const targetStoriesDir = join(target, 'stories');

    if (existsSync(storiesDir)) {
        if (existsSync(targetStoriesDir)) {
            console.log('ℹ️  Skipping stories directory (already exists)...');
        }
        else {
            console.log('📂 Copying stories directory...');
            cpSync(storiesDir, targetStoriesDir, { recursive: true });
        }
    }

    // Copy config files (only if don't exist)
    for (const filename of configFiles) {
        const srcPath = join(extractDir, filename);
        const destPath = join(target, filename);

        if (existsSync(srcPath)) {
            if (existsSync(destPath)) {
                console.log(`ℹ️  Skipping ${ filename } (already exists)...`);
            }
            else {
                console.log(`📂 Copying ${ filename }...`);
                cpSync(srcPath, destPath);
            }
        }
    }

    // Clean up temp directory
    rmSync(tempDir, { recursive: true, force: true });
}

(async() => {
    const cwd = process.cwd();
    const outputDir = resolve(cwd, target);

    checkNodeVersion();
    checkDirectory(outputDir, options.force);

    const pkgManager = detectPackageManager();
    const commands = getPackageManagerCommands(pkgManager);

    console.log(`📦 Using ${ pkgManager } as package manager`);

    // Create directory if it doesn't exist
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    // Update package.json
    updatePackageJson(outputDir);

    // Copy template files
    await copyTemplateFiles(outputDir);

    console.log('📦 Installing dependencies...');
    execSync(`${ commands.addDev } ${ packages.join(' ') }`, { cwd: outputDir, stdio: 'inherit' });

    console.log('\n✅ Done! Run this to start:\n');
    console.log(`  cd ${ target }`);
    console.log(`  ${ commands.run } storybook\n`);
    execSync(`${ commands.run } storybook`, { cwd: outputDir, stdio: 'inherit' });
})();
