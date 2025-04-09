[ai-research-agent](../../modules.md) / editor/modules/decorations

## Functions

### applyDecorations()

```ts
function applyDecorations(
   vnode, 
   attributes, 
   defaultClasses?): VNode
```

#### Parameters

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

`vnode`

</td>
<td>

[`VNode`](../rendering/vdom.md#vnode)

</td>
</tr>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`defaultClasses`?

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`VNode`](../rendering/vdom.md#vnode)

***

### decorations()

```ts
function decorations(editor): DecorationsModule
```

#### Parameters

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

[`DecorationsModule`](decorations.md#decorationsmodule)

## Classes

### DecorateEvent

#### Extends

- `Event`

#### Constructors

##### new DecorateEvent()

```ts
new DecorateEvent(type, init): DecorateEvent
```

###### Parameters

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`init`

</td>
<td>

[`DecorateEventInit`](decorations.md#decorateeventinit)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorateEvent`](decorations.md#decorateevent)

###### Overrides

`Event.constructor`

#### Properties

##### change?

```ts
optional change: default;
```

##### changedLines?

```ts
optional changedLines: default[];
```

##### doc

```ts
doc: default;
```

##### old

```ts
old: default;
```

***

### Decorator

#### Constructors

##### new Decorator()

```ts
new Decorator(
   name, 
   doc, 
   decoration, 
   apply, 
   remove): Decorator
```

###### Parameters

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

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`doc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`apply`

</td>
<td>

(`name`, `updates`) => `void`

</td>
</tr>
<tr>
<td>

`remove`

</td>
<td>

(`name`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

#### Methods

##### apply()

```ts
apply(): void
```

###### Returns

`void`

##### clear()

```ts
clear(range?): Decorator
```

###### Parameters

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

`range`?

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### clearLine()

```ts
clearLine(value): Decorator
```

###### Parameters

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

`value`

</td>
<td>

`string` \| `number` \| [`default`](../document/Line/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### clearLines()

```ts
clearLines(lines): Decorator
```

###### Parameters

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

`lines`

</td>
<td>

[`default`](../document/Line/index.md#default)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### decorateLine()

```ts
decorateLine(range, decoration): Decorator
```

###### Parameters

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

`range`

</td>
<td>

`number` \| [`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](decorations.md#decorations-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### decorateText()

```ts
decorateText(range, decoration): Decorator
```

###### Parameters

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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](decorations.md#decorations-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### getDecoration()

```ts
getDecoration(): default
```

###### Returns

[`default`](../delta/Delta.md#default)

##### hasDecorations()

```ts
hasDecorations(): boolean
```

###### Returns

`boolean`

##### insertDecoration()

```ts
insertDecoration(at, decoration): Decorator
```

###### Parameters

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

`at`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`decoration`

</td>
<td>

[`Decorations`](decorations.md#decorations-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### invert()

```ts
invert(range?): default
```

###### Parameters

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

`range`?

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/Delta.md#default)

##### remove()

```ts
remove(): void
```

###### Returns

`void`

#### Properties

##### change

```ts
change: default;
```

## Interfaces

### DecorateEventInit

#### Extends

- `EventInit`

#### Properties

##### change?

```ts
optional change: default;
```

##### changedLines?

```ts
optional changedLines: default[];
```

##### doc

```ts
doc: default;
```

##### old

```ts
old: default;
```

***

### Decorations

#### Indexable

 \[`attributeName`: `string`\]: `any`

#### Properties

##### class?

```ts
optional class: string;
```

##### style?

```ts
optional style: string;
```

***

### DecorationsModule

#### Methods

##### destroy()

```ts
destroy(): void
```

###### Returns

`void`

##### init()

```ts
init(): void
```

###### Returns

`void`

#### Properties

##### clearDecorations()

```ts
clearDecorations: () => void;
```

###### Returns

`void`

##### doc

```ts
readonly doc: default;
```

##### gatherDecorations()

```ts
gatherDecorations: (change?, changedLines?) => void;
```

###### Parameters

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

`change`?

</td>
<td>

[`default`](../document/TextChange.md#default)

</td>
</tr>
<tr>
<td>

`changedLines`?

</td>
<td>

[`default`](../document/Line/index.md#default)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### getDecorator()

```ts
getDecorator: (name) => Decorator;
```

###### Parameters

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decorator`](decorations.md#decorator)

##### old

```ts
readonly old: default;
```

##### removeDecorations()

```ts
removeDecorations: (name) => boolean;
```

###### Parameters

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`
