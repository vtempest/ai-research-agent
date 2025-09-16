[ai-research-agent](../../modules.md) / extractor/url-to-content/url-to-content

## Extract

### extractContent()

```ts
function extractContent(urlOrDoc: string | Document, options?: object): object;
```

Defined in: [src/extractor/url-to-content/url-to-content.js:88](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L88)

### 🚜📜 Tractor the Text Extractor 
<img width="350px"  src="https://i.imgur.com/nNfHmct.png" />

1. Main Content Detection: Extract the main content from a URL by combining 
Mozilla Readability and Postlight Mercury algorithms, utilizing over 100 
custom adapters for major sites for article, author, date HTML classes.
2. Basic HTML Standardization: Transform complex HTML into a simplified 
reading-mode format of basic HTML, making it ideal for research note archival
 and focused reading, with headings, images and links.
3. YouTube Transcript Processing: When a YouTube video URL is detected, 
retrieve the complete video transcript including both manual captions and 
auto-generated subtitles, maintaining proper timestamp synchronization and 
speaker identification where available.
4. PDF to HTML: Process PDF documents by extracting
 formatted text while intelligently handling line breaks, page headers, 
 footnotes. The system analyzes text height statistics to automatically
 infer heading levels, creating a properly structured document hierarchy
 based on standard deviation from mean text size.
5. Citation Information Extraction: Identify and extract citation metadata
 including author names, publication dates, sources, and titles using HTML
 meta tags and common class name patterns. The system validates author names
 against a comprehensive database of 90,000 first and last names, 
distinguishing between personal and organizational authors to properly 
format citations.
6. Author Name Formatting: Process author names by checking against 
known name databases, handling affixes and titles correctly, and determining
 whether to reverse the name order based on whether it's a personal or 
organizational author, ensuring proper citation formatting.
7. Content Validation: Verify the extracted content's accuracy by comparing
 results from multiple extraction methods, ensuring all essential elements 
are preserved and properly formatted for the intended use case.

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

`urlOrDoc`

</td>
<td>

`string` \| `Document`

</td>
<td>

url or dom object with article content

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `absoluteURLs`: `boolean`; `formatting`: `boolean`; `images`: `boolean`; `links`: `boolean`; `timeout`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.absoluteURLs?`

</td>
<td>

`boolean`

</td>
<td>

default=true - convert URLs to absolute

</td>
</tr>
<tr>
<td>

`options.formatting?`

</td>
<td>

`boolean`

</td>
<td>

default=true - preserve formatting

</td>
</tr>
<tr>
<td>

`options.images?`

</td>
<td>

`boolean`

</td>
<td>

default=true - include images

</td>
</tr>
<tr>
<td>

`options.links?`

</td>
<td>

`boolean`

</td>
<td>

default=true - include links

</td>
</tr>
<tr>
<td>

`options.timeout?`

</td>
<td>

`number`

</td>
<td>

default=5 - http request timeout

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

* cite - Cite in APA Format with Author name in Last, First Initial format
 * url - The URL of the article
 *  html - The HTML content of the article
 *  author - The author of the article
 *  author_cite - Author name in Last, First Middle format
 *  author_short - Author name in Last format
 *  author_type - Author type ["single", "two-author", "more-than-two", "organization"]
 *  date - The publication date of the article
 *  title - The title of the article
 *  source - The source or origin of the article
 *  word_count - The word count of the full text (without HTML tags)

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

[src/extractor/url-to-content/url-to-content.js:68](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L68)

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

[src/extractor/url-to-content/url-to-content.js:66](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L66)

</td>
</tr>
<tr>
<td>

`cite`

</td>
<td>

`string`

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:67](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L67)

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

[src/extractor/url-to-content/url-to-content.js:69](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L69)

</td>
</tr>
<tr>
<td>

`html`

</td>
<td>

`string`

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:71](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L71)

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

[src/extractor/url-to-content/url-to-content.js:70](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L70)

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

[src/extractor/url-to-content/url-to-content.js:65](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L65)

</td>
</tr>
<tr>
<td>

`word_count`

</td>
<td>

`number`

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:72](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L72)

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### Article

Defined in: [src/extractor/url-to-content/url-to-content.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L9)

#### Properties

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

The full name of the author of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L13)

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

Author name in Last, First Initial format

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L14)

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

Author name in Last format

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L15)

</td>
</tr>
<tr>
<td>

<a id="author_type"></a> `author_type`

</td>
<td>

`number`

</td>
<td>

Author type ["single", "two-author", "more-than-two", "organization"]

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L16)

</td>
</tr>
<tr>
<td>

<a id="cite"></a> `cite`

</td>
<td>

`string`

</td>
<td>

Cite in APA Format with Author name in Last, First Initial format

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L10)

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

The publication date of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L17)

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

The Basic HTML content of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L11)

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

The source or publisher of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L19)

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

The title of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L18)

</td>
</tr>
<tr>
<td>

<a id="url"></a> `url`

</td>
<td>

`string`

</td>
<td>

The URL of the article

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L12)

</td>
</tr>
<tr>
<td>

<a id="word_count"></a> `word_count`

</td>
<td>

`number`

</td>
<td>

The word count of the full text (without HTML tags)

</td>
<td>

[src/extractor/url-to-content/url-to-content.js:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L20)

</td>
</tr>
</tbody>
</table>
