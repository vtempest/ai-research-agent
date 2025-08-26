[Documentation](../modules.md) / tokenize/text-to-chunks

## Topics

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
