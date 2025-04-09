[ai-research-agent](../../modules.md) / editor/typesetting/typeset

## Classes

### Types&lt;T&gt;

A type store to hold types and make it easy to manage them.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`BasicType`](typeset.md#basictype)

</td>
<td>

[`BasicType`](typeset.md#basictype)

</td>
</tr>
</tbody>
</table>

#### Constructors

##### new Types()

```ts
new Types<T>(types): Types<T>
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`types`

</td>
<td>

`T`[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`Types`](typeset.md#typest)&lt;`T`&gt;

#### Properties

##### list

```ts
list: T[];
```

##### priorities

```ts
priorities: object;
```

###### Index Signature

 \[`name`: `string`\]: `number`

##### selector

```ts
selector: string;
```

##### types

```ts
types: TypeMap<T>;
```

#### Accessors

##### default

###### Get Signature

```ts
get default(): T
```

###### Returns

`T`

#### Methods

##### add()

```ts
add(type): void
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### findByAttributes()

###### Call Signature

```ts
findByAttributes(attributes, fallbackToDefault): T
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`fallbackToDefault`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Call Signature

```ts
findByAttributes(attributes, fallbackToDefault?): T
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`fallbackToDefault`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### findByNode()

###### Call Signature

```ts
findByNode(node, fallbackToDefault): T
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

`Node`

</td>
</tr>
<tr>
<td>

`fallbackToDefault`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

###### Call Signature

```ts
findByNode(node, fallbackToDefault?): T
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

`Node`

</td>
</tr>
<tr>
<td>

`fallbackToDefault`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### get()

```ts
get(name): T
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### init()

```ts
init(): void
```

###### Returns

`void`

##### matches()

```ts
matches(node): boolean
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### priority()

```ts
priority(name): number
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### remove()

```ts
remove(type): void
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

`string` \| `T`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

***

### Typeset

#### Constructors

##### new Typeset()

```ts
new Typeset(types): Typeset
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`types`

</td>
<td>

[`TypesetTypes`](typeset.md#typesettypes)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Typeset`](typeset.md#typeset)

#### Properties

##### embeds

```ts
embeds: Types<EmbedType>;
```

##### formats

```ts
formats: Types<FormatType>;
```

##### lines

```ts
lines: Types<LineType>;
```

##### embed()

```ts
static embed: (type) => EmbedType;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`EmbedType`](typeset.md#embedtype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EmbedType`](typeset.md#embedtype)

##### format()

```ts
static format: (type) => FormatType;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`FormatType`](typeset.md#formattype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`FormatType`](typeset.md#formattype)

##### line()

```ts
static line: (type) => LineType;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`LineType`](typeset.md#linetype)

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineType`](typeset.md#linetype)

## Interfaces

### BasicType

#### Extended by

- [`FormatType`](typeset.md#formattype)
- [`EmbedType`](typeset.md#embedtype)
- [`LineType`](typeset.md#linetype)

#### Properties

##### commands()?

```ts
optional commands: (editor) => Function | Commands;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`Function` \| [`Commands`](typeset.md#commands-1)

##### fromDom?

```ts
optional fromDom: false | FromDom;
```

##### name

```ts
name: string;
```

##### render?

```ts
optional render: Renderer;
```

##### selector

```ts
selector: string;
```

##### shortcuts?

```ts
optional shortcuts: string | Shortcuts;
```

##### styleSelector?

```ts
optional styleSelector: string;
```

***

### Commands

#### Indexable

 \[`name`: `string`\]: (...`args`) => `any`

***

### EmbedType

#### Extends

- [`BasicType`](typeset.md#basictype)

#### Properties

##### commands()?

```ts
optional commands: (editor) => Function | Commands;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`Function` \| [`Commands`](typeset.md#commands-1)

###### Inherited from

[`BasicType`](typeset.md#basictype).[`commands`](typeset.md#commands)

##### fromDom?

```ts
optional fromDom: false | FromDom;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`fromDom`](typeset.md#fromdom)

##### name

```ts
name: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`name`](typeset.md#name)

##### noFill?

```ts
optional noFill: boolean;
```

##### render?

```ts
optional render: Renderer;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`render`](typeset.md#render)

##### selector

```ts
selector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`selector`](typeset.md#selector-1)

##### shortcuts?

```ts
optional shortcuts: string | Shortcuts;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`shortcuts`](typeset.md#shortcuts)

##### styleSelector?

```ts
optional styleSelector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`styleSelector`](typeset.md#styleselector)

***

### FormatType

#### Extends

- [`BasicType`](typeset.md#basictype)

#### Properties

##### commands()?

```ts
optional commands: (editor) => Function | Commands;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`Function` \| [`Commands`](typeset.md#commands-1)

###### Inherited from

[`BasicType`](typeset.md#basictype).[`commands`](typeset.md#commands)

##### fromDom?

```ts
optional fromDom: false | FromDom;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`fromDom`](typeset.md#fromdom)

##### greedy?

```ts
optional greedy: boolean;
```

##### name

```ts
name: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`name`](typeset.md#name)

##### render?

```ts
optional render: Renderer;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`render`](typeset.md#render)

##### selector

```ts
selector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`selector`](typeset.md#selector-1)

##### shortcuts?

```ts
optional shortcuts: string | Shortcuts;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`shortcuts`](typeset.md#shortcuts)

##### styleSelector?

```ts
optional styleSelector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`styleSelector`](typeset.md#styleselector)

***

### LineType

#### Extends

- [`BasicType`](typeset.md#basictype)

#### Properties

##### child?

```ts
optional child: boolean;
```

##### commands()?

```ts
optional commands: (editor) => Function | Commands;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`Function` \| [`Commands`](typeset.md#commands-1)

###### Inherited from

[`BasicType`](typeset.md#basictype).[`commands`](typeset.md#commands)

##### contained?

```ts
optional contained: boolean;
```

##### defaultFollows?

```ts
optional defaultFollows: boolean;
```

##### fromDom?

```ts
optional fromDom: false | FromDom;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`fromDom`](typeset.md#fromdom)

##### frozen?

```ts
optional frozen: boolean;
```

##### indentable?

```ts
optional indentable: boolean;
```

##### name

```ts
name: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`name`](typeset.md#name)

##### nextLineAttributes()?

```ts
optional nextLineAttributes: (attributes) => default;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/AttributeMap/index.md#default)

##### onEmptyEnter()?

```ts
optional onEmptyEnter: (editor, line) => boolean;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`line`

</td>
<td>

[`default`](../document/Line/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### onEnter()?

```ts
optional onEnter: (editor) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onTab()?

```ts
optional onTab: (editor, shiftKey) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`shiftKey`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### render?

```ts
optional render: Renderer;
```

###### Overrides

[`BasicType`](typeset.md#basictype).[`render`](typeset.md#render)

##### renderMultiple?

```ts
optional renderMultiple: MultiLineRenderer;
```

##### selector

```ts
selector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`selector`](typeset.md#selector-1)

##### shortcuts?

```ts
optional shortcuts: string | Shortcuts;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`shortcuts`](typeset.md#shortcuts)

##### shouldCombine?

```ts
optional shouldCombine: ShouldCombine;
```

##### styleSelector?

```ts
optional styleSelector: string;
```

###### Inherited from

[`BasicType`](typeset.md#basictype).[`styleSelector`](typeset.md#styleselector)

***

### TypeMap&lt;T&gt;

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`BasicType`](typeset.md#basictype)

</td>
<td>

[`BasicType`](typeset.md#basictype)

</td>
</tr>
</tbody>
</table>

#### Indexable

 \[`name`: `string`\]: `T`

***

### TypesetTypes

#### Properties

##### embeds?

```ts
optional embeds: (string | EmbedType)[];
```

##### formats?

```ts
optional formats: (string | FormatType)[];
```

##### lines?

```ts
optional lines: (string | LineType)[];
```

## Type Aliases

### FromDom()

```ts
type FromDom = (node) => any;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### LineData

```ts
type LineData = [default, VChild[], string];
```

***

### MultiLineRenderer()

```ts
type MultiLineRenderer = (lines, editor, forHTML?) => VNode;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`lines`

</td>
<td>

[`LineData`](typeset.md#linedata)[]

</td>
</tr>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`forHTML`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

### Renderer()

```ts
type Renderer = (attributes, children, line, editor, forHTML?) => VNode;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`children`

</td>
<td>

[`VChild`](../rendering/vdom.md#vchild)[]

</td>
</tr>
<tr>
<td>

`line`

</td>
<td>

[`default`](../document/Line/index.md#default)

</td>
</tr>
<tr>
<td>

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`forHTML`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

### ShouldCombine()

```ts
type ShouldCombine = (prev, next) => boolean;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`prev`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

## Functions

### embed()

```ts
function embed(type): EmbedType
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`EmbedType`](typeset.md#embedtype)

</td>
</tr>
</tbody>
</table>

#### Returns

[`EmbedType`](typeset.md#embedtype)

***

### format()

```ts
function format(type): FormatType
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`FormatType`](typeset.md#formattype)

</td>
</tr>
</tbody>
</table>

#### Returns

[`FormatType`](typeset.md#formattype)

***

### line()

```ts
function line(type): LineType
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

[`LineType`](typeset.md#linetype)

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineType`](typeset.md#linetype)
