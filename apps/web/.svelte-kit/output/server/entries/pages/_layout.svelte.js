import "clsx";
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
