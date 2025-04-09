<script lang="ts">
  import { ChevronLeft, Clipboard, Bot, MessageCircleQuestion } from "lucide-svelte";
  import "highlight.js/styles/github.css"; // Choose your preferred style

  import {
    highlightCodeSyntax,
    copyHTMLToClipboard,
    convertHTMLToEscapedHTML,
    convertLanguageReplyToJSON,
  } from "$ai-research-agent";
  import { callServerAPI } from "$lib/utils";

  const defaultPrompt = "Summarize in bullet points and bold topics";
  const MAX_ARTICLE_LENGTH = 6000;

  let { currentArticle, searchText } = $props();

  let aiResponse = $state("");
  let followupQuestions = $state([]);
  let status = $state("idle");
  let errorMessage = $state("");
  let isExpanded = $state(true); // default to true;
  let showCopiedMessage = $state(false);
  let userPrompt = $state(defaultPrompt);

  export async function generateAISummary() {
    if (!currentArticle) return;
    var html = document.querySelector(".read-view").innerHTML;

    if (html?.length < 100) return;

    var article = currentArticle.html
      .replace(/<[^>]*>?/g, "")
      .replace(/<[^>]*>?/g, "")
      .slice(0, MAX_ARTICLE_LENGTH);

    //remove html tags
    const prompt = userPrompt + " " + searchText + " " + article;

    let { content, error } = await callServerAPI("agents", {
      prompt,
      context: {
        // article,
        query: searchText,
      },
      provider: "groq",
      method: "POST",
      html: true,
    });

    aiResponse = content;
    errorMessage = error;
    status = "idle";
  }

  export async function generateFollowupQuestions() {
    if (!currentArticle) return;
    var html = document.querySelector(".read-view").innerHTML;

    if (html?.length < 100) {
      return;
    }

    var article = currentArticle.html
      .replace(/<[^>]*>?/g, "")
      .replace(/<[^>]*>?/g, "")
      .slice(0, 10000);

    let { content, error } = await callServerAPI("agents", {
      agent: "suggest-followups",
      context: {
        article,
        chat_history: [],
        query: searchText,
      },
      provider: "groq",
      method: "POST",
      html: true,
    });

    followupQuestions = [
      defaultPrompt,
      ...(convertLanguageReplyToJSON(convertHTMLToEscapedHTML(content), "suggestions") || []).map(
        (q) => (q.endsWith("?") || q.endsWith(".") ? q : q + "?")
      ),
    ];

    errorMessage = error;
    status = "idle";
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }
  
  function handleQuestionClick(event) {
    var question =
      event.target.closest("question")?.innerHTML || event.target.innerHTML;

    userPrompt = question;

    generateAISummary();
  }

  function handleCopyHTMLToClipboard() {
    if (!currentArticle) return;

    var textToCopy =
      aiResponse +
      "\n\n\n" +
      (currentArticle.cite || "") +
      "\n\n\n" +
      currentArticle.html;

    copyHTMLToClipboard(textToCopy, { pastePlainFormat: 1 }).then(() => {
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
            <button onclick={toggleExpand} class="hover:text-slate-200 focus:outline-none">
              <ChevronRight />
            </button>
          </div> -->
      <!--     
          <div class="space-y-2">
            <span class="text-xs font-medium">Markup Tools</span>
            <div class="flex flex-wrap gap-2">
              <button onclick={() => toggleMode('highlight')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="highlight-btn">
                <Highlighter class="mr-1" />
                Highlight
              </button>
              <button onclick={() => toggleMode('underline')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="underline-btn">
                <Underline class="mr-1" />
                Underline
              </button>
              <button onclick={() => toggleMode('eraser')} class="px-2 py-1 text-sm flex items-center rounded-md bg-gray-200 hover:bg-gray-300" id="eraser-btn">
                <Eraser class="mr-1" />
                Eraser
              </button>
            </div>
          </div> -->

      <div class="relative flex items-center space-x-1">
        <button
          onclick={generateAISummary}
          disabled={status === "calling-ai"}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition-all duration-300 ease-in-out"
          id="ai-generate-btn"
        >
          <Bot class="mr-2 h-4 w-4" />
          {status === "calling-ai" ? "..." : "Ask"}
        </button>

        <button
          onclick={generateFollowupQuestions}
          disabled={status === "calling-ai"}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition-all duration-300 ease-in-out"
          id="ai-generate-btn"
        >
          <MessageCircleQuestion class="mr-2 h-4 w-4" />
          {status === "calling-ai" ? "..." : "Suggest ?"}
        </button>
        <button
          onclick={handleCopyHTMLToClipboard}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Clipboard class="mr-2 h-4 w-4" />
        </button>
        {#if showCopiedMessage}
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-lg"
          >
            Copied!
          </div>
        {/if}
      </div>

      <div class="relative flex items-center space-x-1">
        <input
          bind:value={userPrompt}
          onkeydown={(e) => e.key === "Enter" && generateAISummary()}
          id="summary-prompt"
          type="text"
          placeholder="Ask AI any question..."
          class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div onclick={handleQuestionClick}>
        {#each followupQuestions as question (question)}
          <div
            class="question cursor-pointer rounded-md p-1.5 mb-0.5 text-md font-semibold hover:bg-slate-100 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-slate-300"
          >
            {question}
          </div>
        {/each}
      </div>

      {#if aiResponse}
        <div
       
          class="bg-[#FAFAF7] rounded-lg shadow-md p-2 mb-4"
          use:highlightCodeSyntax
        >
          {@html aiResponse}
        </div>
      {:else if errorMessage}
        <div class="bg-red-500 text-white p-2 rounded-md">
          {errorMessage}
        </div>
      {/if}
    </div>
  {:else}
    <div id="collapsed-content" class="p-2">
      <button
        onclick={toggleExpand}
        class="px-2 py-1 rounded-md hover:bg-gray-200"
      >
        <ChevronLeft />
      </button>
    </div>
  {/if}
</div>
