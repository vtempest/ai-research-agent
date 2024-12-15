[ai-research-agent](../../../index.md) / extractor/html-to-content/extract-content/extract-content-mercury-utils

## Functions

### brsToPs()

```ts
function brsToPs(document): any
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

`document`

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

### cleanAttributes()

```ts
function cleanAttributes(article, document): any
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

`article`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`document`

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

### cleanHOnes()

```ts
function cleanHOnes(article, document): any
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

`article`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`document`

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

### cleanImages()

```ts
function cleanImages(article, document): any
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

`article`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`document`

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

### convertNodeTo()

```ts
function convertNodeTo(
   node, 
   document, 
   tag): any
```

#### Parameters

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

`node`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`document`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`tag`

</td>
<td>

`string`

</td>
<td>

`"p"`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### convertToParagraphs()

```ts
function convertToParagraphs(document): any
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

`document`

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

### getAttrs()

```ts
function getAttrs(node): any
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

`node`

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

### isWordpress()

```ts
function isWordpress(document): boolean
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

`document`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### linkDensity()

```ts
function linkDensity(node): number
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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

***

### nodeIsSufficient()

```ts
function nodeIsSufficient(node): boolean
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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### normalizeSpaces()

```ts
function normalizeSpaces(text): any
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

`text`

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

### paragraphize()

```ts
function paragraphize(
   node, 
   document, 
   br): any
```

#### Parameters

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

`node`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`document`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`br`

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

#### Returns

`any`

***

### removeEmpty()

```ts
function removeEmpty(article): any
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

`article`

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

### removeUnlessContent()

```ts
function removeUnlessContent(node, weight): void
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

`node`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`weight`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### rewriteTopLevel()

```ts
function rewriteTopLevel(article, document): any
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

`article`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`document`

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

### setAttr()

```ts
function setAttr(
   node, 
   attr, 
   val): any
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

`node`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`attr`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`val`

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

### setAttrs()

```ts
function setAttrs(node, attrs): any
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

`node`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`attrs`

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

### stripJunkTags()

```ts
function stripJunkTags(
   article, 
   document, 
   tags): any
```

#### Parameters

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

`article`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`document`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`tags`

</td>
<td>

`any`[]

</td>
<td>

`[]`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### stripTags()

```ts
function stripTags(text, document): any
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

`text`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`document`

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

### stripUnlikelyCandidates()

```ts
function stripUnlikelyCandidates(document): any
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

`document`

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

### textLength()

```ts
function textLength(text): any
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

`text`

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

### withinComment()

```ts
function withinComment(node): boolean
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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`
