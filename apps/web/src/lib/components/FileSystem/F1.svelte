<script>
  import Sortable from "sortablejs";
  import FileSystemItem from "./F1_i.svelte";
  import {
    FolderPlus,
    Folder,
    FileText,
    FileImage,
    FileAudio,
    FileVideo,
    Upload,
    File,
    ArrowUpDown,
    ChevronsDown,
    ChevronsUp,
    Trash2,
    Search,
    X,
  } from "lucide-svelte";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "$lib/components/ui/alert-dialog";

  const fileIcons = {
    folder: Folder,
    text: FileText,
    image: FileImage,
    audio: FileAudio,
    video: FileVideo,
  };

  let items = $state([
    {
      id: "1",
      name: "Documents",
      type: "folder",
      parentId: null,
      expanded: false,
    },
    { id: "2", name: "report.docx", type: "text", parentId: "1" },
    {
      id: "3",
      name: "Subfolder",
      type: "folder",
      parentId: "1",
      expanded: false,
    },
    {
      id: "6",
      name: "Projects",
      type: "folder",
      parentId: null,
      expanded: false,
    },
    { id: "7", name: "test doc", type: "video", parentId: "6" },
  ]);
  
  let nextId = $state(8);
const getNextId = () => (nextId++).toString();

let deleteConfirmOpen = $state(false);
let itemToDelete = $state(null);
let searchTerm = $state("");

let filteredItems = $state([]);

// $derived.by(() => {
//   if (searchTerm) {
//       var filteredItems_new = items.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       return filteredItems_new
//     } else {
//       return items;
//     }
// });

    $effect(() => {
      if (searchTerm) {
      var filteredItems_new = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      shouldExpand = true
      filteredItems = filteredItems_new
    } else {
      filteredItems= items;
    }
    });

    let shouldExpand = $state(false);
    let isExpanding = $state(false);
   

let renderedItems = $derived.by(() => {
 
  var itemsToRender = items.filter((item) => item.parentId === null);
  return renderItems(itemsToRender);

});



  function expandParents(itemsToExpand) {
    const itemsToExpandSet = new Set(itemsToExpand.map((item) => item.id));
    items = items.map((item) => {
      if (itemsToExpandSet.has(item.id)) {
        let parentId = item.parentId;
        while (parentId) {
          const parentIndex = items.findIndex((i) => i.id === parentId);
          if (parentIndex !== -1) {
            items[parentIndex].expanded = true;
            parentId = items[parentIndex].parentId;
          } else {
            break;
          }
        }
      }
      return item;
    });
  }

  function clearSearch() {
    searchTerm = "";
  }

  function scrollToItem(itemId) {
    const element = document.querySelector(`[data-id="${itemId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleRename(itemId, newName) {
    items = items.map((item) =>
      item.id === itemId ? { ...item, name: newName } : item
    );
  }

  function initSortable(node) {
    new Sortable(node, {
      animation: 150,
      handle: ".handle",
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      group: "nested",
      onStart: (evt) => {
        document.querySelectorAll('.folder-dropzone').forEach(el => {
          el.classList.add('folder-dropzone-active');
        });
      },
      onEnd: (evt) => {
        const itemEl = evt.item;
        const newParentEl = evt.to;
        const itemId = itemEl.getAttribute("data-id");
        const newParentId = newParentEl.getAttribute("data-parent-id");

        document.querySelectorAll('.folder-dropzone').forEach(el => {
          el.classList.remove('folder-dropzone-active');
          el.classList.remove('folder-dropzone-hover');
        });

        moveItem(itemId, newParentId);
      }
    });
  }

  
  function addItemAsChild({ itemId, parentId }) {
    const item = items.find((i) => i.id === itemId);
    const parent = items.find((i) => i.id === parentId);

    if (item && parent && parent.type === "folder") {
      item.parentId = parentId;
      parent.expanded = true;

      if (item.type === "folder") {

        console.log(item);
        moveChildren(item.id, parentId);
      }

      items = items;
    }
  }

  function moveItem(itemId, newParentId) {
    const item = items.find((i) => i.id === itemId);
    const newParent = items.find((i) => i.id === newParentId);

    if (item && (!newParentId || (newParent && newParent.type === "folder"))) {
      item.parentId = newParentId;
      if (newParent) {
        newParent.expanded = true;
      }

      if (item.type === "folder") {
        moveChildren(item.id, newParentId);
      }

      items = items;
    }
  }

  const clickFile = function (itemId) {
    const item = items.find((i) => i.id === itemId);
    alert(JSON.stringify(item));
  };

  function moveChildren(parentId, newParentId) {
    items.forEach((item) => {
      if (item.parentId === parentId) {
        item.parentId = newParentId;
        if (item.type === "folder") {
          moveChildren(item.id, newParentId);
        }
      }
    });
  }

  function handleNewFolder(parentId) {
    const newFolder = {
      id: getNextId(),
      name: "New Folder",
      type: "folder",
      parentId,
      expanded: false,
    };
    items = [...items, newFolder];
  }

  function handleNewFile(parentId, fileType = "text") {
    const newFile = {
      id: getNextId(),
      name: `New ${fileType} file`,
      type: fileType,
      parentId,
    };
    items = [...items, newFile];
  }

  function confirmDelete(item) {
    itemToDelete = item;
    deleteConfirmOpen = true;
  }

  function handleDelete() {
    if (itemToDelete) {
      items = items.filter(
        (i) => i.id !== itemToDelete.id && i.parentId !== itemToDelete.id
      );
      deleteConfirmOpen = false;
      itemToDelete = null;
      items = items;
    }
  }

  function handleSort(parentId) {
    const parentItems = items.filter((i) => i.parentId === parentId);
    parentItems.sort((a, b) => a.name.localeCompare(b.name));
    items = items.map(
      (item) => parentItems.find((i) => i.id === item.id) || item
    );
  }

  function toggleFolder(item) {
    items = items.map((i) =>
      i.id === item.id ? { ...i, expanded: !i.expanded } : i
    );
  }

  function expandAll() {
    items = items.map((item) =>
      item.type === "folder" ? { ...item, expanded: true } : item
    );
  }

  function collapseAll() {
    items = items.map((item) =>
      item.type === "folder" ? { ...item, expanded: false } : item
    );
  }


  function getChildItems(parentId) {
    return items.filter((item) => item.parentId === parentId);
  }

  function renderItems(items) {
    return items?.map((item) => ({
      ...item,
      children:
        item.type === "folder" ? renderItems(getChildItems(item.id)) : [],
    }));
  }

</script>

<svelte:head>
  <title>DOCS: Document Outline Collections Sorter</title>
</svelte:head>

<div class="container mx-auto p-4 space-y-8">
  <Card>
    <CardHeader>
      <div class="relative">
        <Search
          class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
        />
        <Input
          type="text"
          placeholder="Search files and folders..."
          bind:value={searchTerm}
          class="pl-8 pr-8"
        />
        {#if searchTerm}
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2"
            onclick={clearSearch}
          >
            <X class="h-4 w-4 text-gray-500" />
          </button>
        {/if}
      </div>
    </CardHeader>
    <CardContent>
      <div class="mb-4 flex space-x-2">
        <Button variant="outline" onclick={() => handleNewFolder(null)}>
          <FolderPlus class="mr-2 h-4 w-4" />
          Folder
        </Button>
        <Button variant="outline" onclick={() => handleNewFile(null)}>
          <File class="mr-2 h-4 w-4" />
          File
        </Button>
        <Button variant="outline" onclick={() => handleNewFile(null, "image")}>
          <Upload class="mr-2 h-4 w-4" />
          Upload
        </Button>
        <Button variant="outline" onclick={() => handleSort(null)}>
          <ArrowUpDown class="mr-2 h-4 w-4" />
          Sort
        </Button>
        <Button variant="outline" onclick={expandAll}>
          <ChevronsDown class="mr-2 h-4 w-4" />
          Expand All
        </Button>
        <Button variant="outline" onclick={collapseAll}>
          <ChevronsUp class="mr-2 h-4 w-4" />
          Collapse All
        </Button>
      </div>

      {#if searchTerm && filteredItems?.length > 0}
        <div class="mb-4">
          <!-- <h3 class="text-lg font-semibold mb-2">Search Results:</h3> -->
          <ul class="space-y-1">
            {#each filteredItems as item}
              <li>
                <button
                  class="text-blue-500 hover:underline"
                  onclick={() => scrollToItem(item.id)}
                >
                  {item.name}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <div
        class="sortable-container space-y-2 folder-dropzone"
        use:initSortable
        data-parent-id="null"
      >
        {#each renderedItems as item (item.id)}
          <FileSystemItem
            {item}
            {fileIcons}
            {toggleFolder}
            {handleNewFolder}
            {handleNewFile}
            {confirmDelete}
            {handleRename}
            {initSortable}
            {clickFile}
            {addItemAsChild}
            moveItem={({ detail }) => moveItem(detail.itemId, detail.newParentId)}
          />
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<AlertDialog bind:open={deleteConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the item
        {#if itemToDelete?.type === "folder"}
          and all its contents.
        {/if}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter class="sm:space-x-0 sm:space-y-2">
      <AlertDialogCancel class="w-full h-4 mt-4 sm:w-auto">Cancel</AlertDialogCancel>
      <AlertDialogAction
        onclick={handleDelete}
        class="w-full sm:w-auto bg-gray-500 hover:bg-gray-600"
      >
        <Trash2 class="mr-2 h-4 w-4" />
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

<style>
  :global(.sortable-ghost) {
    @apply opacity-50 border-2 border-blue-300;
  }
  
  :global(.sortable-drag) {
    @apply cursor-grabbing;
  }

  :global(.folder-dropzone) {
    @apply transition-colors duration-200;
  }

  :global(.folder-dropzone-active) {
    @apply border-2 border-transparent;
  }

  :global(.folder-dropzone-hover) {
    @apply bg-blue-100 border-2 border-blue-300;
  }
</style>