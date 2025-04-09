<script lang="ts">
  let {
    listFooterLinks = [],
  }: {
    listFooterLinks: {
      url: string;
      text: string;
    }[];
  } = $props();
</script>

<div
  class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-200 text-xs z-20"
>
  {#each listFooterLinks as { url, text }}
    <a
      target={url.startsWith("http") ? "_blank" : ""}
      href={url}
      class="mr-4 relative group"
    >
      {text}<span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"
      ></span></a
    >
  {/each}
</div>

<style>
  @keyframes underline {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
</style>
