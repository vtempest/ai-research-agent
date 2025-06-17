<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { playSoundEffect, SoundEffect } from '$lib/components/AppLayout/sound-effects';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Folder, File, ChevronRight, ArrowUp10, ArrowDown10, 
		ChevronDown, Edit, ArrowDownWideNarrow, Trash2, Upload } 
		from 'lucide-svelte';
	
	export let nodes: Record<string, any>;
	export let node: any;
	let isExpanded = true;
	const flipDurationMs = 300;
	let searchText = '';
	let sortBy: 'name' | 'type' = 'name';
	let sortDirection: 'asc' | 'desc' = 'asc';
	
	function handleDndConsider(e: CustomEvent) {
	  node.items = e.detail.items;
	}
	
	function handleDndFinalize(e: CustomEvent) {
	  node.items = e.detail.items;
	  nodes = {...nodes};
	  playSoundEffect(SoundEffect.bloop);
	}
	
	function toggleExpand() {
	  node.isExpanded = !node.isExpanded;
	  nodes = {...nodes};
	}
	
	function handleRename() {
	  const newName = prompt('Enter new name:', node.name);
	  if (newName) {
		node.name = newName;
		nodes = {...nodes};
	  }
	}
	
	function handleDelete() {
	  if (confirm(`Are you sure you want to delete "${node.name}"?`)) {
		delete nodes[node.id];
		nodes = {...nodes};
	  }
	}
	
	function handleUpload() {
	  const file = prompt("Enter file name:");
	  if (file) {
		nodes[file] = { name: file, type: 'file' };
		nodes = {...nodes};
	  }
	}
	
	function handleSort() {
	  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	  sortNodes();
	}
	
	function handleCollapseAll() {
	  collapseAllNodes(nodes);
	  nodes = {...nodes};
	}
	
	function handleExpandAll() {
	  expandAllNodes(nodes);
	  nodes = {...nodes};
	}
	
	function handleNewFile() {
	  const fileName = prompt("Enter new file name:");
	  if (fileName) {
		nodes[fileName] = { name: fileName, type: 'file' };
		nodes = {...nodes};
	  }
	}
	
	function handleNewFolder() {
	  const folderName = prompt("Enter new folder name:");
	  if (folderName) {
		nodes[folderName] = { name: folderName, type: 'folder', items: {}, isExpanded: true };
		nodes = {...nodes};
	  }
	}
	
	function collapseAllNodes(obj: Record<string, any>) {
	  for (const key in obj) {
		if (obj[key].hasOwnProperty('items')) {
		  obj[key].isExpanded = false;
		}
	  }
	}
	
	function expandAllNodes(obj: Record<string, any>) {
	  for (const key in obj) {
		if (obj[key].hasOwnProperty('items')) {
		  obj[key].isExpanded = true;
		}
	  }
	}
	
	function sortNodes() {
	  const sortedKeys = Object.keys(nodes).sort((a, b) => {
		const nodeA = nodes[a];
		const nodeB = nodes[b];
		if (sortBy === 'name') {
		  return sortDirection === 'asc'
			? nodeA.name.localeCompare(nodeB.name)
			: nodeB.name.localeCompare(nodeA.name);
		} else {
		  return sortDirection === 'asc'
			? (nodeA.type || '').localeCompare(nodeB.type || '')
			: (nodeB.type || '').localeCompare(nodeA.type || '');
		}
	  });
	  const sortedNodes = sortedKeys.reduce((acc, key) => {
		acc[key] = nodes[key];
		return acc;
	  }, {} as Record<string, any>);
	  nodes = sortedNodes;
	}
	
	$: filteredNodes = Object.values(nodes).filter(n => n.name.toLowerCase().includes(searchText.toLowerCase()));
	</script>
	
	<div class="flex items-center space-x-1 p-1 hover:bg-gray-100 rounded-md text-sm">
	  <Button variant="ghost" size="icon" on:click={toggleExpand} class="p-0 h-6 w-6">
		{#if node?.hasOwnProperty("items")}
		  {#if node.isExpanded}
			<ChevronDown class="h-4 w-4" />
		  {:else}
			<ChevronRight class="h-4 w-4" />
		  {/if}
		{:else}
		  <div class="w-4" />
		{/if}
	  </Button>
	
	  {#if node?.hasOwnProperty("items")}
		<Folder class="h-4 w-4 text-blue-500" />
	  {:else}
		<File class="h-4 w-4 text-gray-500" />
	  {/if}
	
	  <span class="font-medium" style="color:{node?.color}">{node?.name}</span>
	
	  <div class="ml-auto flex space-x-1">
		<Button variant="ghost" size="icon" on:click={handleRename} class="p-0 h-6 w-6">
		  <Edit class="h-3 w-3" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleDelete} class="p-0 h-6 w-6">
		  <Trash2 class="h-3 w-3" />
		</Button>
	  </div>
	</div>
	
	<div class="flex justify-between items-center mb-2">
	  <div class="flex space-x-1">
		<Button variant="ghost" size="icon" on:click={handleUpload} class="p-0 h-6 w-6">
		  <Upload class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleSort} class="p-0 h-6 w-6">
		  <ArrowDownWideNarrow class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleCollapseAll} class="p-0 h-6 w-6">
			<ArrowUp10 class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleExpandAll} class="p-0 h-6 w-6">
		  <ArrowDown10 class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleNewFile} class="p-0 h-6 w-6">
		  <File class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon" on:click={handleNewFolder} class="p-0 h-6 w-6">
		  <Folder class="h-4 w-4" />
		</Button>
	  </div>
	  <Input
		placeholder="Search..."
		bind:value={searchText}
		class="w-64"
	  />
	</div>
	
	{#if node?.hasOwnProperty("items") && node.isExpanded}
	  <div class="ml-4">
		<section
		  use:dndzone={{items: node.items, flipDurationMs, centreDraggedOnCursor: true,
			dropTargetStyle: {outline: 'rgba(0, 0, 0, 0.2) solid 2px'}
		  }}
		  on:consider={handleDndConsider}
		  on:finalize={handleDndFinalize}
		  class="rounded-md"
		>
		  {#each filteredNodes as item (item.id)}
			<div animate:flip="{{duration: flipDurationMs}}" class="my-0.5">
			  <svelte:self bind:nodes={nodes} node={nodes[item.id]} />
			</div>
		  {/each}
		</section>
	  </div>
	{/if}