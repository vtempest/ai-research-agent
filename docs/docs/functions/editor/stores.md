[Documentation](../modules.md) / editor/stores

## EditorStores

Defined in: editor/stores.ts:22

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

<a id="active"></a> `active`

</td>
<td>

[`Readable`](#readable)&lt;[`AttributeMap`](index.md#attributemap)&gt;

</td>
<td>

editor/stores.ts:23

</td>
</tr>
<tr>
<td>

<a id="doc"></a> `doc`

</td>
<td>

[`Readable`](#readable)&lt;[`default`](document/TextDocument.md#default)&gt;

</td>
<td>

editor/stores.ts:24

</td>
</tr>
<tr>
<td>

<a id="focus"></a> `focus`

</td>
<td>

[`Readable`](#readable)&lt;`boolean`&gt;

</td>
<td>

editor/stores.ts:27

</td>
</tr>
<tr>
<td>

<a id="root"></a> `root`

</td>
<td>

[`Readable`](#readable)&lt;`HTMLElement`&gt;

</td>
<td>

editor/stores.ts:26

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection`

</td>
<td>

[`Readable`](#readable)&lt;[`EditorRange`](document/EditorRange.md#editorrange)&gt;

</td>
<td>

editor/stores.ts:25

</td>
</tr>
</tbody>
</table>

### Methods

#### updateEditor()

```ts
updateEditor(editor: Editor): void;
```

Defined in: editor/stores.ts:28

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

`editor`

</td>
<td>

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

## Readable&lt;T&gt;

Defined in: editor/stores.ts:6

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

### Methods

#### get()

```ts
get(): T;
```

Defined in: editor/stores.ts:10

Return the current value.

##### Returns

`T`

#### subscribe()

```ts
subscribe(callback: Subscriber<T>): Unsubscriber;
```

Defined in: editor/stores.ts:15

Subscribe to changes with a callback. Returns an unsubscribe function.

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

`callback`

</td>
<td>

[`Subscriber`](#subscriber)&lt;`T`&gt;

</td>
</tr>
</tbody>
</table>

##### Returns

[`Unsubscriber`](#unsubscriber)

***

## Subscriber()&lt;T&gt;

```ts
type Subscriber<T> = (value: T) => void;
```

Defined in: editor/stores.ts:21

Callback to inform of a value updates.

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`value`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## Unsubscriber()

```ts
type Unsubscriber = () => void;
```

Defined in: editor/stores.ts:18

Unsubscribes from value updates.

### Returns

`void`

***

## activeStore()

```ts
function activeStore(editorStore: Readable<Editor>): Readable<AttributeMap>;
```

Defined in: editor/stores.ts:96

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;[`AttributeMap`](index.md#attributemap)&gt;

***

## derivedEditorStore()

```ts
function derivedEditorStore<T>(
   editorStore: Readable<Editor>, 
   defaultValue: T, 
   changeEvents: string[], 
   update: (editor: Editor) => T, 
   checkEquality?: boolean): Readable<T>;
```

Defined in: editor/stores.ts:54

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
<tr>
<td>

`defaultValue`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`changeEvents`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`update`

</td>
<td>

(`editor`: [`Editor`](Editor.md#editor)) => `T`

</td>
</tr>
<tr>
<td>

`checkEquality?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;`T`&gt;

***

## docStore()

```ts
function docStore(editorStore: Readable<Editor>): Readable<default>;
```

Defined in: editor/stores.ts:100

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;[`default`](document/TextDocument.md#default)&gt;

***

## editorStores()

```ts
function editorStores(editor: Editor): EditorStores;
```

Defined in: editor/stores.ts:31

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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

### Returns

[`EditorStores`](#editorstores)

***

## focusStore()

```ts
function focusStore(editorStore: Readable<Editor>): Readable<boolean>;
```

Defined in: editor/stores.ts:108

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;`boolean`&gt;

***

## rootStore()

```ts
function rootStore(editorStore: Readable<Editor>): Readable<HTMLElement>;
```

Defined in: editor/stores.ts:112

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;`HTMLElement`&gt;

***

## selectionStore()

```ts
function selectionStore(editorStore: Readable<Editor>): Readable<EditorRange>;
```

Defined in: editor/stores.ts:104

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

`editorStore`

</td>
<td>

[`Readable`](#readable)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

[`Readable`](#readable)&lt;[`EditorRange`](document/EditorRange.md#editorrange)&gt;
