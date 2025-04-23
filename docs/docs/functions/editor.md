[Documentation](modules.md) / editor

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

[`Editor`](editor/Editor.md#editor)

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

[`Editor`](editor/Editor.md#editor)

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

[`Editor`](editor/Editor.md#editor)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`PasteModuleOptions`](editor/modules/paste-2.md#pastemoduleoptions)

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
  `paste`: (`__namedParameters`: [`PasteOptions`](editor/modules/paste-2.md#pasteoptions)) => `void`;
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

[`Editor`](editor/Editor.md#editor)

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

(`what?`: [`RenderWhat`](editor/modules/rendering-2.md#renderwhat)) => `void`

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

[`Editor`](editor/Editor.md#editor)

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

## activeStore

Re-exports [activeStore](editor/stores.md#activestore)

***

## addShortcutsToEvent

Re-exports [addShortcutsToEvent](editor/modules/shortcutFromEvent.md#addshortcutstoevent)

***

## applyDecorations

Re-exports [applyDecorations](editor/modules/decorations.md#applydecorations)

***

## asRoot

Re-exports [asRoot](editor/asRoot.md#asroot)

***

## AttributeMap

Re-exports [AttributeMap](editor/index.md#attributemap)

***

## BasicType

Re-exports [BasicType](editor/typesetting/typeset.md#basictype)

***

## BLOCK\_ELEMENTS

Re-exports [BLOCK_ELEMENTS](editor/rendering/html.md#block_elements)

***

## blockquote

Re-exports [blockquote](editor/typesetting/lines.md#blockquote)

***

## bold

Re-exports [bold](editor/typesetting/formats.md#bold)

***

## br

Re-exports [br](editor/typesetting/embeds.md#br)

***

## cleanText

Re-exports [cleanText](editor/rendering/html.md#cleantext)

***

## cloneDeep

Renames and re-exports [default](editor/delta/util/cloneDeep.md#default)

***

## code

Re-exports [code](editor/typesetting/formats.md#code)

***

## codeblock

Re-exports [codeblock](editor/typesetting/lines.md#codeblock)

***

## Combined

Re-exports [Combined](editor/rendering/rendering.md#combined)

***

## CombinedEntry

Re-exports [CombinedEntry](editor/rendering/rendering.md#combinedentry)

***

## combineLines

Re-exports [combineLines](editor/rendering/rendering.md#combinelines)

***

## Commands

Re-exports [Commands](editor/typesetting/typeset.md#commands-1)

***

## copy

Re-exports [copy](editor/modules/copy.md#copy)

***

## CopyData

Re-exports [CopyData](editor/modules/copy.md#copydata)

***

## CopyOptions

Re-exports [CopyOptions](editor/modules/copy.md#copyoptions)

***

## DecorateEvent

Re-exports [DecorateEvent](editor/modules/decorations.md#decorateevent)

***

## DecorateEventInit

Re-exports [DecorateEventInit](editor/modules/decorations.md#decorateeventinit)

***

## decorations

Re-exports [decorations](editor/modules/decorations.md#decorations-1)

***

## Decorations

Re-exports [Decorations](editor/modules/decorations.md#decorations)

***

## DecorationsModule

Re-exports [DecorationsModule](editor/modules/decorations.md#decorationsmodule)

***

## Decorator

Re-exports [Decorator](editor/modules/decorations.md#decorator)

***

## defaultHandlers

Re-exports [defaultHandlers](editor/modules/smartEntry.md#defaulthandlers)

***

## defaultModules

Re-exports [defaultModules](editor/modules/defaults.md#defaultmodules)

***

## defaultTypes

Re-exports [defaultTypes](editor/typesetting/defaults.md#defaulttypes)

***

## Delta

Renames and re-exports [default](editor/delta/Delta.md#default)

***

## deltaFromDom

Re-exports [deltaFromDom](editor/rendering/html.md#deltafromdom)

***

## deltaFromHTML

Re-exports [deltaFromHTML](editor/rendering/html.md#deltafromhtml)

***

## DeltaFromHTMLOptions

Re-exports [DeltaFromHTMLOptions](editor/rendering/html.md#deltafromhtmloptions)

***

## deltaToText

Re-exports [deltaToText](editor/document/deltaToText.md#deltatotext)

***

## derivedEditorStore

Re-exports [derivedEditorStore](editor/stores.md#derivededitorstore)

***

## diff

Re-exports [diff](editor/index.md#diff)

***

## dl

Re-exports [dl](editor/typesetting/lines.md#dl)

***

## docFromDom

Re-exports [docFromDom](editor/rendering/html.md#docfromdom)

***

## docFromHTML

Re-exports [docFromHTML](editor/rendering/html.md#docfromhtml)

***

## docStore

Re-exports [docStore](editor/stores.md#docstore)

***

## docToHTML

Re-exports [docToHTML](editor/rendering/html.md#doctohtml)

***

## Editor

Re-exports [Editor](editor/Editor.md#editor)

***

## EditorChangeEvent

Re-exports [EditorChangeEvent](editor/Editor.md#editorchangeevent)

***

## EditorChangeEventInit

Re-exports [EditorChangeEventInit](editor/Editor.md#editorchangeeventinit)

***

## EditorEventMap

Re-exports [EditorEventMap](editor/Editor.md#editoreventmap)

***

## EditorFormatEvent

Re-exports [EditorFormatEvent](editor/Editor.md#editorformatevent)

***

## EditorFormatEventInit

Re-exports [EditorFormatEventInit](editor/Editor.md#editorformateventinit)

***

## EditorOptions

Re-exports [EditorOptions](editor/Editor.md#editoroptions)

***

## EditorRange

Re-exports [EditorRange](editor/document/EditorRange.md#editorrange)

***

## editorStores

Re-exports [editorStores](editor/stores.md#editorstores-1)

***

## EditorStores

Re-exports [EditorStores](editor/stores.md#editorstores)

***

## EditorTextChange

Re-exports [EditorTextChange](editor/Editor.md#editortextchange)

***

## embed

Re-exports [embed](editor/typesetting/typeset.md#embed-1)

***

## EmbedType

Re-exports [EmbedType](editor/typesetting/typeset.md#embedtype)

***

## EventDispatcher

Re-exports [EventDispatcher](editor/util/EventDispatcher.md#eventdispatcher)

***

## focusStore

Re-exports [focusStore](editor/stores.md#focusstore)

***

## format

Re-exports [format](editor/typesetting/typeset.md#format-1)

***

## FormattingOptions

Re-exports [FormattingOptions](editor/document/TextDocument.md#formattingoptions)

***

## FormatType

Re-exports [FormatType](editor/typesetting/typeset.md#formattype)

***

## FromDom

Re-exports [FromDom](editor/typesetting/typeset.md#fromdom-4)

***

## FromDomOptions

Re-exports [FromDomOptions](editor/rendering/html.md#fromdomoptions)

***

## fromNode

Re-exports [fromNode](editor/rendering/html.md#fromnode)

***

## getBoudingBrowserRange

Re-exports [getBoudingBrowserRange](editor/rendering/position.md#getboudingbrowserrange)

***

## getBrowserRange

Re-exports [getBrowserRange](editor/rendering/position.md#getbrowserrange)

***

## getChangedRanges

Re-exports [getChangedRanges](editor/rendering/rendering.md#getchangedranges)

***

## getIndexFromNode

Re-exports [getIndexFromNode](editor/rendering/position.md#getindexfromnode)

***

## getIndexFromNodeAndOffset

Re-exports [getIndexFromNodeAndOffset](editor/rendering/position.md#getindexfromnodeandoffset)

***

## getIndexFromPoint

Re-exports [getIndexFromPoint](editor/rendering/position.md#getindexfrompoint)

***

## getLineElementAt

Re-exports [getLineElementAt](editor/rendering/position.md#getlineelementat)

***

## getLineInfoFromPoint

Re-exports [getLineInfoFromPoint](editor/rendering/position.md#getlineinfofrompoint)

***

## getLineNodeEnd

Re-exports [getLineNodeEnd](editor/rendering/rendering.md#getlinenodeend)

***

## getLineNodeStart

Re-exports [getLineNodeStart](editor/rendering/rendering.md#getlinenodestart)

***

## getNodeAndOffset

Re-exports [getNodeAndOffset](editor/rendering/position.md#getnodeandoffset)

***

## getNodeLength

Re-exports [getNodeLength](editor/rendering/position.md#getnodelength)

***

## getNodesForRange

Re-exports [getNodesForRange](editor/rendering/position.md#getnodesforrange)

***

## getSelection

Re-exports [getSelection](editor/rendering/selection.md#getselection)

***

## h

Re-exports [h](editor/rendering/vdom.md#h-3)

***

## H

Re-exports [H](editor/rendering/vdom.md#h)

***

## Handler

Re-exports [Handler](editor/modules/smartEntry.md#handler)

***

## hasFormat

Re-exports [hasFormat](editor/document/TextChange.md#hasformat)

***

## header

Re-exports [header](editor/typesetting/lines.md#header)

***

## history

Re-exports [history](editor/modules/history.md#history)

***

## HistoryModule

Re-exports [HistoryModule](editor/modules/history.md#historymodule)

***

## hr

Re-exports [hr](editor/typesetting/lines.md#hr)

***

## HTMLLineElement

Re-exports [HTMLLineElement](editor/rendering/rendering.md#htmllineelement)

***

## image

Re-exports [image](editor/typesetting/embeds.md#image)

***

## initHistory

Re-exports [initHistory](editor/modules/history.md#inithistory)

***

## inlineToHTML

Re-exports [inlineToHTML](editor/rendering/html.md#inlinetohtml)

***

## intersect

Re-exports [intersect](editor/document/TextChange.md#intersect)

***

## isBRPlaceholder

Re-exports [isBRPlaceholder](editor/rendering/html.md#isbrplaceholder)

***

## isEqual

Renames and re-exports [default](editor/delta/util/isEqual.md#default)

***

## italic

Re-exports [italic](editor/typesetting/formats.md#italic)

***

## KeyboardEventWithShortcut

Re-exports [KeyboardEventWithShortcut](editor/modules/shortcutFromEvent.md#keyboardeventwithshortcut)

***

## line

Re-exports [line](editor/typesetting/typeset.md#line-1)

***

## Line

Re-exports [Line](editor/index.md#line)

***

## LineData

Re-exports [LineData](editor/typesetting/typeset.md#linedata)

***

## LineIds

Re-exports [LineIds](editor/document/Line.md#lineids-1)

***

## LineInfo

Re-exports [LineInfo](editor/rendering/position.md#lineinfo)

***

## LineIterator

Re-exports [LineIterator](editor/document/Line.md#lineiterator)

***

## LineOp

Re-exports [LineOp](editor/namespaces/LineOp.md)

***

## LineOpIterator

Re-exports [LineOpIterator](editor/document/LineOp.md#lineopiterator)

***

## LineRanges

Re-exports [LineRanges](editor/document/Line.md#lineranges)

***

## lineReplace

Re-exports [lineReplace](editor/modules/smartEntry.md#linereplace)

***

## lineReplacements

Re-exports [lineReplacements](editor/modules/smartEntry.md#linereplacements)

***

## LineType

Re-exports [LineType](editor/typesetting/typeset.md#linetype)

***

## link

Re-exports [link](editor/typesetting/formats.md#link)

***

## linkReplace

Re-exports [linkReplace](editor/modules/smartEntry.md#linkreplace)

***

## linkReplacements

Re-exports [linkReplacements](editor/modules/smartEntry.md#linkreplacements)

***

## list

Re-exports [list](editor/typesetting/lines.md#list)

***

## mark

Re-exports [mark](editor/typesetting/formats.md#mark)

***

## markReplace

Re-exports [markReplace](editor/modules/smartEntry.md#markreplace)

***

## markReplacements

Re-exports [markReplacements](editor/modules/smartEntry.md#markreplacements)

***

## Module

Re-exports [Module](editor/Editor.md#module)

***

## ModuleInitializer

Re-exports [ModuleInitializer](editor/Editor.md#moduleinitializer)

***

## ModuleInitializers

Re-exports [ModuleInitializers](editor/Editor.md#moduleinitializers)

***

## Modules

Re-exports [Modules](editor/Editor.md#modules-2)

***

## MultiLineRenderer

Re-exports [MultiLineRenderer](editor/typesetting/typeset.md#multilinerenderer)

***

## normalizeRange

Re-exports [normalizeRange](editor/document/EditorRange.md#normalizerange)

***

## Op

Re-exports [Op](editor/index.md#op)

***

## OpIterator

Re-exports [OpIterator](editor/delta/Op.md#opiterator)

***

## options

Re-exports [options](editor/rendering/vdom.md#options)

***

## Options

Re-exports [Options](editor/modules/history.md#options-1)

***

## paragraph

Re-exports [paragraph](editor/typesetting/lines.md#paragraph)

***

## PasteEvent

Re-exports [PasteEvent](editor/modules/paste-2.md#pasteevent)

***

## PasteEventInit

Re-exports [PasteEventInit](editor/modules/paste-2.md#pasteeventinit)

***

## PasteModuleOptions

Re-exports [PasteModuleOptions](editor/modules/paste-2.md#pastemoduleoptions)

***

## PasteOptions

Re-exports [PasteOptions](editor/modules/paste-2.md#pasteoptions)

***

## patch

Re-exports [patch](editor/rendering/vdom.md#patch)

***

## placeholder

Re-exports [placeholder](editor/modules/placeholder.md#placeholder)

***

## Props

Re-exports [Props](editor/rendering/vdom.md#props)

***

## React

Re-exports [React](editor/rendering/vdom.md#react)

***

## Readable

Re-exports [Readable](editor/stores.md#readable)

***

## recycleNode

Re-exports [recycleNode](editor/rendering/vdom.md#recyclenode)

***

## render

Re-exports [render](editor/rendering/rendering.md#render)

***

## renderChanges

Re-exports [renderChanges](editor/rendering/rendering.md#renderchanges)

***

## renderCombined

Re-exports [renderCombined](editor/rendering/rendering.md#rendercombined)

***

## renderDoc

Re-exports [renderDoc](editor/rendering/rendering.md#renderdoc)

***

## Renderer

Re-exports [Renderer](editor/typesetting/typeset.md#renderer)

***

## renderInline

Re-exports [renderInline](editor/rendering/rendering.md#renderinline)

***

## renderLine

Re-exports [renderLine](editor/rendering/rendering.md#renderline)

***

## renderMultiLine

Re-exports [renderMultiLine](editor/rendering/rendering.md#rendermultiline)

***

## renderSingleLine

Re-exports [renderSingleLine](editor/rendering/rendering.md#rendersingleline)

***

## RenderWhat

Re-exports [RenderWhat](editor/modules/rendering-2.md#renderwhat)

***

## Replacement

Re-exports [Replacement](editor/modules/smartEntry.md#replacement)

***

## rootStore

Re-exports [rootStore](editor/stores.md#rootstore)

***

## selectionStore

Re-exports [selectionStore](editor/stores.md#selectionstore)

***

## setLineNodesRanges

Re-exports [setLineNodesRanges](editor/rendering/rendering.md#setlinenodesranges)

***

## setSelection

Re-exports [setSelection](editor/rendering/selection.md#setselection)

***

## ShortcutEvent

Re-exports [ShortcutEvent](editor/modules/shortcutFromEvent.md#shortcutevent)

***

## ShortcutEventInit

Re-exports [ShortcutEventInit](editor/modules/shortcutFromEvent.md#shortcuteventinit)

***

## shortcutFromEvent

Re-exports [shortcutFromEvent](editor/modules/shortcutFromEvent.md#shortcutfromevent)

***

## Shortcuts

Re-exports [Shortcuts](editor/Editor.md#shortcuts-2)

***

## ShouldCombine

Re-exports [ShouldCombine](editor/typesetting/typeset.md#shouldcombine-1)

***

## smartEntry

Re-exports [smartEntry](editor/modules/smartEntry.md#smartentry)

***

## smartQuotes

Re-exports [smartQuotes](editor/modules/smartQuotes.md#smartquotes)

***

## Source

Re-exports [Source](editor/Source.md#source)

***

## SourceString

Re-exports [SourceString](editor/Source.md#sourcestring)

***

## StackEntry

Re-exports [StackEntry](editor/modules/history.md#stackentry)

***

## Subscriber

Re-exports [Subscriber](editor/stores.md#subscriber)

***

## TextChange

Renames and re-exports [default](editor/document/TextChange.md#default)

***

## TextDocument

Renames and re-exports [default](editor/document/TextDocument.md#default)

***

## textNodeLength

Re-exports [textNodeLength](editor/rendering/position.md#textnodelength)

***

## textReplace

Re-exports [textReplace](editor/modules/smartEntry.md#textreplace)

***

## TextReplacement

Re-exports [TextReplacement](editor/modules/smartEntry.md#textreplacement)

***

## textReplacements

Re-exports [textReplacements](editor/modules/smartEntry.md#textreplacements)

***

## transformHistoryStack

Re-exports [transformHistoryStack](editor/modules/history.md#transformhistorystack)

***

## TypeMap

Re-exports [TypeMap](editor/typesetting/typeset.md#typemap)

***

## Types

Re-exports [Types](editor/typesetting/typeset.md#types)

***

## Typeset

Re-exports [Typeset](editor/typesetting/typeset.md#typeset)

***

## TypesetTypes

Re-exports [TypesetTypes](editor/typesetting/typeset.md#typesettypes)

***

## underline

Re-exports [underline](editor/typesetting/formats.md#underline)

***

## undoStack

Re-exports [undoStack](editor/modules/history.md#undostack-1)

***

## UndoStack

Re-exports [UndoStack](editor/modules/history.md#undostack)

***

## Unsubscriber

Re-exports [Unsubscriber](editor/stores.md#unsubscriber)

***

## VChild

Re-exports [VChild](editor/rendering/vdom.md#vchild)

***

## virtualRendering

Re-exports [virtualRendering](editor/modules/virtualRendering.md#virtualrendering)

***

## VirtualRenderWhat

Re-exports [VirtualRenderWhat](editor/modules/virtualRendering.md#virtualrenderwhat)

***

## VNode

Re-exports [VNode](editor/rendering/vdom.md#vnode)
