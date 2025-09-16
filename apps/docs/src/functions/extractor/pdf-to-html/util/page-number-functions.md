[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/util/page-number-functions

## findFirstPage()

```ts
function findFirstPage(pageIndexNumMap: any): any;
```

Defined in: [src/extractor/pdf-to-html/util/page-number-functions.js:63](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/util/page-number-functions.js#L63)

Checks when the page number first begins and returns it

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pageIndexNumMap`

</td>
<td>

`any`

</td>
<td>

object

</td>
</tr>
</tbody>
</table>

### Returns

`any`

For example: pageIndex: 10, pageNum: 3

***

## findPageNumbers()

```ts
function findPageNumbers(
   pageIndexNumMap: any, 
   pageIndex: number, 
   items: any[]): any;
```

Defined in: [src/extractor/pdf-to-html/util/page-number-functions.js:48](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/util/page-number-functions.js#L48)

Searches both top and bottom area and returns an object

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pageIndexNumMap`

</td>
<td>

`any`

</td>
<td>

object

</td>
</tr>
<tr>
<td>

`pageIndex`

</td>
<td>

`number`

</td>
<td>

index of the page

</td>
</tr>
<tr>
<td>

`items`

</td>
<td>

`any`[]

</td>
<td>

textContent.items

</td>
</tr>
</tbody>
</table>

### Returns

`any`

pageIndexNumMap object

***

## removePageNumber()

```ts
function removePageNumber(textContent: any, pageNum: number): any;
```

Defined in: [src/extractor/pdf-to-html/util/page-number-functions.js:104](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/util/page-number-functions.js#L104)

Return textContent with items that have pageNum removed

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`textContent`

</td>
<td>

`any`

</td>
<td>

object

</td>
</tr>
<tr>
<td>

`pageNum`

</td>
<td>

`number`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`any`

filteredContent - textContent without items that have pageNum
