/**
 * Docker build pre-check: required env vars + env info.
 * Run before build:docker in Dockerfile (checkDeprecatedAuth, checkRequiredEnvVars, printEnvInfo).
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const require = createRequire(import.meta.url);
const { checkDeprecatedAuth } = require('./_shared/checkDeprecatedAuth.js');

dotenvExpand.expand(dotenv.config());

const isDesktop = process.env.NEXT_PUBLIC_IS_DESKTOP_APP === '1';
const isServerDB = !!process.env.DATABASE_URL;

const KEY_VAULTS_SECRET_DOC_URL =
  'https://lobehub.com/docs/self-hosting/environment-variables/basic#key-vaults-secret';

function checkRequiredEnvVars(): void {
  if (isDesktop || !isServerDB) return;

  const missingVars: { docUrl: string; name: string }[] = [];

  if (!process.env.KEY_VAULTS_SECRET) {
    missingVars.push({ docUrl: KEY_VAULTS_SECRET_DOC_URL, name: 'KEY_VAULTS_SECRET' });
  }

  if (missingVars.length > 0) {
    console.error('\n' + '═'.repeat(70));
    console.error('❌ ERROR: Missing required environment variables!');
    console.error('═'.repeat(70));
    console.error('\nThe following environment variables are required for server database mode:\n');
    for (const { name, docUrl } of missingVars) {
      console.error(`  • ${name}`);
      console.error(`    📖 Documentation: ${docUrl}\n`);
    }
    console.error('Please configure these environment variables and redeploy.');
    console.error('═'.repeat(70) + '\n');
    process.exit(1);
  }
}

function getCommandVersion(command: string): string | null {
  try {
    return execSync(`${command} --version`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
      .trim()
      .split('\n')[0];
  } catch {
    return null;
  }
}

function printEnvInfo(): void {
  console.log('\n📋 Build Environment Info:');
  console.log('─'.repeat(50));

  console.log(`  Node.js: ${process.version}`);
  console.log(`  npm: ${getCommandVersion('npm') ?? 'not installed'}`);

  const bunVersion = getCommandVersion('bun');
  if (bunVersion) console.log(`  bun: ${bunVersion}`);

  const pnpmVersion = getCommandVersion('pnpm');
  if (pnpmVersion) console.log(`  pnpm: ${pnpmVersion}`);

  console.log('\n  App URL Environment Variables:');
  console.log(`    APP_URL: ${process.env.APP_URL ?? '(not set)'}`);
  console.log(`    VERCEL_URL: ${process.env.VERCEL_URL ?? '(not set)'}`);
  console.log(`    VERCEL_BRANCH_URL: ${process.env.VERCEL_BRANCH_URL ?? '(not set)'}`);
  console.log(
    `    VERCEL_PROJECT_PRODUCTION_URL: ${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '(not set)'}`,
  );

  console.log('─'.repeat(50));
}

checkDeprecatedAuth();
checkRequiredEnvVars();
printEnvInfo();
