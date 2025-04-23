[Documentation](../modules.md) / interface/ip-to-lang

## countryToLanguage

```ts
const countryToLanguage: object[];
```

Defined in: interface/ip-to-lang.js:36

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
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

`"ad"`

</td>
<td>

interface/ip-to-lang.js:37

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

`"Andorra"`

</td>
<td>

interface/ip-to-lang.js:37

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

`"es"`

</td>
<td>

interface/ip-to-lang.js:37

</td>
</tr>
</tbody>
</table>

***

## getLanguageFromIP()

```ts
function getLanguageFromIP(ip: string): Promise<any>;
```

Defined in: interface/ip-to-lang.js:19

Retrieves language information for a given IP address using 
a remote API. Rate limit 45 req/min

You should first use Accept-Language header or navigator.language 
in front-end for user-set language
https://stackoverflow.com/questions/673905/how-can-i-determine-a-users-locale-within-the-browser/31135571#31135571

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

### Returns

`Promise`&lt;`any`&gt;

A promise that resolves to an object containing country and language information, or undefined if not found.

### Author

[ai-research-agent (2024)](https://airesearch.js.org)
