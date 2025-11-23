import "clsx";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div>`);
  children?.($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
