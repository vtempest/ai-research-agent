<script lang="ts">
    // import Home from "$lib/components/Home/Home.svelte";

    export let sendMessage: (message: string) => void;
    export let focusMode: string;
    export let setFocusMode: (mode: string) => void;
  </script>
  
  <div class="relative">
     <!-- <Home 
        {sendMessage}
        {focusMode}
        {setFocusMode}
      /> -->
  </div>