import type { CreateClientConfig } from './src/client.gen';
import { baseURL } from './openapi-ts.config';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: baseURL,
});