import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Services",
      link: {
        type: "doc",
        id: "api/qwksearch-api",
      },
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/extract-content",
          label: "## Extract structured content and cite from any URL",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/write-language",
          label: "## Generate language model reply using agent prompts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/search-web",
          label: "## Search the web",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
