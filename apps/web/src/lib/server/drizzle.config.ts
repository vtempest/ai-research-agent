import type { Config } from "drizzle-kit";
// @ts-ignore
import path from 'path'
// @ts-ignore
import fs from 'fs'
import { fileURLToPath } from "url";

export function getLocalDb() {
  // return "local.db"
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  let dbPath = path.resolve(__dirname, "../../../../")
  if (!dbPath.includes("web"))
    dbPath += "/web";
    
   dbPath += "/.wrangler/state/v3/cache/miniflare-CacheObject";
  let files = fs.readdirSync(dbPath);
  for (const file of files) {
    if (file.endsWith(".sqlite")) {
      return path.resolve(dbPath, file);
    }
  }
};
function isCloudflare() {
  if (typeof process !== "undefined")
    return !!process.env.CF_PAGES || !!process.env.CLOUDFLARE_WORKERS;
  if (typeof globalThis !== "undefined")
    // @ts-ignore
    return !!(globalThis.caches && globalThis.caches.default);
  return false;
}

let dbCredentials;

if (!isCloudflare()) {
  dbCredentials = {
    url: "file:"+getLocalDb()
  };
} else {
  dbCredentials = {
    // @ts-ignore
    wranglerConfigPath: "wrangler.toml",
    dbName: "qwksearch-db"
  };
}

export default {
  schema: "./src/lib/server/schema.ts",
  out: "migrations",
  dialect: "sqlite",
  dbCredentials
} satisfies Config;