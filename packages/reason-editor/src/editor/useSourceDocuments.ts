/**
 * @module useSourceDocuments
 * @description Documents mirrored from external storage sources (see
 * `FileSourceProvider`), held apart from the local document store.
 *
 * While the active source is one the host's provider can list, the file tree
 * shows that source's documents instead of the local ones. They never enter
 * `REASON-documents` or the database sync: the listing (titles, folders, how
 * each file opens — never file bodies) is cached under its own localStorage
 * key so tabs and the tree resolve straight away on reload, and Google Doc
 * bodies are fetched on first open and kept in memory for the session.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  getFileSources,
  FILE_SOURCES_CHANGED_EVENT,
  type AnyFileSource,
  type Document,
} from 'react-reason-editor-sidebar';
import type { FileSourceProvider } from './fileSourceProvider';

const LISTINGS_KEY = 'REASON-source-documents';

type Listings = Record<string, Document[]>;

function readListings(): Listings {
  try {
    const raw = window.localStorage.getItem(LISTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeListings(listings: Listings) {
  try {
    window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  } catch {
    // Over quota or storage disabled: the listing is only a cache, and the
    // next activation of the source lists it again.
  }
}

/** Whether `provider` can show `source` in the tree. */
export function isListableSource(
  source: AnyFileSource | undefined,
  provider: FileSourceProvider | undefined,
): source is AnyFileSource {
  return !!provider && !!source && source.type !== 'local' && provider.canList(source);
}

/**
 * Tracks the documents of every external source listed so far and exposes
 * the active one's as the tree.
 *
 * @param activeFileSourceId - The sidebar's active storage source.
 * @param provider - The host's provider; without one nothing is external.
 */
export function useSourceDocuments(activeFileSourceId: string, provider?: FileSourceProvider) {
  const [listings, setListings] = useState<Listings>(() => readListings());
  const [contents, setContents] = useState<Record<string, string>>({});
  const [contentErrors, setContentErrors] = useState<Record<string, string>>({});
  const [loadingSourceId, setLoadingSourceId] = useState<string | null>(null);
  const [sourcesVersion, setSourcesVersion] = useState(0);
  const contentInFlight = useRef(new Set<string>());

  useEffect(() => {
    writeListings(listings);
  }, [listings]);

  // A folder added or removed in settings changes what the source lists.
  useEffect(() => {
    const bump = () => setSourcesVersion((v) => v + 1);
    window.addEventListener(FILE_SOURCES_CHANGED_EVENT, bump);
    return () => window.removeEventListener(FILE_SOURCES_CHANGED_EVENT, bump);
  }, []);

  const activeSource = useMemo(
    () => getFileSources().find((s) => s.id === activeFileSourceId),
    // sourcesVersion re-reads the saved list after it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeFileSourceId, sourcesVersion],
  );
  const isActive = isListableSource(activeSource, provider);

  const refresh = useCallback(
    async (source: AnyFileSource) => {
      if (!isListableSource(source, provider)) return;
      setLoadingSourceId(source.id);
      try {
        const docs = await provider!.listDocuments(source);
        setListings((prev) => {
          // Keep the folders the user had open across a re-list.
          const expanded = new Set(
            (prev[source.id] ?? []).filter((d) => d.isExpanded).map((d) => d.id),
          );
          return {
            ...prev,
            [source.id]: docs.map((d) =>
              d.isFolder && expanded.has(d.id) ? { ...d, isExpanded: true } : d,
            ),
          };
        });
      } catch (error: any) {
        toast.error(`Couldn't load ${source.name}: ${error?.message || 'unknown error'}`);
      } finally {
        setLoadingSourceId((id) => (id === source.id ? null : id));
      }
    },
    [provider],
  );

  // List the source whenever it becomes active (and again when its saved
  // settings change while it is active).
  useEffect(() => {
    if (isActive && activeSource) refresh(activeSource);
    // activeSource identity changes with sourcesVersion; refresh is stable per provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, activeSource, refresh]);

  const withContent = useCallback(
    (doc: Document): Document =>
      contents[doc.id] !== undefined && doc.external
        ? { ...doc, content: contents[doc.id], external: { ...doc.external, contentLoaded: true } }
        : doc,
    [contents],
  );

  const allDocuments = useMemo(
    () => Object.values(listings).flat().map(withContent),
    [listings, withContent],
  );

  const treeDocuments = useMemo(
    () => (isActive ? (listings[activeFileSourceId] ?? []).map(withContent) : []),
    [isActive, listings, activeFileSourceId, withContent],
  );

  const byId = useMemo(() => new Map(allDocuments.map((d) => [d.id, d])), [allDocuments]);

  const findDocument = useCallback((id: string | null | undefined) => (id ? byId.get(id) : undefined), [byId]);
  const isExternalId = useCallback((id: string | null | undefined) => !!id && byId.has(id), [byId]);

  /** Applies `update` to every listed folder (only folders carry expand state). */
  const mapFolders = (update: (doc: Document) => Document) =>
    setListings((prev) => {
      const next: Listings = {};
      for (const [sourceId, docs] of Object.entries(prev)) {
        next[sourceId] = docs.map((d) => (d.isFolder ? update(d) : d));
      }
      return next;
    });

  const toggleExpand = (id: string) =>
    mapFolders((d) => (d.id === id ? { ...d, isExpanded: !d.isExpanded } : d));

  const setExpandedFolders = (folderIds: string[]) => {
    const expanded = new Set(folderIds);
    mapFolders((d) => (!!d.isExpanded === expanded.has(d.id) ? d : { ...d, isExpanded: expanded.has(d.id) }));
  };

  /**
   * Fetches the body of an editor-type external document the first time it
   * is opened. Viewer documents (PDF, image) need nothing: the viewer loads
   * `contentUrl` itself.
   */
  const ensureContent = useCallback(
    async (id: string) => {
      const doc = byId.get(id);
      if (!doc?.external || doc.external.view !== 'editor' || doc.external.contentLoaded) return;
      if (!provider?.loadDocumentContent || contentInFlight.current.has(id)) return;
      contentInFlight.current.add(id);
      setContentErrors(({ [id]: _cleared, ...rest }) => rest);
      try {
        const html = await provider.loadDocumentContent(doc);
        setContents((prev) => ({ ...prev, [id]: html }));
      } catch (error: any) {
        setContentErrors((prev) => ({ ...prev, [id]: error?.message || 'Failed to load document' }));
      } finally {
        contentInFlight.current.delete(id);
      }
    },
    [byId, provider],
  );

  return {
    /** Whether the active source is external, so the tree shows `treeDocuments`. */
    isActive,
    /** The active external source, if any. */
    activeSource: isActive ? activeSource : undefined,
    /** Whether the active source is being listed right now. */
    isLoading: isActive && loadingSourceId === activeFileSourceId,
    treeDocuments,
    allDocuments,
    findDocument,
    isExternalId,
    toggleExpand,
    setExpandedFolders,
    ensureContent,
    /** Error from the last failed body fetch of a document, by ID. */
    contentErrors,
    /** Lists the active source again. */
    refresh: () => (activeSource ? refresh(activeSource) : Promise.resolve()),
  };
}
