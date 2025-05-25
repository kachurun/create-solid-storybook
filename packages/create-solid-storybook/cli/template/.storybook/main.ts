import { createRequire } from 'module'; // Import createRequire
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@kachurun/storybook-solid-vite';

const require = createRequire(import.meta.url); // Create a require function

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
    return dirname(require.resolve(join(value, 'package.json')));
}


export default <StorybookConfig>{
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-viewport'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],
    framework: {
        name: '@kachurun/storybook-solid-vite',
        options: {},
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': {},
            },
        });
    },
    docs: {
        autodocs: 'tag',
    },
};
