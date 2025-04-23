[Documentation](../../modules.md) / editor/delta/Op

## OpIterator

Defined in: editor/delta/Op.ts:31

### Constructors

#### Constructor

```ts
new OpIterator(ops: Op[]): OpIterator;
```

Defined in: editor/delta/Op.ts:36

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

`ops`

</td>
<td>

[`Op`](../index.md#op)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`OpIterator`](#opiterator)

### Properties

#### index

```ts
index: number;
```

Defined in: editor/delta/Op.ts:33

#### offset

```ts
offset: number;
```

Defined in: editor/delta/Op.ts:34

#### ops

```ts
ops: Op[];
```

Defined in: editor/delta/Op.ts:32

### Methods

#### hasNext()

```ts
hasNext(): boolean;
```

Defined in: editor/delta/Op.ts:42

##### Returns

`boolean`

#### next()

```ts
next(length?: number): Op;
```

Defined in: editor/delta/Op.ts:46

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

#### peek()

```ts
peek(): Op;
```

Defined in: editor/delta/Op.ts:84

##### Returns

[`Op`](../index.md#op)

#### peekLength()

```ts
peekLength(): number;
```

Defined in: editor/delta/Op.ts:88

##### Returns

`number`

#### peekType()

```ts
peekType(): string;
```

Defined in: editor/delta/Op.ts:97

##### Returns

`string`

#### rest()

```ts
rest(): Op[];
```

Defined in: editor/delta/Op.ts:111

##### Returns

[`Op`](../index.md#op)[]

***

## default

Renames and re-exports [Op](../index.md#op)
