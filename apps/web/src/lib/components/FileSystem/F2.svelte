<script>
	import FileSystem from './FileSystem.svelte'
	import {grab} from 'grab-api.js';
	import { onMount } from 'svelte';


	let nodes = $state({});
	let show = $state(false);

	onMount(async () => {


	window.grabMockServer = {
	  files: { method: "GET", response: {
		node1: {
			name: 'folder 1',
			items: [
				{ id: 'node2' },
				{ id: 'node3' },
				{ id: 'node4' }
			],
			id: 'node1'
		},
		node2: {
			name: 'folder 2',
			items: [
				{ id: 'node5' },
				{ id: 'node6' },
				{ id: 'node7' },
				{ id: 'node8' }
			],
			id: 'node2'
		},
		node3: {
			name: 'folder 3',
			items: [
				{ id: 'node9' },
				{ id: 'node10' },
				{ id: 'node11' },
				{ id: 'node12' }
			],
			id: 'node3'
		},
		node4: {
			name: 'folder 4',
			items: [
				{ id: 'node13' },
				{ id: 'node14' },
				{ id: 'node15' },
				{ id: 'node16' }
			],
			id: 'node4',
			color: 'salmon'
		}
		}
	}	
	};


		await grab("files", nodes);

		for (let i = 5; i < 17; i++) {
			nodes[`node${i}`]={id:`node${i}`, name:`item ${i}`}
		}
		show = true;
		
	});

		

</script>

<div class="w-[400px]">
	{#if show}
		<FileSystem node={nodes.node1} bind:nodes />
	 {:else}
		<div class="flex justify-center items-center h-full">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	{/if}
</div>
