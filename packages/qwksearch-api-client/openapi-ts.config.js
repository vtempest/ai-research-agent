import { defineConfig } from '@hey-api/openapi-ts';

export const baseURL = process.env.API_URL || 'https://qwksearch.com/api';

export const config = {
  input: './qwksearch-openapi.yml',
  output: './src',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../baseurl.ts', 
    },
  ],
};

export default defineConfig(config);