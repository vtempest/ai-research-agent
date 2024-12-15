<script lang="ts">
  	let { children } = $props();
    import { fade } from "svelte/transition";

  import "../app.css";
</script>

<div in:fade={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
  <!-- {@render children?.()} -->
  <slot />

</div>