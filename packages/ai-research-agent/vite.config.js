import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: [
        'src/**/*.ts'
      ],
      outDir: 'dist',
      rollupTypes: true,
    })
  ],
  build: {
    lib: {
        entry: {
          'research-agent': resolve(__dirname, 'index.ts'),
        },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`
    },
    rollupOptions: {
      // Disable inlineDynamicImports for multiple formats
      output: {
        inlineDynamicImports: false
      }
    },
    minify: 'terser',
    sourcemap: true,
    emptyOutDir: false
  }
});
