import { defineConfig } from 'wxt';
import type { Plugin } from 'vite';

// Chrome rejects content scripts with non-ASCII bytes.
// Vite's minifier converts \uXXXX escapes back to literal chars,
// so we post-process the content script bundle to re-escape them.
function escapeNonAsciiPlugin(): Plugin {
  return {
    name: 'escape-non-ascii-content-script',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.includes('content-scripts/') && chunk.type === 'chunk') {
          chunk.code = chunk.code.replace(
            /[^\x00-\x7F]/g,
            (ch) => `\\u${ch.codePointAt(0)!.toString(16).padStart(4, '0')}`
          );
        }
      }
    },
  };
}

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [escapeNonAsciiPlugin()],
  }),
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
