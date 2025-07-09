[Documentation](../../../modules.md) / components/Editor/docx/parse-cards

## extractCards()

```ts
function extractCards(doc: any): any;
```

Defined in: [apps/web/src/lib/components/Editor/docx/parse-cards.js:4](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L4)

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

`doc`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## extractURL()

```ts
function extractURL(textWithURL: any): any;
```

Defined in: [apps/web/src/lib/components/Editor/docx/parse-cards.js:201](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L201)

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

`textWithURL`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## getBlocksUntil()

```ts
function getBlocksUntil(
   blocks: any, 
   anchor: any, 
   styles: any): any;
```

Defined in: [apps/web/src/lib/components/Editor/docx/parse-cards.js:255](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L255)

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

### Returns

`any`

***

## getIndexesWith()

```ts
function getIndexesWith(blocks: any, styles: any): any;
```

Defined in: [apps/web/src/lib/components/Editor/docx/parse-cards.js:244](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L244)

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

### Returns

`any`

***

## parseCard()

```ts
function parseCard(doc: Document, anchor: number): object;
```

Defined in: [apps/web/src/lib/components/Editor/docx/parse-cards.js:19](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L19)

Parses card objects from the docx document, 
returns an array of objects with summary, author, 
 year, cite, url, and content in html

### Parameters

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

### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`author`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:16](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L16)

</td>
</tr>
<tr>
<td>

`cite`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:17](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L17)

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:17](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L17)

</td>
</tr>
<tr>
<td>

`summary`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:16](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L16)

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:17](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L17)

</td>
</tr>
<tr>
<td>

`year`

</td>
<td>

`number`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/parse-cards.js:17](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/parse-cards.js#L17)

</td>
</tr>
</tbody>
</table>
