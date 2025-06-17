<script lang="ts">
    import type {SettingsStore} from './setttingsStore';
    import {getContext} from 'svelte';
    import {isDevPlayground} from './appSettings';
    import Switch from '../ui/Switch.svelte';
  
    const settings: SettingsStore = getContext('settings');
  
    const windowLocation = window.location;
    let measureTypingPerf: boolean,
      isCollab: boolean,
      isRichText: boolean,
      isMaxLength: boolean,
      isCharLimit: boolean,
      isCharLimitUtf8: boolean,
      isAutocomplete: boolean,
      showTreeView: boolean,
      showNestedEditorTreeView: boolean,
      disableBeforeInput: boolean,
      showTableOfContents: boolean;
  
    $: {
      measureTypingPerf = $settings.measureTypingPerf;
      isCollab = $settings.isCollab;
      isRichText = $settings.isRichText;
      isMaxLength = $settings.isMaxLength;
      isCharLimit = $settings.isCharLimit;
      isCharLimitUtf8 = $settings.isCharLimit;
      isAutocomplete = $settings.isAutocomplete;
      showTreeView = $settings.showTreeView;
      showNestedEditorTreeView = $settings.showNestedEditorTreeView;
      disableBeforeInput = $settings.disableBeforeInput;
      showTableOfContents = $settings.showTableOfContents;
    }
  
    let showSettings = false;
    const parentWindow = window.parent;
    const search = windowLocation.search;
    const isSplitScreen =
      parentWindow && parentWindow.location.pathname === '/split/';
  </script>
  
  <button
    id="options-button"
    class={`editor-dev-button ${showSettings ? 'active' : ''}`}
    onclick={() => (showSettings = !showSettings)} />
  {#if showSettings}
    <div class="switches">
      {#if isRichText && isDevPlayground}
        <Switch
          onclick={() => {
            settings.setOption('isCollab', !isCollab);
            window.location.reload();
          }}
          checked={isCollab}
          text="Collaboration" />
      {/if}
      {#if isDevPlayground}
        <Switch
          onclick={() => {
            if (isSplitScreen) {
              window.parent.location.href = `/${search}`;
            } else {
              window.location.href = `/split/${search}`;
            }
          }}
          checked={isSplitScreen}
          text="Split Screen" />
      {/if}
      <Switch
        onclick={() => settings.setOption('showTreeView', !showTreeView)}
        checked={showTreeView}
        text="Debug View" />
      <Switch
        onclick={() => {
          settings.setOption('isRichText', !isRichText);
          settings.setOption('isCollab', false);
        }}
        checked={isRichText}
        text="Rich Text" />
    </div>
  {/if}
  
  <style>
    /* Add any necessary styles here */
    .editor-dev-button {
      /* Button styles */
    }
  
    .switches {
      /* Switches container styles */
    }
  </style>