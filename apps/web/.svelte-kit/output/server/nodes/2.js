import * as server from '../entries/pages/settings/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/settings/+layout.js";
export { server };
export const server_id = "src/routes/settings/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.By8nEpCH.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/Ddr_2JoP.js","_app/immutable/chunks/BehutCOJ.js","_app/immutable/chunks/DrUFOHDr.js","_app/immutable/chunks/RNFDyTgG.js","_app/immutable/chunks/Br3YUONq.js","_app/immutable/chunks/CDsTjZlI.js","_app/immutable/chunks/DYz-kzPn.js","_app/immutable/chunks/BffV4JBp.js"];
export const stylesheets = [];
export const fonts = [];
