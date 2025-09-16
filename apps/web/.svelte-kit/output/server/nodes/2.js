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
export const imports = ["_app/immutable/nodes/2.t-ifBrHi.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dk_ZDBoQ.js","_app/immutable/chunks/DXa3xy4r.js","_app/immutable/chunks/DXSYVY3x.js","_app/immutable/chunks/CdIkY1E0.js","_app/immutable/chunks/WuwLjjiI.js","_app/immutable/chunks/ChgTXZuA.js","_app/immutable/chunks/BqOFc2WC.js","_app/immutable/chunks/ruU2Jr75.js"];
export const stylesheets = [];
export const fonts = [];
