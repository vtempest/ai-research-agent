/**
 * @fileoverview Browser stand-in for the Node builtins `api2client` imports,
 * for `next dev` only.
 *
 * `qwksearch-api-client`'s dist imports `api2client`, whose main entry
 * statically imports its OpenAPI code generator — and that imports from
 * `node:child_process`, `node:fs`, `node:module`, `node:path` and `node:url`.
 * The browser never runs the generator (it is a CLI step), but Turbopack
 * refuses to put a `node:` builtin in a client chunk and fails the whole route
 * instead: `ChatInputBox` reaches the client from the root layout's
 * `Providers`, so every page of `bun run dev` answered 500. The deployed
 * vite/rolldown build is unaffected, and server code keeps the real modules —
 * the alias in `next.config.mjs` applies to the browser condition only.
 *
 * Each export is one the generator names; calling any of them throws.
 */
const unavailable = (name) => () => {
  throw new Error(`${name} is not available in the browser`);
};

export const spawn = unavailable('child_process.spawn');
export const readFileSync = unavailable('fs.readFileSync');
export const existsSync = unavailable('fs.existsSync');
export const writeFileSync = unavailable('fs.writeFileSync');
export const readdirSync = unavailable('fs.readdirSync');
export const statSync = unavailable('fs.statSync');
export const createRequire = unavailable('module.createRequire');
export const resolve = unavailable('path.resolve');
export const join = unavailable('path.join');
export const pathToFileURL = unavailable('url.pathToFileURL');

export default {};
