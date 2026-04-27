"use client";

import {
  dragAndDropFeature,
  expandAllFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  selectionFeature,
  syncDataLoaderFeature,
  type TreeState,
} from "@headless-tree/core";
import { AssistiveTreeDescription, useTree } from "@headless-tree/react";
import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";

import type { Document } from "../documents/DocumentTree";

export type DocumentTreeHandle = {
  collapseAll: () => void;
  edit: (nodeId: string) => void;
  expandAll: () => void
};
import { Tree, TreeDragLine, TreeItem, TreeItemLabel } from "../ui/tree";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "../lib/utils";
import { FileTreeContextMenu } from "./FileTreeContextMenu";

interface FileTreeItem {
  children?: string[];
  documentId: string;
  isFolder: boolean;
  name: string;
}

interface FileTreeProps {
  activeId: string | null;
  documents: Document[];
  onMove: (
    draggedId: string,
    targetId: string | null,
    position: "before" | "after" | "child",
  ) => void;
  onRename?: (id: string, newTitle: string) => void;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  onAddChildFolder?: (parentId: string) => void;
  onAddSibling?: (itemId: string) => void;
  onAddSiblingFolder?: (itemId: string) => void;
  onCopy?: (id: string) => void;
  onPaste?: (targetId: string | null) => void;
  onNewFile?: (parentId: string | null) => void;
  onNewFolder?: (parentId: string | null) => void;
  onManageTags?: (id: string) => void;
}

const ROOT_ID = "__root__";
const INDENT = 20;

function buildItems(documents: Document[]): Record<string, FileTreeItem> {
  const items: Record<string, FileTreeItem> = {
    [ROOT_ID]: {
      children: [],
      documentId: ROOT_ID,
      isFolder: true,
      name: "Root",
    },
  };

  for (const doc of documents) {
    items[doc.id] = {
      children: [],
      documentId: doc.id,
      isFolder: !!doc.isFolder,
      name: doc.title || "Untitled",
    };
  }

  for (const doc of documents) {
    const parentId = doc.parentId && items[doc.parentId] ? doc.parentId : ROOT_ID;
    items[parentId].children = [...(items[parentId].children ?? []), doc.id];
  }

  for (const itemId of Object.keys(items)) {
    if (itemId === ROOT_ID) continue;
    if ((items[itemId].children?.length ?? 0) > 0) {
      items[itemId].isFolder = true;
    }
  }

  return items;
}

const FileTree = forwardRef<DocumentTreeHandle, FileTreeProps>(
  ({ activeId, documents, onMove, onRename, onSelect, onDelete, onDuplicate, onAddChild, onAddChildFolder, onAddSibling, onAddSiblingFolder, onCopy, onPaste, onNewFile, onNewFolder, onManageTags }, ref) => {
    const items = useMemo(() => {
      const built = buildItems(documents);
      return built;
    }, [documents]);
    const expandedItems = useMemo(
      () => documents.filter((doc) => doc.isFolder && doc.isExpanded).map((doc) => doc.id),
      [documents],
    );

    const [state, setState] = useState<Partial<TreeState<FileTreeItem>>>({
      expandedItems,
      selectedItems: activeId ? [activeId] : [],
    });
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [copiedNodeId, setCopiedNodeId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const tree = useTree<FileTreeItem>({
      canReorder: true,
      dataLoader: {
        getChildren: (itemId) => {
          const item = items[itemId];
          if (!item) {
            return [];
          }
          return item.children ?? [];
        },
        getItem: (itemId) => {
          const item = items[itemId];
          if (!item) {
            // Return a fallback item to prevent crashes
            return {
              children: [],
              documentId: itemId,
              isFolder: false,
              name: 'Deleted Item',
            };
          }
          return item;
        },
      },
      features: [
        syncDataLoaderFeature,
        selectionFeature,
        hotkeysCoreFeature,
        dragAndDropFeature,
        keyboardDragAndDropFeature,
      ],
      getItemName: (item) => item.getItemData().name,
      indent: INDENT,
      isItemFolder: (item) => item.getItemData()?.isFolder ?? false,
      onDrop: (draggedItems, target) => {
        const draggedIds = draggedItems
          .map((draggedItem) => draggedItem.getId())
          .filter((id) => id !== ROOT_ID);

        if (draggedIds.length === 0) return;

        const orderedDraggedIds = [...draggedIds].reverse();
        const moveAsChild = (parentId: string | null) => {
          for (const draggedId of orderedDraggedIds) {
            onMove(draggedId, parentId, "child");
          }
        };

        if ("childIndex" in target) {
          const parentId = target.item.getId() === ROOT_ID ? null : target.item.getId();
          const parentChildren = (items[target.item.getId()]?.children ?? []).filter(
            (childId) => !draggedIds.includes(childId),
          );

          const siblingAtIndex = parentChildren[target.childIndex];
          if (siblingAtIndex) {
            for (const draggedId of orderedDraggedIds) {
              onMove(draggedId, siblingAtIndex, "before");
            }
            return;
          }

          const previousSibling = parentChildren[target.childIndex - 1];
          if (previousSibling) {
            for (const draggedId of orderedDraggedIds) {
              onMove(draggedId, previousSibling, "after");
            }
            return;
          }

          moveAsChild(parentId);
          return;
        }

        const targetId = target.item.getId() === ROOT_ID ? null : target.item.getId();
        moveAsChild(targetId);
      },
      rootItemId: ROOT_ID,
      setState,
      state,
    });

    useEffect(() => {
      setState((prev) => ({
        ...prev,
        expandedItems,
        selectedItems: activeId && items[activeId] ? [activeId] : [],
      }));
    }, [activeId, expandedItems, items]);

    useImperativeHandle(ref, () => ({
      collapseAll: () => {
        tree.collapseAll();
      },
      edit: (nodeId: string) => {
        if (onRename) {
          setEditingItemId(nodeId);
        }
      },
      expandAll: () => {
        tree.expandAll();
      },
    }));

    const submitRename = (itemId: string, nextTitle: string) => {
      const newTitle = nextTitle.trim() || "Untitled";
      onRename?.(itemId, newTitle);
      setEditingItemId(null);
    };

    const handleDeleteConfirm = () => {
      if (deleteConfirmId && onDelete) {
        onDelete(deleteConfirmId);
        setDeleteConfirmId(null);

        // Clear selection if the deleted item was selected
        setState((prev) => ({
          ...prev,
          selectedItems: prev.selectedItems?.filter(id => id !== deleteConfirmId) ?? [],
        }));
      }
    };

    const deleteNodeName = deleteConfirmId ? items[deleteConfirmId]?.name : "";
    const treeItems = tree.getItems();

    return (
      <>
        <div className="flex h-full flex-col gap-2 overflow-auto">
          <Tree indent={INDENT} tree={tree}>
            <AssistiveTreeDescription tree={tree} />
            {treeItems.map((item) => {
              const itemId = item.getId();
              if (itemId === ROOT_ID) return null;

              return (
                <TreeItem item={item} key={itemId}>
                  <FileTreeContextMenu
                    itemId={itemId}
                    isFolder={item.isFolder()}
                    hasCopiedItem={!!copiedNodeId}
                    onAddChild={onAddChild}
                    onAddChildFolder={onAddChildFolder}
                    onAddSibling={onAddSibling}
                    onAddSiblingFolder={onAddSiblingFolder}
                    onRename={onRename ? () => setEditingItemId(itemId) : undefined}
                    onDuplicate={onDuplicate}
                    onCopy={onCopy ? (id) => {
                      setCopiedNodeId(id);
                      onCopy(id);
                    } : undefined}
                    onPaste={onPaste ? () => {
                      if (copiedNodeId) {
                        const target = item.isFolder() ? itemId : null;
                        onPaste(target);
                      }
                    } : undefined}
                    onDelete={onDelete ? () => setDeleteConfirmId(itemId) : undefined}
                    onManageTags={onManageTags}
                  >
                    <TreeItemLabel
                      className={cn(
                        "w-full text-left",
                        activeId === itemId && "bg-accent text-accent-foreground",
                      )}
                      onClick={() => {
                        if (!editingItemId) {
                          onSelect(itemId);
                        }
                      }}
                    >
                      <span className="flex items-center gap-2 w-full">
                        {item.isFolder() &&
                          (item.isExpanded() ? (
                            <FolderOpenIcon className="pointer-events-none size-4 text-muted-foreground" />
                          ) : (
                            <FolderIcon className="pointer-events-none size-4 text-muted-foreground" />
                          ))}

                        {editingItemId === itemId && onRename ? (
                          <input
                            autoFocus
                            className="flex-1 rounded border bg-background px-1 text-sm outline-none focus:ring-2 focus:ring-ring"
                            defaultValue={item.getItemName()}
                            onBlur={(e) => submitRename(itemId, e.currentTarget.value)}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === "Enter") {
                                submitRename(itemId, e.currentTarget.value);
                              }
                              if (e.key === "Escape") {
                                setEditingItemId(null);
                              }
                            }}
                          />
                        ) : (
                          <span className="flex-1 truncate">{item.getItemName()}</span>
                        )}
                      </span>
                    </TreeItemLabel>
                  </FileTreeContextMenu>
                </TreeItem>
              );
            })}
            <TreeDragLine />
          </Tree>
        </div>

        <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to move &quot;{deleteNodeName}&quot; to trash? You can restore it later from the trash.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Move to Trash</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
);

FileTree.displayName = 'FileTree';

export { FileTree };
export default FileTree;
