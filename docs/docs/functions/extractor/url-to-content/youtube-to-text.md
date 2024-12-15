[ai-research-agent](../../index.md) / extractor/url-to-content/youtube-to-text

## Extract

### convertYoutubeToText()

```ts
function convertYoutubeToText(videoUrl, options?): object
```

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

`options`?

</td>
<td>

\{ `addTimestamps`: `boolean`; `timeout`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.addTimestamps`?

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

`options.timeout`?

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

| Name | Type |
| ------ | ------ |
| `content` | `string` |
| `timestamps` | `string` |
| `word_count` | `number` |

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### fetchViaYoutubeToTranscriptCom()

```ts
function fetchViaYoutubeToTranscriptCom(videoId, options): Object
```

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

\{\}

</td>
</tr>
</tbody>
</table>

#### Returns

`Object`

content, timestamps -  where content is the full text of
the transcript, and timestamps is an array of [characterIndex, timeSeconds]
