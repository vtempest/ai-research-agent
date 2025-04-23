[Documentation](../../modules.md) / editor/modules/decorations

## DecorateEvent

Defined in: editor/modules/decorations.ts:43

### Extends

- `Event`

### Constructors

#### Constructor

```ts
new DecorateEvent(type: string, init: DecorateEventInit): DecorateEvent;
```

Defined in: editor/modules/decorations.ts:49

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

`string`

</td>
</tr>
<tr>
<td>

`init`

</td>
<td>

[`DecorateEventInit`](#decorateeventinit)

</td>
</tr>
</tbody>
</table>

##### Returns

[`DecorateEvent`](#decorateevent)

##### Overrides

```ts
Event.constructor
```

### Properties

#### change?

```ts
optional change: default;
```

Defined in: editor/modules/decorations.ts:46

#### changedLines?

```ts
optional changedLines: Line[];
```

Defined in: editor/modules/decorations.ts:47

#### doc

```ts
doc: default;
```

Defined in: editor/modules/decorations.ts:45

#### old

```ts
old: default;
```

Defined in: editor/modules/decorations.ts:44

***

## Decorator

Defined in: editor/modules/decorations.ts:199

### Constructors

#### Constructor

```ts
new Decorator(
   name: string, 
   doc: default, 
   decoration: default, 
   apply: (name: string, updates: default) => void, 
   remove: (name: string) => void): Decorator;
```

Defined in: editor/modules/decorations.ts:207

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
<tr>
<td>

`doc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`apply`

</td>
<td>

(`name`: `string`, `updates`: [`default`](../delta/Delta.md#default)) => `void`

</td>
</tr>
<tr>
<td>

`remove`

</td>
<td>

(`name`: `string`) => `void`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

### Properties

#### change

```ts
change: default;
```

Defined in: editor/modules/decorations.ts:200

### Methods

#### apply()

```ts
apply(): void;
```

Defined in: editor/modules/decorations.ts:230

##### Returns

`void`

#### clear()

```ts
clear(range?: EditorRange): Decorator;
```

Defined in: editor/modules/decorations.ts:238

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

`range?`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### clearLine()

```ts
clearLine(value: string | number | Line): Decorator;
```

Defined in: editor/modules/decorations.ts:272

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

`value`

</td>
<td>

`string` \| `number` \| [`Line`](../index.md#line)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### clearLines()

```ts
clearLines(lines: Line[]): Decorator;
```

Defined in: editor/modules/decorations.ts:248

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

`lines`

</td>
<td>

[`Line`](../index.md#line)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### decorateLine()

```ts
decorateLine(range: number | EditorRange, decoration: Decorations): Decorator;
```

Defined in: editor/modules/decorations.ts:293

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

`range`

</td>
<td>

`number` \| [`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](#decorations)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### decorateText()

```ts
decorateText(range: EditorRange, decoration: Decorations): Decorator;
```

Defined in: editor/modules/decorations.ts:288

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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](#decorations)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### getDecoration()

```ts
getDecoration(): default;
```

Defined in: editor/modules/decorations.ts:226

##### Returns

[`default`](../delta/Delta.md#default)

#### hasDecorations()

```ts
hasDecorations(): boolean;
```

Defined in: editor/modules/decorations.ts:222

##### Returns

`boolean`

#### insertDecoration()

```ts
insertDecoration(at: number, decoration: Decorations): Decorator;
```

Defined in: editor/modules/decorations.ts:298

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

`at`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](#decorations)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Decorator`](#decorator)

#### invert()

```ts
invert(range?: EditorRange): default;
```

Defined in: editor/modules/decorations.ts:283

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

`range?`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](../delta/Delta.md#default)

#### remove()

```ts
remove(): void;
```

Defined in: editor/modules/decorations.ts:234

##### Returns

`void`

***

## DecorateEventInit

Defined in: editor/modules/decorations.ts:36

### Extends

- `EventInit`

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

<a id="change-2"></a> `change?`

</td>
<td>

[`default`](../document/TextChange.md#default)

</td>
<td>

editor/modules/decorations.ts:39

</td>
</tr>
<tr>
<td>

<a id="changedlines-1"></a> `changedLines?`

</td>
<td>

[`Line`](../index.md#line)[]

</td>
<td>

editor/modules/decorations.ts:40

</td>
</tr>
<tr>
<td>

<a id="doc-1"></a> `doc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/decorations.ts:38

</td>
</tr>
<tr>
<td>

<a id="old-1"></a> `old`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/decorations.ts:37

</td>
</tr>
</tbody>
</table>

***

## Decorations

Defined in: editor/modules/decorations.ts:30

### Indexable

```ts
[attributeName: string]: any
```

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

<a id="class"></a> `class?`

</td>
<td>

`string`

</td>
<td>

editor/modules/decorations.ts:31

</td>
</tr>
<tr>
<td>

<a id="style"></a> `style?`

</td>
<td>

`string`

</td>
<td>

editor/modules/decorations.ts:32

</td>
</tr>
</tbody>
</table>

***

## DecorationsModule

Defined in: editor/modules/decorations.ts:58

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="cleardecorations"></a> `clearDecorations`

</td>
<td>

`public`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/decorations.ts:63

</td>
</tr>
<tr>
<td>

<a id="doc-2"></a> `doc`

</td>
<td>

`readonly`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/decorations.ts:60

</td>
</tr>
<tr>
<td>

<a id="gatherdecorations"></a> `gatherDecorations`

</td>
<td>

`public`

</td>
<td>

(`change?`: [`default`](../document/TextChange.md#default), `changedLines?`: [`Line`](../index.md#line)[]) => `void`

</td>
<td>

editor/modules/decorations.ts:64

</td>
</tr>
<tr>
<td>

<a id="getdecorator"></a> `getDecorator`

</td>
<td>

`public`

</td>
<td>

(`name`: `string`) => [`Decorator`](#decorator)

</td>
<td>

editor/modules/decorations.ts:61

</td>
</tr>
<tr>
<td>

<a id="old-2"></a> `old`

</td>
<td>

`readonly`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/decorations.ts:59

</td>
</tr>
<tr>
<td>

<a id="removedecorations"></a> `removeDecorations`

</td>
<td>

`public`

</td>
<td>

(`name`: `string`) => `boolean`

</td>
<td>

editor/modules/decorations.ts:62

</td>
</tr>
</tbody>
</table>

### Methods

#### destroy()

```ts
destroy(): void;
```

Defined in: editor/modules/decorations.ts:66

##### Returns

`void`

#### init()

```ts
init(): void;
```

Defined in: editor/modules/decorations.ts:65

##### Returns

`void`

***

## applyDecorations()

```ts
function applyDecorations(
   vnode: VNode, 
   attributes: AttributeMap, 
   defaultClasses?: string[]): VNode;
```

Defined in: editor/modules/decorations.ts:307

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

`vnode`

</td>
<td>

[`VNode`](../rendering/vdom.md#vnode)

</td>
</tr>
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

`defaultClasses?`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

## decorations()

```ts
function decorations(editor: Editor): DecorationsModule;
```

Defined in: editor/modules/decorations.ts:69

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

### Returns

[`DecorationsModule`](#decorationsmodule)
