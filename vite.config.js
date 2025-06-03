﻿import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: './scripts/home.ts',
            name: 'home',
            fileName: () => 'home.js',
            formats: ['es']
        },
        outDir: './wwwroot/js',
        emptyOutDir: true,
        rollupOptions: {
            external: []
        }
    }
});