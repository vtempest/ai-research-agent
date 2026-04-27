import type { Document } from '../documents/DocumentTree';

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  date?: string;
  size?: number;
}

/**
 * Converts the reason docs Document structure to FileManager FileItem structure.
 * Flattens the tree structure into a flat list with path-based IDs.
 */
export function convertDocumentsToFileItems(documents: Document[]): FileItem[] {
  const fileItems: FileItem[] = [];

  function traverse(doc: Document, parentPath: string = '') {
    const currentPath = parentPath ? `${parentPath}/${doc.id}` : `/${doc.id}`;

    // Add the current document/folder
    fileItems.push({
      id: currentPath,
      name: doc.title || 'Untitled',
      type: doc.isFolder ? 'folder' : 'file',
      date: new Date().toISOString().split('T')[0],
      size: doc.isFolder ? undefined : (doc.content?.length || 0),
    });

    // Recursively traverse children
    if (doc.children && doc.children.length > 0) {
      doc.children.forEach(child => traverse(child, currentPath));
    }
  }

  documents.forEach(doc => traverse(doc));

  return fileItems;
}

/**
 * Gets FileManager data from the reason docs documents.
 * This should be called with the current documents state.
 */
export function getData(documents: Document[] = []): FileItem[] {
  return convertDocumentsToFileItems(documents);
}
