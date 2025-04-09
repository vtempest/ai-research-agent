[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/docx/parse-cards

## Functions

### extractCards()

```ts
function extractCards(doc): any
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

`doc`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### extractURL()

```ts
function extractURL(textWithURL): any
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

`textWithURL`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### getBlocksUntil()

```ts
function getBlocksUntil(
   blocks, 
   anchor, 
   styles): any
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

`blocks`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`anchor`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`styles`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### getIndexesWith()

```ts
function getIndexesWith(blocks, styles): any
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

`blocks`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`styles`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### parseCard()

```ts
function parseCard(doc, anchor): object
```

Parses card objects from the docx document, 
returns an array of objects with summary, author, 
 year, cite, url, and content in html

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

`Document`

</td>
<td>

`undefined`

</td>
<td>

</td>
</tr>
<tr>
<td>

`anchor`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `author` | `string` |
| `cite` | `string` |
| `content` | `string` |
| `summary` | `string` |
| `url` | `string` |
| `year` | `number` |
