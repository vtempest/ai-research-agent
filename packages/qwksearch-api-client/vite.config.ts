import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'api-client'
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      outDir: 'dist',
      rollupTypes: true,
      include: ['src']
    })
  ]
});