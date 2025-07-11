[Documentation](../../modules.md) / extractor/html-to-content/html-utils

## HTML Utilities

### convertMarkdownToHTML()

```ts
function convertMarkdownToHTML(content: string, toHtml: boolean): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:214](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L214)

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

### convertURLSafeHTMLToHTML()

```ts
function convertURLSafeHTMLToHTML(str: string, toStandardHTML: boolean): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:61](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L61)

Converts URL-safe escaped HTML codes like &"'`&rsquo; & to standard HTML or in reverse.

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

`toStandardHTML`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

default=true - If true, converts url-safe codes 
to standard HTML. If false, converts standard HTML to url-safe codes.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The processed string.

#### Example

```ts
var normalHTML = convertURLSafeHTMLToHTML('&lt;p&gt;This &amp; that &copy; 2023 '+
'&quot;Quotes&quot;&#39;Apostrophes&#39; &euro;100 &#x263A;&lt;/p&gt;', true)
console.log(normalHTML) // "<p>This & that © 2023 "Quotes" 'Apostrophes' €100 ☺</p>"
```

***

### convertURLToAbsoluteURL()

```ts
function convertURLToAbsoluteURL(base: string, relative: string): string;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:136](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L136)

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

### copyHTMLToClipboard()

```ts
function copyHTMLToClipboard(html: string, options: object): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:420](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L420)

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

## Other

### convertHTMLToMarkdown()

```ts
function convertHTMLToMarkdown(html: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/html-to-content/html-utils.js:358](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-content/html-utils.js#L358)

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
