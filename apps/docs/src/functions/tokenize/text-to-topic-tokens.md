[Documentation](../modules.md) / tokenize/text-to-topic-tokens

## Other

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
</tbody>
</table>

## Topics

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

\{ `checkRootWords`: `number`; `checkTypos`: `number`; `ignoreStopWords`: `number`; `phrasesModel`: `any`; `typosModel`: `any`; \}

</td>
<td>

*

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
