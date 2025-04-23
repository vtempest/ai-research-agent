[Documentation](../../modules.md) / editor/document/LineOp

## LineOpIterator

Defined in: editor/document/LineOp.ts:16

### Constructors

#### Constructor

```ts
new LineOpIterator(lines: Line[], lineIds?: LineIds): LineOpIterator;
```

Defined in: editor/document/LineOp.ts:20

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
<tr>
<td>

`lineIds?`

</td>
<td>

[`LineIds`](Line.md#lineids-1)

</td>
</tr>
</tbody>
</table>

##### Returns

[`LineOpIterator`](#lineopiterator)

### Properties

#### lineIterator

```ts
lineIterator: LineIterator;
```

Defined in: editor/document/LineOp.ts:17

#### opIterator

```ts
opIterator: OpIterator;
```

Defined in: editor/document/LineOp.ts:18

### Methods

#### hasNext()

```ts
hasNext(): boolean;
```

Defined in: editor/document/LineOp.ts:26

##### Returns

`boolean`

#### next()

```ts
next(length?: number): Op;
```

Defined in: editor/document/LineOp.ts:30

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

`length?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Op`](../index.md#op)

#### nextLine()

```ts
nextLine(): Line;
```

Defined in: editor/document/LineOp.ts:38

##### Returns

[`Line`](../index.md#line)

#### peek()

```ts
peek(): Op;
```

Defined in: editor/document/LineOp.ts:45

##### Returns

[`Op`](../index.md#op)

#### peekLength()

```ts
peekLength(): number;
```

Defined in: editor/document/LineOp.ts:57

##### Returns

`number`

#### peekLine()

```ts
peekLine(): Line;
```

Defined in: editor/document/LineOp.ts:53

##### Returns

[`Line`](../index.md#line)

#### peekLineLength()

```ts
peekLineLength(): number;
```

Defined in: editor/document/LineOp.ts:65

##### Returns

`number`

#### peekType()

```ts
peekType(): string;
```

Defined in: editor/document/LineOp.ts:69

##### Returns

`string`

#### restCurrentLine()

```ts
restCurrentLine(): Op[];
```

Defined in: editor/document/LineOp.ts:79

##### Returns

[`Op`](../index.md#op)[]

#### restLines()

```ts
restLines(): Line[];
```

Defined in: editor/document/LineOp.ts:83

##### Returns

[`Line`](../index.md#line)[]

***

## default

Renames and re-exports [LineOp](../namespaces/LineOp.md)
