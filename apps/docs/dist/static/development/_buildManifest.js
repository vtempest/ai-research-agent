self.__BUILD_MANIFEST = {
  "/_error": [
    "./static/chunks/pages/_error.js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/docs/:path*.mdx",
        "destination": "/llms.mdx/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()