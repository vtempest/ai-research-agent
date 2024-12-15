[ai-research-agent](../../index.md) / extractor/html-to-cite/extract-cite

## Extract

### extractCite()

```ts
function extractCite(document, options): object
```

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

\{\}

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

| Name | Type |
| ------ | ------ |
| `author` | `string` |
| `author_cite` | `string` |
| `author_short` | `string` |
| `date` | `string` |
| `source` | `string` |
| `title` | `string` |

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
