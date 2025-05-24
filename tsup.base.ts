import { defineConfig, type Options } from 'tsup';

export const shared = (config?: Options | Options[]) =>
    defineConfig({
        entry: ['src/**/*.{ts,tsx}'],
        splitting: false,
        sourcemap: true,
        clean: false,
        format: ['esm', 'cjs'],
        shims: true,
        ...config,
    });
