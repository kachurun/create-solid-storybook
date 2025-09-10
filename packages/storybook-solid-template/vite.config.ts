import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

console.log('read vite.config.ts');

export default defineConfig({
    define: {
        'process.env': {},
    },
    plugins: [
        
        // solidPlugin(),
    ],
});
