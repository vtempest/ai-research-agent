[Documentation](../../modules.md) / editor/modules/history

## HistoryModule

Defined in: editor/modules/history.ts:24

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="clearhistory"></a> `clearHistory`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:31

</td>
</tr>
<tr>
<td>

<a id="cutoffhistory"></a> `cutoffHistory`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:30

</td>
</tr>
<tr>
<td>

<a id="getstack"></a> `getStack`

</td>
<td>

() => [`UndoStack`](#undostack)

</td>
<td>

editor/modules/history.ts:33

</td>
</tr>
<tr>
<td>

<a id="hasredo"></a> `hasRedo`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:27

</td>
</tr>
<tr>
<td>

<a id="hasundo"></a> `hasUndo`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:26

</td>
</tr>
<tr>
<td>

<a id="options"></a> `options`

</td>
<td>

[`Options`](#options-1)

</td>
<td>

editor/modules/history.ts:25

</td>
</tr>
<tr>
<td>

<a id="redo"></a> `redo`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:29

</td>
</tr>
<tr>
<td>

<a id="setstack"></a> `setStack`

</td>
<td>

(`value`: [`UndoStack`](#undostack)) => `void`

</td>
<td>

editor/modules/history.ts:32

</td>
</tr>
<tr>
<td>

<a id="undo"></a> `undo`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:28

</td>
</tr>
</tbody>
</table>

### Methods

#### destroy()

```ts
destroy(): void;
```

Defined in: editor/modules/history.ts:34

##### Returns

`void`

***

## Options

Defined in: editor/modules/history.ts:15

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="delay"></a> `delay`

</td>
<td>

`number`

</td>
<td>

editor/modules/history.ts:16

</td>
</tr>
<tr>
<td>

<a id="maxstack"></a> `maxStack`

</td>
<td>

`number`

</td>
<td>

editor/modules/history.ts:17

</td>
</tr>
<tr>
<td>

<a id="unrecordedsources"></a> `unrecordedSources`

</td>
<td>

`Set`&lt;`string`&gt;

</td>
<td>

editor/modules/history.ts:18

</td>
</tr>
</tbody>
</table>

***

## StackEntry

Defined in: editor/modules/history.ts:5

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="redo-1"></a> `redo`

</td>
<td>

[`default`](../document/TextChange.md#default)

</td>
<td>

editor/modules/history.ts:6

</td>
</tr>
<tr>
<td>

<a id="undo-1"></a> `undo`

</td>
<td>

[`default`](../document/TextChange.md#default)

</td>
<td>

editor/modules/history.ts:7

</td>
</tr>
</tbody>
</table>

***

## UndoStack

Defined in: editor/modules/history.ts:10

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="redo-2"></a> `redo`

</td>
<td>

[`StackEntry`](#stackentry)[]

</td>
<td>

editor/modules/history.ts:12

</td>
</tr>
<tr>
<td>

<a id="undo-2"></a> `undo`

</td>
<td>

[`StackEntry`](#stackentry)[]

</td>
<td>

editor/modules/history.ts:11

</td>
</tr>
</tbody>
</table>

***

## history()

```ts
const history: (editor: Editor) => object;
```

Defined in: editor/modules/history.ts:22

### Parameters

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

### Returns

`object`

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

`clearHistory()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:161

</td>
</tr>
<tr>
<td>

`commands`

</td>
<td>

\{
  `redo`: () => `void`;
  `undo`: () => `void`;
\}

</td>
<td>

editor/modules/history.ts:167

</td>
</tr>
<tr>
<td>

`cutoffHistory()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:160

</td>
</tr>
<tr>
<td>

`getStack()`

</td>
<td>

() => [`UndoStack`](#undostack)

</td>
<td>

editor/modules/history.ts:163

</td>
</tr>
<tr>
<td>

`hasRedo()`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:157

</td>
</tr>
<tr>
<td>

`hasUndo()`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:156

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`Options`](#options-1)

</td>
<td>

editor/modules/history.ts:155

</td>
</tr>
<tr>
<td>

`redo()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:159

</td>
</tr>
<tr>
<td>

`setStack()`

</td>
<td>

(`value`: [`UndoStack`](#undostack)) => `void`

</td>
<td>

editor/modules/history.ts:162

</td>
</tr>
<tr>
<td>

`shortcuts`

</td>
<td>

\{
  `mac:Cmd+Shift+Z`: `string`;
  `mac:Cmd+Z`: `string`;
  `win:Ctrl+Y`: `string`;
  `win:Ctrl+Z`: `string`;
\}

</td>
<td>

editor/modules/history.ts:171

</td>
</tr>
<tr>
<td>

`undo()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:158

</td>
</tr>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:181

</td>
</tr>
<tr>
<td>

`getActive()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:164

</td>
</tr>
<tr>
<td>

`init()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:177

</td>
</tr>
</tbody>
</table>

***

## initHistory()

```ts
function initHistory(initOptions: Partial<Options>): (editor: Editor) => object;
```

Defined in: editor/modules/history.ts:53

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

### Parameters

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

`Partial`&lt;[`Options`](#options-1)&gt;

</td>
</tr>
</tbody>
</table>

### Returns

```ts
(editor: Editor): object;
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

`clearHistory()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:161

</td>
</tr>
<tr>
<td>

`commands`

</td>
<td>

\{
  `redo`: () => `void`;
  `undo`: () => `void`;
\}

</td>
<td>

editor/modules/history.ts:167

</td>
</tr>
<tr>
<td>

`cutoffHistory()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:160

</td>
</tr>
<tr>
<td>

`getStack()`

</td>
<td>

() => [`UndoStack`](#undostack)

</td>
<td>

editor/modules/history.ts:163

</td>
</tr>
<tr>
<td>

`hasRedo()`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:157

</td>
</tr>
<tr>
<td>

`hasUndo()`

</td>
<td>

() => `boolean`

</td>
<td>

editor/modules/history.ts:156

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`Options`](#options-1)

</td>
<td>

editor/modules/history.ts:155

</td>
</tr>
<tr>
<td>

`redo()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:159

</td>
</tr>
<tr>
<td>

`setStack()`

</td>
<td>

(`value`: [`UndoStack`](#undostack)) => `void`

</td>
<td>

editor/modules/history.ts:162

</td>
</tr>
<tr>
<td>

`shortcuts`

</td>
<td>

\{
  `mac:Cmd+Shift+Z`: `string`;
  `mac:Cmd+Z`: `string`;
  `win:Ctrl+Y`: `string`;
  `win:Ctrl+Z`: `string`;
\}

</td>
<td>

editor/modules/history.ts:171

</td>
</tr>
<tr>
<td>

`undo()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/history.ts:158

</td>
</tr>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:181

</td>
</tr>
<tr>
<td>

`getActive()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:164

</td>
</tr>
<tr>
<td>

`init()`

</td>
<td>

() => 

</td>
<td>

editor/modules/history.ts:177

</td>
</tr>
</tbody>
</table>

***

## transformHistoryStack()

```ts
function transformHistoryStack(stack: UndoStack, delta: 
  | default
  | default): void;
```

Defined in: editor/modules/history.ts:196

### Parameters

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

[`UndoStack`](#undostack)

</td>
</tr>
<tr>
<td>

`delta`

</td>
<td>

 \| [`default`](../delta/Delta.md#default) \| [`default`](../document/TextChange.md#default)

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## undoStack()

```ts
function undoStack(): UndoStack;
```

Defined in: editor/modules/history.ts:189

### Returns

[`UndoStack`](#undostack)
