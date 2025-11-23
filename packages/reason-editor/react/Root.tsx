import React, { useEffect, useRef } from 'react';
import { Editor } from '../src/Editor';
import { docFromDom } from '../src/rendering/html';

export interface RootProps {
    editor: Editor;
    className?: string;
    children?: React.ReactNode;
}

export const Root: React.FC<RootProps> = ({ editor, className = '', children }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const lastEditorRef = useRef<Editor | undefined>(undefined);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        if (lastEditorRef.current && lastEditorRef.current !== editor) {
            lastEditorRef.current.destroy();
        }
        lastEditorRef.current = editor;

        if (editor) {
            editor.setRoot(root);
        }
    }, [editor]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const old = Array.from(root.childNodes);
        if (editor && root.children.length) {
            editor.set(docFromDom(editor, root));
        }

        return () => {
            // Restore original children on unmount
            for (let i = 0; i < old.length; i++) {
                root.appendChild(old[i]);
            }
        };
    }, []); // Run once on mount

    return (
        <div ref={rootRef} className={className}>
            {children}
        </div>
    );
};
