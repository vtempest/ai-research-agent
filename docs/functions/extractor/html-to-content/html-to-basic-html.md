[ai-research-agent](../../modules.md) / extractor/html-to-content/html-to-basic-html

## HTML Utilities

### convertHTMLToBasicHTML()

```ts
function convertHTMLToBasicHTML(html, options?): string
```

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

`options`?

</td>
<td>

\{ `allowedAttributes`: `string`; `allowTags`: `string`; `formatting`: `boolean`; `images`: `boolean`; `links`: `boolean`; `url`: `string`; `videos`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.allowedAttributes`?

</td>
<td>

`string`

</td>
<td>

default="text,tag,href, src,type,width, height,id,data"
  List of allowed HTML attributes

</td>
</tr>
<tr>
<td>

`options.allowTags`?

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

`options.formatting`?

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

`options.images`?

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

`options.links`?

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

`options.url`?

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

`options.videos`?

</td>
<td>

`boolean`

</td>
<td>

default=true - Whether to include videos or not

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

basic text formatting html

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### addDOMFunctions()

```ts
function addDOMFunctions(domObject): any
```

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
