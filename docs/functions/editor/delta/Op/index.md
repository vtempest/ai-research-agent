[ai-research-agent](../../../modules.md) / editor/delta/Op

## Index

### Namespaces

- [default](namespaces/default.md)

## Classes

### OpIterator

#### Constructors

##### new OpIterator()

```ts
new OpIterator(ops): OpIterator
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

`ops`

</td>
<td>

[`default`](index.md#default)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`OpIterator`](index.md#opiterator)

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

##### peekType()

```ts
peekType(): string
```

###### Returns

`string`

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

##### offset

```ts
offset: number;
```

##### ops

```ts
ops: default[];
```

## Interfaces

### default

#### Properties

##### attributes?

```ts
optional attributes: default;
```

##### delete?

```ts
optional delete: number;
```

##### insert?

```ts
optional insert: string | Record<string, any>;
```

##### retain?

```ts
optional retain: number;
```
