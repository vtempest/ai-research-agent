import type { CreateClientConfig } from './src/client.gen';

export const baseUrl = 'https://app.qwksearch.com/api';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl,
});