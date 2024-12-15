<script lang="ts">
    import { Check, ClipboardList } from 'lucide-svelte';
    import type { Message } from '../ChatMain';
  
    export let message: Message;
    export let initialMessage: string;
  
    let copied = false;
  
    function copyToClipboard() {
      const contentToCopy = `${initialMessage}${
        message.sources && message.sources.length > 0
          ? `\n\nCitations:\n${message.sources
              ?.map((source: any, i: number) => `[${i + 1}] ${source.metadata.url}`)
              .join('\n')}`
          : ''
      }`;
      navigator.clipboard.writeText(contentToCopy);
      copied = true;
      setTimeout(() => (copied = false), 1000);
    }
  </script>
  
  <button
    on:click={copyToClipboard}
    class="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
  >
    {#if copied}
      <Check size={18} />
    {:else}
      <ClipboardList size={18} />
    {/if}
  </button>