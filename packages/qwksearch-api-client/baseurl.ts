import type { CreateClientConfig } from './src/client.gen';

export const baseUrl = 'https://qwksearch.com/api';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl,
});