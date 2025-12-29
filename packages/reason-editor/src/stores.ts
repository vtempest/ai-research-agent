import { AttributeMap, TextDocument, isEqual, type EditorRange } from './document/index.js';
import { readable, writable } from './modules/scheduled-signal.js';
import { Editor } from './Editor.js';


/**
 * A readable store interface.
 */
export interface Readable<T> {
  /**
   * Return the current value.
   */
  get(): T;

  /**
   * Subscribe to changes with a callback. Returns an unsubscribe function.
   */
  subscribe(callback: Subscriber<T>): Unsubscriber;
}
/** Unsubscribes from value updates. */
export type Unsubscriber = () => void;

/** Callback to inform of a value updates. */
export type Subscriber<T> = (value: T) => void;
/**
 * Interface for the editor stores.
 */
export interface EditorStores {
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
export function editorStores(editor: Editor): EditorStores {
  const editorStore = writable(editor);
  const active = activeStore(editorStore);
  const doc = docStore(editorStore);
  const selection = selectionStore(editorStore);
  const root = rootStore(editorStore);
  const focus = focusStore(editorStore);

  function updateEditor(value: Editor) {
    if (value === editor) return;
    editorStore.set(value);
  }

  return {
    active,
    doc,
    selection,
    root,
    focus,
    updateEditor,
  };
}

/**
 * Creates a derived store from the editor store.
 * @param editorStore The base editor store.
 * @param defaultValue The default value.
 * @param changeEvents The events to listen for changes.
 * @param update The function to calculate the new value.
 * @param checkEquality Whether to check for equality before updating.
 */
export function derivedEditorStore<T>(
  editorStore: Readable<Editor>,
  defaultValue: T,
  changeEvents: string[],
  update: (editor: Editor) => T,
  checkEquality?: boolean
): Readable<T> {
  let value = defaultValue;

  //@ts-ignore
  return readable(value, set => {
    let editor: Editor | undefined;
    const callUpdate = () => {
      value = editor ? update(editor) : defaultValue;
      if (checkEquality && isEqual(value, set)) return;
      set(value);
    };
    const on = () => editor && changeEvents.forEach(event => editor!.on(event, callUpdate));
    const off = () => editor && changeEvents.forEach(event => editor!.off(event, callUpdate));

    const unsub = editorStore.subscribe(currentEditor => {
      off();

      editor = currentEditor;

      if (editor) {
        callUpdate();
        on();
      } else {
        set((value = defaultValue));
      }
    });

    return () => {
      off();
      unsub();
      editor = undefined;
      callUpdate();
    };
  });
}

/**
 * Store for the active formatting attributes.
 */
export function activeStore(editorStore: Readable<Editor>) {
  return derivedEditorStore(editorStore, {}, ['changed', 'format'], editor => editor.getActive(), true);
}

/**
 * Store for the document content.
 */
export function docStore(editorStore: Readable<Editor>) {
  return derivedEditorStore(editorStore, new TextDocument(), ['changed'], editor => editor.doc);
}

/**
 * Store for the current selection.
 */
export function selectionStore(editorStore: Readable<Editor>) {
  return derivedEditorStore(editorStore, null, ['changed'], editor => editor.doc.selection);
}

/**
 * Store for the focus state.
 */
export function focusStore(editorStore: Readable<Editor>) {
  return derivedEditorStore(editorStore, false, ['changed'], editor => !!editor.doc.selection);
}

/**
 * Store for the editor root element.
 */
export function rootStore(editorStore: Readable<Editor>) {
  return derivedEditorStore(editorStore, undefined, ['root'], editor => editor._root);
}
