import { solidPlugin } from 'esbuild-plugin-solid';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        entry: [
            'src/index.ts',
            'src/preset.ts',
            'src/entry-preview.tsx',
            'src/entry-preview-docs.tsx',
        ],
        format: ['esm', 'cjs'],
        outDir: 'dist',
        clean: true,
        dts: false,
        external: [
            // '@storybook/*',
            // 'storybook',
            // 'solid-js',
            // '@storybook/test',
            // '@storybook/docs-tools',
            // '@storybook/global',
            // '@storybook/preview-api',
        ],
        jsx: 'preserve',
        sourcemap: true,
        treeshake: !options.watch,
        esbuildPlugins: [solidPlugin()],
    };
});
