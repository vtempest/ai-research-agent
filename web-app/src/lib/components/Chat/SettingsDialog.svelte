<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { CloudUpload, RefreshCcw, RefreshCw } from 'lucide-svelte';
    import { cn } from '$utils';
    import ThemeSwitcher from './theme/Switcher.svelte';
  
    export let isOpen: boolean;
    export let setIsOpen: (isOpen: boolean) => void;
  
    interface SettingsType {
      chatModelProviders: {
        [key: string]: string[];
      };
      embeddingModelProviders: {
        [key: string]: string[];
      };
      openaiApiKey: string;
      groqApiKey: string;
      anthropicApiKey: string;
      ollamaApiUrl: string;
    }
  
    let config: SettingsType | null = null;
    let selectedChatModelProvider: string | null = null;
    let selectedChatModel: string | null = null;
    let selectedEmbeddingModelProvider: string | null = null;
    let selectedEmbeddingModel: string | null = null;
    let customOpenAIApiKey = '';
    let customOpenAIBaseURL = '';
    let isLoading = false;
    let isUpdating = false;
  
    $: if (isOpen) {
      fetchConfig();
    }
  
    async function fetchConfig() {
      isLoading = true;
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/config`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await res.json() as SettingsType;
      config = data;
  
      const chatModelProvidersKeys = Object.keys(data.chatModelProviders || {});
      const embeddingModelProvidersKeys = Object.keys(data.embeddingModelProviders || {});
  
      const defaultChatModelProvider = chatModelProvidersKeys.length > 0 ? chatModelProvidersKeys[0] : '';
      const defaultEmbeddingModelProvider = embeddingModelProvidersKeys.length > 0 ? embeddingModelProvidersKeys[0] : '';
  
      selectedChatModelProvider = localStorage.getItem('chatModelProvider') || defaultChatModelProvider || '';
      selectedChatModel = localStorage.getItem('chatModel') || (data.chatModelProviders && data.chatModelProviders[selectedChatModelProvider]?.[0]) || '';
      selectedEmbeddingModelProvider = localStorage.getItem('embeddingModelProvider') || defaultEmbeddingModelProvider || '';
      selectedEmbeddingModel = localStorage.getItem('embeddingModel') || (data.embeddingModelProviders && data.embeddingModelProviders[selectedEmbeddingModelProvider]?.[0]) || '';
      customOpenAIApiKey = localStorage.getItem('openAIApiKey') || '';
      customOpenAIBaseURL = localStorage.getItem('openAIBaseURL') || '';
      isLoading = false;
    }
  
    async function handleSubmit() {
      isUpdating = true;
  
      try {
        await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/config`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        });
  
        localStorage.setItem('chatModelProvider', selectedChatModelProvider!);
        localStorage.setItem('chatModel', selectedChatModel!);
        localStorage.setItem('embeddingModelProvider', selectedEmbeddingModelProvider!);
        localStorage.setItem('embeddingModel', selectedEmbeddingModel!);
        localStorage.setItem('openAIApiKey', customOpenAIApiKey);
        localStorage.setItem('openAIBaseURL', customOpenAIBaseURL);
      } catch (err) {
        console.log(err);
      } finally {
        isUpdating = false;
        setIsOpen(false);
        window.location.reload();
      }
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade>
      <div class="fixed inset-0 bg-white/50 dark:bg-black/50" on:click={() => setIsOpen(false)}></div>
      <div class="relative z-10 w-full max-w-md transform rounded-2xl bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl transition-all" transition:scale>
        <h2 class="text-xl font-medium leading-6 dark:text-white">Settings</h2>
        {#if config && !isLoading}
          <div class="flex flex-col space-y-4 mt-6">
            <div class="flex flex-col space-y-1">
              <p class="text-black/70 dark:text-white/70 text-sm">Theme</p>
              <ThemeSwitcher />
            </div>
            {#if config.chatModelProviders}
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Chat model Provider</p>
                <select
                  bind:value={selectedChatModelProvider}
                  on:change={(e) => {
                    if (e.target.value === 'custom_openai') {
                      selectedChatModel = '';
                    } else {
                      selectedChatModel = config.chatModelProviders[e.target.value][0];
                    }
                  }}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                >
                  {#each Object.keys(config.chatModelProviders) as provider}
                    <option value={provider}>
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </option>
                  {/each}
                </select>
              </div>
            {/if}
            {#if selectedChatModelProvider && selectedChatModelProvider !== 'custom_openai'}
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Chat Model</p>
                <select
                  bind:value={selectedChatModel}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                >
                  {#each config.chatModelProviders[selectedChatModelProvider] || [] as model}
                    <option value={model}>{model}</option>
                  {/each}
                  {#if !config.chatModelProviders[selectedChatModelProvider] || config.chatModelProviders[selectedChatModelProvider].length === 0}
                    <option value="" disabled>No models available</option>
                  {/if}
                </select>
              </div>
            {/if}
            {#if selectedChatModelProvider === 'custom_openai'}
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Model name</p>
                <input
                  type="text"
                  placeholder="Model name"
                  bind:value={selectedChatModel}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Custom OpenAI API Key</p>
                <input
                  type="text"
                  placeholder="Custom OpenAI API Key"
                  bind:value={customOpenAIApiKey}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Custom OpenAI Base URL</p>
                <input
                  type="text"
                  placeholder="Custom OpenAI Base URL"
                  bind:value={customOpenAIBaseURL}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                />
              </div>
            {/if}
            <!-- Embedding models -->
            {#if config.embeddingModelProviders}
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Embedding model Provider</p>
                <select
                  bind:value={selectedEmbeddingModelProvider}
                  on:change={(e) => {
                    selectedEmbeddingModel = config.embeddingModelProviders[e.target.value][0];
                  }}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                >
                  {#each Object.keys(config.embeddingModelProviders) as provider}
                    <option value={provider}>
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </option>
                  {/each}
                </select>
              </div>
            {/if}
            {#if selectedEmbeddingModelProvider}
              <div class="flex flex-col space-y-1">
                <p class="text-black/70 dark:text-white/70 text-sm">Embedding Model</p>
                <select
                  bind:value={selectedEmbeddingModel}
                  class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
                >
                  {#each config.embeddingModelProviders[selectedEmbeddingModelProvider] || [] as model}
                    <option value={model}>{model}</option>
                  {/each}
                  {#if !config.embeddingModelProviders[selectedEmbeddingModelProvider] || config.embeddingModelProviders[selectedEmbeddingModelProvider].length === 0}
                    <option value="" disabled>No embedding models available</option>
                  {/if}
                </select>
              </div>
            {/if}
            <div class="flex flex-col space-y-1">
              <p class="text-black/70 dark:text-white/70 text-sm">OpenAI API Key</p>
              <input
                type="text"
                placeholder="OpenAI API Key"
                bind:value={config.openaiApiKey}
                class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <p class="text-black/70 dark:text-white/70 text-sm">Ollama API URL</p>
              <input
                type="text"
                placeholder="Ollama API URL"
                bind:value={config.ollamaApiUrl}
                class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <p class="text-black/70 dark:text-white/70 text-sm">GROQ API Key</p>
              <input
                type="text"
                placeholder="GROQ API Key"
                bind:value={config.groqApiKey}
                class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <p class="text-black/70 dark:text-white/70 text-sm">Anthropic API Key</p>
              <input
                type="text"
                placeholder="Anthropic API key"
                bind:value={config.anthropicApiKey}
                class={cn('bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm')}
              />
            </div>
          </div>
        {/if}
        {#if isLoading}
          <div class="w-full flex items-center justify-center mt-6 text-black/70 dark:text-white/70 py-6">
            <RefreshCcw class="animate-spin" />
          </div>
        {/if}
        <div class="w-full mt-6 space-y-2">
          <p class="text-xs text-black/50 dark:text-white/50">
            We'll refresh the page after updating the settings.
          </p>
          <button
            on:click={handleSubmit}
            class="bg-[#24A0ED] flex flex-row items-center space-x-2 text-white disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#ececec21] rounded-full px-4 py-2"
            disabled={isLoading || isUpdating}
          >
            {#if isUpdating}
              <RefreshCw size={20} class="animate-spin" />
            {:else}
              <CloudUpload size={20} />
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/if}