[Documentation](../../modules.md) / editor/util/EventDispatcher

## EventDispatcher&lt;T&gt;

Defined in: editor/util/EventDispatcher.ts:6

### Extended by

- [`Editor`](../Editor.md#editor)

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `Record`&lt;`string`, `any`&gt;

</td>
<td>

`Record`&lt;`string`, `Event`&gt;

</td>
</tr>
</tbody>
</table>

### Constructors

#### Constructor

```ts
new EventDispatcher<T>(): EventDispatcher<T>;
```

##### Returns

[`EventDispatcher`](#eventdispatcher)&lt;`T`&gt;

### Methods

#### addEventListener()

##### Call Signature

```ts
addEventListener<K>(
   type: K, 
   listener: (event: T[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:19

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

`K` *extends* `string` \| `number` \| `symbol`

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

`type`

</td>
<td>

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `T`\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Call Signature

```ts
addEventListener(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:20

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### dispatchEvent()

```ts
dispatchEvent(event: Event, catchErrors?: boolean): void;
```

Defined in: editor/util/EventDispatcher.ts:39

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

`event`

</td>
<td>

`Event`

</td>
</tr>
<tr>
<td>

`catchErrors?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### off()

##### Call Signature

```ts
off<K>(
   type: K, 
   listener: (event: T[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:13

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

`K` *extends* `string` \| `number` \| `symbol`

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

`type`

</td>
<td>

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `T`\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Call Signature

```ts
off(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:14

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### on()

##### Call Signature

```ts
on<K>(
   type: K, 
   listener: (event: T[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:7

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

`K` *extends* `string` \| `number` \| `symbol`

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

`type`

</td>
<td>

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `T`\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Call Signature

```ts
on(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:8

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### removeEventListener()

##### Call Signature

```ts
removeEventListener<K>(
   type: K, 
   listener: (event: T[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:26

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

`K` *extends* `string` \| `number` \| `symbol`

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

`type`

</td>
<td>

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `T`\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### Call Signature

```ts
removeEventListener(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:31

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`
