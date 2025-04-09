// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = { items: [
  {
    "type": "doc",
    "id": "web-app/global",
    "label": "global"
  },
  {
    "type": "category",
    "label": "lib",
    "items": [
      {
        "type": "doc",
        "id": "web-app/lib/custom-domain",
        "label": "custom-domain"
      },
      {
        "type": "category",
        "label": "db",
        "items": [
          {
            "type": "doc",
            "id": "web-app/lib/db/email-tokens",
            "label": "email-tokens"
          },
          {
            "type": "doc",
            "id": "web-app/lib/db/schema",
            "label": "schema"
          },
          {
            "type": "doc",
            "id": "web-app/lib/db/users",
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
            "id": "web-app/lib/middleware/auth",
            "label": "auth"
          },
          {
            "type": "doc",
            "id": "web-app/lib/middleware/auth-check",
            "label": "auth-check"
          },
          {
            "type": "doc",
            "id": "web-app/lib/middleware/email",
            "label": "email"
          },
          {
            "type": "doc",
            "id": "web-app/lib/middleware/ratelimits",
            "label": "ratelimits"
          },
          {
            "type": "doc",
            "id": "web-app/lib/middleware/validations",
            "label": "validations"
          }
        ]
      },
      {
        "type": "doc",
        "id": "web-app/lib/utils",
        "label": "utils"
      }
    ],
    "link": {
      "type": "doc",
      "id": "web-app/lib"
    }
  },
  {
    "type": "doc",
    "id": "web-app/lib",
    "label": "lib"
  }
]};
module.exports = typedocSidebar.items;