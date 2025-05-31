[Documentation](../modules.md) / lib/utils

## cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

Defined in: web-app/src/lib/utils/index.ts:13

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

Defined in: web-app/src/lib/utils/index.ts:163

Gets the user's device OS

### Returns

`"Windows"` \| `"Mac"` \| `"Linux"` \| `"Android"` \| `"iOS"` \| `"Other"`

OS Name: Windows, Mac, Linux, Android, iOS, or Other

***

## loadAnalytics()

```ts
function loadAnalytics(googleAnalyticsId: string, simpleAnalytics: boolean): string;
```

Defined in: web-app/src/lib/utils/index.ts:116

Loads the user analytics scripts

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

`googleAnalyticsId`

</td>
<td>

`string`

</td>
<td>

The Google Analytics ID

</td>
</tr>
<tr>
<td>

`simpleAnalytics`

</td>
<td>

`boolean`

</td>
<td>

Whether to load SimpleAnalytics.com

</td>
</tr>
</tbody>
</table>

### Returns

`string`

The analytics script

***

## loadGoogleFonts()

```ts
function loadGoogleFonts(fonts: string): string;
```

Defined in: web-app/src/lib/utils/index.ts:98

Generates font links for the given fonts

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

`fonts`

</td>
<td>

`string`

</td>
<td>

Comma separated fonts to generate links for

</td>
</tr>
</tbody>
</table>

### Returns

`string`

The font links

***

## loadMetaTags()

```ts
function loadMetaTags(
   faviconPath: string, 
   appleTouchIconPath: string, 
   manifestPath: string, 
   addMobileViewport: boolean): string;
```

Defined in: web-app/src/lib/utils/index.ts:141

Loads the meta tags and icons for the page

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

`faviconPath`

</td>
<td>

`string`

</td>
<td>

`"/favicon.ico"`

</td>
<td>

Path to the favicon.ico file (default: "/favicon.ico")

</td>
</tr>
<tr>
<td>

`appleTouchIconPath`

</td>
<td>

`string`

</td>
<td>

`"/icons/apple-touch-icon.png"`

</td>
<td>

Path to the Apple touch icon (default: "/icons/apple-touch-icon.png")

</td>
</tr>
<tr>
<td>

`manifestPath`

</td>
<td>

`string`

</td>
<td>

`"/site.webmanifest"`

</td>
<td>

Path to the site.webmanifest file (default: "/site.webmanifest")

</td>
</tr>
<tr>
<td>

`addMobileViewport`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Whether to include the mobile viewport meta tag (default: true)

</td>
</tr>
</tbody>
</table>

### Returns

`string`

The meta tags and icon links

***

## log()

```ts
function log(message: any, debugModeOnly: boolean): void;
```

Defined in: web-app/src/lib/utils/index.ts:22

Log errors in development and production environments.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`debugModeOnly`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## setStateInURL()

```ts
function setStateInURL(stateObject: Record<string, string>, addToBrowserHistory: boolean): object;
```

Defined in: web-app/src/lib/utils/index.ts:57

Adds variable state to the URL so that the state
of the app is preserved in a sharable URL.
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

## setupMobileView()

```ts
function setupMobileView(deviceInfo: object): void;
```

Defined in: web-app/src/lib/utils/index.ts:81

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

## grab

Renames and re-exports [default](utils/grab-api.md#default)
