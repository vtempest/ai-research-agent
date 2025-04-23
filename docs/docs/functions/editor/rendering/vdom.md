[Documentation](../../modules.md) / editor/rendering/vdom

## H()

Defined in: editor/rendering/vdom.ts:266

### Call Signature

```ts
H<T, P, C>(
   type: (props: P, children: C) => T, 
   props?: P, 
   ch?: C): T;
```

Defined in: editor/rendering/vdom.ts:267

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

`P` *extends* [`Props`](#props)

</td>
</tr>
<tr>
<td>

`C` *extends* [`VChild`](#vchild) \| [`VChild`](#vchild)[]

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

(`props`: `P`, `children`: `C`) => `T`

</td>
</tr>
<tr>
<td>

`props?`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`ch?`

</td>
<td>

`C`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

### Call Signature

```ts
H(
   type: string, 
   props?: Props, 
   ch?: VChild | VChild[]): VNode;
```

Defined in: editor/rendering/vdom.ts:272

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

`props?`

</td>
<td>

[`Props`](#props)

</td>
</tr>
<tr>
<td>

`ch?`

</td>
<td>

[`VChild`](#vchild) \| [`VChild`](#vchild)[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](#vnode)

***

## Props

Defined in: editor/rendering/vdom.ts:4

### Indexable

```ts
[key: string]: any
```

***

## VNode

Defined in: editor/rendering/vdom.ts:10

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

<a id="children"></a> `children`

</td>
<td>

[`VChild`](#vchild)[]

</td>
<td>

editor/rendering/vdom.ts:13

</td>
</tr>
<tr>
<td>

<a id="key"></a> `key`

</td>
<td>

`any`

</td>
<td>

editor/rendering/vdom.ts:14

</td>
</tr>
<tr>
<td>

<a id="props-1"></a> `props`

</td>
<td>

[`Props`](#props)

</td>
<td>

editor/rendering/vdom.ts:12

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`string`

</td>
<td>

editor/rendering/vdom.ts:11

</td>
</tr>
</tbody>
</table>

***

## VChild

```ts
type VChild = VNode | string;
```

Defined in: editor/rendering/vdom.ts:8

***

## h

```ts
const h: H;
```

Defined in: editor/rendering/vdom.ts:275

***

## options

```ts
const options: object;
```

Defined in: editor/rendering/vdom.ts:18

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="renderkeys"></a> `renderKeys`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

editor/rendering/vdom.ts:19

</td>
</tr>
</tbody>
</table>

***

## React

```ts
const React: object;
```

Defined in: editor/rendering/vdom.ts:282

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="createelement"></a> `createElement`

</td>
<td>

[`H`](#h)

</td>
<td>

`h`

</td>
<td>

editor/rendering/vdom.ts:282

</td>
</tr>
</tbody>
</table>

***

## patch()

```ts
function patch(
   dom: Node, 
   vdom: VNode | VNode[], 
   oldKids?: ChildNode[]): Node;
```

Defined in: editor/rendering/vdom.ts:284

### Parameters

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

[`VNode`](#vnode) \| [`VNode`](#vnode)[]

</td>
</tr>
<tr>
<td>

`oldKids?`

</td>
<td>

`ChildNode`[]

</td>
</tr>
</tbody>
</table>

### Returns

`Node`

***

## recycleNode()

```ts
function recycleNode(dom: Node): string | VNode;
```

Defined in: editor/rendering/vdom.ts:256

### Parameters

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

### Returns

`string` \| [`VNode`](#vnode)
