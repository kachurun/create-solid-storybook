import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import addonVitest from '@storybook/addon-vitest';

export const tags = ['autodocs'];

export const parameters = {
    // automatically create action args for all props that start with "on"
    actions: { argTypesRegex: '^on.*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    docs: {
        codePanel: true,
    },
};

export const addons = [
    addonA11y(),
    addonDocs(),
    addonVitest(),
];
