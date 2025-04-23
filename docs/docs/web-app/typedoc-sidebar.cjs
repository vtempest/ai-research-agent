// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = { items: [
  {
    "type": "doc",
    "id": "web-app/global",
    "label": "global"
  },
  {
    "type": "doc",
    "id": "web-app/hooks.server",
    "label": "hooks.server"
  },
  {
    "type": "category",
    "label": "lib",
    "items": [
      {
        "type": "category",
        "label": "components",
        "items": [
          {
            "type": "category",
            "label": "AppLayout",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/AppLayout/auth-google-one-tap",
                "label": "auth-google-one-tap"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/AppLayout/sound-effects",
                "label": "sound-effects"
              }
            ]
          },
          {
            "type": "category",
            "label": "Editor",
            "items": [
              {
                "type": "category",
                "label": "docx",
                "items": [
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/docx/docx-to-html",
                    "label": "docx-to-html"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/docx/docx-tokens",
                    "label": "docx-tokens"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/docx/parse-cards",
                    "label": "parse-cards"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/docx/parse-debate-docx",
                    "label": "parse-debate-docx"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/docx/parse-zip-folder",
                    "label": "parse-zip-folder"
                  }
                ]
              },
              {
                "type": "category",
                "label": "storage",
                "items": [
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/storage/files-api-frontend",
                    "label": "files-api-frontend"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/storage/local-storage-api",
                    "label": "local-storage-api"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/Editor/storage/seed-test-data",
                    "label": "seed-test-data"
                  }
                ]
              }
            ]
          },
          {
            "type": "category",
            "label": "ReadMode",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/ReadMode/auto-highlight",
                "label": "auto-highlight"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ReadMode/read-mode-view",
                "label": "read-mode-view"
              }
            ]
          },
          {
            "type": "category",
            "label": "SearchHome",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/SearchHome/home-extras",
                "label": "home-extras"
              }
            ]
          },
          {
            "type": "category",
            "label": "SearchWeb",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/SearchWeb/categories",
                "label": "categories"
              }
            ]
          },
          {
            "type": "category",
            "label": "ShortcutSearch",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/ShortcutSearch/shortcut-search",
                "label": "shortcut-search"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ShortcutSearch/shortcut-search-web",
                "label": "shortcut-search-web"
              }
            ]
          },
          {
            "type": "category",
            "label": "TabManager",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/TabManager/find-in-tab-content",
                "label": "find-in-tab-content"
              }
            ]
          },
          {
            "type": "category",
            "label": "ui",
            "items": [
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/alert",
                "label": "alert"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/alert-1",
                "label": "alert"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/alert-dialog",
                "label": "alert-dialog"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/alert-dialog-1",
                "label": "alert-dialog"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/avatar",
                "label": "avatar"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/avatar-1",
                "label": "avatar"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/badge",
                "label": "badge"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/badge-1",
                "label": "badge"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/breadcrumb",
                "label": "breadcrumb"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/breadcrumb-1",
                "label": "breadcrumb"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/button",
                "label": "button"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/button-1",
                "label": "button"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/card",
                "label": "card"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/card-1",
                "label": "card"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/checkbox",
                "label": "checkbox"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/checkbox-1",
                "label": "checkbox"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/command",
                "label": "command"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/command-1",
                "label": "command"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/dialog",
                "label": "dialog"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/dialog-1",
                "label": "dialog"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/dropdown-menu",
                "label": "dropdown-menu"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/dropdown-menu-1",
                "label": "dropdown-menu"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/form",
                "label": "form"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/form-1",
                "label": "form"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/input",
                "label": "input"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/input-1",
                "label": "input"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/label",
                "label": "label"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/label-1",
                "label": "label"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/menubar",
                "label": "menubar"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/menubar-1",
                "label": "menubar"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/pagination",
                "label": "pagination"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/pagination-1",
                "label": "pagination"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/popover",
                "label": "popover"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/popover-1",
                "label": "popover"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/progress",
                "label": "progress"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/progress-1",
                "label": "progress"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/select",
                "label": "select"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/select-1",
                "label": "select"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/separator",
                "label": "separator"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/separator-1",
                "label": "separator"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/sheet",
                "label": "sheet"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/sheet-1",
                "label": "sheet"
              },
              {
                "type": "category",
                "label": "sidebar",
                "items": [
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/ui/sidebar/constants",
                    "label": "constants"
                  },
                  {
                    "type": "doc",
                    "id": "web-app/lib/components/ui/sidebar/context.svelte",
                    "label": "context.svelte"
                  }
                ],
                "link": {
                  "type": "doc",
                  "id": "web-app/lib/components/ui/sidebar"
                }
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/sidebar-1",
                "label": "sidebar"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/skeleton",
                "label": "skeleton"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/skeleton-1",
                "label": "skeleton"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/slider",
                "label": "slider"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/slider-1",
                "label": "slider"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/sonner",
                "label": "sonner"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/sonner-1",
                "label": "sonner"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/switch",
                "label": "switch"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/switch-1",
                "label": "switch"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/table",
                "label": "table"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/table-1",
                "label": "table"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/tabs",
                "label": "tabs"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/tabs-1",
                "label": "tabs"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/textarea",
                "label": "textarea"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/textarea-1",
                "label": "textarea"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/tooltip",
                "label": "tooltip"
              },
              {
                "type": "doc",
                "id": "web-app/lib/components/ui/tooltip-1",
                "label": "tooltip"
              }
            ]
          }
        ]
      },
      {
        "type": "doc",
        "id": "web-app/lib/custom-domain",
        "label": "custom-domain"
      },
      {
        "type": "category",
        "label": "server",
        "items": [
          {
            "type": "doc",
            "id": "web-app/lib/server/auth",
            "label": "auth"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/drizzle.config",
            "label": "drizzle.config"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/email",
            "label": "email"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/ratelimits",
            "label": "ratelimits"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/schema",
            "label": "schema"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/users",
            "label": "users"
          },
          {
            "type": "doc",
            "id": "web-app/lib/server/validations",
            "label": "validations"
          }
        ],
        "link": {
          "type": "doc",
          "id": "web-app/lib/server"
        }
      },
      {
        "type": "doc",
        "id": "web-app/lib/server-1",
        "label": "server"
      },
      {
        "type": "doc",
        "id": "web-app/lib/utils",
        "label": "utils"
      }
    ]
  },
  {
    "type": "category",
    "label": "routes",
    "items": [
      {
        "type": "doc",
        "id": "web-app/routes/+layout",
        "label": "+layout"
      },
      {
        "type": "doc",
        "id": "web-app/routes/+layout.server",
        "label": "+layout.server"
      },
      {
        "type": "category",
        "label": "api",
        "items": [
          {
            "type": "category",
            "label": "agents",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/agents/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "chats",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/chats/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "extract",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/extract/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "files",
            "items": [
              {
                "type": "category",
                "label": "[fileId]",
                "items": [
                  {
                    "type": "doc",
                    "id": "web-app/routes/api/files/[fileId]/+server",
                    "label": "+server"
                  }
                ]
              },
              {
                "type": "doc",
                "id": "web-app/routes/api/files/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "model",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/model/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "search",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/search/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "subscriptions",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/api/subscriptions/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "users",
            "items": [
              {
                "type": "category",
                "label": "[userId]",
                "items": [
                  {
                    "type": "category",
                    "label": "files",
                    "items": [
                      {
                        "type": "doc",
                        "id": "web-app/routes/api/users/[userId]/files/+server",
                        "label": "+server"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "settings",
        "items": [
          {
            "type": "doc",
            "id": "web-app/routes/settings/+layout",
            "label": "+layout"
          },
          {
            "type": "doc",
            "id": "web-app/routes/settings/+layout.server",
            "label": "+layout.server"
          },
          {
            "type": "doc",
            "id": "web-app/routes/settings/+page.server",
            "label": "+page.server"
          },
          {
            "type": "category",
            "label": "account",
            "items": [
              {
                "type": "doc",
                "id": "web-app/routes/settings/account/+page.server",
                "label": "+page.server"
              }
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "signin",
        "items": [
          {
            "type": "doc",
            "id": "web-app/routes/signin/+page.server",
            "label": "+page.server"
          }
        ]
      },
      {
        "type": "category",
        "label": "signout",
        "items": [
          {
            "type": "doc",
            "id": "web-app/routes/signout/+page.server",
            "label": "+page.server"
          }
        ]
      }
    ]
  }
]};
module.exports = typedocSidebar.items;