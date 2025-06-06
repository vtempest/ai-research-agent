<script>
	import { dndzone } from 'svelte-dnd-action';
	import { createEventDispatcher } from 'svelte';
	import {
		GripVertical,
		Folder,
		FileText,
		FileImage,
		FileAudio,
		FileVideo,
		FolderPlus,
		Trash2,
		ArrowUpDown,
		ChevronDown,
		ChevronRight,
		Edit2,
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	// Props
	export let item = {};
	export let nodes = {};
	export let fileIcons = {
		folder: Folder,
		text: FileText,
		image: FileImage,
		audio: FileAudio,
		video: FileVideo
	};
	export let toggleFolder = () => {};
	export let handleNewFolder = () => {};
	export let handleNewFile = () => {};
	export let confirmDelete = () => {};
	export let handleRename = () => {};
	export let clickFile = () => {};
	export let addItemAsChild = () => {};
	export let moveItem = () => {};

	// Ensure item has an id
	$: safeItem = {
		...item,
		id: item.id || crypto.randomUUID(),
		name: item.name || '',
		type: item.type || 'text',
		children: item.children || [],
		expanded: item.expanded || false
	};

	// Local state
	const dispatch = createEventDispatcher();
	let renaming = false;
	let newName = safeItem?.name;

	// File icon mapping
	$: Icon = fileIcons[safeItem?.type] || FileText;

	// Rename functionality
	function startRename() {
		renaming = true;
		newName = safeItem.name;
	}

	function finishRename() {
		if (newName.trim() && newName !== safeItem.name) {
			handleRename(safeItem.id, newName);
		}
		renaming = false;
	}

	// Toggle folder expanded state
	function handleToggleFolder() {
		toggleFolder(safeItem);
		safeItem = { ...safeItem, expanded: !safeItem.expanded };
	}

	// Handle item click
	function handleClickFile() {
		if (safeItem.type === 'folder') {
			handleToggleFolder();
		} else {
			clickFile(safeItem.id);
		}
	}
</script>

<div
	class="flex items-center space-x-2 p-2 bg-white border rounded-md shadow-xs folder-dropzone"
	class:cursor-grab={!renaming}
	data-id={safeItem?.id}
	use:dndzone={{
		items: (safeItem?.children || []).map(child => ({
			...nodes[child.id] || child,
			id: (nodes[child.id] || child).id || crypto.randomUUID()
		})),
		flipDurationMs: 300,
	}}
	role="treeitem"
	aria-selected={safeItem.expanded}
	tabindex="0"
>
	<div class="handle cursor-move">
		<GripVertical class="h-4 w-4 text-gray-400" />
	</div>

	{#if safeItem.type === 'folder'}
		<button on:click={handleToggleFolder} class="focus:outline-hidden">
			{#if safeItem.expanded}
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
			class="grow bg-gray-100 px-2 py-1 rounded"
		/>
	{:else}
		<span class="grow cursor-pointer" on:click={handleClickFile}>
			{safeItem.name}
		</span>
	{/if}

	{#if safeItem.type === 'folder'}
		<Button variant="ghost" size="icon" on:click={() => handleNewFolder(safeItem.id)}>
			<FolderPlus class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={() => handleNewFile(safeItem.id)}>
			<FileText class="h-4 w-4" />
		</Button>
	{/if}

	<Button variant="ghost" size="icon" on:click={startRename}>
		<Edit2 class="h-4 w-4" />
	</Button>

	<Button variant="ghost" size="icon" on:click={() => confirmDelete(safeItem)}>
		<Trash2 class="h-4 w-4" />
	</Button>
</div>

{#if safeItem.type === 'folder' && safeItem.expanded}
	<!-- Nested items -->
	<div
		class="ml-6 mt-2 space-y-2"
		use:dndzone={{
			items: safeItem.children.map(child => ({
				...nodes[child.id] || child,
				id: (nodes[child.id] || child).id || crypto.randomUUID()
			})),
			flipDurationMs: 300,
		}}
	>
		{#each safeItem.children as child (child.id)}
			<svelte:self
				item={nodes[child.id] || child}
				{fileIcons}
				{nodes}
				{toggleFolder}
				{handleNewFolder}
				{handleNewFile}
				{confirmDelete}
				{handleRename}
				{clickFile}
				{addItemAsChild}
				{moveItem}
			/>
		{/each}
	</div>
{/if}