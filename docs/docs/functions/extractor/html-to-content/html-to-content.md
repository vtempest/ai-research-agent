[ai-research-agent](../../index.md) / extractor/html-to-content/html-to-content

## Functions

### extractContentAndCite()

```ts
function extractContentAndCite(documentOrHTML, options): Object
```

Extracts the main content and citation information from a document or HTML string

#### Parameters

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

`string` \| `object`

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

#### Returns

`Object`

The extracted content and citation information

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Interfaces

### ExtractedContent

#### Properties

##### author

```ts
author: string;
```

The author's name

##### author\_cite

```ts
author_cite: string;
```

The full citation for the author

##### author\_short

```ts
author_short: string;
```

A shortened version of the author's name

##### date

```ts
date: string;
```

The publication date

##### html

```ts
html: string;
```

The extracted main content in HTML format

##### source

```ts
source: string;
```

The source of the content

##### title

```ts
title: string;
```

The title of the content
