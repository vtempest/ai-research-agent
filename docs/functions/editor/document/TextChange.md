[ai-research-agent](../../modules.md) / editor/document/TextChange

## Functions

### hasFormat()

```ts
function hasFormat(format, attributes): boolean
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

`format`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
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

#### Returns

`boolean`

***

### intersect()

```ts
function intersect(value, other): object
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

#### Returns

`object`

## Classes

### default

#### Extended by

- [`EditorTextChange`](../Editor.md#editortextchange)

#### Accessors

##### contentChanged

###### Get Signature

```ts
get contentChanged(): boolean
```

###### Returns

`boolean`

##### selectionChanged

###### Get Signature

```ts
get selectionChanged(): boolean
```

###### Returns

`boolean`

#### Constructors

##### new default()

```ts
new default(
   doc, 
   delta, 
   selection?, 
   activeFormats?): default
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

`selection`?

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`activeFormats`?

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

#### Methods

##### apply()

```ts
apply(): void
```

###### Returns

`void`

##### clone()

```ts
clone(): default
```

###### Returns

[`default`](TextChange.md#default)

##### delete()

```ts
delete(range, options?): default
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

`range`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### formatLine()

```ts
formatLine(
   range, 
   format, 
   decoration?): default
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

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`decoration`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### formatText()

```ts
formatText(range, format?): default
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

`range`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`?

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### insert()

```ts
insert(
   at, 
   insert, 
   format?, 
   options?): default
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

`format`?

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### insertContent()

```ts
insertContent(at, content): default
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

###### Returns

[`default`](TextChange.md#default)

##### isFor()

```ts
isFor(doc): boolean
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

`doc`

</td>
<td>

[`default`](TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### removeFormat()

```ts
removeFormat(range): default
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

`range`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### select()

```ts
select(at): default
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

`at`

</td>
<td>

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### setActiveFormats()

```ts
setActiveFormats(activeFormats): default
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

`activeFormats`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### setDelta()

```ts
setDelta(delta): default
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

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### toggleLineFormat()

```ts
toggleLineFormat(range, format): default
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

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### toggleTextFormat()

```ts
toggleTextFormat(range, format): default
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

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### transform()

```ts
transform(change, priority?): default
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

`change`

</td>
<td>

[`default`](TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### transformAgainst()

```ts
transformAgainst(delta, priority?): default
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

`delta`

</td>
<td>

 \| [`default`](../delta/Delta.md#default) \| [`default`](TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextChange.md#default)

##### transformSelection()

```ts
transformSelection(selection, priority?): EditorRange
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

`selection`

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorRange`](EditorRange.md#editorrange)

#### Properties

##### activeFormats?

```ts
optional activeFormats: default;
```

##### delta

```ts
delta: default;
```

##### doc

```ts
doc: default;
```

##### selection?

```ts
optional selection: EditorRange;
```
