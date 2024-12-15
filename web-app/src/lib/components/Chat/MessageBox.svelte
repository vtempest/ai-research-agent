<script lang="ts">
    import { onMount } from 'svelte';
    import { BookCopy, Disc3, Volume2, StopCircle, Layers3, Plus } from 'lucide-svelte';
    import Markdown from 'svelte-markdown';
    import { cn } from '$utils';
    import Copy from './MessageActions/Copy.svelte';
    import Rewrite from './MessageActions/Rewrite.svelte';
    import MessageSources from './MessageSources.svelte';
    import SearchImages from './SearchImages.svelte';
    import SearchVideos from './SearchVideos.svelte';
  
    export let message: Message;
    export let messageIndex: number;
    export let history: Message[];
    export let loading: boolean;
    export let dividerRef: HTMLDivElement | null = null;
    export let isLast: boolean;
    export let rewrite: (messageId: string) => void;
    export let sendMessage: (message: string) => void;
  
    type Message = {
      messageId: string;
      chatId: string;
      createdAt: Date;
      content: string;
      role: 'user' | 'assistant';
      suggestions?: string[];
      sources?: Document[];
    };

    let parsedMessage = message.content;
    let speechMessage = message.content;
    let speechStatus: 'idle' | 'started' = 'idle';
  
    $: {
      const regex = /\[(\d+)\]/g;
  
      if (message.role === 'assistant' && message?.sources && message.sources.length > 0) {
        parsedMessage = message.content.replace(
          regex,
          (_, number) =>
            `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" class="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`
        );
      } else {
        speechMessage = message.content.replace(regex, '');
        parsedMessage = message.content;
      }
    }
  
    function handleSpeech() {
      if (speechStatus === 'started') {
        // stop();
        speechStatus = 'idle';
      } else {
        // start();
        speechStatus = 'started';
      }
    }
  </script>
  
  <div>
    {#if message.role === 'user'}
      <div class={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
        <h2 class="text-black dark:text-white font-medium text-3xl lg:w-9/12">
          {message.content}
        </h2>
      </div>
    {/if}
  
    {#if message.role === 'assistant'}
      <div class="flex flex-col space-y-9 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-9">
        <div bind:this={dividerRef} class="flex flex-col space-y-6 w-full lg:w-9/12">
          {#if message.sources && message.sources.length > 0}
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row items-center space-x-2">
                <BookCopy class="text-black dark:text-white" size={20} />
                <h3 class="text-black dark:text-white font-medium text-xl">
                  Sources
                </h3>
              </div>
              <MessageSources sources={message.sources} />
            </div>
          {/if}
          <div class="flex flex-col space-y-2">
            <div class="flex flex-row items-center space-x-2">
              <Disc3
                class={cn(
                  'text-black dark:text-white',
                  isLast && loading ? 'animate-spin' : 'animate-none'
                )}
                size={20}
              />
              <h3 class="text-black dark:text-white font-medium text-xl">
                Answer
              </h3>
            </div>
            <Markdown
              source={parsedMessage}
              class={cn(
                'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
                'max-w-none break-words text-black dark:text-white text-sm md:text-base font-medium'
              )}
            />
            {#if !(loading && isLast)}
              <div class="flex flex-row items-center justify-between w-full text-black dark:text-white py-4 -mx-2">
                <div class="flex flex-row items-center space-x-1">
                  <Rewrite {rewrite} messageId={message.messageId} />
                </div>
                <div class="flex flex-row items-center space-x-1">
                  <Copy initialMessage={message.content} {message} />
                  <button
                    on:click={handleSpeech}
                    class="p-2 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white"
                  >
                    {#if speechStatus === 'started'}
                      <StopCircle size={18} />
                    {:else}
                      <Volume2 size={18} />
                    {/if}
                  </button>
                </div>
              </div>
            {/if}
            {#if isLast && message.suggestions && message.suggestions.length > 0 && message.role === 'assistant' && !loading}
              <div class="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
              <div class="flex flex-col space-y-3 text-black dark:text-white">
                <div class="flex flex-row items-center space-x-2 mt-4">
                  <Layers3 />
                  <h3 class="text-xl font-medium">Related</h3>
                </div>
                <div class="flex flex-col space-y-3">
                  {#each message.suggestions as suggestion, i}
                    <div class="flex flex-col space-y-3 text-sm">
                      <div class="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                      <div
                        on:click={() => sendMessage(suggestion)}
                        class="cursor-pointer flex flex-row justify-between font-medium space-x-2 items-center"
                      >
                        <p class="transition duration-200 hover:text-[#24A0ED]">
                          {suggestion}
                        </p>
                        <Plus size={20} class="text-[#24A0ED] flex-shrink-0" />
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
        <div class="lg:sticky lg:top-20 flex flex-col items-center space-y-3 w-full lg:w-3/12 z-30 h-full pb-4">
          <SearchImages
            query={history[messageIndex - 1].content}
            chat_history={history.slice(0, messageIndex - 1)}
          />
          <SearchVideos
            chat_history={history.slice(0, messageIndex - 1)}
            query={history[messageIndex - 1].content}
          />
        </div>
      </div>
    {/if}
  </div>