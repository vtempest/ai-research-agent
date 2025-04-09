<script>
	import FileSystem from './FileSystem.svelte'

  let nodes = {
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
	};
		
for (let i = 5; i < 17; i++) {
  nodes[`node${i}`]={id:`node${i}`, name:`item ${i}`}
}
		
</script>

<div  class="w-[400px]">
<FileSystem node={nodes.node1} bind:nodes={nodes} />
</div>