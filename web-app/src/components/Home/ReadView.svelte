<script>
  import { onMount } from "svelte";
  import "./icons-download.css";

  import Footer from "./Footer.svelte";

  import iconQwkLogo from "$lib/icons/qwk-logo.svg";

  export let selectedArticle = null;
</script>

<div class="article-container read-view h-full overflow-y-auto p-3">
  {#if selectedArticle && selectedArticle.html}
    <h1 class="text-3xl font-bold mb-4">{selectedArticle.title || ""}</h1>
    <p class="text-sm text-gray-500 mb-0">
      {selectedArticle.author_cite || ""}
    </p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.source || ""}</p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.date || ""}</p>
    <p class="text-sm text-gray-500 mb-0">
      {selectedArticle.word_count || ""} words
    </p>
    <p class="text-sm text-gray-500 mb-0">
      <a
        href={selectedArticle.url || ""}
        target="_blank"
        rel="noopener noreferrer"
      >
        {selectedArticle.url || ""}
      </a>
    </p>
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
        Whatever the future of research can be,
        <br />that is what it must become.
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
