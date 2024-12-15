<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import MessageInput from './MessageInput.svelte';
    import MessageBox from './MessageBox.svelte';
    import MessageBoxLoading from './MessageBoxLoading.svelte';
    
    export let loading: boolean;
    export let messages: Message[];
    export let sendMessage: (message: string) => void;
    export let messageAppeared: boolean;
    export let rewrite: (messageId: string) => void;
  
    type Message = {
    messageId: string;
    chatId: string;
    createdAt: Date;
    content: string;
    role: "user" | "assistant";
    suggestions?: string[];
    sources?: Document[];
  };

    let dividerWidth = 0;
    let dividerRef: HTMLDivElement;
    let messageEnd: HTMLDivElement;
  
    function updateDividerWidth() {
      if (dividerRef) {
        dividerWidth = dividerRef.scrollWidth;
      }
    }
  
    onMount(() => {
      updateDividerWidth();
      window.addEventListener('resize', updateDividerWidth);
  
      return () => {
        window.removeEventListener('resize', updateDividerWidth);
      };
    });
  
    afterUpdate(() => {
      messageEnd?.scrollIntoView({ behavior: 'smooth' });
  
      if (messages.length === 1) {
        document.title = `${messages[0].content.substring(0, 30)} - Debate AI`;
      }
    });
  </script>
  
  <div class="flex flex-col space-y-6 pt-8 pb-44 lg:pb-32 sm:mx-4 md:mx-8">
    {#each messages as msg, i}
      {@const isLast = i === messages.length - 1}
      <MessageBox
        message={msg}
        messageIndex={i}
        history={messages}
        {loading}
        dividerRef={isLast ? dividerRef : undefined}
        {isLast}
        {rewrite}
        {sendMessage}
      />
      {#if !isLast && msg.role === 'assistant'}
        <div class="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
      {/if}
    {/each}
    {#if loading && !messageAppeared}
      <MessageBoxLoading />
    {/if}
    <div bind:this={messageEnd} class="h-0" />
      <div
        class="bottom-24 lg:bottom-10 fixed z-40 w-[400px] lg:w-[800px]"
      >
      
        <MessageInput {loading} {sendMessage} />
      </div>
  </div>