import { defineConfig, createClient } from '@hey-api/openapi-ts';

export const baseURL = process.env.API_URL || 'https://qwksearch.com/api';

export const config = {
  input: './qwksearch-openapi.yml',
  output: './src',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './baseurl.ts', 
    },
  ],
};
export default defineConfig(config);   
createClient(config);

const { build } = require('vite');
const path = require('path');

await build({
  root: './', // project root (optional)
  configFile: './vite.config.ts'
});