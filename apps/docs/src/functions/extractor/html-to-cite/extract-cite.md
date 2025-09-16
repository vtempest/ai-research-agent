[ai-research-agent](../../modules.md) / extractor/html-to-cite/extract-cite

## Extract

### extractCite()

```ts
function extractCite(document: Document, options: object): object;
```

Defined in: [src/extractor/html-to-cite/extract-cite.js:25](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L25)

### 📚💎 Extract Expert Excerpt 
<img width="350px" src="https://i.imgur.com/4GOOM9s.jpeg" />

Extract author, date, source, and title from HTML using meta tags
and common class names. Validates human name from author string to check
against common list of 90k first names, last names,and organizations to infer
if it should be reversed starting by author last name (accounting for affixes/titles),
since organizations are not reversed.
[Article Extraction Benchmark](https://github.com/scrapinghub/article-extraction-benchmark?tab=readme-ov-file#results)

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

`document`

</td>
<td>

`Document`

</td>
<td>

dom object or html string with article content

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ \}

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

An object containing extracted citation information.

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

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
<tr>
<td>

`author_cite`

</td>
<td>

`string`

</td>
<td>

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
<tr>
<td>

`author_short`

</td>
<td>

`string`

</td>
<td>

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
<tr>
<td>

`date`

</td>
<td>

`string`

</td>
<td>

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
<tr>
<td>

`source`

</td>
<td>

`string`

</td>
<td>

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
<tr>
<td>

`title`

</td>
<td>

`string`

</td>
<td>

[src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
