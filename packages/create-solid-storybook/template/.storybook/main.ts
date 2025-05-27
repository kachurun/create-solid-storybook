import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@kachurun/storybook-solid-vite';

export default <StorybookConfig>{
    framework: '@kachurun/storybook-solid-vite',
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
    ],
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': {},
            },
        });
    },
};
