[ai-research-agent](../../index.md) / editor/modules/history

## Functions

### history()

```ts
function history(editor): object
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

`object`

| Name | Type |
| ------ | ------ |
| `clearHistory` | () => `void` |
| `commands` | \{ `redo`: () => `void`; `undo`: () => `void`; \} |
| `cutoffHistory` | () => `void` |
| `getStack` | () => [`UndoStack`](history.md#undostack-1) |
| `hasRedo` | () => `boolean` |
| `hasUndo` | () => `boolean` |
| `options` | [`Options`](history.md#options-1) |
| `redo` | () => `void` |
| `setStack` | (`value`) => `void` |
| `shortcuts` | \{ `mac:Cmd+Shift+Z`: `string`; `mac:Cmd+Z`: `string`; `win:Ctrl+Y`: `string`; `win:Ctrl+Z`: `string`; \} |
| `undo` | () => `void` |
| `destroy()` |  |
| `getActive()` |  |
| `init()` |  |

***

### initHistory()

```ts
function initHistory(initOptions): (editor) => object
```

History is a view module for storing user changes and undoing/redoing those changes.

Stores history for all user-generated changes. Like-changes will be combined until a selection or a delay timeout
cuts off the combining. E.g. if a user types "Hello" the 5 changes will be combined into one history entry. If
the user moves the cursor somewhere and then back to the end and types " World" the next 6 changes are combined
separately from the first 5 because selection changes add a cutoff history entries.

The default options can be overridden by passing alternatives to history. To add a timeout to force a cutoff after
so many milliseconds set a delay like this:
```js
const modules = {
  history: history({ delay: 4000 })
};
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

`initOptions`

</td>
<td>

`Partial`&lt;[`Options`](history.md#options-1)&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

##### Returns

`object`

| Name | Type |
| ------ | ------ |
| `clearHistory` | () => `void` |
| `commands` | \{ `redo`: () => `void`; `undo`: () => `void`; \} |
| `cutoffHistory` | () => `void` |
| `getStack` | () => [`UndoStack`](history.md#undostack-1) |
| `hasRedo` | () => `boolean` |
| `hasUndo` | () => `boolean` |
| `options` | [`Options`](history.md#options-1) |
| `redo` | () => `void` |
| `setStack` | (`value`) => `void` |
| `shortcuts` | \{ `mac:Cmd+Shift+Z`: `string`; `mac:Cmd+Z`: `string`; `win:Ctrl+Y`: `string`; `win:Ctrl+Z`: `string`; \} |
| `undo` | () => `void` |
| `destroy()` |  |
| `getActive()` |  |
| `init()` |  |

***

### transformHistoryStack()

```ts
function transformHistoryStack(stack, delta): void
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

`stack`

</td>
<td>

[`UndoStack`](history.md#undostack-1)

</td>
</tr>
<tr>
<td>

`delta`

</td>
<td>

[`default`](../delta/Delta.md#default) \| [`default`](../document/TextChange.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### undoStack()

```ts
function undoStack(): UndoStack
```

#### Returns

[`UndoStack`](history.md#undostack-1)

## Interfaces

### HistoryModule

#### Methods

##### destroy()

```ts
destroy(): void
```

###### Returns

`void`

#### Properties

##### clearHistory()

```ts
clearHistory: () => void;
```

###### Returns

`void`

##### cutoffHistory()

```ts
cutoffHistory: () => void;
```

###### Returns

`void`

##### getStack()

```ts
getStack: () => UndoStack;
```

###### Returns

[`UndoStack`](history.md#undostack-1)

##### hasRedo()

```ts
hasRedo: () => boolean;
```

###### Returns

`boolean`

##### hasUndo()

```ts
hasUndo: () => boolean;
```

###### Returns

`boolean`

##### options

```ts
options: Options;
```

##### redo()

```ts
redo: () => void;
```

###### Returns

`void`

##### setStack()

```ts
setStack: (value) => void;
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

[`UndoStack`](history.md#undostack-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### undo()

```ts
undo: () => void;
```

###### Returns

`void`

***

### Options

#### Properties

##### delay

```ts
delay: number;
```

##### maxStack

```ts
maxStack: number;
```

##### unrecordedSources

```ts
unrecordedSources: Set<string>;
```

***

### StackEntry

#### Properties

##### redo

```ts
redo: default;
```

##### undo

```ts
undo: default;
```

***

### UndoStack

#### Properties

##### redo

```ts
redo: StackEntry[];
```

##### undo

```ts
undo: StackEntry[];
```
