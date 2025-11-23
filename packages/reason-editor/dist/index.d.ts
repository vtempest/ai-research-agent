import { default as diff } from 'fast-diff';

/**
 * Store for the active formatting attributes.
 */
export declare function activeStore(editorStore: Readable<Editor>): Readable<AttributeMap>;

export declare function addShortcutsToEvent(event: KeyboardEventWithShortcut): KeyboardEventWithShortcut;

export declare function applyDecorations(vnode: VNode, attributes: AttributeMap | undefined, defaultClasses?: string[]): VNode;

/**
 * A svelte action to set the root for your Editor to an element.
 * Usage: use:asRoot={editor}
 * @param root The root element.
 * @param editor The editor instance.
 */
export declare function asRoot(root: HTMLElement, editor: Editor): {
    update: (newEditor: Editor) => void;
    destroy: () => void;
};

/**
 * Map of formatting attributes.
 */
export declare interface AttributeMap {
    [key: string]: any;
}

export declare namespace AttributeMap {
    /**
     * Composes two attribute maps.
     */
    export function compose(a?: AttributeMap, b?: AttributeMap, keepNull?: boolean): AttributeMap | undefined;
    /**
     * Calculates the difference between two attribute maps.
     */
    export function diff(a?: AttributeMap, b?: AttributeMap): AttributeMap | undefined;
    /**
     * Inverts an attribute map against a base map.
     */
    export function invert(attr?: AttributeMap, base?: AttributeMap): AttributeMap;
    /**
     * Transforms an attribute map against another.
     */
    export function transform(a: AttributeMap | undefined, b: AttributeMap | undefined, priority?: boolean): AttributeMap | undefined;
}

/**
 * A basic DOM type used in Typewriter views, either a line, format, or embed.
 */
export declare interface BasicType {
    name: string;
    selector: string;
    styleSelector?: string;
    fromDom?: FromDom | false;
    commands?: (editor: Editor) => Commands | Function;
    shortcuts?: Shortcuts | string;
    render?: Renderer;
}

export declare const BLOCK_ELEMENTS = "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video";

export declare const blockquote: LineType;

export declare const bold: FormatType;

export declare const br: EmbedType;

/**
 * Removes invalid characters and normalizes line endings.
 */
export declare function cleanText(delta: Delta): void;

export declare function cloneDeep(value: any): any;

export declare const code: FormatType;

export declare const codeblock: LineType;

export declare type Combined = CombinedEntry[];

declare interface CombinedData {
    combined: Combined;
    byKey: Record<string, CombinedEntry>;
}

export declare type CombinedEntry = Line | Line[];

/**
 * Joins multi-lines into arrays. Memoize the results.
 */
export declare function combineLines(editor: Editor, lines: Line[]): CombinedData;

export declare interface Commands {
    [name: string]: (...args: any[]) => any;
}

export declare function copy(editor: Editor, options?: CopyOptions): {
    commands: {
        getCopy: (selection?: EditorRange) => {
            text: string;
            html: string;
        };
    };
    init(): void;
    destroy(): void;
};

export declare interface CopyData {
    text?: string;
    html?: string;
    selection?: EditorRange | null;
}

export declare interface CopyOptions {
    copyPlainText?: boolean;
    copyHTML?: boolean;
}

export declare class DecorateEvent extends Event {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    constructor(type: string, init: DecorateEventInit);
}

export declare interface DecorateEventInit extends EventInit {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
}

export declare interface Decorations {
    class?: string;
    style?: string;
    [attributeName: string]: any;
}

export declare function decorations(editor: Editor): DecorationsModule;

export declare interface DecorationsModule {
    readonly old: TextDocument;
    readonly doc: TextDocument;
    getDecorator: (name: string) => Decorator;
    removeDecorations: (name: string) => boolean;
    clearDecorations: () => void;
    gatherDecorations: (change?: TextChange | undefined, changedLines?: Line[] | undefined) => void;
    init(): void;
    destroy(): void;
}

export declare class Decorator {
    change: TextChange;
    private _name;
    private _doc;
    private _decoration;
    private _apply;
    private _remove;
    constructor(name: string, doc: TextDocument, decoration: Delta | undefined, apply: (name: string, updates: Delta) => void, remove: (name: string) => void);
    hasDecorations(): boolean;
    getDecoration(): Delta;
    apply(): void;
    remove(): void;
    clear(range?: EditorRange): this;
    clearLines(lines: Line[]): this;
    clearLine(value: number | string | Line): this;
    invert(range?: EditorRange): Delta;
    decorateText(range: EditorRange, decoration?: Decorations): this;
    decorateLine(range: EditorRange | number, decoration?: Decorations): this;
    insertDecoration(at: number, decoration?: Decorations): this;
}

export declare const defaultHandlers: (typeof lineReplace)[];

export declare const defaultModules: {
    keyboard: typeof keyboard;
    input: typeof input;
    copy: typeof copy;
    paste: typeof paste;
    history: (editor: Editor) => {
        options: Options;
        hasUndo: () => boolean;
        hasRedo: () => boolean;
        undo: () => void;
        redo: () => void;
        cutoffHistory: () => void;
        clearHistory: () => void;
        setStack: (value: UndoStack) => void;
        getStack: () => UndoStack;
        getActive(): {
            undo: boolean;
            redo: boolean;
        };
        commands: {
            undo: () => void;
            redo: () => void;
        };
        shortcuts: {
            'win:Ctrl+Z': string;
            'mac:Cmd+Z': string;
            'win:Ctrl+Y': string;
            'mac:Cmd+Shift+Z': string;
        };
        init(): void;
        destroy(): void;
    };
    decorations: typeof decorations;
    rendering: typeof rendering;
    selection: typeof selection;
};

export declare const defaultTypes: TypesetTypes;

/**
 * Represents a Delta, a list of operations describing a change or document.
 */
export declare class Delta {
    static Op: typeof Op;
    static AttributeMap: typeof AttributeMap;
    ops: Op[];
    /**
     * Creates a new Delta.
     * @param ops List of operations.
     */
    constructor(ops?: Op[] | {
        ops: Op[];
    });
    /**
     * Inserts text or content.
     * @param arg Text or content to insert.
     * @param attributes Formatting attributes.
     */
    insert(arg: string | Record<string, any>, attributes?: AttributeMap | null): this;
    /**
     * Deletes content.
     * @param length Number of characters to delete.
     */
    delete(length: number): this;
    /**
     * Retains content (keeps it unchanged).
     * @param length Number of characters to retain.
     * @param attributes Formatting attributes to apply.
     */
    retain(length: number, attributes?: AttributeMap | null): this;
    /**
     * Pushes an operation to the delta.
     * @param newOp The operation to push.
     */
    push(newOp: Op): this;
    /**
     * Removes trailing retain operations.
     */
    chop(): this;
    /**
     * Filters operations.
     */
    filter(predicate: (op: Op, index: number) => boolean): Op[];
    /**
     * Iterates over operations.
     */
    forEach(predicate: (op: Op, index: number) => void): void;
    /**
     * Maps operations to a new array.
     */
    map<T>(predicate: (op: Op, index: number) => T): T[];
    /**
     * Partitions operations into two arrays.
     */
    partition(predicate: (op: Op) => boolean): [Op[], Op[]];
    /**
     * Reduces operations to a value.
     */
    reduce<T>(predicate: (accum: T, curr: Op, index: number) => T, initialValue: T): T;
    /**
     * Calculates the change in length of the document.
     */
    changeLength(): number;
    /**
     * Calculates the length of the delta.
     */
    length(): number;
    /**
     * Returns a slice of the delta.
     */
    slice(start?: number, end?: number): Delta;
    /**
     * Composes this delta with another delta.
     */
    compose(other: Delta, discardNull?: boolean): Delta;
    /**
     * Concatenates this delta with another delta.
     */
    concat(other: Delta): Delta;
    /**
     * Calculates the difference between this delta and another.
     */
    diff(other: Delta, cursor?: any): Delta;
    /**
     * Iterates over each line in the delta.
     */
    eachLine(predicate: (line: Delta, attributes: AttributeMap, index: number) => boolean | void, newline?: string): void;
    /**
     * Inverts the delta against a base delta.
     */
    invert(base: Delta): Delta;
    transform(index: number, priority?: boolean): number;
    transform(other: Delta, priority?: boolean): Delta;
    /**
     * Transforms an index against this delta.
     */
    transformPosition(index: number, priority?: boolean): number;
}

/**
 * Creates a delta from a DOM element.
 */
export declare function deltaFromDom(editor: Editor, options?: FromDomOptions): Delta;

/**
 * Creates a delta from an HTML string.
 */
export declare function deltaFromHTML(editor: Editor, html: string, options?: DeltaFromHTMLOptions): Delta;

/**
 * Options for converting HTML to Delta.
 */
export declare interface DeltaFromHTMLOptions {
    possiblePartial?: boolean;
    collapseWhitespace?: boolean;
}

export declare function deltaToText(delta: Delta): string;

/**
 * Creates a derived store from the editor store.
 * @param editorStore The base editor store.
 * @param defaultValue The default value.
 * @param changeEvents The events to listen for changes.
 * @param update The function to calculate the new value.
 * @param checkEquality Whether to check for equality before updating.
 */
export declare function derivedEditorStore<T>(editorStore: Readable<Editor>, defaultValue: T, changeEvents: string[], update: (editor: Editor) => T, checkEquality?: boolean): Readable<T>;

export { diff }

export declare const dl: LineType;

/**
 * Creates a document from a DOM element.
 */
export declare function docFromDom(editor: Editor, root: HTMLElement): TextDocument;

/**
 * Creates a document from an HTML string.
 */
export declare function docFromHTML(editor: Editor, html: string, selection?: EditorRange | null): TextDocument;

/**
 * Store for the document content.
 */
export declare function docStore(editorStore: Readable<Editor>): Readable<TextDocument>;

/**
 * Converts a document to an HTML string.
 */
export declare function docToHTML(editor: Editor, doc: TextDocument): string;

/**
 * The main Editor class.
 * Handles document state, rendering, and user interaction.
 */
export declare class Editor extends EventDispatcher<EditorEventMap> {
    identifier: any;
    typeset: Typeset;
    doc: TextDocument;
    activeFormats: AttributeMap;
    commands: Commands;
    shortcuts: Shortcuts;
    modules: Modules;
    catchErrors: boolean;
    throwOnError: boolean;
    _root: HTMLElement;
    private _modules;
    private _enabled;
    constructor(options?: EditorOptions);
    get root(): HTMLElement;
    get enabled(): boolean;
    set enabled(value: boolean);
    get change(): EditorTextChange;
    setRoot(root: HTMLElement): this;
    /**
     * Updates the editor with a change or delta.
     * @param changeOrDelta The change or delta to apply.
     * @param source The source of the change (user or api).
     */
    update(changeOrDelta: TextChange | Delta, source?: SourceString): this;
    /**
     * Sets the editor document state.
     * @param docOrDelta The new document or delta.
     * @param source The source of the change.
     * @param change The text change that caused this update.
     * @param changedLines The lines that were changed.
     */
    set(docOrDelta: TextDocument | Delta, source?: SourceString, change?: TextChange, changedLines?: Line[]): this;
    /**
     * Returns the editor content as HTML.
     */
    getHTML(): string;
    /**
     * Sets the editor content from HTML.
     * @param html The HTML content.
     * @param selection The new selection range.
     * @param source The source of the change.
     */
    setHTML(html: string, selection?: EditorRange | null, source?: SourceString): this;
    /**
     * Returns the editor content as a Delta.
     */
    getDelta(): Delta;
    /**
     * Sets the editor content from a Delta.
     * @param delta The Delta content.
     * @param selection The new selection range.
     * @param source The source of the change.
     */
    setDelta(delta: Delta, selection?: EditorRange | null, source?: SourceString): this;
    /**
     * Returns the editor content as plain text.
     * @param range Optional range to get text from.
     */
    getText(range?: EditorRange): string;
    /**
     * Sets the editor content from plain text.
     * @param text The text content.
     * @param selection The new selection range.
     * @param source The source of the change.
     */
    setText(text: string, selection?: EditorRange | null, source?: SourceString): this;
    trimSelection(selection: EditorRange): EditorRange;
    /**
     * Returns the active formatting attributes at the current selection.
     */
    getActive(): AttributeMap;
    /**
     * Selects a range or position in the editor.
     * @param at The range or position to select.
     * @param source The source of the selection change.
     */
    select(at: EditorRange | number | null, source?: Source): this;
    /**
     * Inserts text or content at the current selection or a specific location.
     * @param insert The text or content to insert.
     * @param format Optional formatting attributes.
     * @param selection Optional selection to insert at.
     * @param options Optional insertion options.
     */
    insert(insert: string | object, format?: AttributeMap, selection?: EditorRange, options?: {
        dontFixNewline?: boolean;
    }): this;
    /**
     * Inserts a Delta content at the current selection.
     * @param content The Delta content to insert.
     * @param selection Optional selection to insert at.
     */
    insertContent(content: Delta, selection?: EditorRange): this;
    /**
     * Deletes content or characters.
     * @param directionOrSelection Direction (-1 or 1) or range to delete.
     * @param options Optional deletion options.
     */
    delete(directionOrSelection?: -1 | 1 | EditorRange, options?: {
        dontFixNewline?: boolean;
    }): this;
    /**
     * Formats text at the current selection.
     * @param format The format attributes or name.
     * @param selection Optional selection to format.
     */
    formatText(format: AttributeMap | string, selection?: EditorRange): this;
    /**
     * Toggles text format at the current selection.
     * @param format The format attributes or name.
     * @param selection Optional selection to format.
     */
    toggleTextFormat(format: AttributeMap | 'string', selection?: EditorRange): this;
    /**
     * Formats the line at the current selection.
     * @param format The format attributes or name.
     * @param selection Optional selection to format.
     */
    formatLine(format: AttributeMap | string, selection?: EditorRange | number | null): this;
    /**
     * Toggles line format at the current selection.
     * @param format The format attributes or name.
     * @param selection Optional selection to format.
     */
    toggleLineFormat(format: AttributeMap | string, selection?: EditorRange): this;
    /**
     * Indents the selected lines.
     */
    indent(): this;
    /**
     * Outdents the selected lines.
     */
    outdent(): this;
    /**
     * Removes formatting from the current selection.
     * @param selection Optional selection to remove format from.
     */
    removeFormat(selection?: EditorRange): this;
    /**
     * Gets the bounding rectangle for a range.
     * @param range The range to get bounds for.
     * @param relativeTo Optional element to calculate bounds relative to.
     * @param relativeInside Whether to calculate relative to the inside of the element (accounting for scroll).
     */
    getBounds(range: EditorRange | number, relativeTo?: Element, relativeInside?: boolean): DOMRect | undefined;
    /**
     * Gets all bounding rectangles for a range (e.g. for multi-line selections).
     * @param range The range to get bounds for.
     * @param relativeTo Optional element to calculate bounds relative to.
     * @param relativeInside Whether to calculate relative to the inside of the element.
     */
    getAllBounds(range: EditorRange | number, relativeTo?: Element, relativeInside?: boolean): DOMRect[] | undefined;
    /**
     * Gets the character index from a point (x, y).
     * @param x The x coordinate.
     * @param y The y coordinate.
     */
    getIndexFromPoint(x: number, y: number): number;
    /**
     * Renders the editor content.
     */
    render(): this;
    /**
     * Initializes the editor.
     */
    init(): void;
    /**
     * Destroys the editor and cleans up listeners.
     */
    destroy(): void;
}

/**
 * Event fired when the editor content changes.
 */
export declare class EditorChangeEvent extends Event {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    source: SourceString;
    constructor(type: string, init: EditorChangeEventInit);
    modify(delta: Delta): void;
}

export declare interface EditorChangeEventInit extends EventInit {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    source: SourceString;
}

export declare interface EditorEventMap {
    enabledchange: Event;
    root: Event;
    changing: EditorChangeEvent;
    change: EditorChangeEvent;
    changed: EditorChangeEvent;
    format: EditorFormatEvent;
    focus: FocusEvent;
    blur: FocusEvent;
    keydown: KeyboardEvent;
    mousedown: MouseEvent;
    mouseup: MouseEvent;
    click: MouseEvent;
    decorate: DecorateEvent;
    [name: string]: Event;
}

export declare class EditorFormatEvent extends Event {
    formats: AttributeMap;
    constructor(type: string, init: EditorFormatEventInit);
}

export declare interface EditorFormatEventInit extends EventInit {
    formats: AttributeMap;
}

/**
 * Options for initializing the Editor.
 */
export declare interface EditorOptions {
    identifier?: any;
    root?: HTMLElement | false;
    types?: TypesetTypes;
    doc?: TextDocument;
    modules?: ModuleInitializers;
    /**
     * Defaults to true. When true, the `modules` option will be patched on top of the default modules.
     * Disable this if you are providing all necessary modules in the `modules` option and want full control over module initialization order.
     */
    includeDefaultModules?: boolean;
    enabled?: boolean;
    text?: string;
    html?: string;
    dev?: boolean;
    throwOnError?: boolean;
}

/**
 * Represents a selection range in the editor [start, end].
 */
export declare type EditorRange = [number, number];

/**
 * Interface for the editor stores.
 */
export declare interface EditorStores {
    active: Readable<AttributeMap>;
    doc: Readable<TextDocument>;
    selection: Readable<EditorRange | null>;
    root: Readable<HTMLElement | undefined>;
    focus: Readable<boolean>;
    updateEditor(editor: Editor): void;
}

/**
 * Creates a set of stores for the editor.
 * @param editor The editor instance.
 */
export declare function editorStores(editor: Editor): EditorStores;

export declare interface EditorTextChange extends TextChange {
    apply(source?: SourceString): Editor;
}

/**
 * Defines an embed type.
 */
export declare function embed(type: EmbedType): EmbedType;

/**
 * Type definition for an embed (e.g. image, video).
 */
export declare interface EmbedType extends BasicType {
    noFill?: boolean;
}

/**
 * A class that dispatches events.
 */
export declare class EventDispatcher<T extends Record<string, any> = Record<string, Event>> {
    /**
     * Adds an event listener.
     */
    on<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    on(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    /**
     * Removes an event listener.
     */
    off<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    off(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    /**
     * Adds an event listener (alias for on).
     */
    addEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    addEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    /**
     * Removes an event listener (alias for off).
     */
    removeEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    /**
     * Dispatches an event.
     */
    dispatchEvent(event: Event, catchErrors?: boolean): void;
}

/**
 * Store for the focus state.
 */
export declare function focusStore(editorStore: Readable<Editor>): Readable<boolean>;

/**
 * Defines a format type.
 */
export declare function format(type: FormatType): FormatType;

/**
 * Options for formatting retrieval.
 */
export declare interface FormattingOptions {
    nameOnly?: boolean;
    allFormats?: boolean;
}

/**
 * Type definition for a format (e.g. bold, italic).
 */
export declare interface FormatType extends BasicType {
    greedy?: boolean;
}

export declare type FromDom = (node: HTMLElement) => any;

/**
 * Options for converting DOM to Delta.
 */
export declare interface FromDomOptions {
    root?: HTMLElement;
    startNode?: Node;
    endNode?: Node;
    offset?: number;
    possiblePartial?: boolean;
    includeIds?: boolean;
    collapseWhitespace?: boolean;
}

/**
 * Return a line or multi-line array from the top-level node.
 */
export declare function fromNode(editor: Editor, dom: HTMLElement): Line | Line[];

/**
 * Gets a bounding browser range for the given editor range.
 */
export declare function getBoudingBrowserRange(editor: Editor, range: EditorRange): Range;

/**
 * Get a browser range object for the given editor range tuple.
 */
export declare function getBrowserRange(editor: Editor, range: EditorRange): Range;

/**
 * Gets the ranges of lines that have changed.
 */
export declare function getChangedRanges(oldC: Combined, newC: Combined): LineRanges_2;

/**
 * Get the index the node starts at in the content.
 */
export declare function getIndexFromNode(editor: Editor, startNode: Node): number;

/**
 * Gets the document index from a DOM node and offset.
 */
export declare function getIndexFromNodeAndOffset(editor: Editor, node: Node, offset: number, current?: number | null): number;

/**
 * Gets the document index from a point (x, y).
 */
export declare function getIndexFromPoint(editor: Editor, x: number, y: number): number;

/**
 * Gets the line element at a specific index.
 */
export declare function getLineElementAt(editor: Editor, index: number): HTMLLineElement;

/**
 * Return the line that matches a point and true if the point comes after the midpoint of the line display.
 */
export declare function getLineInfoFromPoint(editor: Editor, y: number): LineInfo | undefined;

/**
 * Gets the end index of a line node.
 */
export declare function getLineNodeEnd(root: HTMLElement, node: Node): number;

/**
 * Gets the start index of a line node.
 */
export declare function getLineNodeStart(root: HTMLElement, node: Node): number;

/**
 * Gets the DOM node and offset for a document index.
 */
export declare function getNodeAndOffset(editor: Editor, index: number, direction: 0 | 1): NodeOffsetAndFrozen;

/**
 * Gets the length of a DOM node in editor characters.
 */
export declare function getNodeLength(editor: Editor, parentNode: Node): number;

/**
 * Get the browser nodes and offsets for the range (a tuple of indexes) of this view.
 */
export declare function getNodesForRange(editor: Editor, range: EditorRange): [Node | null, number, Node | null, number];

/**
 * Get the selection range from the current browser selection
 */
declare function getSelection_2(editor: Editor): EditorRange | null;
export { getSelection_2 as getSelection }

export declare interface H {
    <T, P extends Props | null | undefined, C extends VChild | VChild[]>(type: (props: P, children: C) => T, props?: P, ch?: C): T;
    (type: string, props?: Props | null, ch?: VChild | VChild[]): VNode;
}

/**
 * Hyperscript function to create VNodes.
 */
export declare const h: H;

export declare type Handler = (editor?: Editor, index?: number, prefix?: string, wholeText?: string) => void;

export declare function hasFormat(format: AttributeMap, attributes: AttributeMap): boolean;

export declare const header: LineType;

declare const history_2: (editor: Editor) => {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    getActive(): {
        undo: boolean;
        redo: boolean;
    };
    commands: {
        undo: () => void;
        redo: () => void;
    };
    shortcuts: {
        'win:Ctrl+Z': string;
        'mac:Cmd+Z': string;
        'win:Ctrl+Y': string;
        'mac:Cmd+Shift+Z': string;
    };
    init(): void;
    destroy(): void;
};
export { history_2 as history }

/**
 * Interface for the history module.
 */
export declare interface HistoryModule {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    destroy(): void;
}

export declare const hr: LineType;

/**
 * HTML element representing a line.
 */
export declare interface HTMLLineElement extends HTMLElement {
    key: string;
}

export declare const image: EmbedType;

/**
 * History is a view module for storing user changes and undoing/redoing those changes.
 *
 * Stores history for all user-generated changes. Like-changes will be combined until a selection or a delay timeout
 * cuts off the combining. E.g. if a user types "Hello" the 5 changes will be combined into one history entry. If
 * the user moves the cursor somewhere and then back to the end and types " World" the next 6 changes are combined
 * separately from the first 5 because selection changes add a cutoff history entries.
 *
 * The default options can be overridden by passing alternatives to history. To add a timeout to force a cutoff after
 * so many milliseconds set a delay like this:
 * ```js
 * const modules = {
 *   history: history({ delay: 4000 })
 * };
 * ```
 */
export declare function initHistory(initOptions?: Partial<Options>): (editor: Editor) => {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    getActive(): {
        undo: boolean;
        redo: boolean;
    };
    commands: {
        undo: () => void;
        redo: () => void;
    };
    shortcuts: {
        'win:Ctrl+Z': string;
        'mac:Cmd+Z': string;
        'win:Ctrl+Y': string;
        'mac:Cmd+Shift+Z': string;
    };
    init(): void;
    destroy(): void;
};

/**
 * Converts a delta to an HTML string (inline only).
 */
export declare function inlineToHTML(editor: Editor, delta: Delta): string;

/**
 * Input module handles user input events (typing, composition, etc.).
 * @param editor The editor instance.
 */
export declare function input(editor: Editor): {
    allowComposition(value?: boolean): void;
    init(): void;
    destroy(): void;
};

export declare function intersect(value: object, other: object): object;

/**
 * Determines if a BR tag in the editable area is part of the document or a doorstop at the end of a line.
 */
export declare function isBRPlaceholder(editor: Editor, node: Node): boolean;

export declare function isEqual(value: any, other: any, options?: IsEqualOptions): boolean;

declare interface IsEqualOptions {
    shallow?: boolean;
    partial?: boolean;
    excludeProps?: Set<string>;
}

export declare const italic: FormatType;

/**
 * Keyboard module handles keyboard events (enter, backspace, delete, tab, etc.).
 * @param editor The editor instance.
 */
export declare function keyboard(editor: Editor): {
    init(): void;
    destroy(): void;
};

export declare interface KeyboardEventWithShortcut extends KeyboardEvent {
    shortcut?: string;
    osShortcut?: string;
    modShortcut?: string;
}

/**
 * Represents a line in the document.
 */
export declare interface Line {
    id: string;
    attributes: AttributeMap;
    content: Delta;
    length: number;
}

export declare namespace Line {
    /**
     * Creates a new LineIterator.
     */
    export function iterator(lines: Line[], lineIds?: LineIds): LineIterator;
    /**
     * Creates a map of line IDs to lines.
     */
    export function linesToLineIds(lines: Line[]): Map<any, any>;
    export function length(line: Line): number;
    export function getId(line: Line): string;
    /**
     * Checks if two lines are equal.
     */
    export function equal(value: Line, other: Line): boolean;
    /**
     * Creates lines from a Delta.
     */
    export function fromDelta(delta: Delta, existing?: LineIds): Line[];
    /**
     * Converts lines to a Delta.
     */
    export function toDelta(lines: Line[]): Delta;
    /**
     * Creates a new Line.
     */
    export function create(content?: Delta, attributes?: AttributeMap, id?: string | LineIds): Line;
    /**
     * Creates a new Line from an existing one or defaults.
     */
    export function createFrom(line?: Line, content?: Delta, lineIds?: LineIds): Line;
    /**
     * Gets ranges for a list of lines.
     */
    export function getLineRanges(lines: Line[]): LineRanges;
    /**
     * Creates a unique line ID.
     */
    export function createId(existing?: LineIds): string;
}

/**
 * Defines a line type.
 */
export declare function line(type: LineType): LineType;

export declare type LineData = [attributes: AttributeMap, children: VChild[], id: string];

export declare type LineIds = Map<string, Line>;

/**
 * Information about a line at a specific point.
 */
export declare interface LineInfo {
    line: Line;
    element: HTMLLineElement;
    rect: DOMRect;
    belowMid: boolean;
}

/**
 * Iterator for lines.
 */
export declare class LineIterator {
    lines: Line[];
    index: number;
    offset: number;
    lineIds: LineIds;
    constructor(lines: Line[], lineIds?: LineIds);
    hasNext(): boolean;
    next(length?: number): Line;
    peek(): Line;
    peekLength(): number;
    rest(): Line[];
}

export declare namespace LineOp {
    /**
     * Creates a new LineOpIterator.
     */
    export function iterator(lines: Line[], lineIds?: LineIds): LineOpIterator;
    export function length(op: Op): number;
}

/**
 * Iterator for line operations (ops including newlines).
 */
export declare class LineOpIterator {
    lineIterator: LineIterator;
    opIterator: OpIterator;
    constructor(lines: Line[], lineIds?: LineIds);
    hasNext(): boolean;
    next(length?: number): Op;
    nextLine(): Line;
    peek(): Op;
    peekLine(): Line;
    peekLength(): number;
    peekLineLength(): number;
    peekType(): string;
    restCurrentLine(): Op[];
    restLines(): Line[];
}

export declare type LineRanges = Map<Line, any>;

declare type LineRanges_2 = [EditorRange, EditorRange];

/**
 * Allow text representations to format a line
 */
export declare function lineReplace(editor: Editor, index: number, prefix: string): boolean;

/**
 * A list of [ RegExp, Function ] tuples to convert text into a formatted line with the attributes returned by the
 * function. The function's argument will be the captured text from the regular expression.
 */
export declare const lineReplacements: Replacement[];

/**
 * Type definition for a line (e.g. paragraph, heading).
 */
export declare interface LineType extends BasicType {
    indentable?: boolean;
    child?: boolean;
    defaultFollows?: boolean;
    frozen?: boolean;
    contained?: boolean;
    onEnter?: (editor: Editor) => void;
    onTab?: (editor: Editor, shiftKey: boolean) => void;
    nextLineAttributes?: (attributes: AttributeMap) => AttributeMap;
    onEmptyEnter?: (editor: Editor, line: Line) => boolean;
    render?: Renderer;
    renderMultiple?: MultiLineRenderer;
    shouldCombine?: ShouldCombine;
}

export declare const link: FormatType;

export declare function linkReplace(editor: Editor, index: number, prefix: string): boolean;

export declare const linkReplacements: Replacement[];

export declare const list: LineType;

export declare const mark: FormatType;

export declare function markReplace(editor: Editor, index: number, prefix: string, wholeText: string): boolean;

/**
 * A list of [ RegExp, Function ] tuples to convert text into formatted text with the attributes returned by the
 * function. The function's argument will be the captured text from the regular expression.
 */
export declare const markReplacements: Replacement[];

/**
 * Interface for an editor module.
 */
export declare interface Module {
    init?: () => void;
    destroy?: () => void;
    shortcuts?: Shortcuts;
    commands?: Commands;
    getActive?: () => AttributeMap;
    trimSelection?: (range: EditorRange) => EditorRange;
    [name: string]: any;
}

export declare interface ModuleInitializer {
    (editor: Editor): Module;
}

export declare interface ModuleInitializers {
    [name: string]: ModuleInitializer;
}

export declare interface Modules {
    [name: string]: Module;
}

export declare type MultiLineRenderer = (lines: LineData[], editor: Editor, forHTML?: boolean) => VNode;

declare type Node_2 = Element | Text;

declare type NodeOffsetAndFrozen = [Node | null, number, boolean?];

/**
 * Normalizes a range so that start <= end.
 * @param range The range to normalize.
 */
export declare function normalizeRange(range: EditorRange): EditorRange;

/**
 * Represents an operation in a Delta.
 */
export declare interface Op {
    insert?: string | Record<string, any>;
    delete?: number;
    retain?: number;
    attributes?: AttributeMap;
}

export declare namespace Op {
    /**
     * Creates a new OpIterator.
     */
    export function iterator(ops: Op[]): OpIterator;
    /**
     * Calculates the length of an operation.
     */
    export function length(op: Op): number;
}

/**
 * Iterator for operations.
 */
export declare class OpIterator {
    ops: Op[];
    index: number;
    offset: number;
    constructor(ops: Op[]);
    hasNext(): boolean;
    next(length?: number): Op;
    peek(): Op;
    peekLength(): number;
    peekType(): string;
    rest(): Op[];
}

/**
 * Options for the history module.
 */
export declare interface Options {
    delay: number;
    maxStack: number;
    unrecordedSources: Set<SourceString>;
}

export declare const options: {
    renderKeys: boolean;
};

export declare const paragraph: LineType;

export declare function paste(editor: Editor, options?: PasteModuleOptions): {
    commands: {
        paste: ({ selection, text, html }: PasteOptions) => void;
    };
    init(): void;
    destroy(): void;
};

export declare class PasteEvent extends Event {
    delta: Delta;
    html?: string;
    text?: string;
    constructor(type: string, init: PasteEventInit);
}

export declare interface PasteEventInit extends EventInit {
    delta: Delta;
    html?: string;
    text?: string;
}

export declare interface PasteModuleOptions {
    htmlParser?: (editor: Editor, html: string) => Delta;
    allowHTMLPaste?: boolean;
}

export declare interface PasteOptions {
    text?: string;
    html?: string;
    selection?: EditorRange | null;
}

/**
 * Patches the DOM to match the VDOM.
 */
export declare const patch: (dom: Node_2, vdom: VNode | VNode[], oldKids?: ChildNode[]) => Node_2;

/**
 * Set placeholder text in the editable area when there is no content. Then add the css:
 *
 * ```css
 * .placeholder {
 *   position: relative;
 * }
 * .placeholder::before {
 *   content: attr(data-placeholder);
 *   position: absolute;
 *   left: 0;
 *   right: 0;
 *   opacity: 0.5;
 * }
 * ```
 */
export declare function placeholder(placeholder: string | Function, options?: PlaceholderOptions): (editor: Editor) => {
    destroy(): void;
};

declare interface PlaceholderOptions {
    keepAttribute?: boolean;
}

/**
 * Properties for VNodes.
 */
export declare interface Props {
    [key: string]: any;
}

export declare const React: {
    createElement: H;
};

/**
 * A readable store interface.
 */
export declare interface Readable<T> {
    /**
     * Return the current value.
     */
    get(): T;
    /**
     * Subscribe to changes with a callback. Returns an unsubscribe function.
     */
    subscribe(callback: Subscriber<T>): Unsubscriber;
}

/**
 * Recycles a DOM node into VNodes.
 */
export declare const recycleNode: (dom: Node_2) => string | VNode;

/**
 * Renders the document.
 */
export declare function render(editor: Editor, doc: TextDocument): void;

/**
 * Renders changes between two documents.
 */
export declare function renderChanges(editor: Editor, oldDoc: TextDocument, newDoc: TextDocument): void;

/**
 * Renders combined lines to VNodes.
 */
export declare function renderCombined(editor: Editor, combined: Combined, forHTML?: boolean): VNode[];

/**
 * Renders a document to VNodes.
 */
export declare function renderDoc(editor: Editor, doc: TextDocument, forHTML?: boolean): VNode[];

export declare type Renderer = (attributes: AttributeMap, children: VChild[], line: Line, editor: Editor, forHTML?: boolean) => VNode;

/**
 * Rendering module handles document rendering.
 * @param editor The editor instance.
 */
export declare function rendering(editor: Editor): {
    render: (what?: RenderWhat) => void;
    destroy(): void;
};

/**
 * Renders inline content of a line.
 */
export declare function renderInline(editor: Editor, line: Line, forHTML?: boolean): VChild[];

/**
 * Renders a line or multi-line entry.
 */
export declare function renderLine(editor: Editor, line: CombinedEntry, forHTML?: boolean): VNode;

/**
 * Renders multiple lines.
 */
export declare function renderMultiLine(editor: Editor, lines: Line[], forHTML?: boolean): VNode;

/**
 * Renders a single line.
 */
export declare function renderSingleLine(editor: Editor, line: Line, forHTML?: boolean): VNode;

/**
 * Options for rendering.
 */
export declare interface RenderWhat {
    old?: TextDocument;
    doc?: TextDocument;
}

export declare type Replacement = [RegExp, (captured: string, attr: AttributeMap) => AttributeMap];

/**
 * Store for the editor root element.
 */
export declare function rootStore(editorStore: Readable<Editor>): Readable<HTMLElement>;

/**
 * Selection module handles selection changes and rendering.
 * @param editor The editor instance.
 */
export declare function selection(editor: Editor): {
    pause: () => void;
    resume: () => void;
    renderSelection: () => void;
    init(): void;
    destroy(): void;
};

/**
 * Store for the current selection.
 */
export declare function selectionStore(editorStore: Readable<Editor>): Readable<EditorRange>;

/**
 * Sets the ranges for line nodes.
 */
export declare function setLineNodesRanges(editor: Editor): void;

/**
 * Set the current browser selection to the given selection range
 */
export declare function setSelection(editor: Editor, range: EditorRange | null): void;

export declare class ShortcutEvent extends KeyboardEvent {
    readonly shortcut: string;
    readonly osShortcut: string;
    readonly modShortcut: string;
    constructor(type: string, init?: ShortcutEventInit);
    static fromKeyboardEvent(event: KeyboardEvent): ShortcutEvent;
}

export declare interface ShortcutEventInit extends KeyboardEventInit {
    shortcut?: string;
}

/**
 * Returns the textual representation of a shortcut given a keyboard event. Examples of shortcuts:
 * Cmd+L
 * Cmd+Shift+M
 * Ctrl+O
 * Backspace
 * T
 * Right
 * Shift+Down
 * Shift+F1
 * Space
 */
export declare function shortcutFromEvent(event: KeyboardEvent): string;

/**
 * Map of keyboard shortcuts to command names.
 */
export declare interface Shortcuts {
    [shortcut: string]: string;
}

export declare type ShouldCombine = (prev: AttributeMap, next: AttributeMap) => boolean;

export declare function smartEntry(handlers?: Handler[]): (editor: Editor) => {
    destroy(): void;
};

/**
 * Replaces regular quotes with smart quotes as they are typed. Also affects pasted content.
 * Uses the text-changing event to prevent the original change and replace it with the new one. This makes the smart-
 * quotes act more seemlessly and includes them as part of regular text undo/redo instead of breaking it like the smart-
 * entry conversions do.
 */
export declare function smartQuotes(editor: Editor): {
    destroy(): void;
};

/**
 * Enum representing the source of a change.
 */
export declare enum Source {
    api = "api",
    user = "user",
    history = "history",
    input = "input",
    paste = "paste"
}

export declare type SourceString = Source | string;

/**
 * Represents a single undo/redo entry.
 */
export declare interface StackEntry {
    redo: TextChange;
    undo: TextChange;
}

/** Callback to inform of a value updates. */
export declare type Subscriber<T> = (value: T) => void;

/**
 * Represents a change to be applied to a TextDocument.
 * Builder pattern for creating complex changes.
 */
export declare class TextChange {
    private _pos;
    doc: TextDocument | null;
    delta: Delta;
    selection?: EditorRange | null;
    activeFormats?: AttributeMap;
    /**
     * Creates a new TextChange.
     * @param doc The document to apply change to.
     * @param delta The delta representing the change.
     * @param selection The new selection.
     * @param activeFormats Active formatting attributes.
     */
    constructor(doc: TextDocument | null, delta?: Delta, selection?: EditorRange | null, activeFormats?: AttributeMap);
    /**
     * Whether the content has changed.
     */
    get contentChanged(): boolean;
    /**
     * Whether the selection has changed.
     */
    get selectionChanged(): boolean;
    /**
     * Applies the change. Must be overridden.
     */
    apply(): void;
    /**
     * Sets the delta for this change.
     * @param delta The new delta.
     */
    setDelta(delta: Delta): this;
    /**
     * Sets the active formats.
     * @param activeFormats The active formats.
     */
    setActiveFormats(activeFormats: AttributeMap): this;
    /**
     * Sets the new selection.
     * @param at The new selection range or position.
     */
    select(at: EditorRange | number | null): this;
    /**
     * Deletes a range of text.
     * @param range The range to delete.
     * @param options Deletion options.
     */
    delete(range: EditorRange | null, options?: {
        dontFixNewline?: boolean;
    }): this;
    /**
     * Inserts text or content.
     * @param at Position to insert at.
     * @param insert Text or content to insert.
     * @param format Formatting attributes.
     * @param options Insertion options.
     */
    insert(at: number, insert: string | object, format?: AttributeMap, options?: {
        dontFixNewline?: boolean;
    }): this;
    /**
     * Inserts a Delta content.
     * @param at Position to insert at.
     * @param content The Delta content.
     */
    insertContent(at: number, content: Delta): this;
    /**
     * Formats text in a range.
     * @param range The range to format.
     * @param format The format attributes.
     */
    formatText(range: EditorRange, format?: AttributeMap): this;
    /**
     * Toggles text format in a range.
     * @param range The range to format.
     * @param format The format attributes.
     */
    toggleTextFormat(range: EditorRange, format: AttributeMap): this;
    /**
     * Formats lines in a range.
     * @param range The range covering lines to format.
     * @param format The format attributes.
     * @param decoration Whether this is a decoration (internal use).
     */
    formatLine(range: EditorRange | number, format: AttributeMap, decoration?: boolean): this;
    /**
     * Toggles line format in a range.
     * @param range The range covering lines to format.
     * @param format The format attributes.
     */
    toggleLineFormat(range: EditorRange | number, format: AttributeMap): this;
    /**
     * Removes formatting in a range.
     * @param range The range to remove format from.
     */
    removeFormat(range: EditorRange): this;
    /**
     * Transforms this change against another change.
     * @param change The other change.
     * @param priority Whether this change has priority.
     */
    transform(change: TextChange, priority?: boolean): TextChange;
    /**
     * Transforms a selection against this change.
     * @param selection The selection to transform.
     * @param priority Whether the selection has priority.
     */
    transformSelection(selection: EditorRange | null, priority?: boolean): EditorRange | null;
    /**
     * Transforms this change against a delta or change.
     * @param delta The delta or change to transform against.
     * @param priority Whether this change has priority.
     */
    transformAgainst(delta: TextChange | Delta, priority?: boolean): TextChange;
    /**
     * Checks if this change is for a specific document.
     * @param doc The document to check.
     */
    isFor(doc: TextDocument): boolean;
    /**
     * Clones this TextChange.
     */
    clone(): TextChange;
    private compose;
    private normalizePoint;
    private getFormatAt;
}

/**
 * Represents a text document with lines and selection.
 * Immutable structure that returns new instances on change.
 */
export declare class TextDocument {
    private _ranges;
    byId: LineIds;
    lines: Line[];
    length: number;
    selection: EditorRange | null;
    /**
     * Creates a new TextDocument.
     * @param linesOrDocOrDelta Initial content (lines, another doc, or delta).
     * @param selection Initial selection.
     */
    constructor(linesOrDocOrDelta?: TextDocument | Line[] | Delta, selection?: EditorRange | null);
    /**
     * Creates a new TextChange for this document.
     */
    get change(): TextChange;
    /**
     * Gets the text content of the document or a range.
     * @param range Optional range to get text from.
     */
    getText(range?: EditorRange): string;
    /**
     * Gets a line by its ID.
     * @param id The line ID.
     */
    getLineBy(id: string): Line;
    /**
     * Gets the line at a specific character index.
     * @param at The character index.
     */
    getLineAt(at: number): Line;
    /**
     * Gets lines within a range.
     * @param atOrRange The range or position.
     * @param encompassed Whether to include only lines fully encompassed by the range.
     */
    getLinesAt(atOrRange: number | EditorRange, encompassed?: boolean): Line[];
    /**
     * Gets the range of a line.
     * @param at The line, its ID, or a position within it.
     */
    getLineRange(at: number | string | Line): EditorRange;
    /**
     * Gets ranges for multiple lines.
     * @param at Optional range to get line ranges for.
     */
    getLineRanges(at?: number | EditorRange): any[];
    /**
     * Gets the line format at a position or range.
     * @param at The position or range.
     * @param options Formatting options.
     */
    getLineFormat(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    /**
     * Gets the text format at a position or range.
     * @param at The position or range.
     * @param options Formatting options.
     */
    getTextFormat(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    /**
     * Gets both text and line formats at a position or range.
     * @param at The position or range.
     * @param options Formatting options.
     */
    getFormats(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    /**
     * Returns a slice of the document as a Delta.
     * @param start Start index.
     * @param end End index.
     */
    slice(start?: number, end?: number): Delta;
    /**
     * Applies a change or delta to the document, returning a new TextDocument.
     * @param change The change or delta to apply.
     * @param selection Optional new selection.
     * @param throwOnError Whether to throw on error.
     */
    apply(change: Delta | TextChange, selection?: EditorRange | null, throwOnError?: boolean): TextDocument;
    /**
     * Creates a new document replacing the current one with a delta.
     * @param delta The new content delta.
     * @param selection The new selection.
     */
    replace(delta?: Delta, selection?: EditorRange | null): TextDocument;
    /**
     * Converts the document to a Delta.
     */
    toDelta(): Delta;
    /**
     * Checks if this document is equal to another.
     * @param other The other document.
     * @param options Comparison options.
     */
    equals(other: TextDocument, options?: {
        contentOnly?: boolean;
    }): boolean;
    toJSON(): Delta;
    toString(): string;
}

/**
 * Gets the length of a text node.
 */
export declare function textNodeLength(lines: Types, node: Node): number;

export declare function textReplace(editor: Editor, index: number, prefix: string): boolean;

export declare type TextReplacement = [RegExp, (captured: string) => string];

/**
 * A list of [ RegExp, Function ] tuples to convert text into another string of text which is returned by the function.
 * The function's argument will be the captured text from the regular expression.
 */
export declare const textReplacements: TextReplacement[];

/**
 * Transforms the history stack against a delta or change.
 * @param stack The stack to transform.
 * @param delta The delta or change to transform against.
 */
export declare function transformHistoryStack(stack: UndoStack, delta: TextChange | Delta): void;

export declare interface TypeMap<T extends BasicType = BasicType> {
    [name: string]: T;
}

/**
 * A type store to hold types and make it easy to manage them.
 */
export declare class Types<T extends BasicType = BasicType> {
    list: T[];
    selector: string;
    types: TypeMap<T>;
    priorities: {
        [name: string]: number;
    };
    constructor(types: T[]);
    get default(): T;
    /**
     * Initializes the types.
     */
    init(): void;
    /**
     * Adds a type.
     */
    add(type: T): void;
    /**
     * Removes a type.
     */
    remove(type: T | string): void;
    /**
     * Gets a type by name.
     */
    get(name: string): T;
    /**
     * Gets the priority of a type.
     */
    priority(name: string): number;
    /**
     * Checks if a node matches any type.
     */
    matches(node: Node | null): boolean;
    /**
     * Finds the first type that matches a node.
     */
    findByNode(node: Node, fallbackToDefault: true): T;
    findByNode(node: Node, fallbackToDefault?: boolean): T | undefined;
    /**
     * Finds the first type that matches attributes.
     */
    findByAttributes(attributes: AttributeMap | undefined, fallbackToDefault: true): T;
    findByAttributes(attributes: AttributeMap | undefined, fallbackToDefault?: boolean): T | undefined;
}

/**
 * Manages the typeset (lines, formats, embeds) for the editor.
 */
export declare class Typeset {
    lines: Types<LineType>;
    formats: Types<FormatType>;
    embeds: Types<EmbedType>;
    static line: typeof line;
    static format: typeof format;
    static embed: typeof embed;
    constructor(types: TypesetTypes);
}

/**
 * Configuration for initializing a Typeset.
 */
export declare interface TypesetTypes {
    lines?: Array<string | LineType>;
    formats?: Array<string | FormatType>;
    embeds?: Array<string | EmbedType>;
}

export declare const underline: FormatType;

/**
 * Represents the undo/redo stack.
 */
export declare interface UndoStack {
    undo: StackEntry[];
    redo: StackEntry[];
}

/**
 * Creates a new empty undo stack.
 */
export declare function undoStack(): UndoStack;

/** Unsubscribes from value updates. */
export declare type Unsubscriber = () => void;

export declare type VChild = VNode | string;

export declare function virtualRendering(editor: Editor): {
    render: (what?: VirtualRenderWhat) => void;
    init(): void;
    destroy(): void;
};

export declare interface VirtualRenderWhat {
    old?: TextDocument;
    doc?: TextDocument;
    selection: EditorRange | null;
}

/**
 * Virtual DOM Node.
 */
export declare interface VNode {
    type: string;
    props: Props;
    children: VChild[];
    key: any;
}

export { }
