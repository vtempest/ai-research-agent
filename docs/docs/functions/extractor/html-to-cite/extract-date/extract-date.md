[Documentation](../../../modules.md) / extractor/html-to-cite/extract-date/extract-date

## CLASS\_ATTRS

```ts
const CLASS_ATTRS: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:202

***

## DATE\_ATTRIBUTES

```ts
const DATE_ATTRIBUTES: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:81

***

## ITEMPROP\_ATTRS

```ts
const ITEMPROP_ATTRS: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:196

***

## ITEMPROP\_ATTRS\_MODIFIED

```ts
const ITEMPROP_ATTRS_MODIFIED: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:193

***

## ITEMPROP\_ATTRS\_ORIGINAL

```ts
const ITEMPROP_ATTRS_ORIGINAL: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:187

***

## NAME\_MODIFIED

```ts
const NAME_MODIFIED: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:156

***

## NON\_DIGITS\_REGEX

```ts
const NON_DIGITS_REGEX: RegExp;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:205

***

## PROPERTY\_MODIFIED

```ts
const PROPERTY_MODIFIED: Set<string>;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:166

***

## extractDate()

```ts
function extractDate(
   htmlobject: Document, 
   extensive_search?: boolean, 
   original_date?: boolean, 
   outputformat?: string, 
   url?: string, 
   verbose?: boolean, 
   min_date?: Date, 
   max_date?: Date, 
   deferred_url_extractor?: boolean): string;
```

Defined in: extractor/html-to-cite/extract-date/extract-date.js:957

Extract date from document using various methods

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

`htmlobject`

</td>
<td>

`Document`

</td>
<td>

`undefined`

</td>
<td>

DOM object with article content

</td>
</tr>
<tr>
<td>

`extensive_search?`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

perform extensive search if true

</td>
</tr>
<tr>
<td>

`original_date?`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

return original date if true

</td>
</tr>
<tr>
<td>

`outputformat?`

</td>
<td>

`string`

</td>
<td>

`"%Y-%m-%d"`

</td>
<td>

output format

</td>
</tr>
<tr>
<td>

`url?`

</td>
<td>

`string`

</td>
<td>

`null`

</td>
<td>

URL of the page

</td>
</tr>
<tr>
<td>

`verbose?`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

log debug messages if true

</td>
</tr>
<tr>
<td>

`min_date?`

</td>
<td>

`Date`

</td>
<td>

`null`

</td>
<td>

minimum date to consider

</td>
</tr>
<tr>
<td>

`max_date?`

</td>
<td>

`Date`

</td>
<td>

`null`

</td>
<td>

maximum date to consider

</td>
</tr>
<tr>
<td>

`deferred_url_extractor?`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

if true, do not extract date from URL

</td>
</tr>
</tbody>
</table>

### Returns

`string`

Extracted date or null if not found

### Author

[ai-research-agent (2024)](https://airesearch.js.org)
Based on [Barbaresi (2020)](https://github.com/adbar/htmldate/)
