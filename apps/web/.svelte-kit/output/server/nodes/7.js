import * as server from '../entries/pages/settings/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/settings/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.Dvo_S_23.js","_app/immutable/chunks/DTfHs9DS.js","_app/immutable/chunks/DJ8n_fHL.js","_app/immutable/chunks/DDRphrzB.js"];
export const stylesheets = [];
export const fonts = [];
