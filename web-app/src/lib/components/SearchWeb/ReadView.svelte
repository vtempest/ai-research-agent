<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  // import "./icons-download.css";
  import { highlightCodeSyntax } from "$ai-research-agent";
  import "highlight.js/styles/monokai.css"; // Choose your preferred style

  import Footer from "$lib/components/AppLayout/Footer.svelte";

  import iconQwkLogo from "$lib/components/icons/icon-qwksearchlogo.svg";

  import EditorComponent from "$lib/components/Editor/EditorComponent.svelte";
  import { FOOTER_LINKS, APP_NAME, APP_SLOGAN } from "$lib/custom-domain";

  let editor;
  let {
     currentArticle, 
    topicsObject, 
    fetchArticle = () => {},
    summarizeArticle = () => {} 
  } = $props() as any;

  
  const paletteColors = [
    "#FFB3BA", // Pastel Pink
    "#BAFFC9", // Pastel Green
    "#BAE1FF", // Pastel Blue
    "#FFFFBA", // Pastel Yellow
    "#FFDFBA", // Pastel Orange
    "#E0BBE4", // Pastel Purple
    "#FFD1DC", // Light Pink
    "#C1FFC1", // Light Mint
    "#CAE1FF", // Light Sky Blue
    "#FDFD96", // Pastel Lemon
    "#FFF5EE", // Seashell
    "#E6E6FA", // Lavender
    "#F0FFF0", // Honeydew
    "#F0F8FF", // Alice Blue
    "#FFF0F5", // Lavender Blush
  ];

  onMount(async () => {
    setupRemoveErrorImages();
  });

  //remove images that don't load
  function setupRemoveErrorImages() {
    if (document.querySelector(".read-view"))
      new MutationObserver(() => {
        document
          .querySelector(".read-view")
          .querySelectorAll("img")
          .forEach((node) => {
            node.addEventListener("error", () => {
              node.remove();
            });
            node.onerror = () => {
              node.remove();
            };
          });
      })?.observe(document.querySelector(".read-view"), {
        childList: true,
        subtree: true,
      });
  }

  const optionOpenInNewTab = false;

  /**
   * Click link: fetches the article and loads in Internal Basic Browser
   * Ctrl+click: Opens the article in a new tab in the user's real browser
   * @param {MouseEvent} event - The click event.
   */
  function handleBrowserClick(event) {
    if (event.target.closest("a") || event.target.tagName === "A") {
      var targetURL = event.target.closest("a").href || event.target.href;
      //allow on page anchor links
      if (targetURL.includes(currentArticle.url.split("#")?.[0]+"#")) {
        event.preventDefault();
        var anchor = targetURL.split("#")?.[1];
        var element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        event.preventDefault();
        return;
      };

      if (!targetURL.startsWith("http")) return;

      event.preventDefault();
      var isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;

      if (optionOpenInNewTab || isCtrlOrMetaPressed)
        window.open(targetURL, "_blank");
      else fetchArticle(targetURL, 0);
    }
  }

  function getRandomColor() {
    return paletteColors[Math.floor(Math.random() * paletteColors.length)];
  }

  let colorMap = new Map();
  let usedColors = new Set();
  function toggleKeyphrase(keyphrase: string): void {
    if (!topicsObject ) return;

    topicsObject = topicsObject.map((topic) => {
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
  }

  function getColor(keyphrase: string): string {
    const topic = topicsObject?.find(
      (t) => t.keyphrase === keyphrase
    );
    if (topic && topic.enabled) {
      return colorMap.get(keyphrase) || "gray";
    }
    return "gray";
  }

  onDestroy(() => {
    colorMap.clear();
  });
</script>

<div class="article-container read-view h-full overflow-y-auto p-3">
  {#if currentArticle && currentArticle.html}
    {#if currentArticle.cite}
      <p class="text-md mb-0">
        {@html currentArticle.cite}
      </p>
    {/if}
    {#if currentArticle.word_count}
      <p class="text-sm text-gray-500 mb-0">
        {currentArticle.word_count} words
      </p>
    {/if}

    <!-- {#if topicsObject} -->
      <p class="text-sm text-gray-500 mb-0">
        {#each topicsObject as topic}
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
          <span
            class="text-sm mb-0 inline-block border rounded-full px-2 py-1 mr-1 mb-1 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:transform hover:translate-y-[-2px]"
            style="color: {getColor(
              topic.keyphrase
            )}; background-color: {topic.enabled ? 'gray' : 'transparent'};"
            onclick={() => toggleKeyphrase(topic.keyphrase)}
          >
            {topic.keyphrase}
          </span>
        {/each}
      </p>
    <!-- {/if} -->
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->

    <div
      use:highlightCodeSyntax
      class="article prose prose-sm max-w-none mt-3"
      onclick={handleBrowserClick}
    >

    <EditorComponent
    bind:this={editor}
    content={currentArticle.html}
  />
      <!-- {@html currentArticle.html} -->
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
        {APP_SLOGAN}
        </h3>
      <p class="text-lg text-gray-500 text-center">
        <!-- Use WASD to scroll and navigate. -->
      </p>
      <p class="text-lg text-gray-500 text-center justify-center">
        <a aria-label="Chrome Web Store"
          class="download-chrome download-btn text-center justify-center"
          target="_blank"
          href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko"
        >
        </a>

        <a aria-label="Microsoft Store"
          class="download-windows download-btn text-center justify-center"
          target="_blank"
          href="https://apps.microsoft.com/detail/9pcgf9gnk460?rtc=1&hl=en-us&gl=US"
        >
        </a>
      </p>

      <div
        class="absolute bottom-0 w-full text-center text-slate-500 text-xs z-20"
      >
      <Footer listFooterLinks={FOOTER_LINKS} />
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
    color: #353c45;
    text-decoration: underline;
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
