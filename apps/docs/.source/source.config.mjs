// source.config.ts
import { defineDocs } from "fumadocs-mdx/config";
import { remarkAutoTypeTable, createGenerator } from "fumadocs-typescript";
import { defineConfig } from "fumadocs-mdx/config";
var generator = createGenerator();
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]]
  }
});
var { docs, meta } = defineDocs({
  dir: "./content"
});
export {
  source_config_default as default,
  docs,
  meta
};
