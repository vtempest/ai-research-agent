[Documentation](../modules.md) / components/utils

## DeviceInfo

```ts
type DeviceInfo = object;
```

Defined in: apps/web/src/lib/components/utils/index.ts:52

Device information object

### Properties

#### isMobile?

```ts
optional isMobile: boolean;
```

Defined in: apps/web/src/lib/components/utils/index.ts:54

True if the screen is small size like on mobile web, updated on resize

#### os?

```ts
optional os: "Windows" | "Mac" | "Linux" | "Android" | "iOS" | "Other";
```

Defined in: apps/web/src/lib/components/utils/index.ts:56

The user's device OS

***

## WithElementRef&lt;T, U&gt;

```ts
type WithElementRef<T, U> = T & object;
```

Defined in: apps/web/src/lib/components/utils/index.ts:94

### Type declaration

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

`ref?`

</td>
<td>

`U` \| `null`

</td>
<td>

apps/web/src/lib/components/utils/index.ts:95

</td>
</tr>
</tbody>
</table>

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`U` *extends* `HTMLElement`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

***

## WithoutChild&lt;T&gt;

```ts
type WithoutChild<T> = T extends object ? Omit<T, "child"> : T;
```

Defined in: apps/web/src/lib/components/utils/index.ts:88

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

***

## WithoutChildren&lt;T&gt;

```ts
type WithoutChildren<T> = T extends object ? Omit<T, "children"> : T;
```

Defined in: apps/web/src/lib/components/utils/index.ts:90

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

***

## WithoutChildrenOrChild&lt;T&gt;

```ts
type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
```

Defined in: apps/web/src/lib/components/utils/index.ts:93

### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

***

## cn()

```ts
function cn(...inputs: ClassValue[]): string;
```

Defined in: apps/web/src/lib/components/utils/index.ts:45

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

## loadHeadTags()

```ts
function loadHeadTags(options: LoadHeadTagsOptions): string;
```

Defined in: apps/web/src/lib/components/utils/index.ts:115

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

`LoadHeadTagsOptions`

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

***

## setStateInURL()

```ts
function setStateInURL(stateObject: Record<string, string>, addToBrowserHistory: boolean): object;
```

Defined in: apps/web/src/lib/components/utils/index.ts:20

Adds variable state (like query, active tab. etc) to 
the URL so that the state is preserved in a sharable URL 
which when clicked resumes from those same state variables.
Pass in nothing to get the current URL state variables.

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
function setupMobileView(deviceInfo: DeviceInfo): void;
```

Defined in: apps/web/src/lib/components/utils/index.ts:65

Checks if the current view is a mobile view
Updates deviceInfo.isMobile state based on the window width
Updates deviceInfo.os based on the user's device OS

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

[`DeviceInfo`](#deviceinfo)

</td>
<td>

The device information object

</td>
</tr>
</tbody>
</table>

### Returns

`void`
