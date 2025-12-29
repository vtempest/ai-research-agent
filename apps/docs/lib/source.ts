import { loader } from 'fumadocs-core/source';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { docs } from 'fumadocs-mdx:collections/server';
import { openapiPlugin } from 'fumadocs-openapi/server';

export const source = loader({
  baseUrl: '/docs',
  plugins: [openapiPlugin()],

  source: docs.toFumadocsSource(),
});

export const openapi = createOpenAPI({
  input: ['./openapi.yml'],
});
