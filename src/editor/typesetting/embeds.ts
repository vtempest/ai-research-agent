import { AttributeMap } from '../document';
import { h } from '../rendering/vdom';
import { embed } from './typeset';

export const image = embed({
  name: 'image',
  selector: 'img',
  commands: editor => (image: string, props?: object) => editor.insert({ image, ...props }),
  fromDom: node => {
    const image: AttributeMap = {};
    ['src', 'alt', 'width', 'height'].forEach(name => {
      if (!node.hasAttribute(name)) return;
      const value = node.getAttribute(name);
      if (name === 'src') name = 'image';
      image[name] = value;
    });
    return image;
  },
  render: (embed: AttributeMap) => {
    const { image, ...props } = embed;
    props.src = image;
    return h('img', props);
  },
});

export const br = embed({
  name: 'br',
  selector: 'br',
  commands: editor => () => editor.insert({ br: true }),
  render: () => h('br'),
});
