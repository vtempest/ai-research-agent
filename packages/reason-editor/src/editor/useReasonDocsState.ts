/**
 * @module useReasonDocsState
 * @description Central state hook for the Reason Docs editor. Manages all
 * document CRUD operations, tab lifecycle, sidebar/view configuration,
 * AI rewrite state, file-source switching, and optional database synchronisation.
 */
import { useState, useMemo, useEffect, useRef } from "react";
import type { ReasonEditorHandle } from "./editor-contract";
import {
  type TocEntry,
  type Document,
  type SidebarPanelType,
  getActiveFileSourceId,
  setActiveFileSourceId,
  getActiveFileSource,
  defaultDocuments,
} from "react-reason-editor-sidebar";
import { closeTabs } from "./tabState";
import { collectDescendantIds, moveDocumentInList } from "./moveDocument";
import { useLocalStorage } from "../app-hooks/useLocalStorage";
import { useIsMobile } from "../app-hooks/use-mobile";
import { useDocumentSync } from "../app-hooks/useDocumentSync";
import { toast } from "sonner";
import { nextDocumentId, readUploadedFile } from "./fileUpload";
import { useSourceDocuments } from "./useSourceDocuments";
import type { FileSourceProvider } from "./fileSourceProvider";

/**
 * Aggregates all Reason Docs application state into a single hook.
 *
 * @param openFilesSidebarSignal - Optional value from the host app; changing
 * it (e.g. bumping a counter) opens the files sidebar. Lets chrome mounted
 * outside this component (like an app dock icon) request the sidebar open.
 * @param fileSourceProvider - Optional host provider that lists external
 * storage sources (e.g. synced Google Drive folders) for the file tree.
 * @returns An object containing reactive state values and handler callbacks
 * consumed by {@link Index} and its child components.
 */
export function useReasonDocsState(
  openFilesSidebarSignal?: number | string,
  fileSourceProvider?: FileSourceProvider,
) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagManagementDocId, setTagManagementDocId] = useState<string | null>(
    null,
  );
  const [defaultSidebarView, setDefaultSidebarView] = useLocalStorage<
    "tree" | "outline" | "split" | "last-used"
  >("REASON-default-sidebar-view", "last-used");
  // Split view is inferred from the panel lists (2+ panels stack in a
  // split), so there is no separate split flag. Open Tabs stacks above the
  // Files tree.
  const [leftPanels, setLeftPanels] = useLocalStorage<SidebarPanelType[]>(
    "REASON-left-panels",
    ["openTabs", "files"],
  );
  const [rightPanels, setRightPanels] = useLocalStorage<SidebarPanelType[]>(
    "REASON-right-panels",
    [],
  );
  const [showDynamicIsland, setShowDynamicIsland] = useLocalStorage<boolean>(
    "REASON-show-dynamic-island",
    false,
  );
  const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>(
    "REASON-sidebar-width",
    25,
  );
  const [aiSuggestion, setAiSuggestion] = useState<{
    originalText: string;
    suggestedText: string;
    range: { from: number; to: number };
    mode?: string;
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const editorRef = useRef<ReasonEditorHandle | null>(null);
  const [headings, setHeadings] = useState<TocEntry[]>([]);

  const [documents, setDocuments] = useLocalStorage<Document[]>(
    "REASON-documents",
    defaultDocuments,
  );

  const [activeDocId, setActiveDocId] = useLocalStorage<string | null>(
    "REASON-active-doc",
    documents.length > 0 ? documents[0].id : null,
  );

  const [openTabs, setOpenTabs] = useLocalStorage<string[]>(
    "REASON-open-tabs",
    documents.length > 0 ? [documents[0].id] : [],
  );

  const [closedTabsHistory, setClosedTabsHistory] = useState<string[]>([]);
  const [splitViewDocId, setSplitViewDocId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDocumentId, setNewDocumentId] = useState<string | null>(null);
  const [activeFileSourceId, setActiveFileSourceIdState] = useState<string>(
    getActiveFileSourceId(),
  );
  const [enableDatabaseSync, setEnableDatabaseSync] = useLocalStorage<boolean>(
    "REASON-enable-db-sync",
    false,
  );

  // Documents of the active external source (a synced Google Drive folder),
  // kept apart from `documents` so they never reach local storage or sync.
  const sourceDocs = useSourceDocuments(activeFileSourceId, fileSourceProvider);

  /** Whether `id` names a read-only document from an external source. */
  const isExternal = (id: string | null | undefined) =>
    !!id && sourceDocs.isExternalId(id) && !documents.some((doc) => doc.id === id);

  /** Explains why an external document can't be changed. */
  const notifyReadOnly = () => {
    toast.info(
      `${sourceDocs.activeSource?.name ?? "This storage source"} is read-only here. Switch the storage source to Local Files to create or edit notes.`,
    );
  };

  const {
    isSyncing,
    lastSyncTime,
    saveDocument,
    deleteDocument: deleteFromDatabase,
    queueDocumentForSync,
  } = useDocumentSync(documents, setDocuments, {
    enableSync: enableDatabaseSync,
    syncInterval: 5000,
  });

  /**
   * Converts the flat document array into a nested tree structure.
   * Each node gets a fresh `children` array; documents whose `parentId` is
   * missing or unknown are promoted to root level.
   *
   * @param docs - Flat list of documents to organise.
   * @returns The root-level nodes with `children` populated recursively.
   */
  const buildTree = (docs: Document[]): Document[] => {
    const map = new Map<string, Document>();
    const roots: Document[] = [];

    docs.forEach((doc) => {
      map.set(doc.id, { ...doc, children: [] });
    });

    docs.forEach((doc) => {
      const node = map.get(doc.id)!;
      if (doc.parentId && map.has(doc.parentId)) {
        map.get(doc.parentId)!.children!.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const documentTree = useMemo(() => buildTree(documents), [documents]);
  const activeDocument =
    documents.find((doc) => doc.id === activeDocId) ??
    sourceDocs.findDocument(activeDocId);

  /** Looks a document up in the local store, then in the external sources. */
  const findDocument = (id: string | null | undefined) =>
    id ? documents.find((doc) => doc.id === id) ?? sourceDocs.findDocument(id) : undefined;

  /** What the file tree shows: the active external source's files, or local notes. */
  const treeDocuments = sourceDocs.isActive ? sourceDocs.treeDocuments : documents;

  /** Every document a tab or split view can point at. */
  const allDocuments = useMemo(
    () => (sourceDocs.allDocuments.length ? [...documents, ...sourceDocs.allDocuments] : documents),
    [documents, sourceDocs.allDocuments],
  );

  // An external Google Doc opens with an empty body; fetch it once it is the
  // active document (on select, tab switch, or a reload that restored it).
  useEffect(() => {
    if (activeDocId) sourceDocs.ensureContent(activeDocId);
  }, [activeDocId, sourceDocs.ensureContent]);

  // Update document title when active document changes
  useEffect(() => {
    if (activeDocument?.title) {
      document.title = `${activeDocument.title} - Reason Docs`;
    } else {
      document.title = "Reason - Powerful Note-Taking App";
    }
  }, [activeDocument?.title]);

  // Reset outline when switching documents
  useEffect(() => {
    setHeadings([]);
  }, [activeDocId]);

  const filteredDocuments = useMemo(() => {
    const activeDocuments = documents.filter((doc) => !doc.isDeleted);

    if (!searchQuery.trim()) return activeDocuments;

    const query = searchQuery.toLowerCase();
    return activeDocuments.filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query),
    );
  }, [documents, searchQuery]);

  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return documentTree;
    return buildTree(filteredDocuments);
  }, [filteredDocuments, searchQuery]);

  /**
   * Creates a new document or folder.
   *
   * @param selectedId - ID of the currently selected document; the new item
   *   is placed as a sibling (or child if the selection is a folder).
   * @param isFolder - When `true`, creates a folder node instead of a note.
   */
  const handleAddDocument = async (
    selectedId: string | null,
    isFolder: boolean = false,
  ) => {
    if (sourceDocs.isActive) {
      notifyReadOnly();
      return;
    }
    let parentId: string | null = null;

    if (selectedId) {
      const selectedDoc = documents.find((doc) => doc.id === selectedId);
      if (selectedDoc) {
        if (selectedDoc.isFolder) {
          parentId = selectedId;
        } else {
          parentId = selectedDoc.parentId;
        }
      }
    }

    const newDoc: Document = {
      id: Date.now().toString(),
      title: isFolder ? "New Folder" : "",
      content: "",
      parentId,
      children: [],
      isExpanded: isFolder,
      isFolder,
      tags: [],
    };

    setDocuments([...documents, newDoc]);

    if (enableDatabaseSync) {
      await saveDocument(newDoc);
    }

    if (!isFolder) {
      setActiveDocId(newDoc.id);
      setOpenTabs([...openTabs, newDoc.id]);
    }

    setNewDocumentId(newDoc.id);
    setTimeout(() => setNewDocumentId(null), 500);

    if (parentId) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === parentId ? { ...doc, isExpanded: true } : doc,
        ),
      );
    }

    toast.success(isFolder ? "Folder created" : "Note created");
  };

  /**
   * Creates a file or folder requested by the file manager modal, by either
   * "Add new" or "Upload file".
   *
   * Uploads arrive as a browser `File`; text-like ones are read into the
   * document body so the note opens with something in it, while binary
   * files become a placeholder note that records the original name and size
   * (the editor has no way to render them).
   *
   * @param request - Destination, name, kind, and the uploaded file if any.
   */
  const handleCreateFile = async ({
    parentId,
    name,
    isFolder,
    file,
  }: {
    parentId: string | null;
    name: string;
    isFolder: boolean;
    file?: File;
  }) => {
    if (sourceDocs.isActive) {
      notifyReadOnly();
      return;
    }
    const title = name.trim() || (isFolder ? "New Folder" : "Untitled");
    const parentDoc = parentId
      ? documents.find((doc) => doc.id === parentId)
      : undefined;
    // A file can only live inside a folder; dropping a file onto another
    // file puts it beside that file instead of nesting under it.
    const resolvedParentId = parentDoc?.isFolder ? parentDoc.id : null;

    const content = file ? await readUploadedFile(file) : "";

    const newDoc: Document = {
      id: nextDocumentId(documents),
      title,
      content,
      parentId: resolvedParentId,
      children: [],
      isExpanded: isFolder,
      isFolder,
      tags: [],
    };

    setDocuments([...documents, newDoc]);
    if (resolvedParentId) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === resolvedParentId ? { ...doc, isExpanded: true } : doc,
        ),
      );
    }

    if (enableDatabaseSync) {
      await saveDocument(newDoc);
    }

    if (!isFolder) {
      setActiveDocId(newDoc.id);
      setOpenTabs(
        openTabs.includes(newDoc.id) ? openTabs : [...openTabs, newDoc.id],
      );
    }

    toast.success(
      file ? `Uploaded ${title}` : isFolder ? "Folder created" : "Note created",
    );
  };

  /**
   * Soft-deletes a document and all its descendants.
   * Also removes them from the open-tab list and updates the active document
   * if any deleted ID was previously active.
   *
   * @param id - ID of the document (or folder) to delete.
   */
  const handleDeleteDocument = async (id: string) => {
    if (isExternal(id)) {
      notifyReadOnly();
      return;
    }
    const collectDescendants = (docId: string): string[] => {
      const children = documents.filter((d) => d.parentId === docId);
      return [
        docId,
        ...children.flatMap((child) => collectDescendants(child.id)),
      ];
    };

    const idsToDelete = collectDescendants(id);
    const remaining = documents.filter((doc) => !idsToDelete.includes(doc.id));

    setDocuments(remaining);

    if (enableDatabaseSync) {
      for (const docId of idsToDelete) {
        await deleteFromDatabase(docId);
      }
    }

    const newOpenTabs = openTabs.filter(
      (tabId) => !idsToDelete.includes(tabId),
    );
    setOpenTabs(newOpenTabs);

    if (activeDocId && idsToDelete.includes(activeDocId)) {
      setActiveDocId(
        newOpenTabs.length > 0
          ? newOpenTabs[0]
          : remaining.length > 0
            ? remaining[0].id
            : null,
      );
    }

    toast.success("Note deleted");
  };

  /**
   * Duplicates a document, appending " (Copy)" to its title.
   * The duplicate is immediately opened as the active document.
   *
   * @param id - ID of the document to duplicate.
   */
  const handleDuplicateDocument = (id: string) => {
    if (isExternal(id)) {
      notifyReadOnly();
      return;
    }
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      title: doc.title + " (Copy)",
      children: [],
    };

    setDocuments([...documents, newDoc]);
    setActiveDocId(newDoc.id);
    setOpenTabs([...openTabs, newDoc.id]);
    toast.success("Note duplicated");
  };

  /**
   * Applies partial updates to a document. When database sync is enabled,
   * the updated document is queued for sync.
   *
   * @param id - ID of the document to update.
   * @param updates - Partial `Document` fields to merge in.
   */
  const handleUpdateDocument = (id: string, updates: Partial<Document>) => {
    if (isExternal(id)) {
      // The editor is read-only for these, so only a rename can get here.
      if (updates.title !== undefined) notifyReadOnly();
      return;
    }
    setDocuments((docs) => {
      return docs.map((doc) => {
        if (doc.id === id) {
          const updatedDoc = { ...doc, ...updates };
          if (enableDatabaseSync) {
            queueDocumentForSync(updatedDoc);
          }
          return updatedDoc;
        }
        return doc;
      });
    });
  };

  /**
   * Toggles the `isExpanded` flag of a document/folder node.
   *
   * @param id - ID of the document whose expand state should toggle.
   */
  const handleToggleExpand = (id: string) => {
    if (isExternal(id)) {
      sourceDocs.toggleExpand(id);
      return;
    }
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id ? { ...doc, isExpanded: !doc.isExpanded } : doc,
      ),
    );
  };

  /**
   * Replaces the whole set of expanded folders at once, used by the sidebar's
   * expand/collapse toggle as it steps the tree through one folder level per
   * click. Persisting it here (rather than leaving it in the tree's local
   * state) is what makes a stepped expansion survive the next document
   * change and a reload.
   *
   * @param folderIds - IDs of every folder that should be expanded; all other
   *   folders are collapsed.
   */
  const handleSetExpandedFolders = (folderIds: string[]) => {
    // The tree only knows the folders it is showing: while it shows an
    // external source, applying its list to local notes would collapse them all.
    if (sourceDocs.isActive) {
      sourceDocs.setExpandedFolders(folderIds);
      return;
    }
    const expanded = new Set(folderIds);
    setDocuments((docs) =>
      docs.map((doc) => {
        const shouldExpand = expanded.has(doc.id);
        // Compare loosely so notes (which never carry the flag) aren't
        // rewritten on every click and marked dirty for sync.
        return !!doc.isExpanded === shouldExpand ? doc : { ...doc, isExpanded: shouldExpand };
      }),
    );
  };

  /**
   * Reorders documents in the flat list to implement drag-and-drop.
   * Moves the dragged document together with its whole subtree and prevents
   * moving a document into one of its own descendants.
   *
   * @param draggedId - ID of the document being dragged.
   * @param targetId - ID of the drop target, or `null` for root.
   * @param position - Where to insert relative to the target node.
   */
  const handleMoveDocument = (
    draggedId: string,
    targetId: string | null,
    position: "before" | "after" | "child",
  ) => {
    if (draggedId === targetId) return;
    if (isExternal(draggedId) || isExternal(targetId)) {
      notifyReadOnly();
      return;
    }

    if (
      targetId &&
      collectDescendantIds(documents, draggedId).includes(targetId)
    ) {
      toast.error("Cannot move a note into its own child");
      return;
    }

    const reordered = moveDocumentInList(documents, draggedId, targetId, position);
    if (reordered === documents) return;

    setDocuments(reordered);

    if (enableDatabaseSync) {
      // The move changes the dragged document's parent, so it has to reach the
      // database too — otherwise it snaps back to the old place on next load.
      const updated = reordered.find((doc) => doc.id === draggedId);
      if (updated) queueDocumentForSync(updated);
    }

    toast.success("Note moved");
  };

  // Keyboard shortcut for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Opens the files sidebar in response to an external trigger (e.g. an app
  // dock icon mounted outside this component tree). Adds the files panel
  // without dropping whatever else is showing — replacing the whole list
  // here used to persist a files-only layout, permanently hiding the
  // Open Tabs panel that is on by default.
  useEffect(() => {
    if (!openFilesSidebarSignal) return;
    setLeftPanels((prev) =>
      prev.includes("files") ? prev : ["files", ...prev],
    );
    setIsSidebarOpen(true);
  }, [openFilesSidebarSignal]);

  // One-time repair for layouts saved by older builds, where the effect
  // above overwrote the persisted panel list down to just "files": restore
  // the default Open Tabs panel unless the user has since chosen a
  // files-only or outline-only default view themselves.
  useEffect(() => {
    const RESTORE_FLAG = "REASON-open-tabs-default-restored";
    try {
      if (window.localStorage.getItem(RESTORE_FLAG)) return;
      window.localStorage.setItem(RESTORE_FLAG, "1");
    } catch {
      return;
    }
    if (defaultSidebarView === "tree" || defaultSidebarView === "outline") return;
    setLeftPanels((prev) =>
      prev.includes("openTabs") ? prev : [...prev, "openTabs"],
    );
    // No split flag to set: two or more panels already render as a split.
    // Runs once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply default sidebar view on mount
  useEffect(() => {
    if (defaultSidebarView === "tree") {
      setLeftPanels(["files"]);
    } else if (defaultSidebarView === "outline") {
      setLeftPanels(["outline"]);
    } else if (defaultSidebarView === "split") {
      setLeftPanels(["openTabs", "files", "outline"]);
    }
  }, []);

  /**
   * Appends a single tag to a document's tag list.
   *
   * @param docId - Target document ID.
   * @param tag - Tag string to add.
   */
  const handleAddTag = (docId: string, tag: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId ? { ...doc, tags: [...(doc.tags || []), tag] } : doc,
      ),
    );
  };

  /**
   * Removes a single tag from a document's tag list.
   *
   * @param docId - Target document ID.
   * @param tag - Tag string to remove.
   */
  const handleRemoveTag = (docId: string, tag: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId
          ? { ...doc, tags: (doc.tags || []).filter((t) => t !== tag) }
          : doc,
      ),
    );
  };

  /**
   * Opens the tag-management dialog for a specific document.
   *
   * @param docId - ID of the document whose tags should be managed.
   */
  const handleManageTags = (docId: string) => {
    if (isExternal(docId)) {
      notifyReadOnly();
      return;
    }
    setTagManagementDocId(docId);
    setIsTagDialogOpen(true);
  };

  /**
   * Switches the active file source. A source the host's provider can list
   * (a synced Google Drive folder) replaces the tree with its documents —
   * `useSourceDocuments` lists it as it becomes active. Other non-local
   * source types have no loader yet.
   *
   * @param sourceId - ID of the file source to activate.
   */
  const handleFileSourceChange = async (sourceId: string) => {
    setActiveFileSourceIdState(sourceId);
    setActiveFileSourceId(sourceId);

    const source = getActiveFileSource();
    if (source.type === "local") {
      toast.success("Switched to local storage");
    } else if (!fileSourceProvider?.canList(source)) {
      toast.info(
        `Source switching for ${source.type} not yet implemented in standalone mode`,
      );
    }
  };

  /**
   * Replaces the full tag list on the document currently targeted by the
   * tag-management dialog.
   *
   * @param tags - Complete new tag array to assign.
   */
  const handleUpdateTags = (tags: string[]) => {
    if (tagManagementDocId) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === tagManagementDocId ? { ...doc, tags } : doc,
        ),
      );
      toast.success("Tags updated");
    }
  };

  /**
   * Restores a soft-deleted document by clearing its `isDeleted` flag.
   *
   * @param id - ID of the document to restore from trash.
   */
  const handleRestoreDocument = (id: string) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === id ? { ...doc, isDeleted: false } : doc)),
    );
    toast.success("Note restored");
  };

  /**
   * Permanently removes a document and all its descendants from the list.
   * Unlike `handleDeleteDocument`, this does NOT call the database delete API.
   *
   * @param id - ID of the document to permanently remove.
   */
  const handlePermanentDelete = (id: string) => {
    const collectDescendants = (docId: string): string[] => {
      const children = documents.filter((d) => d.parentId === docId);
      return [
        docId,
        ...children.flatMap((child) => collectDescendants(child.id)),
      ];
    };

    const idsToDelete = collectDescendants(id);
    const remaining = documents.filter((doc) => !idsToDelete.includes(doc.id));

    setDocuments(remaining);

    const newOpenTabs = openTabs.filter(
      (tabId) => !idsToDelete.includes(tabId),
    );
    setOpenTabs(newOpenTabs);

    if (activeDocId && idsToDelete.includes(activeDocId)) {
      setActiveDocId(
        newOpenTabs.length > 0
          ? newOpenTabs[0]
          : remaining.length > 0
            ? remaining[0].id
            : null,
      );
    }

    toast.success("Note permanently deleted");
  };

  /**
   * Sets the active document to the document represented by `tabId`.
   *
   * @param tabId - Document ID to activate.
   */
  const handleTabChange = (tabId: string) => {
    setActiveDocId(tabId);
  };

  /**
   * Closes several tabs in one state update and records them in
   * `closedTabsHistory` (most recent first, capped at 10) for reopen
   * support. Activates the nearest surviving tab when the active document
   * is among the closed ones.
   *
   * Batching matters: state here is read from the current render's closure,
   * so closing tabs one call at a time would make every call start from the
   * same pre-close tab list and only the last one would stick.
   *
   * @param tabIds - Document IDs of the tabs to close.
   */
  const handleTabsClose = (tabIds: string[]) => {
    const result = closeTabs(openTabs, activeDocId, tabIds);
    if (result.closed.length === 0) return;

    setClosedTabsHistory([...result.closed, ...closedTabsHistory].slice(0, 10));
    setOpenTabs(result.openTabs);
    if (result.activeTabId !== activeDocId) setActiveDocId(result.activeTabId);
  };

  /**
   * Closes a tab by removing it from `openTabs` and records it in
   * `closedTabsHistory` for reopen support. Activates the nearest
   * remaining tab if the closed tab was active.
   *
   * @param tabId - Document ID of the tab to close.
   */
  const handleTabClose = (tabId: string) => {
    handleTabsClose([tabId]);
  };

  /** Creates a new untitled document and opens it in a new tab. */
  const handleTabAdd = () => {
    handleAddDocument(null);
  };

  /**
   * Closes the tab AND deletes the underlying document in one operation.
   *
   * @param tabId - Document ID to close and delete.
   */
  const handleTabDelete = (tabId: string) => {
    handleTabClose(tabId);
    handleDeleteDocument(tabId);
  };

  /**
   * Reopens the most recently closed tab (if the document still exists).
   * Recursively tries the next entry in history if the document was deleted.
   */
  const handleReopenLastClosed = () => {
    if (closedTabsHistory.length === 0) return;

    const [lastClosedId, ...restHistory] = closedTabsHistory;
    const docExists = findDocument(lastClosedId);

    if (docExists) {
      if (!openTabs.includes(lastClosedId)) {
        setOpenTabs([...openTabs, lastClosedId]);
      }
      setActiveDocId(lastClosedId);
      setClosedTabsHistory(restHistory);
      toast.success("Tab reopened");
    } else {
      setClosedTabsHistory(restHistory);
      if (restHistory.length > 0) {
        handleReopenLastClosed();
      }
    }
  };

  /**
   * Opens a document in the split-right panel.
   *
   * @param tabId - Document ID to display in the secondary panel.
   */
  const handleSplitRight = (tabId: string) => {
    setSplitViewDocId(tabId);
    toast.success("Split view enabled");
  };

  /**
   * Selects a document from the sidebar. Folders toggle their expand state
   * instead of opening. Non-open documents are added to `openTabs`.
   *
   * @param id - Document ID to select.
   */
  const handleSelectDocument = (id: string) => {
    const doc = findDocument(id);

    if (doc?.isFolder) {
      handleToggleExpand(id);
      return;
    }

    if (!openTabs.includes(id)) {
      setOpenTabs([...openTabs, id]);
    }
    setActiveDocId(id);
  };

  // AI Rewrite handlers
  /**
   * Placeholder AI rewrite handler — not yet implemented.
   * Displays an informational toast when invoked.
   *
   * @param _customPrompt - Optional custom instruction (currently unused).
   * @param _modeId - Optional rewrite mode identifier (currently unused).
   */
  const handleAIRewrite = async (_customPrompt?: string, _modeId?: string) => {
    toast.info("AI rewrite is not yet available for this editor");
  };

  /** Removes the "ai" panel from whichever side(s) currently show it. */
  const dismissAiPanel = () => {
    setRightPanels((panels) => panels.filter((p) => p !== "ai"));
    setLeftPanels((panels) => (panels.length > 1 ? panels.filter((p) => p !== "ai") : panels));
  };

  /** Accepts the current AI suggestion and dismisses the AI panel. */
  const handleAIApprove = () => {
    setAiSuggestion(null);
    dismissAiPanel();
  };

  /** Rejects the current AI suggestion and dismisses the AI panel. */
  const handleAIReject = () => {
    setAiSuggestion(null);
    dismissAiPanel();
  };

  /**
   * Placeholder AI-regenerate handler — not yet implemented.
   *
   * @param _mode - Rewrite mode (currently unused).
   */
  const handleAIRegenerate = async (_mode: any) => {
    toast.info("AI rewrite is not yet available for this editor");
  };

  // Ensure active document exists
  useEffect(() => {
    if (activeDocId && !findDocument(activeDocId)) {
      setActiveDocId(documents.length > 0 ? documents[0].id : null);
    }
    // findDocument reads documents and the external listings.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents, sourceDocs.allDocuments, activeDocId, setActiveDocId]);

  return {
    // State
    isMobile,
    isSidebarOpen,
    setIsSidebarOpen,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    isSearchModalOpen,
    setIsSearchModalOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isTeamsOpen,
    setIsTeamsOpen,
    isInviteModalOpen,
    setIsInviteModalOpen,
    isTagDialogOpen,
    setIsTagDialogOpen,
    tagManagementDocId,
    defaultSidebarView,
    setDefaultSidebarView,
    leftPanels,
    setLeftPanels,
    rightPanels,
    setRightPanels,
    showDynamicIsland,
    setShowDynamicIsland,
    sidebarWidth,
    setSidebarWidth,
    aiSuggestion,
    setAiSuggestion,
    isAiLoading,
    setIsAiLoading,
    editorRef,
    headings,
    setHeadings,
    documents,
    setDocuments,
    treeDocuments,
    allDocuments,
    findDocument,
    isExternalSourceActive: sourceDocs.isActive,
    isSourceLoading: sourceDocs.isLoading,
    externalContentErrors: sourceDocs.contentErrors,
    retryExternalContent: sourceDocs.ensureContent,
    refreshSource: sourceDocs.refresh,
    activeDocId,
    setActiveDocId,
    openTabs,
    setOpenTabs,
    closedTabsHistory,
    splitViewDocId,
    setSplitViewDocId,
    searchQuery,
    setSearchQuery,
    newDocumentId,
    activeFileSourceId,
    enableDatabaseSync,
    setEnableDatabaseSync,
    isSyncing,
    lastSyncTime,
    documentTree,
    activeDocument,
    filteredDocuments,
    filteredTree,

    // Handlers
    handleAddDocument,
    handleCreateFile,
    handleDeleteDocument,
    handleDuplicateDocument,
    handleUpdateDocument,
    handleToggleExpand,
    handleSetExpandedFolders,
    handleMoveDocument,
    handleAddTag,
    handleRemoveTag,
    handleManageTags,
    handleFileSourceChange,
    handleUpdateTags,
    handleRestoreDocument,
    handlePermanentDelete,
    handleTabChange,
    handleTabClose,
    handleTabsClose,
    handleTabAdd,
    handleTabDelete,
    handleReopenLastClosed,
    handleSplitRight,
    handleSelectDocument,
    handleAIRewrite,
    handleAIApprove,
    handleAIReject,
    handleAIRegenerate,
  };
}
