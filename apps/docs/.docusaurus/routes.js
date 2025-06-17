import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'dd5'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', 'ae3'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', 'f4c'),
            routes: [
              {
                path: '/docs/api/extract-content',
                component: ComponentCreator('/docs/api/extract-content', '47f'),
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
                path: '/docs/api/search-web',
                component: ComponentCreator('/docs/api/search-web', '452'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/api/write-language',
                component: ComponentCreator('/docs/api/write-language', '7ad'),
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
                path: '/docs/functions/globals',
                component: ComponentCreator('/docs/functions/globals', '6f4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/',
                component: ComponentCreator('/docs/web/', '387'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/global',
                component: ComponentCreator('/docs/web/global', 'd99'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/hooks.server',
                component: ComponentCreator('/docs/web/hooks.server', '39a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/auth-client',
                component: ComponentCreator('/docs/web/lib/auth-client', '1f7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/AppLayout/auth-google-one-tap',
                component: ComponentCreator('/docs/web/lib/components/AppLayout/auth-google-one-tap', '60d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/AppLayout/sound-effects',
                component: ComponentCreator('/docs/web/lib/components/AppLayout/sound-effects', '529'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/docx/docx-to-html',
                component: ComponentCreator('/docs/web/lib/components/Editor/docx/docx-to-html', '5a2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/docx/docx-tokens',
                component: ComponentCreator('/docs/web/lib/components/Editor/docx/docx-tokens', '880'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/docx/parse-cards',
                component: ComponentCreator('/docs/web/lib/components/Editor/docx/parse-cards', '6a4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/docx/parse-debate-docx',
                component: ComponentCreator('/docs/web/lib/components/Editor/docx/parse-debate-docx', 'eb3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/docx/parse-zip-folder',
                component: ComponentCreator('/docs/web/lib/components/Editor/docx/parse-zip-folder', '291'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/storage/files-api-frontend',
                component: ComponentCreator('/docs/web/lib/components/Editor/storage/files-api-frontend', 'fa8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/storage/local-storage-api',
                component: ComponentCreator('/docs/web/lib/components/Editor/storage/local-storage-api', 'e9b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/Editor/storage/seed-test-data',
                component: ComponentCreator('/docs/web/lib/components/Editor/storage/seed-test-data', 'da9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/icons',
                component: ComponentCreator('/docs/web/lib/components/icons', 'f76'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/icons-1',
                component: ComponentCreator('/docs/web/lib/components/icons-1', '035'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ReadMode/auto-highlight',
                component: ComponentCreator('/docs/web/lib/components/ReadMode/auto-highlight', '197'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ReadMode/read-mode-view',
                component: ComponentCreator('/docs/web/lib/components/ReadMode/read-mode-view', '17b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/SearchWeb/categories',
                component: ComponentCreator('/docs/web/lib/components/SearchWeb/categories', 'be1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/SearchWeb/extras/get-weather',
                component: ComponentCreator('/docs/web/lib/components/SearchWeb/extras/get-weather', '975'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/SearchWeb/extras/home-extras',
                component: ComponentCreator('/docs/web/lib/components/SearchWeb/extras/home-extras', 'a17'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/SearchWeb/extras/QuantumSphere',
                component: ComponentCreator('/docs/web/lib/components/SearchWeb/extras/QuantumSphere', 'ccd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ShortcutSearch/shortcut-search',
                component: ComponentCreator('/docs/web/lib/components/ShortcutSearch/shortcut-search', 'fd2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ShortcutSearch/shortcut-search-web',
                component: ComponentCreator('/docs/web/lib/components/ShortcutSearch/shortcut-search-web', 'ffd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/TabManager/find-in-tab-content',
                component: ComponentCreator('/docs/web/lib/components/TabManager/find-in-tab-content', 'd2a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/alert',
                component: ComponentCreator('/docs/web/lib/components/ui/alert', '3b8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/alert-1',
                component: ComponentCreator('/docs/web/lib/components/ui/alert-1', '3c7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/alert-dialog',
                component: ComponentCreator('/docs/web/lib/components/ui/alert-dialog', '219'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/alert-dialog-1',
                component: ComponentCreator('/docs/web/lib/components/ui/alert-dialog-1', '521'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/avatar',
                component: ComponentCreator('/docs/web/lib/components/ui/avatar', '3a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/avatar-1',
                component: ComponentCreator('/docs/web/lib/components/ui/avatar-1', '0f0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/badge',
                component: ComponentCreator('/docs/web/lib/components/ui/badge', 'db6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/badge-1',
                component: ComponentCreator('/docs/web/lib/components/ui/badge-1', '2e6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/breadcrumb',
                component: ComponentCreator('/docs/web/lib/components/ui/breadcrumb', 'ae5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/breadcrumb-1',
                component: ComponentCreator('/docs/web/lib/components/ui/breadcrumb-1', 'c98'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/button',
                component: ComponentCreator('/docs/web/lib/components/ui/button', '7fd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/button-1',
                component: ComponentCreator('/docs/web/lib/components/ui/button-1', '47c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/card',
                component: ComponentCreator('/docs/web/lib/components/ui/card', 'bf3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/card-1',
                component: ComponentCreator('/docs/web/lib/components/ui/card-1', '924'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/checkbox',
                component: ComponentCreator('/docs/web/lib/components/ui/checkbox', '2ba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/checkbox-1',
                component: ComponentCreator('/docs/web/lib/components/ui/checkbox-1', '78f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/collapsible',
                component: ComponentCreator('/docs/web/lib/components/ui/collapsible', 'acb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/collapsible-1',
                component: ComponentCreator('/docs/web/lib/components/ui/collapsible-1', '186'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/command',
                component: ComponentCreator('/docs/web/lib/components/ui/command', 'acf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/command-1',
                component: ComponentCreator('/docs/web/lib/components/ui/command-1', '874'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/dialog',
                component: ComponentCreator('/docs/web/lib/components/ui/dialog', 'ca7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/dialog-1',
                component: ComponentCreator('/docs/web/lib/components/ui/dialog-1', '3c2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/dropdown-menu',
                component: ComponentCreator('/docs/web/lib/components/ui/dropdown-menu', 'e98'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/dropdown-menu-1',
                component: ComponentCreator('/docs/web/lib/components/ui/dropdown-menu-1', '2ab'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/form',
                component: ComponentCreator('/docs/web/lib/components/ui/form', '243'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/form-1',
                component: ComponentCreator('/docs/web/lib/components/ui/form-1', '129'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/input',
                component: ComponentCreator('/docs/web/lib/components/ui/input', 'eeb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/input-1',
                component: ComponentCreator('/docs/web/lib/components/ui/input-1', 'bca'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/label',
                component: ComponentCreator('/docs/web/lib/components/ui/label', '865'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/label-1',
                component: ComponentCreator('/docs/web/lib/components/ui/label-1', '4a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/menubar',
                component: ComponentCreator('/docs/web/lib/components/ui/menubar', '9a3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/menubar-1',
                component: ComponentCreator('/docs/web/lib/components/ui/menubar-1', '3af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/pagination',
                component: ComponentCreator('/docs/web/lib/components/ui/pagination', 'b2f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/pagination-1',
                component: ComponentCreator('/docs/web/lib/components/ui/pagination-1', '5d2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/popover',
                component: ComponentCreator('/docs/web/lib/components/ui/popover', '8cc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/popover-1',
                component: ComponentCreator('/docs/web/lib/components/ui/popover-1', '87a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/progress',
                component: ComponentCreator('/docs/web/lib/components/ui/progress', '013'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/progress-1',
                component: ComponentCreator('/docs/web/lib/components/ui/progress-1', 'c5e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/select',
                component: ComponentCreator('/docs/web/lib/components/ui/select', '5b1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/select-1',
                component: ComponentCreator('/docs/web/lib/components/ui/select-1', '796'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/separator',
                component: ComponentCreator('/docs/web/lib/components/ui/separator', '6f4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/separator-1',
                component: ComponentCreator('/docs/web/lib/components/ui/separator-1', 'f96'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sheet',
                component: ComponentCreator('/docs/web/lib/components/ui/sheet', '912'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sheet-1',
                component: ComponentCreator('/docs/web/lib/components/ui/sheet-1', '0f9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sidebar',
                component: ComponentCreator('/docs/web/lib/components/ui/sidebar', '0ac'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sidebar-1',
                component: ComponentCreator('/docs/web/lib/components/ui/sidebar-1', 'ba0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sidebar/constants',
                component: ComponentCreator('/docs/web/lib/components/ui/sidebar/constants', '4f2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sidebar/context.svelte',
                component: ComponentCreator('/docs/web/lib/components/ui/sidebar/context.svelte', 'd26'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/skeleton',
                component: ComponentCreator('/docs/web/lib/components/ui/skeleton', '956'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/skeleton-1',
                component: ComponentCreator('/docs/web/lib/components/ui/skeleton-1', '7c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/slider',
                component: ComponentCreator('/docs/web/lib/components/ui/slider', 'aa7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/slider-1',
                component: ComponentCreator('/docs/web/lib/components/ui/slider-1', 'c17'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sonner',
                component: ComponentCreator('/docs/web/lib/components/ui/sonner', '6c0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/sonner-1',
                component: ComponentCreator('/docs/web/lib/components/ui/sonner-1', '5da'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/switch',
                component: ComponentCreator('/docs/web/lib/components/ui/switch', '912'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/switch-1',
                component: ComponentCreator('/docs/web/lib/components/ui/switch-1', 'e22'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/table',
                component: ComponentCreator('/docs/web/lib/components/ui/table', 'c37'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/table-1',
                component: ComponentCreator('/docs/web/lib/components/ui/table-1', '9dd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/tabs',
                component: ComponentCreator('/docs/web/lib/components/ui/tabs', '4a0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/tabs-1',
                component: ComponentCreator('/docs/web/lib/components/ui/tabs-1', '121'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/textarea',
                component: ComponentCreator('/docs/web/lib/components/ui/textarea', 'cbd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/textarea-1',
                component: ComponentCreator('/docs/web/lib/components/ui/textarea-1', 'ffe'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/tooltip',
                component: ComponentCreator('/docs/web/lib/components/ui/tooltip', '482'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/components/ui/tooltip-1',
                component: ComponentCreator('/docs/web/lib/components/ui/tooltip-1', 'a62'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/customize-site',
                component: ComponentCreator('/docs/web/lib/customize-site', '150'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server',
                component: ComponentCreator('/docs/web/lib/server', '5d6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server-1',
                component: ComponentCreator('/docs/web/lib/server-1', '2ea'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/auth',
                component: ComponentCreator('/docs/web/lib/server/auth', '784'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/drizzle.config',
                component: ComponentCreator('/docs/web/lib/server/drizzle.config', '44b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/email',
                component: ComponentCreator('/docs/web/lib/server/email', 'b20'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/ratelimits',
                component: ComponentCreator('/docs/web/lib/server/ratelimits', 'cef'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/schema',
                component: ComponentCreator('/docs/web/lib/server/schema', '4e6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/types',
                component: ComponentCreator('/docs/web/lib/server/types', 'ccc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/users',
                component: ComponentCreator('/docs/web/lib/server/users', 'd74'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/server/validations',
                component: ComponentCreator('/docs/web/lib/server/validations', '7af'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/lib/utils',
                component: ComponentCreator('/docs/web/lib/utils', 'b43'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/modules',
                component: ComponentCreator('/docs/web/modules', 'f11'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/+layout',
                component: ComponentCreator('/docs/web/routes/+layout', 'f07'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/agents/+server',
                component: ComponentCreator('/docs/web/routes/api/agents/+server', '54a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/chats/+server',
                component: ComponentCreator('/docs/web/routes/api/chats/+server', '2d6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/extract/+server',
                component: ComponentCreator('/docs/web/routes/api/extract/+server', 'fa9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/files/[fileId]/+server',
                component: ComponentCreator('/docs/web/routes/api/files/[fileId]/+server', 'd86'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/files/+server',
                component: ComponentCreator('/docs/web/routes/api/files/+server', '82c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/model/+server',
                component: ComponentCreator('/docs/web/routes/api/model/+server', 'e75'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/search/+server',
                component: ComponentCreator('/docs/web/routes/api/search/+server', '85a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/subscriptions/+server',
                component: ComponentCreator('/docs/web/routes/api/subscriptions/+server', '6f0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/user/+server',
                component: ComponentCreator('/docs/web/routes/api/user/+server', 'a0c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/api/vectorize/+server',
                component: ComponentCreator('/docs/web/routes/api/vectorize/+server', '99b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/settings/+layout',
                component: ComponentCreator('/docs/web/routes/settings/+layout', '222'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/settings/+layout.server',
                component: ComponentCreator('/docs/web/routes/settings/+layout.server', '644'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/web/routes/settings/+page.server',
                component: ComponentCreator('/docs/web/routes/settings/+page.server', '48a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'cf5'),
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
