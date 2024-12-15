[ai-research-agent](../../index.md) / extractor/url-to-content/url-to-content

## Extract

### extractContent()

```ts
function extractContent(urlOrDoc, options?): object
```

### 🚜📜 Tractor the Text Extractor 
<img width="350px"  src="https://i.imgur.com/cRewT07.png" />

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

`options`?

</td>
<td>

\{ `absoluteURLs`: `boolean`; `formatting`: `boolean`; `images`: `boolean`; `links`: `boolean`; `timeout`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.absoluteURLs`?

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

`options.formatting`?

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

`options.images`?

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

`options.links`?

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

`options.timeout`?

</td>
<td>

`number`

</td>
<td>

http request timeout

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

| Name | Type |
| ------ | ------ |
| `author` | `string` |
| `author_cite` | `string` |
| `cite` | `string` |
| `date` | `string` |
| `html` | `string` |
| `source` | `string` |
| `title` | `string` |
| `word_count` | `number` |

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### Article

#### Properties

##### author

```ts
author: string;
```

The full name of the author of the article

##### author\_cite

```ts
author_cite: string;
```

Author name in Last, First Initial format

##### author\_short

```ts
author_short: string;
```

Author name in Last format

##### author\_type

```ts
author_type: number;
```

Author type ["single", "two-author", "more-than-two", "organization"]

##### cite

```ts
cite: string;
```

Cite in APA Format with Author name in Last, First Initial format

##### date

```ts
date: string;
```

The publication date of the article

##### html

```ts
html: string;
```

The Basic HTML content of the article

##### source

```ts
source: string;
```

The source or publisher of the article

##### title

```ts
title: string;
```

The title of the article

##### url

```ts
url: string;
```

The URL of the article

##### word\_count

```ts
word_count: number;
```

The word count of the full text (without HTML tags)
