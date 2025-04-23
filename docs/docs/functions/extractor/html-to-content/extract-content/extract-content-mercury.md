[Documentation](../../../modules.md) / extractor/html-to-content/extract-content/extract-content-mercury

## Extract

### extractMainContentFromHTML2()

```ts
function extractMainContentFromHTML2(html: string, opts?: object): string;
```

Defined in: extractor/html-to-content/extract-content/extract-content-mercury.js:62

### HTML-to-Main-Content Extractor #2

1. The algorithm starts by loading the HTML content using linkedom, a lightweight DOM parser for Node.js.
2. It then applies a series of cleaning and scoring techniques to identify the main content of
the page, starting with stripping unlikely candidates (e.g., elements with class names like "comment"
 or "sidebar").
3. The HTML is converted into a series of paragraph elements, which are then scored based on various
 factors such as text length, number of commas, and the presence of certain class names or IDs.
4. The algorithm assigns scores to parent and grandparent elements based on the scores of their
children, with parents receiving the full score and grandparents receiving half.
5. After scoring, the algorithm finds the top candidate element by selecting the node with the
highest score.
6. The top candidate's siblings are then examined to see if they should be included in the main
content, based on their scores and other factors like link density.
7. The algorithm then cleans the selected content by removing unnecessary tags, attributes, and empty
elements.
8. It also handles special cases like cleaning up header tags, images, and other potentially irrelevant
 content.
9. Throughout the process, the algorithm uses various regular expressions and scoring heuristics to
identify positive and negative indicators of content relevance.
10. Finally, the cleaned and extracted content is returned as an HTML string, representing the main
body of the article or webpage.

[Article Extraction Benchmark](https://trafilatura.readthedocs.io/en/latest/evaluation.html)

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

`html`

</td>
<td>

`string`

</td>
<td>

The HTML content to extract from.

</td>
</tr>
<tr>
<td>

`opts?`

</td>
<td>

\{ `cleanConditionally`: `boolean`; `stripUnlikelyCandidates`: `boolean`; `weightNodes`: `boolean`; \}

</td>
<td>

The options for content extraction.

</td>
</tr>
<tr>
<td>

`opts.cleanConditionally?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Clean the node to remove superfluous content
 like forms, ads, etc. Initially, pass in the most restrictive options which will return the highest
quality content. On each failure, retry with slightly more lax options.

</td>
</tr>
<tr>
<td>

`opts.stripUnlikelyCandidates?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Remove elements that match non-article-
like criteria first (e.g., elements with a classname of "comment").

</td>
</tr>
<tr>
<td>

`opts.weightNodes?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Modify an element's score based on certain classNames or
IDs (e.g., subtract if a node has a className of 'comment', add if a node has an ID of 'entry-content').

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The extracted content as an HTML string, or null if extraction fails.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
Based on [Postlight Mercury Parser (2017-)](https://github.com/postlight/parser/tree/main/src)

#### Example

```ts
var url =  "https://en.wikipedia.org/wiki/David_Hilbert"
var html = await (await fetch(url)).text();
var content = extractMainContentFromHTML(html);
console.log(content); // HTML content of main article body
```
