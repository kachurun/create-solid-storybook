import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    define: {
        'process.env': {},
    },
    plugins: [
        solidPlugin(),
    ],
});
