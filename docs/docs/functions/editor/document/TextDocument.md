[Documentation](../../modules.md) / editor/document/TextDocument

## default

Defined in: editor/document/TextDocument.ts:18

### Constructors

#### Constructor

```ts
new default(linesOrDocOrDelta?: 
  | default
  | Line[]
  | default, selection?: EditorRange): default;
```

Defined in: editor/document/TextDocument.ts:25

##### Parameters

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

`linesOrDocOrDelta?`

</td>
<td>

 \| [`default`](../delta/Delta.md#default) \| [`Line`](../index.md#line)[] \| [`default`](#default)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`selection?`

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

##### Returns

[`default`](#default)

### Properties

#### byId

```ts
byId: LineIds;
```

Defined in: editor/document/TextDocument.ts:20

#### length

```ts
length: number;
```

Defined in: editor/document/TextDocument.ts:22

#### lines

```ts
lines: Line[];
```

Defined in: editor/document/TextDocument.ts:21

#### selection

```ts
selection: EditorRange;
```

Defined in: editor/document/TextDocument.ts:23

### Accessors

#### change

##### Get Signature

```ts
get change(): default;
```

Defined in: editor/document/TextDocument.ts:68

###### Returns

[`default`](TextChange.md#default)

### Methods

#### apply()

```ts
apply(
   change: 
  | default
  | default, 
   selection?: EditorRange, 
   throwOnError?: boolean): default;
```

Defined in: editor/document/TextDocument.ts:180

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

 \| [`default`](../delta/Delta.md#default) \| [`default`](TextChange.md#default)

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

`throwOnError?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### equals()

```ts
equals(other: default, options?: object): boolean;
```

Defined in: editor/document/TextDocument.ts:353

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

`other`

</td>
<td>

[`default`](#default)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `contentOnly?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.contentOnly?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean`

#### getFormats()

```ts
getFormats(at: number | EditorRange, options?: FormattingOptions): AttributeMap;
```

Defined in: editor/document/TextDocument.ts:153

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
<tr>
<td>

`options?`

</td>
<td>

[`FormattingOptions`](#formattingoptions)

</td>
</tr>
</tbody>
</table>

##### Returns

[`AttributeMap`](../index.md#attributemap)

#### getLineAt()

```ts
getLineAt(at: number): Line;
```

Defined in: editor/document/TextDocument.ts:85

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
</tbody>
</table>

##### Returns

[`Line`](../index.md#line)

#### getLineBy()

```ts
getLineBy(id: string): Line;
```

Defined in: editor/document/TextDocument.ts:81

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

`id`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Line`](../index.md#line)

#### getLineFormat()

```ts
getLineFormat(at: number | EditorRange, options?: FormattingOptions): AttributeMap;
```

Defined in: editor/document/TextDocument.ts:126

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
<tr>
<td>

`options?`

</td>
<td>

[`FormattingOptions`](#formattingoptions)

</td>
</tr>
</tbody>
</table>

##### Returns

[`AttributeMap`](../index.md#attributemap)

#### getLineRange()

```ts
getLineRange(at: string | number | Line): EditorRange;
```

Defined in: editor/document/TextDocument.ts:104

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

`string` \| `number` \| [`Line`](../index.md#line)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorRange`](EditorRange.md#editorrange)

#### getLineRanges()

```ts
getLineRanges(at?: number | EditorRange): any[];
```

Defined in: editor/document/TextDocument.ts:118

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

`at?`

</td>
<td>

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`any`[]

#### getLinesAt()

```ts
getLinesAt(atOrRange: number | EditorRange, encompassed?: boolean): Line[];
```

Defined in: editor/document/TextDocument.ts:92

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

`atOrRange`

</td>
<td>

`number` \| [`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`encompassed?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Line`](../index.md#line)[]

#### getText()

```ts
getText(range?: EditorRange): string;
```

Defined in: editor/document/TextDocument.ts:74

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

[`EditorRange`](EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

#### getTextFormat()

```ts
getTextFormat(at: number | EditorRange, options?: FormattingOptions): AttributeMap;
```

Defined in: editor/document/TextDocument.ts:136

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
<tr>
<td>

`options?`

</td>
<td>

[`FormattingOptions`](#formattingoptions)

</td>
</tr>
</tbody>
</table>

##### Returns

[`AttributeMap`](../index.md#attributemap)

#### replace()

```ts
replace(delta?: default, selection?: EditorRange): default;
```

Defined in: editor/document/TextDocument.ts:339

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

`delta?`

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
</tbody>
</table>

##### Returns

[`default`](#default)

#### slice()

```ts
slice(start: number, end: number): default;
```

Defined in: editor/document/TextDocument.ts:163

##### Parameters

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

##### Returns

[`default`](../delta/Delta.md#default)

#### toDelta()

```ts
toDelta(): default;
```

Defined in: editor/document/TextDocument.ts:343

##### Returns

[`default`](../delta/Delta.md#default)

#### toJSON()

```ts
toJSON(): default;
```

Defined in: editor/document/TextDocument.ts:361

##### Returns

[`default`](../delta/Delta.md#default)

#### toString()

```ts
toString(): string;
```

Defined in: editor/document/TextDocument.ts:365

##### Returns

`string`

***

## FormattingOptions

Defined in: editor/document/TextDocument.ts:13

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

<a id="allformats"></a> `allFormats?`

</td>
<td>

`boolean`

</td>
<td>

editor/document/TextDocument.ts:15

</td>
</tr>
<tr>
<td>

<a id="nameonly"></a> `nameOnly?`

</td>
<td>

`boolean`

</td>
<td>

editor/document/TextDocument.ts:14

</td>
</tr>
</tbody>
</table>
