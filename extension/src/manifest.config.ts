import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, name } = packageJson;

const [major, minor, patch] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "Debate AI - Collaborative Research",
  version: `${major}.${minor}.${patch}`,
  version_name: version,
  description: "Debate AI - Collaborative Research ",
  permissions: ["sidePanel", "scripting", "contextMenus", "tabs", "favicon",
    "activeTab", "webRequest", "declarativeNetRequest"],
  host_permissions: ["<all_urls>"],
  background: {
    service_worker: "src/pages/background/service-worker.js",
  },
  side_panel: {
    default_path: "src/pages/sidepanel/index.html",
  },

  //loads entire site as page inside the chrome extension
  // options_page: "index.html",

  action: {
    default_title: "Search Tools",
  },

  icons: {
    "48": "src/assets/icons/icon-48.png",
    "128": "src/assets/icons/icon-128.png",
  },
  commands: {
    _execute_action: {
      suggested_key: {
        default: "Ctrl+Q",
        mac: "Command+B",
      },
    },
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/pages/content/index.js"],
    },
  ],

  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
  web_accessible_resources: [
    {
      resources: ["src/*", "*.svg"],
      matches: ["<all_urls>"],
    },
    {
      resources: ["_favicon/*"],
      matches: ["<all_urls>"]
    }

  ],
}));
