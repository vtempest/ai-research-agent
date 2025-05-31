import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/qwksearch-api",
    },
    {
      type: "category",
      label: "Services",
      link: {
        type: "generated-index",
        title: "Services",
        slug: "/category/api/services",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/extract-structured-content-and-cite-from-any-url",
          label: "Extract structured content and cite from any URL",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/generate-language-model-reply-using-agent-prompts",
          label: "Generate language model reply using agent prompts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/search-the-web",
          label: "Search the web",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
