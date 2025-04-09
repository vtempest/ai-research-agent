[ai-research-agent](../modules.md) / editor/stores

## Interfaces

### EditorStores

#### Properties

##### active

```ts
active: Readable<default>;
```

##### doc

```ts
doc: Readable<default>;
```

##### focus

```ts
focus: Readable<boolean>;
```

##### root

```ts
root: Readable<HTMLElement>;
```

##### selection

```ts
selection: Readable<EditorRange>;
```

#### Methods

##### updateEditor()

```ts
updateEditor(editor): void
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

***

### Readable&lt;T&gt;

#### Type Parameters

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

#### Methods

##### get()

```ts
get(): T
```

Return the current value.

###### Returns

`T`

##### subscribe()

```ts
subscribe(callback): Unsubscriber
```

Subscribe to changes with a callback. Returns an unsubscribe function.

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

`callback`

</td>
<td>

[`Subscriber`](stores.md#subscribert)&lt;`T`&gt;

</td>
</tr>
</tbody>
</table>

###### Returns

[`Unsubscriber`](stores.md#unsubscriber)

## Type Aliases

### Subscriber()&lt;T&gt;

```ts
type Subscriber<T> = (value) => void;
```

Callback to inform of a value updates.

#### Type Parameters

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

`value`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### Unsubscriber()

```ts
type Unsubscriber = () => void;
```

Unsubscribes from value updates.

#### Returns

`void`

## Functions

### activeStore()

```ts
function activeStore(editorStore): Readable<default>
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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;[`default`](delta/AttributeMap/index.md#default)&gt;

***

### derivedEditorStore()

```ts
function derivedEditorStore<T>(
   editorStore, 
   defaultValue, 
   changeEvents, 
   update, 
   checkEquality?): Readable<T>
```

#### Type Parameters

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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

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

(`editor`) => `T`

</td>
</tr>
<tr>
<td>

`checkEquality`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;`T`&gt;

***

### docStore()

```ts
function docStore(editorStore): Readable<default>
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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;[`default`](document/TextDocument.md#default)&gt;

***

### editorStores()

```ts
function editorStores(editor): EditorStores
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

[`EditorStores`](stores.md#editorstores)

***

### focusStore()

```ts
function focusStore(editorStore): Readable<boolean>
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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;`boolean`&gt;

***

### rootStore()

```ts
function rootStore(editorStore): Readable<HTMLElement>
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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;`HTMLElement`&gt;

***

### selectionStore()

```ts
function selectionStore(editorStore): Readable<EditorRange>
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

`editorStore`

</td>
<td>

[`Readable`](stores.md#readablet)&lt;[`Editor`](Editor.md#editor)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

[`Readable`](stores.md#readablet)&lt;[`EditorRange`](document/EditorRange.md#editorrange)&gt;
