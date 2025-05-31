[Documentation](../../modules.md) / editor/document/TextChange

## default

Defined in: editor/document/TextChange.ts:6

### Extended by

- [`EditorTextChange`](../Editor.md#editortextchange)

### Constructors

#### Constructor

```ts
new default(
   doc: default, 
   delta: default, 
   selection?: EditorRange, 
   activeFormats?: AttributeMap): default;
```

Defined in: editor/document/TextChange.ts:13

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

`doc`

</td>
<td>

[`default`](TextDocument.md#default)

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
<tr>
<td>

`selection?`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`activeFormats?`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

### Properties

#### activeFormats?

```ts
optional activeFormats: AttributeMap;
```

Defined in: editor/document/TextChange.ts:11

#### delta

```ts
delta: default;
```

Defined in: editor/document/TextChange.ts:9

#### doc

```ts
doc: default;
```

Defined in: editor/document/TextChange.ts:8

#### selection?

```ts
optional selection: EditorRange;
```

Defined in: editor/document/TextChange.ts:10

### Accessors

#### contentChanged

##### Get Signature

```ts
get contentChanged(): boolean;
```

Defined in: editor/document/TextChange.ts:26

###### Returns

`boolean`

#### selectionChanged

##### Get Signature

```ts
get selectionChanged(): boolean;
```

Defined in: editor/document/TextChange.ts:30

###### Returns

`boolean`

### Methods

#### apply()

```ts
apply(): void;
```

Defined in: editor/document/TextChange.ts:37

##### Returns

`void`

#### clone()

```ts
clone(): default;
```

Defined in: editor/document/TextChange.ts:245

##### Returns

[`default`](#default)

#### delete()

```ts
delete(range: EditorRange, options?: object): default;
```

Defined in: editor/document/TextChange.ts:57

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

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### formatLine()

```ts
formatLine(
   range: number | EditorRange, 
   format: AttributeMap, 
   decoration?: boolean): default;
```

Defined in: editor/document/TextChange.ts:174

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

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`decoration?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### formatText()

```ts
formatText(range: EditorRange, format?: AttributeMap): default;
```

Defined in: editor/document/TextChange.ts:144

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

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### insert()

```ts
insert(
   at: number, 
   insert: string | object, 
   format?: AttributeMap, 
   options?: object): default;
```

Defined in: editor/document/TextChange.ts:76

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

`insert`

</td>
<td>

`string` \| `object`

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### insertContent()

```ts
insertContent(at: number, content: default): default;
```

Defined in: editor/document/TextChange.ts:120

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

`content`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### isFor()

```ts
isFor(doc: default): boolean;
```

Defined in: editor/document/TextChange.ts:241

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

`doc`

</td>
<td>

[`default`](TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean`

#### removeFormat()

```ts
removeFormat(range: EditorRange): default;
```

Defined in: editor/document/TextChange.ts:204

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

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### select()

```ts
select(at: number | EditorRange): default;
```

Defined in: editor/document/TextChange.ts:52

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

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### setActiveFormats()

```ts
setActiveFormats(activeFormats: AttributeMap): default;
```

Defined in: editor/document/TextChange.ts:47

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

`activeFormats`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### setDelta()

```ts
setDelta(delta: default): default;
```

Defined in: editor/document/TextChange.ts:41

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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### toggleLineFormat()

```ts
toggleLineFormat(range: number | EditorRange, format: AttributeMap): default;
```

Defined in: editor/document/TextChange.ts:195

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

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### toggleTextFormat()

```ts
toggleTextFormat(range: EditorRange, format: AttributeMap): default;
```

Defined in: editor/document/TextChange.ts:165

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

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### transform()

```ts
transform(change: default, priority?: boolean): default;
```

Defined in: editor/document/TextChange.ts:216

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

`change`

</td>
<td>

[`default`](#default)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### transformAgainst()

```ts
transformAgainst(delta: default | default, priority?: boolean): default;
```

Defined in: editor/document/TextChange.ts:234

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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default) \| [`default`](#default)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### transformSelection()

```ts
transformSelection(selection: EditorRange, priority?: boolean): EditorRange;
```

Defined in: editor/document/TextChange.ts:223

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

`selection`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorRange`](EditorRange.md#editorrange)

***

## hasFormat()

```ts
function hasFormat(format: AttributeMap, attributes: AttributeMap): boolean;
```

Defined in: editor/document/TextChange.ts:288

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

`format`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

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
</tbody>
</table>

### Returns

`boolean`

***

## intersect()

```ts
function intersect(value: object, other: object): object;
```

Defined in: editor/document/TextChange.ts:294

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

`object`

</td>
</tr>
<tr>
<td>

`other`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

### Returns

`object`
