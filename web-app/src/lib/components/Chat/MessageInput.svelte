<script lang="ts">
    import { onMount } from 'svelte';
    import { ArrowUp } from 'lucide-svelte';
    import Attach from './MessageInputAttach.svelte';
    import { cn } from '$utils';
  
    export let sendMessage: (message: string) => void;
    export let loading: boolean;
  
    let message = '';
    let textareaRows = 1;
    let mode: 'multi' | 'single' = 'single';
    let inputElement: HTMLTextAreaElement;
  
    $: {
      if (textareaRows >= 2 && message && mode === 'single') {
        mode = 'multi';
      } else if (!message && mode === 'multi') {
        mode = 'single';
      }
    }
  
    function handleSubmit(e: Event) {
      if (loading) return;
      e.preventDefault();
      sendMessage(message);
      message = '';
    }
  
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && !e.shiftKey && !loading) {
        e.preventDefault();
        sendMessage(message);
        message = '';
      }
    }
  
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === '/') {
        e.preventDefault();
        inputElement?.focus();
      }
    }
  
    onMount(() => {
      document.addEventListener('keydown', handleGlobalKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    });
  </script>
  
  <form
    on:submit={handleSubmit}
    on:keydown={handleKeyDown}
    class={cn(
      'bg-white dark:bg-dark-secondary p-4 flex items-center overflow-hidden border border-light-200 dark:border-dark-200',
      mode === 'multi' ? 'flex-col rounded-lg' : 'flex-row rounded-full'
    )}
  >
    {#if mode === 'single'}
      <Attach />
    {/if}
    <input
      bind:this={inputElement}
      bind:value={message}
      on:heightChange={(e) => {
        textareaRows = Math.ceil(e.detail.height / e.detail.rowHeight);
      }}
      class="transition bg-transparent  dark:placeholder:text-white/50 placeholder:text-sm text-sm dark:text-white resize-none focus:outline-none w-full px-2 max-h-24 lg:max-h-36 xl:max-h-48 flex-grow flex-shrink"
      placeholder="Ask a follow-up"
    />
    {#if mode === 'single'}
      <div class="flex flex-row items-center space-x-4">
        <button
          disabled={message.trim().length === 0 || loading}
          class="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
        >
          <ArrowUp class="bg-background" size={17} />
        </button>
      </div>
    {/if}
    {#if mode === 'multi'}
      <div class="flex flex-row items-center justify-between w-full pt-2">
        <Attach />
        <div class="flex flex-row items-center space-x-4">
          <button
            disabled={message.trim().length === 0 || loading}
            class="bg-[#24A0ED] text-white text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
          >
            <ArrowUp class="bg-background" size={17} />
          </button>
        </div>
      </div>
    {/if}
  </form>