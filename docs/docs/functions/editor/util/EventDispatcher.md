[ai-research-agent](../../index.md) / editor/util/EventDispatcher

## Classes

### EventDispatcher&lt;T&gt;

#### Extended by

- [`Editor`](../Editor.md#editor)

#### Type Parameters

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

#### Constructors

##### new EventDispatcher()

```ts
new EventDispatcher<T>(): EventDispatcher<T>
```

###### Returns

[`EventDispatcher`](EventDispatcher.md#eventdispatchert)&lt;`T`&gt;

#### Methods

##### addEventListener()

###### Call Signature

```ts
addEventListener<K>(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
addEventListener(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### dispatchEvent()

```ts
dispatchEvent(event, catchErrors?): void
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

`event`

</td>
<td>

`Event`

</td>
</tr>
<tr>
<td>

`catchErrors`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### off()

###### Call Signature

```ts
off<K>(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
off(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### on()

###### Call Signature

```ts
on<K>(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
on(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### removeEventListener()

###### Call Signature

```ts
removeEventListener<K>(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Call Signature

```ts
removeEventListener(
   type, 
   listener, 
   options?): void
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

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`
