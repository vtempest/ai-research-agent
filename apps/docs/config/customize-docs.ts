import type { APIDocsConfig } from "../docusaurus.config";


export default {
  name: "QwkSearch",
  domain: "https://qwksearch.com",
  baseFolder: "./",
  typedocFolders: [
    {
      id: "web",
      entryPoints: ["../web/src/lib/**/*"],
      tsconfig: "../web/tsconfig.json",
    },
    {
      id: "functions",
      entryPoints: ["../../packages/ai-research-agent/src/**/*"],
      tsconfig: "../../packages/ai-research-agent/tsconfig.json",
      // @ts-ignore
      label: "Core Functions",
    },
    {
      id: "neural-net",
      entryPoints: ["../../packages/neural-net/src/**/*"],
      tsconfig: "../../packages/neural-net/tsconfig.json",
    },
  ],
  showEditsOnGitHub: true,
  GOOGLE_ANALYTICS_ID: "G-E5TZ32BZD",
  gitRepoDocsPath: "https://github.com/vtempest/ai-research-agent/tree/master/apps/docs/",
  sourceLinkTemplate: "https://github.com/vtempest/ai-research-agent/tree/master/{path}#L{line}",
  usePathSlashDocs: !!process.env.PATH_ON_SLASH_DOCS,
  readme: "../../readme.md",
  sanitizeComments: false,
  logoURL: "/",
  logo: "https://qwksearch.com/icons/app-icon.svg",
  favicon: "https://qwksearch.com/favicon.ico",
  enableFasterBuildV4: false,
  enableReadmeAsHome: true,
  openAPISpecPath: './openapi-docs.yml',
  openAPIDocsOutput: "./src/api",
  openAPIShowSchemas: false,
  topbar: [
    {
      to: "/web",
      label: "👋 Overview",
      position: "left",
    },
    {
      to: "/category/qwksearch-api",
      label: "🔌 API Routes",
      position: "left",
    },

    {
      to: "/functions/modules",
      label: "🔧 Core Functions",
      position: "left",
    },
    {
      to: "/web/modules",
      label: "💻 Web App",
      position: "left",
    },
    {
      to: "https://qwksearch.com/",
      label: "🚀 Demo",
      position: "right",
    }
  ]
} satisfies APIDocsConfig;