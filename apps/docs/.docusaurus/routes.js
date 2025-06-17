import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '08a'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '8e0'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '079'),
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
                component: ComponentCreator('/functions/', '2c4'),
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
                path: '/web/lib/auth-client-1',
                component: ComponentCreator('/web/lib/auth-client-1', '1d3'),
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
                path: '/web/lib/components/AppLayout/auth-google-one-tap-1',
                component: ComponentCreator('/web/lib/components/AppLayout/auth-google-one-tap-1', '8ce'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/auth-google-one-tap-2',
                component: ComponentCreator('/web/lib/components/AppLayout/auth-google-one-tap-2', '3ec'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/auth-google-one-tap-3',
                component: ComponentCreator('/web/lib/components/AppLayout/auth-google-one-tap-3', 'af1'),
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
                path: '/web/lib/components/AppLayout/sound-effects-1',
                component: ComponentCreator('/web/lib/components/AppLayout/sound-effects-1', '398'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/sound-effects-2',
                component: ComponentCreator('/web/lib/components/AppLayout/sound-effects-2', '953'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/AppLayout/sound-effects-3',
                component: ComponentCreator('/web/lib/components/AppLayout/sound-effects-3', '593'),
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
                path: '/web/lib/components/Editor/docx/docx-to-html-1',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-to-html-1', '2c7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-to-html-2',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-to-html-2', 'de0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-to-html-3',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-to-html-3', '462'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-to-html-4',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-to-html-4', '504'),
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
                path: '/web/lib/components/Editor/docx/docx-tokens-1',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-tokens-1', 'ce7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-tokens-2',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-tokens-2', '38b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-tokens-3',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-tokens-3', 'c12'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/docx-tokens-4',
                component: ComponentCreator('/web/lib/components/Editor/docx/docx-tokens-4', 'f7d'),
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
                path: '/web/lib/components/Editor/docx/parse-cards-1',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-cards-1', '7f9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-cards-2',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-cards-2', '40c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-cards-3',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-cards-3', '5be'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-cards-4',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-cards-4', '92a'),
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
                path: '/web/lib/components/Editor/docx/parse-debate-docx-1',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-debate-docx-1', 'cff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-debate-docx-2',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-debate-docx-2', 'a44'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-debate-docx-3',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-debate-docx-3', '858'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-debate-docx-4',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-debate-docx-4', '5e5'),
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
                path: '/web/lib/components/Editor/docx/parse-zip-folder-1',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-zip-folder-1', 'ffe'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-zip-folder-2',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-zip-folder-2', '5a6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-zip-folder-3',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-zip-folder-3', '73d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/docx/parse-zip-folder-4',
                component: ComponentCreator('/web/lib/components/Editor/docx/parse-zip-folder-4', '313'),
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
                path: '/web/lib/components/Editor/storage/files-api-frontend-1',
                component: ComponentCreator('/web/lib/components/Editor/storage/files-api-frontend-1', '7c3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/files-api-frontend-2',
                component: ComponentCreator('/web/lib/components/Editor/storage/files-api-frontend-2', 'c34'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/files-api-frontend-3',
                component: ComponentCreator('/web/lib/components/Editor/storage/files-api-frontend-3', 'c66'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/files-api-frontend-4',
                component: ComponentCreator('/web/lib/components/Editor/storage/files-api-frontend-4', '1f3'),
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
                path: '/web/lib/components/Editor/storage/local-storage-api-1',
                component: ComponentCreator('/web/lib/components/Editor/storage/local-storage-api-1', '2c9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/local-storage-api-2',
                component: ComponentCreator('/web/lib/components/Editor/storage/local-storage-api-2', '21f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/local-storage-api-3',
                component: ComponentCreator('/web/lib/components/Editor/storage/local-storage-api-3', '78b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/local-storage-api-4',
                component: ComponentCreator('/web/lib/components/Editor/storage/local-storage-api-4', '4ca'),
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
                path: '/web/lib/components/Editor/storage/seed-test-data-1',
                component: ComponentCreator('/web/lib/components/Editor/storage/seed-test-data-1', '049'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/seed-test-data-2',
                component: ComponentCreator('/web/lib/components/Editor/storage/seed-test-data-2', '871'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/seed-test-data-3',
                component: ComponentCreator('/web/lib/components/Editor/storage/seed-test-data-3', 'e2b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/Editor/storage/seed-test-data-4',
                component: ComponentCreator('/web/lib/components/Editor/storage/seed-test-data-4', 'c16'),
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
                path: '/web/lib/components/icons-2',
                component: ComponentCreator('/web/lib/components/icons-2', 'fa6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/icons-3',
                component: ComponentCreator('/web/lib/components/icons-3', '25e'),
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
                path: '/web/lib/components/ReadMode/auto-highlight-1',
                component: ComponentCreator('/web/lib/components/ReadMode/auto-highlight-1', 'c11'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/auto-highlight-2',
                component: ComponentCreator('/web/lib/components/ReadMode/auto-highlight-2', '0d4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/auto-highlight-3',
                component: ComponentCreator('/web/lib/components/ReadMode/auto-highlight-3', '10c'),
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
                path: '/web/lib/components/ReadMode/read-mode-view-1',
                component: ComponentCreator('/web/lib/components/ReadMode/read-mode-view-1', 'a14'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/read-mode-view-2',
                component: ComponentCreator('/web/lib/components/ReadMode/read-mode-view-2', '780'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ReadMode/read-mode-view-3',
                component: ComponentCreator('/web/lib/components/ReadMode/read-mode-view-3', '6f8'),
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
                path: '/web/lib/components/SearchWeb/categories-1',
                component: ComponentCreator('/web/lib/components/SearchWeb/categories-1', '778'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/categories-2',
                component: ComponentCreator('/web/lib/components/SearchWeb/categories-2', 'e06'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/categories-3',
                component: ComponentCreator('/web/lib/components/SearchWeb/categories-3', '7be'),
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
                path: '/web/lib/components/SearchWeb/extras/get-weather-1',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/get-weather-1', '5e7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/get-weather-2',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/get-weather-2', '4d6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/get-weather-3',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/get-weather-3', '859'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/get-weather-4',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/get-weather-4', '7e0'),
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
                path: '/web/lib/components/SearchWeb/extras/home-extras-1',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/home-extras-1', '9d8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/home-extras-2',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/home-extras-2', 'c62'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/home-extras-3',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/home-extras-3', '3e9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/home-extras-4',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/home-extras-4', 'c9d'),
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
                path: '/web/lib/components/SearchWeb/extras/QuantumSphere-1',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/QuantumSphere-1', 'db8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/QuantumSphere-2',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/QuantumSphere-2', '088'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/QuantumSphere-3',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/QuantumSphere-3', 'b9b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/SearchWeb/extras/QuantumSphere-4',
                component: ComponentCreator('/web/lib/components/SearchWeb/extras/QuantumSphere-4', '1a2'),
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
                path: '/web/lib/components/ShortcutSearch/shortcut-search-1',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-1', '163'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search-2',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-2', '67f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search-3',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-3', 'd32'),
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
                path: '/web/lib/components/ShortcutSearch/shortcut-search-web-1',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-web-1', 'f0c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search-web-2',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-web-2', '1b4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ShortcutSearch/shortcut-search-web-3',
                component: ComponentCreator('/web/lib/components/ShortcutSearch/shortcut-search-web-3', '976'),
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
                path: '/web/lib/components/TabManager/find-in-tab-content-1',
                component: ComponentCreator('/web/lib/components/TabManager/find-in-tab-content-1', '1aa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/TabManager/find-in-tab-content-2',
                component: ComponentCreator('/web/lib/components/TabManager/find-in-tab-content-2', '23a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/TabManager/find-in-tab-content-3',
                component: ComponentCreator('/web/lib/components/TabManager/find-in-tab-content-3', 'acf'),
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
                path: '/web/lib/components/ui/alert-2',
                component: ComponentCreator('/web/lib/components/ui/alert-2', 'b28'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-3',
                component: ComponentCreator('/web/lib/components/ui/alert-3', 'dff'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-4',
                component: ComponentCreator('/web/lib/components/ui/alert-4', '878'),
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
                path: '/web/lib/components/ui/alert-dialog-2',
                component: ComponentCreator('/web/lib/components/ui/alert-dialog-2', 'be5'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-dialog-3',
                component: ComponentCreator('/web/lib/components/ui/alert-dialog-3', 'fc4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/alert-dialog-4',
                component: ComponentCreator('/web/lib/components/ui/alert-dialog-4', 'd47'),
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
                path: '/web/lib/components/ui/avatar-2',
                component: ComponentCreator('/web/lib/components/ui/avatar-2', 'ec3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/avatar-3',
                component: ComponentCreator('/web/lib/components/ui/avatar-3', '356'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/avatar-4',
                component: ComponentCreator('/web/lib/components/ui/avatar-4', '5d3'),
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
                path: '/web/lib/components/ui/badge-2',
                component: ComponentCreator('/web/lib/components/ui/badge-2', '9c7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/badge-3',
                component: ComponentCreator('/web/lib/components/ui/badge-3', '864'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/badge-4',
                component: ComponentCreator('/web/lib/components/ui/badge-4', '8ed'),
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
                path: '/web/lib/components/ui/breadcrumb-2',
                component: ComponentCreator('/web/lib/components/ui/breadcrumb-2', '7cf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/breadcrumb-3',
                component: ComponentCreator('/web/lib/components/ui/breadcrumb-3', '927'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/breadcrumb-4',
                component: ComponentCreator('/web/lib/components/ui/breadcrumb-4', 'a24'),
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
                path: '/web/lib/components/ui/button-2',
                component: ComponentCreator('/web/lib/components/ui/button-2', 'dce'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/button-3',
                component: ComponentCreator('/web/lib/components/ui/button-3', '312'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/button-4',
                component: ComponentCreator('/web/lib/components/ui/button-4', '82b'),
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
                path: '/web/lib/components/ui/card-2',
                component: ComponentCreator('/web/lib/components/ui/card-2', '85d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/card-3',
                component: ComponentCreator('/web/lib/components/ui/card-3', 'a73'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/card-4',
                component: ComponentCreator('/web/lib/components/ui/card-4', '4d3'),
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
                path: '/web/lib/components/ui/checkbox-2',
                component: ComponentCreator('/web/lib/components/ui/checkbox-2', '993'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/checkbox-3',
                component: ComponentCreator('/web/lib/components/ui/checkbox-3', 'be1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/checkbox-4',
                component: ComponentCreator('/web/lib/components/ui/checkbox-4', '836'),
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
                path: '/web/lib/components/ui/collapsible-2',
                component: ComponentCreator('/web/lib/components/ui/collapsible-2', '390'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/collapsible-3',
                component: ComponentCreator('/web/lib/components/ui/collapsible-3', '47f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/collapsible-4',
                component: ComponentCreator('/web/lib/components/ui/collapsible-4', '9bc'),
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
                path: '/web/lib/components/ui/command-2',
                component: ComponentCreator('/web/lib/components/ui/command-2', '48c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/command-3',
                component: ComponentCreator('/web/lib/components/ui/command-3', 'ac6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/command-4',
                component: ComponentCreator('/web/lib/components/ui/command-4', '9c6'),
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
                path: '/web/lib/components/ui/dialog-2',
                component: ComponentCreator('/web/lib/components/ui/dialog-2', '5b7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dialog-3',
                component: ComponentCreator('/web/lib/components/ui/dialog-3', '4c6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dialog-4',
                component: ComponentCreator('/web/lib/components/ui/dialog-4', '346'),
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
                path: '/web/lib/components/ui/dropdown-menu-2',
                component: ComponentCreator('/web/lib/components/ui/dropdown-menu-2', 'ddb'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dropdown-menu-3',
                component: ComponentCreator('/web/lib/components/ui/dropdown-menu-3', '37e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/dropdown-menu-4',
                component: ComponentCreator('/web/lib/components/ui/dropdown-menu-4', '106'),
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
                path: '/web/lib/components/ui/form-2',
                component: ComponentCreator('/web/lib/components/ui/form-2', '3dc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/form-3',
                component: ComponentCreator('/web/lib/components/ui/form-3', '40e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/form-4',
                component: ComponentCreator('/web/lib/components/ui/form-4', '2fc'),
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
                path: '/web/lib/components/ui/input-2',
                component: ComponentCreator('/web/lib/components/ui/input-2', '980'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/input-3',
                component: ComponentCreator('/web/lib/components/ui/input-3', '9cc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/input-4',
                component: ComponentCreator('/web/lib/components/ui/input-4', '7c7'),
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
                path: '/web/lib/components/ui/label-2',
                component: ComponentCreator('/web/lib/components/ui/label-2', 'c7a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/label-3',
                component: ComponentCreator('/web/lib/components/ui/label-3', 'fad'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/label-4',
                component: ComponentCreator('/web/lib/components/ui/label-4', '159'),
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
                path: '/web/lib/components/ui/menubar-2',
                component: ComponentCreator('/web/lib/components/ui/menubar-2', 'b78'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/menubar-3',
                component: ComponentCreator('/web/lib/components/ui/menubar-3', 'fd4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/menubar-4',
                component: ComponentCreator('/web/lib/components/ui/menubar-4', '757'),
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
                path: '/web/lib/components/ui/pagination-2',
                component: ComponentCreator('/web/lib/components/ui/pagination-2', '6f1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/pagination-3',
                component: ComponentCreator('/web/lib/components/ui/pagination-3', '72e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/pagination-4',
                component: ComponentCreator('/web/lib/components/ui/pagination-4', '49a'),
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
                path: '/web/lib/components/ui/popover-2',
                component: ComponentCreator('/web/lib/components/ui/popover-2', 'dcc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/popover-3',
                component: ComponentCreator('/web/lib/components/ui/popover-3', '4e3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/popover-4',
                component: ComponentCreator('/web/lib/components/ui/popover-4', '43d'),
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
                path: '/web/lib/components/ui/progress-2',
                component: ComponentCreator('/web/lib/components/ui/progress-2', 'dbf'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/progress-3',
                component: ComponentCreator('/web/lib/components/ui/progress-3', '36e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/progress-4',
                component: ComponentCreator('/web/lib/components/ui/progress-4', '91c'),
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
                path: '/web/lib/components/ui/select-2',
                component: ComponentCreator('/web/lib/components/ui/select-2', '57b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/select-3',
                component: ComponentCreator('/web/lib/components/ui/select-3', '243'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/select-4',
                component: ComponentCreator('/web/lib/components/ui/select-4', '814'),
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
                path: '/web/lib/components/ui/separator-2',
                component: ComponentCreator('/web/lib/components/ui/separator-2', 'cba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/separator-3',
                component: ComponentCreator('/web/lib/components/ui/separator-3', 'a5f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/separator-4',
                component: ComponentCreator('/web/lib/components/ui/separator-4', '698'),
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
                path: '/web/lib/components/ui/sheet-2',
                component: ComponentCreator('/web/lib/components/ui/sheet-2', 'c0c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sheet-3',
                component: ComponentCreator('/web/lib/components/ui/sheet-3', '10a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sheet-4',
                component: ComponentCreator('/web/lib/components/ui/sheet-4', 'c25'),
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
                path: '/web/lib/components/ui/sidebar-2',
                component: ComponentCreator('/web/lib/components/ui/sidebar-2', 'afc'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar-3',
                component: ComponentCreator('/web/lib/components/ui/sidebar-3', '0d1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar-4',
                component: ComponentCreator('/web/lib/components/ui/sidebar-4', '68e'),
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
                path: '/web/lib/components/ui/sidebar/constants-1',
                component: ComponentCreator('/web/lib/components/ui/sidebar/constants-1', '018'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/constants-2',
                component: ComponentCreator('/web/lib/components/ui/sidebar/constants-2', '02a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/constants-3',
                component: ComponentCreator('/web/lib/components/ui/sidebar/constants-3', '177'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/constants-4',
                component: ComponentCreator('/web/lib/components/ui/sidebar/constants-4', 'dc5'),
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
                path: '/web/lib/components/ui/sidebar/context.svelte-1',
                component: ComponentCreator('/web/lib/components/ui/sidebar/context.svelte-1', 'f19'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/context.svelte-2',
                component: ComponentCreator('/web/lib/components/ui/sidebar/context.svelte-2', 'eba'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/context.svelte-3',
                component: ComponentCreator('/web/lib/components/ui/sidebar/context.svelte-3', 'c61'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sidebar/context.svelte-4',
                component: ComponentCreator('/web/lib/components/ui/sidebar/context.svelte-4', '5e9'),
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
                path: '/web/lib/components/ui/skeleton-2',
                component: ComponentCreator('/web/lib/components/ui/skeleton-2', '46a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/skeleton-3',
                component: ComponentCreator('/web/lib/components/ui/skeleton-3', '25f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/skeleton-4',
                component: ComponentCreator('/web/lib/components/ui/skeleton-4', '44e'),
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
                path: '/web/lib/components/ui/slider-2',
                component: ComponentCreator('/web/lib/components/ui/slider-2', 'abe'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/slider-3',
                component: ComponentCreator('/web/lib/components/ui/slider-3', 'bfa'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/slider-4',
                component: ComponentCreator('/web/lib/components/ui/slider-4', 'e9d'),
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
                path: '/web/lib/components/ui/sonner-2',
                component: ComponentCreator('/web/lib/components/ui/sonner-2', 'f3d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sonner-3',
                component: ComponentCreator('/web/lib/components/ui/sonner-3', '9e6'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/sonner-4',
                component: ComponentCreator('/web/lib/components/ui/sonner-4', 'a8a'),
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
                path: '/web/lib/components/ui/switch-2',
                component: ComponentCreator('/web/lib/components/ui/switch-2', '2f3'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/switch-3',
                component: ComponentCreator('/web/lib/components/ui/switch-3', '701'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/switch-4',
                component: ComponentCreator('/web/lib/components/ui/switch-4', '7ba'),
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
                path: '/web/lib/components/ui/table-2',
                component: ComponentCreator('/web/lib/components/ui/table-2', '826'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/table-3',
                component: ComponentCreator('/web/lib/components/ui/table-3', '868'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/table-4',
                component: ComponentCreator('/web/lib/components/ui/table-4', 'f61'),
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
                path: '/web/lib/components/ui/tabs-2',
                component: ComponentCreator('/web/lib/components/ui/tabs-2', 'ce4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tabs-3',
                component: ComponentCreator('/web/lib/components/ui/tabs-3', 'ca8'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tabs-4',
                component: ComponentCreator('/web/lib/components/ui/tabs-4', 'c5c'),
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
                path: '/web/lib/components/ui/textarea-2',
                component: ComponentCreator('/web/lib/components/ui/textarea-2', 'e2e'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/textarea-3',
                component: ComponentCreator('/web/lib/components/ui/textarea-3', '206'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/textarea-4',
                component: ComponentCreator('/web/lib/components/ui/textarea-4', '89a'),
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
                path: '/web/lib/components/ui/tooltip-2',
                component: ComponentCreator('/web/lib/components/ui/tooltip-2', '505'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tooltip-3',
                component: ComponentCreator('/web/lib/components/ui/tooltip-3', '388'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/components/ui/tooltip-4',
                component: ComponentCreator('/web/lib/components/ui/tooltip-4', 'f9c'),
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
                path: '/web/lib/customize-site-1',
                component: ComponentCreator('/web/lib/customize-site-1', 'ceb'),
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
                path: '/web/lib/server-2',
                component: ComponentCreator('/web/lib/server-2', '618'),
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
                path: '/web/lib/server/auth-1',
                component: ComponentCreator('/web/lib/server/auth-1', '3a1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/auth-2',
                component: ComponentCreator('/web/lib/server/auth-2', '849'),
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
                path: '/web/lib/server/drizzle.config-1',
                component: ComponentCreator('/web/lib/server/drizzle.config-1', '409'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/drizzle.config-2',
                component: ComponentCreator('/web/lib/server/drizzle.config-2', '3f6'),
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
                path: '/web/lib/server/email-1',
                component: ComponentCreator('/web/lib/server/email-1', '2d7'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/email-2',
                component: ComponentCreator('/web/lib/server/email-2', 'feb'),
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
                path: '/web/lib/server/ratelimits-1',
                component: ComponentCreator('/web/lib/server/ratelimits-1', 'a94'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/ratelimits-2',
                component: ComponentCreator('/web/lib/server/ratelimits-2', 'd92'),
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
                path: '/web/lib/server/schema-1',
                component: ComponentCreator('/web/lib/server/schema-1', 'e2d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/schema-2',
                component: ComponentCreator('/web/lib/server/schema-2', '68b'),
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
                path: '/web/lib/server/types-1',
                component: ComponentCreator('/web/lib/server/types-1', 'a5b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/types-2',
                component: ComponentCreator('/web/lib/server/types-2', '888'),
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
                path: '/web/lib/server/users-1',
                component: ComponentCreator('/web/lib/server/users-1', '512'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/users-2',
                component: ComponentCreator('/web/lib/server/users-2', '14b'),
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
                path: '/web/lib/server/validations-1',
                component: ComponentCreator('/web/lib/server/validations-1', '001'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/lib/server/validations-2',
                component: ComponentCreator('/web/lib/server/validations-2', '902'),
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
                path: '/web/lib/utils-1',
                component: ComponentCreator('/web/lib/utils-1', 'b39'),
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
                path: '/web/routes/+layout-1',
                component: ComponentCreator('/web/routes/+layout-1', '7e2'),
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
                path: '/web/routes/api/agents/+server-1',
                component: ComponentCreator('/web/routes/api/agents/+server-1', '3b2'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/agents/+server-2',
                component: ComponentCreator('/web/routes/api/agents/+server-2', '14f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/agents/+server-3',
                component: ComponentCreator('/web/routes/api/agents/+server-3', 'bae'),
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
                path: '/web/routes/api/chats/+server-1',
                component: ComponentCreator('/web/routes/api/chats/+server-1', 'fda'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/chats/+server-2',
                component: ComponentCreator('/web/routes/api/chats/+server-2', 'dc1'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/chats/+server-3',
                component: ComponentCreator('/web/routes/api/chats/+server-3', 'e8b'),
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
                path: '/web/routes/api/extract/+server-1',
                component: ComponentCreator('/web/routes/api/extract/+server-1', '2bd'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/extract/+server-2',
                component: ComponentCreator('/web/routes/api/extract/+server-2', '54a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/extract/+server-3',
                component: ComponentCreator('/web/routes/api/extract/+server-3', '105'),
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
                path: '/web/routes/api/files/[fileId]/+server-1',
                component: ComponentCreator('/web/routes/api/files/[fileId]/+server-1', '857'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/[fileId]/+server-2',
                component: ComponentCreator('/web/routes/api/files/[fileId]/+server-2', 'e02'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/[fileId]/+server-3',
                component: ComponentCreator('/web/routes/api/files/[fileId]/+server-3', '729'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/[fileId]/+server-4',
                component: ComponentCreator('/web/routes/api/files/[fileId]/+server-4', 'e74'),
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
                path: '/web/routes/api/files/+server-1',
                component: ComponentCreator('/web/routes/api/files/+server-1', '616'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/+server-2',
                component: ComponentCreator('/web/routes/api/files/+server-2', '13c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/files/+server-3',
                component: ComponentCreator('/web/routes/api/files/+server-3', '190'),
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
                path: '/web/routes/api/model/+server-1',
                component: ComponentCreator('/web/routes/api/model/+server-1', 'da4'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/model/+server-2',
                component: ComponentCreator('/web/routes/api/model/+server-2', '479'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/model/+server-3',
                component: ComponentCreator('/web/routes/api/model/+server-3', '04e'),
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
                path: '/web/routes/api/search/+server-1',
                component: ComponentCreator('/web/routes/api/search/+server-1', '30b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/search/+server-2',
                component: ComponentCreator('/web/routes/api/search/+server-2', '33b'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/search/+server-3',
                component: ComponentCreator('/web/routes/api/search/+server-3', '87c'),
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
                path: '/web/routes/api/subscriptions/+server-1',
                component: ComponentCreator('/web/routes/api/subscriptions/+server-1', '682'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/subscriptions/+server-2',
                component: ComponentCreator('/web/routes/api/subscriptions/+server-2', 'c8c'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/subscriptions/+server-3',
                component: ComponentCreator('/web/routes/api/subscriptions/+server-3', '342'),
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
                path: '/web/routes/api/user/+server-1',
                component: ComponentCreator('/web/routes/api/user/+server-1', '633'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/user/+server-2',
                component: ComponentCreator('/web/routes/api/user/+server-2', 'ef0'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/user/+server-3',
                component: ComponentCreator('/web/routes/api/user/+server-3', 'ef2'),
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
                path: '/web/routes/api/vectorize/+server-1',
                component: ComponentCreator('/web/routes/api/vectorize/+server-1', '624'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/vectorize/+server-2',
                component: ComponentCreator('/web/routes/api/vectorize/+server-2', '18a'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/api/vectorize/+server-3',
                component: ComponentCreator('/web/routes/api/vectorize/+server-3', '271'),
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
                path: '/web/routes/settings/+layout-1',
                component: ComponentCreator('/web/routes/settings/+layout-1', 'cf9'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+layout-2',
                component: ComponentCreator('/web/routes/settings/+layout-2', '2e0'),
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
                path: '/web/routes/settings/+layout.server-1',
                component: ComponentCreator('/web/routes/settings/+layout.server-1', 'd7d'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+layout.server-2',
                component: ComponentCreator('/web/routes/settings/+layout.server-2', '7e6'),
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
                path: '/web/routes/settings/+page.server-1',
                component: ComponentCreator('/web/routes/settings/+page.server-1', '06f'),
                exact: true,
                sidebar: "default"
              },
              {
                path: '/web/routes/settings/+page.server-2',
                component: ComponentCreator('/web/routes/settings/+page.server-2', 'efb'),
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
