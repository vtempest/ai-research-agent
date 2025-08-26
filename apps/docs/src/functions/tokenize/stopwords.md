[Documentation](../modules.md) / tokenize/stopwords

## isWordCommonIgnored()

```ts
function isWordCommonIgnored(word: string): boolean;
```

Defined in: [packages/ai-research-agent/src/tokenize/stopwords.js:47](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/stopwords.js#L47)

Checks word is in [320 commonly ignored "stop words 
"](https://raw.githubusercontent.com/igorbrigadir/stopwords/master/en/spacy.txt) 
in queries, using efficient JS Set method

### Parameters

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

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`
