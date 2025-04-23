[Documentation](../../modules.md) / editor/rendering/html

## DeltaFromHTMLOptions

Defined in: editor/rendering/html.ts:19

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

<a id="collapsewhitespace"></a> `collapseWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/html.ts:21

</td>
</tr>
<tr>
<td>

<a id="possiblepartial"></a> `possiblePartial?`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/html.ts:20

</td>
</tr>
</tbody>
</table>

***

## FromDomOptions

Defined in: editor/rendering/html.ts:24

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

<a id="collapsewhitespace-1"></a> `collapseWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/html.ts:31

</td>
</tr>
<tr>
<td>

<a id="endnode"></a> `endNode?`

</td>
<td>

`Node`

</td>
<td>

editor/rendering/html.ts:27

</td>
</tr>
<tr>
<td>

<a id="includeids"></a> `includeIds?`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/html.ts:30

</td>
</tr>
<tr>
<td>

<a id="offset"></a> `offset?`

</td>
<td>

`number`

</td>
<td>

editor/rendering/html.ts:28

</td>
</tr>
<tr>
<td>

<a id="possiblepartial-1"></a> `possiblePartial?`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/html.ts:29

</td>
</tr>
<tr>
<td>

<a id="root"></a> `root?`

</td>
<td>

`HTMLElement`

</td>
<td>

editor/rendering/html.ts:25

</td>
</tr>
<tr>
<td>

<a id="startnode"></a> `startNode?`

</td>
<td>

`Node`

</td>
<td>

editor/rendering/html.ts:26

</td>
</tr>
</tbody>
</table>

***

## BLOCK\_ELEMENTS

```ts
const BLOCK_ELEMENTS: "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video" = 'address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video';
```

Defined in: editor/rendering/html.ts:9

***

## cleanText()

```ts
function cleanText(delta: default): void;
```

Defined in: editor/rendering/html.ts:90

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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## deltaFromDom()

```ts
function deltaFromDom(editor: Editor, options: FromDomOptions): default;
```

Defined in: editor/rendering/html.ts:99

### Parameters

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

[`FromDomOptions`](#fromdomoptions)

</td>
<td>

`defaultOptions`

</td>
</tr>
</tbody>
</table>

### Returns

[`default`](../delta/Delta.md#default)

***

## deltaFromHTML()

```ts
function deltaFromHTML(
   editor: Editor, 
   html: string, 
   options?: DeltaFromHTMLOptions): default;
```

Defined in: editor/rendering/html.ts:64

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

`options?`

</td>
<td>

[`DeltaFromHTMLOptions`](#deltafromhtmloptions)

</td>
</tr>
</tbody>
</table>

### Returns

[`default`](../delta/Delta.md#default)

***

## docFromDom()

```ts
function docFromDom(editor: Editor, root: HTMLElement): default;
```

Defined in: editor/rendering/html.ts:76

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

### Returns

[`default`](../document/TextDocument.md#default)

***

## docFromHTML()

```ts
function docFromHTML(
   editor: Editor, 
   html: string, 
   selection?: EditorRange): default;
```

Defined in: editor/rendering/html.ts:60

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

`selection?`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

### Returns

[`default`](../document/TextDocument.md#default)

***

## docToHTML()

```ts
function docToHTML(editor: Editor, doc: default): string;
```

Defined in: editor/rendering/html.ts:50

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

### Returns

`string`

***

## fromNode()

```ts
function fromNode(editor: Editor, dom: HTMLElement): Line | Line[];
```

Defined in: editor/rendering/html.ts:81

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

### Returns

[`Line`](../index.md#line) \| [`Line`](../index.md#line)[]

***

## inlineToHTML()

```ts
function inlineToHTML(editor: Editor, delta: default): string;
```

Defined in: editor/rendering/html.ts:54

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

### Returns

`string`

***

## isBRPlaceholder()

```ts
function isBRPlaceholder(editor: Editor, node: Node): boolean;
```

Defined in: editor/rendering/html.ts:35

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

### Returns

`boolean`
