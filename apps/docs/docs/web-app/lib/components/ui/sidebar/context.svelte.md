[Documentation](../../../../modules.md) / lib/components/ui/sidebar/context.svelte

## SidebarStateProps

```ts
type SidebarStateProps = object;
```

Defined in: apps/web-app/src/lib/components/ui/sidebar/context.svelte.ts:7

### Properties

#### open

```ts
open: Getter<boolean>;
```

Defined in: apps/web-app/src/lib/components/ui/sidebar/context.svelte.ts:13

A getter function that returns the current open state of the sidebar.
We use a getter function here to support `bind:open` on the `Sidebar.Provider`
component.

#### setOpen()

```ts
setOpen: (open: boolean) => void;
```

Defined in: apps/web-app/src/lib/components/ui/sidebar/context.svelte.ts:20

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

Defined in: apps/web-app/src/lib/components/ui/sidebar/context.svelte.ts:70

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

Defined in: apps/web-app/src/lib/components/ui/sidebar/context.svelte.ts:79

Retrieves the `SidebarState` instance from the context. This is a class instance,
so you cannot destructure it.

### Returns

`SidebarState`

The `SidebarState` instance.
