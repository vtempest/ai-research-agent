[ai-research-agent](../../modules.md) / editor/rendering/vdom

## Functions

### h()

#### Call Signature

```ts
function h<T, P, C>(
   type, 
   props?, 
   ch?): T
```

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
<tr>
<td>

`P` *extends* [`Props`](vdom.md#props)

</td>
</tr>
<tr>
<td>

`C` *extends* [`VChild`](vdom.md#vchild) \| [`VChild`](vdom.md#vchild)[]

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

`type`

</td>
<td>

(`props`, `children`) => `T`

</td>
</tr>
<tr>
<td>

`props`?

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`ch`?

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

##### Returns

`T`

#### Call Signature

```ts
function h(
   type, 
   props?, 
   ch?): VNode
```

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`props`?

</td>
<td>

[`Props`](vdom.md#props)

</td>
</tr>
<tr>
<td>

`ch`?

</td>
<td>

[`VChild`](vdom.md#vchild) \| [`VChild`](vdom.md#vchild)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`VNode`](vdom.md#vnode)

***

### patch()

```ts
function patch(
   dom, 
   vdom, 
   oldKids?): Node
```

#### Parameters

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

`dom`

</td>
<td>

`Node`

</td>
</tr>
<tr>
<td>

`vdom`

</td>
<td>

[`VNode`](vdom.md#vnode) \| [`VNode`](vdom.md#vnode)[]

</td>
</tr>
<tr>
<td>

`oldKids`?

</td>
<td>

`ChildNode`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Node`

***

### recycleNode()

```ts
function recycleNode(dom): string | VNode
```

#### Parameters

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

`dom`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

#### Returns

`string` \| [`VNode`](vdom.md#vnode)

## Interfaces

### H()

```ts
interface H<T, P, C>(
   type, 
   props?, 
   ch?): T
```

#### Type Parameters

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
<tr>
<td>

`P` *extends* [`Props`](vdom.md#props)

</td>
</tr>
<tr>
<td>

`C` *extends* [`VChild`](vdom.md#vchild) \| [`VChild`](vdom.md#vchild)[]

</td>
</tr>
</tbody>
</table>

#### Parameters

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

`type`

</td>
<td>

(`props`, `children`) => `T`

</td>
</tr>
<tr>
<td>

`props`?

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`ch`?

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

```ts
interface H(
   type, 
   props?, 
   ch?): VNode
```

#### Parameters

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`props`?

</td>
<td>

[`Props`](vdom.md#props)

</td>
</tr>
<tr>
<td>

`ch`?

</td>
<td>

[`VChild`](vdom.md#vchild) \| [`VChild`](vdom.md#vchild)[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](vdom.md#vnode)

***

### Props

#### Indexable

 \[`key`: `string`\]: `any`

***

### VNode

#### Properties

##### children

```ts
children: VChild[];
```

##### key

```ts
key: any;
```

##### props

```ts
props: Props;
```

##### type

```ts
type: string;
```

## Type Aliases

### VChild

```ts
type VChild = VNode | string;
```

## Variables

### options

```ts
const options: object;
```

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`renderKeys`

</td>
<td>

`boolean`

</td>
<td>

false

</td>
</tr>
</tbody>
</table>

***

### React

```ts
const React: object;
```

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`createElement`

</td>
<td>

[`H`](vdom.md#h-1)

</td>
<td>

h

</td>
</tr>
</tbody>
</table>
