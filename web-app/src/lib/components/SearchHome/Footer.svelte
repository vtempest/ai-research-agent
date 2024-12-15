<script>
  import { FOOTER_LINKS } from "$lib/middleware/config";
</script>

<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-slate-300 text-xs z-20 whitespace-nowrap">
  {#each FOOTER_LINKS as { url, text }}
    <a target="_blank" href={url} class="mr-4 hover:underline" style="display: inline-block;">{text}</a>
  {/each}
</div>
