<script>
  import { FOOTER_LINKS } from "$lib/middleware/config";
  let line;
</script>

<div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-600 text-xs z-20">
  {#each FOOTER_LINKS as { url, text }}
    <a target="_blank" href={url} class="mr-4 relative" on:mouseover={() => { line.style.animation = 'underline 0.5s ease-out forwards'; }} on:mouseout={() => { line.style.animation = 'none'; }}>
      {text}
      <span class="absolute inset-0 w-0 h-0.5 bg-current transition duration-200 ease-out" ref={el => line = el}></span>
    </a>
  {/each}
</div>

<style>
  @keyframes underline {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
</style>
