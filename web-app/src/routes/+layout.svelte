<script lang="ts">
  import { fade } from "svelte/transition";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  import "../app.css";
  let { children } = $props();
  const duration = 2000;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        // cacheTime: 1000 * 60 * 30, // 30 minutes
      },
    },
  });
</script>

<div in:fade={{ duration }} out:fade={{ duration }}>
  <QueryClientProvider client={queryClient}>
    {@render children?.()}
  </QueryClientProvider>
</div>
