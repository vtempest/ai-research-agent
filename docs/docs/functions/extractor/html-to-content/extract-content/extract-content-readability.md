[Documentation](../../../modules.md) / extractor/html-to-content/extract-content/extract-content-readability

## Extract

### extractMainContentFromHTML()

```ts
function extractMainContentFromHTML(html: any, options?: object): Element;
```

Defined in: extractor/html-to-content/extract-content/extract-content-readability.js:60

### HTML-to-Main-Content Extractor #1
The function extracts main content with regex patterns, cleaning HTML, scoring nodes
 based on content indicators like paragraphs and id/class names, selecting
 the top candidate, extracting it, and cleaning up content around it.

1. Define regular expressions:
   - Various regex patterns are defined to identify content and non-content areas.

2. Define helper functions:
   - normalizeSpaces: Normalizes whitespace in a string.
   - stripTags: Removes all HTML tags from a string.
   - getTextLength: Calculates the length of text after stripping tags.
   - calculateLinkDensity: Calculates the ratio of link text to total text.

3. Clean HTML:
   - Remove unlikely candidates (e.g., ads, sidebars) from the HTML.

4. Define scoring function:
   - scoreNode: Assigns a score to an HTML node based on content and attributes.
   - Increases score for positive indicators (e.g., article, body, content tags).
   - Decreases score for negative indicators (e.g., hidden, footer, sidebar tags).
   - Adds to score based on paragraph tags and text length.

5. Find and score candidate nodes:
   - Identify potential content nodes in the cleaned HTML.
   - Score each node using the scoreNode function.

6. Select top candidate:
   - Sort candidates by score and select the highest-scoring node.

7. Extract content:
   - Use regex to extract content around the top candidate node.

8. Clean up extracted content:
   - Remove script and style tags and their contents.
   - Process anchor tags based on content density.
   - Keep only specific HTML tags (a, p, img, h1-h6, ul, ol, li).
   - Remove excess whitespace from the final content.

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

`any`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `minContentLength`: `number`; `minScore`: `number`; `minTextLength`: `number`; `retryLength`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.minContentLength?`

</td>
<td>

`number`

</td>
<td>

default=140 - Minimum length of content to be considered valid

</td>
</tr>
<tr>
<td>

`options.minScore?`

</td>
<td>

`number`

</td>
<td>

default=20 - Minimum score for content to be considered valid

</td>
</tr>
<tr>
<td>

`options.minTextLength?`

</td>
<td>

`number`

</td>
<td>

default=25 - Minimum length of text to be considered valid

</td>
</tr>
<tr>
<td>

`options.retryLength?`

</td>
<td>

`number`

</td>
<td>

default=250 - Length to retry content extraction if initial attempt fails

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

Extracted HTML element of main content such as article body

#### Example

```ts
var url = "https://www.nytimes.com/2024/08/28/business/telegram-ceo-pavel-durov-charged.html"
const html = await (await fetch(url)).text();
var articleContent = extractMainContentFromHTML(html);
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
Based on [Mozilla Readability (2015)](https://github.com/mozilla/readability)

## Other

### classWeight()

```ts
function classWeight(
   elem: Element, 
   positiveRe: RegExp, 
   negativeRe: RegExp): number;
```

Defined in: extractor/html-to-content/extract-content/extract-content-readability.js:249

Calculates the weight of an element based on its class and id attributes.

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

`elem`

</td>
<td>

`Element`

</td>
<td>

The element to calculate weight for

</td>
</tr>
<tr>
<td>

`positiveRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for positive indicators

</td>
</tr>
<tr>
<td>

`negativeRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for negative indicators

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

The calculated weight

***

### getLinkDensity()

```ts
function getLinkDensity(elem: Element): number;
```

Defined in: extractor/html-to-content/extract-content/extract-content-readability.js:229

Calculates the link density of an element.

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

`elem`

</td>
<td>

`Element`

</td>
<td>

The element to calculate link density for

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

The link density (ratio of link text length to total text length)

***

### sanitize()

```ts
function sanitize(
   node: Element, 
   candidates: any, 
   videoRe: RegExp, 
   positiveRe: RegExp, 
   negativeRe: RegExp, 
   minTextLength: number): Element;
```

Defined in: extractor/html-to-content/extract-content/extract-content-readability.js:317

Sanitizes the content by removing unwanted elements and cleaning remaining elements.

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

`node`

</td>
<td>

`Element`

</td>
<td>

The node to sanitize

</td>
</tr>
<tr>
<td>

`candidates`

</td>
<td>

`any`

</td>
<td>

Object containing scored candidates

</td>
</tr>
<tr>
<td>

`videoRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for video URLs

</td>
</tr>
<tr>
<td>

`positiveRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for positive indicators

</td>
</tr>
<tr>
<td>

`negativeRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for negative indicators

</td>
</tr>
<tr>
<td>

`minTextLength`

</td>
<td>

`number`

</td>
<td>

Minimum text length to consider

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

The sanitized node

***

### scoreNode()

```ts
function scoreNode(
   elem: Element, 
   positiveRe: RegExp, 
   negativeRe: RegExp): any;
```

Defined in: extractor/html-to-content/extract-content/extract-content-readability.js:270

Scores a node based on its tag name and attributes.

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

`elem`

</td>
<td>

`Element`

</td>
<td>

The element to score

</td>
</tr>
<tr>
<td>

`positiveRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for positive indicators

</td>
</tr>
<tr>
<td>

`negativeRe`

</td>
<td>

`RegExp`

</td>
<td>

Regular expression for negative indicators

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

An object containing the score and the element
