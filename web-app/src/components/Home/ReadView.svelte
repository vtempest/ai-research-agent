<script>
  import { onMount } from "svelte";
  import Footer from "./Footer.svelte";

  export let selectedArticle = null;

</script>

<div class="article-container read-view h-full overflow-y-auto p-3" >
  {#if selectedArticle && selectedArticle.html}
    <h1 class="text-3xl font-bold mb-4">{selectedArticle.title || ""}</h1>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.author_cite || ""}</p>
    <p class="text-sm text-gray-500 mb-0"> {selectedArticle.source || ""}</p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.date || ""}</p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.word_count || ""} words</p>
    <p class="text-sm text-gray-500 mb-0"> {selectedArticle.url || ""}</p>
    <div class="article prose prose-sm max-w-none">
      {@html selectedArticle.html}
    </div>
  {:else}
    <div class="relative h-full text-lg text-gray-500 text-center ">
      <h3 class="text-xl text-gray-500 text-center ">
        <!-- Being is Becoming:  -->
        <br /> Whatever the future of research can be, 
        <br />that is what it must become. 
      </h3>
      <p class="text-lg text-gray-500 text-center ">
        Use WASD to scroll and navigate.
      </p>
         <p class="text-lg text-gray-500 text-center  justify-center">
          <a  class="text-lg text-gray-500 text-center justify-center " target="_blank" href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko" >
        <img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png" alt="Chrome Web Store" class="h-12" />
      </a>
    </p>

      <div class="absolute bottom-0 w-full text-center  text-slate-500 text-xs z-20">

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