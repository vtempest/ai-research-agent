<script lang="ts">
  import * as LucideIcons from "lucide-svelte";

  /**
   * Footer component that displays a list of links with optional emojis
   * @component
   * @param {Object} props - Component props
   * @param {Array<{url: string, text: string, emoji: string}>} [props.listFooterLinks] - Array of footer links with their properties
   * @param {boolean} [props.optionShowIcons=true] - Whether to show emojis next to links
   * @param {string} [props.optionBackgroundColor="bg-black/40"] - Background color class for the footer
   */
  let {
    listFooterLinks = [],
    optionShowIcons = true,
    optionBackgroundColor = "bg-black/40",
  }: {
    listFooterLinks: {
      url: string;
      text: string;
      icon?: string;
    }[];
    optionShowIcons?: boolean;
    optionBackgroundColor?: string;
  } = $props();
</script>
<div
  class="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-200 text-sm z-20 {optionBackgroundColor} rounded-lg px-2 py-1 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-wrap items-center justify-center gap-x-6 max-w-[90vw]"
>
  <div class="max-w-4xl mx-auto grid grid-cols-2 gap-2">
    {#each listFooterLinks as { url, text, icon }}
      {@const IconComponent = LucideIcons[icon]}

      <a
        target={url.startsWith("http") ? "_blank" : ""}
        href={url}
        class="relative group inline-flex items-center gap-1 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 whitespace-nowrap"
      >
        {#if optionShowIcons && IconComponent}
          <IconComponent size={14} />
        {/if}
        <span class="font-semibold tracking-wide text-md" style="font-variant: small-caps">{text}</span>
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        ></span>
      </a>
    {/each}
  </div>
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