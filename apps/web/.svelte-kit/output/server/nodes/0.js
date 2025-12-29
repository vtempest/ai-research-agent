

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DWGkgcOK.js","_app/immutable/chunks/DTfHs9DS.js","_app/immutable/chunks/DJ8n_fHL.js","_app/immutable/chunks/4wAtCL5d.js","_app/immutable/chunks/CUHqM9Vi.js","_app/immutable/chunks/Ce4zyGx3.js","_app/immutable/chunks/Cj9B7dkS.js","_app/immutable/chunks/DBkHidCr.js","_app/immutable/chunks/amsbgj-v.js"];
export const stylesheets = ["_app/immutable/assets/0.B_tWPzPZ.css"];
export const fonts = [];
