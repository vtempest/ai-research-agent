[ai-research-agent](../../index.md) / editor/rendering/html

## Functions

### cleanText()

```ts
function cleanText(delta): void
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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### deltaFromDom()

```ts
function deltaFromDom(editor, options): default
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`FromDomOptions`](html.md#fromdomoptions)

</td>
<td>

`defaultOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../delta/Delta.md#default)

***

### deltaFromHTML()

```ts
function deltaFromHTML(
   editor, 
   html, 
   options?): default
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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`DeltaFromHTMLOptions`](html.md#deltafromhtmloptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../delta/Delta.md#default)

***

### docFromDom()

```ts
function docFromDom(editor, root): default
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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../document/TextDocument.md#default)

***

### docFromHTML()

```ts
function docFromHTML(
   editor, 
   html, 
   selection?): default
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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`selection`?

</td>
<td>

`null` \| [`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../document/TextDocument.md#default)

***

### docToHTML()

```ts
function docToHTML(editor, doc): string
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

`string`

***

### fromNode()

```ts
function fromNode(editor, dom): undefined | default | default[]
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

`dom`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| [`default`](../document/Line/index.md#default) \| [`default`](../document/Line/index.md#default)[]

***

### inlineToHTML()

```ts
function inlineToHTML(editor, delta): string
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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### isBRPlaceholder()

```ts
function isBRPlaceholder(editor, node): boolean
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

`node`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

## Interfaces

### DeltaFromHTMLOptions

#### Properties

##### collapseWhitespace?

```ts
optional collapseWhitespace: boolean;
```

##### possiblePartial?

```ts
optional possiblePartial: boolean;
```

***

### FromDomOptions

#### Properties

##### collapseWhitespace?

```ts
optional collapseWhitespace: boolean;
```

##### endNode?

```ts
optional endNode: Node;
```

##### includeIds?

```ts
optional includeIds: boolean;
```

##### offset?

```ts
optional offset: number;
```

##### possiblePartial?

```ts
optional possiblePartial: boolean;
```

##### root?

```ts
optional root: HTMLElement;
```

##### startNode?

```ts
optional startNode: Node;
```

## Variables

### BLOCK\_ELEMENTS

```ts
const BLOCK_ELEMENTS: "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video" = 'address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video';
```
