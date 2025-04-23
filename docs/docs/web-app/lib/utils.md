[Documentation](../modules.md) / lib/utils

## logger

```ts
const logger: Logger<never, boolean>;
```

Defined in: web-app/src/lib/utils.ts:11

Log errors in development and production environments.

***

## callServerAPI()

```ts
function callServerAPI(path: string, params?: any): Promise<any>;
```

Defined in: web-app/src/lib/utils.ts:45

Fetch data from server API by defining params in JSON
and getting response in JSON, or return error JSON object.

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

`path`

</td>
<td>

`string`

</td>
<td>

The path in the API to call

</td>
</tr>
<tr>
<td>

`params?`

</td>
<td>

`any`

</td>
<td>

Optional parameters to pass to the API

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

The response from the server API

### Example

```ts
var response: {
    customField: string;
    error: string;
  } = await callServerAPI('users', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'your-api-key',
  },
  query: "search words",
})
if (response.error) {
 console.error(response.error);
 return;
}
console.log(response);
```

***

## cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

Defined in: web-app/src/lib/utils.ts:90

Utility function for merging Tailwind classes, needed for
[shadcn-svelte.](https://next.shadcn-svelte.com/docs/migration/svelte-5#update-utils)

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

...`inputs`

</td>
<td>

`ClassValue`[]

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`string`

class name

***

## getUserDeviceOS()

```ts
function getUserDeviceOS(): "Windows" | "Mac" | "Linux" | "Android" | "iOS" | "Other";
```

Defined in: web-app/src/lib/utils.ts:98

Gets the user's device OS

### Returns

`"Windows"` \| `"Mac"` \| `"Linux"` \| `"Android"` \| `"iOS"` \| `"Other"`

OS Name: Windows, Mac, Linux, Android, iOS, or Other
