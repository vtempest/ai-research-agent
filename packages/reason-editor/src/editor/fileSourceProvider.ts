/**
 * @module fileSourceProvider
 * @description The contract a host app implements to show an external storage
 * source (a synced Google Drive folder, say) in the `ReasonDocs` file tree.
 *
 * The editor package knows nothing about any particular backend: the host
 * passes a provider to `ReasonDocs`, and while the sidebar's active source is
 * one the provider can list, the tree shows that source's documents in place
 * of the local ones. Those documents carry `external` (see
 * `ExternalDocumentRef` in react-reason-editor-sidebar) and are read-only
 * mirrors — nothing from a provider is ever written to the local store.
 */
import type { AnyFileSource, Document } from 'react-reason-editor-sidebar';

export interface FileSourceProvider {
  /** Whether this provider can list documents for `source`. */
  canList(source: AnyFileSource): boolean;
  /**
   * Lists everything in the source as a flat document list (folders with
   * `isFolder`, nesting through `parentId`). Each document's `external`
   * says how it opens. IDs must be unique across sources.
   */
  listDocuments(source: AnyFileSource): Promise<Document[]>;
  /**
   * Fetches the HTML body of a document whose `external.view` is `editor`.
   * Called the first time such a document is opened.
   */
  loadDocumentContent?(doc: Document): Promise<string>;
}
