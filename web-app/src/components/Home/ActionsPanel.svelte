<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Highlighter, Underline, Eraser, Pencil, ChevronLeft, ChevronRight, Clipboard, Bot } from 'lucide-svelte';
    import { ChatGroq } from '@langchain/groq';
    import { HumanMessage } from '@langchain/core/messages';
    import { apiKey, defaultPrompt, enumLLMs } from '$lib/config/config';
    
    import {convertMarkdownToHtml} from "./markdown-to-html";

    export let selectedArticle: any;
    
    const dispatch = createEventDispatcher();
    
    let activeMode: string | null = null;
    let aiResponse = '';
    let status = 'idle';
    let errorMessage = '';
    let userPrompt = defaultPrompt;
    let isExpanded = true;
    let showCopiedMessage = false;
    let isEditModeEnabled = false;
    
    let modelChoice: number;
    $: model = enumLLMs[modelChoice];
    
    function toggleMode(mode: string) {
      activeMode = activeMode === mode ? null : mode;
      dispatch('toggleMarkupMode', activeMode);
    }
    
    function onChangeTextSize(size: 'small' | 'medium' | 'large') {
      dispatch('changeTextSize', size);
    }
    
    function onToggleImages(action: 'show' | 'hide') {
      dispatch('toggleImages', action);
    }
    
    async function generateAISummary() {
      if (!selectedArticle) return;
    
      status = 'calling-ai';
      errorMessage = '';
      try {
        modelChoice = Math.floor(Math.random() * enumLLMs.length);
        model = enumLLMs[modelChoice];
    
        const chat = new ChatGroq({
          apiKey,
          model,
        });
    
        const contextLimit = 5000;
        const context = selectedArticle?.html?.slice(0, contextLimit);
    
        const messages = [new HumanMessage(`${userPrompt} ${context}`)];
        const response = await chat.invoke(messages);
        aiResponse = convertMarkdownToHtml(response.content);
      } catch (error) {
        console.error('Error calling AI API:', error);
        errorMessage = error.response?.status === 429
          ? 'Rate limit exceeded. Please wait before trying again.'
          : 'Failed to generate AI summary. Please try again later.';
        aiResponse = '';
      } finally {
        status = 'idle';
      }
    }
    
    function toggleExpand() {
      isExpanded = !isExpanded;
    }
    
    function copyHtmlToClipboard() {
      if (!selectedArticle) return;

    
      const htmlBlob = new Blob([selectedArticle.html], { type: 'text/html' });
      const textBlob = new Blob([selectedArticle.html], { type: 'text/plain' });
      const clipboardItem = new window.ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      });
      navigator.clipboard.write([clipboardItem]).then(() => {
        showCopiedMessage = true;
        setTimeout(() => {
          showCopiedMessage = false;
        }, 2000);
      });
    }
    
    function handleEditMode() {
      isEditModeEnabled = !isEditModeEnabled;
      dispatch('toggleEditMode', isEditModeEnabled);
    }
    </script>
    
    <div class="w-full  h-full overflow-y-auto transition-all duration-300" id="sidebar">
      {#if isExpanded}
        <div id="expanded-content" class="p-2 space-y-2">
          <!-- <div class="flex justify-between items-center">
            <button on:click={toggleExpand} class="hover:text-slate-200 focus:outline-none">
              <ChevronRight />
            </button>
          </div> -->
<!--     
          <div class="space-y-2">
            <span class="text-xs font-medium">Markup Tools</span>
            <div class="flex flex-wrap gap-2">
              <button on:click={() => toggleMode('highlight')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="highlight-btn">
                <Highlighter class="mr-1" />
                Highlight
              </button>
              <button on:click={() => toggleMode('underline')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="underline-btn">
                <Underline class="mr-1" />
                Underline
              </button>
              <button on:click={() => toggleMode('eraser')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="eraser-btn">
                <Eraser class="mr-1" />
                Eraser
              </button>
            </div>
          </div> -->
    
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium">Words: <span id="word-count">0</span></span>
              <div class="relative">
                <button on:click={copyHtmlToClipboard} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300">
                  <Clipboard class="mr-1" />
                  Copy
                </button>
                {#if showCopiedMessage}
                  <div class="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-500 text-white text-xs rounded-md">
                    Copied!
                  </div>
                {/if}
              </div>
            </div>
          </div>
    
          <!-- <div class="space-y-2">
            <button on:click={handleEditMode} class="w-full px-2 py-1 text-sm flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300" id="edit-mode-btn">
              <Pencil class="mr-1" />
              {isEditModeEnabled ? 'Disable' : 'Enable'} Edit Mode
            </button>
          </div> -->
    
          <div class="space-y-2">
            <input
              bind:value={userPrompt}
              id="summary-prompt"
              type="text"
              placeholder="Ask AI any question..."
              class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button
              on:click={generateAISummary}
              on:keydown={(e) => e.key === 'Enter' && generateAISummary()}
              disabled={status === 'calling-ai'}
              class="w-full px-2 py-1 text-sm flex items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              id="ai-generate-btn"
            >
              <Bot class="mr-2" />
              {status === 'calling-ai' ? 'Generating...' : 'AI Generate'}
            </button>
          </div>
    
          {#if errorMessage}
            <div class="bg-red-500 text-white p-2 rounded-md">{errorMessage}</div>
          {/if}
    
          {#if aiResponse}
            <div class="text-md rounded-md p-2 h-full overflow-y-auto bg-gray-100">
              {@html aiResponse}
            </div>
          {/if}
        </div>
      {:else}
        <div id="collapsed-content" class="p-2">
          <button on:click={toggleExpand} class="px-2 py-1 rounded-md hover:bg-gray-200">
            <ChevronLeft />
          </button>
        </div>
      {/if}
    </div>