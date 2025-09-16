// @ts-check
/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: "doc",
      id: "neural-net/index-1",
      label: "index"
    },
    {
      type: "category",
      label: "neural-net-tensors",
      items: [
        {
          type: "doc",
          id: "neural-net/neural-net-tensors/neural-net-gpu",
          label: "neural-net-gpu"
        },
        {
          type: "doc",
          id: "neural-net/neural-net-tensors/neural-net-tf",
          label: "neural-net-tf"
        }
      ]
    },
    {
      type: "category",
      label: "next-word-prediction",
      items: [
        {
          type: "category",
          label: "scripts",
          items: [
            {
              type: "doc",
              id: "neural-net/next-word-prediction/scripts/predict-next-word",
              label: "predict-next-word"
            }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "statistics",
      items: [
        {
          type: "doc",
          id: "neural-net/statistics/predict-statistics",
          label: "predict-statistics"
        }
      ]
    },
    {
      type: "category",
      label: "vectorize",
      items: [
        {
          type: "doc",
          id: "neural-net/vectorize/similarity-remote-api",
          label: "similarity-remote-api"
        },
        {
          type: "doc",
          id: "neural-net/vectorize/similarity-vector",
          label: "similarity-vector"
        },
        {
          type: "doc",
          id: "neural-net/vectorize/usearch",
          label: "usearch"
        }
      ]
    }
  ]
};
module.exports = typedocSidebar.items;