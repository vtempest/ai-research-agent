[ai-research-agent](../index.md) / editor/modules

## Functions

### input()

```ts
function input(editor): object
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `allowComposition()` |  |
| `destroy()` |  |
| `init()` |  |

***

### keyboard()

```ts
function keyboard(editor): object
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `destroy()` |  |
| `init()` |  |

***

### paste()

```ts
function paste(editor, options?): object
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

[`Editor`](Editor.md#editor)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`PasteModuleOptions`](modules/paste.md#pastemoduleoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `commands` | \{ `paste`: (`__namedParameters`) => `void`; \} |
| `destroy()` |  |
| `init()` |  |

***

### rendering()

```ts
function rendering(editor): object
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `render` | (`what`?) => `void` |
| `destroy()` |  |

***

### selection()

```ts
function selection(editor): object
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `pause` | () => `void` |
| `renderSelection` | () => `void` |
| `resume` | () => `void` |
| `destroy()` |  |
| `init()` |  |

## References

### addShortcutsToEvent

Re-exports [addShortcutsToEvent](modules/shortcutFromEvent.md#addshortcutstoevent)

### applyDecorations

Re-exports [applyDecorations](modules/decorations.md#applydecorations)

### copy

Re-exports [copy](modules/copy.md#copy)

### CopyData

Re-exports [CopyData](modules/copy.md#copydata)

### CopyOptions

Re-exports [CopyOptions](modules/copy.md#copyoptions)

### DecorateEvent

Re-exports [DecorateEvent](modules/decorations.md#decorateevent)

### DecorateEventInit

Re-exports [DecorateEventInit](modules/decorations.md#decorateeventinit)

### decorations

Re-exports [decorations](modules/decorations.md#decorations)

### Decorations

Re-exports [Decorations](modules/decorations.md#decorations-1)

### DecorationsModule

Re-exports [DecorationsModule](modules/decorations.md#decorationsmodule)

### Decorator

Re-exports [Decorator](modules/decorations.md#decorator)

### defaultHandlers

Re-exports [defaultHandlers](modules/smartEntry.md#defaulthandlers)

### defaultModules

Re-exports [defaultModules](modules/defaults.md#defaultmodules)

### Handler

Re-exports [Handler](modules/smartEntry.md#handler)

### history

Re-exports [history](modules/history.md#history)

### HistoryModule

Re-exports [HistoryModule](modules/history.md#historymodule)

### initHistory

Re-exports [initHistory](modules/history.md#inithistory)

### KeyboardEventWithShortcut

Re-exports [KeyboardEventWithShortcut](modules/shortcutFromEvent.md#keyboardeventwithshortcut)

### lineReplace

Re-exports [lineReplace](modules/smartEntry.md#linereplace)

### lineReplacements

Re-exports [lineReplacements](modules/smartEntry.md#linereplacements)

### linkReplace

Re-exports [linkReplace](modules/smartEntry.md#linkreplace)

### linkReplacements

Re-exports [linkReplacements](modules/smartEntry.md#linkreplacements)

### markReplace

Re-exports [markReplace](modules/smartEntry.md#markreplace)

### markReplacements

Re-exports [markReplacements](modules/smartEntry.md#markreplacements)

### Options

Re-exports [Options](modules/history.md#options-1)

### PasteEvent

Re-exports [PasteEvent](modules/paste.md#pasteevent)

### PasteEventInit

Re-exports [PasteEventInit](modules/paste.md#pasteeventinit)

### PasteModuleOptions

Re-exports [PasteModuleOptions](modules/paste.md#pastemoduleoptions)

### PasteOptions

Re-exports [PasteOptions](modules/paste.md#pasteoptions)

### placeholder

Re-exports [placeholder](modules/placeholder.md#placeholder)

### RenderWhat

Re-exports [RenderWhat](modules/rendering.md#renderwhat)

### Replacement

Re-exports [Replacement](modules/smartEntry.md#replacement)

### ShortcutEvent

Re-exports [ShortcutEvent](modules/shortcutFromEvent.md#shortcutevent)

### ShortcutEventInit

Re-exports [ShortcutEventInit](modules/shortcutFromEvent.md#shortcuteventinit)

### shortcutFromEvent

Re-exports [shortcutFromEvent](modules/shortcutFromEvent.md#shortcutfromevent)

### smartEntry

Re-exports [smartEntry](modules/smartEntry.md#smartentry)

### smartQuotes

Re-exports [smartQuotes](modules/smartQuotes.md#smartquotes)

### StackEntry

Re-exports [StackEntry](modules/history.md#stackentry)

### textReplace

Re-exports [textReplace](modules/smartEntry.md#textreplace)

### TextReplacement

Re-exports [TextReplacement](modules/smartEntry.md#textreplacement)

### textReplacements

Re-exports [textReplacements](modules/smartEntry.md#textreplacements)

### transformHistoryStack

Re-exports [transformHistoryStack](modules/history.md#transformhistorystack)

### undoStack

Re-exports [undoStack](modules/history.md#undostack)

### UndoStack

Re-exports [UndoStack](modules/history.md#undostack-1)

### virtualRendering

Re-exports [virtualRendering](modules/virtualRendering.md#virtualrendering)

### VirtualRenderWhat

Re-exports [VirtualRenderWhat](modules/virtualRendering.md#virtualrenderwhat)
