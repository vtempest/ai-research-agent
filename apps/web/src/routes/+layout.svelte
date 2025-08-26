<script lang="ts">
  import { fade } from "svelte/transition";
  import "../app.css";
  let { children } = $props();
  const duration = 1000;
</script>
<div in:fade={{ duration }} out:fade={{ duration }}>
  {@render children?.()}
</div>