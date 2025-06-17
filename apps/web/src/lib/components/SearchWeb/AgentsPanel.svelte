<script lang="ts">
  import {
    ChevronLeft,
    Clipboard,
    Bot,
    MessageCircleQuestion,
  } from "lucide-svelte";
  import "highlight.js/styles/github.css"; // Choose your preferred style
  import { iconLoadingRipple } from "$lib/components/icons";
  // @ts-ignore
  import { highlightCodeSyntax, copyHTMLToClipboard } from "ai-research-agent";
  import grab from "grab-api.js";
  import * as QwkSearch from 'qwksearch-api-client'
  import {type WriteLanguageData} from 'qwksearch-api-client'

  const defaultSummarizePrompt = "Summarize in bullet points and bold topics";
  const MAX_ARTICLE_LENGTH = 1500;
  const MAX_FOLLOWUP_QUESTIONS = 4;

  let {
    extractedArticle,
    searchText,
  }: Partial<{
    extractedArticle?: Article;
    searchText?: string;
  }> = $props();

  let chat_history = $state([]);
  let isExpanded = $state(true); // default to true;
  let showCopiedMessage = $state(false);
  let userPrompt = $state(defaultSummarizePrompt);

  let AIResponse = $state({}) as Response & {
    content?: string;
  };
  let AIResponseFollowUps = $state({}) as Response & {
    content?: string;
    extract?: string[];
  };

  export async function callLanguageAPI(agent: WriteLanguageData["body"]["agent"], options = {}) {
  
    //limit article length without html
    var article = extractedArticle?.html
      ?.replace(/<[^>]*>?/g, "")
      .slice(0, MAX_ARTICLE_LENGTH);

    var res = await grab<
      { 
        /** Language Model response to user question */
        content?: string, 
        /** Language Model response converted to structured JSON in some agents */
        data: object 
      },
      { agent: WriteLanguageData["body"]["agent"]; query: string; chat_history?: string }
    >("agents", {
      agent,
      response: agent === "question" ? AIResponse : AIResponseFollowUps,
      query: searchText + "\n" + userPrompt,
      chat_history: chat_history
        .slice(-5)
        ?.map(c => c.role + ": " + c.content)
        .join("\n"),
      article,
      MAX_FOLLOWUP_QUESTIONS,
      provider: "groq",
      cancelOngoingIfNew: false,
      method: "POST",
      // rateLimit: 1,
      timeout: 30,
    });


    if (agent === "question")
      //save to chat history
      chat_history.push(
        { role: "user", content: userPrompt, time: new Date().toISOString() },
        {
          role: "assistant",
          content: AIResponse.content,
          time: new Date().toISOString(),
        },
      );
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  function handleQuestionClick(event) {
    userPrompt =
      event.target.closest("question")?.innerHTML || event.target.innerHTML;

    callLanguageAPI("question");
  }

  async function handleCopyHTMLToClipboard() {
    if (!extractedArticle) return;

    var textToCopy =
      AIResponse.content +
      "\n\n\n" +
      (extractedArticle.cite || "") +
      "\n\n\n" +
      extractedArticle.html;

    await copyHTMLToClipboard(textToCopy, { pastePlainFormat: 1 });

    showCopiedMessage = true;
    setTimeout(() => {
      showCopiedMessage = false;
    }, 2000);
  }
</script>

<div
  class="w-full h-full overflow-y-auto transition-all duration-300"
  id="sidebar"
>
  {#if isExpanded}
    <div id="expanded-content" class="p-2 space-y-2">
      <!-- <div class="flex justify-between items-center">
            <button onclick={toggleExpand} class="hover:text-slate-200 focus:outline-hidden">
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
          onclick={() => callLanguageAPI("question")}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition-all duration-300 ease-in-out"
          id="ai-generate-btn"
        >
          <Bot class="mr-2 h-4 w-4" />
          {AIResponse.isLoading  ? "..." : "Ask"}
        </button>

        <button
          onclick={() => callLanguageAPI("suggest-followups")}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition-all duration-300 ease-in-out"
          id="ai-generate-btn"
        >
          <MessageCircleQuestion class="mr-2 h-4 w-4" />
          Suggest ?
        </button>
        <button
          onclick={handleCopyHTMLToClipboard}
          class="px-6 py-2.5 text-sm font-semibold flex items-center rounded-md bg-white text-blue-500 hover:bg-blue-100 focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          onkeydown={(e) => e.key === "Enter" && callLanguageAPI("question")}
          id="summary-prompt"
          type="text"
          placeholder="Ask AI any question..."
          class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
      <div onclick={handleQuestionClick}>
        {#if AIResponseFollowUps?.extract}
          <div
            class="question cursor-pointer rounded-md p-1.5 mb-0.5 text-md font-semibold hover:bg-slate-100 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-slate-300"
          >
            {defaultSummarizePrompt}
          </div>
          {#each AIResponseFollowUps?.extract as question}
            <div
              class="question cursor-pointer rounded-md p-1.5 mb-0.5 text-md font-semibold hover:bg-slate-100 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-slate-300"
            >
              {@html question}
            </div>
          {/each}
        {:else if AIResponseFollowUps.isLoading}
          <div class="flex justify-center">
            {@html iconLoadingRipple({size: 100})}
          </div>
        {:else if AIResponseFollowUps.error}
          <div class="bg-red-500 text-white p-2 rounded-md">
            {AIResponseFollowUps.error}
          </div>
        {/if}
      </div>

      {#if AIResponse.isLoading}
        <div class="flex justify-center">
          {@html iconLoadingRipple({size: 100})}
          
        </div>
      {:else if AIResponse.content}
        <div
          class="bg-[#FAFAF7] rounded-lg shadow-md p-2 mb-4"
          use:highlightCodeSyntax
        >
          {@html AIResponse.content}
        </div>
      {:else if AIResponse.error}
        <div class="bg-red-500 text-white p-2 rounded-md">
          {AIResponse.error}
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
