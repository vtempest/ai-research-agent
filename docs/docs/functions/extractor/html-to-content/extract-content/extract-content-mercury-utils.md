[Documentation](../../../modules.md) / extractor/html-to-content/extract-content/extract-content-mercury-utils

## brsToPs()

```ts
function brsToPs(document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:349

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

`document`

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

## cleanAttributes()

```ts
function cleanAttributes(article: any, document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:464

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

### Returns

`any`

***

## cleanHOnes()

```ts
function cleanHOnes(article: any, document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:449

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

### Returns

`any`

***

## cleanImages()

```ts
function cleanImages(article: any, document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:424

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

### Returns

`any`

***

## convertNodeTo()

```ts
function convertNodeTo(
   node: any, 
   document: any, 
   tag: string): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:326

### Parameters

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

### Returns

`any`

***

## convertToParagraphs()

```ts
function convertToParagraphs(document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:392

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

`document`

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

## getAttrs()

```ts
function getAttrs(node: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:316

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

`node`

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

## isWordpress()

```ts
function isWordpress(document: any): boolean;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:645

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

`document`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## linkDensity()

```ts
function linkDensity(node: any): number;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:578

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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## nodeIsSufficient()

```ts
function nodeIsSufficient(node: any): boolean;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:640

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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## normalizeSpaces()

```ts
function normalizeSpaces(text: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:288

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

`text`

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

## paragraphize()

```ts
function paragraphize(
   node: any, 
   document: any, 
   br: boolean): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:293

### Parameters

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

### Returns

`any`

***

## removeEmpty()

```ts
function removeEmpty(article: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:495

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

`article`

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

## removeUnlessContent()

```ts
function removeUnlessContent(node: any, weight: any): void;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:508

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

### Returns

`void`

***

## rewriteTopLevel()

```ts
function rewriteTopLevel(article: any, document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:565

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

### Returns

`any`

***

## setAttr()

```ts
function setAttr(
   node: any, 
   attr: any, 
   val: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:650

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

### Returns

`any`

***

## setAttrs()

```ts
function setAttrs(node: any, attrs: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:656

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

### Returns

`any`

***

## stripJunkTags()

```ts
function stripJunkTags(
   article: any, 
   document: any, 
   tags: any[]): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:434

### Parameters

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

### Returns

`any`

***

## stripTags()

```ts
function stripTags(text: any, document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:597

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

### Returns

`any`

***

## stripUnlikelyCandidates()

```ts
function stripUnlikelyCandidates(document: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:605

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

`document`

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

## textLength()

```ts
function textLength(text: any): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:573

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

`text`

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

## withinComment()

```ts
function withinComment(node: any): boolean;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury-utils.js:624

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

`node`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`
