import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@kachurun/storybook-solid-vite';

export default <StorybookConfig>{
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-links',
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
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
