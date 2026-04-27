import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'QwkSearch Tab Manager AI',
    version: '6.0.0',
    permissions: [
      'sidePanel',
      'scripting',
      'contextMenus',
      'tabs',
      'favicon',
      'activeTab',
      'webRequest',
      'declarativeNetRequest',
    ],
    host_permissions: ['<all_urls>'],
    commands: {
      _execute_action: {
        suggested_key: {
          default: 'Ctrl+Q',
          mac: 'Command+B',
        },
        description: 'Open side panel',
      },
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'",
    },
    web_accessible_resources: [
      {
        resources: ['_favicon/*'],
        matches: ['<all_urls>'],
      },
    ],
  },
});
