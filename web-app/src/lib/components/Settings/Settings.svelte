<script lang="ts">
  import { writable } from 'svelte/store';
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Switch } from "$lib/components/ui/switch";
  import { Search, Key, Type, ExternalLink } from "lucide-svelte";

  const formStore = writable({
    searchEngine: 'google',
    groqApiKey: '...',
    favoriteFont: 'Inter',
    darkMode: false
  });

  const searchEngines = [
    { value: "google", label: "Google" },
    { value: "bing", label: "Bing" },
    { value: "duckduckgo", label: "DuckDuckGo" },
  ];

  const fonts = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
  ];

  function handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission
    console.log($formStore);
  }

  // CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/deed.en

</script>


<svelte:head>
	<title>Configure </title>
	
</svelte:head>

<form on:submit={handleSubmit} class="flex flex-wrap gap-4 p-4">
  <div class="w-full md:w-1/2 space-y-6">
    <div>
      <label class="flex items-center gap-2 mb-2">
        <Search size={16} />
        Preferred Search Engine
      </label>
      <Select.Root bind:value={$formStore.searchEngine}>
        <Select.Trigger class="w-full bg-white">
          <Select.Value placeholder="Select search engine" />
        </Select.Trigger>
        <Select.Content class="bg-white">
          {#each searchEngines as engine}
            <Select.Item value={engine.value}>{engine.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div>
      <div class="flex items-center justify-between mb-2">
        <label for="groq-api-key" class="flex items-center gap-2">
          <Key size={16} />
          Groq API Key
        </label>
        <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
          Get Free API Key 
          <ExternalLink size={14} />
        </a>
      </div>
      <Input id="groq-api-key" type="password" bind:value={$formStore.groqApiKey} placeholder="Enter your Groq API key" />
    </div>
  </div>

  <div class="w-full md:w-1/2 space-y-6">
    <div>
      <label class="flex items-center gap-2 mb-2">
        <Type size={16} />
        Preferred Font
      </label>
      <Select.Root bind:value={$formStore.favoriteFont}>
        <Select.Trigger class="w-full bg-white">
          <Select.Value placeholder="Select favorite font" />
        </Select.Trigger>
        <Select.Content class="bg-white">
          {#each fonts as font}
            <Select.Item value={font.value}>{font.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <div class="flex items-center space-x-2">
      <Switch id="dark-mode" bind:checked={$formStore.darkMode} />
      <label for="dark-mode">Dark Mode</label>
    </div>

    <Button type="submit" class="w-full">Save Settings</Button>
  </div>
</form>

<style>
  /* Add any additional styles here if needed */
  label {
    font-weight: 500;
  }
</style>