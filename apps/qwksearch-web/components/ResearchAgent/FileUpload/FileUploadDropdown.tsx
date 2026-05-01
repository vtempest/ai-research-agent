/**
 * React component that renders FileUploadDropdown within the ResearchAgent area of ResearchAgent.
 */
'use client';

import React, { useState, useEffect } from 'react';
import { Upload, CloudIcon, FolderOpen, Loader2, ChevronRight } from 'lucide-react';
import grab from 'grab-url';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useGooglePicker } from './GoogleDrivePicker';
import { useChat } from '@/components/ResearchAgent/hooks/useChat';
import { categories } from '../SearchConfig/categories';
import { ModelSelector } from '../SearchConfig/ModelSelector';

interface FileUploadDropdownProps {
  onFileSelect: (files: FileList | File[]) => void;
  disabled?: boolean;
}

const FileUploadDropdown: React.FC<FileUploadDropdownProps> = ({
  onFileSelect,
  disabled = false,
}) => {
  const { category, setCategory } = useChat();
  const selectedCodes = category ? category.split(',').filter(Boolean) : ['general'];
  const primaryCategory = categories.find((cat) => cat.code === selectedCodes[0]) || categories[0];

  const toggleCategory = (code: string) => {
    const current = category ? category.split(',').filter(Boolean) : ['general'];
    const next = current.includes(code)
      ? current.filter((c) => c !== code)
      : [...current, code];
    setCategory(next.length > 0 ? next.join(',') : 'general');
  };
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isScanningFolder, setIsScanningFolder] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const [thinkingTimeLimit, setThinkingTimeLimit] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const n = Number(localStorage.getItem('thinkingTimeLimit') ?? '0');
    return Number.isFinite(n) ? n : 0;
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const THINKING_OPTIONS = [
    { label: '5s', value: 5 },
    { label: '15s', value: 15 },
    { label: '30s', value: 30 },
    { label: '45s', value: 45 },
    { label: '60s', value: 60 },
    { label: 'Unlimited', value: 0 },
  ];

  const handleThinkingTimeLimit = (value: number) => {
    setThinkingTimeLimit(value);
    localStorage.setItem('thinkingTimeLimit', String(value));
  };
  const { openPicker } = useGooglePicker();

  // Check if Google Drive is connected on mount
  useEffect(() => {
    checkGoogleDriveConnection();
  }, []);

  const checkGoogleDriveConnection = async () => {
    try {
      const data = await grab('doc/google-docs/auth/status');
      setIsGoogleDriveConnected(data.isConnected || false);
    } catch (error) {
      console.error('Failed to check Google Drive connection:', error);
    }
  };

  const handleLocalFileUpload = async () => {
    if ('showOpenFilePicker' in window) {
      // Use native File System Access API on desktop Chrome/Edge
      try {
        const fileHandles = await (window as any).showOpenFilePicker({
          multiple: true,
          types: [
            {
              description: 'Supported files',
              accept: {
                'application/pdf': ['.pdf'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'text/plain': ['.txt'],
                'text/html': ['.html', '.htm'],
                'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
              },
            },
          ],
        });
        const files: File[] = await Promise.all(
          fileHandles.map((handle: FileSystemFileHandle) => handle.getFile()),
        );
        if (files.length > 0) onFileSelect(files);
      } catch (err: any) {
        // User cancelled the picker — not an error
        if (err?.name !== 'AbortError') {
          console.error('Failed to open file picker:', err);
          // Fallback to legacy input on unexpected error
          fileInputRef.current?.click();
        }
      }
    } else {
      // Fallback: legacy <input type="file"> for mobile / non-Chromium browsers
      fileInputRef.current?.click();
    }
  };

  const SUPPORTED_EXTS = ['pdf', 'docx', 'txt', 'html', 'htm'];
  const TEXT_EXTS = [
    'md', 'markdown', 'js', 'jsx', 'ts', 'tsx', 'py', 'rb', 'go', 'rs',
    'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'swift', 'kt', 'sh', 'bash',
    'zsh', 'json', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf', 'xml',
    'csv', 'tsv', 'log', 'env', 'sql', 'graphql', 'vue', 'svelte', 'astro',
    'css', 'scss', 'less', 'sass', 'tex', 'bib', 'rst', 'adoc', 'org',
  ];

  async function collectFilesFromDirectory(
    dirHandle: FileSystemDirectoryHandle,
    path = '',
  ): Promise<File[]> {
    const files: File[] = [];
    for await (const entry of (dirHandle as any).values()) {
      if (entry.kind === 'file') {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

        if (SUPPORTED_EXTS.includes(ext)) {
          // Directly supported — pass through as-is
          files.push(file);
        } else if (TEXT_EXTS.includes(ext)) {
          // Read text content and wrap as .txt so the upload pipeline accepts it
          try {
            const text = await file.text();
            const displayName = path ? `${path}/${file.name}` : file.name;
            const wrapped = new File(
              [text],
              `${displayName.replace(/[/\\]/g, '_')}.txt`,
              { type: 'text/plain' },
            );
            files.push(wrapped);
          } catch {
            // Skip files that can't be read as text
          }
        }
        // Skip binary / unsupported files silently
      } else if (entry.kind === 'directory') {
        const subDir = entry as FileSystemDirectoryHandle;
        // Skip hidden directories and common noisy dirs
        if (
          subDir.name.startsWith('.') ||
          subDir.name === 'node_modules' ||
          subDir.name === '__pycache__'
        )
          continue;
        const subFiles = await collectFilesFromDirectory(
          subDir,
          path ? `${path}/${subDir.name}` : subDir.name,
        );
        files.push(...subFiles);
      }
    }
    return files;
  }

  const handleLocalFolderAccess = async () => {
    if (!('showDirectoryPicker' in window)) {
      alert(
        'Your browser does not support the File System Access API. Please use Chrome or Edge.',
      );
      return;
    }
    setIsScanningFolder(true);
    try {
      const dirHandle = await (window as any).showDirectoryPicker({
        mode: 'read',
      });
      const files = await collectFilesFromDirectory(dirHandle);
      if (files.length > 0) {
        onFileSelect(files);
      } else {
        alert('No supported files found in the selected folder.');
      }
    } catch (err: any) {
      // User cancelled the picker — not an error
      if (err?.name !== 'AbortError') {
        console.error('Failed to access folder:', err);
      }
    } finally {
      setIsScanningFolder(false);
    }
  };

  const handleGoogleDriveConnect = async () => {
    setIsConnecting(true);
    try {
      const data = await grab('doc/google-docs/auth');
      if (data.success && data.data?.authUrl) {
        // Open auth URL in a popup window
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
          data.data.authUrl,
          'Google Drive Authorization',
          `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listen for OAuth callback
        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'google-drive-connected') {
            setIsGoogleDriveConnected(true);
            popup?.close();
            window.removeEventListener('message', handleMessage);
          }
        };

        window.addEventListener('message', handleMessage);
      }
    } catch (error) {
      console.error('Failed to connect to Google Drive:', error);
    } finally {
      setIsConnecting(false);
    }
};

const handleGoogleDriveUpload = async () => {
  try {
    // Get access token from server
    const tokenData = await grab('doc/google-docs/token');
    if (!tokenData.success || !tokenData.accessToken) {
      throw new Error('Failed to get access token');
    }

    await openPickerWithToken(tokenData.accessToken);
  } catch (error: any) {
    console.error('Failed to open Google Drive picker:', error);
    alert(error.message || 'Failed to open Google Drive picker');
  }
};

const openPickerWithToken = async (accessToken: string) => {
  await openPicker(
    accessToken,
    async (files) => {
      // Handle selected files from Google Drive
      setIsLoadingFiles(true);
      try {
        const fileObjects: File[] = [];

        for (const file of files) {
          // Fetch file content from Google Drive
          const data = await grab(
            `/api/doc/google-docs/files?fileId=${file.id}`
          );
          if (data.success && data.file) {
            // Convert base64 content to File object
            const content = atob(data.file.content);
            const bytes = new Uint8Array(content.length);
            for (let i = 0; i < content.length; i++) {
              bytes[i] = content.charCodeAt(i);
            }

            const blob = new Blob([bytes], { type: data.file.mimeType });
            const fileObject = new File([blob], data.file.name, {
              type: data.file.mimeType,
            });

            fileObjects.push(fileObject);
          }
        }

        if (fileObjects.length > 0) {
          onFileSelect(fileObjects);
        }
      } catch (error) {
        console.error('Error processing Google Drive files:', error);
        alert('Failed to load files from Google Drive');
      } finally {
        setIsLoadingFiles(false);
      }
    },
    (error) => {
      console.error('Google Picker error:', error);
      alert(error);
    }
  );
};

return (
  <>
    <div className="relative flex shrink min-w-8 !shrink-0 group">
      <Popover>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className="inline-flex items-center justify-center relative shrink-0 transition-colors duration-200 h-8 w-8 rounded-lg active:scale-95 text-text-400 hover:text-text-200 hover:bg-bg-200 disabled:opacity-50 disabled:cursor-not-allowed group-active:scale-95"
            type="button"
            aria-label="Search options"
          >
            <img src={primaryCategory.icon} alt={primaryCategory.name} className="w-5 h-5" />
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-52 p-0">
          <div className="bg-popover border rounded-lg border-border w-full overflow-hidden">

            {/* Categories submenu toggle */}
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground"
            >
              <div className="flex items-center gap-2">
                <img src={primaryCategory.icon} alt={primaryCategory.name} className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">Category</span>
              </div>
              <ChevronRight className={cn('w-3.5 h-3.5 text-muted-foreground transition-transform', categoriesOpen && 'rotate-90')} />
            </button>

            {/* Categories submenu */}
            {categoriesOpen && (
              <div className="border-t border-border px-2 py-1">
                {categories.map((cat) => {
                  const checked = selectedCodes.includes(cat.code);
                  return (
                    <button
                      onClick={() => toggleCategory(cat.code)}
                      key={cat.code}
                      type="button"
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition duration-150 focus:outline-none',
                        checked ? 'bg-secondary' : 'hover:bg-secondary',
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors',
                          checked ? 'bg-accent border-accent' : 'border-border bg-transparent',
                        )}
                      >
                        {checked && (
                          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 10 10">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <img src={cat.icon} alt={cat.name} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className={cn('text-xs font-medium', checked ? 'text-primary' : 'text-popover-foreground')}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Thinking Time Limit submenu toggle */}
            <button
              type="button"
              onClick={() => setThinkingOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground border-t border-border"
            >
              <span className="font-medium text-sm">Thinking Time</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {THINKING_OPTIONS.find((o) => o.value === thinkingTimeLimit)?.label ?? 'Unlimited'}
                </span>
                <ChevronRight className={cn('w-3.5 h-3.5 text-muted-foreground transition-transform', thinkingOpen && 'rotate-90')} />
              </div>
            </button>

            {thinkingOpen && (
              <div className="border-t border-border px-2 py-1">
                {THINKING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleThinkingTimeLimit(opt.value)}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-1 rounded-md text-xs cursor-pointer transition focus:outline-none',
                      thinkingTimeLimit === opt.value ? 'bg-secondary text-primary' : 'hover:bg-secondary text-popover-foreground',
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {thinkingTimeLimit === opt.value && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 10 10">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="px-3 py-2 flex items-center justify-between border-t border-border">
              <p className="text-xs text-muted-foreground font-normal">Model</p>
              <ModelSelector />
            </div>

            <div className="border-t border-border p-2">
              <p className="text-xs text-muted-foreground font-normal mb-1 px-2 pt-0.5">Upload from</p>
              <button
                type="button"
                onClick={handleLocalFileUpload}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground"
              >
                <Upload className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Your Device</span>
              </button>

              <button
                type="button"
                onClick={handleLocalFolderAccess}
                disabled={isScanningFolder}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanningFolder ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin flex-shrink-0" />
                ) : (
                  <FolderOpen className="h-3.5 w-3.5 flex-shrink-0" />
                )}
                <span>{isScanningFolder ? 'Scanning...' : 'Local Folder'}</span>
              </button>

              {isGoogleDriveConnected ? (
                <button
                  type="button"
                  onClick={handleGoogleDriveUpload}
                  disabled={isLoadingFiles}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingFiles ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin flex-shrink-0" />
                  ) : (
                    <CloudIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  )}
                  <span>{isLoadingFiles ? 'Loading...' : 'Google Drive'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleDriveConnect}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-secondary transition focus:outline-none cursor-pointer text-popover-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin flex-shrink-0" />
                  ) : (
                    <CloudIcon className="h-3.5 w-3.5 flex-shrink-0" />
                  )}
                  <span>{isConnecting ? 'Connecting...' : 'Connect Google Drive'}</span>
                </button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1F1E1D] dark:bg-[#EEEEEC] text-[11px] font-medium rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm tracking-wide">
        <span className="text-[#ECECEC] dark:text-[#1F1E1D]">
          Search options
        </span>
      </div>
    </div>

    {/* Hidden file input */}
    <input
      ref={fileInputRef}
      type="file"
      multiple
      onChange={(e) => {
        if (e.target.files) {
          onFileSelect(e.target.files);
          e.target.value = '';
        }
      }}
      className="hidden"
    />
  </>
);
};

export default FileUploadDropdown;
