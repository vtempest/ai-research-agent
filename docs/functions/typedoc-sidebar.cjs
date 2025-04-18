// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = { items: [
  {
    "type": "category",
    "label": "agents",
    "items": [
      {
        "type": "doc",
        "id": "agents/agent-prompts",
        "label": "agent-prompts"
      },
      {
        "type": "doc",
        "id": "agents/agent-tools",
        "label": "agent-tools"
      },
      {
        "type": "doc",
        "id": "agents/api2ai",
        "label": "api2ai"
      },
      {
        "type": "doc",
        "id": "agents/generate-reply-api",
        "label": "generate-reply-api"
      },
      {
        "type": "doc",
        "id": "agents/languagereply-to-json",
        "label": "languagereply-to-json"
      }
    ]
  },
  {
    "type": "category",
    "label": "crawler",
    "items": [
      {
        "type": "doc",
        "id": "crawler/crawler",
        "label": "crawler"
      }
    ]
  },
  {
    "type": "category",
    "label": "datasets",
    "items": [
      {
        "type": "doc",
        "id": "datasets/compile-topic-model",
        "label": "compile-topic-model"
      },
      {
        "type": "doc",
        "id": "datasets/compress-json-jz64",
        "label": "compress-json-jz64"
      },
      {
        "type": "doc",
        "id": "datasets/dictionary-import",
        "label": "dictionary-import"
      },
      {
        "type": "doc",
        "id": "datasets/human-names-import",
        "label": "human-names-import"
      },
      {
        "type": "doc",
        "id": "datasets/metadata-stats",
        "label": "metadata-stats"
      },
      {
        "type": "doc",
        "id": "datasets/misspelled-typos-import",
        "label": "misspelled-typos-import"
      },
      {
        "type": "doc",
        "id": "datasets/quora-import",
        "label": "quora-import"
      },
      {
        "type": "doc",
        "id": "datasets/term-frequency-import",
        "label": "term-frequency-import"
      },
      {
        "type": "doc",
        "id": "datasets/wikipage-titles-import",
        "label": "wikipage-titles-import"
      }
    ]
  },
  {
    "type": "category",
    "label": "editor",
    "items": [
      {
        "type": "doc",
        "id": "editor/asRoot",
        "label": "asRoot"
      },
      {
        "type": "category",
        "label": "delta",
        "items": [
          {
            "type": "category",
            "label": "AttributeMap",
            "items": [
              {
                "type": "category",
                "label": "Namespaces",
                "items": [
                  {
                    "type": "doc",
                    "id": "editor/delta/AttributeMap/namespaces/default",
                    "label": "default"
                  }
                ]
              }
            ],
            "link": {
              "type": "doc",
              "id": "editor/delta/AttributeMap/index"
            }
          },
          {
            "type": "doc",
            "id": "editor/delta/Delta",
            "label": "Delta"
          },
          {
            "type": "doc",
            "id": "editor/delta/fast-diff",
            "label": "fast-diff"
          },
          {
            "type": "category",
            "label": "Op",
            "items": [
              {
                "type": "category",
                "label": "Namespaces",
                "items": [
                  {
                    "type": "doc",
                    "id": "editor/delta/Op/namespaces/default",
                    "label": "default"
                  }
                ]
              }
            ],
            "link": {
              "type": "doc",
              "id": "editor/delta/Op/index"
            }
          },
          {
            "type": "category",
            "label": "util",
            "items": [
              {
                "type": "doc",
                "id": "editor/delta/util/cloneDeep",
                "label": "cloneDeep"
              },
              {
                "type": "doc",
                "id": "editor/delta/util/isEqual",
                "label": "isEqual"
              }
            ]
          }
        ],
        "link": {
          "type": "doc",
          "id": "editor/delta"
        }
      },
      {
        "type": "doc",
        "id": "editor/delta",
        "label": "delta"
      },
      {
        "type": "category",
        "label": "document",
        "items": [
          {
            "type": "doc",
            "id": "editor/document/deltaToText",
            "label": "deltaToText"
          },
          {
            "type": "doc",
            "id": "editor/document/EditorRange",
            "label": "EditorRange"
          },
          {
            "type": "category",
            "label": "Line",
            "items": [
              {
                "type": "category",
                "label": "Namespaces",
                "items": [
                  {
                    "type": "doc",
                    "id": "editor/document/Line/namespaces/default",
                    "label": "default"
                  }
                ]
              }
            ],
            "link": {
              "type": "doc",
              "id": "editor/document/Line/index"
            }
          },
          {
            "type": "category",
            "label": "LineOp",
            "items": [
              {
                "type": "category",
                "label": "Namespaces",
                "items": [
                  {
                    "type": "doc",
                    "id": "editor/document/LineOp/namespaces/default",
                    "label": "default"
                  }
                ]
              }
            ],
            "link": {
              "type": "doc",
              "id": "editor/document/LineOp/index"
            }
          },
          {
            "type": "doc",
            "id": "editor/document/TextChange",
            "label": "TextChange"
          },
          {
            "type": "doc",
            "id": "editor/document/TextDocument",
            "label": "TextDocument"
          }
        ],
        "link": {
          "type": "doc",
          "id": "editor/document"
        }
      },
      {
        "type": "doc",
        "id": "editor/document",
        "label": "document"
      },
      {
        "type": "doc",
        "id": "editor/Editor",
        "label": "Editor"
      },
      {
        "type": "category",
        "label": "modules",
        "items": [
          {
            "type": "doc",
            "id": "editor/modules/copy",
            "label": "copy"
          },
          {
            "type": "doc",
            "id": "editor/modules/decorations",
            "label": "decorations"
          },
          {
            "type": "doc",
            "id": "editor/modules/defaults",
            "label": "defaults"
          },
          {
            "type": "doc",
            "id": "editor/modules/history",
            "label": "history"
          },
          {
            "type": "doc",
            "id": "editor/modules/input",
            "label": "input"
          },
          {
            "type": "doc",
            "id": "editor/modules/keyboard",
            "label": "keyboard"
          },
          {
            "type": "doc",
            "id": "editor/modules/paste",
            "label": "paste"
          },
          {
            "type": "doc",
            "id": "editor/modules/placeholder",
            "label": "placeholder"
          },
          {
            "type": "doc",
            "id": "editor/modules/rendering",
            "label": "rendering"
          },
          {
            "type": "doc",
            "id": "editor/modules/scheduled-signal",
            "label": "scheduled-signal"
          },
          {
            "type": "doc",
            "id": "editor/modules/selection",
            "label": "selection"
          },
          {
            "type": "doc",
            "id": "editor/modules/shortcutFromEvent",
            "label": "shortcutFromEvent"
          },
          {
            "type": "doc",
            "id": "editor/modules/smartEntry",
            "label": "smartEntry"
          },
          {
            "type": "doc",
            "id": "editor/modules/smartQuotes",
            "label": "smartQuotes"
          },
          {
            "type": "doc",
            "id": "editor/modules/tables",
            "label": "tables"
          },
          {
            "type": "doc",
            "id": "editor/modules/virtualRendering",
            "label": "virtualRendering"
          }
        ],
        "link": {
          "type": "doc",
          "id": "editor/modules"
        }
      },
      {
        "type": "doc",
        "id": "editor/modules",
        "label": "modules"
      },
      {
        "type": "doc",
        "id": "editor/popper",
        "label": "popper"
      },
      {
        "type": "category",
        "label": "rendering",
        "items": [
          {
            "type": "doc",
            "id": "editor/rendering/html",
            "label": "html"
          },
          {
            "type": "doc",
            "id": "editor/rendering/position",
            "label": "position"
          },
          {
            "type": "doc",
            "id": "editor/rendering/rendering",
            "label": "rendering"
          },
          {
            "type": "doc",
            "id": "editor/rendering/selection",
            "label": "selection"
          },
          {
            "type": "doc",
            "id": "editor/rendering/vdom",
            "label": "vdom"
          },
          {
            "type": "doc",
            "id": "editor/rendering/walker",
            "label": "walker"
          }
        ]
      },
      {
        "type": "doc",
        "id": "editor/Source",
        "label": "Source"
      },
      {
        "type": "doc",
        "id": "editor/stores",
        "label": "stores"
      },
      {
        "type": "category",
        "label": "typesetting",
        "items": [
          {
            "type": "doc",
            "id": "editor/typesetting/defaults",
            "label": "defaults"
          },
          {
            "type": "doc",
            "id": "editor/typesetting/embeds",
            "label": "embeds"
          },
          {
            "type": "doc",
            "id": "editor/typesetting/formats",
            "label": "formats"
          },
          {
            "type": "doc",
            "id": "editor/typesetting/lines",
            "label": "lines"
          },
          {
            "type": "doc",
            "id": "editor/typesetting/typeset",
            "label": "typeset"
          }
        ],
        "link": {
          "type": "doc",
          "id": "editor/typesetting"
        }
      },
      {
        "type": "doc",
        "id": "editor/typesetting",
        "label": "typesetting"
      },
      {
        "type": "category",
        "label": "util",
        "items": [
          {
            "type": "doc",
            "id": "editor/util/EventDispatcher",
            "label": "EventDispatcher"
          }
        ]
      }
    ],
    "link": {
      "type": "doc",
      "id": "editor"
    }
  },
  {
    "type": "doc",
    "id": "editor",
    "label": "editor"
  },
  {
    "type": "category",
    "label": "extractor",
    "items": [
      {
        "type": "category",
        "label": "html-to-cite",
        "items": [
          {
            "type": "doc",
            "id": "extractor/html-to-cite/extract-author",
            "label": "extract-author"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/extract-cite",
            "label": "extract-cite"
          },
          {
            "type": "category",
            "label": "extract-date",
            "items": [
              {
                "type": "doc",
                "id": "extractor/html-to-cite/extract-date/date-extractors",
                "label": "date-extractors"
              },
              {
                "type": "doc",
                "id": "extractor/html-to-cite/extract-date/date-validators",
                "label": "date-validators"
              },
              {
                "type": "doc",
                "id": "extractor/html-to-cite/extract-date/extract-date",
                "label": "extract-date"
              },
              {
                "type": "doc",
                "id": "extractor/html-to-cite/extract-date/extract-date-quick",
                "label": "extract-date-quick"
              }
            ]
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/extract-source",
            "label": "extract-source"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/extract-title",
            "label": "extract-title"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/human-names-recognize",
            "label": "human-names-recognize"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/metadata-to-cite",
            "label": "metadata-to-cite"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/url-to-domain",
            "label": "url-to-domain"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-cite/url-to-favicon",
            "label": "url-to-favicon"
          }
        ]
      },
      {
        "type": "category",
        "label": "html-to-content",
        "items": [
          {
            "type": "category",
            "label": "extract-content",
            "items": [
              {
                "type": "doc",
                "id": "extractor/html-to-content/extract-content/extract-content-mercury",
                "label": "extract-content-mercury"
              },
              {
                "type": "doc",
                "id": "extractor/html-to-content/extract-content/extract-content-mercury-utils",
                "label": "extract-content-mercury-utils"
              },
              {
                "type": "doc",
                "id": "extractor/html-to-content/extract-content/extract-content-readability",
                "label": "extract-content-readability"
              }
            ]
          },
          {
            "type": "doc",
            "id": "extractor/html-to-content/html-to-basic-html",
            "label": "html-to-basic-html"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-content/html-to-content",
            "label": "html-to-content"
          },
          {
            "type": "doc",
            "id": "extractor/html-to-content/html-utils",
            "label": "html-utils"
          }
        ]
      },
      {
        "type": "category",
        "label": "pdf-to-html",
        "items": [
          {
            "type": "category",
            "label": "models",
            "items": [
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/Annotation",
                "label": "Annotation"
              },
              {
                "type": "category",
                "label": "BlockType",
                "items": [
                  {
                    "type": "category",
                    "label": "Namespaces",
                    "items": [
                      {
                        "type": "doc",
                        "id": "extractor/pdf-to-html/models/BlockType/namespaces/default",
                        "label": "default"
                      }
                    ]
                  }
                ],
                "link": {
                  "type": "doc",
                  "id": "extractor/pdf-to-html/models/BlockType/index"
                }
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/HeadlineFinder",
                "label": "HeadlineFinder"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/LineConverter",
                "label": "LineConverter"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/LineItem",
                "label": "LineItem"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/LineItemBlock",
                "label": "LineItemBlock"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/Metadata",
                "label": "Metadata"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/Page",
                "label": "Page"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/PageItem",
                "label": "PageItem"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/ParsedElements",
                "label": "ParsedElements"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/ParseResult",
                "label": "ParseResult"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/StashingStream",
                "label": "StashingStream"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/TextItem",
                "label": "TextItem"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/TextItemLineGrouper",
                "label": "TextItemLineGrouper"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/models/Word",
                "label": "Word"
              }
            ]
          },
          {
            "type": "doc",
            "id": "extractor/pdf-to-html/pdf-to-html",
            "label": "pdf-to-html"
          },
          {
            "type": "category",
            "label": "transformations",
            "items": [
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/CalculateGlobalStats",
                "label": "CalculateGlobalStats"
              },
              {
                "type": "category",
                "label": "line-item-block",
                "items": [
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks",
                    "label": "DetectCodeQuoteBlocks"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item-block/DetectListLevels",
                    "label": "DetectListLevels"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item-block/GatherBlocks",
                    "label": "GatherBlocks"
                  }
                ]
              },
              {
                "type": "category",
                "label": "line-item",
                "items": [
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/CompactLines",
                    "label": "CompactLines"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/DetectHeaders",
                    "label": "DetectHeaders"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/DetectListItems",
                    "label": "DetectListItems"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/DetectTOC",
                    "label": "DetectTOC"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements",
                    "label": "RemoveRepetitiveElements"
                  },
                  {
                    "type": "doc",
                    "id": "extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal",
                    "label": "VerticalToHorizontal"
                  }
                ]
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/ToHTML",
                "label": "ToHTML"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/ToLineItemBlockTransformation",
                "label": "ToLineItemBlockTransformation"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/ToLineItemTransformation",
                "label": "ToLineItemTransformation"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/ToTextBlocks",
                "label": "ToTextBlocks"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/ToTextItemTransformation",
                "label": "ToTextItemTransformation"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/transformations/Transformation",
                "label": "Transformation"
              }
            ]
          },
          {
            "type": "category",
            "label": "util",
            "items": [
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/util/is-url-pdf",
                "label": "is-url-pdf"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/util/page-item-functions",
                "label": "page-item-functions"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/util/page-number-functions",
                "label": "page-number-functions"
              },
              {
                "type": "doc",
                "id": "extractor/pdf-to-html/util/string-functions",
                "label": "string-functions"
              }
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "url-to-content",
        "items": [
          {
            "type": "doc",
            "id": "extractor/url-to-content/docx-to-content",
            "label": "docx-to-content"
          },
          {
            "type": "doc",
            "id": "extractor/url-to-content/scrape-url",
            "label": "scrape-url"
          },
          {
            "type": "doc",
            "id": "extractor/url-to-content/url-to-content",
            "label": "url-to-content"
          },
          {
            "type": "doc",
            "id": "extractor/url-to-content/youtube-to-text",
            "label": "youtube-to-text"
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "interface",
    "items": [
      {
        "type": "doc",
        "id": "interface/highlight-code",
        "label": "highlight-code"
      },
      {
        "type": "doc",
        "id": "interface/ip-to-lang",
        "label": "ip-to-lang"
      },
      {
        "type": "doc",
        "id": "interface/youtube-embed",
        "label": "youtube-embed"
      }
    ]
  },
  {
    "type": "category",
    "label": "match",
    "items": [
      {
        "type": "doc",
        "id": "match/compare-letters",
        "label": "compare-letters"
      },
      {
        "type": "doc",
        "id": "match/match-quasar",
        "label": "match-quasar"
      },
      {
        "type": "doc",
        "id": "match/weigh-relevance-frequency",
        "label": "weigh-relevance-frequency"
      }
    ]
  },
  {
    "type": "category",
    "label": "search",
    "items": [
      {
        "type": "doc",
        "id": "search/search-engines",
        "label": "search-engines"
      },
      {
        "type": "doc",
        "id": "search/search-stream",
        "label": "search-stream"
      },
      {
        "type": "doc",
        "id": "search/search-web",
        "label": "search-web"
      },
      {
        "type": "doc",
        "id": "search/search-wikipedia",
        "label": "search-wikipedia"
      }
    ]
  },
  {
    "type": "category",
    "label": "similarity",
    "items": [
      {
        "type": "doc",
        "id": "similarity/embeddings-to-graph",
        "label": "embeddings-to-graph"
      },
      {
        "type": "doc",
        "id": "similarity/similarity-remote-api",
        "label": "similarity-remote-api"
      },
      {
        "type": "doc",
        "id": "similarity/similarity-vector",
        "label": "similarity-vector"
      },
      {
        "type": "doc",
        "id": "similarity/usearch",
        "label": "usearch"
      }
    ]
  },
  {
    "type": "category",
    "label": "tokenize",
    "items": [
      {
        "type": "doc",
        "id": "tokenize/stopwords",
        "label": "stopwords"
      },
      {
        "type": "doc",
        "id": "tokenize/suggest-complete-word",
        "label": "suggest-complete-word"
      },
      {
        "type": "doc",
        "id": "tokenize/text-to-chunks",
        "label": "text-to-chunks"
      },
      {
        "type": "doc",
        "id": "tokenize/text-to-sentences",
        "label": "text-to-sentences"
      },
      {
        "type": "doc",
        "id": "tokenize/text-to-topic-tokens",
        "label": "text-to-topic-tokens"
      },
      {
        "type": "doc",
        "id": "tokenize/word-to-root-stem",
        "label": "word-to-root-stem"
      }
    ]
  },
  {
    "type": "category",
    "label": "topics",
    "items": [
      {
        "type": "doc",
        "id": "topics/ngrams",
        "label": "ngrams"
      },
      {
        "type": "doc",
        "id": "topics/rank-sentences-keyphrases",
        "label": "rank-sentences-keyphrases"
      },
      {
        "type": "doc",
        "id": "topics/seektopic-keyphrases",
        "label": "seektopic-keyphrases"
      },
      {
        "type": "doc",
        "id": "topics/topic-distribution",
        "label": "topic-distribution"
      }
    ]
  },
  {
    "type": "category",
    "label": "train",
    "items": [
      {
        "type": "doc",
        "id": "train/neural-net",
        "label": "neural-net"
      }
    ]
  }
]};
module.exports = typedocSidebar.items;