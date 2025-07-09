[Documentation](../../modules.md) / extractor/pdf-to-html/pdf-to-html

## Extract

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
