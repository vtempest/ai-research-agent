import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "routes/qwksearch-api",
    },
    {
      type: "category",
      label: "Services",
      link: {
        type: "doc",
        id: "routes/services",
      },
      items: [
        {
          type: "doc",
          id: "routes/extract-from-any-url-the-main-content-and-cite",
          label: "Extract from any URL the main content and cite",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "routes/generate-language-model-reply-using-agent-prompts",
          label: "Generate language model reply using agent prompts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "routes/search-the-web",
          label: "Search the web",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
