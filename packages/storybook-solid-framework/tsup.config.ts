import { solidPlugin } from 'esbuild-plugin-solid';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts', 'src/preset.ts'],
        format: ['esm', 'cjs'],
        outDir: 'dist',
        dts: false,
        external: [
            '@storybook/*',
            '@storybook/builder-vite',
            'storybook',
            'solid-js',
            'vite',
            'vite-plugin-solid',
            'storybook-solid-renderer',
        ],
        sourcemap: true,
        treeshake: !options.watch,
        plugins: [solidPlugin()],
    };
});
