'use client';

/**
 * @fileoverview The Google Drive part of the storage-source form: connect
 * Drive with folder access, then pick the folders to sync — by browsing My
 * Drive, by pasting a folder link, or all of My Drive at once. The chosen
 * folders become the source's tree in the workspace sidebar.
 */
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, Folder, FolderPlus, HardDrive, Link2, Loader2, LogIn, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { GoogleDocsCredentials } from 'research-agent-ui/file-sources';
import {
  browseGoogleDriveFolders,
  connectGoogleDriveFolders,
  getGoogleDriveStatus,
  parseDriveFolderInput,
  sourceFolders,
  GoogleDriveError,
  type DriveFolderRef,
} from 'research-agent-ui/google-drive';

const inputCls =
  'w-full rounded-lg border border-light-200 dark:border-dark-200 bg-light-primary dark:bg-dark-primary px-3 py-2 text-sm text-black/80 dark:text-white/80 placeholder:text-black/40 dark:placeholder:text-white/40 focus-visible:outline-none focus-visible:border-light-300 dark:focus-visible:border-dark-300 transition-colors';
const smallBtn =
  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors border border-light-200 dark:border-dark-200 text-black/70 dark:text-white/70 hover:bg-light-200 dark:hover:bg-dark-200 disabled:opacity-50';

type Status = 'checking' | 'disconnected' | 'needs-folder-access' | 'connected';

interface GoogleDriveFoldersProps {
  credentials: Partial<GoogleDocsCredentials>;
  onChange: (patch: Partial<GoogleDocsCredentials>) => void;
}

export default function GoogleDriveFolders({ credentials, onChange }: GoogleDriveFoldersProps) {
  const [status, setStatus] = useState<Status>('checking');
  const [connecting, setConnecting] = useState(false);
  // Breadcrumb trail of the folder being browsed; the last entry is current.
  const [path, setPath] = useState<DriveFolderRef[]>([]);
  const [children, setChildren] = useState<DriveFolderRef[]>([]);
  const [browsing, setBrowsing] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [addingLink, setAddingLink] = useState(false);

  const folders = sourceFolders(credentials);

  const setFolders = (next: DriveFolderRef[]) =>
    onChange({ folders: next, folderIds: next.map((f) => f.id), isAuthenticated: true });

  const addFolder = (folder: DriveFolderRef) => {
    if (folders.some((f) => f.id === folder.id)) {
      toast.info(`${folder.name} is already synced`);
      return;
    }
    setFolders([...folders, folder]);
  };

  const handleDriveError = (error: unknown) => {
    if (error instanceof GoogleDriveError && error.needsReauth) setStatus('disconnected');
    else if (error instanceof GoogleDriveError && error.needsFolderAccess) setStatus('needs-folder-access');
    toast.error(error instanceof Error ? error.message : 'Google Drive request failed');
  };

  const openFolder = useCallback(async (folderId: string, trail: DriveFolderRef[]) => {
    setBrowsing(true);
    try {
      const { folder, folders: subfolders } = await browseGoogleDriveFolders(folderId);
      setPath([...trail, folder]);
      setChildren(subfolders);
    } catch (error) {
      handleDriveError(error);
    } finally {
      setBrowsing(false);
    }
    // handleDriveError only touches state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStatus = useCallback(async () => {
    try {
      const s = await getGoogleDriveStatus();
      const next: Status = !s.isConnected ? 'disconnected' : s.canReadFolders ? 'connected' : 'needs-folder-access';
      setStatus(next);
      if (next === 'connected') openFolder('root', []);
    } catch {
      setStatus('disconnected');
    }
  }, [openFolder]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const connected = await connectGoogleDriveFolders();
      if (connected) {
        onChange({ isAuthenticated: true });
        toast.success('Google Drive connected');
        await checkStatus();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not connect Google Drive');
    } finally {
      setConnecting(false);
    }
  };

  const handleAddLink = async () => {
    const id = parseDriveFolderInput(linkInput);
    if (!id) {
      toast.error('Paste a Google Drive folder link or folder ID');
      return;
    }
    setAddingLink(true);
    try {
      const { folder } = await browseGoogleDriveFolders(id);
      addFolder(folder);
      setLinkInput('');
    } catch (error) {
      handleDriveError(error);
    } finally {
      setAddingLink(false);
    }
  };

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
        <Loader2 size={14} className="animate-spin" /> Checking Google Drive…
      </div>
    );
  }

  if (status !== 'connected') {
    return (
      <div className="rounded-lg border border-light-200 dark:border-dark-200 px-3 py-3 space-y-2">
        <p className="text-sm text-black/70 dark:text-white/70">
          {status === 'disconnected'
            ? 'Connect Google Drive to sync your Docs, PDFs and images into the file tree.'
            : 'Google Drive is connected for single files only. Allow folder access to sync whole folders.'}
        </p>
        <button
          type="button"
          onClick={handleConnect}
          disabled={connecting}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60 transition-colors"
        >
          {connecting ? <Loader2 size={12} className="animate-spin" /> : <LogIn size={12} />}
          {status === 'disconnected' ? 'Connect Google Drive' : 'Allow folder access'}
        </button>
      </div>
    );
  }

  const current = path[path.length - 1];

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <span className="text-xs text-black/70 dark:text-white/70 block">Synced folders</span>
        {folders.length === 0 ? (
          <p className="text-xs text-black/50 dark:text-white/50">No folders yet. Add one below.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5" aria-label="Synced folders">
            {folders.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-1 rounded-md border border-light-200 dark:border-dark-200 pl-2 pr-1 py-0.5 text-xs text-black/80 dark:text-white/80"
              >
                {f.id === 'root' ? <HardDrive size={12} /> : <Folder size={12} />}
                <span className="max-w-[12rem] truncate">{f.name}</span>
                <button
                  type="button"
                  aria-label={`Stop syncing ${f.name}`}
                  onClick={() => setFolders(folders.filter((x) => x.id !== f.id))}
                  className="rounded p-0.5 hover:bg-light-200 dark:hover:bg-dark-200"
                >
                  <X size={11} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-light-200 dark:border-dark-200">
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-light-200 dark:border-dark-200 text-xs text-black/60 dark:text-white/60 overflow-x-auto">
          {path.map((p, i) => (
            <span key={`${p.id}-${i}`} className="flex items-center gap-1 shrink-0">
              {i > 0 && <ChevronRight size={11} />}
              <button
                type="button"
                className="hover:underline disabled:no-underline"
                disabled={i === path.length - 1}
                onClick={() => openFolder(p.id, path.slice(0, i))}
              >
                {p.name}
              </button>
            </span>
          ))}
          {browsing && <Loader2 size={11} className="animate-spin ml-1" />}
          <span className="flex-1" />
          {current && (
            <button type="button" className={smallBtn} onClick={() => addFolder(current)}>
              <FolderPlus size={12} />
              {current.id === 'root' ? 'Sync all of My Drive' : 'Sync this folder'}
            </button>
          )}
        </div>
        <ul className="max-h-48 overflow-y-auto py-1" aria-label="Google Drive folders">
          {children.length === 0 && !browsing && (
            <li className="px-3 py-2 text-xs text-black/50 dark:text-white/50">No subfolders here.</li>
          )}
          {children.map((child) => (
            <li key={child.id} className="flex items-center gap-2 px-2 py-1 hover:bg-light-200/60 dark:hover:bg-dark-200/60">
              <button
                type="button"
                className="flex flex-1 min-w-0 items-center gap-2 text-left text-sm text-black/80 dark:text-white/80"
                onClick={() => openFolder(child.id, path)}
              >
                <Folder size={14} className="shrink-0 text-black/50 dark:text-white/50" />
                <span className="truncate">{child.name}</span>
              </button>
              <button
                type="button"
                className={smallBtn}
                aria-label={`Sync ${child.name}`}
                onClick={() => addFolder(child)}
                disabled={folders.some((f) => f.id === child.id)}
              >
                <Plus size={12} />
                {folders.some((f) => f.id === child.id) ? 'Synced' : 'Sync'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
          <input
            className={`${inputCls} pl-8`}
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddLink();
              }
            }}
            placeholder="Or paste a Google Drive folder link"
            aria-label="Google Drive folder link"
          />
        </div>
        <button type="button" className={smallBtn} onClick={handleAddLink} disabled={addingLink || !linkInput.trim()}>
          {addingLink ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
          Add
        </button>
      </div>
    </div>
  );
}
