import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    dedupe: ["react", "react-dom"],
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'plasma-fhir-react-client-context',
            formats: ['es', 'umd'],
            fileName: (format) => `plasma-fhir-react-client-context.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
            },
        },
    },
});