import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { myCustomApiMdGenerator } from "./customMdGenerators";

const compileForSubdomain = true;

export default async function createConfig() {
  return {
    future: {
      experimental_faster: true,
    },
    title: "QwkSearch API Routes Docs",
    url: "https://qwksearch.com",
    baseUrl: compileForSubdomain ? "/" : "/docs/",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    favicon: "https://qwksearch.com/favicon.ico",
    projectName: "qwksearch-docs",
  
    plugins: [
      [
        "docusaurus-plugin-openapi-docs",
        {
          id: "openapi",
          docsPluginId: "classic",
          config: {
            qwksearch: {
              specPath: "qwksearch-api.yaml",
              outputDir: "docs/routes",
              sidebarOptions: {
                groupPathsBy: "tag",
                categoryLinkSource: "tag",
              },
              template: "api.mustache", // Customize API MDX with mustache template
              hideSendButton: false,
              markdownGenerators: { createApiPageMD: myCustomApiMdGenerator }, // customize MDX with markdown generator
              showSchemas: false,
            } satisfies OpenApiPlugin.Options,
          } satisfies Plugin.PluginOptions,
        },
      ],
  
      require.resolve("docusaurus-lunr-search"),
      [
        "docusaurus-plugin-typedoc",
        {
          entryPoints: ["../src/**/*"],
          exclude: ["**/node_modules/**/*"],
          tsconfig: "../tsconfig.json",
          plugin: ["./typedoc-plugin.js"],
          out: "./docs/functions",
          readme: "none",
          disableSources: true,
          groupOrder: ["Functions", "Classes"],
          sidebar: { pretty: true },
          textContentMappings: {
            "title.indexPage": "QwkSearch API",
            "title.memberPage": "{name}",
          },
          parametersFormat: "htmlTable",
          indexFormat: "list",
          enumMembersFormat: "htmlTable",
          typeDeclarationFormat: "htmlTable",
          typeDeclarationVisibility: "compact",
          sanitizeComments: false,
          useHTMLEncodedBrackets: true,
          useCodeBlocks: true,
          hideBreadcrumbs: false,
          hidePageHeader: true,
  
          hidePageTitle: true,
          gitRemote: "https://github.com/vtempest/ai-research-agent",
          outputFileStrategy: "modules",
        },
      ],
    ],
  
    presets: [
      [
        "classic",
        {
          docs: {
            routeBasePath: "/",
            sidebarPath: "./sidebars.ts",
            docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          },
          blog: false,
          theme: {
            customCss: "./custom-theme.css",
          },
          gtag: {
            trackingID: "G-E5TZ32BZDF",
            anonymizeIP: false,
          },
        } satisfies Preset.Options,
      ],
    ],
  
    themeConfig: {
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "logo",
          src: "https://qwksearch.com/icons/qwksearch-icon.svg",
        },
        items: [
          {
            to: "/",
            label: "Overview",
            position: "left",
          },
          {
            to: "/category/qwksearch-api",
            label: "API Routes",
            position: "left",
          },
          {
            to: "/functions",
            label: "Functions",
            position: "left",
          },
        ],
      },
  
      languageTabs: [
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "javascript",
          language: "javascript",
          logoClass: "javascript",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        {
          highlight: "powershell",
          language: "powershell",
          logoClass: "powershell",
        },
  
        {
          highlight: "rust",
          language: "rust",
          logoClass: "rust",
        },
        {
          highlight: "c",
          language: "c",
          logoClass: "c",
        },
        {
          highlight: "swift",
          language: "swift",
          logoClass: "swift",
        },
        {
          highlight: "kotlin",
          language: "kotlin",
          logoClass: "kotlin",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "csharp",
          language: "csharp",
          logoClass: "csharp",
        },
  
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
        },
        {
          highlight: "php",
          language: "php",
          logoClass: "php",
        },
      ],
    } satisfies Preset.ThemeConfig,
  
    themes: ["docusaurus-theme-openapi-docs"],
    stylesheets: [
      {
        href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
        type: "text/css",
      },
    ],
  } satisfies Config;
}
