## Extract

### extractContent()

```ts
function extractContent(urlOrDoc: string | Document, options?: object): object;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:88](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L88)

### 🚜📜 Tractor the Text Extractor 
<img width="350px"  src="https://i.imgur.com/NUcvBaY.png" />

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

\{ `images`: `boolean`; `links`: `boolean`; `formatting`: `boolean`; `absoluteURLs`: `boolean`; `timeout`: `number`; \}

</td>
<td>

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

`title`

</td>
<td>

`string`

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:65](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L65)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:66](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L66)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:67](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L67)

</td>
</tr>
<tr>
<td>

`author`

</td>
<td>

`string`

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:68](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L68)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:69](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L69)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:70](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L70)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:71](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L71)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:72](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L72)

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### scrapeURL()

```ts
function scrapeURL(url: string, options?: object): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js:44](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L44)

### Tardigrade the Web Crawler 
<img src="https://i.imgur.com/XXXTprT.png" width="350px" /> 

1. **Use Fetch API, check for bot detection.** Scrape  any domain's URL to get its HTML, JSON, or arraybuffer.<br />
Scraping internet pages is a [free speech right 
](https://blog.apify.com/is-web-scraping-legal/).
2. Features: timeout, redirects, default UA, referer as google, and bot 
detection checking. <br />
3. If fetch method does not get needed HTML, use Docker proxy as backup.

4. [Setup Docker](https://github.com/vtempest/ai-research-agent/tree/master/src/crawler)
 container with NodeJS server API renders with puppeteer DOM to get all HTML loaded by
 secondary in-page API requests after the initial page request, including user login and cookie storage.
5. Bypass Cloudflare bot check: A webpage proxy that request through Chromium (puppeteer) - can be used
to bypass Cloudflare anti bot using cookie id javascript method.
6. Send your request to the server with the port 3000 and add your URL to the "url"
 query string like this: `http://localhost:3000/?url=https://example.org`

7. Optional: Setup residential IP proxy to access sites that IP-block datacenters
 and manage rotation with [Scrapoxy](https://scrapoxy.io). Recommended:
[Hypeproxy](https://hypeproxy.io/products/static-residential-proxies)
[NinjasProxy](https://ninjasproxy.com/residential-proxies/)
[Proxy-Cheap](https://app.proxy-cheap.com/order)
[LiveProxies](https://liveproxies.io/rotating-residential-proxies-pricing)

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

`url`

</td>
<td>

`string`

</td>
<td>

any domain's URL

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `timeout`: `number`; `maxRedirects`: `number`; `checkBotDetection`: `number`; `changeReferer`: `number`; `userAgentIndex`: `number`; `proxy`: `string`; `checkRobotsAllowed`: `boolean`; \}

</td>
<td>

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

default=5 -  abort request if not retrived, in seconds

</td>
</tr>
<tr>
<td>

`options.maxRedirects?`

</td>
<td>

`number`

</td>
<td>

default=3 - max redirects to follow

</td>
</tr>
<tr>
<td>

`options.checkBotDetection?`

</td>
<td>

`number`

</td>
<td>

default=true - check for bot detection messages

</td>
</tr>
<tr>
<td>

`options.changeReferer?`

</td>
<td>

`number`

</td>
<td>

default=true - set referer as google

</td>
</tr>
<tr>
<td>

`options.userAgentIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - index of [google bot, default chrome]

</td>
</tr>
<tr>
<td>

`options.proxy?`

</td>
<td>

`string`

</td>
<td>

default=false - use proxy url

</td>
</tr>
<tr>
<td>

`options.checkRobotsAllowed?`

</td>
<td>

`boolean`

</td>
<td>

default=false - check robots.txt rules

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

-  HTML, JSON, arraybuffer, or error object

#### Example

```ts
await scrapeURL("https://hckrnews.com", {timeout: 5, userAgentIndex: 1})
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### convertYoutubeToText()

```ts
function convertYoutubeToText(videoUrl: string, options?: object): object;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js#L19)

Fetch youtube.com video's webpage HTML for embedded transcript.
If blocked, use scraper of alternative sites providing transcripts.

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

`videoUrl`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `addTimestamps`: `boolean`; `timeout`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.addTimestamps?`

</td>
<td>

`boolean`

</td>
<td>

default=true -
true to return timestamps, default true

</td>
</tr>
<tr>
<td>

`options.timeout?`

</td>
<td>

`boolean`

</td>
<td>

default=5 - http request timeout

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

where content is the full text of the transcript,
timestamps is a string of comma-separated [characterIndex, timeSeconds] pairs,
and word_count is the number of words in the transcript.

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

`content`

</td>
<td>

`string`

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js#L12)

</td>
</tr>
<tr>
<td>

`timestamps`

</td>
<td>

`string`

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js#L12)

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

[packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js#L12)

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### convertPDFToHTML()

```ts
function convertPDFToHTML(pdfURLOrBuffer: string, options?: object): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/pdf-to-html.js:46](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/pdf-to-html.js#L46)

### Convert PDF to HTML 
<img src="https://i.imgur.com/6IdNDLP.png" width="350px" />

Extracts formatted text from PDF with parsing of linebreaks ,
page headers, footnotes, and section headings. Supports fonts, links, bold, 
italics, lists, headings, headers, footnotes, and Table of Contents, 
Quotes, and Code Blocks, . Removes repeated headers, links footnote anchors to the footnote,
 and preserves number of the PDF page with invisible I element.

This function uses [pdfjs-serverless](https://github.com/johannschopplich/pdfjs-serverless) 
to work in more environments than PDF.js-based tools: 
Cloudflare workers, serverless, node.js, and front-end only.

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

`pdfURLOrBuffer`

</td>
<td>

`string`

</td>
<td>

URL to a PDF file or buffer from fs.readFile

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `addPageNumbers`: `boolean`; `removePageHeaders`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.addPageNumbers?`

</td>
<td>

`boolean`

</td>
<td>

default=false - Adds  #  to end of each page

</td>
</tr>
<tr>
<td>

`options.removePageHeaders?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Removes repeated headers found on each page

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

HTML formatted text

#### Author

[ai-research-agent (2024)](https://airesearch.js.org),
[pdf-to-markdown (2017)](https://github.com/jzillmann/pdf-to-markdown/tree/master),
[pdf.js (2012-)](https://github.com/mozilla/pdf.js/releases),

***

### convertDOCXToHTML()

```ts
function convertDOCXToHTML(input: string | Blob | ArrayBuffer | File, options?: DocxOptions): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:54](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L54)

Converts a DOCX document to HTML

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

`input`

</td>
<td>

`string` \| `Blob` \| `ArrayBuffer` \| `File`

</td>
<td>

DOCX input to convert

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`DocxOptions`](#docxoptions)

</td>
<td>

Conversion options

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

The converted HTML

#### Throws

If conversion fails

#### Example

```ts
const html = await convertDOCXToHTML('https://example.com/doc.docx');
const html = await convertDOCXToHTML(fileInput.files[0]);
```

***

### extractMainContentFromHTML()

```ts
function extractMainContentFromHTML(html: any, options?: object): Element;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js:60](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js#L60)

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

***

### extractMainContentFromHTML2()

```ts
function extractMainContentFromHTML2(html: string, opts?: object): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-mercury.js:62](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-mercury.js#L62)

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

\{ `stripUnlikelyCandidates`: `boolean`; `weightNodes`: `boolean`; `cleanConditionally`: `boolean`; \}

</td>
<td>

The options for content extraction.

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

***

### extractCite()

```ts
function extractCite(document: Document, options: object): object;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:25](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L25)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

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

[packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-cite.js#L21)

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Generate

### generateLanguageResponse()

```ts
function generateLanguageResponse(options: object): Promise<{
  content: string;
  extract: any;
  error: string;
}>;
```

Defined in: [packages/ai-research-agent/src/agents/reply-language.js:85](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/reply-language.js#L85)

### Generate Language Response
Generates language response to language prompt with agent templates.

- _Requires_: LLM provider, API Key, and either prompt or context and agent.
- _Providers_: groq, togetherai, openai, anthropic, xai, google, perplexity
- _Agent Templates_: summarize-bullets(article), summarize(article),
suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
query-resolution(chat_history, query), knowledge-graph-nodes(query, article),
summary-longtext(summaries)
- _How it Works_: Language models are trained on vast amounts of text to predict
the most likely next word or sequence of words given a prompt. They represent words and
their contexts as high-dimensional vectors, allowing them to capture complex relationships
and nuances in language. Using neural network architectures like transformers, these models
analyze input text, apply attention mechanisms to understand context by multiplying scores
of all other words, using multiple attention head starting points, and generate human-like
responses based on learned patterns.

<img src="https://i.imgur.com/bailW5n.gif" />
<img src="https://i.imgur.com/uW6E9VJ.gif" />

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

`options`

</td>
<td>

\{ `agent?`: `string`; `provider`: `string`; `apiKey`: `string`; `prompt`: `string` \| `any`[]; `model?`: `string`; `temperature?`: `number`; \}

</td>
<td>

parameters

</td>
</tr>
<tr>
<td>

`options.agent?`

</td>
<td>

`string`

</td>
<td>

Agent prompt to use with custom variables passed, instead of prompt

</td>
</tr>
<tr>
<td>

`options.provider`

</td>
<td>

`string`

</td>
<td>

LLM provider: groq, openai, anthropic, together, xai, google

</td>
</tr>
<tr>
<td>

`options.apiKey`

</td>
<td>

`string`

</td>
<td>

API key for the specified provider

</td>
</tr>
<tr>
<td>

`options.prompt`

</td>
<td>

`string` \| `any`[]

</td>
<td>

User's input query text string or LangChain messages array

</td>
</tr>
<tr>
<td>

`options.model?`

</td>
<td>

`string`

</td>
<td>

Optional model name. If not provided, uses default

</td>
</tr>
<tr>
<td>

`options.temperature?`

</td>
<td>

`number`

</td>
<td>

Temperature is a way to control the overall confidence of the model's scores
 (the logits). What this means is that, if you use a lower value than 1.0, the relative
 distance between the tokens will become larger (more deterministic), and if you use a larger
 value than 1.0, the relative distance between the tokens becomes smaller (less deterministic).

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `content`: `string`;
  `extract`: `any`;
  `error`: `string`;
\}&gt;

Language response with human-like understanding of the question and context.
"content" is HTML (or markdown if requested)
"data" is a JSON object from response extracted by some agents
"error" is an error message if one occurs

#### See

- [Groq Docs](https://console.groq.com/docs/overview) [Groq Keys](https://console.groq.com/keys):
  Llama, Mixtral 8x7B, Gemma2 9B
- [OpenAI Docs](https://platform.openai.com/docs/overview) [OpenAI Keys](https://platform.openai.com/api-keys):
  GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4 Omni, GPT-4 Omni Mini
- [Anthropic Docs](https://docs.anthropic.com/en/docs/welcome) [Anthropic Keys](https://console.anthropic.com/settings/keys):
  Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- [TogetherAI Docs](https://docs.together.ai/docs/quickstart) [TogetherAI Keys](https://api.together.xyz/settings/api-keys):
 Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena.
- [XAI Docs](https://docs.x.ai/docs#models) [XAI Keys](https://console.x.ai/): Grok, Grok Vision
- [Google Vertex Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models)
  [Google Vertex Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini
- [Perplexity Docs](https://docs.perplexity.ai/models/model-cards)
   [Perplexity Keys](https://www.perplexity.ai/settings/keys): Sonar, Sonar Deep Research

#### Author

[Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)

#### Example

```ts
const response = await generateLanguageResponse({
  prompt: "Explain neural networks",
  provider: "groq",
  apiKey: "your-api-key"
})
```

***

### extractJSONFromLanguageReply()

```ts
function extractJSONFromLanguageReply(text: string, key?: string): any[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-prompts.js:244](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-prompts.js#L244)

Extracts and cleans content between XML-style tags and returns a JSON object.

#### Parameters

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

`text`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Input text to parse

</td>
</tr>
<tr>
<td>

`key?`

</td>
<td>

`string`

</td>
<td>

`null`

</td>
<td>

Tag name to look for

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[]

Array of objects containing cleaned content items

***

### convertOpenAPIToLangChainTools()

```ts
function convertOpenAPIToLangChainTools(fileContents: string): string;
```

Defined in: [packages/ai-research-agent/src/agents/api2ai.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/api2ai.js#L22)

### API2AI 

Translates any website's OpenAPI.yml file to LLM agent tool
format with Zod schemas for validation, and returns the content
of a tools.js file that exports these tools

[List of public apis](https://github.com/public-apis/public-apis)
[public apis](https://publicapis.dev/category/business)

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

`fileContents`

</td>
<td>

`string`

</td>
<td>

OpenAPI YAML file contents

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

Content of tools.js file with exported tools

#### Example

```ts
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const toolsFileContent = convertOpenAPIToAgentTools(fileContents);
fs.writeFileSync('tools.js', toolsFileContent);
```

***

### LANGUAGE\_MODELS

```ts
const LANGUAGE_MODELS: (
  | {
  provider: string;
  docs: string;
  api_key: string;
  models: object[];
  default?: undefined;
}
  | {
  provider: string;
  docs: string;
  api_key: string;
  default: string;
  models: (
     | {
     name: string;
     id: string;
     contextLength: number;
     provider: string;
     type?: undefined;
   }
     | {
     name: string;
     id: string;
     contextLength: number;
     provider: string;
     type: string;
  })[];
}
  | {
  provider: string;
  docs: string;
  api_key: string;
  default: string;
  models: (
     | {
     name: string;
     id: string;
     contextLength: number;
     type: string;
   }
     | {
     name: string;
     id: string;
     contextLength: number;
     type?: undefined;
  })[];
})[];
```

Defined in: [packages/ai-research-agent/src/agents/language-model-names.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/language-model-names.js#L10)

List of default models for the chat providers and a list of models

***

### AGENT\_PROMPTS

```ts
const AGENT_PROMPTS: (
  | {
  name: string;
  template: string;
  before: (prompt: any, params: any) => any;
  after: any;
}
  | {
  name: string;
  template: string;
  after: (content: any, options: object) => any[];
  before?: undefined;
})[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-prompts.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-prompts.js#L12)

Agent prompt templates which have in brackets the needed 
variables and reformat the response in json with a callback.

## HTML Utilities

### highlightCodeSyntax()

```ts
function highlightCodeSyntax(node: Node): any;
```

Defined in: [packages/ai-research-agent/src/interface/highlight-code.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/highlight-code.js#L11)

Take a node and make it so that any code blocks are syntax highlighted.

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

`Node`

</td>
<td>

The node to be highlighted.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

An object with a destroy method to clean up the mutation observer.

#### Example

```ts

```

***

### convertMathLaTexToImage()

```ts
function convertMathLaTexToImage(html: string): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L10)

Convert LaTex &lt;math&gt; equations found inside HTML
into easy-to-read SVG and HTML with [KaTex.js](https://katex.org).

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

html with  math Latex

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

html with SVG of equations

***

### convertEscapedHTMLToHTML()

```ts
function convertEscapedHTMLToHTML(str: string, unescape: boolean): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:63](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L63)

Converts HTML special characters like &"'`&rsquo; to & escaped codes or vice versa.
It handles named entities and hexadecimal numeric character references.

#### Parameters

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

`str`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The string to process.

</td>
</tr>
<tr>
<td>

`unescape`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

default=true - If true, converts & codes to characters.
                                    If false, converts characters to codes.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The processed string.

#### Example

```ts
var normalHTML = convertEscapedHTMLToHTML('&lt;p&gt;This &amp; that &copy; 2023 '+
'&quot;Quotes&quot;&#39;Apostrophes&#39; &euro;100 &#x263A;&lt;/p&gt;', true)
console.log(normalHTML) // Returns: "<p>This & that © 2023 "Quotes" 'Apostrophes' €100 ☺</p>"
```

***

### convertURLToAbsoluteURL()

```ts
function convertURLToAbsoluteURL(base: string, relative: string): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:138](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L138)

Convert relative URL to absolute URL using base URL.

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

`base`

</td>
<td>

`string`

</td>
<td>

base url of the domain

</td>
</tr>
<tr>
<td>

`relative`

</td>
<td>

`string`

</td>
<td>

partial urls like ../images/image.jpg #hash

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

absolute URL

#### Example

```ts
var absoluteURL = convertURLToAbsoluteURL('https://example.com', 'images/image.jpg')
console.log(absoluteURL) // Returns: "https://example.com/images/image.jpg"
var absoluteURL = convertURLToAbsoluteURL('https://example.com', '//images/image.jpg')
console.log(absoluteURL) // Returns: "https:images/image.jpg"
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### convertMarkdownToHTML()

```ts
function convertMarkdownToHTML(content: string, toHtml: boolean): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:216](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L216)

Converts Markdown text to HTML. It handles the following Markdown elements:
- Headers (h1 to h6)
- Bold text
- Italic text
- Unordered lists
- Ordered lists
- Paragraphs
- Images
- Links
- Code blocks

#### Parameters

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

`content`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The Markdown or HTML content to be converted.

</td>
</tr>
<tr>
<td>

`toHtml`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

default=true - If true, converts Markdown to HTML.
                         If false, converts HTML to Markdown.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The resulting HTML string.

#### Example

```ts
const markdown = "# Header\n\nThis is **bold** and *italic* text.\n\n* List item 1\n* List item 2";
const html = convertMarkdownToHTML(markdown);
console.log(html);
// Output:
// <h1>Header</h1>
// <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
// <ul><li>List item 1</li><li>List item 2</li></ul>
```

***

### copyHTMLToClipboard()

```ts
function copyHTMLToClipboard(html: string, options: object): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:422](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L422)

Copy HTML to clipboard. When pasting into rich text field,
pastes rich text. When pasting into plain text field, pastes:
plain text, html, or markdown.

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

The HTML content to be copied.

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `pastePlainFormat`: `number`; \}

</td>
<td>

The options object.

</td>
</tr>
<tr>
<td>

`options.pastePlainFormat`

</td>
<td>

`number`

</td>
<td>

default=0
0 - plain text
1 - markdown
2 - html

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

- A promise that resolves when
the HTML is copied to the clipboard.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### convertHTMLToBasicHTML()

```ts
function convertHTMLToBasicHTML(html: string, options?: object): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-to-basic-html.js:33](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-to-basic-html.js#L33)

Strip HTML to ~30 basic markup HTML tags, lists, tables, images.
Convert anchors and relative urls to absolute urls. Basic HTML supports the same
elements as Markdown, which is used in writing plain text. Markdown is converted
to HTML anyways to display it, and it is better to edit basic HTML in a rich text editor.

[Mozilla DOM Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) <br />
[Source Code of Browser HTML DOM](https://chromium.googlesource.com/chromium/src/+/HEAD/third_party/blink/renderer/core/dom/) <br />
[RegExp JS V8 Code](https://github.com/v8/v8/blob/94cde7c7f3fffc62f621e43f65be3d517b8a9f3d/src/regexp/regexp-compiler.cc#L3827)

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

Any page's HTML to process

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `images`: `boolean`; `links`: `boolean`; `videos`: `boolean`; `formatting`: `boolean`; `url`: `string`; `allowTags`: `string`; `allowedAttributes`: `string`; \}

</td>
<td>

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

default=true - Whether to include images

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

default=true - Whether to include links

</td>
</tr>
<tr>
<td>

`options.videos?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Whether to include videos or not

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

default=true - Whether to include formatting

</td>
</tr>
<tr>
<td>

`options.url?`

</td>
<td>

`string`

</td>
<td>

base URL for converting relative URLs to absolute

</td>
</tr>
<tr>
<td>

`options.allowTags?`

</td>
<td>

`string`

</td>
<td>

default="br,p,u,b,i ,em,strong,h1,h2,h3,h4, h5,h6,blockquote,
code,ul,ol,li,dd,dl, table,th,tr,td,sub,sup" - Comma-separated list of allowed HTML tags.

</td>
</tr>
<tr>
<td>

`options.allowedAttributes?`

</td>
<td>

`string`

</td>
<td>

default="text,tag,href, src,type,width, height,id,data"
  List of allowed HTML attributes

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

basic text formatting html

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Interface

### embedYoutubePlayer()

```ts
function embedYoutubePlayer(): YouTubePlayer;
```

Defined in: [packages/ai-research-agent/src/interface/youtube-embed.js:68](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L68)

Creates video player wrapping <a 
href="https://developers.google.com/youtube/iframe_api_reference">YouTube IFrame Player API</a>
 in a div element with the specified ID.

#### Returns

[`YouTubePlayer`](#youtubeplayer)

An object  containing the YouTube API functionality.

#### Example

```ts
// <div id="player"></div>
 const YT = embedYoutubePlayer();
 new YT.Player('player', {
   height: '360',
   width: '640',
   videoId: 'dQw4w9WgXcQ',
   events: {
     'onReady': onPlayerReady,
     'onStateChange': null,
     'onTimeChange': onTimeChange,
   }
 });
 function onPlayerReady(event) {
   event.target.playVideo();
 }
 function onTimeChange(time) {
   console.log(time)
 }
```

## Match

### weighSimilarityByCharacter()

```ts
function weighSimilarityByCharacter(s1: string, s2: string): number;
```

Defined in: [packages/ai-research-agent/src/match/compare-letters.js:28](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/match/compare-letters.js#L28)

### Jaro-Winkler String Similarity Comparison
<img width="350px"  src="https://i.imgur.com/1qpRzNh.png" /> 

Measures similarity between two strings, taking into account the common characters and
their positions. Jaro-Winkler is often used in record linkage and data cleansing to improve
the accuracy of string matching, particularly for names and addresses, by giving
more weight to the common prefix and penalizing longer string differences.  It is [more 
optimal](https://medium.com/@appaloosastore/string-similarity-algorithms-compared-3f7b4d12f0ff) 
for words than [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance):
1. Edit operations: Levenshtein considers insertions, deletions, and substitutions, 
while Jaro focuses on transpositions.
2. Sensitivity to string length: Levenshtein is more sensitive to overall 
string length, while Jaro normalizes for length in its formula.
3. Prefix matching: The Jaro-Winkler variant explicitly rewards matching 
prefixes, which Levenshtein does not.
4. Scale of results: Levenshtein produces an edit distance (usually converted to a similarity score), 
while Jaro directly produces a similarity score.

[A Comprehensive List of Similarity Search 
Algorithms](https://crucialbits.com/blog/a-comprehensive-list-of-similarity-search-algorithms/)

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

`s1`

</td>
<td>

`string`

</td>
<td>

First string

</td>
</tr>
<tr>
<td>

`s2`

</td>
<td>

`string`

</td>
<td>

Second string

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

0-1 string similarity score

#### Author

[Jaro, M., Winkler, W. (1990)](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)

***

### matchQUASAR()

```ts
function matchQUASAR(document: string, query: string): boolean;
```

Defined in: [packages/ai-research-agent/src/match/match-quasar.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/match/match-quasar.js#L19)

### QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp 

Search document for all words of query ignoring casing
but "words in quotes" as necessarily together like users expect
in web search engines.  Single line function that can be used 
anywhere, such as UI inputs to filter a data list.

<img width="350px"  src="https://i.imgur.com/IuwW97p.png" />

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

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

true if doc has all words and "phrases in quotes"

#### Example

```ts
var isFound = matchQUASAR(`Ask not what your country can do for you, 
ask what you can do for your country.  is nothing to fear but fear itself.`, 
` "Ask not" "but fear itself" nothing`) // returns true
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### weighRelevanceTermFrequency()

```ts
function weighRelevanceTermFrequency(
   document: string, 
   query: string, 
   options?: object): number;
```

Defined in: [packages/ai-research-agent/src/match/weigh-relevance-frequency.js:28](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/match/weigh-relevance-frequency.js#L28)

#### 📈📝 WRITEFAT: Weigh Relevance by Inference of Topics, Entities, and Frequency Averages for Terms
<img width="350px"  src="https://i.imgur.com/e2uTpoh.png" /> 

Calculate term specificity for a single doc with [BM25 
formula](https://www.youtube.com/watch?v=ruBm9WywevM) 
by using Wikipedia term frequencies as the baseline IDF. <br />

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

`string`

</td>
<td>

a single document to calculate the score for

</td>
</tr>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

phrase to search tf and idf for each word

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `saturationWeight`: `number`; `normalizeLength`: `number`; `avgDocWordCount`: `number`; `totalWikiPages`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.saturationWeight?`

</td>
<td>

`number`

</td>
<td>

saturationWeight controls the impact of term frequency saturation.
   It typically ranges from 1.2 to 2.0, with 1.5 being a common default value.
   As saturationWeight increases: The impact of term frequency increases (i.e., multiple occurrences of a term in a document become more significant).

</td>
</tr>
<tr>
<td>

`options.normalizeLength?`

</td>
<td>

`number`

</td>
<td>

normalizeLengthcontrols the document length normalization.
   It ranges from 0 to 1, with 0.75 being a common default value.
   When normalizeLength=1: Full length normalization is applied.
   Longer documents are penalized more heavily.

</td>
</tr>
<tr>
<td>

`options.avgDocWordCount?`

</td>
<td>

`number`

</td>
<td>

Estimated average word count of all documents

</td>
</tr>
<tr>
<td>

`options.totalWikiPages?`

</td>
<td>

`number`

</td>
<td>

Total number of Wikipedia pages used to calculate IDF

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

score for term specificity

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### scrapeJINA()

```ts
function scrapeJINA(url: string): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js:132](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L132)

As backup, scrape with JINA to get html

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

`url`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

***

### fetchScrapingRules()

```ts
function fetchScrapingRules(url: string): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js:211](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L211)

Fetches and parses the robots.txt file for a given URL.

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

`url`

</td>
<td>

`string`

</td>
<td>

The base URL to fetch the robots.txt from.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

A JSON object representing the parsed robots.txt.

***

### convertURLToDomain()

```ts
function convertURLToDomain(domain: string): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-cite/url-to-domain.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/url-to-domain.js#L10)

Extract TLD and hostname from domain in Regex. There's [two or more part 
TLDs](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)
so it is hard to tell if host.secondTLD.tld or host.tld is correct way
to get root domain (e.g. abc.go.jp, abc.co.uk)

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

`domain`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

rootDomain

***

### convertHTMLToMarkdown()

```ts
function convertHTMLToMarkdown(html: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:360](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L360)

#### Parameters

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

`html`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### fetchViaYoutubeToTranscriptCom()

```ts
function fetchViaYoutubeToTranscriptCom(videoId: any, options: object): any;
```

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js:153](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/youtube-to-text.js#L153)

Fetch-based scraper of youtubetotranscript.com

#### Parameters

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

`videoId`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ \}

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

content, timestamps -  where content is the full text of
the transcript, and timestamps is an array of [characterIndex, timeSeconds]

***

### calculatePhraseSpecificity()

```ts
function calculatePhraseSpecificity(phrase: string, options: any): number;
```

Defined in: [packages/ai-research-agent/src/match/weigh-relevance-frequency.js:76](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/match/weigh-relevance-frequency.js#L76)

Calculate overall domain-speicificity after Query Resolution to Phrases. 
Words are tokenized into phrases and their specificity is calculated based on 
how many Wiki pages they appear in.

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

`phrase`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

domain specificity 0-12~

***

### getLinkDensity()

```ts
function getLinkDensity(elem: Element): number;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js:229](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js#L229)

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

### classWeight()

```ts
function classWeight(
   elem: Element, 
   positiveRe: RegExp, 
   negativeRe: RegExp): number;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js:249](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js#L249)

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

### scoreNode()

```ts
function scoreNode(
   elem: Element, 
   positiveRe: RegExp, 
   negativeRe: RegExp): any;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js:270](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js#L270)

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

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js:317](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/extract-content/extract-content-readability.js#L317)

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

### addDOMFunctions()

```ts
function addDOMFunctions(domObject: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-to-basic-html.js:228](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-to-basic-html.js#L228)

#### Parameters

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

`domObject`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### Article

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L9)

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

<a id="cite"></a> `cite`

</td>
<td>

`string`

</td>
<td>

Cite in APA Format with Author name in Last, First Initial format

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L10)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L11)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L12)

</td>
</tr>
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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L13)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L14)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L15)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L16)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L17)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L18)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L19)

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

[packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-content.js#L20)

</td>
</tr>
</tbody>
</table>

***

### Token

Defined in: [packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js:4](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js#L4)

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

<a id="termcategory"></a> `termCategory`

</td>
<td>

`number`

</td>
<td>

The category of the term

</td>
<td>

[packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js#L5)

</td>
</tr>
<tr>
<td>

<a id="uniqueness"></a> `uniqueness`

</td>
<td>

`number`

</td>
<td>

The uniqueness score of the term

</td>
<td>

[packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js#L6)

</td>
</tr>
<tr>
<td>

<a id="term"></a> `term`

</td>
<td>

`string`

</td>
<td>

The actual term or phrase

</td>
<td>

[packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js#L7)

</td>
</tr>
</tbody>
</table>

***

### ParagraphStyle

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:220](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L220)

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

<a id="alignment"></a> `alignment?`

</td>
<td>

`string`

</td>
<td>

Text alignment (left, right, center, justify)

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:221](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L221)

</td>
</tr>
<tr>
<td>

<a id="spacing"></a> `spacing?`

</td>
<td>

`string`

</td>
<td>

Line spacing

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:222](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L222)

</td>
</tr>
<tr>
<td>

<a id="indentation"></a> `indentation?`

</td>
<td>

`string`

</td>
<td>

Paragraph indentation

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:223](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L223)

</td>
</tr>
<tr>
<td>

<a id="keepnext"></a> `keepNext?`

</td>
<td>

`boolean`

</td>
<td>

Keep with next paragraph

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:224](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L224)

</td>
</tr>
<tr>
<td>

<a id="pagebreakbefore"></a> `pageBreakBefore?`

</td>
<td>

`boolean`

</td>
<td>

Force page break before

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:225](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L225)

</td>
</tr>
</tbody>
</table>

***

### RunStyle

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:229](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L229)

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

<a id="bold"></a> `bold?`

</td>
<td>

`boolean`

</td>
<td>

Bold text

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:230](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L230)

</td>
</tr>
<tr>
<td>

<a id="italic"></a> `italic?`

</td>
<td>

`boolean`

</td>
<td>

Italic text

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:231](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L231)

</td>
</tr>
<tr>
<td>

<a id="underline"></a> `underline?`

</td>
<td>

`boolean`

</td>
<td>

Underlined text

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:232](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L232)

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color?`

</td>
<td>

`string`

</td>
<td>

Text color

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:233](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L233)

</td>
</tr>
<tr>
<td>

<a id="highlight"></a> `highlight?`

</td>
<td>

`string`

</td>
<td>

Highlight color

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:234](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L234)

</td>
</tr>
<tr>
<td>

<a id="size"></a> `size?`

</td>
<td>

`string`

</td>
<td>

Font size

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:235](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L235)

</td>
</tr>
<tr>
<td>

<a id="font"></a> `font?`

</td>
<td>

`string`

</td>
<td>

Font family

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:236](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L236)

</td>
</tr>
</tbody>
</table>

***

### DocxOptions

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L5)

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

<a id="preserveshapes"></a> `preserveShapes?`

</td>
<td>

`boolean`

</td>
<td>

Whether to preserve shape elements

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L6)

</td>
</tr>
<tr>
<td>

<a id="includestyles"></a> `includeStyles?`

</td>
<td>

`boolean`

</td>
<td>

Whether to include document styles

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L7)

</td>
</tr>
<tr>
<td>

<a id="imgpath"></a> `imgPath?`

</td>
<td>

`string`

</td>
<td>

Base path for image resources

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L8)

</td>
</tr>
</tbody>
</table>

***

### StyleConfig

Defined in: [packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L13)

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

<a id="block"></a> `block`

</td>
<td>

`boolean`

</td>
<td>

If true, element is rendered as block

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L14)

</td>
</tr>
<tr>
<td>

<a id="heading"></a> `heading?`

</td>
<td>

`boolean`

</td>
<td>

If true, element is a heading

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L15)

</td>
</tr>
<tr>
<td>

<a id="element"></a> `element`

</td>
<td>

`string`

</td>
<td>

HTML element name

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L16)

</td>
</tr>
<tr>
<td>

<a id="xmlname"></a> `xmlName?`

</td>
<td>

`string`

</td>
<td>

DOCX XML element name

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L17)

</td>
</tr>
<tr>
<td>

<a id="class"></a> `class?`

</td>
<td>

`string`

</td>
<td>

CSS class name

</td>
<td>

[packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L18)

</td>
</tr>
</tbody>
</table>

***

### YouTubePlayer

Defined in: [packages/ai-research-agent/src/interface/youtube-embed.js:2](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L2)

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

<a id="loadvideobyid"></a> `loadVideoById`

</td>
<td>

`Function`

</td>
<td>

Loads a specified video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L3)

</td>
</tr>
<tr>
<td>

<a id="cuevideobyid"></a> `cueVideoById`

</td>
<td>

`Function`

</td>
<td>

Cues a specified video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:4](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L4)

</td>
</tr>
<tr>
<td>

<a id="loadvideobyurl"></a> `loadVideoByUrl`

</td>
<td>

`Function`

</td>
<td>

Loads a video by URL.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L5)

</td>
</tr>
<tr>
<td>

<a id="cuevideobyurl"></a> `cueVideoByUrl`

</td>
<td>

`Function`

</td>
<td>

Cues a video by URL.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L6)

</td>
</tr>
<tr>
<td>

<a id="loadplaylist"></a> `loadPlaylist`

</td>
<td>

`Function`

</td>
<td>

Loads a playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L7)

</td>
</tr>
<tr>
<td>

<a id="cueplaylist"></a> `cuePlaylist`

</td>
<td>

`Function`

</td>
<td>

Cues a playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L8)

</td>
</tr>
<tr>
<td>

<a id="playvideo"></a> `playVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the currently loaded video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L9)

</td>
</tr>
<tr>
<td>

<a id="pausevideo"></a> `pauseVideo`

</td>
<td>

`Function`

</td>
<td>

Pauses the currently playing video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L10)

</td>
</tr>
<tr>
<td>

<a id="stopvideo"></a> `stopVideo`

</td>
<td>

`Function`

</td>
<td>

Stops the currently playing video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L11)

</td>
</tr>
<tr>
<td>

<a id="seekto"></a> `seekTo`

</td>
<td>

`Function`

</td>
<td>

Seeks to a specified time in the video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L12)

</td>
</tr>
<tr>
<td>

<a id="nextvideo"></a> `nextVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the next video in the playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L13)

</td>
</tr>
<tr>
<td>

<a id="previousvideo"></a> `previousVideo`

</td>
<td>

`Function`

</td>
<td>

Plays the previous video in the playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L14)

</td>
</tr>
<tr>
<td>

<a id="playvideoat"></a> `playVideoAt`

</td>
<td>

`Function`

</td>
<td>

Plays a specific video in the playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L15)

</td>
</tr>
<tr>
<td>

<a id="mute"></a> `mute`

</td>
<td>

`Function`

</td>
<td>

Mutes the player.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L16)

</td>
</tr>
<tr>
<td>

<a id="unmute"></a> `unMute`

</td>
<td>

`Function`

</td>
<td>

Unmutes the player.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L17)

</td>
</tr>
<tr>
<td>

<a id="ismuted"></a> `isMuted`

</td>
<td>

`Function`

</td>
<td>

Checks if the player is muted.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L18)

</td>
</tr>
<tr>
<td>

<a id="setvolume"></a> `setVolume`

</td>
<td>

`Function`

</td>
<td>

Sets the player volume.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L19)

</td>
</tr>
<tr>
<td>

<a id="getvolume"></a> `getVolume`

</td>
<td>

`Function`

</td>
<td>

Gets the player volume.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L20)

</td>
</tr>
<tr>
<td>

<a id="setsize"></a> `setSize`

</td>
<td>

`Function`

</td>
<td>

Sets the player size.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L21)

</td>
</tr>
<tr>
<td>

<a id="getplaybackrate"></a> `getPlaybackRate`

</td>
<td>

`Function`

</td>
<td>

Gets the playback rate.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L22)

</td>
</tr>
<tr>
<td>

<a id="setplaybackrate"></a> `setPlaybackRate`

</td>
<td>

`Function`

</td>
<td>

Sets the playback rate.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L23)

</td>
</tr>
<tr>
<td>

<a id="getavailableplaybackrates"></a> `getAvailablePlaybackRates`

</td>
<td>

`Function`

</td>
<td>

Gets available playback rates.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:24](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L24)

</td>
</tr>
<tr>
<td>

<a id="setloop"></a> `setLoop`

</td>
<td>

`Function`

</td>
<td>

Sets whether the player should loop playlists.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:25](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L25)

</td>
</tr>
<tr>
<td>

<a id="setshuffle"></a> `setShuffle`

</td>
<td>

`Function`

</td>
<td>

Sets whether playlists should be shuffled.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:26](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L26)

</td>
</tr>
<tr>
<td>

<a id="getvideoloadedfraction"></a> `getVideoLoadedFraction`

</td>
<td>

`Function`

</td>
<td>

Gets the fraction of the video loaded.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:27](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L27)

</td>
</tr>
<tr>
<td>

<a id="getplayerstate"></a> `getPlayerState`

</td>
<td>

`Function`

</td>
<td>

Gets the current player state.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:28](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L28)

</td>
</tr>
<tr>
<td>

<a id="getcurrenttime"></a> `getCurrentTime`

</td>
<td>

`Function`

</td>
<td>

Gets the current playback time.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:29](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L29)

</td>
</tr>
<tr>
<td>

<a id="getduration"></a> `getDuration`

</td>
<td>

`Function`

</td>
<td>

Gets the video duration.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L30)

</td>
</tr>
<tr>
<td>

<a id="getvideourl"></a> `getVideoUrl`

</td>
<td>

`Function`

</td>
<td>

Gets the URL of the current video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:31](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L31)

</td>
</tr>
<tr>
<td>

<a id="getvideoembedcode"></a> `getVideoEmbedCode`

</td>
<td>

`Function`

</td>
<td>

Gets the embed code for the current video.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:32](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L32)

</td>
</tr>
<tr>
<td>

<a id="getplaylist"></a> `getPlaylist`

</td>
<td>

`Function`

</td>
<td>

Gets the current playlist.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:33](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L33)

</td>
</tr>
<tr>
<td>

<a id="getplaylistindex"></a> `getPlaylistIndex`

</td>
<td>

`Function`

</td>
<td>

Gets the index of the current playlist item.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:34](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L34)

</td>
</tr>
<tr>
<td>

<a id="addeventlistener"></a> `addEventListener`

</td>
<td>

`Function`

</td>
<td>

Adds an event listener.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:35](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L35)

</td>
</tr>
<tr>
<td>

<a id="removeeventlistener"></a> `removeEventListener`

</td>
<td>

`Function`

</td>
<td>

Removes an event listener.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:36](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L36)

</td>
</tr>
<tr>
<td>

<a id="getiframe"></a> `getIframe`

</td>
<td>

`Function`

</td>
<td>

Gets the player iframe element.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:37](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L37)

</td>
</tr>
<tr>
<td>

<a id="destroy"></a> `destroy`

</td>
<td>

`Function`

</td>
<td>

Destroys the player instance.

</td>
<td>

[packages/ai-research-agent/src/interface/youtube-embed.js:38](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/interface/youtube-embed.js#L38)

</td>
</tr>
</tbody>
</table>

***

### SearchResultType

Defined in: [packages/ai-research-agent/src/types.d.ts:1](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L1)

#### Extends

- `Partial`&lt;\{
  `url`: `string`;
  `title`: `string`;
  `snippet`: `string`;
  `score`: `string`;
  `domain`: `string`;
  `favicon`: `string`;
  `source`: `string`;
\}&gt;

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="url-1"></a> `url?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.url
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="title-1"></a> `title?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.title
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:4](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L4)

</td>
</tr>
<tr>
<td>

<a id="snippet"></a> `snippet?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.snippet
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="score"></a> `score?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.score
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="domain"></a> `domain?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.domain
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="favicon"></a> `favicon?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.favicon
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="source-1"></a> `source?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.source
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L9)

</td>
</tr>
</tbody>
</table>

***

### ArticleType

Defined in: [packages/ai-research-agent/src/types.d.ts:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L12)

#### Extends

- `Partial`&lt;\{
  `url`: `string`;
  `title`: `string`;
  `html`: `string`;
  `cite`: `string`;
  `author`: `string`;
  `author_cite`: `string`;
  `author_type`: `string`;
  `date`: `string`;
  `source`: `string`;
  `word_count`: `number`;
  `error`: `string`;
\}&gt;

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="url-2"></a> `url?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.url
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L14)

</td>
</tr>
<tr>
<td>

<a id="title-2"></a> `title?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.title
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="html-1"></a> `html?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.html
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L16)

</td>
</tr>
<tr>
<td>

<a id="cite-1"></a> `cite?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.cite
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="author-1"></a> `author?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.author
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L18)

</td>
</tr>
<tr>
<td>

<a id="author_cite-1"></a> `author_cite?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.author_cite
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L19)

</td>
</tr>
<tr>
<td>

<a id="author_type-1"></a> `author_type?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.author_type
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="date-1"></a> `date?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.date
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="source-2"></a> `source?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.source
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="word_count-1"></a> `word_count?`

</td>
<td>

`number`

</td>
<td>

```ts
Partial.word_count
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L23)

</td>
</tr>
<tr>
<td>

<a id="error"></a> `error?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.error
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:24](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L24)

</td>
</tr>
</tbody>
</table>

***

### AgentPromptType

Defined in: [packages/ai-research-agent/src/types.d.ts:27](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L27)

#### Extends

- `Partial`&lt;\{
  `prompt`: `string`;
  `context`: `string`;
  `tools`: `string`[];
  `variablesNotProvided`: `any`[];
  `error`: `string`;
\}&gt;

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="prompt"></a> `prompt?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.prompt
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:29](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="context"></a> `context?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.context
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="tools"></a> `tools?`

</td>
<td>

`string`[]

</td>
<td>

```ts
Partial.tools
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:31](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="variablesnotprovided"></a> `variablesNotProvided?`

</td>
<td>

`any`[]

</td>
<td>

```ts
Partial.variablesNotProvided
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:32](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="error-1"></a> `error?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.error
```

</td>
<td>

[packages/ai-research-agent/src/types.d.ts:33](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/types.d.ts#L33)

</td>
</tr>
</tbody>
</table>

***

### LANGUAGE\_PROVIDERS

```ts
const LANGUAGE_PROVIDERS: string[];
```

Defined in: [packages/ai-research-agent/src/agents/language-model-names.js:1512](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/language-model-names.js#L1512)

List of available LLM provider services

***

### agentTools

```ts
const agentTools: (
  | {
  name: string;
  description: string;
  schema: ZodObject<{
     input: ZodNumber;
   }, "strip", ZodTypeAny, {
     input?: number;
   }, {
     input?: number;
  }>;
  func: (__namedParameters: object) => Promise<any>;
}
  | {
  name: string;
  description: string;
  schema: ZodObject<{
     location: ZodString;
   }, "strip", ZodTypeAny, {
     location?: string;
   }, {
     location?: string;
  }>;
  func: (location: any) => Promise<string>;
})[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-tools.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L3)

## Search

### searchWeb()

```ts
function searchWeb(query: string, options?: object): Promise<object[]>;
```

Defined in: [packages/ai-research-agent/src/search/search-web.js:37](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-web.js#L37)

Search Web via SearXNG metasearch of all major search engines.
Options are 10 search categories, recency, and how many
times to retry other domains if first time fails.
SearXNG is a free internet metasearch engine which aggregates results from
 more than [180+ search sources](https://docs.searxng.org/user/configured_engines.html).

[Searxng Overview](https://medium.com/@elmo92/search-in-peace-with-searxng-an-alternative-search-engine-that-keeps-your-searches-private-accd8cddd6fc)
[Searxng Installation Guide](https://github.com/searxng/searxng-docker/tree/master)

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

`query`

</td>
<td>

`string`

</td>
<td>

The search query string.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `category`: `string`; `recency`: `number`; `privateSearxng`: `string` \| `boolean`; `maxRetries`: `number`; `page`: `number`; `lang`: `string`; `proxy`: `string`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.category?`

</td>
<td>

`string`

</td>
<td>

default=general - ["general", "news", "videos", "images",
 "science","it", "files", "social+media",  "map", "music"]

</td>
</tr>
<tr>
<td>

`options.recency?`

</td>
<td>

`number`

</td>
<td>

default=0 - ["", "day", "week", "month", "year"]

</td>
</tr>
<tr>
<td>

`options.privateSearxng?`

</td>
<td>

`string` \| `boolean`

</td>
<td>

default=null - Use your custom domain SearXNG

</td>
</tr>
<tr>
<td>

`options.maxRetries?`

</td>
<td>

`number`

</td>
<td>

default=3 - Maximum number of retry attempts if the initial search fails.

</td>
</tr>
<tr>
<td>

`options.page?`

</td>
<td>

`number`

</td>
<td>

default=1 - The page number to retrieve.

</td>
</tr>
<tr>
<td>

`options.lang?`

</td>
<td>

`string`

</td>
<td>

default="en-US" - The language to use for the search.

</td>
</tr>
<tr>
<td>

`options.proxy?`

</td>
<td>

`string`

</td>
<td>

default=false - Use corsproxy.io to access in frontend JS

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`object`[]&gt;

An array of search result objects.

#### Example

```ts
const advancedResults = await searchWeb('Node.js', {
  category: 2,
  recency: 1,
  maxRetries: 5
});
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
[Heiser, M., Tauber, A., Flament, A., et al. (2014-)](https://github.com/searxng/searxng/graphs/contributors)

***

### searchSTREAM()

```ts
function searchSTREAM(query: string, options?: object): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/search/search-stream.js:34](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-stream.js#L34)

### 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 
 <img width="350px"  src="https://i.imgur.com/l5AFrS0.png"  /> 

1. Searches the Web for the query via metasearch of major engines or custom data.<br />
2. Extracts text of top results using Tractor the Text Extractor.<br />
3. Implements SEEKTOPIC to extract Keyphrase Topics and Top Sentences that centralize those topics.<br />
4. Reranks document chunks based on relevance to the query, using embeddings to <br />
convert text to concept vectors within LLM "concept space", and calculates cosine similarity of query to topic. <br />
5. Uses a Research Agent prompt with key sentences from relevant sources to generate an answer via Groq 
 Llama, OpenAI, or Anthropic API, and suggests follow-up queries.

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

`query`

</td>
<td>

`string`

</td>
<td>

The search query string.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `categoryIndex`: `number`; `recencyIndex`: `number`; `maxRetries`: `number`; `maxTopResultsToExtract`: `number`; `customSearxngDomain`: `string`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.categoryIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - Index of the search category.

</td>
</tr>
<tr>
<td>

`options.recencyIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - Index representing the recency of results.

</td>
</tr>
<tr>
<td>

`options.maxRetries?`

</td>
<td>

`number`

</td>
<td>

default=5 - Maximum number of retry attempts for the search.

</td>
</tr>
<tr>
<td>

`options.maxTopResultsToExtract?`

</td>
<td>

`number`

</td>
<td>

default=6 - Maximum number of top results to extract and analyze.

</td>
</tr>
<tr>
<td>

`options.customSearxngDomain?`

</td>
<td>

`string`

</td>
<td>

default=null - Use your custom domain SearXNG

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`[]&gt;

A promise that resolves to an array containing the search results, 
 extracted information, and generated answer.

#### Example

```ts
const advancedResults = await searchSTREAM('Latest developments in quantum computing', {
  categoryIndex: 2,
  recencyIndex: 1,
  maxRetries: 5,
  maxTopResultsToExtract: 10
});
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### searchWikipedia()

```ts
function searchWikipedia(query: string, options?: object): object;
```

Defined in: [packages/ai-research-agent/src/search/search-wikipedia.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-wikipedia.js#L23)

Function to query phrase in Wikipedia Search API and return 
page titles, images and first few sentences of each result. 
 Wikipedia Search API  has complex [documentation](https://www.mediawiki.org/wiki/API:Opensearch)
and is dificult to parse and clean up results.

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

`query`

</td>
<td>

`string`

</td>
<td>

search phrase

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `plainText`: `boolean`; `summarySentenceLimit`: `number`; `limitSearchResults`: `number`; `images`: `boolean`; `imageSize`: `number`; `searchInTitleOnly`: `boolean`; `filterDisambiguation`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.plainText?`

</td>
<td>

`boolean`

</td>
<td>

default=false Return plain text instead of HTML

</td>
</tr>
<tr>
<td>

`options.summarySentenceLimit?`

</td>
<td>

`number`

</td>
<td>

default=3 Limit summary to this many sentences

</td>
</tr>
<tr>
<td>

`options.limitSearchResults?`

</td>
<td>

`number`

</td>
<td>

default=1 Limit number of search results

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

default=true Include image in results

</td>
</tr>
<tr>
<td>

`options.imageSize?`

</td>
<td>

`number`

</td>
<td>

default=200 Image size in pixels

</td>
</tr>
<tr>
<td>

`options.searchInTitleOnly?`

</td>
<td>

`boolean`

</td>
<td>

default=false Search in title only

</td>
</tr>
<tr>
<td>

`options.filterDisambiguation?`

</td>
<td>

`boolean`

</td>
<td>

default=true Filter disambiguation pages

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

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

`results`

</td>
<td>

`object`[]

</td>
<td>

[packages/ai-research-agent/src/search/search-wikipedia.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-wikipedia.js#L19)

</td>
</tr>
</tbody>
</table>

#### Example

```ts
await searchWikipedia("JavaScript", { plainText: true })
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### searchEngines

```ts
const searchEngines: any[];
```

Defined in: [packages/ai-research-agent/src/search/search-engines.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-engines.js#L13)

A list of search engines which can be used to
search selected text. Each item in the list is
 an object with the following properties:
Categories: AI Web Search, Shopping Sites, and Social Media 

- `name`: The name of the search engine.
- `url`: The base search URL that should have the query appended.
- `icon`: A URL or data URL for the search engine. Prepend "data:image/png;base64,"

## Similarity

### weighRelevanceConceptVectorAPI()

```ts
function weighRelevanceConceptVectorAPI(
   source_sentence: string, 
   sentences: string[], 
   options?: object): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/similarity/similarity-remote-api.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/similarity/similarity-remote-api.js#L18)

Calculate the semantic similarity between one text and a list of
other sentences by comparing their embeddings.
https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task

<img src="https://i.imgur.com/ex2UWnu.png" width="350px" />

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

`source_sentence`

</td>
<td>

`string`

</td>
<td>

The string that you wish to
compare the other strings with. This can be a phrase, sentence,
or longer passage, depending on the model being used.

</td>
</tr>
<tr>
<td>

`sentences`

</td>
<td>

`string`[]

</td>
<td>

A list of strings which will be compared
against the source_sentence.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `model`: `string`; `HF_API_KEY`: `string`; \}

</td>
<td>

*

</td>
</tr>
<tr>
<td>

`options.model?`

</td>
<td>

`string`

</td>
<td>

default="sentence-transformers/all-MiniLM-L6-v2"

</td>
</tr>
<tr>
<td>

`options.HF_API_KEY?`

</td>
<td>

`string`

</td>
<td>

Required https://huggingface.co/settings/tokens

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

array of 0-1 similarity scores for each sentence
 *

## Topics

### extractSEEKTOPIC()

```ts
function extractSEEKTOPIC(docText: string, options?: object): object;
```

Defined in: [packages/ai-research-agent/src/topics/seektopic-keyphrases.js:74](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/seektopic-keyphrases.js#L74)

### 🔤📊 SEEKTOPIC: Summarization by Extracting Entities, Keyword Tokens, and Outline Phrases Important to Context 
<img src="https://i.imgur.com/gZ4kI1V.png" width="360px" />

Extracts unique, domain-specific key phrases from a document using noun 
n-grams and ranks sentences based on their centrality to the most frequently 
referenced key phrase concepts,  enabling efficient extraction of 
domain-specific content. This can be a first step to use key sentences or topics
to vectorize or fit more docs into context limit and visualize them in vector space.
1. Sentence Segmentation: Split the text into sentences, accounting for 
   common abbreviations, numbers, URLs, and other exceptions.
2. Tokenization and Phrase Extraction: Employ a Wiki Phrases tokenizer to 
   identify wiki topics, phrases, and nouns. This includes spell-checking 
   and root word verification using Porter Stemmer.
3. Noun N-gram Extraction: Generate noun edge-grams, allowing for stop words 
   in the middle (e.g., "state of the art").
4. Key Phrase Consolidation: Merge smaller n-grams that are subsets of 
   larger ones by comparing weights.
5. Domain Specificity Calculation: Determine named entities and phrase 
   domain specificity using WikiIDF. This rewards unique key phrases 
   specific to the document's field (e.g., "endocrinology" in medical texts 
   or "thou shall" in religious texts).
6. Key Phrase Filtering: Select top key phrases based on a combination of 
   frequency and word count.
7. Graph Construction: Create a double-ring weighted graph with key phrases 
   in the central ring and sentences in the outer ring. Assign weights to 
   links based on concept usage probability.
8. Sentence Weighting: Apply TextRank algorithm to weight sentences, 
   identifying those that centralize and connect key phrase concepts most 
   referenced by other sentences. This process, based on TextRank and 
   PageRank, includes random surfing and jumping to avoid loops.
9. Top Results Selection: Select top sentences and key phrases based on 
   overall weight and graph centrality, using either a fixed number or 
   percentage for larger documents.
10. Output Generation: Return top sentences (with associated key phrases) 
    and top key phrases (with associated sentences).
11. Dynamic Reranking: If a user interacts with a key phrase or if there's a 
    search query leading to the document, compare query similarity to key 
    phrases, heavily weight the most similar key phrase, and reapply 
    TextRank from step 8.

<video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768" 
 width="550px" controls />

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

`docText`

</td>
<td>

`string`

</td>
<td>

input text to analyze

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `phrasesModel`: `any`; `maxWords`: `number`; `minWords`: `number`; `minWordLength`: `number`; `topKeyphrasesPercent`: `number`; `limitTopSentences`: `number`; `limitTopKeyphrases`: `number`; `minKeyPhraseLength`: `number`; `heavyWeightQuery`: `string`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.phrasesModel?`

</td>
<td>

`any`

</td>
<td>

phrases model

</td>
</tr>
<tr>
<td>

`options.maxWords?`

</td>
<td>

`number`

</td>
<td>

default=5 - maximum words in a keyphrase

</td>
</tr>
<tr>
<td>

`options.minWords?`

</td>
<td>

`number`

</td>
<td>

default=1 - minimum words in a keyphrase

</td>
</tr>
<tr>
<td>

`options.minWordLength?`

</td>
<td>

`number`

</td>
<td>

default=3 - minimum length of a word

</td>
</tr>
<tr>
<td>

`options.topKeyphrasesPercent?`

</td>
<td>

`number`

</td>
<td>

default=0.2 - percentage of top keyphrases to consider

</td>
</tr>
<tr>
<td>

`options.limitTopSentences?`

</td>
<td>

`number`

</td>
<td>

default=5 - maximum number of top sentences to return

</td>
</tr>
<tr>
<td>

`options.limitTopKeyphrases?`

</td>
<td>

`number`

</td>
<td>

default=10 - maximum number of top keyphrases to return

</td>
</tr>
<tr>
<td>

`options.minKeyPhraseLength?`

</td>
<td>

`number`

</td>
<td>

default=6 - minimum length of a keyphrase

</td>
</tr>
<tr>
<td>

`options.heavyWeightQuery?`

</td>
<td>

`string`

</td>
<td>

query to give heavy weight to

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

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

`topSentences`

</td>
<td>

`any`[]

</td>
<td>

[packages/ai-research-agent/src/topics/seektopic-keyphrases.js:62](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/seektopic-keyphrases.js#L62)

</td>
</tr>
<tr>
<td>

`keyphrases`

</td>
<td>

`any`[]

</td>
<td>

[packages/ai-research-agent/src/topics/seektopic-keyphrases.js:63](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/seektopic-keyphrases.js#L63)

</td>
</tr>
<tr>
<td>

`sentences`

</td>
<td>

`string`[]

</td>
<td>

[packages/ai-research-agent/src/topics/seektopic-keyphrases.js:64](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/seektopic-keyphrases.js#L64)

</td>
</tr>
</tbody>
</table>

#### Example

```ts
const result = extractSEEKTOPIC(testDoc, { phrasesModel, heavyWeightQuery: "self attention", limitTopSentences: 10});
  console.log(result.topSentences); // Array of top sentences with their keyphrases and weights
  console.log(result.keyphrases); // Array of top keyphrases with their weights and associated sentence indices
  console.log(result.sentences); // Array of all sentences in the input text
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### extractTopicTermGroupsLDA()

```ts
function extractTopicTermGroupsLDA(sentences: string[], options?: object): any[];
```

Defined in: [packages/ai-research-agent/src/topics/topic-distribution.js:31](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/topic-distribution.js#L31)

Latent Dirichlet (pronounced Dee-ruesh-ley) allocation  is used
in natural language processing to discover abstract topics in a
collection of documents. It is a generative probabilistic model
that assumes documents are mixtures of topics, where a topic
is a probability distribution over words. LDA uses Bayesian
inference to simultaneously learn the topics and topic mixtures
that occur around each other in an unsupervised manner. <br />

[Latent Dirichlet Allocation (LDA) with Gibbs Sampling 
 Explained](https://www.youtube.com/watch?v=aPRjj8i_6yE)<br />
[Latent Dirichlet Allocation](https://www.geeksforgeeks.org/latent-dirichlet-allocation/) <br />
[Topic Models (Youtube)](https://www.youtube.com/watch?v=yK7nN3FcgUs) <br />

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

`sentences`

</td>
<td>

`string`[]

</td>
<td>

Array of input sentences.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `topicCount`: `number`; `numberOfTermsPerTopic`: `number`; `alpha`: `number`; `beta`: `number`; `numberOfIterations`: `number`; `valueBurnIn`: `number`; `valueSampleLag`: `number`; \}

</td>
<td>

Configuration options for LDA.

</td>
</tr>
<tr>
<td>

`options.topicCount?`

</td>
<td>

`number`

</td>
<td>

default=10 - Number of topics to extract.

</td>
</tr>
<tr>
<td>

`options.numberOfTermsPerTopic?`

</td>
<td>

`number`

</td>
<td>

default=10 - Number of terms to show for each topic.

</td>
</tr>
<tr>
<td>

`options.alpha?`

</td>
<td>

`number`

</td>
<td>

default=0.1 - Dirichlet prior on document-topic distributions.

</td>
</tr>
<tr>
<td>

`options.beta?`

</td>
<td>

`number`

</td>
<td>

default=0.01 - Dirichlet prior on topic-word distributions.

</td>
</tr>
<tr>
<td>

`options.numberOfIterations?`

</td>
<td>

`number`

</td>
<td>

default=1000 - Number of iterations for the LDA algorithm.

</td>
</tr>
<tr>
<td>

`options.valueBurnIn?`

</td>
<td>

`number`

</td>
<td>

default=100 - Number of burn-in iterations.

</td>
</tr>
<tr>
<td>

`options.valueSampleLag?`

</td>
<td>

`number`

</td>
<td>

default=10 - Lag between samples.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[]

- Array of topics, each containing term-probability pairs.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### suggestNextWordCompletions()

```ts
function suggestNextWordCompletions(query: string, options?: object): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/tokenize/suggest-complete-word.js:33](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/suggest-complete-word.js#L33)

### Autocomplete Topic Phrase Completions
<img width="350px"  src="https://i.imgur.com/0k5mO76.png" /> 

Completes the query with the most likely next words for phrases.
If typing 2+ letters of a word, returns all possible words matching those few letters.

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

`query`

</td>
<td>

`string`

</td>
<td>

The input query which can be pertial words or phrases.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `phrasesModel`: `any`; `limitMaxResults`: `number`; `numberOfLastWordsToCheck`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.phrasesModel?`

</td>
<td>

`any`

</td>
<td>

A custom phrases model to use for autocomplete suggestions.

</td>
</tr>
<tr>
<td>

`options.limitMaxResults?`

</td>
<td>

`number`

</td>
<td>

default=10 - The maximum number of autocomplete suggestions to return.

</td>
</tr>
<tr>
<td>

`options.numberOfLastWordsToCheck?`

</td>
<td>

`number`

</td>
<td>

default=5 - The number of last words in the query to check for phrase completions.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`[]&gt;

An array of autocomplete suggestions, each containing either a 'phrase' or 'word' property.

#### Examples

```ts
// Basic usage
const suggestions = await suggestNextWordCompletions("self att");
// Possible output: [{ phrase: "self attention" }, { phrase: "self attract" }, { phrase: "self attack" }]
```

```ts
// Using options
const customModel = await import("./custom-phrases-model.json");
const suggestions = await suggestNextWordCompletions("artificial int", {
  phrasesModel: customModel,
  limitMaxResults: 5,
  numberOfLastWordsToCheck: 3
});
// Possible output: [{ phrase: "artificial intelligence" }, { phrase: "artificial interpretation" }]
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### convertTextToTokens()

```ts
function convertTextToTokens(phrase: string, options?: object): object[];
```

Defined in: [packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js:35](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-topic-tokens.js#L35)

### Convert Text Query to Topic Phrase Tokens
<img width="350px"  src="https://i.imgur.com/NDrmSRQ.png" /> 

Returns a list of phrases that are found in Wiki Titles/ dictionary phrases World Model 
that match the input phrase, or just the single word if found. Search results will be
 more accurate if we infer likely phrases and search for those words occuring together and
 not just split into words and find frequency. Examples are "white house" or "state of the art"
 which should be searched as a phrase but would return different context if split into words.
 As Led Zeppelin famously put it: ♫ "'Cause you know sometimes words have two meanings."

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

`phrase`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `phrasesModel`: `any`; `typosModel`: `any`; `checkTypos`: `number`; `ignoreStopWords`: `number`; `checkRootWords`: `number`; \}

</td>
<td>

*

</td>
</tr>
<tr>
<td>

`options.phrasesModel?`

</td>
<td>

`any`

</td>
<td>

remote model

</td>
</tr>
<tr>
<td>

`options.typosModel?`

</td>
<td>

`any`

</td>
<td>

remote model

</td>
</tr>
<tr>
<td>

`options.checkTypos?`

</td>
<td>

`number`

</td>
<td>

check for typos

</td>
</tr>
<tr>
<td>

`options.ignoreStopWords?`

</td>
<td>

`number`

</td>
<td>

ignore 300+ overused words

</td>
</tr>
<tr>
<td>

`options.checkRootWords?`

</td>
<td>

`number`

</td>
<td>

check for word's root stem

</td>
</tr>
</tbody>
</table>

#### Returns

`object`[]

#### Example

```ts
const result = convertTextToTokens("The president of the united states is in the white house", { phrasesModel, typosModel });
  console.log(result);
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### splitSentences()

```ts
function splitSentences(inputText: string, options?: object): string[];
```

Defined in: [packages/ai-research-agent/src/tokenize/text-to-sentences.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-sentences.js#L14)

Splits text into sentences, handling 220+ common abbreviations,
and infering acronyms, numbers, URLs, times, names, etc.

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

`inputText`

</td>
<td>

`string`

</td>
<td>

The text to be split into sentences.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `splitOnHtmlTags`: `boolean`; `minSize`: `number`; `maxSize`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.splitOnHtmlTags?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Split on HTML tags like P, DIV, UL, OL.

</td>
</tr>
<tr>
<td>

`options.minSize?`

</td>
<td>

`number`

</td>
<td>

default=20 - Minimum size for a sentence.

</td>
</tr>
<tr>
<td>

`options.maxSize?`

</td>
<td>

`number`

</td>
<td>

default=600 - Maximum size for a sentence.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

An array of sentences.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

***

### splitTextSemanticChars()

```ts
function splitTextSemanticChars(text: string, options?: any): string[];
```

Defined in: [packages/ai-research-agent/src/tokenize/text-to-chunks.js:45](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-chunks.js#L45)

### Split Text by Semantic Characters 
<img width="350px"  src="https://i.imgur.com/RpXf5as.png" /> 

Splits document text into semantic chunks based on various textual and structural 
elements like HTML, markdown, and paragraphs.

This function performs a comprehensive tokenization of the input text, considering a wide range
of semantic elements and structural patterns commonly found in documents. It uses regular
expressions to identify and separate the following elements:

1. Headings (Setext-style, Markdown, and HTML-style)
2. Citations (e.g., [1])
3. List items (bulleted, numbered, lettered, or task lists, including nested up to three levels)
4. Block quotes (including nested quotes and citations, up to three levels)
5. Code blocks (fenced, indented, or HTML pre/code tags)
6. Tables (Markdown, grid tables, and HTML tables)
7. Horizontal rules (Markdown and HTML hr tag)
8. Standalone lines or phrases (including single-line blocks and HTML elements)
9. Sentences or phrases ending with punctuation (including ellipsis and Unicode punctuation)
10. Quoted text, parenthetical phrases, or bracketed content
11. Paragraphs
12. HTML-like tags and their content (including self-closing tags and attributes)
13. LaTeX-style math expressions (inline and block)
14. Any remaining content (fallback)

The function applies various length constraints to each type of element to ensure reasonable
chunk sizes. It also handles nested structures and special cases like code blocks and math
expressions.

[Sentence RAG Benchmarks](https://superlinked.com/vectorhub/articles/evaluation-rag-retrieval-chunking-methods)

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

`text`

</td>
<td>

`string`

</td>
<td>

The input text to be split into semantic chunks.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`any`

</td>
<td>

Optional configuration options (currently unused).

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

An array of text chunks, each representing a semantic unit of the document.

#### Author

[Jina AI (2024)](https://gist.github.com/hanxiao/3f60354cf6dc5ac698bc9154163b4e6a)

#### Example

```ts
const text = "# Heading\n\nThis is a paragraph.\n\n- List item 1\n- List item 2\n\n";
const chunks = splitTextSemanticChars(text);
console.log(chunks);
// Output: ['# Heading', 'This is a paragraph.', '- List item 1', '- List item 2']
```

***

### stemWordToRoot()

```ts
function stemWordToRoot(word: string): string;
```

Defined in: [packages/ai-research-agent/src/tokenize/word-to-root-stem.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/word-to-root-stem.js#L12)

Stems a word using the <a
href="https://snowballstem.org/algorithms/porter/stemmer.html">Porter
 Stemmer</a> for removing  inflectional endings like "ing", "ist", "ize".

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

`word`

</td>
<td>

`string`

</td>
<td>

The word to be stemmed

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The stemmed word

#### Author

[Porter, M. (1980)](https://tartarus.org/martin/PorterStemmer/)

#### Example

```ts
var rootWord = stemWordToRoot("running"); // returns "run"
```
