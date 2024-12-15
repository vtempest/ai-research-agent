<script lang="ts">
  import {
    ChevronLeft,
    Clipboard,
    Bot,
  } from "lucide-svelte";

  import {highlightCodeSyntax} from "$ai-research-agent"
  import 'highlight.js/styles/github.css'; // Choose your preferred style
  import { copyHTMLToClipboard } from "$ai-research-agent";
  import { callServerAPI } from "$lib/utils/call-server";
 
  export let selectedArticle: any;
  export let userPrompt = "";
  export let searchText = "";

  let aiResponse = "";
  let status = "idle";
  let errorMessage = "";
  let isExpanded = true;
  let showCopiedMessage = false;

  export async function generateAISummary() {
    // if (!selectedArticle) return;
    var html = document.querySelector(".read-view").innerHTML;

    if (html?.length < 100) {
      return;
    }

    //remove html tags
    const prompt = userPrompt + " " + searchText + " " + html.replace(/<[^>]*>?/g, "").replace(/<[^>]*>?/g, "").slice(0, 5000);

    var aiResponseObject = await callServerAPI("agents", { 
      prompt, 
      provider: "groq", 
      method: "POST" 
    });
    
     aiResponse = aiResponseObject?.content || "";

    // alert(aiResponse)
    errorMessage = aiResponseObject?.error;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  function handleCopyHTMLToClipboard() {
    if (!selectedArticle) return;

    var textToCopy = aiResponse + "\n\n\n"+
      (selectedArticle.cite || "" ) + "\n\n\n"+
       selectedArticle.html;
    
       copyHTMLToClipboard(textToCopy, {pastePlainFormat: 1}).then(() => {
      showCopiedMessage = true;
      setTimeout(() => {
        showCopiedMessage = false;
      }, 2000);
    });
  }

</script>

<div
  class="w-full h-full overflow-y-auto transition-all duration-300"
  id="sidebar"
>
  {#if isExpanded}
    <div id="expanded-content" class="p-2 space-y-2">
      <!-- <div class="flex justify-between items-center">
            <button on:click={toggleExpand} class="hover:text-slate-200 focus:outline-none">
              <ChevronRight />
            </button>
          </div> -->
      <!--     
          <div class="space-y-2">
            <span class="text-xs font-medium">Markup Tools</span>
            <div class="flex flex-wrap gap-2">
              <button on:click={() => toggleMode('highlight')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="highlight-btn">
                <Highlighter class="mr-1" />
                Highlight
              </button>
              <button on:click={() => toggleMode('underline')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="underline-btn">
                <Underline class="mr-1" />
                Underline
              </button>
              <button on:click={() => toggleMode('eraser')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="eraser-btn">
                <Eraser class="mr-1" />
                Eraser
              </button>
            </div>
          </div> -->

          <div class="relative flex items-center space-x-1">
           
            <input
              bind:value={userPrompt}
              on:keydown={(e) => e.key === "Enter" && generateAISummary()}
              id="summary-prompt"
              type="text"
              placeholder="Ask AI any question..."
              class="flex-grow px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              on:click={generateAISummary}
              disabled={status === "calling-ai"}
              class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition-all duration-300 ease-in-out"
              id="ai-generate-btn"
            >
              <Bot class="mr-2 h-4 w-4" />
              {status === "calling-ai" ? "..." : "Ask AI"}
            </button>

            <button
            on:click={handleCopyHTMLToClipboard}
            class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Clipboard class="mr-2 h-4 w-4" />
            Copy
          </button>
          {#if showCopiedMessage}
            <div
              class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-lg"
            >
              Copied!
            </div>
          {/if}
          </div>

      {#if errorMessage}
      
    <div class="text-white p-2 rounded-md border-red-500"  >
      {@html errorMessage}
    </div>
      {/if}

      {#if aiResponse}
        <div class="bg-slate-100 rounded-lg shadow-md p-4 mb-4" use:highlightCodeSyntax>
          {@html aiResponse}
        </div>
      {/if}
    </div>
  {:else}
    <div id="collapsed-content" class="p-2">
      <button
        on:click={toggleExpand}
        class="px-2 py-1 rounded-md hover:bg-gray-200"
      >
        <ChevronLeft />
      </button>
    </div>
  {/if}
</div>
