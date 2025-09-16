import "clsx";
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out.push(`<div>`);
  children?.($$payload);
  $$payload.out.push(`<!----></div>`);
}
export {
  _layout as default
};
