[ai-research-agent](../modules.md) / tokenize/text-to-topic-tokens

## Other

### Token

#### Properties

##### term

```ts
term: string;
```

The actual term or phrase

##### termCategory

```ts
termCategory: number;
```

The category of the term

##### uniqueness

```ts
uniqueness: number;
```

The uniqueness score of the term

## Topics

### convertTextToTokens()

```ts
function convertTextToTokens(phrase, options?): object[]
```

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

`options`?

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

`options.checkRootWords`?

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

`options.checkTypos`?

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

`options.ignoreStopWords`?

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

`options.phrasesModel`?

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

`options.typosModel`?

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
