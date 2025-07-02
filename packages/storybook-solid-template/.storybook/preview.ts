import type { Preview } from 'storybook-solidjs-vite';

const preview: Preview = {
    tags: ['autodocs'],
    parameters: {
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
    },
};

export default preview;
