
const sidebarConfig = [
  {
    type: "category",
    label: "API Routes",
    collapsed: false,
    link: {
      type: "generated-index",
      title: "Qwksearch API",
      slug: "/category/qwksearch-api",
    },
    items: [
      {
        type: "autogenerated",
        dirName: "api",
      },
    ],
  },

  {
    type: "category",
    label: "Core Functions",
    collapsed: false,

    items: [
      {
        type: "autogenerated",
        dirName: "functions",
      },
    ],
  },

  {
    type: "category",
    label: "Web App",
    collapsed: false,
    items: [
      {
        type: "autogenerated",
        dirName: "web-app",
      },
    ],
  },
];

export default {
  api: sidebarConfig,
  functions: sidebarConfig,
  webapp: sidebarConfig,
  qwksearch: sidebarConfig,
  default: sidebarConfig,
};
