[Documentation](../../modules.md) / extractor/url-to-content/youtube-to-text

## Extract

### convertYoutubeToText()

```ts
function convertYoutubeToText(videoUrl: string, options?: object): object;
```

Defined in: extractor/url-to-content/youtube-to-text.js:19

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

extractor/url-to-content/youtube-to-text.js:12

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

extractor/url-to-content/youtube-to-text.js:12

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

extractor/url-to-content/youtube-to-text.js:12

</td>
</tr>
</tbody>
</table>

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### fetchViaYoutubeToTranscriptCom()

```ts
function fetchViaYoutubeToTranscriptCom(videoId: any, options: object): any;
```

Defined in: extractor/url-to-content/youtube-to-text.js:153

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
