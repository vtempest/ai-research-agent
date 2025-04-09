[ai-research-agent](../../modules.md) / editor/rendering/rendering

## Interfaces

### HTMLLineElement

#### Extends

- `HTMLElement`

#### Properties

##### key

```ts
key: string;
```

## Type Aliases

### Combined

```ts
type Combined = CombinedEntry[];
```

***

### CombinedEntry

```ts
type CombinedEntry = 
  | default
  | default[];
```

## Functions

### combineLines()

```ts
function combineLines(editor, lines): CombinedData
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`lines`

</td>
<td>

[`default`](../document/Line/index.md#default)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`CombinedData`

***

### getChangedRanges()

```ts
function getChangedRanges(oldC, newC): LineRanges
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

`oldC`

</td>
<td>

[`Combined`](rendering.md#combined)

</td>
</tr>
<tr>
<td>

`newC`

</td>
<td>

[`Combined`](rendering.md#combined)

</td>
</tr>
</tbody>
</table>

#### Returns

`LineRanges`

***

### getLineNodeEnd()

```ts
function getLineNodeEnd(root, node): number
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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
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

#### Returns

`number`

***

### getLineNodeStart()

```ts
function getLineNodeStart(root, node): number
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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
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

#### Returns

`number`

***

### render()

```ts
function render(editor, doc): void
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

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
</tbody>
</table>

#### Returns

`void`

***

### renderChanges()

```ts
function renderChanges(
   editor, 
   oldDoc, 
   newDoc): void
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`oldDoc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`newDoc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### renderCombined()

```ts
function renderCombined(
   editor, 
   combined, 
   forHTML?): VNode[]
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`combined`

</td>
<td>

[`Combined`](rendering.md#combined)

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

[`VNode`](vdom.md#vnode)[]

***

### renderDoc()

```ts
function renderDoc(
   editor, 
   doc, 
   forHTML?): VNode[]
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

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

`forHTML`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](vdom.md#vnode)[]

***

### renderInline()

```ts
function renderInline(
   editor, 
   line, 
   forHTML?): VChild[]
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

[`VChild`](vdom.md#vchild)[]

***

### renderLine()

```ts
function renderLine(
   editor, 
   line, 
   forHTML?): VNode
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

[`CombinedEntry`](rendering.md#combinedentry)

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

[`VNode`](vdom.md#vnode)

***

### renderMultiLine()

```ts
function renderMultiLine(
   editor, 
   lines, 
   forHTML?): VNode
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`lines`

</td>
<td>

[`default`](../document/Line/index.md#default)[]

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

[`VNode`](vdom.md#vnode)

***

### renderSingleLine()

```ts
function renderSingleLine(
   editor, 
   line, 
   forHTML?): VNode
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

[`VNode`](vdom.md#vnode)

***

### setLineNodesRanges()

```ts
function setLineNodesRanges(editor): void
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
