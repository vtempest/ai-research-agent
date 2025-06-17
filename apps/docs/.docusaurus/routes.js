import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', 'fa7'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '476'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '337'),
            routes: [
              {
                path: '/api/extract-content',
                component: ComponentCreator('/api/extract-content', '592'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/api/qwksearch-api',
                component: ComponentCreator('/api/qwksearch-api', '4c1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/api/search-web',
                component: ComponentCreator('/api/search-web', 'fb6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/api/write-language',
                component: ComponentCreator('/api/write-language', 'c87'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/category/qwksearch-api',
                component: ComponentCreator('/category/qwksearch-api', 'b43'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/category/qwksearch-api',
                component: ComponentCreator('/category/qwksearch-api', '1c3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/category/qwksearch-api',
                component: ComponentCreator('/category/qwksearch-api', '19c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/category/qwksearch-api',
                component: ComponentCreator('/category/qwksearch-api', 'a5b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/category/qwksearch-api',
                component: ComponentCreator('/category/qwksearch-api', 'a57'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/functions/',
                component: ComponentCreator('/functions/', '989'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/',
                component: ComponentCreator('/functions/', '2c4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/agents/agent-prompts',
                component: ComponentCreator('/functions/agents/agent-prompts', '51c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/agents/agent-tools',
                component: ComponentCreator('/functions/agents/agent-tools', 'd66'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/agents/api2ai',
                component: ComponentCreator('/functions/agents/api2ai', 'c84'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/agents/language-model-names',
                component: ComponentCreator('/functions/agents/language-model-names', 'dc4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/agents/reply-language',
                component: ComponentCreator('/functions/agents/reply-language', '97d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-author',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-author', '813'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-cite',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-cite', '1f0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-date/',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-date/', '6fd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-date/date-extractors',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-date/date-extractors', 'dd5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-date/date-validators',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-date/date-validators', '1ec'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-date/extract-date-quick',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-date/extract-date-quick', 'b2d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-source',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-source', '001'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/extract-title',
                component: ComponentCreator('/functions/extractor/html-to-cite/extract-title', 'd0a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/human-names-recognize',
                component: ComponentCreator('/functions/extractor/html-to-cite/human-names-recognize', 'ff6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/metadata-to-cite',
                component: ComponentCreator('/functions/extractor/html-to-cite/metadata-to-cite', '410'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-cite/url-to-domain',
                component: ComponentCreator('/functions/extractor/html-to-cite/url-to-domain', 'e74'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/',
                component: ComponentCreator('/functions/extractor/html-to-content/', '7ba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/extract-content/extract-content-mercury',
                component: ComponentCreator('/functions/extractor/html-to-content/extract-content/extract-content-mercury', '503'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils',
                component: ComponentCreator('/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils', 'd97'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/extract-content/extract-content-readability',
                component: ComponentCreator('/functions/extractor/html-to-content/extract-content/extract-content-readability', 'ac1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/html-to-basic-html',
                component: ComponentCreator('/functions/extractor/html-to-content/html-to-basic-html', 'aaa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/html-to-content/html-utils',
                component: ComponentCreator('/functions/extractor/html-to-content/html-utils', 'a4a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/',
                component: ComponentCreator('/functions/extractor/pdf-to-html/', '35a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/Annotation',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/Annotation', '455'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/BlockType/',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/BlockType/', '463'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/BlockType/namespaces/default',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/BlockType/namespaces/default', '9f1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/HeadlineFinder',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/HeadlineFinder', '359'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/LineConverter',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/LineConverter', '158'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/LineItem',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/LineItem', '01c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/LineItemBlock',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/LineItemBlock', 'd47'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/Page',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/Page', '2f7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/PageItem',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/PageItem', 'd66'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/ParsedElements',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/ParsedElements', 'a0f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/ParseResult',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/ParseResult', 'fd7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/StashingStream',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/StashingStream', '6ec'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/TextItem',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/TextItem', 'ca3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/TextItemLineGrouper',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/TextItemLineGrouper', 'c7d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/models/Word',
                component: ComponentCreator('/functions/extractor/pdf-to-html/models/Word', 'ee7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats', '1cc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks', '785'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels', 'd34'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks', 'b36'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/CompactLines',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/CompactLines', '310'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders', 'b59'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems', '73b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC', '618'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements', '48a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal', 'c28'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/ToHTML',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/ToHTML', '86e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation', '693'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation', '686'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/ToTextBlocks',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/ToTextBlocks', '40d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation', '733'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/transformations/Transformation',
                component: ComponentCreator('/functions/extractor/pdf-to-html/transformations/Transformation', 'c88'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/util/is-url-pdf',
                component: ComponentCreator('/functions/extractor/pdf-to-html/util/is-url-pdf', 'c47'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/util/page-item-functions',
                component: ComponentCreator('/functions/extractor/pdf-to-html/util/page-item-functions', '0b5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/util/page-number-functions',
                component: ComponentCreator('/functions/extractor/pdf-to-html/util/page-number-functions', '309'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/pdf-to-html/util/string-functions',
                component: ComponentCreator('/functions/extractor/pdf-to-html/util/string-functions', '73f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/url-to-content/',
                component: ComponentCreator('/functions/extractor/url-to-content/', 'c2d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/url-to-content/docx-to-content',
                component: ComponentCreator('/functions/extractor/url-to-content/docx-to-content', 'f2a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/url-to-content/url-to-html',
                component: ComponentCreator('/functions/extractor/url-to-content/url-to-html', '82d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/extractor/url-to-content/youtube-to-text',
                component: ComponentCreator('/functions/extractor/url-to-content/youtube-to-text', '8d2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/interface/highlight-code',
                component: ComponentCreator('/functions/interface/highlight-code', '432'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/interface/youtube-embed',
                component: ComponentCreator('/functions/interface/youtube-embed', '612'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/match/compare-letters',
                component: ComponentCreator('/functions/match/compare-letters', '1a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/match/match-quasar',
                component: ComponentCreator('/functions/match/match-quasar', 'e3e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/match/weigh-relevance-frequency',
                component: ComponentCreator('/functions/match/weigh-relevance-frequency', '4bc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/search/search-engines',
                component: ComponentCreator('/functions/search/search-engines', '040'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/search/search-stream',
                component: ComponentCreator('/functions/search/search-stream', '8be'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/search/search-web',
                component: ComponentCreator('/functions/search/search-web', '892'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/search/search-wikipedia',
                component: ComponentCreator('/functions/search/search-wikipedia', 'acd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/similarity/similarity-remote-api',
                component: ComponentCreator('/functions/similarity/similarity-remote-api', 'd05'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/stopwords',
                component: ComponentCreator('/functions/tokenize/stopwords', '00a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/suggest-complete-word',
                component: ComponentCreator('/functions/tokenize/suggest-complete-word', 'f71'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/text-to-chunks',
                component: ComponentCreator('/functions/tokenize/text-to-chunks', 'f78'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/text-to-sentences',
                component: ComponentCreator('/functions/tokenize/text-to-sentences', '4c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/text-to-topic-tokens',
                component: ComponentCreator('/functions/tokenize/text-to-topic-tokens', '28b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/tokenize/word-to-root-stem',
                component: ComponentCreator('/functions/tokenize/word-to-root-stem', 'c12'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/topics/ngrams',
                component: ComponentCreator('/functions/topics/ngrams', '2d3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/topics/rank-sentences-keyphrases',
                component: ComponentCreator('/functions/topics/rank-sentences-keyphrases', 'd74'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/topics/seektopic-keyphrases',
                component: ComponentCreator('/functions/topics/seektopic-keyphrases', 'b7a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/topics/topic-distribution',
                component: ComponentCreator('/functions/topics/topic-distribution', 'd03'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/functions/types',
                component: ComponentCreator('/functions/types', 'd0b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/',
                component: ComponentCreator('/web/', '7fc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/global',
                component: ComponentCreator('/web/global', 'fac'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/hooks.server',
                component: ComponentCreator('/web/hooks.server', 'cec'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/auth-client',
                component: ComponentCreator('/web/lib/auth-client', '934'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/auth-google-one-tap',
                component: ComponentCreator('/web/lib/components/AppLayout/auth-google-one-tap', '141'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/sound-effects',
                component: ComponentCreator('/web/lib/components/AppLayout/sound-effects', 'ed2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-to-html',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-to-html', '295'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-tokens',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-tokens', '2d3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-cards',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-cards', 'b57'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-debate-docx',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-debate-docx', '047'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-zip-folder',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-zip-folder', 'fc3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/files-api-frontend',
                component: ComponentCreator('/web/lib/components/Editor/storage/files-api-frontend', 'e6d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/local-storage-api',
                component: ComponentCreator('/web/lib/components/Editor/storage/local-storage-api', '711'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/seed-test-data',
                component: ComponentCreator('/web/lib/components/Editor/storage/seed-test-data', '350'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/icons',
                component: ComponentCreator('/web/lib/components/icons', '154'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/icons-1',
                component: ComponentCreator('/web/lib/components/icons-1', '3bb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/auto-highlight',
                component: ComponentCreator('/web/lib/components/ReadMode/auto-highlight', 'f65'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/read-mode-view',
                component: ComponentCreator('/web/lib/components/ReadMode/read-mode-view', '1ba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/categories',
                component: ComponentCreator('/web/lib/components/SearchWeb/categories', '449'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/get-weather',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/get-weather', '82f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/home-extras',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/home-extras', 'e6d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/QuantumSphere',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/QuantumSphere', '043'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search', '70d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search-web',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-web', '315'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/TabManager/find-in-tab-content',
                component: ComponentCreator('/web/lib/components/TabManager/find-in-tab-content', 'b84'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert',
                component: ComponentCreator('/web/lib/components/ui/alert', '509'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-1',
                component: ComponentCreator('/web/lib/components/ui/alert-1', '574'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-dialog',
                component: ComponentCreator('/web/lib/components/ui/alert-dialog', 'ca4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-dialog-1',
                component: ComponentCreator('/web/lib/components/ui/alert-dialog-1', '687'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/avatar',
                component: ComponentCreator('/web/lib/components/ui/avatar', '11a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/avatar-1',
                component: ComponentCreator('/web/lib/components/ui/avatar-1', '9a7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/badge',
                component: ComponentCreator('/web/lib/components/ui/badge', 'e0e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/badge-1',
                component: ComponentCreator('/web/lib/components/ui/badge-1', '3d8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/breadcrumb',
                component: ComponentCreator('/web/lib/components/ui/breadcrumb', 'ea0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/breadcrumb-1',
                component: ComponentCreator('/web/lib/components/ui/breadcrumb-1', '076'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/button',
                component: ComponentCreator('/web/lib/components/ui/button', 'ddf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/button-1',
                component: ComponentCreator('/web/lib/components/ui/button-1', '5af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/card',
                component: ComponentCreator('/web/lib/components/ui/card', 'a6f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/card-1',
                component: ComponentCreator('/web/lib/components/ui/card-1', '0eb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/checkbox',
                component: ComponentCreator('/web/lib/components/ui/checkbox', 'd64'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/checkbox-1',
                component: ComponentCreator('/web/lib/components/ui/checkbox-1', '9f6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/collapsible',
                component: ComponentCreator('/web/lib/components/ui/collapsible', 'bd8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/collapsible-1',
                component: ComponentCreator('/web/lib/components/ui/collapsible-1', '1dd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/command',
                component: ComponentCreator('/web/lib/components/ui/command', '220'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/command-1',
                component: ComponentCreator('/web/lib/components/ui/command-1', '38d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dialog',
                component: ComponentCreator('/web/lib/components/ui/dialog', '4f2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dialog-1',
                component: ComponentCreator('/web/lib/components/ui/dialog-1', '82c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dropdown-menu',
                component: ComponentCreator('/web/lib/components/ui/dropdown-menu', 'f25'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dropdown-menu-1',
                component: ComponentCreator('/web/lib/components/ui/dropdown-menu-1', '79a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/form',
                component: ComponentCreator('/web/lib/components/ui/form', 'f91'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/form-1',
                component: ComponentCreator('/web/lib/components/ui/form-1', '8be'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/input',
                component: ComponentCreator('/web/lib/components/ui/input', '5f0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/input-1',
                component: ComponentCreator('/web/lib/components/ui/input-1', '7c7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/label',
                component: ComponentCreator('/web/lib/components/ui/label', '8f6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/label-1',
                component: ComponentCreator('/web/lib/components/ui/label-1', '62e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/menubar',
                component: ComponentCreator('/web/lib/components/ui/menubar', '895'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/menubar-1',
                component: ComponentCreator('/web/lib/components/ui/menubar-1', 'c22'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/pagination',
                component: ComponentCreator('/web/lib/components/ui/pagination', '30e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/pagination-1',
                component: ComponentCreator('/web/lib/components/ui/pagination-1', '535'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/popover',
                component: ComponentCreator('/web/lib/components/ui/popover', '4ca'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/popover-1',
                component: ComponentCreator('/web/lib/components/ui/popover-1', 'dd9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/progress',
                component: ComponentCreator('/web/lib/components/ui/progress', '1cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/progress-1',
                component: ComponentCreator('/web/lib/components/ui/progress-1', '606'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/select',
                component: ComponentCreator('/web/lib/components/ui/select', '8c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/select-1',
                component: ComponentCreator('/web/lib/components/ui/select-1', '10f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/separator',
                component: ComponentCreator('/web/lib/components/ui/separator', '090'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/separator-1',
                component: ComponentCreator('/web/lib/components/ui/separator-1', 'af0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sheet',
                component: ComponentCreator('/web/lib/components/ui/sheet', '040'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sheet-1',
                component: ComponentCreator('/web/lib/components/ui/sheet-1', '1b7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar',
                component: ComponentCreator('/web/lib/components/ui/sidebar', '2ea'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar-1',
                component: ComponentCreator('/web/lib/components/ui/sidebar-1', '35e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/constants',
                component: ComponentCreator('/web/lib/components/ui/sidebar/constants', '84e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/context.svelte',
                component: ComponentCreator('/web/lib/components/ui/sidebar/context.svelte', '098'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/skeleton',
                component: ComponentCreator('/web/lib/components/ui/skeleton', '7d5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/skeleton-1',
                component: ComponentCreator('/web/lib/components/ui/skeleton-1', 'a5e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/slider',
                component: ComponentCreator('/web/lib/components/ui/slider', '8cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/slider-1',
                component: ComponentCreator('/web/lib/components/ui/slider-1', 'a6f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sonner',
                component: ComponentCreator('/web/lib/components/ui/sonner', '96f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sonner-1',
                component: ComponentCreator('/web/lib/components/ui/sonner-1', '6cd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/switch',
                component: ComponentCreator('/web/lib/components/ui/switch', '175'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/switch-1',
                component: ComponentCreator('/web/lib/components/ui/switch-1', 'c59'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/table',
                component: ComponentCreator('/web/lib/components/ui/table', 'd2b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/table-1',
                component: ComponentCreator('/web/lib/components/ui/table-1', '159'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tabs',
                component: ComponentCreator('/web/lib/components/ui/tabs', '57a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tabs-1',
                component: ComponentCreator('/web/lib/components/ui/tabs-1', '6e9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/textarea',
                component: ComponentCreator('/web/lib/components/ui/textarea', '9a1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/textarea-1',
                component: ComponentCreator('/web/lib/components/ui/textarea-1', '9a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tooltip',
                component: ComponentCreator('/web/lib/components/ui/tooltip', '6b3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tooltip-1',
                component: ComponentCreator('/web/lib/components/ui/tooltip-1', '1fc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/customize-site',
                component: ComponentCreator('/web/lib/customize-site', '7ae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server',
                component: ComponentCreator('/web/lib/server', 'c99'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server-1',
                component: ComponentCreator('/web/lib/server-1', 'eda'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/auth',
                component: ComponentCreator('/web/lib/server/auth', '567'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/drizzle.config',
                component: ComponentCreator('/web/lib/server/drizzle.config', 'ac7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/email',
                component: ComponentCreator('/web/lib/server/email', '784'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/ratelimits',
                component: ComponentCreator('/web/lib/server/ratelimits', '382'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/schema',
                component: ComponentCreator('/web/lib/server/schema', '821'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/types',
                component: ComponentCreator('/web/lib/server/types', '924'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/users',
                component: ComponentCreator('/web/lib/server/users', '056'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/validations',
                component: ComponentCreator('/web/lib/server/validations', '7dc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/utils',
                component: ComponentCreator('/web/lib/utils', 'b10'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/+layout',
                component: ComponentCreator('/web/routes/+layout', 'a70'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/agents/+server',
                component: ComponentCreator('/web/routes/api/agents/+server', 'c76'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/chats/+server',
                component: ComponentCreator('/web/routes/api/chats/+server', '44e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/extract/+server',
                component: ComponentCreator('/web/routes/api/extract/+server', 'ee2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/[fileId]/+server',
                component: ComponentCreator('/web/routes/api/files/[fileId]/+server', 'b20'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/+server',
                component: ComponentCreator('/web/routes/api/files/+server', '060'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/model/+server',
                component: ComponentCreator('/web/routes/api/model/+server', 'a13'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/search/+server',
                component: ComponentCreator('/web/routes/api/search/+server', '1d8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/subscriptions/+server',
                component: ComponentCreator('/web/routes/api/subscriptions/+server', '10a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/user/+server',
                component: ComponentCreator('/web/routes/api/user/+server', '739'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/vectorize/+server',
                component: ComponentCreator('/web/routes/api/vectorize/+server', '1ad'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+layout',
                component: ComponentCreator('/web/routes/settings/+layout', '86d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+layout.server',
                component: ComponentCreator('/web/routes/settings/+layout.server', 'add'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+page.server',
                component: ComponentCreator('/web/routes/settings/+page.server', 'bba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'b49'),
                exact: true,
                sidebar: "functions"
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
