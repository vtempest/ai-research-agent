<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { playSoundEffect, SoundEffect } from '$lib/components/AppLayout/sound-effects';
	import { Button } from '$lib/components/ui/button';
	import { Folder, File, ChevronRight, ChevronDown, Edit, Trash2 } from 'lucide-svelte';
	
	export let nodes: Record<string, any>;
	export let node: any;
	
	let isExpanded = true;
	const flipDurationMs = 300;
  
	function handleDndConsider(e: CustomEvent) {
	  node.items = e.detail.items;
	}
  
	function handleDndFinalize(e: CustomEvent) {
	  node.items = e.detail.items;
	  nodes = {...nodes};
	  playSoundEffect(SoundEffect.bloop);
	}
  
	function toggleExpand() {
	  isExpanded = !isExpanded;
	}
  
	function handleRename() {
	  // Implement rename logic here
	}
  
	function handleDelete() {
	  // Implement delete logic here
	}
  </script>
  
  <div class="flex items-center space-x-1 p-1 hover:bg-gray-100 rounded-md text-sm">
	<Button variant="ghost" size="icon" on:click={toggleExpand} class="p-0 h-6 w-6">
	  {#if node?.hasOwnProperty("items")}
		{#if isExpanded}
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
  
  {#if node?.hasOwnProperty("items") && isExpanded}
	<div class="ml-4">
	  <section
		use:dndzone={{items: node.items, flipDurationMs, centreDraggedOnCursor: true,
			dropTargetStyle: {outline: 'rgba(0, 0, 0, 0.2) solid 2px'}
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="rounded-md"
	  >
		{#each node.items as item (item.id)}
		  <div animate:flip="{{duration: flipDurationMs}}" class="my-0.5">
			<svelte:self bind:nodes={nodes} node={nodes[item.id]} />
		  </div>
		{/each}
	  </section>
	</div>
  {/if}