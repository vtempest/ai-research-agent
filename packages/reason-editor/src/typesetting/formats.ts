import { h } from '../rendering/vdom';
import { format } from './typeset';

export const underline = format({
  name: 'underline',
  selector: 'u',
  styleSelector: '[style*="text-decoration: underline"]',
  commands: editor => () => editor.toggleTextFormat({ underline: true }),
  shortcuts: 'Mod+Y',
  render: (attributes, children) => h('u', null, children),
});

export const bold = format({
  name: 'bold',
  selector: 'strong, b',
  styleSelector: '[style*="font-weight:bold"], [style*="font-weight: bold"]',
  commands: editor => () => editor.toggleTextFormat({ bold: true }),
  shortcuts: 'Mod+B',
  render: (attributes, children) => h('strong', null, children),
});

export const italic = format({
  name: 'italic',
  selector: 'em, i, u,mark',
  styleSelector: '[style*="font-style:italic"], [style*="font-style: italic"]',
  commands: editor => () => editor.toggleTextFormat({ italic: true }),
  shortcuts: 'Mod+I',
  render: (attributes, children) => h('i', null, children),
});

export const mark = format({
  name: 'mark',
  shortcuts: 'Mod+M',
  selector: 'mark',
  commands: editor => () => editor.toggleTextFormat({ mark: true }),
  render: (attributes, children) => h('mark', null, children),
});


export const code = format({
  name: 'code',
  selector: 'code, u',
  commands: editor => () => editor.toggleTextFormat({ code: true }),
  render: (attributes, children) => h('code', null, children),
});

export const link = format({
  name: 'link',
  selector: 'a[href], u',
  greedy: false,
  // If the link is a string, it is an actual address. Otherwise it is either undefined (empty) or being called from the
  // testing code (which passes a pointer to the dom object, hence the conversion to a boolean which works with the toggleTextFormat)
  commands: editor => (link: string) => editor.toggleTextFormat({ link: typeof link === 'string' ? link : !!link }),
  fromDom: node => (node as HTMLAnchorElement).href,
  render: (attributes, children) => h('a', { href: attributes.link, target: '_blank' }, children),
});
