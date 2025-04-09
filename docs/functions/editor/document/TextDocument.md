[ai-research-agent](../../modules.md) / editor/document/TextDocument

## Classes

### default

#### Accessors

##### change

###### Get Signature

```ts
get change(): default
```

###### Returns

[`default`](TextChange.md#default)

#### Constructors

##### new default()

```ts
new default(linesOrDocOrDelta?, selection?): default
```

###### Parameters

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

`linesOrDocOrDelta`?

</td>
<td>

 \| [`default`](../delta/Delta.md#default) \| [`default`](Line/index.md#default)[] \| [`default`](TextDocument.md#default)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`selection`?

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
<td>

`null`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextDocument.md#default)

#### Methods

##### apply()

```ts
apply(
   change, 
   selection?, 
   throwOnError?): default
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

 \| [`default`](../delta/Delta.md#default) \| [`default`](TextChange.md#default)

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

`throwOnError`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](TextDocument.md#default)

##### equals()

```ts
equals(other, options?): boolean
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

`other`

</td>
<td>

[`default`](TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `contentOnly`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.contentOnly`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### getFormats()

```ts
getFormats(at, options?): default
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
<tr>
<td>

`options`?

</td>
<td>

[`FormattingOptions`](TextDocument.md#formattingoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/AttributeMap/index.md#default)

##### getLineAt()

```ts
getLineAt(at): default
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
</tbody>
</table>

###### Returns

[`default`](Line/index.md#default)

##### getLineBy()

```ts
getLineBy(id): default
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

`id`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Line/index.md#default)

##### getLineFormat()

```ts
getLineFormat(at, options?): default
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
<tr>
<td>

`options`?

</td>
<td>

[`FormattingOptions`](TextDocument.md#formattingoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/AttributeMap/index.md#default)

##### getLineRange()

```ts
getLineRange(at): EditorRange
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

`string` \| `number` \| [`default`](Line/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorRange`](EditorRange.md#editorrange)

##### getLineRanges()

```ts
getLineRanges(at?): any[]
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

`at`?

</td>
<td>

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`any`[]

##### getLinesAt()

```ts
getLinesAt(atOrRange, encompassed?): default[]
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

`atOrRange`

</td>
<td>

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`encompassed`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Line/index.md#default)[]

##### getText()

```ts
getText(range?): string
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

`range`?

</td>
<td>

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### getTextFormat()

```ts
getTextFormat(at, options?): default
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
<tr>
<td>

`options`?

</td>
<td>

[`FormattingOptions`](TextDocument.md#formattingoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/AttributeMap/index.md#default)

##### replace()

```ts
replace(delta?, selection?): default
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

`delta`?

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
</tbody>
</table>

###### Returns

[`default`](TextDocument.md#default)

##### slice()

```ts
slice(start, end): default
```

###### Parameters

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

`start`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
</tr>
<tr>
<td>

`end`

</td>
<td>

`number`

</td>
<td>

`Infinity`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/Delta.md#default)

##### toDelta()

```ts
toDelta(): default
```

###### Returns

[`default`](../delta/Delta.md#default)

##### toJSON()

```ts
toJSON(): default
```

###### Returns

[`default`](../delta/Delta.md#default)

##### toString()

```ts
toString(): string
```

###### Returns

`string`

#### Properties

##### byId

```ts
byId: LineIds;
```

##### length

```ts
length: number;
```

##### lines

```ts
lines: default[];
```

##### selection

```ts
selection: EditorRange;
```

## Interfaces

### FormattingOptions

#### Properties

##### allFormats?

```ts
optional allFormats: boolean;
```

##### nameOnly?

```ts
optional nameOnly: boolean;
```
