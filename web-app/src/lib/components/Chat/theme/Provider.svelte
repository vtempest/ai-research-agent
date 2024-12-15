<script lang="ts" context="module">
    import { writable } from 'svelte/store';
  
    export const theme = writable('dark');
  
    export function setTheme(newTheme: string) {
      theme.set(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  
    export function getTheme(): string {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'dark';
      }
      return 'dark';
    }
  </script>
  
  <script lang="ts">
    import { onMount } from 'svelte';
  
    onMount(() => {
      const savedTheme = getTheme();
      setTheme(savedTheme);
    });
  </script>
  
  <slot></slot>