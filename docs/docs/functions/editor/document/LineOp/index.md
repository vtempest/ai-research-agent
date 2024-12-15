[ai-research-agent](../../../index.md) / editor/document/LineOp

## Index

### Namespaces

- [default](namespaces/default.md)

## Classes

### LineOpIterator

#### Constructors

##### new LineOpIterator()

```ts
new LineOpIterator(lines, lineIds?): LineOpIterator
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

`lines`

</td>
<td>

[`default`](../Line/index.md#default)[]

</td>
</tr>
<tr>
<td>

`lineIds`?

</td>
<td>

[`LineIds`](../Line/index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineOpIterator`](index.md#lineopiterator)

#### Methods

##### hasNext()

```ts
hasNext(): boolean
```

###### Returns

`boolean`

##### next()

```ts
next(length?): default
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

`length`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../../delta/Op/index.md#default)

##### nextLine()

```ts
nextLine(): default
```

###### Returns

[`default`](../Line/index.md#default)

##### peek()

```ts
peek(): default
```

###### Returns

[`default`](../../delta/Op/index.md#default)

##### peekLength()

```ts
peekLength(): number
```

###### Returns

`number`

##### peekLine()

```ts
peekLine(): default
```

###### Returns

[`default`](../Line/index.md#default)

##### peekLineLength()

```ts
peekLineLength(): number
```

###### Returns

`number`

##### peekType()

```ts
peekType(): string
```

###### Returns

`string`

##### restCurrentLine()

```ts
restCurrentLine(): default[]
```

###### Returns

[`default`](../../delta/Op/index.md#default)[]

##### restLines()

```ts
restLines(): default[]
```

###### Returns

[`default`](../Line/index.md#default)[]

#### Properties

##### lineIterator

```ts
lineIterator: LineIterator;
```

##### opIterator

```ts
opIterator: OpIterator;
```
