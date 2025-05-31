<script lang="ts">
  /**
   * Footer component that displays a list of links with optional emojis
   * @component
   * @param {Object} props - Component props
   * @param {Array<{url: string, text: string, emoji: string}>} [props.listFooterLinks] - Array of footer links with their properties
   * @param {boolean} [props.optionShowEmoji=true] - Whether to show emojis next to links
   * @param {string} [props.optionBackgroundColor="bg-black/40"] - Background color class for the footer
   */
  let {
    listFooterLinks = [],
    optionShowEmoji = true,
    optionBackgroundColor = "bg-black/40",
  }: Partial<{
    listFooterLinks: {
      url: string;
      text: string;
      emoji: string;
    }[];
    optionShowEmoji: boolean;
    optionBackgroundColor: string;
  }> = $props();
</script>
<div
  class="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-200 text-xs z-20 {optionBackgroundColor} rounded-lg px-2 py-1 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>
  {#each listFooterLinks as { url, text, emoji }}
    <a
      target={url.startsWith("http") ? "_blank" : ""}
      href={url}
      class="mr-4 relative group"
    >
      {#if optionShowEmoji}
        <span class="mr-1">{emoji}</span>
      {/if}{text}<span
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
