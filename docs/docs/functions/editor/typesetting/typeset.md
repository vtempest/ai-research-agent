[Documentation](../../modules.md) / editor/typesetting/typeset

## Types&lt;T&gt;

Defined in: editor/typesetting/typeset.ts:144

A type store to hold types and make it easy to manage them.

### Type Parameters

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

`T` *extends* [`BasicType`](#basictype)

</td>
<td>

[`BasicType`](#basictype)

</td>
</tr>
</tbody>
</table>

### Constructors

#### Constructor

```ts
new Types<T>(types: T[]): Types<T>;
```

Defined in: editor/typesetting/typeset.ts:157

##### Parameters

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

##### Returns

[`Types`](#types)&lt;`T`&gt;

### Properties

#### list

```ts
list: T[];
```

Defined in: editor/typesetting/typeset.ts:146

#### priorities

```ts
priorities: object;
```

Defined in: editor/typesetting/typeset.ts:155

##### Index Signature

```ts
[name: string]: number
```

#### selector

```ts
selector: string;
```

Defined in: editor/typesetting/typeset.ts:149

#### types

```ts
types: TypeMap<T>;
```

Defined in: editor/typesetting/typeset.ts:152

### Accessors

#### default

##### Get Signature

```ts
get default(): T;
```

Defined in: editor/typesetting/typeset.ts:162

###### Returns

`T`

### Methods

#### add()

```ts
add(type: T): void;
```

Defined in: editor/typesetting/typeset.ts:184

##### Parameters

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

##### Returns

`void`

#### findByAttributes()

##### Call Signature

```ts
findByAttributes(attributes: AttributeMap, fallbackToDefault: true): T;
```

Defined in: editor/typesetting/typeset.ts:230

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

[`AttributeMap`](../index.md#attributemap)

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

##### Call Signature

```ts
findByAttributes(attributes: AttributeMap, fallbackToDefault?: boolean): T;
```

Defined in: editor/typesetting/typeset.ts:231

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

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`fallbackToDefault?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

#### findByNode()

##### Call Signature

```ts
findByNode(node: Node, fallbackToDefault: true): T;
```

Defined in: editor/typesetting/typeset.ts:217

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

##### Call Signature

```ts
findByNode(node: Node, fallbackToDefault?: boolean): T;
```

Defined in: editor/typesetting/typeset.ts:218

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

`fallbackToDefault?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

#### get()

```ts
get(name: string): T;
```

Defined in: editor/typesetting/typeset.ts:195

##### Parameters

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

##### Returns

`T`

#### init()

```ts
init(): void;
```

Defined in: editor/typesetting/typeset.ts:166

##### Returns

`void`

#### matches()

```ts
matches(node: Node): boolean;
```

Defined in: editor/typesetting/typeset.ts:208

##### Parameters

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

##### Returns

`boolean`

#### priority()

```ts
priority(name: string): number;
```

Defined in: editor/typesetting/typeset.ts:199

##### Parameters

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

##### Returns

`number`

#### remove()

```ts
remove(type: string | T): void;
```

Defined in: editor/typesetting/typeset.ts:189

##### Parameters

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

##### Returns

`void`

***

## Typeset

Defined in: editor/typesetting/typeset.ts:11

### Constructors

#### Constructor

```ts
new Typeset(types: TypesetTypes): Typeset;
```

Defined in: editor/typesetting/typeset.ts:20

##### Parameters

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

[`TypesetTypes`](#typesettypes)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Typeset`](#typeset)

### Properties

#### embeds

```ts
embeds: Types<EmbedType>;
```

Defined in: editor/typesetting/typeset.ts:14

#### formats

```ts
formats: Types<FormatType>;
```

Defined in: editor/typesetting/typeset.ts:13

#### lines

```ts
lines: Types<LineType>;
```

Defined in: editor/typesetting/typeset.ts:12

#### embed()

```ts
static embed: (type: EmbedType) => EmbedType;
```

Defined in: editor/typesetting/typeset.ts:18

##### Parameters

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

[`EmbedType`](#embedtype)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EmbedType`](#embedtype)

#### format()

```ts
static format: (type: FormatType) => FormatType;
```

Defined in: editor/typesetting/typeset.ts:17

##### Parameters

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

[`FormatType`](#formattype)

</td>
</tr>
</tbody>
</table>

##### Returns

[`FormatType`](#formattype)

#### line()

```ts
static line: (type: LineType) => LineType;
```

Defined in: editor/typesetting/typeset.ts:16

##### Parameters

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

[`LineType`](#linetype)

</td>
</tr>
</tbody>
</table>

##### Returns

[`LineType`](#linetype)

***

## BasicType

Defined in: editor/typesetting/typeset.ts:61

### Extended by

- [`FormatType`](#formattype)
- [`EmbedType`](#embedtype)
- [`LineType`](#linetype)

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="commands"></a> `commands?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor)) => `Function` \| [`Commands`](#commands-1)

</td>
<td>

editor/typesetting/typeset.ts:74

</td>
</tr>
<tr>
<td>

<a id="fromdom"></a> `fromDom?`

</td>
<td>

`false` \| [`FromDom`](#fromdom-4)

</td>
<td>

editor/typesetting/typeset.ts:72

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

editor/typesetting/typeset.ts:63

</td>
</tr>
<tr>
<td>

<a id="render"></a> `render?`

</td>
<td>

[`Renderer`](#renderer)

</td>
<td>

editor/typesetting/typeset.ts:80

</td>
</tr>
<tr>
<td>

<a id="selector-1"></a> `selector`

</td>
<td>

`string`

</td>
<td>

editor/typesetting/typeset.ts:66

</td>
</tr>
<tr>
<td>

<a id="shortcuts"></a> `shortcuts?`

</td>
<td>

`string` \| [`Shortcuts`](../Editor.md#shortcuts-2)

</td>
<td>

editor/typesetting/typeset.ts:77

</td>
</tr>
<tr>
<td>

<a id="styleselector"></a> `styleSelector?`

</td>
<td>

`string`

</td>
<td>

editor/typesetting/typeset.ts:69

</td>
</tr>
</tbody>
</table>

***

## Commands

Defined in: editor/typesetting/typeset.ts:56

### Indexable

```ts
[name: string]: (...args: any[]) => any
```

***

## EmbedType

Defined in: editor/typesetting/typeset.ts:87

### Extends

- [`BasicType`](#basictype)

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="commands-2"></a> `commands?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor)) => `Function` \| [`Commands`](#commands-1)

</td>
<td>

[`BasicType`](#basictype).[`commands`](#commands)

</td>
<td>

editor/typesetting/typeset.ts:74

</td>
</tr>
<tr>
<td>

<a id="fromdom-1"></a> `fromDom?`

</td>
<td>

`false` \| [`FromDom`](#fromdom-4)

</td>
<td>

[`BasicType`](#basictype).[`fromDom`](#fromdom)

</td>
<td>

editor/typesetting/typeset.ts:72

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`name`](#name)

</td>
<td>

editor/typesetting/typeset.ts:63

</td>
</tr>
<tr>
<td>

<a id="nofill"></a> `noFill?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:89

</td>
</tr>
<tr>
<td>

<a id="render-1"></a> `render?`

</td>
<td>

[`Renderer`](#renderer)

</td>
<td>

[`BasicType`](#basictype).[`render`](#render)

</td>
<td>

editor/typesetting/typeset.ts:80

</td>
</tr>
<tr>
<td>

<a id="selector-2"></a> `selector`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`selector`](#selector-1)

</td>
<td>

editor/typesetting/typeset.ts:66

</td>
</tr>
<tr>
<td>

<a id="shortcuts-1"></a> `shortcuts?`

</td>
<td>

`string` \| [`Shortcuts`](../Editor.md#shortcuts-2)

</td>
<td>

[`BasicType`](#basictype).[`shortcuts`](#shortcuts)

</td>
<td>

editor/typesetting/typeset.ts:77

</td>
</tr>
<tr>
<td>

<a id="styleselector-1"></a> `styleSelector?`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`styleSelector`](#styleselector)

</td>
<td>

editor/typesetting/typeset.ts:69

</td>
</tr>
</tbody>
</table>

***

## FormatType

Defined in: editor/typesetting/typeset.ts:83

### Extends

- [`BasicType`](#basictype)

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="commands-3"></a> `commands?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor)) => `Function` \| [`Commands`](#commands-1)

</td>
<td>

[`BasicType`](#basictype).[`commands`](#commands)

</td>
<td>

editor/typesetting/typeset.ts:74

</td>
</tr>
<tr>
<td>

<a id="fromdom-2"></a> `fromDom?`

</td>
<td>

`false` \| [`FromDom`](#fromdom-4)

</td>
<td>

[`BasicType`](#basictype).[`fromDom`](#fromdom)

</td>
<td>

editor/typesetting/typeset.ts:72

</td>
</tr>
<tr>
<td>

<a id="greedy"></a> `greedy?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:84

</td>
</tr>
<tr>
<td>

<a id="name-2"></a> `name`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`name`](#name)

</td>
<td>

editor/typesetting/typeset.ts:63

</td>
</tr>
<tr>
<td>

<a id="render-2"></a> `render?`

</td>
<td>

[`Renderer`](#renderer)

</td>
<td>

[`BasicType`](#basictype).[`render`](#render)

</td>
<td>

editor/typesetting/typeset.ts:80

</td>
</tr>
<tr>
<td>

<a id="selector-3"></a> `selector`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`selector`](#selector-1)

</td>
<td>

editor/typesetting/typeset.ts:66

</td>
</tr>
<tr>
<td>

<a id="shortcuts-2"></a> `shortcuts?`

</td>
<td>

`string` \| [`Shortcuts`](../Editor.md#shortcuts-2)

</td>
<td>

[`BasicType`](#basictype).[`shortcuts`](#shortcuts)

</td>
<td>

editor/typesetting/typeset.ts:77

</td>
</tr>
<tr>
<td>

<a id="styleselector-2"></a> `styleSelector?`

</td>
<td>

`string`

</td>
<td>

[`BasicType`](#basictype).[`styleSelector`](#styleselector)

</td>
<td>

editor/typesetting/typeset.ts:69

</td>
</tr>
</tbody>
</table>

***

## LineType

Defined in: editor/typesetting/typeset.ts:92

### Extends

- [`BasicType`](#basictype)

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Overrides</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="child"></a> `child?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:98

</td>
</tr>
<tr>
<td>

<a id="commands-4"></a> `commands?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor)) => `Function` \| [`Commands`](#commands-1)

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`commands`](#commands)

</td>
<td>

editor/typesetting/typeset.ts:74

</td>
</tr>
<tr>
<td>

<a id="contained"></a> `contained?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:107

</td>
</tr>
<tr>
<td>

<a id="defaultfollows"></a> `defaultFollows?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:101

</td>
</tr>
<tr>
<td>

<a id="fromdom-3"></a> `fromDom?`

</td>
<td>

`false` \| [`FromDom`](#fromdom-4)

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`fromDom`](#fromdom)

</td>
<td>

editor/typesetting/typeset.ts:72

</td>
</tr>
<tr>
<td>

<a id="frozen"></a> `frozen?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:104

</td>
</tr>
<tr>
<td>

<a id="indentable"></a> `indentable?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:94

</td>
</tr>
<tr>
<td>

<a id="name-3"></a> `name`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`name`](#name)

</td>
<td>

editor/typesetting/typeset.ts:63

</td>
</tr>
<tr>
<td>

<a id="nextlineattributes"></a> `nextLineAttributes?`

</td>
<td>

(`attributes`: [`AttributeMap`](../index.md#attributemap)) => [`AttributeMap`](../index.md#attributemap)

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:116

</td>
</tr>
<tr>
<td>

<a id="onemptyenter"></a> `onEmptyEnter?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor), `line`: [`Line`](../index.md#line)) => `boolean`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:120

</td>
</tr>
<tr>
<td>

<a id="onenter"></a> `onEnter?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor)) => `void`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:110

</td>
</tr>
<tr>
<td>

<a id="ontab"></a> `onTab?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor), `shiftKey`: `boolean`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:113

</td>
</tr>
<tr>
<td>

<a id="render-3"></a> `render?`

</td>
<td>

[`Renderer`](#renderer)

</td>
<td>

[`BasicType`](#basictype).[`render`](#render)

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:123

</td>
</tr>
<tr>
<td>

<a id="rendermultiple"></a> `renderMultiple?`

</td>
<td>

[`MultiLineRenderer`](#multilinerenderer)

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:126

</td>
</tr>
<tr>
<td>

<a id="selector-4"></a> `selector`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`selector`](#selector-1)

</td>
<td>

editor/typesetting/typeset.ts:66

</td>
</tr>
<tr>
<td>

<a id="shortcuts-3"></a> `shortcuts?`

</td>
<td>

`string` \| [`Shortcuts`](../Editor.md#shortcuts-2)

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`shortcuts`](#shortcuts)

</td>
<td>

editor/typesetting/typeset.ts:77

</td>
</tr>
<tr>
<td>

<a id="shouldcombine"></a> `shouldCombine?`

</td>
<td>

[`ShouldCombine`](#shouldcombine-1)

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

editor/typesetting/typeset.ts:128

</td>
</tr>
<tr>
<td>

<a id="styleselector-3"></a> `styleSelector?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[`BasicType`](#basictype).[`styleSelector`](#styleselector)

</td>
<td>

editor/typesetting/typeset.ts:69

</td>
</tr>
</tbody>
</table>

***

## TypeMap&lt;T&gt;

Defined in: editor/typesetting/typeset.ts:137

### Type Parameters

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

`T` *extends* [`BasicType`](#basictype)

</td>
<td>

[`BasicType`](#basictype)

</td>
</tr>
</tbody>
</table>

### Indexable

```ts
[name: string]: T
```

***

## TypesetTypes

Defined in: editor/typesetting/typeset.ts:131

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="embeds-1"></a> `embeds?`

</td>
<td>

(`string` \| [`EmbedType`](#embedtype))[]

</td>
<td>

editor/typesetting/typeset.ts:134

</td>
</tr>
<tr>
<td>

<a id="formats-1"></a> `formats?`

</td>
<td>

(`string` \| [`FormatType`](#formattype))[]

</td>
<td>

editor/typesetting/typeset.ts:133

</td>
</tr>
<tr>
<td>

<a id="lines-1"></a> `lines?`

</td>
<td>

(`string` \| [`LineType`](#linetype))[]

</td>
<td>

editor/typesetting/typeset.ts:132

</td>
</tr>
</tbody>
</table>

***

## FromDom()

```ts
type FromDom = (node: HTMLElement) => any;
```

Defined in: editor/typesetting/typeset.ts:45

### Parameters

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

### Returns

`any`

***

## LineData

```ts
type LineData = [AttributeMap, VChild[], string];
```

Defined in: editor/typesetting/typeset.ts:46

***

## MultiLineRenderer()

```ts
type MultiLineRenderer = (lines: LineData[], editor: Editor, forHTML?: boolean) => VNode;
```

Defined in: editor/typesetting/typeset.ts:54

### Parameters

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

[`LineData`](#linedata)[]

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

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

## Renderer()

```ts
type Renderer = (attributes: AttributeMap, children: VChild[], line: Line, editor: Editor, forHTML?: boolean) => VNode;
```

Defined in: editor/typesetting/typeset.ts:47

### Parameters

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

[`AttributeMap`](../index.md#attributemap)

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

[`Line`](../index.md#line)

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

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

## ShouldCombine()

```ts
type ShouldCombine = (prev: AttributeMap, next: AttributeMap) => boolean;
```

Defined in: editor/typesetting/typeset.ts:55

### Parameters

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

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## embed()

```ts
function embed(type: EmbedType): EmbedType;
```

Defined in: editor/typesetting/typeset.ts:41

### Parameters

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

[`EmbedType`](#embedtype)

</td>
</tr>
</tbody>
</table>

### Returns

[`EmbedType`](#embedtype)

***

## format()

```ts
function format(type: FormatType): FormatType;
```

Defined in: editor/typesetting/typeset.ts:37

### Parameters

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

[`FormatType`](#formattype)

</td>
</tr>
</tbody>
</table>

### Returns

[`FormatType`](#formattype)

***

## line()

```ts
function line(type: LineType): LineType;
```

Defined in: editor/typesetting/typeset.ts:32

### Parameters

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

[`LineType`](#linetype)

</td>
</tr>
</tbody>
</table>

### Returns

[`LineType`](#linetype)
