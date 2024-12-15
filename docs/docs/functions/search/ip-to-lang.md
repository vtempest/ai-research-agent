[ai-research-agent](../index.md) / search/ip-to-lang

## Functions

### getLanguageFromIP()

```ts
function getLanguageFromIP(ip): Promise<undefined | Object>
```

Retrieves language information for a given IP address using 
a remote API. Rate limit 45 req/min

You should first use Accept-Language header or navigator.language 
in front-end for user-set language
https://stackoverflow.com/questions/673905/how-can-i-determine-a-users-locale-within-the-browser/31135571#31135571

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

`ip`

</td>
<td>

`string`

</td>
<td>

The IP address to look up.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`undefined` \| `Object`&gt;

A promise that resolves to an object containing country and language information, or undefined if not found.

returns.country - The name of the country.

returns.code - The two-letter country code.

returns.lang - The two-letter language code.

returns.language - The full name of the language.

returns.greeting - A greeting in the detected language.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Variables

### countryToLanguage

```ts
const countryToLanguage: object[];
```

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`code`

</td>
<td>

`string`

</td>
<td>

"ad"

</td>
</tr>
<tr>
<td>

`country`

</td>
<td>

`string`

</td>
<td>

"Andorra"

</td>
</tr>
<tr>
<td>

`lang`

</td>
<td>

`string`

</td>
<td>

"es"

</td>
</tr>
</tbody>
</table>
