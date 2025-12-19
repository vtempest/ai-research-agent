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
export const imports = ["_app/immutable/nodes/2.BPbnrS54.js","_app/immutable/chunks/DTfHs9DS.js","_app/immutable/chunks/DJ8n_fHL.js","_app/immutable/chunks/4wAtCL5d.js","_app/immutable/chunks/CUHqM9Vi.js","_app/immutable/chunks/DBkHidCr.js","_app/immutable/chunks/Bk3y79ue.js","_app/immutable/chunks/Zd3S8LrM.js","_app/immutable/chunks/CU11SWTU.js","_app/immutable/chunks/DNiIdL4j.js","_app/immutable/chunks/owMUWBs6.js"];
export const stylesheets = [];
export const fonts = [];
