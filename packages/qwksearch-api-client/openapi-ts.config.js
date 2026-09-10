import { defineConfig } from '@hey-api/openapi-ts';

export const baseUrl = process.env.API_URL || 'https://qwksearch.com/api';

/**
 * `@hey-api/client-fetch` is only the scaffold: it emits the bundled client
 * folder, the serializers and the `client.gen.ts` that reads `../baseurl.ts`.
 * `bun run build:api` then runs `api2client --rewire-only ./src`, which swaps
 * `src/client/client.gen.ts` for a shim over grab, so nothing here actually
 * calls fetch. Generating against a different Hey API client would change the
 * shape of the output the rewire expects.
 */
export const config = {
  input: './qwksearch-openapi.json',
  output: './src',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../baseurl.ts',
    },
  ],
};

export default defineConfig(config);