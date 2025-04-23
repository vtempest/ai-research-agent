[Documentation](../../../modules.md) / extractor/pdf-to-html/models/StashingStream

## default

Defined in: extractor/pdf-to-html/models/StashingStream.js:2

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:3

##### Returns

[`default`](#default)

### Properties

#### results

```ts
results: any[];
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:7

#### stash

```ts
stash: any[];
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:8

### Methods

#### complete()

```ts
complete(): any[];
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:34

##### Returns

`any`[]

#### consume()

```ts
consume(item: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:15

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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### consumeAll()

```ts
consumeAll(items: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:11

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

`items`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### doFlushStash()

```ts
doFlushStash(stash: any, results: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:69

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

##### Returns

`void`

#### doMatchesStash()

```ts
doMatchesStash(lastItem: any, item: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:65

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

##### Returns

`void`

#### flushStash()

```ts
flushStash(): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:50

##### Returns

`void`

#### matchesStash()

```ts
matchesStash(item: any): true | void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:42

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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`true` \| `void`

#### onPushOnStash()

```ts
onPushOnStash(item: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:57

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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### pushOnStash()

```ts
pushOnStash(item: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:29

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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### shouldStash()

```ts
shouldStash(item: any): void;
```

Defined in: extractor/pdf-to-html/models/StashingStream.js:61

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

`item`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`
