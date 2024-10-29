<script lang="ts">
  import { onMount } from "svelte";
  import "./icons-download.css";

  import Footer from "./Footer.svelte";

  import iconQwkLogo from "$lib/icons/qwk-logo.svg";

  export let selectedArticle = null;
  export let topicsObject = null

  import { onDestroy } from "svelte";
  const paletteColors = [
    '#FFB3BA', // Pastel Pink
    '#BAFFC9', // Pastel Green
    '#BAE1FF', // Pastel Blue
    '#FFFFBA', // Pastel Yellow
    '#FFDFBA', // Pastel Orange
    '#E0BBE4', // Pastel Purple
    '#FFD1DC', // Light Pink
    '#C1FFC1', // Light Mint
    '#CAE1FF', // Light Sky Blue
    '#FDFD96', // Pastel Lemon
    '#FFF5EE', // Seashell
    '#E6E6FA', // Lavender
    '#F0FFF0', // Honeydew
    '#F0F8FF', // Alice Blue
    '#FFF0F5'  // Lavender Blush
  ];

  function getRandomColor() {
    return paletteColors[Math.floor(Math.random() * paletteColors.length)];
  }

  let colorMap = new Map();
  let usedColors = new Set();
  function toggleKeyphrase(keyphrase: string): void {
    if (!topicsObject || !topicsObject.keyphrases) return;

    topicsObject = {
      ...topicsObject,
      keyphrases: topicsObject.keyphrases.map(topic => {
        if (topic.keyphrase === keyphrase) {
          if (!topic.enabled) {
            let newColor;
            do {
              newColor = getRandomColor();
            } while (usedColors.has(newColor));
            usedColors.add(newColor);
            colorMap.set(keyphrase, newColor);
          } else {
            usedColors.delete(colorMap.get(keyphrase));
            colorMap.delete(keyphrase);
          }
          return { ...topic, enabled: !topic.enabled };
        }
        return topic;
      })
    };
  }

  function getColor(keyphrase: string): string {
    const topic = topicsObject?.keyphrases?.find(t => t.keyphrase === keyphrase);
    if (topic && topic.enabled) {
      return colorMap.get(keyphrase) || 'gray';
    }
    return 'gray';
  }

  onDestroy(() => {
    colorMap.clear();
  });
</script>
<div class="article-container read-view h-full overflow-y-auto p-3">
  {#if selectedArticle && selectedArticle.html}
    <div class="bg-white rounded-lg shadow-md p-2 mb-1  text-gray-700">
      {#if selectedArticle.author_cite }
        {selectedArticle.author_cite.replace(/,\s*(\S+)/, (_, firstName) => `, ${firstName[0]}.`)} 
        {selectedArticle.date ? `(${new Date(selectedArticle.date).getFullYear()}, ${new Date(selectedArticle.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric'})}).` : ''}
        <strong>{selectedArticle?.title || ''}</strong>. <i>{selectedArticle?.source || ''}</i>.
        <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">{selectedArticle.url}</a>
      {/if}
    </div>
    <p class="text-sm text-gray-500 mb-0">
      {selectedArticle.word_count || ""} words
    </p>
    
    {#if topicsObject }
    <p class="text-sm text-gray-500 mb-0">

      {#each topicsObject.keyphrases as topic}
        <span 
          class="text-sm mb-0 inline-block border rounded-full px-2 py-1 mr-1 mb-1 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:transform hover:translate-y-[-2px]"
          style="color: {getColor(topic.keyphrase)}; background-color: {topic.enabled ? 'gray' : 'transparent'};"
          on:click={() => toggleKeyphrase(topic.keyphrase)}
        >
          {topic.keyphrase}
        </span>
      {/each}
    </p>
    {/if}
    <div class="article prose prose-sm max-w-none">
      {@html selectedArticle.html}
    </div>
  {:else}
    <div class="relative h-full text-lg text-gray-500 text-center">
      <h3 class="text-xl text-gray-500 text-center">
        <img
          src={iconQwkLogo}
          alt="Qwk Logo"
          width="200px"
          class="text-lg text-gray-500 mx-auto block mb-0"
        />
        <!-- Whatever the future of research can be,
        <br />that is what it must become. -->
        Reimagine the Internet as Self-Organizing Mind Map
      </h3>
      <p class="text-lg text-gray-500 text-center">
        <!-- Use WASD to scroll and navigate. -->
      </p>
      <p class="text-lg text-gray-500 text-center justify-center">
        <a
          class="download-chrome download-btn text-center justify-center"
          target="_blank"
          href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko"
        >
          <a
            class="download-windows download-btn text-center justify-center"
            target="_blank"
            href="https://apps.microsoft.com/detail/9pcgf9gnk460?rtc=1&hl=en-us&gl=US"
          >
          </a>
        </a>
      </p>

      <div
        class="absolute bottom-0 w-full text-center text-slate-500 text-xs z-20"
      >
        <Footer />
      </div>
    </div>
  {/if}
</div>

<style>
  .article {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  :global(.article p) {
    margin-top: 16px;
  }

  :global(.article a) {
    color: #3a3c3f;
    font-weight: 500;
    text-decoration: underline 1px;
  }

  /* Optional: Add some additional styles to take advantage of the new fonts */
  :global(h1, h2, h3, h4, h5, h6) {
    font-weight: 700;
  }

  :global(li *) {
    display: inline;
  }

  :global(.article img) {
    max-width: 96%;
    display: block;
    height: auto;
  }
</style>
