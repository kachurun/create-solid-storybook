import path from 'path';
import type { StorybookConfig } from 'storybook-solidjs-vite';
 
// import { createRequire } from 'module';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const require = createRequire(import.meta.url);

const getAbsolutePath = (packageName: string): string => path.dirname(import.meta.resolve(path.join(packageName, 'package.json'))).replace(/^file:\/\//, '');
 
export default <StorybookConfig>{
    framework: {
        name: 'storybook-solidjs-vite',
        options: {
            docgen: true,
            docgenOptions: {
                shouldExtractLiteralValuesFromEnum: true,
                propFilter: (prop: any) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
            },
        },
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-docs'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-links'),
        {
            name: getAbsolutePath('@storybook/addon-vitest'),
            options: {
                cli: false,
            },
        },
    ],
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    docs: {
        autodocs: true,
    },

    viteFinal: async (config) => {
        console.log('config', config.plugins);
        
        return mergeConfig(config, {
            plugins: [
                
            ]
        });
    },
};
