// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = { items: [
  {
    "type": "doc",
    "id": "global",
    "label": "global"
  },
  {
    "type": "doc",
    "id": "hooks",
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
                "id": "lib/components/AppLayout/auth-google-one-tap",
                "label": "auth-google-one-tap"
              },
              {
                "type": "doc",
                "id": "lib/components/AppLayout/auth-providers",
                "label": "auth-providers"
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
                    "id": "lib/components/Editor/docx/docx-to-html",
                    "label": "docx-to-html"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/docx/docx-tokens",
                    "label": "docx-tokens"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/docx/parse-cards",
                    "label": "parse-cards"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/docx/parse-debate-docx",
                    "label": "parse-debate-docx"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/docx/parse-zip-folder",
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
                    "id": "lib/components/Editor/storage/files-api-frontend",
                    "label": "files-api-frontend"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/storage/local-storage-api",
                    "label": "local-storage-api"
                  },
                  {
                    "type": "doc",
                    "id": "lib/components/Editor/storage/seed-test-data",
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
                "id": "lib/components/ReadMode/auto-highlight",
                "label": "auto-highlight"
              },
              {
                "type": "doc",
                "id": "lib/components/ReadMode/read-mode-view",
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
                "id": "lib/components/SearchHome/home-extras",
                "label": "home-extras"
              },
              {
                "type": "doc",
                "id": "lib/components/SearchHome/particlesConfig",
                "label": "particlesConfig"
              }
            ]
          },
          {
            "type": "category",
            "label": "ShortcutSearch",
            "items": [
              {
                "type": "doc",
                "id": "lib/components/ShortcutSearch/shortcut-search",
                "label": "shortcut-search"
              },
              {
                "type": "doc",
                "id": "lib/components/ShortcutSearch/shortcut-search-web",
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
                "id": "lib/components/TabManager/find-in-tab-content",
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
                "id": "lib/components/ui/alert",
                "label": "alert"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/alert",
                "label": "alert"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/alert-dialog",
                "label": "alert-dialog"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/alert-dialog",
                "label": "alert-dialog"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/avatar",
                "label": "avatar"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/avatar",
                "label": "avatar"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/badge",
                "label": "badge"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/badge",
                "label": "badge"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/breadcrumb",
                "label": "breadcrumb"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/breadcrumb",
                "label": "breadcrumb"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/button",
                "label": "button"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/button",
                "label": "button"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/card",
                "label": "card"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/card",
                "label": "card"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/checkbox",
                "label": "checkbox"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/checkbox",
                "label": "checkbox"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/command",
                "label": "command"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/command",
                "label": "command"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/dialog",
                "label": "dialog"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/dialog",
                "label": "dialog"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/dropdown-menu",
                "label": "dropdown-menu"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/dropdown-menu",
                "label": "dropdown-menu"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/form",
                "label": "form"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/form",
                "label": "form"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/input",
                "label": "input"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/input",
                "label": "input"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/label",
                "label": "label"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/label",
                "label": "label"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/menubar",
                "label": "menubar"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/menubar",
                "label": "menubar"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/pagination",
                "label": "pagination"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/pagination",
                "label": "pagination"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/popover",
                "label": "popover"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/popover",
                "label": "popover"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/progress",
                "label": "progress"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/progress",
                "label": "progress"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/select",
                "label": "select"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/select",
                "label": "select"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/separator",
                "label": "separator"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/separator",
                "label": "separator"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/sheet",
                "label": "sheet"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/sheet",
                "label": "sheet"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/slider",
                "label": "slider"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/slider",
                "label": "slider"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/sonner",
                "label": "sonner"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/sonner",
                "label": "sonner"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/switch",
                "label": "switch"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/switch",
                "label": "switch"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/table",
                "label": "table"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/table",
                "label": "table"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/tabs",
                "label": "tabs"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/tabs",
                "label": "tabs"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/textarea",
                "label": "textarea"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/textarea",
                "label": "textarea"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/tooltip",
                "label": "tooltip"
              },
              {
                "type": "doc",
                "id": "lib/components/ui/tooltip",
                "label": "tooltip"
              }
            ]
          }
        ]
      },
      {
        "type": "doc",
        "id": "lib/custom-domain",
        "label": "custom-domain"
      },
      {
        "type": "category",
        "label": "db",
        "items": [
          {
            "type": "doc",
            "id": "lib/db/email-tokens",
            "label": "email-tokens"
          },
          {
            "type": "doc",
            "id": "lib/db/schema",
            "label": "schema"
          },
          {
            "type": "doc",
            "id": "lib/db/users",
            "label": "users"
          }
        ]
      },
      {
        "type": "category",
        "label": "middleware",
        "items": [
          {
            "type": "doc",
            "id": "lib/middleware/auth",
            "label": "auth"
          },
          {
            "type": "doc",
            "id": "lib/middleware/auth-check",
            "label": "auth-check"
          },
          {
            "type": "doc",
            "id": "lib/middleware/email",
            "label": "email"
          },
          {
            "type": "doc",
            "id": "lib/middleware/ratelimits",
            "label": "ratelimits"
          },
          {
            "type": "doc",
            "id": "lib/middleware/validations",
            "label": "validations"
          }
        ]
      },
      {
        "type": "doc",
        "id": "lib/utils",
        "label": "utils"
      }
    ],
    "link": {
      "type": "doc",
      "id": "lib"
    }
  },
  {
    "type": "doc",
    "id": "lib",
    "label": "lib"
  },
  {
    "type": "category",
    "label": "routes",
    "items": [
      {
        "type": "doc",
        "id": "routes/+layout",
        "label": "+layout"
      },
      {
        "type": "doc",
        "id": "routes/+layout",
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
                "id": "routes/api/agents/+server",
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
                "id": "routes/api/chats/+server",
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
                "id": "routes/api/extract/+server",
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
                    "id": "routes/api/files/[fileId]/+server",
                    "label": "+server"
                  }
                ]
              },
              {
                "type": "doc",
                "id": "routes/api/files/+server",
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
                "id": "routes/api/model/+server",
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
                "id": "routes/api/search/+server",
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
                "id": "routes/api/subscriptions/+server",
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
                        "id": "routes/api/users/[userId]/files/+server",
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
        "label": "auth",
        "items": [
          {
            "type": "category",
            "label": "[oauth]",
            "items": [
              {
                "type": "doc",
                "id": "routes/auth/[oauth]/+server",
                "label": "+server"
              },
              {
                "type": "category",
                "label": "callback",
                "items": [
                  {
                    "type": "doc",
                    "id": "routes/auth/[oauth]/callback/+server",
                    "label": "+server"
                  }
                ]
              }
            ]
          },
          {
            "type": "doc",
            "id": "routes/auth/+layout",
            "label": "+layout"
          },
          {
            "type": "category",
            "label": "login",
            "items": [
              {
                "type": "doc",
                "id": "routes/auth/login/+page",
                "label": "+page.server"
              }
            ]
          },
          {
            "type": "category",
            "label": "logout",
            "items": [
              {
                "type": "doc",
                "id": "routes/auth/logout/+server",
                "label": "+server"
              }
            ]
          },
          {
            "type": "category",
            "label": "new-email",
            "items": [
              {
                "type": "category",
                "label": "confirm",
                "items": [
                  {
                    "type": "doc",
                    "id": "routes/auth/new-email/confirm/+page",
                    "label": "+page.server"
                  }
                ]
              },
              {
                "type": "category",
                "label": "submit",
                "items": [
                  {
                    "type": "doc",
                    "id": "routes/auth/new-email/submit/+page",
                    "label": "+page.server"
                  }
                ]
              }
            ]
          },
          {
            "type": "category",
            "label": "register",
            "items": [
              {
                "type": "doc",
                "id": "routes/auth/register/+page",
                "label": "+page.server"
              }
            ]
          },
          {
            "type": "category",
            "label": "reset-password",
            "items": [
              {
                "type": "category",
                "label": "[userId]",
                "items": [
                  {
                    "type": "doc",
                    "id": "routes/auth/reset-password/[userId]/+page",
                    "label": "+page.server"
                  },
                  {
                    "type": "category",
                    "label": "new-password",
                    "items": [
                      {
                        "type": "doc",
                        "id": "routes/auth/reset-password/[userId]/new-password/+page",
                        "label": "+page.server"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "doc",
                "id": "routes/auth/reset-password/+page",
                "label": "+page.server"
              }
            ]
          },
          {
            "type": "category",
            "label": "verify-email",
            "items": [
              {
                "type": "doc",
                "id": "routes/auth/verify-email/+page",
                "label": "+page.server"
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
            "id": "routes/settings/+layout",
            "label": "+layout"
          },
          {
            "type": "doc",
            "id": "routes/settings/+layout",
            "label": "+layout.server"
          },
          {
            "type": "doc",
            "id": "routes/settings/+page",
            "label": "+page.server"
          },
          {
            "type": "category",
            "label": "account",
            "items": [
              {
                "type": "doc",
                "id": "routes/settings/account/+page",
                "label": "+page.server"
              }
            ]
          },
          {
            "type": "category",
            "label": "notifications",
            "items": [
              {
                "type": "doc",
                "id": "routes/settings/notifications/+page",
                "label": "+page.server"
              }
            ]
          },
          {
            "type": "category",
            "label": "profile",
            "items": [
              {
                "type": "doc",
                "id": "routes/settings/profile/+page",
                "label": "+page.server"
              }
            ]
          }
        ]
      }
    ]
  }
]};
module.exports = typedocSidebar.items;