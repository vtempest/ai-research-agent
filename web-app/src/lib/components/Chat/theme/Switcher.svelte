<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-svelte';
    import  Select from '../SettingsDialog.svelte';
  
    export let className: string = '';
  
    type Theme = 'dark' | 'light' | 'system';
  
    const theme = writable<Theme>('system');
    let mounted = false;
  
    function setTheme(newTheme: Theme) {
      theme.set(newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    }
  
    function handleThemeSwitch(event: Event) {
      const target = event.target as HTMLSelectElement;
      setTheme(target.value as Theme);
    }
  
    function detectSystemTheme(event?: MediaQueryListEvent) {
      const darkModeOn = event ? event.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(darkModeOn ? 'dark' : 'light');
    }
  
    onMount(() => {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        detectSystemTheme();
      }
  
      const preferDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      preferDarkScheme.addListener(detectSystemTheme);
  
      mounted = true;
  
      return () => {
        preferDarkScheme.removeListener(detectSystemTheme);
      };
    });
  
    $: if (mounted && $theme === 'system') {
      detectSystemTheme();
    }
  </script>
  
  {#if mounted}
    <Select
      class={className}
      value={$theme}
      on:change={handleThemeSwitch}
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' }
      ]}
    />
  {/if}