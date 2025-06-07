#!/usr/bin/env node
import { execSync } from 'child_process';
import { Command } from 'commander';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import tar from 'tar';
import { fileURLToPath } from 'url';

const program = new Command();

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
`)
    .parse();

const options = program.opts();
const target = program.args[0] || 'solid-storybook';

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
    if (existsSync(target)) {
        if (!force) {
            console.error('\n❌ Directory already exists');
            console.error(`The directory "${ target }" already exists.`);
            console.error('\nTo create a project in this directory, you can:');
            console.error('1. Use a different directory name');
            console.error('2. Remove the existing directory');
            console.error('3. Use the --force flag to overwrite the directory\n');
            console.error('Example:');
            console.error(`  npx create-solid-storybook ${ target } --force\n`);
            process.exit(1);
        }

        console.log(`⚠️  Directory "${ target }" already exists. Using --force to overwrite...`);
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
        };
    }

    return {
        install: `${ pkgManager } install`,
        run: `${ pkgManager } run`,
    };
}

function createCleanPackageJson(templatePkgJson, projectName) {
    const cleanPkgJson = {
        name: projectName,
        version: '0.0.0',
        private: true,
        scripts: templatePkgJson.scripts,
        devDependencies: templatePkgJson.devDependencies,
        peerDependencies: templatePkgJson.peerDependencies,
    };

    return JSON.stringify(cleanPkgJson, null, 4);
}

(async() => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pkg = '@kachurun/storybook-solid-template';
    const cwd = process.cwd();
    const outputDir = resolve(cwd, target);

    checkNodeVersion();
    checkDirectory(outputDir, options.force);

    const tempDir = resolve(__dirname, '.tmp-npm-pack');
    const pkgManager = detectPackageManager();
    const commands = getPackageManagerCommands(pkgManager);

    console.log(`📦 Using ${ pkgManager } as package manager`);

    // Download .tgz to temp dir
    rmSync(tempDir, { recursive: true, force: true });
    mkdirSync(tempDir, { recursive: true });

    console.log(`⬇️ Downloading ${ pkg }...`);
    const tgzName = execSync(`npm pack ${ pkg }`, { cwd: tempDir }).toString().trim();
    const tgzPath = join(tempDir, tgzName);
    const extractDir = join(tempDir, 'pkg');

    mkdirSync(extractDir, { recursive: true });
    await tar.x({
        file: tgzPath,
        cwd: extractDir,
        strip: 1,
    });

    if (!existsSync(extractDir)) {
        console.error(`❌ No template/ directory found in ${ pkg }`);
        process.exit(1);
    }

    console.log(`📂 Copying template to: ${ outputDir }`);
    rmSync(outputDir, { recursive: true, force: true });
    cpSync(extractDir, outputDir, { recursive: true });

    // Create clean package.json
    const templatePkgJson = JSON.parse(readFileSync(join(extractDir, 'package.json'), 'utf-8'));
    const cleanPkgJson = createCleanPackageJson(templatePkgJson, target);

    writeFileSync(join(outputDir, 'package.json'), cleanPkgJson);

    console.log(`📦 Installing dependencies using ${ pkgManager }...`);
    execSync(commands.install, { cwd: outputDir, stdio: 'inherit' });

    console.log('\n✅ Done! Run this to start:\n');
    console.log(`  cd ${ target }`);
    console.log(`  ${ commands.run } storybook\n`);
    execSync(`${ commands.run } storybook`, { cwd: outputDir, stdio: 'inherit' });
})();
