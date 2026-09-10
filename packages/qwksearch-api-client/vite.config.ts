import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// import { heyApiPlugin } from '@hey-api/vite-plugin';

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
      format: {
        comments: false
      }
    },
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'umd'],
      fileName: 'api-client',
      name: 'api-client'
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // grab is the transport *and* the shared cache, mock server, rate
      // limiter and request log. Bundling a second copy in here would give the
      // SDK its own private one, so `grab.mock['/search']` set by the app would
      // never reach these endpoints. Consumers install grab-url themselves.
      external: ['grab-url', 'api2client'],
      output: {
        globals: {
          'grab-url': 'grab',
          api2client: 'api2client'
        }
      }
    }
  },
  plugins: [
    // heyApiPlugin is disabled during build since we run openapi-ts separately
    // heyApiPlugin({
    //   config: {
    //     input: './qwksearch-openapi.yml',
    //     output: './src'
    //   }
    // }),
    dts({
      outDir: 'dist',
      rollupTypes: true,
      include: ['src']
    })
  ]
});
