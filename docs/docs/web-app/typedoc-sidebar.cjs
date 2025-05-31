// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: "doc",
      id: "web-app/global",
      label: "global"
    },
    {
      type: "doc",
      id: "web-app/hooks.server",
      label: "hooks.server"
    },
    {
      type: "category",
      label: "lib",
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
                  id: "web-app/lib/components/AppLayout/auth-google-one-tap",
                  label: "auth-google-one-tap"
                },
                {
                  type: "doc",
                  id: "web-app/lib/components/AppLayout/fix",
                  label: "fix"
                },
                {
                  type: "doc",
                  id: "web-app/lib/components/AppLayout/sound-effects",
                  label: "sound-effects"
                },
                {
                  type: "doc",
                  id: "web-app/lib/components/AppLayout/theme-presets",
                  label: "theme-presets"
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
                      id: "web-app/lib/components/Editor/docx/docx-to-html",
                      label: "docx-to-html"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/docx/docx-tokens",
                      label: "docx-tokens"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/docx/parse-cards",
                      label: "parse-cards"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/docx/parse-debate-docx",
                      label: "parse-debate-docx"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/docx/parse-zip-folder",
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
                      id: "web-app/lib/components/Editor/storage/files-api-frontend",
                      label: "files-api-frontend"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/storage/local-storage-api",
                      label: "local-storage-api"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/Editor/storage/seed-test-data",
                      label: "seed-test-data"
                    }
                  ]
                }
              ]
            },
            {
              type: "category",
              label: "ReadMode",
              items: [
                {
                  type: "doc",
                  id: "web-app/lib/components/ReadMode/auto-highlight",
                  label: "auto-highlight"
                },
                {
                  type: "doc",
                  id: "web-app/lib/components/ReadMode/read-mode-view",
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
                  id: "web-app/lib/components/SearchWeb/categories",
                  label: "categories"
                },
                {
                  type: "category",
                  label: "extras",
                  items: [
                    {
                      type: "doc",
                      id: "web-app/lib/components/SearchWeb/extras/get-weather",
                      label: "get-weather"
                    },
                    {
                      type: "doc",
                      id: "web-app/lib/components/SearchWeb/extras/home-extras",
                      label: "home-extras"
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
                  id: "web-app/lib/components/ShortcutSearch/shortcut-search",
                  label: "shortcut-search"
                },
                {
                  type: "doc",
                  id: "web-app/lib/components/ShortcutSearch/shortcut-search-web",
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
                  id: "web-app/lib/components/TabManager/find-in-tab-content",
                  label: "find-in-tab-content"
                }
              ]
            }
          ]
        },
        {
          type: "doc",
          id: "web-app/lib/customize-site",
          label: "custom-domain"
        },
        {
          type: "category",
          label: "server",
          items: [
            {
              type: "doc",
              id: "web-app/lib/server/auth",
              label: "auth"
            },
            {
              type: "doc",
              id: "web-app/lib/server/drizzle.config",
              label: "drizzle.config"
            },
            {
              type: "doc",
              id: "web-app/lib/server/email",
              label: "email"
            },
            {
              type: "doc",
              id: "web-app/lib/server/ratelimits",
              label: "ratelimits"
            },
            {
              type: "doc",
              id: "web-app/lib/server/schema",
              label: "schema"
            },
            {
              type: "doc",
              id: "web-app/lib/server/types",
              label: "types"
            },
            {
              type: "doc",
              id: "web-app/lib/server/users",
              label: "users"
            },
            {
              type: "doc",
              id: "web-app/lib/server/validations",
              label: "validations"
            }
          ],
          link: {
            type: "doc",
            id: "web-app/lib/server"
          }
        },
        {
          type: "doc",
          id: "web-app/lib/server-1",
          label: "server"
        },
        {
          type: "category",
          label: "utils",
          items: [
            {
              type: "doc",
              id: "web-app/lib/utils/grab-api",
              label: "grab-api"
            }
          ],
          link: {
            type: "doc",
            id: "web-app/lib/utils"
          }
        },
        {
          type: "doc",
          id: "web-app/lib/utils-1",
          label: "utils"
        }
      ]
    },
    {
      type: "category",
      label: "routes",
      items: [
        {
          type: "doc",
          id: "web-app/routes/+layout",
          label: "+layout"
        },
        {
          type: "doc",
          id: "web-app/routes/+layout.server",
          label: "+layout.server"
        },
        {
          type: "category",
          label: "api",
          items: [
            {
              type: "category",
              label: "agents",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/agents/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "chats",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/chats/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "extract",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/extract/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "files",
              items: [
                {
                  type: "category",
                  label: "[fileId]",
                  items: [
                    {
                      type: "doc",
                      id: "web-app/routes/api/files/[fileId]/+server",
                      label: "+server"
                    }
                  ]
                },
                {
                  type: "doc",
                  id: "web-app/routes/api/files/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "model",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/model/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "search",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/search/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "subscriptions",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/subscriptions/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "user",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/user/+server",
                  label: "+server"
                }
              ]
            },
            {
              type: "category",
              label: "vectorize",
              items: [
                {
                  type: "doc",
                  id: "web-app/routes/api/vectorize/+server",
                  label: "+server"
                }
              ]
            }
          ]
        },
        {
          type: "category",
          label: "settings",
          items: [
            {
              type: "doc",
              id: "web-app/routes/settings/+layout",
              label: "+layout"
            },
            {
              type: "doc",
              id: "web-app/routes/settings/+layout.server",
              label: "+layout.server"
            },
            {
              type: "doc",
              id: "web-app/routes/settings/+page.server",
              label: "+page.server"
            }
          ]
        },
        {
          type: "category",
          label: "signin",
          items: [
            {
              type: "doc",
              id: "web-app/routes/signin/+page.server",
              label: "+page.server"
            }
          ]
        },
        {
          type: "category",
          label: "signout",
          items: [
            {
              type: "doc",
              id: "web-app/routes/signout/+page.server",
              label: "+page.server"
            }
          ]
        }
      ]
    }
  ]
};
module.exports = typedocSidebar.items;