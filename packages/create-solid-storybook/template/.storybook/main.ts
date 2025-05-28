import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@kachurun/storybook-solid-vite';

export default <StorybookConfig>{
    framework: '@kachurun/storybook-solid-vite',
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
        '@storybook/addon-links',
    ],
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': {},
            },
        });
    },
};
