[ai-research-agent](../../../index.md) / editor/document/Line

## Index

### Namespaces

- [default](namespaces/default.md)

## Classes

### LineIterator

#### Constructors

##### new LineIterator()

```ts
new LineIterator(lines, lineIds?): LineIterator
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

[`default`](index.md#default)[]

</td>
</tr>
<tr>
<td>

`lineIds`?

</td>
<td>

[`LineIds`](index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`LineIterator`](index.md#lineiterator)

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

[`default`](index.md#default)

##### peek()

```ts
peek(): default
```

###### Returns

[`default`](index.md#default)

##### peekLength()

```ts
peekLength(): number
```

###### Returns

`number`

##### rest()

```ts
rest(): default[]
```

###### Returns

[`default`](index.md#default)[]

#### Properties

##### index

```ts
index: number;
```

##### lineIds

```ts
lineIds: LineIds;
```

##### lines

```ts
lines: default[];
```

##### offset

```ts
offset: number;
```

## Interfaces

### default

#### Properties

##### attributes

```ts
attributes: default;
```

##### content

```ts
content: default;
```

##### id

```ts
id: string;
```

##### length

```ts
length: number;
```

## Type Aliases

### LineIds

```ts
type LineIds: Map<string, default>;
```

***

### LineRanges

```ts
type LineRanges: Map<default, any>;
```
