import { defineDocs } from 'fumadocs-mdx/config';
import { remarkAutoTypeTable, createGenerator } from 'fumadocs-typescript';
import { defineConfig } from 'fumadocs-mdx/config';

const generator = createGenerator();

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
  },
});

export const { docs, meta } = defineDocs({
  dir: './content',
});
