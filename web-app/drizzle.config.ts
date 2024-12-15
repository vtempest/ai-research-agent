import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import type { Config } from "drizzle-kit";

const getLocalDb = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dbPath = path.resolve(__dirname, "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const files = fs.readdirSync(dbPath);

  for (const file of files) {
    if (file.endsWith(".sqlite")) {
      return path.resolve(dbPath, file);
    }
  }
};

const isDev = process.env.ENV == "dev";
let dbCredentials;

if (isDev) {
  dbCredentials = {
    url: getLocalDb()
  };
} else {
  dbCredentials = {
    wranglerConfigPath: "wrangler.toml",
    dbName: "qwksearch-db"
  };
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials
} satisfies Config;



/**
 Create your D1 database via dashboard or with bunx wrangler d1 create my-db-prod.
Copy the console output database_name and database_id.
Go to wrangler.toml and change database_name and database_id.
Go to drizzle.config.ts and change db name in dbName.
Go to package.json and change db name in db:push:* and db:backup:prod.
Generate and migrate the schema to dev or prod db: 
bun run db:migrate; bun run db:push:dev; bun run db:push:prod.

 */