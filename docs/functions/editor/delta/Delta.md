[ai-research-agent](../../modules.md) / editor/delta/Delta

## Classes

### default

#### Constructors

##### new default()

```ts
new default(ops?): default
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

`ops`?

</td>
<td>

 \| [`default`](Op/index.md#default)[] \| \{ `ops`: [`default`](Op/index.md#default)[]; \}

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Delta.md#default)

#### Methods

##### changeLength()

```ts
changeLength(): number
```

###### Returns

`number`

##### chop()

```ts
chop(): this
```

###### Returns

`this`

##### compose()

```ts
compose(other, discardNull?): default
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

[`default`](Delta.md#default)

</td>
</tr>
<tr>
<td>

`discardNull`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Delta.md#default)

##### concat()

```ts
concat(other): default
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

[`default`](Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Delta.md#default)

##### delete()

```ts
delete(length): this
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

`length`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### diff()

```ts
diff(other, cursor?): default
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

[`default`](Delta.md#default)

</td>
</tr>
<tr>
<td>

`cursor`?

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Delta.md#default)

##### eachLine()

```ts
eachLine(predicate, newline): void
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

`predicate`

</td>
<td>

(`line`, `attributes`, `index`) => `boolean` \| `void`

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

###### Returns

`void`

##### filter()

```ts
filter(predicate): default[]
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

`predicate`

</td>
<td>

(`op`, `index`) => `boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Op/index.md#default)[]

##### forEach()

```ts
forEach(predicate): void
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

`predicate`

</td>
<td>

(`op`, `index`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### insert()

```ts
insert(arg, attributes?): this
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

`arg`

</td>
<td>

`string` \| `Record`&lt;`string`, `any`&gt;

</td>
</tr>
<tr>
<td>

`attributes`?

</td>
<td>

[`default`](AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### invert()

```ts
invert(base): default
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

`base`

</td>
<td>

[`default`](Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Delta.md#default)

##### length()

```ts
length(): number
```

###### Returns

`number`

##### map()

```ts
map<T>(predicate): T[]
```

###### Type Parameters

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

`predicate`

</td>
<td>

(`op`, `index`) => `T`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`[]

##### partition()

```ts
partition(predicate): [default[], default[]]
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

`predicate`

</td>
<td>

(`op`) => `boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[[`default`](Op/index.md#default)[], [`default`](Op/index.md#default)[]]

##### push()

```ts
push(newOp): this
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

`newOp`

</td>
<td>

[`default`](Op/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### reduce()

```ts
reduce<T>(predicate, initialValue): T
```

###### Type Parameters

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

`predicate`

</td>
<td>

(`accum`, `curr`, `index`) => `T`

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

###### Returns

`T`

##### retain()

```ts
retain(length, attributes?): this
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

`length`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`attributes`?

</td>
<td>

[`default`](AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

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

[`default`](Delta.md#default)

##### transform()

###### Call Signature

```ts
transform(index, priority?): number
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

`index`

</td>
<td>

`number`

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

`number`

###### Call Signature

```ts
transform(other, priority?): default
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

[`default`](Delta.md#default)

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

[`default`](Delta.md#default)

##### transformPosition()

```ts
transformPosition(index, priority): number
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

###### Returns

`number`

#### Properties

##### ops

```ts
ops: default[];
```

##### AttributeMap

```ts
static AttributeMap: typeof default;
```

##### Op

```ts
static Op: typeof default;
```
