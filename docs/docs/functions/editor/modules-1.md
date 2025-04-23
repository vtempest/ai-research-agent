[Documentation](../modules.md) / editor/modules

## input()

```ts
function input(editor: Editor): object;
```

Defined in: editor/modules/input.ts:22

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

[`Editor`](Editor.md#editor)

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

`allowComposition()`

</td>
<td>

(`value`: `boolean`) => 

</td>
<td>

editor/modules/input.ts:183

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

editor/modules/input.ts:200

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

editor/modules/input.ts:192

</td>
</tr>
</tbody>
</table>

***

## keyboard()

```ts
function keyboard(editor: Editor): object;
```

Defined in: editor/modules/keyboard.ts:12

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

[`Editor`](Editor.md#editor)

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

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/keyboard.ts:231

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

editor/modules/keyboard.ts:228

</td>
</tr>
</tbody>
</table>

***

## paste()

```ts
function paste(editor: Editor, options?: PasteModuleOptions): object;
```

Defined in: editor/modules/paste.ts:39

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

[`Editor`](Editor.md#editor)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`PasteModuleOptions`](modules/paste-2.md#pastemoduleoptions)

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

`commands`

</td>
<td>

\{
  `paste`: (`__namedParameters`: [`PasteOptions`](modules/paste-2.md#pasteoptions)) => `void`;
\}

</td>
<td>

editor/modules/paste.ts:129

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

editor/modules/paste.ts:135

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

editor/modules/paste.ts:132

</td>
</tr>
</tbody>
</table>

***

## rendering()

```ts
function rendering(editor: Editor): object;
```

Defined in: editor/modules/rendering.ts:10

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

[`Editor`](Editor.md#editor)

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

`render()`

</td>
<td>

(`what?`: [`RenderWhat`](modules/rendering-2.md#renderwhat)) => `void`

</td>
<td>

editor/modules/rendering.ts:35

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

editor/modules/rendering.ts:36

</td>
</tr>
</tbody>
</table>

***

## selection()

```ts
function selection(editor: Editor): object;
```

Defined in: editor/modules/selection.ts:7

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

[`Editor`](Editor.md#editor)

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

`pause()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/selection.ts:121

</td>
</tr>
<tr>
<td>

`renderSelection()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/selection.ts:123

</td>
</tr>
<tr>
<td>

`resume()`

</td>
<td>

() => `void`

</td>
<td>

editor/modules/selection.ts:122

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

editor/modules/selection.ts:135

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

editor/modules/selection.ts:124

</td>
</tr>
</tbody>
</table>

***

## addShortcutsToEvent

Re-exports [addShortcutsToEvent](modules/shortcutFromEvent.md#addshortcutstoevent)

***

## applyDecorations

Re-exports [applyDecorations](modules/decorations.md#applydecorations)

***

## copy

Re-exports [copy](modules/copy.md#copy)

***

## CopyData

Re-exports [CopyData](modules/copy.md#copydata)

***

## CopyOptions

Re-exports [CopyOptions](modules/copy.md#copyoptions)

***

## DecorateEvent

Re-exports [DecorateEvent](modules/decorations.md#decorateevent)

***

## DecorateEventInit

Re-exports [DecorateEventInit](modules/decorations.md#decorateeventinit)

***

## decorations

Re-exports [decorations](modules/decorations.md#decorations-1)

***

## Decorations

Re-exports [Decorations](modules/decorations.md#decorations)

***

## DecorationsModule

Re-exports [DecorationsModule](modules/decorations.md#decorationsmodule)

***

## Decorator

Re-exports [Decorator](modules/decorations.md#decorator)

***

## defaultHandlers

Re-exports [defaultHandlers](modules/smartEntry.md#defaulthandlers)

***

## defaultModules

Re-exports [defaultModules](modules/defaults.md#defaultmodules)

***

## Handler

Re-exports [Handler](modules/smartEntry.md#handler)

***

## history

Re-exports [history](modules/history.md#history)

***

## HistoryModule

Re-exports [HistoryModule](modules/history.md#historymodule)

***

## initHistory

Re-exports [initHistory](modules/history.md#inithistory)

***

## KeyboardEventWithShortcut

Re-exports [KeyboardEventWithShortcut](modules/shortcutFromEvent.md#keyboardeventwithshortcut)

***

## lineReplace

Re-exports [lineReplace](modules/smartEntry.md#linereplace)

***

## lineReplacements

Re-exports [lineReplacements](modules/smartEntry.md#linereplacements)

***

## linkReplace

Re-exports [linkReplace](modules/smartEntry.md#linkreplace)

***

## linkReplacements

Re-exports [linkReplacements](modules/smartEntry.md#linkreplacements)

***

## markReplace

Re-exports [markReplace](modules/smartEntry.md#markreplace)

***

## markReplacements

Re-exports [markReplacements](modules/smartEntry.md#markreplacements)

***

## Options

Re-exports [Options](modules/history.md#options-1)

***

## PasteEvent

Re-exports [PasteEvent](modules/paste-2.md#pasteevent)

***

## PasteEventInit

Re-exports [PasteEventInit](modules/paste-2.md#pasteeventinit)

***

## PasteModuleOptions

Re-exports [PasteModuleOptions](modules/paste-2.md#pastemoduleoptions)

***

## PasteOptions

Re-exports [PasteOptions](modules/paste-2.md#pasteoptions)

***

## placeholder

Re-exports [placeholder](modules/placeholder.md#placeholder)

***

## RenderWhat

Re-exports [RenderWhat](modules/rendering-2.md#renderwhat)

***

## Replacement

Re-exports [Replacement](modules/smartEntry.md#replacement)

***

## ShortcutEvent

Re-exports [ShortcutEvent](modules/shortcutFromEvent.md#shortcutevent)

***

## ShortcutEventInit

Re-exports [ShortcutEventInit](modules/shortcutFromEvent.md#shortcuteventinit)

***

## shortcutFromEvent

Re-exports [shortcutFromEvent](modules/shortcutFromEvent.md#shortcutfromevent)

***

## smartEntry

Re-exports [smartEntry](modules/smartEntry.md#smartentry)

***

## smartQuotes

Re-exports [smartQuotes](modules/smartQuotes.md#smartquotes)

***

## StackEntry

Re-exports [StackEntry](modules/history.md#stackentry)

***

## textReplace

Re-exports [textReplace](modules/smartEntry.md#textreplace)

***

## TextReplacement

Re-exports [TextReplacement](modules/smartEntry.md#textreplacement)

***

## textReplacements

Re-exports [textReplacements](modules/smartEntry.md#textreplacements)

***

## transformHistoryStack

Re-exports [transformHistoryStack](modules/history.md#transformhistorystack)

***

## undoStack

Re-exports [undoStack](modules/history.md#undostack-1)

***

## UndoStack

Re-exports [UndoStack](modules/history.md#undostack)

***

## virtualRendering

Re-exports [virtualRendering](modules/virtualRendering.md#virtualrendering)

***

## VirtualRenderWhat

Re-exports [VirtualRenderWhat](modules/virtualRendering.md#virtualrenderwhat)
