import { solidPlugin } from 'esbuild-plugin-solid';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        entry: ['src/index.ts', 'src/preset.ts'],
        format: ['esm', 'cjs'],
        outDir: 'dist',
        dts: false,
        external: [
            '@storybook/builder-vite',
        ],
        jsx: 'preserve',
        sourcemap: true,
        treeshake: !options.watch,
        plugins: [solidPlugin()],
    };
});
