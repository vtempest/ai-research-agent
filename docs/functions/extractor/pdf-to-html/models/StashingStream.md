[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/models/StashingStream

## Classes

### default

#### Constructors

##### new default()

```ts
new default(): default
```

###### Returns

[`default`](StashingStream.md#default)

#### Methods

##### complete()

```ts
complete(): any[]
```

###### Returns

`any`[]

##### consume()

```ts
consume(item): void
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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### consumeAll()

```ts
consumeAll(items): void
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

`items`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### doFlushStash()

```ts
doFlushStash(stash, results): void
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

`stash`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`results`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### doMatchesStash()

```ts
doMatchesStash(lastItem, item): void
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

`lastItem`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### flushStash()

```ts
flushStash(): void
```

###### Returns

`void`

##### matchesStash()

```ts
matchesStash(item): true | void
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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`true` \| `void`

##### onPushOnStash()

```ts
onPushOnStash(item): void
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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### pushOnStash()

```ts
pushOnStash(item): void
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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### shouldStash()

```ts
shouldStash(item): void
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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### Properties

##### results

```ts
results: any[];
```

##### stash

```ts
stash: any[];
```
