

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D3QA1wGZ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/Ddr_2JoP.js","_app/immutable/chunks/BehutCOJ.js","_app/immutable/chunks/B2cpTFDZ.js","_app/immutable/chunks/Dr58ymYW.js","_app/immutable/chunks/DrUFOHDr.js","_app/immutable/chunks/BLA-fg7T.js"];
export const stylesheets = ["_app/immutable/assets/0.BLY_VPKO.css"];
export const fonts = [];
