[Documentation](../../../../modules.md) / lib/components/ui/sidebar/context.svelte

## IsMobile

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:10

### Extends

- `MediaQuery`

### Constructors

#### Constructor

```ts
new IsMobile(breakpoint: number): IsMobile;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:11

##### Parameters

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

`breakpoint`

</td>
<td>

`number`

</td>
<td>

`DEFAULT_MOBILE_BREAKPOINT`

</td>
</tr>
</tbody>
</table>

##### Returns

[`IsMobile`](#ismobile)

##### Overrides

```ts
MediaQuery.constructor
```

***

## SidebarStateProps

```ts
type SidebarStateProps = object;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:16

### Properties

#### open

```ts
open: Getter<boolean>;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:22

A getter function that returns the current open state of the sidebar.
We use a getter function here to support `bind:open` on the `Sidebar.Provider`
component.

#### setOpen()

```ts
setOpen: (open: boolean) => void;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:29

A function that sets the open state of the sidebar. To support `bind:open`, we need
a source of truth for changing the open state to ensure it will be synced throughout
the sub-components and any `bind:` references.

##### Parameters

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

`open`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

## setSidebar()

```ts
function setSidebar(props: SidebarStateProps): SidebarState;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:79

Instantiates a new `SidebarState` instance and sets it in the context.

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

`props`

</td>
<td>

[`SidebarStateProps`](#sidebarstateprops)

</td>
<td>

The constructor props for the `SidebarState` class.

</td>
</tr>
</tbody>
</table>

### Returns

`SidebarState`

The `SidebarState` instance.

***

## useSidebar()

```ts
function useSidebar(): SidebarState;
```

Defined in: apps/web/src/lib/components/ui/sidebar/context.svelte.ts:88

Retrieves the `SidebarState` instance from the context. This is a class instance,
so you cannot destructure it.

### Returns

`SidebarState`

The `SidebarState` instance.
