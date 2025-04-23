[Documentation](../../modules.md) / editor/document/Line

## LineIterator

Defined in: editor/document/Line.ts:117

### Constructors

#### Constructor

```ts
new LineIterator(lines: Line[], lineIds?: LineIds): LineIterator;
```

Defined in: editor/document/Line.ts:123

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

[`LineIds`](#lineids-1)

</td>
</tr>
</tbody>
</table>

##### Returns

[`LineIterator`](#lineiterator)

### Properties

#### index

```ts
index: number;
```

Defined in: editor/document/Line.ts:119

#### lineIds

```ts
lineIds: LineIds;
```

Defined in: editor/document/Line.ts:121

#### lines

```ts
lines: Line[];
```

Defined in: editor/document/Line.ts:118

#### offset

```ts
offset: number;
```

Defined in: editor/document/Line.ts:120

### Methods

#### hasNext()

```ts
hasNext(): boolean;
```

Defined in: editor/document/Line.ts:130

##### Returns

`boolean`

#### next()

```ts
next(length?: number): Line;
```

Defined in: editor/document/Line.ts:134

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

[`Line`](../index.md#line)

#### peek()

```ts
peek(): Line;
```

Defined in: editor/document/Line.ts:167

##### Returns

[`Line`](../index.md#line)

#### peekLength()

```ts
peekLength(): number;
```

Defined in: editor/document/Line.ts:171

##### Returns

`number`

#### rest()

```ts
rest(): Line[];
```

Defined in: editor/document/Line.ts:180

##### Returns

[`Line`](../index.md#line)[]

***

## LineIds

```ts
type LineIds = Map<string, Line>;
```

Defined in: editor/document/Line.ts:12

***

## LineRanges

```ts
type LineRanges = Map<Line, any>;
```

Defined in: editor/document/Line.ts:11

***

## default

Renames and re-exports [Line](../index.md#line)
