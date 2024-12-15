<script>
	import { createEventDispatcher } from 'svelte';
	import {
	  GripVertical,
	  Folder,
	  FileText,
	  FileImage,
	  FileAudio,
	  FileVideo,
	  FolderPlus,
	  Upload,
	  File,
	  Trash2,
	  ArrowUpDown,
	  ChevronDown,
	  ChevronRight,
	  Edit2,
	} from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
  
	export let item;
	export let fileIcons;
	export let toggleFolder;
	export let handleNewFolder;
	export let handleNewFile;
	export let confirmDelete;
	export let handleRename;
	export let initSortable;
	export let clickFile;
  
	const dispatch = createEventDispatcher();
	let renaming = false;
	let newName = item.name;
	let dropzoneActive = false;
  
	function startRename() {
	  renaming = true;
	  newName = item.name;
	}
  
	function finishRename() {
	  if (newName.trim() !== '' && newName !== item.name) {
		handleRename(item.id, newName);
	  }
	  renaming = false;
	}
  
	function handleDragStart(event) {
	  event.dataTransfer.setData('text/plain', item.id);
	  event.dataTransfer.effectAllowed = 'move';
	  
	  // Add delay to allow visual state to update
	  setTimeout(() => {
		document.querySelectorAll('.folder-dropzone').forEach(el => {
		  if (el.getAttribute('data-id') !== item.id) {
			el.classList.add('folder-dropzone-active');
		  }
		});
	  }, 0);
	}
  
	function handleDragEnd() {
	  document.querySelectorAll('.folder-dropzone').forEach(el => {
		el.classList.remove('folder-dropzone-active');
		el.classList.remove('folder-dropzone-hover');
	  });
	}
  
	function handleDragOver(event) {
	  if (item.type === 'folder') {
		event.preventDefault();
		const draggedId = event.dataTransfer?.getData('text/plain');
		if (draggedId && draggedId !== item.id) {
		  event.currentTarget.classList.add('folder-dropzone-hover');
		}
	  }
	}
  
	function handleDragLeave(event) {
	  if (item.type === 'folder') {
		event.currentTarget.classList.remove('folder-dropzone-hover');
	  }
	}
  
	function handleDrop(event) {
	  event.preventDefault();
	  const draggedId = event.dataTransfer?.getData('text/plain');
	  event.currentTarget.classList.remove('folder-dropzone-hover');
	  
	  if (draggedId && draggedId !== item.id) {
		// Instead of directly dispatching the moveItem event, we need to add the item as a child of the folder
		dispatch('addItemAsChild', { itemId: draggedId, parentId: item.id });
	  }
	}
  
	function handleToggleFolder() {
	  toggleFolder(item);
	  item = { ...item, expanded: !item.expanded };
	}
  
	function handleClickFile() {
	  if (item.type === 'folder') {
		handleToggleFolder();
	  } else {
		clickFile(item.id);
	  }
	}
  
	$: Icon = fileIcons[item.type] || File;
  </script>
  
  <div
	class="flex items-center space-x-2 p-2 bg-white border rounded-md shadow-sm folder-dropzone"
	class:cursor-grab={!renaming}
	data-id={item.id}
	draggable="true"
	on:dragstart={handleDragStart}
	on:dragend={handleDragEnd}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
  >
	<div class="handle cursor-move">
	  <GripVertical class="h-4 w-4 text-gray-400" />
	</div>
	
	{#if item.type === 'folder'}
	  <button on:click={handleToggleFolder} class="focus:outline-none">
		{#if item.expanded}
		  <ChevronDown class="h-4 w-4 text-gray-600" />
		{:else}
		  <ChevronRight class="h-4 w-4 text-gray-600" />
		{/if}
	  </button>
	{:else}
	  <div class="w-4"></div>
	{/if}
	
	<Icon class="h-4 w-4 text-gray-600" />
	
	{#if renaming}
	  <input
		type="text"
		bind:value={newName}
		on:blur={finishRename}
		on:keypress={(e) => e.key === 'Enter' && finishRename()}
		class="flex-grow bg-gray-100 px-2 py-1 rounded"
	  />
	{:else}
	  <span 
		class="flex-grow cursor-pointer" 
		on:click={handleClickFile}
	  >
		{item.name}
	  </span>
	{/if}
  
	{#if item.type === 'folder'}
	  <Button variant="ghost" size="icon" on:click={() => handleNewFolder(item.id)}>
		<FolderPlus class="h-4 w-4" />
	  </Button>
	  <Button variant="ghost" size="icon" on:click={() => handleNewFile(item.id)}>
		<File class="h-4 w-4" />
	  </Button>
	{/if}
	
	<Button variant="ghost" size="icon" on:click={startRename}>
	  <Edit2 class="h-4 w-4" />
	</Button>
	
	<Button variant="ghost" size="icon" on:click={() => confirmDelete(item)}>
	  <Trash2 class="h-4 w-4" />
	</Button>
  </div>
  
  {#if item.type === 'folder' && item.expanded}
	<div 
	  class="ml-6 mt-2 space-y-2 folder-dropzone" 
	  use:initSortable 
	  data-parent-id={item.id}
	  on:dragover={handleDragOver}
	  on:dragleave={handleDragLeave}
	  on:drop={handleDrop}
	>
	  {#each item.children as child (child.id)}
		<svelte:self
		  item={child}
		  {fileIcons}
		  {toggleFolder}
		  {handleNewFolder}
		  {handleNewFile}
		  {confirmDelete}
		  {handleRename}
		  {initSortable}
		  {clickFile}
		  on:moveItem
		/>
	  {/each}
	</div>
  {/if}