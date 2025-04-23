[Documentation](../../../modules.md) / lib/components/ui/textarea

## FormTextareaEvent&lt;T&gt;

```ts
type FormTextareaEvent<T> = T & object;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:3

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

`currentTarget`

</td>
<td>

`EventTarget` & `HTMLTextAreaElement`

</td>
<td>

web-app/src/lib/components/ui/textarea/index.ts:4

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

`T` *extends* `Event`

</td>
<td>

`Event`

</td>
</tr>
</tbody>
</table>

***

## TextareaEvents

```ts
type TextareaEvents = object;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:7

### Properties

#### blur

```ts
blur: FormTextareaEvent<FocusEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:8

#### change

```ts
change: FormTextareaEvent<Event>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:9

#### click

```ts
click: FormTextareaEvent<MouseEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:10

#### focus

```ts
focus: FormTextareaEvent<FocusEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:11

#### input

```ts
input: FormTextareaEvent<InputEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:19

#### keydown

```ts
keydown: FormTextareaEvent<KeyboardEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:12

#### keypress

```ts
keypress: FormTextareaEvent<KeyboardEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:13

#### keyup

```ts
keyup: FormTextareaEvent<KeyboardEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:14

#### mouseenter

```ts
mouseenter: FormTextareaEvent<MouseEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:16

#### mouseleave

```ts
mouseleave: FormTextareaEvent<MouseEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:17

#### mouseover

```ts
mouseover: FormTextareaEvent<MouseEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:15

#### paste

```ts
paste: FormTextareaEvent<ClipboardEvent>;
```

Defined in: web-app/src/lib/components/ui/textarea/index.ts:18
