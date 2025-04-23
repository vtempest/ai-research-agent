[Documentation](../../modules.md) / extractor/html-to-content/html-to-content

## ExtractedContent

Defined in: extractor/html-to-content/html-to-content.js:83

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="author"></a> `author`

</td>
<td>

`string`

</td>
<td>

The author's name

</td>
<td>

extractor/html-to-content/html-to-content.js:87

</td>
</tr>
<tr>
<td>

<a id="author_cite"></a> `author_cite`

</td>
<td>

`string`

</td>
<td>

The full citation for the author

</td>
<td>

extractor/html-to-content/html-to-content.js:85

</td>
</tr>
<tr>
<td>

<a id="author_short"></a> `author_short`

</td>
<td>

`string`

</td>
<td>

A shortened version of the author's name

</td>
<td>

extractor/html-to-content/html-to-content.js:86

</td>
</tr>
<tr>
<td>

<a id="date"></a> `date`

</td>
<td>

`string`

</td>
<td>

The publication date

</td>
<td>

extractor/html-to-content/html-to-content.js:88

</td>
</tr>
<tr>
<td>

<a id="html"></a> `html`

</td>
<td>

`string`

</td>
<td>

The extracted main content in HTML format

</td>
<td>

extractor/html-to-content/html-to-content.js:90

</td>
</tr>
<tr>
<td>

<a id="source"></a> `source`

</td>
<td>

`string`

</td>
<td>

The source of the content

</td>
<td>

extractor/html-to-content/html-to-content.js:89

</td>
</tr>
<tr>
<td>

<a id="title"></a> `title`

</td>
<td>

`string`

</td>
<td>

The title of the content

</td>
<td>

extractor/html-to-content/html-to-content.js:84

</td>
</tr>
</tbody>
</table>

***

## extractContentAndCite()

```ts
function extractContentAndCite(documentOrHTML: any, options: object): any;
```

Defined in: extractor/html-to-content/html-to-content.js:30

Extracts the main content and citation information from a document or HTML string

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

`documentOrHTML`

</td>
<td>

`any`

</td>
<td>

The document or HTML string to extract content from

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `formatting`: `boolean`; `images`: `boolean`; `links`: `boolean`; `url`: `string`; `useExtractor2`: `boolean`; \}

</td>
<td>

Optional configuration options

</td>
</tr>
<tr>
<td>

`options.formatting`

</td>
<td>

`boolean`

</td>
<td>

default=true - Whether to preserve formatting in the extracted content

</td>
</tr>
<tr>
<td>

`options.images`

</td>
<td>

`boolean`

</td>
<td>

default=true - Whether to include images in the extracted content

</td>
</tr>
<tr>
<td>

`options.links`

</td>
<td>

`boolean`

</td>
<td>

default=true - Whether to include links in the extracted content

</td>
</tr>
<tr>
<td>

`options.url`

</td>
<td>

`string`

</td>
<td>

The URL of the original document, if available, for absolutify-ing URLs

</td>
</tr>
<tr>
<td>

`options.useExtractor2`

</td>
<td>

`boolean`

</td>
<td>

default=false -
   false uses Mozilla Readability, true uses Postlight Mercury. 
   then use the alternate if the first returns less than 200 characters

</td>
</tr>
</tbody>
</table>

### Returns

`any`

The extracted content and citation information

### Author

[ai-research-agent (2024)](https://airesearch.js.org)
