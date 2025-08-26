import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { type ApiPageMetadata } from "docusaurus-plugin-openapi-docs/lib/types";
import { type MediaTypeObject } from "docusaurus-plugin-openapi-docs/lib/openapi/types";
//OpenAPI integration
import { createAuthorization } from "docusaurus-plugin-openapi-docs/lib/markdown/createAuthorization";
import { createCallbacks } from "docusaurus-plugin-openapi-docs/lib/markdown/createCallbacks";
import { createDeprecationNotice } from "docusaurus-plugin-openapi-docs/lib/markdown/createDeprecationNotice";
import { createDescription } from "docusaurus-plugin-openapi-docs/lib/markdown/createDescription";
import { createHeading } from "docusaurus-plugin-openapi-docs/lib/markdown/createHeading";
import { createMethodEndpoint } from "docusaurus-plugin-openapi-docs/lib/markdown/createMethodEndpoint";
import { createParamsDetails } from "docusaurus-plugin-openapi-docs/lib/markdown/createParamsDetails";
import { createRequestBodyDetails } from "docusaurus-plugin-openapi-docs/lib/markdown/createRequestBodyDetails";
import { createRequestHeader } from "docusaurus-plugin-openapi-docs/lib/markdown/createRequestHeader";
import { createStatusCodes } from "docusaurus-plugin-openapi-docs/lib/markdown/createStatusCodes";
import { createVendorExtensions } from "docusaurus-plugin-openapi-docs/lib/markdown/createVendorExtensions";
import { render } from "docusaurus-plugin-openapi-docs/lib/markdown/utils";
import customizeDocs from "./config/customize-docs";
import fs from "fs";

/**
 * Generate docs from JSDoc comments in files, OpenAPI.yml spec for 
 * routes, search index of everything, custom pages, sidebar & theme.
 * 
 * *Install dependencies*:
 * bun install -D @docusaurus/core @docusaurus/faster @docusaurus/plugin-google-gtag
 *  @docusaurus/preset-classic docusaurus-lunr-search docusaurus-plugin-openapi-docs 
 * docusaurus-plugin-typedoc docusaurus-theme-openapi-docs prism-react-renderer react
 *  react-dom clsx typedoc typedoc-plugin-markdown typescript

    "docs": "concurrently \"npx docusaurus serve --dir ../web/static/docs\" \"wait-on http://localhost:3000; opener http://localhost:3000\"",
    "build:docs:slashdocs": "PATH_ON_SLASH_DOCS=true npm run docs:build",
    "build:docs": "TARGET=../web/static/docs; rm -rf $TARGET/*; mkdir -p $TARGET; npm run build:docs:openapi; DOCUSAURUS_IGNORE_SSG_WARNINGS=true npx docusaurus build --out-dir $TARGET; npm run docs",
    "build:docs:openapi": " NODE_NO_WARNINGS=1 npx docusaurus clean-api-docs  all   ; NODE_NO_WARNINGS=1 npx docusaurus  gen-api-docs all",

 * @see
 * [OpenAPI Docs](https://swagger.io/docs/specification/v3_0/basic-structure/)
 * [Docusaurus Docs](https://docusaurus.io/docs)
 * [Typedoc Docs](https://typedoc.org/documents/)
 * [Typedoc Plugin Docs](https://typedoc-plugin-markdown.org/docs/options)
 * [OpenAPI Plugin Docs](https://docusaurus-openapi.tryingpan.dev)
 * @returns {Promise<Config>}
 * @author [vtempest](https://github.com/vtempest/)
 */
export default async function createConfig(options: any = {}) {
  const {
    name = "App",
    domain = "https://example.org",
    baseFolder = "./",
    typedocFolders = [],
    showEditsOnGitHub = true,
    GOOGLE_ANALYTICS_ID = undefined,
    usePathSlashDocs = !!process.env.PATH_ON_SLASH_DOCS,
    readme = "../readme.md",
    sanitizeComments = false,
    favicon = undefined,
    logo = undefined,
    logoURL = "/",
    topbar = [],
    enableFasterBuildV4 = false,
    enableReadmeAsHome = true,

    sourceLinkTemplate,
    gitRepoDocsPath,
    openAPISpecPath = false,
    openAPIDocsOutput = "./src/api",
    openAPIShowSchemas = false,
  } = { ...customizeDocs, ...options };


  // make sure src folder exists
  if (!fs.existsSync(baseFolder + "src")) {
    fs.mkdirSync(baseFolder + "src");
  }

  //copy readme into ./src
  if (fs.existsSync(readme) && enableReadmeAsHome) {


    var index_frontmatter = '---\nid: index\ntitle: Overview\n' +
      'sidebar_position: 1\ndisplayed_sidebar: '
      + 'default' + '\n---\n\n'

    var readmeContent = fs.readFileSync(readme, "utf8")
    fs.writeFileSync(baseFolder + "src/index.md",
      index_frontmatter + readmeContent);
  }

  //prepend to index


  // foldersWithFunctions - should also add to tsconfig.json include:[]
  // usePathSlashDocs is used to generate at domain.com/docs 
  // but on github pages workflow, it outputs to
  // subdomain like docprojects.user.github.io
  // sanitizeComments helps avoid errors in markdown like <> {} etc
  return {
    future: enableFasterBuildV4 ? {
      v4: {
        removeLegacyPostBuildHeadAttribute: true, // REQUIRED for ssgWorkerThreads
      },
      experimental_faster: true,
    } : undefined,
    title: name,
    url: domain,
    baseUrl: usePathSlashDocs ? "/docs/" : "/",
    onBrokenLinks: "ignore",
    onBrokenMarkdownLinks: "ignore",
    favicon,
    projectName: name.replaceAll(" ", "-"),
    presets: [
      [
        "classic",
        {
          docs: {
            path: "src",
            routeBasePath: "/",
            editUrl: gitRepoDocsPath,
            sidebarPath: "./config/sidebars.ts",
            docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
            },
          blog: false,
          theme: {
            customCss: baseFolder + "config/docs-theme-beige.css",
          },
          ...(GOOGLE_ANALYTICS_ID && {
            gtag: {
              trackingID: GOOGLE_ANALYTICS_ID,
              anonymizeIP: false,
            },
          }),
        } satisfies Preset.Options,
      ],
    ],

    plugins: [


      [
        "docusaurus-plugin-openapi-docs",
        {
          id: "openapi",
          docsPluginId: "classic",
          config: {
            apispec: {
              specPath: openAPISpecPath,
              outputDir: openAPIDocsOutput,
              sidebarOptions: {
                groupPathsBy: "tag",
                categoryLinkSource: "info",
                sidebarCollapsed: false
              },
              infoTemplate: "config/info.mustache",
              tagTemplate: "config/tag.mustache",
              schemaTemplate: "config/schema.mustache",
              template: "./config/openapi.mustache", // Customize API MDX with mustache template
              hideSendButton: true, // Disable interactive features to avoid Redux issues
              markdownGenerators: { createApiPageMD }, // customize MDX with markdown generator
              showSchemas: openAPIShowSchemas,
            } satisfies OpenApiPlugin.Options,
          } satisfies Plugin.PluginOptions,
        },
      ],
      require.resolve("docusaurus-lunr-search"),

      ...(typedocFolders.map(({ id, entryPoints, tsconfig }) => [
        "docusaurus-plugin-typedoc",
        {
          id,
          entryPoints,
          exclude: [
            "**/node_modules/**/*",
            "**/components/ui/**/*",
            "pages/**/*"
          ],
          tsconfig,
          out: baseFolder + "src/" + id,
          readme,
          sourceLinkTemplate,
          disableSources: !showEditsOnGitHub,
          sidebar: { pretty: true },
          textContentMappings: {
            "title.indexPage": name + " API",
            "title.memberPage": "{name}",
          },
          parametersFormat: "htmlTable",
          indexFormat: "list",
          expandParameters: true,
          interfacePropertiesFormat: "htmlTable",
          propertyMembersFormat: "htmlTable",
          enumMembersFormat: "htmlTable",
          typeDeclarationFormat: "htmlTable",
          typeDeclarationVisibility: "compact",
          sanitizeComments,
          useHTMLEncodedBrackets: true,
          hideBreadcrumbs: false,
          hideGroupHeadings: true,
          hidePageHeader: true,
          hidePageTitle: true,
          outputFileStrategy: "modules",
          useCodeBlocks: true,
        },
      ]))
    ],

    themeConfig: {
      src: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: name + " Docs",
        logo: {
          alt: "logo",
          src: logo,
          href: logoURL || "/",
        },
        items: topbar
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

    themes: [
      "docusaurus-theme-openapi-docs"
    ],
    stylesheets: [
      {
        href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
        type: "text/css",
      },
    ],
  } satisfies Config;
}


function createServersTable(servers: any = []) {
  return ''
  if (typeof servers === 'object' && servers && servers.length) {
    return `| URL | Description |
| ---- | ----- |
${servers
        .map((server) => {
          return `| ${server.url} | ${server.description} | `.replace("\n", "<br/>");
        })
        .join("\n")}
    `;
  }
}

export function createApiPageMD({
  title,
  api: {
    deprecated,
    "x-deprecated-description": deprecatedDescription,
    description,
    method,
    path,
    extensions,
    parameters,
    requestBody,
    responses,
    callbacks,
    servers, // destructure servers here
  },
  infoPath,
  frontMatter,
}: ApiPageMetadata) {
  return render([
    `import MethodEndpoint from "@theme/ApiExplorer/MethodEndpoint";\n`,
    `import ParamsDetails from "@theme/ParamsDetails";\n`,
    `import RequestSchema from "@theme/RequestSchema";\n`,
    `import StatusCodes from "@theme/StatusCodes";\n`,
    `import OperationTabs from "@theme/OperationTabs";\n`,
    `import TabItem from "@theme/TabItem";\n`,
    `import Heading from "@theme/Heading";\n\n`,
    createHeading(title),
    createMethodEndpoint(method, path),
    createServersTable(servers),
    infoPath && createAuthorization(infoPath),
    frontMatter.show_extensions
      ? createVendorExtensions(extensions)
      : undefined,
    createDeprecationNotice({ deprecated, description: deprecatedDescription }),
    createDescription(description),
    requestBody || parameters ? createRequestHeader("Request") : undefined,
    createParamsDetails({ parameters }),
    createRequestBodyDetails({
      title: "Body",
      body: requestBody,
    } as RequestBodyProps),
    createStatusCodes({ responses }),
    createCallbacks({ callbacks }),
  ]);
}


export interface RequestBodyProps {
  title: string;
  body: {
    content?: {
      [key: string]: MediaTypeObject;
    };
    description?: string;
    required?: boolean;
  };
}


/**
 * Configuration schema for API documentation generation
 * Supports TypeDoc, OpenAPI, and custom documentation features
 */
export interface APIDocsConfig extends Partial<{
  /** 
   * Display name for the API documentation
   * Used in page titles, navigation, and browser tabs
   * @example "My API Documentation"
   */
  name: string;

  /** 
   * Base domain URL where the documentation will be hosted
   * Should include protocol (http/https)
   * @example "https://api.example.com" 
   */
  domain: string;

  /** 
   * Configuration for TypeDoc-generated documentation folders
   * Each folder represents a separate documentation section
   */
  typedocFolders: Array<{
    /** 
     * Unique identifier for this TypeDoc folder
     * Used in URLs and internal references
     * @example "functions", "classes", "types"
     */
    id: string;

    /** 
     * Array of glob patterns specifying which TypeScript files to include
     * Supports standard glob syntax (*, **, ?)
     * @example ["../src/**"]
     */
    entryPoints: string[];

    /** 
     * Path to the TypeScript configuration file for this folder
     * Used for compilation and type resolution
     * @example "../tsconfig.json"
     */
    tsconfig?: string;
  }>;

  /** 
   * Base URL path to the GitHub repository's documentation folder
   * Used for generating "Edit on GitHub" links
   * @example "https://github.com/username/repo/tree/master/"
   */
  gitRepoDocsPath: string;

  /** 
   * Template string for generating source code links
   * Placeholders: {path} for file path, {line} for line number
   * @example "https://github.com/username/repo/tree/master/{path}#L{line}"
   */
  sourceLinkTemplate: string;

  /** 
   * Path to OpenAPI/Swagger specification file
   * Set to false to disable OpenAPI documentation
   * @example "./openapi.json" or false
   */
  openAPISpecPath: string | false;

  /** 
   * Output directory for generated OpenAPI documentation
   * Relative to the base documentation folder
   * @example "./src/api"
   */
  openAPIDocsOutput: string;

  /** 
   * Whether to display OpenAPI schema definitions in the documentation
   * When true, shows detailed schema information for API models
   */
  openAPIShowSchemas: boolean;

  /** 
   * Enable "Edit on GitHub" links throughout the documentation
   * Allows users to suggest changes directly on GitHub
   */
  showEditsOnGitHub: boolean;

  /** 
   * Google Analytics tracking ID for usage analytics
   * Set to false or empty string to disable analytics
   * @example "GA-XXXXXXXXX-X" or false
   */
  GOOGLE_ANALYTICS_ID: string | false;

  /** 
   * Optimize build output for subdomain hosting
   * Affects asset paths and routing configuration
   */
  usePathSlashDocs: boolean;

  /** 
   * Path to the main TypeScript configuration file
   * Used for global TypeScript settings and compilation
   * @example "./tsconfig.json"
   */
  tsconfig: string;

  /** 
   * Path to the README file to use as documentation homepage
   * Supports Markdown files that will be converted to HTML
   * @example "../README.md"
   */
  readme: string;

  /** 
   * Remove HTML tags and sanitize comments from JSDoc
   * Helps ensure clean, consistent documentation output
   */
  sanitizeComments: boolean;

  /** 
   * URL to navigate to when the logo is clicked
   * Typically the homepage or main documentation page
   * @example "/"
   */
  logoURL: string;

  /** 
   * Base folder for all documentation-related files
   * Used as the root directory for relative paths
   * @example "./"
   */
  baseFolder: string;

  /** 
   * Path to the logo image file
   * Displayed in the documentation header/navigation
   * @example "/icon.png"
   */
  logo: string;

  /** 
   * Path to the favicon image file
   * Shown in browser tabs and bookmarks
   * @example "/icon.png"
   */
  favicon: string;

  /** 
   * Enable experimental faster build system (version 4)
   * Faster but has "module.exports" error with odler plugins
   */
  enableFasterBuildV4: boolean;

  /** 
   * Use the README file as the homepage instead of default layout
   * When true, visitors see README content immediately upon arrival
   */
  enableReadmeAsHome: boolean;

  /** 
   * Configuration for the top navigation bar
   * Array of navigation items with links and labels
   */
  topbar: Array<{
    /** 
     * URL path for the navigation link
     * Can be relative or absolute
     * @example "/functions", "/getting-started"
     */
    to: string;

    /** 
     * Display text for the navigation item
     * Can include emojis or special characters
     * @example "👋 Intro", "API Reference"
     */
    label: string;

    /** 
     * Position of the navigation item in the top bar
     * @example "left", "right"
     */
    position: "left" | "right";
  }>;
}> {};