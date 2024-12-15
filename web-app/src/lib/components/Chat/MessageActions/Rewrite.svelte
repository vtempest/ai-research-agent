<script lang="ts">
    import { ArrowLeftRight } from 'lucide-svelte';
  
    export let rewrite: (messageId: string) => void;
    export let messageId: string;
  
    function handleRewrite() {
      rewrite(messageId);
    }
  </script>
  
  <button
    on:click={handleRewrite}
    class="py-2 px-3 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white flex flex-row items-center space-x-1"
  >
    <ArrowLeftRight size={18} />
    <p class="text-xs font-medium">Rewrite</p>
  </button>