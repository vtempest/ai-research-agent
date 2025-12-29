import { useEffect, useState } from 'react';
import { Editor } from '../src/Editor';
import { editorStores } from '../src/stores';
import type { AttributeMap, TextDocument, EditorRange } from '../src/document';

export function useEditor(editor: Editor) {
    const [active, setActive] = useState<AttributeMap>({});
    const [doc, setDoc] = useState<TextDocument>(editor.doc);
    const [selection, setSelection] = useState<EditorRange | null>(null);
    const [focus, setFocus] = useState<boolean>(false);
    const [root, setRoot] = useState<HTMLElement | undefined>(undefined);

    useEffect(() => {
        const stores = editorStores(editor);

        const unsubActive = stores.active.subscribe(setActive);
        const unsubDoc = stores.doc.subscribe(setDoc);
        const unsubSelection = stores.selection.subscribe(setSelection);
        const unsubFocus = stores.focus.subscribe(setFocus);
        const unsubRoot = stores.root.subscribe(setRoot);

        // Initial values
        setActive(stores.active.get());
        setDoc(stores.doc.get());
        setSelection(stores.selection.get());
        setFocus(stores.focus.get());
        setRoot(stores.root.get());

        return () => {
            unsubActive();
            unsubDoc();
            unsubSelection();
            unsubFocus();
            unsubRoot();
        };
    }, [editor]);

    return { active, doc, selection, focus, root };
}
