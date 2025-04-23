import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api-routes/qwksearch-api",
    },
    {
      type: "category",
      label: "Services",
      link: {
        type: "doc",
        id: "api-routes/services",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api-routes/extract-from-any-url-the-main-content-and-cite",
          label: "Extract from any URL the main content and cite",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api-routes/generate-language-model-reply-using-agent-prompts",
          label: "Generate language model reply using agent prompts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api-routes/search-the-web",
          label: "Search the web",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
