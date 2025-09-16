import * as server from '../entries/pages/settings/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.CHeZu8T8.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/JzbbRPEJ.js","_app/immutable/chunks/Dk_ZDBoQ.js"];
export const stylesheets = [];
export const fonts = [];
