import path from 'path';

import type { StorybookConfig } from 'storybook-solidjs-vite';

const getAbsolutePath = (packageName: string): string => path.dirname(import.meta.resolve(path.join(packageName, 'package.json'))).replace(/^file:\/\//, '');
 
export default <StorybookConfig>{
    framework: {
        name: 'storybook-solidjs-vite',
        options: {
            docgen: true,
            // react-docgen-typescript options
            // see https://github.com/styleguidist/react-docgen-typescript#options
            // docgenOptions: {},
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
};
