[Documentation](../modules.md) / lib/utils

## setStateInURL()

```ts
function setStateInURL(stateObject: Record<string, string>, addToBrowserHistory: boolean): object;
```

Defined in: apps/web-app/src/lib/utils.ts:19

Adds variable state (like query, active tab. etc) to the URL so that the stateis preserved in a sharable URL which
when clicked resumes from those same state variables.
Pass in nothing to get the current URL state object.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`stateObject`

</td>
<td>

`Record`&lt;`string`, `string`&gt;

</td>
<td>

`null`

</td>
<td>

The state object to sync to the URL like view: "search"

</td>
</tr>
<tr>
<td>

`addToBrowserHistory`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

default false.
  - If true, add the new state to the browser history

</td>
</tr>
</tbody>
</table>

### Returns

`object`

stateObject
  - Always returns the current URL state object

### Example

```ts
let {view, q} = setStateInURL();
 setStateInURL({ view: "search" });
```

***

## cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

Defined in: apps/web-app/src/lib/utils.ts:44

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

## setupMobileView()

```ts
function setupMobileView(deviceInfo: object): void;
```

Defined in: apps/web-app/src/lib/utils.ts:54

Checks if the current view is a mobile view
Updates deviceInfo.isMobile state based on the window width

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

`deviceInfo`

</td>
<td>

\{ `isMobile?`: `boolean`; `os?`: `string`; \}

</td>
<td>

The device information object

</td>
</tr>
<tr>
<td>

`deviceInfo.isMobile?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`deviceInfo.os?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## getUserDeviceOS()

```ts
function getUserDeviceOS(): "Windows" | "Mac" | "Linux" | "Android" | "iOS" | "Other";
```

Defined in: apps/web-app/src/lib/utils.ts:73

Gets the user's device OS

### Returns

`"Windows"` \| `"Mac"` \| `"Linux"` \| `"Android"` \| `"iOS"` \| `"Other"`

OS Name: Windows, Mac, Linux, Android, iOS, or Other

***

## loadHeadTags()

```ts
function loadHeadTags(options: any): string;
```

Defined in: apps/web-app/src/lib/utils.ts:110

Generates HTML head tags including fonts, analytics, and meta tags

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

`options`

</td>
<td>

`any`

</td>
<td>

Configuration options for head tags

</td>
</tr>
</tbody>
</table>

### Returns

`string`

Complete HTML head tags string if shouldAppend is false, otherwise void
