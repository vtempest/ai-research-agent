import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'e8a'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '1ab'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', '99d'),
            routes: [
              {
                path: '/docs/api/extract-structured-content-and-cite-from-any-url',
                component: ComponentCreator('/docs/api/extract-structured-content-and-cite-from-any-url', 'f7d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/generate-language-model-reply-using-agent-prompts',
                component: ComponentCreator('/docs/api/generate-language-model-reply-using-agent-prompts', '032'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/qwksearch-api',
                component: ComponentCreator('/docs/api/qwksearch-api', '847'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/search-the-web',
                component: ComponentCreator('/docs/api/search-the-web', 'fc3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/category/qwksearch-api',
                component: ComponentCreator('/docs/category/qwksearch-api', '5a9'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qwksearch-api',
                component: ComponentCreator('/docs/category/qwksearch-api', '1c3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qwksearch-api',
                component: ComponentCreator('/docs/category/qwksearch-api', '19c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qwksearch-api',
                component: ComponentCreator('/docs/category/qwksearch-api', 'a5b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/category/qwksearch-api',
                component: ComponentCreator('/docs/category/qwksearch-api', 'a57'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/docs/functions/',
                component: ComponentCreator('/docs/functions/', 'fbc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/agent-prompts',
                component: ComponentCreator('/docs/functions/agents/agent-prompts', 'd74'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/agent-prompts-1',
                component: ComponentCreator('/docs/functions/agents/agent-prompts-1', 'ff1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/language-model-names',
                component: ComponentCreator('/docs/functions/agents/language-model-names', 'fd1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/language-model-names-1',
                component: ComponentCreator('/docs/functions/agents/language-model-names-1', 'a4a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/reply-language',
                component: ComponentCreator('/docs/functions/agents/reply-language', '481'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/agents/reply-language-1',
                component: ComponentCreator('/docs/functions/agents/reply-language-1', '7e2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-author',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-author', '39a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-author-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-author-1', 'df0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-author-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-author-2', '2c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-cite',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-cite', 'e80'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-cite-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-cite-1', '6f9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-cite-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-cite-2', 'e01'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/', '509'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-extractors',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-extractors', '1a1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-extractors-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-extractors-1', 'a14'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-extractors-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-extractors-2', '9af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-extractors-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-extractors-3', 'c88'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-validators',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-validators', 'b9b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-validators-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-validators-1', 'cb5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-validators-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-validators-2', 'b6b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/date-validators-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/date-validators-3', '8f3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-1', 'd70'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-2', '7ae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-3', 'e48'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick', '596'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-1', 'ab2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-2', '13c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-date/extract-date-quick-3', '34e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-source',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-source', 'cb8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-source-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-source-1', '184'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-source-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-source-2', '667'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-title',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-title', 'f00'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-title-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-title-1', '180'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/extract-title-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/extract-title-2', 'fda'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/human-names-recognize',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/human-names-recognize', '09a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/human-names-recognize-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/human-names-recognize-1', 'e27'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/human-names-recognize-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/human-names-recognize-2', '68e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/metadata-to-cite',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/metadata-to-cite', 'e19'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/metadata-to-cite-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/metadata-to-cite-1', '1d7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/metadata-to-cite-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/metadata-to-cite-2', 'e1c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/url-to-domain',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/url-to-domain', '975'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/url-to-domain-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/url-to-domain-1', '410'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-cite/url-to-domain-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-cite/url-to-domain-2', 'ce7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/', 'c65'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury', '6de'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-1', '625'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-2', '45b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-3', 'b93'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils', 'cba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-1', '7f0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-2', 'a1c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-mercury-utils-3', '5c4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-readability',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-readability', '5b1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-1', 'b45'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-2', '630'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-3',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/extract-content/extract-content-readability-3', 'e83'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-basic-html',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-basic-html', '4f7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-basic-html-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-basic-html-1', 'a1a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-basic-html-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-basic-html-2', 'b12'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-content-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-content-1', 'add'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-to-content-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-to-content-2', '708'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-utils',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-utils', '526'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-utils-1',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-utils-1', '874'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/html-to-content/html-utils-2',
                component: ComponentCreator('/docs/functions/extractor/html-to-content/html-utils-2', 'b2b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/', 'f20'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Annotation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Annotation', 'cb0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Annotation-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Annotation-1', 'bc0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Annotation-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Annotation-2', 'cc4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Annotation-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Annotation-3', 'b3b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType', 'b66'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType-1', '915'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType-2', '0f9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType/',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType/', 'b57'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/BlockType/namespaces/default', 'bc8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/HeadlineFinder',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/HeadlineFinder', '98f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-1', '253'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-2', '455'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/HeadlineFinder-3', 'f02'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineConverter',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineConverter', 'ed3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineConverter-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineConverter-1', '94b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineConverter-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineConverter-2', 'f7d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineConverter-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineConverter-3', '78b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItem', 'e1b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItem-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItem-1', 'ffd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItem-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItem-2', '4f2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItem-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItem-3', 'd34'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItemBlock',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItemBlock', '139'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItemBlock-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItemBlock-1', '6f8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItemBlock-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItemBlock-2', '076'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/LineItemBlock-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/LineItemBlock-3', '5df'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Page',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Page', 'b48'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Page-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Page-1', 'e89'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Page-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Page-2', '4ed'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Page-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Page-3', '92a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/PageItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/PageItem', '6cf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/PageItem-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/PageItem-1', '28c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/PageItem-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/PageItem-2', 'f6a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/PageItem-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/PageItem-3', '452'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParsedElements',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParsedElements', '0af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParsedElements-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParsedElements-1', 'f87'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParsedElements-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParsedElements-2', 'fa2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParsedElements-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParsedElements-3', '6c7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParseResult',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParseResult', '77b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParseResult-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParseResult-1', '3b3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParseResult-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParseResult-2', '5bf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/ParseResult-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/ParseResult-3', 'fb1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/StashingStream',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/StashingStream', '834'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/StashingStream-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/StashingStream-1', '76d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/StashingStream-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/StashingStream-2', '667'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/StashingStream-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/StashingStream-3', '3cd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItem',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItem', 'f25'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItem-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItem-1', 'a0e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItem-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItem-2', '2ad'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItem-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItem-3', 'c1a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper', '2b6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-1', 'f38'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-2', '208'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/TextItemLineGrouper-3', '5be'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Word',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Word', 'e25'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Word-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Word-1', '2a7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Word-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Word-2', '669'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/models/Word-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/models/Word-3', 'dbd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/pdf-to-html-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/pdf-to-html-1', 'ced'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/pdf-to-html-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/pdf-to-html-2', 'dbd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats', 'cae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-1', '5a4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-2', '5cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/CalculateGlobalStats-3', '0dc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks', '921'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-1', '2c5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-2', '242'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-3', '514'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks-4', 'f56'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels', '650'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-1', '529'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-2', 'b53'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-3', 'fff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/DetectListLevels-4', '7a7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks', '8f3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-1', '3ea'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-2', 'fa4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-3', '010'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks-4', '687'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines', 'cb4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-1', '916'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-2', '1f2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-3', 'f77'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/CompactLines-4', 'c2b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders', 'c42'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-1', 'f2d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-2', '3e7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-3', '3d7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectHeaders-4', '70a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems', 'e11'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-1', '112'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-2', 'e04'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-3', '8b8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectListItems-4', 'eaf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC', '058'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-1', '4de'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-2', '639'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-3', '95b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/DetectTOC-4', '339'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements', '6bf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-1', 'd35'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-2', '07b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-3', '82e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements-4', '9eb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal', 'c7f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-1', '145'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-2', '9ee'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-3', '027'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-4',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal-4', '6e1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToHTML',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToHTML', '54e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToHTML-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToHTML-1', 'ab8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToHTML-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToHTML-2', '19e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToHTML-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToHTML-3', 'c87'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation', '514'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-1', '9a5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-2', '761'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation-3', 'e3d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation', 'dba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-1', '5bc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-2', '9c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToLineItemTransformation-3', '5c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks', 'b74'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-1', '5ac'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-2', '3d8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextBlocks-3', '99b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation', '04f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-1', '742'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-2', '0dd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/ToTextItemTransformation-3', '0ae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/Transformation',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/Transformation', '529'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/Transformation-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/Transformation-1', '2fa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/Transformation-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/Transformation-2', 'c7e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/transformations/Transformation-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/transformations/Transformation-3', '0cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/is-url-pdf',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/is-url-pdf', '5bb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/is-url-pdf-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/is-url-pdf-1', 'a65'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/is-url-pdf-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/is-url-pdf-2', '14f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/is-url-pdf-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/is-url-pdf-3', '37b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-item-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-item-functions', '6db'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-item-functions-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-item-functions-1', 'fef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-item-functions-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-item-functions-2', '951'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-item-functions-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-item-functions-3', 'a56'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-number-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-number-functions', 'e15'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-number-functions-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-number-functions-1', 'fd2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-number-functions-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-number-functions-2', 'f4d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/page-number-functions-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/page-number-functions-3', '1dc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/string-functions',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/string-functions', 'fbb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/string-functions-1',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/string-functions-1', '481'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/string-functions-2',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/string-functions-2', '180'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/pdf-to-html/util/string-functions-3',
                component: ComponentCreator('/docs/functions/extractor/pdf-to-html/util/string-functions-3', '067'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/', '5d1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/docx-to-content',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/docx-to-content', '0a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/docx-to-content-1',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/docx-to-content-1', 'd90'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/docx-to-content-2',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/docx-to-content-2', '54f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-content-1',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-content-1', '9cd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-content-2',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-content-2', 'bc0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-html',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-html', '6b3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-html-1',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-html-1', 'c8b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/url-to-html-2',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/url-to-html-2', '9b0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/youtube-to-text',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/youtube-to-text', 'd86'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/youtube-to-text-1',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/youtube-to-text-1', '037'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/extractor/url-to-content/youtube-to-text-2',
                component: ComponentCreator('/docs/functions/extractor/url-to-content/youtube-to-text-2', 'def'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/highlight-code',
                component: ComponentCreator('/docs/functions/interface/highlight-code', '7c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/highlight-code-1',
                component: ComponentCreator('/docs/functions/interface/highlight-code-1', '01b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/youtube-embed',
                component: ComponentCreator('/docs/functions/interface/youtube-embed', 'd79'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/interface/youtube-embed-1',
                component: ComponentCreator('/docs/functions/interface/youtube-embed-1', '972'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/compare-letters',
                component: ComponentCreator('/docs/functions/match/compare-letters', '94a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/compare-letters-1',
                component: ComponentCreator('/docs/functions/match/compare-letters-1', '1ff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/match-quasar',
                component: ComponentCreator('/docs/functions/match/match-quasar', 'bd4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/match-quasar-1',
                component: ComponentCreator('/docs/functions/match/match-quasar-1', 'e88'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/weigh-relevance-frequency',
                component: ComponentCreator('/docs/functions/match/weigh-relevance-frequency', 'c5e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/match/weigh-relevance-frequency-1',
                component: ComponentCreator('/docs/functions/match/weigh-relevance-frequency-1', 'a68'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/modules',
                component: ComponentCreator('/docs/functions/modules', 'ef5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-engines',
                component: ComponentCreator('/docs/functions/search/search-engines', '02a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-engines-1',
                component: ComponentCreator('/docs/functions/search/search-engines-1', 'c49'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-stream',
                component: ComponentCreator('/docs/functions/search/search-stream', '75d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-stream-1',
                component: ComponentCreator('/docs/functions/search/search-stream-1', '1f4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-web',
                component: ComponentCreator('/docs/functions/search/search-web', 'ddc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-web-1',
                component: ComponentCreator('/docs/functions/search/search-web-1', '95c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-wikipedia',
                component: ComponentCreator('/docs/functions/search/search-wikipedia', '938'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/search/search-wikipedia-1',
                component: ComponentCreator('/docs/functions/search/search-wikipedia-1', 'aa1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/similarity/similarity-remote-api',
                component: ComponentCreator('/docs/functions/similarity/similarity-remote-api', '194'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/similarity/similarity-remote-api-1',
                component: ComponentCreator('/docs/functions/similarity/similarity-remote-api-1', 'e57'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/stopwords',
                component: ComponentCreator('/docs/functions/tokenize/stopwords', 'ee6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/stopwords-1',
                component: ComponentCreator('/docs/functions/tokenize/stopwords-1', 'e94'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/suggest-complete-word',
                component: ComponentCreator('/docs/functions/tokenize/suggest-complete-word', '8eb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/suggest-complete-word-1',
                component: ComponentCreator('/docs/functions/tokenize/suggest-complete-word-1', '64d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-chunks',
                component: ComponentCreator('/docs/functions/tokenize/text-to-chunks', '576'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-chunks-1',
                component: ComponentCreator('/docs/functions/tokenize/text-to-chunks-1', '9d0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-sentences',
                component: ComponentCreator('/docs/functions/tokenize/text-to-sentences', '94e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-sentences-1',
                component: ComponentCreator('/docs/functions/tokenize/text-to-sentences-1', 'b72'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-topic-tokens',
                component: ComponentCreator('/docs/functions/tokenize/text-to-topic-tokens', 'd8a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/text-to-topic-tokens-1',
                component: ComponentCreator('/docs/functions/tokenize/text-to-topic-tokens-1', '96f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/word-to-root-stem',
                component: ComponentCreator('/docs/functions/tokenize/word-to-root-stem', '3af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/tokenize/word-to-root-stem-1',
                component: ComponentCreator('/docs/functions/tokenize/word-to-root-stem-1', 'c2d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/ngrams',
                component: ComponentCreator('/docs/functions/topics/ngrams', 'e01'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/ngrams-1',
                component: ComponentCreator('/docs/functions/topics/ngrams-1', '7e2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/rank-sentences-keyphrases',
                component: ComponentCreator('/docs/functions/topics/rank-sentences-keyphrases', 'e65'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/rank-sentences-keyphrases-1',
                component: ComponentCreator('/docs/functions/topics/rank-sentences-keyphrases-1', 'f29'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/seektopic-keyphrases',
                component: ComponentCreator('/docs/functions/topics/seektopic-keyphrases', '095'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/seektopic-keyphrases-1',
                component: ComponentCreator('/docs/functions/topics/seektopic-keyphrases-1', '8dc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/topic-distribution',
                component: ComponentCreator('/docs/functions/topics/topic-distribution', '910'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/topics/topic-distribution-1',
                component: ComponentCreator('/docs/functions/topics/topic-distribution-1', 'ccf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/functions/types',
                component: ComponentCreator('/docs/functions/types', 'bdd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/',
                component: ComponentCreator('/docs/web-app/', 'cbb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/global',
                component: ComponentCreator('/docs/web-app/global', 'f04'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/hooks.server',
                component: ComponentCreator('/docs/web-app/hooks.server', '03e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/auth-google-one-tap',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/auth-google-one-tap', '912'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/auth-google-one-tap-1',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/auth-google-one-tap-1', '4f3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/auth-google-one-tap-2',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/auth-google-one-tap-2', '7c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/auth-google-one-tap-3',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/auth-google-one-tap-3', '05e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/sound-effects',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/sound-effects', '825'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/sound-effects-1',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/sound-effects-1', '6fa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/sound-effects-2',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/sound-effects-2', 'ca8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/AppLayout/sound-effects-3',
                component: ComponentCreator('/docs/web-app/lib/components/AppLayout/sound-effects-3', 'b32'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-to-html',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-to-html', '6c8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-to-html-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-to-html-1', '692'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-to-html-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-to-html-2', '6d1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-to-html-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-to-html-3', 'e1f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-to-html-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-to-html-4', 'c90'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-tokens',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-tokens', '1a7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-tokens-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-tokens-1', '2ad'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-tokens-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-tokens-2', '82c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-tokens-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-tokens-3', '2a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/docx-tokens-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/docx-tokens-4', '360'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-cards',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-cards', '2c2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-cards-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-cards-1', '943'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-cards-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-cards-2', '281'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-cards-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-cards-3', 'd11'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-cards-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-cards-4', 'cef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-debate-docx',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-debate-docx', '449'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-debate-docx-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-debate-docx-1', 'b3f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-debate-docx-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-debate-docx-2', '48d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-debate-docx-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-debate-docx-3', 'f60'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-debate-docx-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-debate-docx-4', 'ec2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-zip-folder',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-zip-folder', '5ba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-zip-folder-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-zip-folder-1', '80e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-zip-folder-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-zip-folder-2', 'ca4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-zip-folder-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-zip-folder-3', '8a3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/docx/parse-zip-folder-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/docx/parse-zip-folder-4', '0bc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/files-api-frontend',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/files-api-frontend', '7c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/files-api-frontend-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/files-api-frontend-1', '87b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/files-api-frontend-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/files-api-frontend-2', 'f45'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/files-api-frontend-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/files-api-frontend-3', 'bff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/files-api-frontend-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/files-api-frontend-4', 'e4f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/local-storage-api',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/local-storage-api', 'b2e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/local-storage-api-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/local-storage-api-1', 'ddd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/local-storage-api-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/local-storage-api-2', '672'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/local-storage-api-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/local-storage-api-3', 'fff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/local-storage-api-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/local-storage-api-4', 'd92'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/seed-test-data',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/seed-test-data', 'ab2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/seed-test-data-1',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/seed-test-data-1', '5f5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/seed-test-data-2',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/seed-test-data-2', '943'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/seed-test-data-3',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/seed-test-data-3', '530'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/Editor/storage/seed-test-data-4',
                component: ComponentCreator('/docs/web-app/lib/components/Editor/storage/seed-test-data-4', 'a1c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/auto-highlight',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/auto-highlight', '723'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/auto-highlight-1',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/auto-highlight-1', '8ae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/auto-highlight-2',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/auto-highlight-2', '07a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/auto-highlight-3',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/auto-highlight-3', 'eea'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/read-mode-view',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/read-mode-view', '46e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/read-mode-view-1',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/read-mode-view-1', 'f67'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/read-mode-view-2',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/read-mode-view-2', '3fb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ReadMode/read-mode-view-3',
                component: ComponentCreator('/docs/web-app/lib/components/ReadMode/read-mode-view-3', 'd83'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/categories',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/categories', '2f3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/categories-1',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/categories-1', '487'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/categories-2',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/categories-2', '6f7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/categories-3',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/categories-3', '4e9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/get-weather',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/get-weather', '7d2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/get-weather-1',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/get-weather-1', 'bf0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/get-weather-2',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/get-weather-2', '344'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/get-weather-3',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/get-weather-3', 'c48'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/get-weather-4',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/get-weather-4', 'c55'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/home-extras',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/home-extras', '0cc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/home-extras-1',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/home-extras-1', 'd0d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/home-extras-2',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/home-extras-2', 'af6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/home-extras-3',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/home-extras-3', '0ab'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/SearchWeb/extras/home-extras-4',
                component: ComponentCreator('/docs/web-app/lib/components/SearchWeb/extras/home-extras-4', '133'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search', 'c87'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-1',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-1', '311'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-2',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-2', '806'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-3',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-3', '9a2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web', '1a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-1',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-1', 'f71'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-2',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-2', 'a31'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-3',
                component: ComponentCreator('/docs/web-app/lib/components/ShortcutSearch/shortcut-search-web-3', '80e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/TabManager/find-in-tab-content',
                component: ComponentCreator('/docs/web-app/lib/components/TabManager/find-in-tab-content', '174'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/TabManager/find-in-tab-content-1',
                component: ComponentCreator('/docs/web-app/lib/components/TabManager/find-in-tab-content-1', '3c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/TabManager/find-in-tab-content-2',
                component: ComponentCreator('/docs/web-app/lib/components/TabManager/find-in-tab-content-2', '6bc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/TabManager/find-in-tab-content-3',
                component: ComponentCreator('/docs/web-app/lib/components/TabManager/find-in-tab-content-3', '13b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert', '8f9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-1', 'ffa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-2', '22e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-3', '564'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-4', '6a4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-dialog',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-dialog', 'be1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-dialog-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-dialog-1', 'bba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-dialog-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-dialog-2', '2b8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-dialog-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-dialog-3', '2e5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/alert-dialog-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/alert-dialog-4', '0ef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/avatar',
                component: ComponentCreator('/docs/web-app/lib/components/ui/avatar', 'ea9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/avatar-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/avatar-1', '4ef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/avatar-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/avatar-2', '79f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/avatar-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/avatar-3', '658'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/avatar-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/avatar-4', '24e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/badge',
                component: ComponentCreator('/docs/web-app/lib/components/ui/badge', '462'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/badge-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/badge-1', '7f2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/badge-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/badge-2', '29f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/badge-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/badge-3', '178'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/badge-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/badge-4', '44f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/breadcrumb',
                component: ComponentCreator('/docs/web-app/lib/components/ui/breadcrumb', '17c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/breadcrumb-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/breadcrumb-1', 'd6a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/breadcrumb-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/breadcrumb-2', 'b6a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/breadcrumb-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/breadcrumb-3', 'b51'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/breadcrumb-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/breadcrumb-4', 'bcd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/button',
                component: ComponentCreator('/docs/web-app/lib/components/ui/button', '638'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/button-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/button-1', '9aa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/button-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/button-2', '2cf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/button-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/button-3', '32e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/button-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/button-4', 'f41'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/card',
                component: ComponentCreator('/docs/web-app/lib/components/ui/card', '3e7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/card-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/card-1', '597'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/card-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/card-2', 'b5f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/card-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/card-3', '8fd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/card-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/card-4', '29d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/checkbox',
                component: ComponentCreator('/docs/web-app/lib/components/ui/checkbox', '0de'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/checkbox-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/checkbox-1', 'c4c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/checkbox-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/checkbox-2', 'd96'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/checkbox-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/checkbox-3', '39a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/checkbox-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/checkbox-4', '02d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/command',
                component: ComponentCreator('/docs/web-app/lib/components/ui/command', 'e33'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/command-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/command-1', '6b2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/command-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/command-2', '9d2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/command-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/command-3', 'e75'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/command-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/command-4', '237'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dialog',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dialog', '2bd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dialog-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dialog-1', '253'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dialog-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dialog-2', '382'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dialog-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dialog-3', 'cd3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dialog-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dialog-4', '59a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dropdown-menu',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dropdown-menu', 'fcc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dropdown-menu-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dropdown-menu-1', '23d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dropdown-menu-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dropdown-menu-2', 'f89'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dropdown-menu-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dropdown-menu-3', '699'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/dropdown-menu-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/dropdown-menu-4', '5e4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/form',
                component: ComponentCreator('/docs/web-app/lib/components/ui/form', '8de'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/form-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/form-1', '460'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/form-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/form-2', '2e0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/form-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/form-3', 'de0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/form-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/form-4', '0a4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/input',
                component: ComponentCreator('/docs/web-app/lib/components/ui/input', 'df9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/input-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/input-1', '571'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/input-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/input-2', '5a3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/input-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/input-3', '1b7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/input-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/input-4', '89d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/label',
                component: ComponentCreator('/docs/web-app/lib/components/ui/label', 'ef5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/label-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/label-1', 'fe7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/label-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/label-2', 'b3a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/label-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/label-3', 'db6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/label-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/label-4', 'c09'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/menubar',
                component: ComponentCreator('/docs/web-app/lib/components/ui/menubar', '04e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/menubar-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/menubar-1', '462'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/menubar-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/menubar-2', '6ab'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/menubar-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/menubar-3', '59f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/menubar-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/menubar-4', '28e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/pagination',
                component: ComponentCreator('/docs/web-app/lib/components/ui/pagination', 'b23'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/pagination-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/pagination-1', '36b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/pagination-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/pagination-2', '7cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/pagination-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/pagination-3', 'bb3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/pagination-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/pagination-4', 'fac'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/popover',
                component: ComponentCreator('/docs/web-app/lib/components/ui/popover', '935'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/popover-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/popover-1', 'e14'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/popover-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/popover-2', '456'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/popover-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/popover-3', '275'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/popover-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/popover-4', '0a5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/progress',
                component: ComponentCreator('/docs/web-app/lib/components/ui/progress', '77e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/progress-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/progress-1', 'a06'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/progress-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/progress-2', 'bd2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/progress-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/progress-3', 'a16'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/progress-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/progress-4', '027'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/select',
                component: ComponentCreator('/docs/web-app/lib/components/ui/select', '1fc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/select-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/select-1', '82b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/select-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/select-2', '0ae'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/select-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/select-3', 'c4d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/select-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/select-4', '95e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/separator',
                component: ComponentCreator('/docs/web-app/lib/components/ui/separator', 'a83'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/separator-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/separator-1', '41e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/separator-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/separator-2', '06d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/separator-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/separator-3', '237'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/separator-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/separator-4', '82d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sheet',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sheet', '855'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sheet-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sheet-1', '049'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sheet-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sheet-2', '5e6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sheet-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sheet-3', '221'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sheet-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sheet-4', 'e9d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar', 'f40'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar-1', '277'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar-2', '29f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar-3', 'd40'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar-4', '5b2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/constants',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/constants', '957'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/constants-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/constants-1', 'a6a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/constants-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/constants-2', 'e90'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/constants-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/constants-3', '61f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/constants-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/constants-4', '5da'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/context.svelte',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/context.svelte', '041'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/context.svelte-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/context.svelte-1', 'c61'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/context.svelte-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/context.svelte-2', 'b86'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/context.svelte-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/context.svelte-3', '3b8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sidebar/context.svelte-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sidebar/context.svelte-4', '99c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/skeleton',
                component: ComponentCreator('/docs/web-app/lib/components/ui/skeleton', '3a5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/skeleton-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/skeleton-1', 'bd7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/skeleton-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/skeleton-2', '830'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/skeleton-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/skeleton-3', '0b2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/skeleton-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/skeleton-4', 'cf0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/slider',
                component: ComponentCreator('/docs/web-app/lib/components/ui/slider', '294'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/slider-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/slider-1', '031'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/slider-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/slider-2', '333'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/slider-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/slider-3', 'c1c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/slider-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/slider-4', 'eb8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sonner',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sonner', '714'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sonner-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sonner-1', '8b2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sonner-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sonner-2', '10a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sonner-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sonner-3', 'dd4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/sonner-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/sonner-4', '145'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/switch',
                component: ComponentCreator('/docs/web-app/lib/components/ui/switch', '559'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/switch-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/switch-1', 'f37'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/switch-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/switch-2', 'a7d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/switch-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/switch-3', '6ca'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/switch-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/switch-4', 'c02'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/table',
                component: ComponentCreator('/docs/web-app/lib/components/ui/table', '04b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/table-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/table-1', '00b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/table-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/table-2', 'd3d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/table-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/table-3', 'e14'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/table-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/table-4', 'a00'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tabs',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tabs', '30d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tabs-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tabs-1', 'b5d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tabs-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tabs-2', '3b1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tabs-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tabs-3', 'a9a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tabs-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tabs-4', 'abb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/textarea',
                component: ComponentCreator('/docs/web-app/lib/components/ui/textarea', '077'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/textarea-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/textarea-1', '42a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/textarea-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/textarea-2', 'b67'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/textarea-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/textarea-3', 'e27'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/textarea-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/textarea-4', '93d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tooltip',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tooltip', '620'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tooltip-1',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tooltip-1', '043'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tooltip-2',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tooltip-2', 'de1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tooltip-3',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tooltip-3', 'ce8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/components/ui/tooltip-4',
                component: ComponentCreator('/docs/web-app/lib/components/ui/tooltip-4', '4d6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/customize-site',
                component: ComponentCreator('/docs/web-app/lib/customize-site', 'bd9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/customize-site-1',
                component: ComponentCreator('/docs/web-app/lib/customize-site-1', 'c83'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/grab-api',
                component: ComponentCreator('/docs/web-app/lib/grab-api', '852'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/grab-api-1',
                component: ComponentCreator('/docs/web-app/lib/grab-api-1', '863'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/log',
                component: ComponentCreator('/docs/web-app/lib/log', '6ef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/log-1',
                component: ComponentCreator('/docs/web-app/lib/log-1', 'db4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server',
                component: ComponentCreator('/docs/web-app/lib/server', '33e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server-1',
                component: ComponentCreator('/docs/web-app/lib/server-1', '515'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server-2',
                component: ComponentCreator('/docs/web-app/lib/server-2', 'bdf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth',
                component: ComponentCreator('/docs/web-app/lib/server/auth', '8ad'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth-1',
                component: ComponentCreator('/docs/web-app/lib/server/auth-1', '75d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth-2',
                component: ComponentCreator('/docs/web-app/lib/server/auth-2', '480'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth-old',
                component: ComponentCreator('/docs/web-app/lib/server/auth-old', 'b3a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth-old-1',
                component: ComponentCreator('/docs/web-app/lib/server/auth-old-1', '97e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/auth-old-2',
                component: ComponentCreator('/docs/web-app/lib/server/auth-old-2', '8f5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/drizzle.config',
                component: ComponentCreator('/docs/web-app/lib/server/drizzle.config', '006'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/drizzle.config-1',
                component: ComponentCreator('/docs/web-app/lib/server/drizzle.config-1', '8c1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/drizzle.config-2',
                component: ComponentCreator('/docs/web-app/lib/server/drizzle.config-2', '716'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/email',
                component: ComponentCreator('/docs/web-app/lib/server/email', 'c1b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/email-1',
                component: ComponentCreator('/docs/web-app/lib/server/email-1', '1bb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/email-2',
                component: ComponentCreator('/docs/web-app/lib/server/email-2', '5d9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/ratelimits',
                component: ComponentCreator('/docs/web-app/lib/server/ratelimits', '710'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/ratelimits-1',
                component: ComponentCreator('/docs/web-app/lib/server/ratelimits-1', 'fce'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/ratelimits-2',
                component: ComponentCreator('/docs/web-app/lib/server/ratelimits-2', 'acc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/schema',
                component: ComponentCreator('/docs/web-app/lib/server/schema', '38f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/schema-1',
                component: ComponentCreator('/docs/web-app/lib/server/schema-1', 'b44'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/schema-2',
                component: ComponentCreator('/docs/web-app/lib/server/schema-2', '371'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/types',
                component: ComponentCreator('/docs/web-app/lib/server/types', '588'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/types-1',
                component: ComponentCreator('/docs/web-app/lib/server/types-1', '0e1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/types-2',
                component: ComponentCreator('/docs/web-app/lib/server/types-2', '272'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/users',
                component: ComponentCreator('/docs/web-app/lib/server/users', '50c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/users-1',
                component: ComponentCreator('/docs/web-app/lib/server/users-1', '854'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/users-2',
                component: ComponentCreator('/docs/web-app/lib/server/users-2', '696'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/validations',
                component: ComponentCreator('/docs/web-app/lib/server/validations', 'a41'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/validations-1',
                component: ComponentCreator('/docs/web-app/lib/server/validations-1', 'b6e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/server/validations-2',
                component: ComponentCreator('/docs/web-app/lib/server/validations-2', '6aa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/utils',
                component: ComponentCreator('/docs/web-app/lib/utils', '770'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/lib/utils-1',
                component: ComponentCreator('/docs/web-app/lib/utils-1', 'bc8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/modules',
                component: ComponentCreator('/docs/web-app/modules', '2b5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/+layout',
                component: ComponentCreator('/docs/web-app/routes/+layout', '01e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/+layout-1',
                component: ComponentCreator('/docs/web-app/routes/+layout-1', 'ba4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/agents/+server',
                component: ComponentCreator('/docs/web-app/routes/api/agents/+server', '249'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/agents/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/agents/+server-1', '97b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/agents/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/agents/+server-2', '4a4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/agents/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/agents/+server-3', 'a93'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/chats/+server',
                component: ComponentCreator('/docs/web-app/routes/api/chats/+server', 'ea8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/chats/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/chats/+server-1', 'd88'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/chats/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/chats/+server-2', '0e2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/chats/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/chats/+server-3', '97d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/extract/+server',
                component: ComponentCreator('/docs/web-app/routes/api/extract/+server', 'ff3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/extract/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/extract/+server-1', 'c00'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/extract/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/extract/+server-2', '3cc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/extract/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/extract/+server-3', '887'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/[fileId]/+server',
                component: ComponentCreator('/docs/web-app/routes/api/files/[fileId]/+server', '788'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/[fileId]/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/files/[fileId]/+server-1', 'f6e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/[fileId]/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/files/[fileId]/+server-2', '5ac'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/[fileId]/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/files/[fileId]/+server-3', '13c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/[fileId]/+server-4',
                component: ComponentCreator('/docs/web-app/routes/api/files/[fileId]/+server-4', '4fe'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/+server',
                component: ComponentCreator('/docs/web-app/routes/api/files/+server', '683'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/files/+server-1', '9d0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/files/+server-2', '386'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/files/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/files/+server-3', 'e92'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/model/+server',
                component: ComponentCreator('/docs/web-app/routes/api/model/+server', 'a8a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/model/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/model/+server-1', 'a72'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/model/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/model/+server-2', '989'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/model/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/model/+server-3', '5b7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/search/+server',
                component: ComponentCreator('/docs/web-app/routes/api/search/+server', '522'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/search/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/search/+server-1', '070'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/search/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/search/+server-2', 'd86'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/search/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/search/+server-3', '358'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/subscriptions/+server',
                component: ComponentCreator('/docs/web-app/routes/api/subscriptions/+server', '9df'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/subscriptions/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/subscriptions/+server-1', 'ee8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/subscriptions/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/subscriptions/+server-2', 'e79'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/subscriptions/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/subscriptions/+server-3', '0a1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/user/+server',
                component: ComponentCreator('/docs/web-app/routes/api/user/+server', '26a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/user/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/user/+server-1', '37a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/user/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/user/+server-2', '660'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/user/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/user/+server-3', '496'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/vectorize/+server',
                component: ComponentCreator('/docs/web-app/routes/api/vectorize/+server', 'c1b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/vectorize/+server-1',
                component: ComponentCreator('/docs/web-app/routes/api/vectorize/+server-1', 'a36'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/vectorize/+server-2',
                component: ComponentCreator('/docs/web-app/routes/api/vectorize/+server-2', '3cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/api/vectorize/+server-3',
                component: ComponentCreator('/docs/web-app/routes/api/vectorize/+server-3', '2cb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout', '4f7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout-1',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout-1', 'afb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout-2',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout-2', '056'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout.server',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout.server', 'a86'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout.server-1',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout.server-1', 'ed1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+layout.server-2',
                component: ComponentCreator('/docs/web-app/routes/settings/+layout.server-2', '95d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+page.server',
                component: ComponentCreator('/docs/web-app/routes/settings/+page.server', '3ea'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+page.server-1',
                component: ComponentCreator('/docs/web-app/routes/settings/+page.server-1', '658'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web-app/routes/settings/+page.server-2',
                component: ComponentCreator('/docs/web-app/routes/settings/+page.server-2', '55b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'cfe'),
                exact: true
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
