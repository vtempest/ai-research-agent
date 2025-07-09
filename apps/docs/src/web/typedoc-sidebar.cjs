// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: "category",
      label: "components",
      items: [
        {
          type: "category",
          label: "AppLayout",
          items: [
            {
              type: "doc",
              id: "web/components/AppLayout/auth-google-one-tap",
              label: "auth-google-one-tap"
            },
            {
              type: "doc",
              id: "web/components/AppLayout/sound-effects",
              label: "sound-effects"
            }
          ]
        },
        {
          type: "category",
          label: "Editor",
          items: [
            {
              type: "category",
              label: "docx",
              items: [
                {
                  type: "doc",
                  id: "web/components/Editor/docx/docx-to-html",
                  label: "docx-to-html"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/docx/docx-tokens",
                  label: "docx-tokens"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/docx/parse-cards",
                  label: "parse-cards"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/docx/parse-debate-docx",
                  label: "parse-debate-docx"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/docx/parse-zip-folder",
                  label: "parse-zip-folder"
                }
              ]
            },
            {
              type: "category",
              label: "storage",
              items: [
                {
                  type: "doc",
                  id: "web/components/Editor/storage/files-api-frontend",
                  label: "files-api-frontend"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/storage/local-storage-api",
                  label: "local-storage-api"
                },
                {
                  type: "doc",
                  id: "web/components/Editor/storage/seed-test-data",
                  label: "seed-test-data"
                }
              ]
            }
          ]
        },
        {
          type: "doc",
          id: "web/components/icons",
          label: "icons"
        },
        {
          type: "doc",
          id: "web/components/icons-1",
          label: "icons"
        },
        {
          type: "category",
          label: "ReadMode",
          items: [
            {
              type: "doc",
              id: "web/components/ReadMode/auto-highlight",
              label: "auto-highlight"
            },
            {
              type: "doc",
              id: "web/components/ReadMode/read-mode-view",
              label: "read-mode-view"
            }
          ]
        },
        {
          type: "category",
          label: "SearchWeb",
          items: [
            {
              type: "doc",
              id: "web/components/SearchWeb/categories",
              label: "categories"
            },
            {
              type: "category",
              label: "extras",
              items: [
                {
                  type: "doc",
                  id: "web/components/SearchWeb/extras/get-weather",
                  label: "get-weather"
                },
                {
                  type: "doc",
                  id: "web/components/SearchWeb/extras/home-extras",
                  label: "home-extras"
                },
                {
                  type: "doc",
                  id: "web/components/SearchWeb/extras/QuantumSphere",
                  label: "QuantumSphere"
                }
              ]
            }
          ]
        },
        {
          type: "category",
          label: "ShortcutSearch",
          items: [
            {
              type: "doc",
              id: "web/components/ShortcutSearch/shortcut-search",
              label: "shortcut-search"
            },
            {
              type: "doc",
              id: "web/components/ShortcutSearch/shortcut-search-web",
              label: "shortcut-search-web"
            }
          ]
        },
        {
          type: "category",
          label: "TabManager",
          items: [
            {
              type: "doc",
              id: "web/components/TabManager/find-in-tab-content",
              label: "find-in-tab-content"
            }
          ]
        },
        {
          type: "category",
          label: "utils",
          items: [
            {
              type: "doc",
              id: "web/components/utils/auth-client",
              label: "auth-client"
            }
          ],
          link: {
            type: "doc",
            id: "web/components/utils"
          }
        },
        {
          type: "doc",
          id: "web/components/utils-1",
          label: "utils"
        }
      ]
    },
    {
      type: "doc",
      id: "web/customize-site",
      label: "customize-site"
    },
    {
      type: "category",
      label: "server",
      items: [
        {
          type: "doc",
          id: "web/server/auth",
          label: "auth"
        },
        {
          type: "doc",
          id: "web/server/drizzle.config",
          label: "drizzle.config"
        },
        {
          type: "doc",
          id: "web/server/email",
          label: "email"
        },
        {
          type: "doc",
          id: "web/server/ratelimits",
          label: "ratelimits"
        },
        {
          type: "doc",
          id: "web/server/schema",
          label: "schema"
        },
        {
          type: "doc",
          id: "web/server/types",
          label: "types"
        },
        {
          type: "doc",
          id: "web/server/users",
          label: "users"
        },
        {
          type: "doc",
          id: "web/server/validations",
          label: "validations"
        }
      ],
      link: {
        type: "doc",
        id: "web/server"
      }
    },
    {
      type: "doc",
      id: "web/server-1",
      label: "server"
    }
  ]
};
module.exports = typedocSidebar.items;