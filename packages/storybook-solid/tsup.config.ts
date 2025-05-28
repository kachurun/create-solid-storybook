import { solidPlugin } from 'esbuild-plugin-solid';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
    return {
        tsconfig: './tsconfig.build.json',
        entry: [
            'src/index.ts',
            'src/preset.ts',
            'src/entry-preview.ts',
            'src/entry-preview-docs.ts',
        ],
        format: ['esm', 'cjs'],
        dts: false,
        outDir: 'dist',
        external: [],
        jsx: 'preserve',
        sourcemap: true,
        treeshake: !options.watch,
        esbuildPlugins: [solidPlugin()],
    };
});
