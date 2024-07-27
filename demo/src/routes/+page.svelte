<script>
  import Autocomplete from "$lib/Autocomplete.svelte";
  import { onMount, onDestroy } from "svelte";

</script>

<svelte:head>
  <title>AutoComplete - Wiki Phrases Tokenizer </title>
</svelte:head>

<main
  class=" flex  h-screen w-full flex-col justify-center items-center"

> 
<a class="github-fork-ribbon" href="https://github.com/vtempest/wiki-phrase-tokenizer/" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>

<Autocomplete />
  
</main>
