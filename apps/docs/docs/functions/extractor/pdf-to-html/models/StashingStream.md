[Documentation](../../../README.md) / extractor/pdf-to-html/models/StashingStream

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:2](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L2)

Abstract stream which allows stash items temporarily

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L3)

##### Returns

[`default`](#default)

### Properties

#### results

```ts
results: any[];
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L7)

#### stash

```ts
stash: any[];
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L8)

### Methods

#### consumeAll()

```ts
consumeAll(items: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L11)

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

#### consume()

```ts
consume(item: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L15)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:29](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L29)

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

#### complete()

```ts
complete(): any[];
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:34](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L34)

##### Returns

`any`[]

#### matchesStash()

```ts
matchesStash(item: any): true | void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:42](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L42)

return true if the item matches the items of the stack

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

#### flushStash()

```ts
flushStash(): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:50](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L50)

##### Returns

`void`

#### onPushOnStash()

```ts
onPushOnStash(item: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:57](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L57)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:61](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L61)

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

#### doMatchesStash()

```ts
doMatchesStash(lastItem: any, item: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:65](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L65)

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

#### doFlushStash()

```ts
doFlushStash(stash: any, results: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js:69](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/StashingStream.js#L69)

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
