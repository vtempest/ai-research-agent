[Documentation](../modules.md) / editor

## Namespaces

- [AttributeMap](namespaces/AttributeMap.md)
- [Line](namespaces/Line.md)
- [LineOp](namespaces/LineOp.md)
- [Op](namespaces/Op.md)

## AttributeMap

Defined in: editor/delta/AttributeMap.ts:4

### Indexable

```ts
[key: string]: any
```

***

## Line

Defined in: editor/document/Line.ts:14

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

<a id="attributes"></a> `attributes`

</td>
<td>

[`AttributeMap`](#attributemap)

</td>
<td>

editor/document/Line.ts:16

</td>
</tr>
<tr>
<td>

<a id="content"></a> `content`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
<td>

editor/document/Line.ts:17

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`string`

</td>
<td>

editor/document/Line.ts:15

</td>
</tr>
<tr>
<td>

<a id="length"></a> `length`

</td>
<td>

`number`

</td>
<td>

editor/document/Line.ts:18

</td>
</tr>
</tbody>
</table>

***

## Op

Defined in: editor/delta/Op.ts:4

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

<a id="attributes-1"></a> `attributes?`

</td>
<td>

[`AttributeMap`](#attributemap)

</td>
<td>

editor/delta/Op.ts:10

</td>
</tr>
<tr>
<td>

<a id="delete"></a> `delete?`

</td>
<td>

`number`

</td>
<td>

editor/delta/Op.ts:7

</td>
</tr>
<tr>
<td>

<a id="insert"></a> `insert?`

</td>
<td>

`string` \| `Record`&lt;`string`, `any`&gt;

</td>
<td>

editor/delta/Op.ts:6

</td>
</tr>
<tr>
<td>

<a id="retain"></a> `retain?`

</td>
<td>

`number`

</td>
<td>

editor/delta/Op.ts:8

</td>
</tr>
</tbody>
</table>

***

## diff()

```ts
function diff(
   text1: any, 
   text2: any, 
   cursor_pos: any, 
   cleanup: any): any[];
```

Defined in: editor/delta/fast-diff.js:1129

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

`text1`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`text2`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`cursor_pos`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`cleanup`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`[]

***

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

## activeStore

Re-exports [activeStore](stores.md#activestore)

***

## addShortcutsToEvent

Re-exports [addShortcutsToEvent](modules/shortcutFromEvent.md#addshortcutstoevent)

***

## applyDecorations

Re-exports [applyDecorations](modules/decorations.md#applydecorations)

***

## asRoot

Re-exports [asRoot](asRoot.md#asroot)

***

## BasicType

Re-exports [BasicType](typesetting/typeset.md#basictype)

***

## BLOCK\_ELEMENTS

Re-exports [BLOCK_ELEMENTS](rendering/html.md#block_elements)

***

## blockquote

Re-exports [blockquote](typesetting/lines.md#blockquote)

***

## bold

Re-exports [bold](typesetting/formats.md#bold)

***

## br

Re-exports [br](typesetting/embeds.md#br)

***

## cleanText

Re-exports [cleanText](rendering/html.md#cleantext)

***

## cloneDeep

Renames and re-exports [default](delta/util/cloneDeep.md#default)

***

## code

Re-exports [code](typesetting/formats.md#code)

***

## codeblock

Re-exports [codeblock](typesetting/lines.md#codeblock)

***

## Combined

Re-exports [Combined](rendering/rendering.md#combined)

***

## CombinedEntry

Re-exports [CombinedEntry](rendering/rendering.md#combinedentry)

***

## combineLines

Re-exports [combineLines](rendering/rendering.md#combinelines)

***

## Commands

Re-exports [Commands](typesetting/typeset.md#commands-1)

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

## defaultTypes

Re-exports [defaultTypes](typesetting/defaults.md#defaulttypes)

***

## Delta

Renames and re-exports [default](delta/Delta.md#default)

***

## deltaFromDom

Re-exports [deltaFromDom](rendering/html.md#deltafromdom)

***

## deltaFromHTML

Re-exports [deltaFromHTML](rendering/html.md#deltafromhtml)

***

## DeltaFromHTMLOptions

Re-exports [DeltaFromHTMLOptions](rendering/html.md#deltafromhtmloptions)

***

## deltaToText

Re-exports [deltaToText](document/deltaToText.md#deltatotext)

***

## derivedEditorStore

Re-exports [derivedEditorStore](stores.md#derivededitorstore)

***

## dl

Re-exports [dl](typesetting/lines.md#dl)

***

## docFromDom

Re-exports [docFromDom](rendering/html.md#docfromdom)

***

## docFromHTML

Re-exports [docFromHTML](rendering/html.md#docfromhtml)

***

## docStore

Re-exports [docStore](stores.md#docstore)

***

## docToHTML

Re-exports [docToHTML](rendering/html.md#doctohtml)

***

## Editor

Re-exports [Editor](Editor.md#editor)

***

## EditorChangeEvent

Re-exports [EditorChangeEvent](Editor.md#editorchangeevent)

***

## EditorChangeEventInit

Re-exports [EditorChangeEventInit](Editor.md#editorchangeeventinit)

***

## EditorEventMap

Re-exports [EditorEventMap](Editor.md#editoreventmap)

***

## EditorFormatEvent

Re-exports [EditorFormatEvent](Editor.md#editorformatevent)

***

## EditorFormatEventInit

Re-exports [EditorFormatEventInit](Editor.md#editorformateventinit)

***

## EditorOptions

Re-exports [EditorOptions](Editor.md#editoroptions)

***

## EditorRange

Re-exports [EditorRange](document/EditorRange.md#editorrange)

***

## editorStores

Re-exports [editorStores](stores.md#editorstores-1)

***

## EditorStores

Re-exports [EditorStores](stores.md#editorstores)

***

## EditorTextChange

Re-exports [EditorTextChange](Editor.md#editortextchange)

***

## embed

Re-exports [embed](typesetting/typeset.md#embed-1)

***

## EmbedType

Re-exports [EmbedType](typesetting/typeset.md#embedtype)

***

## EventDispatcher

Re-exports [EventDispatcher](util/EventDispatcher.md#eventdispatcher)

***

## focusStore

Re-exports [focusStore](stores.md#focusstore)

***

## format

Re-exports [format](typesetting/typeset.md#format-1)

***

## FormattingOptions

Re-exports [FormattingOptions](document/TextDocument.md#formattingoptions)

***

## FormatType

Re-exports [FormatType](typesetting/typeset.md#formattype)

***

## FromDom

Re-exports [FromDom](typesetting/typeset.md#fromdom-4)

***

## FromDomOptions

Re-exports [FromDomOptions](rendering/html.md#fromdomoptions)

***

## fromNode

Re-exports [fromNode](rendering/html.md#fromnode)

***

## getBoudingBrowserRange

Re-exports [getBoudingBrowserRange](rendering/position.md#getboudingbrowserrange)

***

## getBrowserRange

Re-exports [getBrowserRange](rendering/position.md#getbrowserrange)

***

## getChangedRanges

Re-exports [getChangedRanges](rendering/rendering.md#getchangedranges)

***

## getIndexFromNode

Re-exports [getIndexFromNode](rendering/position.md#getindexfromnode)

***

## getIndexFromNodeAndOffset

Re-exports [getIndexFromNodeAndOffset](rendering/position.md#getindexfromnodeandoffset)

***

## getIndexFromPoint

Re-exports [getIndexFromPoint](rendering/position.md#getindexfrompoint)

***

## getLineElementAt

Re-exports [getLineElementAt](rendering/position.md#getlineelementat)

***

## getLineInfoFromPoint

Re-exports [getLineInfoFromPoint](rendering/position.md#getlineinfofrompoint)

***

## getLineNodeEnd

Re-exports [getLineNodeEnd](rendering/rendering.md#getlinenodeend)

***

## getLineNodeStart

Re-exports [getLineNodeStart](rendering/rendering.md#getlinenodestart)

***

## getNodeAndOffset

Re-exports [getNodeAndOffset](rendering/position.md#getnodeandoffset)

***

## getNodeLength

Re-exports [getNodeLength](rendering/position.md#getnodelength)

***

## getNodesForRange

Re-exports [getNodesForRange](rendering/position.md#getnodesforrange)

***

## getSelection

Re-exports [getSelection](rendering/selection.md#getselection)

***

## h

Re-exports [h](rendering/vdom.md#h-3)

***

## H

Re-exports [H](rendering/vdom.md#h)

***

## Handler

Re-exports [Handler](modules/smartEntry.md#handler)

***

## hasFormat

Re-exports [hasFormat](document/TextChange.md#hasformat)

***

## header

Re-exports [header](typesetting/lines.md#header)

***

## history

Re-exports [history](modules/history.md#history)

***

## HistoryModule

Re-exports [HistoryModule](modules/history.md#historymodule)

***

## hr

Re-exports [hr](typesetting/lines.md#hr)

***

## HTMLLineElement

Re-exports [HTMLLineElement](rendering/rendering.md#htmllineelement)

***

## image

Re-exports [image](typesetting/embeds.md#image)

***

## initHistory

Re-exports [initHistory](modules/history.md#inithistory)

***

## inlineToHTML

Re-exports [inlineToHTML](rendering/html.md#inlinetohtml)

***

## intersect

Re-exports [intersect](document/TextChange.md#intersect)

***

## isBRPlaceholder

Re-exports [isBRPlaceholder](rendering/html.md#isbrplaceholder)

***

## isEqual

Renames and re-exports [default](delta/util/isEqual.md#default)

***

## italic

Re-exports [italic](typesetting/formats.md#italic)

***

## KeyboardEventWithShortcut

Re-exports [KeyboardEventWithShortcut](modules/shortcutFromEvent.md#keyboardeventwithshortcut)

***

## line

Re-exports [line](typesetting/typeset.md#line-1)

***

## LineData

Re-exports [LineData](typesetting/typeset.md#linedata)

***

## LineIds

Re-exports [LineIds](document/Line.md#lineids-1)

***

## LineInfo

Re-exports [LineInfo](rendering/position.md#lineinfo)

***

## LineIterator

Re-exports [LineIterator](document/Line.md#lineiterator)

***

## LineOpIterator

Re-exports [LineOpIterator](document/LineOp.md#lineopiterator)

***

## LineRanges

Re-exports [LineRanges](document/Line.md#lineranges)

***

## lineReplace

Re-exports [lineReplace](modules/smartEntry.md#linereplace)

***

## lineReplacements

Re-exports [lineReplacements](modules/smartEntry.md#linereplacements)

***

## LineType

Re-exports [LineType](typesetting/typeset.md#linetype)

***

## link

Re-exports [link](typesetting/formats.md#link)

***

## linkReplace

Re-exports [linkReplace](modules/smartEntry.md#linkreplace)

***

## linkReplacements

Re-exports [linkReplacements](modules/smartEntry.md#linkreplacements)

***

## list

Re-exports [list](typesetting/lines.md#list)

***

## mark

Re-exports [mark](typesetting/formats.md#mark)

***

## markReplace

Re-exports [markReplace](modules/smartEntry.md#markreplace)

***

## markReplacements

Re-exports [markReplacements](modules/smartEntry.md#markreplacements)

***

## Module

Re-exports [Module](Editor.md#module)

***

## ModuleInitializer

Re-exports [ModuleInitializer](Editor.md#moduleinitializer)

***

## ModuleInitializers

Re-exports [ModuleInitializers](Editor.md#moduleinitializers)

***

## Modules

Re-exports [Modules](Editor.md#modules-2)

***

## MultiLineRenderer

Re-exports [MultiLineRenderer](typesetting/typeset.md#multilinerenderer)

***

## normalizeRange

Re-exports [normalizeRange](document/EditorRange.md#normalizerange)

***

## OpIterator

Re-exports [OpIterator](delta/Op.md#opiterator)

***

## options

Re-exports [options](rendering/vdom.md#options)

***

## Options

Re-exports [Options](modules/history.md#options-1)

***

## paragraph

Re-exports [paragraph](typesetting/lines.md#paragraph)

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

## patch

Re-exports [patch](rendering/vdom.md#patch)

***

## placeholder

Re-exports [placeholder](modules/placeholder.md#placeholder)

***

## Props

Re-exports [Props](rendering/vdom.md#props)

***

## React

Re-exports [React](rendering/vdom.md#react)

***

## Readable

Re-exports [Readable](stores.md#readable)

***

## recycleNode

Re-exports [recycleNode](rendering/vdom.md#recyclenode)

***

## render

Re-exports [render](rendering/rendering.md#render)

***

## renderChanges

Re-exports [renderChanges](rendering/rendering.md#renderchanges)

***

## renderCombined

Re-exports [renderCombined](rendering/rendering.md#rendercombined)

***

## renderDoc

Re-exports [renderDoc](rendering/rendering.md#renderdoc)

***

## Renderer

Re-exports [Renderer](typesetting/typeset.md#renderer)

***

## renderInline

Re-exports [renderInline](rendering/rendering.md#renderinline)

***

## renderLine

Re-exports [renderLine](rendering/rendering.md#renderline)

***

## renderMultiLine

Re-exports [renderMultiLine](rendering/rendering.md#rendermultiline)

***

## renderSingleLine

Re-exports [renderSingleLine](rendering/rendering.md#rendersingleline)

***

## RenderWhat

Re-exports [RenderWhat](modules/rendering-2.md#renderwhat)

***

## Replacement

Re-exports [Replacement](modules/smartEntry.md#replacement)

***

## rootStore

Re-exports [rootStore](stores.md#rootstore)

***

## selectionStore

Re-exports [selectionStore](stores.md#selectionstore)

***

## setLineNodesRanges

Re-exports [setLineNodesRanges](rendering/rendering.md#setlinenodesranges)

***

## setSelection

Re-exports [setSelection](rendering/selection.md#setselection)

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

## Shortcuts

Re-exports [Shortcuts](Editor.md#shortcuts-2)

***

## ShouldCombine

Re-exports [ShouldCombine](typesetting/typeset.md#shouldcombine-1)

***

## smartEntry

Re-exports [smartEntry](modules/smartEntry.md#smartentry)

***

## smartQuotes

Re-exports [smartQuotes](modules/smartQuotes.md#smartquotes)

***

## Source

Re-exports [Source](Source.md#source)

***

## SourceString

Re-exports [SourceString](Source.md#sourcestring)

***

## StackEntry

Re-exports [StackEntry](modules/history.md#stackentry)

***

## Subscriber

Re-exports [Subscriber](stores.md#subscriber)

***

## TextChange

Renames and re-exports [default](document/TextChange.md#default)

***

## TextDocument

Renames and re-exports [default](document/TextDocument.md#default)

***

## textNodeLength

Re-exports [textNodeLength](rendering/position.md#textnodelength)

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

## TypeMap

Re-exports [TypeMap](typesetting/typeset.md#typemap)

***

## Types

Re-exports [Types](typesetting/typeset.md#types)

***

## Typeset

Re-exports [Typeset](typesetting/typeset.md#typeset)

***

## TypesetTypes

Re-exports [TypesetTypes](typesetting/typeset.md#typesettypes)

***

## underline

Re-exports [underline](typesetting/formats.md#underline)

***

## undoStack

Re-exports [undoStack](modules/history.md#undostack-1)

***

## UndoStack

Re-exports [UndoStack](modules/history.md#undostack)

***

## Unsubscriber

Re-exports [Unsubscriber](stores.md#unsubscriber)

***

## VChild

Re-exports [VChild](rendering/vdom.md#vchild)

***

## virtualRendering

Re-exports [virtualRendering](modules/virtualRendering.md#virtualrendering)

***

## VirtualRenderWhat

Re-exports [VirtualRenderWhat](modules/virtualRendering.md#virtualrenderwhat)

***

## VNode

Re-exports [VNode](rendering/vdom.md#vnode)
