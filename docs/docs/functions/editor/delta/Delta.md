[Documentation](../../modules.md) / editor/delta/Delta

## default

Defined in: editor/delta/Delta.ts:8

### Constructors

#### Constructor

```ts
new default(ops?: 
  | Op[]
  | {
  ops: Op[];
}): default;
```

Defined in: editor/delta/Delta.ts:13

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

`ops?`

</td>
<td>

 \| [`Op`](../index.md#op)[] \| \{ `ops`: [`Op`](../index.md#op)[]; \}

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

### Properties

#### ops

```ts
ops: Op[];
```

Defined in: editor/delta/Delta.ts:12

#### AttributeMap

```ts
static AttributeMap: typeof AttributeMap;
```

Defined in: editor/delta/Delta.ts:10

#### Op

```ts
static Op: typeof Op;
```

Defined in: editor/delta/Delta.ts:9

### Methods

#### changeLength()

```ts
changeLength(): number;
```

Defined in: editor/delta/Delta.ts:130

##### Returns

`number`

#### chop()

```ts
chop(): this;
```

Defined in: editor/delta/Delta.ts:96

##### Returns

`this`

#### compose()

```ts
compose(other: default, discardNull?: boolean): default;
```

Defined in: editor/delta/Delta.ts:164

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

`discardNull?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### concat()

```ts
concat(other: default): default;
```

Defined in: editor/delta/Delta.ts:235

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
</tbody>
</table>

##### Returns

[`default`](#default)

#### delete()

```ts
delete(length: number): this;
```

Defined in: editor/delta/Delta.ts:36

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

`length`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### diff()

```ts
diff(other: default, cursor?: any): default;
```

Defined in: editor/delta/Delta.ts:244

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

`cursor?`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### eachLine()

```ts
eachLine(predicate: (line: default, attributes: AttributeMap, index: number) => boolean | void, newline: string): void;
```

Defined in: editor/delta/Delta.ts:294

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

`predicate`

</td>
<td>

(`line`: [`default`](#default), `attributes`: [`AttributeMap`](../index.md#attributemap), `index`: `number`) => `boolean` \| `void`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`newline`

</td>
<td>

`string`

</td>
<td>

'\n'

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### filter()

```ts
filter(predicate: (op: Op, index: number) => boolean): Op[];
```

Defined in: editor/delta/Delta.ts:104

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

`predicate`

</td>
<td>

(`op`: [`Op`](../index.md#op), `index`: `number`) => `boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Op`](../index.md#op)[]

#### forEach()

```ts
forEach(predicate: (op: Op, index: number) => void): void;
```

Defined in: editor/delta/Delta.ts:108

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

`predicate`

</td>
<td>

(`op`: [`Op`](../index.md#op), `index`: `number`) => `void`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### insert()

```ts
insert(arg: string | Record<string, any>, attributes?: AttributeMap): this;
```

Defined in: editor/delta/Delta.ts:24

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

`arg`

</td>
<td>

`string` \| `Record`&lt;`string`, `any`&gt;

</td>
</tr>
<tr>
<td>

`attributes?`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### invert()

```ts
invert(base: default): default;
```

Defined in: editor/delta/Delta.ts:322

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

`base`

</td>
<td>

[`default`](#default)

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

#### length()

```ts
length(): number;
```

Defined in: editor/delta/Delta.ts:141

##### Returns

`number`

#### map()

```ts
map<T>(predicate: (op: Op, index: number) => T): T[];
```

Defined in: editor/delta/Delta.ts:112

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`predicate`

</td>
<td>

(`op`: [`Op`](../index.md#op), `index`: `number`) => `T`

</td>
</tr>
</tbody>
</table>

##### Returns

`T`[]

#### partition()

```ts
partition(predicate: (op: Op) => boolean): [Op[], Op[]];
```

Defined in: editor/delta/Delta.ts:116

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

`predicate`

</td>
<td>

(`op`: [`Op`](../index.md#op)) => `boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

\[[`Op`](../index.md#op)[], [`Op`](../index.md#op)[]\]

#### push()

```ts
push(newOp: Op): this;
```

Defined in: editor/delta/Delta.ts:54

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

`newOp`

</td>
<td>

[`Op`](../index.md#op)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### reduce()

```ts
reduce<T>(predicate: (accum: T, curr: Op, index: number) => T, initialValue: T): T;
```

Defined in: editor/delta/Delta.ts:126

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`predicate`

</td>
<td>

(`accum`: `T`, `curr`: [`Op`](../index.md#op), `index`: `number`) => `T`

</td>
</tr>
<tr>
<td>

`initialValue`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

##### Returns

`T`

#### retain()

```ts
retain(length: number, attributes?: AttributeMap): this;
```

Defined in: editor/delta/Delta.ts:43

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

`length`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`attributes?`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### slice()

```ts
slice(start: number, end: number): default;
```

Defined in: editor/delta/Delta.ts:147

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

[`default`](#default)

#### transform()

##### Call Signature

```ts
transform(index: number, priority?: boolean): number;
```

Defined in: editor/delta/Delta.ts:347

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

`index`

</td>
<td>

`number`

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

###### Returns

`number`

##### Call Signature

```ts
transform(other: default, priority?: boolean): default;
```

Defined in: editor/delta/Delta.ts:348

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

###### Returns

[`default`](#default)

#### transformPosition()

```ts
transformPosition(index: number, priority: boolean): number;
```

Defined in: editor/delta/Delta.ts:381

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

`index`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`priority`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

##### Returns

`number`
