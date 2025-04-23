[Documentation](../../../modules.md) / lib/components/ui/button

## Events

```ts
type Events = ButtonPrimitive.Events;
```

Defined in: web-app/src/lib/components/ui/button/index.ts:39

***

## Props

```ts
type Props = ButtonPrimitive.Props & object;
```

Defined in: web-app/src/lib/components/ui/button/index.ts:34

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

`size?`

</td>
<td>

`Size`

</td>
<td>

web-app/src/lib/components/ui/button/index.ts:36

</td>
</tr>
<tr>
<td>

`variant?`

</td>
<td>

`Variant`

</td>
<td>

web-app/src/lib/components/ui/button/index.ts:35

</td>
</tr>
</tbody>
</table>

***

## buttonVariants

```ts
const buttonVariants: TVReturnType<{
  size: {
     default: string;
     icon: string;
     lg: string;
     sm: string;
  };
  variant: {
     default: string;
     destructive: string;
     ghost: string;
     link: string;
     outline: string;
     secondary: string;
  };
}, undefined, "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50", {
  size: {
     default: string;
     icon: string;
     lg: string;
     sm: string;
  };
  variant: {
     default: string;
     destructive: string;
     ghost: string;
     link: string;
     outline: string;
     secondary: string;
  };
}, undefined, TVReturnType<{
  size: {
     default: string;
     icon: string;
     lg: string;
     sm: string;
  };
  variant: {
     default: string;
     destructive: string;
     ghost: string;
     link: string;
     outline: string;
     secondary: string;
  };
}, undefined, "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50", unknown, unknown, undefined>>;
```

Defined in: web-app/src/lib/components/ui/button/index.ts:5

***

## ButtonEvents

Renames and re-exports [Events](#events)

***

## ButtonProps

Renames and re-exports [Props](#props)
