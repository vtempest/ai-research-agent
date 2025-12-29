
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultComponents from 'fumadocs-ui/mdx';
import { APIPage } from '@/app/components/api-page';
import type { MDXComponents } from 'mdx/types';
// make sure you can use it in MDX files


export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...TabsComponents,
    ...defaultComponents,
    // @ts-ignore
    APIPage,
    ...components,
  };
}
