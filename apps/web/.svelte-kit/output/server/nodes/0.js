

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DvA_pMQQ.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dk_ZDBoQ.js","_app/immutable/chunks/DXa3xy4r.js","_app/immutable/chunks/BL1nLgq8.js","_app/immutable/chunks/DCI5hF00.js","_app/immutable/chunks/BqOFc2WC.js","_app/immutable/chunks/NGqQ_F4s.js"];
export const stylesheets = ["_app/immutable/assets/0.DL6PMKg-.css"];
export const fonts = [];
