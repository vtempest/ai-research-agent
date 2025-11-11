import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'ab6'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '3ee'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', 'e5a'),
            routes: [
              {
                path: '/docs/api/extract-content',
                component: ComponentCreator('/docs/api/extract-content', '784'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/qwksearch-api',
                component: ComponentCreator('/docs/api/qwksearch-api', '572'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/search-web',
                component: ComponentCreator('/docs/api/search-web', '4a3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/write-language',
                component: ComponentCreator('/docs/api/write-language', '2f8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/',
                component: ComponentCreator('/docs/functions/', 'c68'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/agent-prompts',
                component: ComponentCreator('/docs/functions/agents/agent-prompts', '00d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/agent-tools',
                component: ComponentCreator('/docs/functions/agents/agent-tools', '5ab'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/api2ai',
                component: ComponentCreator('/docs/functions/agents/api2ai', 'a9c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/generate-language',
                component: ComponentCreator('/docs/functions/agents/generate-language', '4eb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/language-model-names',
                component: ComponentCreator('/docs/functions/agents/language-model-names', '83e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/memory',
                component: ComponentCreator('/docs/functions/agents/memory', '864'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-author',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-author', '30c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-cite',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-cite', '0a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/', 'f38'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-extractors',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-extractors', '0ec'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-validators',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-validators', 'bdb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick', '848'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-source',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-source', 'fa6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-title',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-title', 'd39'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/human-names-recognize',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/human-names-recognize', '4e2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/metadata-to-cite',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/metadata-to-cite', 'a01'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/url-to-domain',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/url-to-domain', 'ce5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/', 'a54'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury', '610'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils', '16a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-readability',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-readability', '3fd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-basic-html',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-basic-html', '805'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-utils',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-utils', '4a7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/', 'ad7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Annotation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Annotation', '1fb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType/',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType/', '986'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default', 'a30'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/HeadlineFinder',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/HeadlineFinder', '599'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineConverter',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineConverter', '882'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItem', '1b8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItemBlock',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItemBlock', 'de3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Page',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Page', '444'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/PageItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/PageItem', 'dc1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParsedElements',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParsedElements', 'fb0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParseResult',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParseResult', 'acf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/StashingStream',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/StashingStream', 'd66'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItem', '6a2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper', 'c8e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Word',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Word', '1e0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats', '0d5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks', '9a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels', '8a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks', '262'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines', 'f92'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders', 'da5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems', 'ee6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC', '139'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements', 'd06'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal', '7d9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToHTML',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToHTML', '93a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation', 'e5c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation', 'fc7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks', 'afe'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation', '5ee'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/Transformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/Transformation', 'b56'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/is-url-pdf',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/is-url-pdf', '84c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-item-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-item-functions', '463'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-number-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-number-functions', 'e52'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/string-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/string-functions', 'daa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/', 'dcb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/docx-to-content',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/docx-to-content', 'b56'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-html',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-html', '7c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/youtube-to-text',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/youtube-to-text', 'd8c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/index-1',
                component: ComponentCreator('/docs/functions/index-1', '0c1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/highlight-code',
                component: ComponentCreator('/docs/functions/interface/highlight-code', '30e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/youtube-embed',
                component: ComponentCreator('/docs/functions/interface/youtube-embed', '350'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/compare-letters',
                component: ComponentCreator('/docs/functions/match/compare-letters', 'b68'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/match-quasar',
                component: ComponentCreator('/docs/functions/match/match-quasar', '17c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/weigh-relevance-frequency',
                component: ComponentCreator('/docs/functions/match/weigh-relevance-frequency', 'f68'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/modules',
                component: ComponentCreator('/docs/functions/modules', 'cc9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-engines',
                component: ComponentCreator('/docs/functions/search/search-engines', '233'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-stream',
                component: ComponentCreator('/docs/functions/search/search-stream', 'db1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-web',
                component: ComponentCreator('/docs/functions/search/search-web', '0c9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-wikipedia',
                component: ComponentCreator('/docs/functions/search/search-wikipedia', '4cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/similarity/similarity-remote-api',
                component: ComponentCreator('/docs/functions/similarity/similarity-remote-api', '7f4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/stopwords',
                component: ComponentCreator('/docs/functions/tokenize/stopwords', '4e9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/suggest-complete-word',
                component: ComponentCreator('/docs/functions/tokenize/suggest-complete-word', 'e6f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-chunks',
                component: ComponentCreator('/docs/functions/tokenize/text-to-chunks', 'bf6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-sentences',
                component: ComponentCreator('/docs/functions/tokenize/text-to-sentences', '70b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-topic-tokens',
                component: ComponentCreator('/docs/functions/tokenize/text-to-topic-tokens', '75c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/word-to-root-stem',
                component: ComponentCreator('/docs/functions/tokenize/word-to-root-stem', 'ae9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/ngrams',
                component: ComponentCreator('/docs/functions/topics/ngrams', '38b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/rank-sentences-keyphrases',
                component: ComponentCreator('/docs/functions/topics/rank-sentences-keyphrases', '19f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/seektopic-keyphrases',
                component: ComponentCreator('/docs/functions/topics/seektopic-keyphrases', '5be'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/topic-distribution',
                component: ComponentCreator('/docs/functions/topics/topic-distribution', 'bbc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/types',
                component: ComponentCreator('/docs/functions/types', '421'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/',
                component: ComponentCreator('/docs/neural-net/', 'f95'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/index-1',
                component: ComponentCreator('/docs/neural-net/index-1', 'f19'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/modules',
                component: ComponentCreator('/docs/neural-net/modules', '93e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/neural-net-tensors/neural-net-gpu',
                component: ComponentCreator('/docs/neural-net/neural-net-tensors/neural-net-gpu', '8f1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/neural-net-tensors/neural-net-tf',
                component: ComponentCreator('/docs/neural-net/neural-net-tensors/neural-net-tf', '182'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/next-word-prediction/scripts/predict-next-word',
                component: ComponentCreator('/docs/neural-net/next-word-prediction/scripts/predict-next-word', 'c9b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/statistics/predict-statistics',
                component: ComponentCreator('/docs/neural-net/statistics/predict-statistics', 'af0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/vectorize/similarity-remote-api',
                component: ComponentCreator('/docs/neural-net/vectorize/similarity-remote-api', 'c80'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/vectorize/similarity-vector',
                component: ComponentCreator('/docs/neural-net/vectorize/similarity-vector', '530'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/neural-net/vectorize/usearch',
                component: ComponentCreator('/docs/neural-net/vectorize/usearch', '683'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/',
                component: ComponentCreator('/docs/web/', 'cd2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/AppLayout/auth-google-one-tap',
                component: ComponentCreator('/docs/web/components/AppLayout/auth-google-one-tap', 'b50'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/AppLayout/sound-effects',
                component: ComponentCreator('/docs/web/components/AppLayout/sound-effects', '2b4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/docx/docx-to-html',
                component: ComponentCreator('/docs/web/components/Editor/docx/docx-to-html', 'b8d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/docx/docx-tokens',
                component: ComponentCreator('/docs/web/components/Editor/docx/docx-tokens', 'c02'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/docx/parse-cards',
                component: ComponentCreator('/docs/web/components/Editor/docx/parse-cards', 'f77'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/docx/parse-debate-docx',
                component: ComponentCreator('/docs/web/components/Editor/docx/parse-debate-docx', '6d4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/docx/parse-zip-folder',
                component: ComponentCreator('/docs/web/components/Editor/docx/parse-zip-folder', 'fc1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/storage/files-api-frontend',
                component: ComponentCreator('/docs/web/components/Editor/storage/files-api-frontend', 'ed3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/storage/local-storage-api',
                component: ComponentCreator('/docs/web/components/Editor/storage/local-storage-api', '741'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/Editor/storage/seed-test-data',
                component: ComponentCreator('/docs/web/components/Editor/storage/seed-test-data', 'cb7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/icons',
                component: ComponentCreator('/docs/web/components/icons', '80e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/icons-1',
                component: ComponentCreator('/docs/web/components/icons-1', '137'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/ReadMode/auto-highlight',
                component: ComponentCreator('/docs/web/components/ReadMode/auto-highlight', 'd32'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/ReadMode/read-mode-view',
                component: ComponentCreator('/docs/web/components/ReadMode/read-mode-view', '190'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/SearchWeb/categories',
                component: ComponentCreator('/docs/web/components/SearchWeb/categories', '18f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/SearchWeb/extras/get-weather',
                component: ComponentCreator('/docs/web/components/SearchWeb/extras/get-weather', 'ba2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/SearchWeb/extras/home-extras',
                component: ComponentCreator('/docs/web/components/SearchWeb/extras/home-extras', '05a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/SearchWeb/extras/QuantumSphere',
                component: ComponentCreator('/docs/web/components/SearchWeb/extras/QuantumSphere', 'eb3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/ShortcutSearch/shortcut-search',
                component: ComponentCreator('/docs/web/components/ShortcutSearch/shortcut-search', '68c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/ShortcutSearch/shortcut-search-web',
                component: ComponentCreator('/docs/web/components/ShortcutSearch/shortcut-search-web', 'd1e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/TabManager/find-in-tab-content',
                component: ComponentCreator('/docs/web/components/TabManager/find-in-tab-content', '893'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/utils',
                component: ComponentCreator('/docs/web/components/utils', 'a2b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/utils-1',
                component: ComponentCreator('/docs/web/components/utils-1', 'c4b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/components/utils/auth-client',
                component: ComponentCreator('/docs/web/components/utils/auth-client', '270'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/customize-site',
                component: ComponentCreator('/docs/web/customize-site', 'a53'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/modules',
                component: ComponentCreator('/docs/web/modules', '078'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server',
                component: ComponentCreator('/docs/web/server', 'b37'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server-1',
                component: ComponentCreator('/docs/web/server-1', '503'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/auth',
                component: ComponentCreator('/docs/web/server/auth', 'e64'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/drizzle.config',
                component: ComponentCreator('/docs/web/server/drizzle.config', '175'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/email',
                component: ComponentCreator('/docs/web/server/email', '771'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/ratelimits',
                component: ComponentCreator('/docs/web/server/ratelimits', '4f5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/schema',
                component: ComponentCreator('/docs/web/server/schema', '0bd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/types',
                component: ComponentCreator('/docs/web/server/types', 'b3d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/users',
                component: ComponentCreator('/docs/web/server/users', 'ff6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/server/validations',
                component: ComponentCreator('/docs/web/server/validations', '388'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '6b3'),
                exact: true,
                sidebar: "default"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
