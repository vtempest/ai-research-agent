<script>
  import { Highlighter, Underline, Eraser, Pencil, Sun, Moon, Image, XCircle, Bot, ChevronLeft, ChevronRight, Clipboard } from 'lucide-svelte';
  import { ChatGroq } from '@langchain/groq';
  import { HumanMessage } from '@langchain/core/messages';
  // import { apiKey } from '$lib/custom-domain';  

  // import {toggleHighlight} from './auto-highlight.js';

  export let onChangeTextSize;
  export let onChangeTheme;
  export let onToggleImages;
  export let onToggleMarkupMode;
  export let article = null;

  const defaultPrompt = "Summarize in bullet points and bold topics";


  let activeMode = null;
  let groqResponse = '';
  let status = 'idle';
  let errorMessage = '';
  let summaryPrompt = defaultPrompt; 
  let isExpanded = true;
  
  let modelChoice;
  $: model = enumLLMs[modelChoice];

  function toggleMode(mode) {
    if (activeMode === mode) {
      activeMode = null;
    } else {
      activeMode = mode;
    }
    onToggleMarkupMode(activeMode);
  }

  async function summarizeArticle() {
    status = 'calling-groq';
    errorMessage = '';
    try {

      // modelChoice = Math.floor(Math.random() * enumLLMs.length);
      // model = enumLLMs[modelChoice];

      // const chat = new ChatGroq({
      //   apiKey,
      //   model,
      // });
      // // let contextLimit = 5000;

      // let docText = document.querySelector("#readability-content")
      //   .innerHTML.replace(/<[^>]*>?/gm, '');
      
      // let highlighted='';
      // document.querySelectorAll(".highlighted, i").forEach(i=>highlighted+=i.textContent + ' ' );
      // let context = (highlighted.length > 50 ? highlighted : highlighted + docText ).slice(0, contextLimit);

      
      
      // const messages = [new HumanMessage(`${summaryPrompt} ${context}`)];
      // const response = await chat.invoke(messages);
      // groqResponse = response.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      if (error.response && error.response.status === 429) {
        errorMessage = 'Please wait before trying again.';
      } else {
        errorMessage = 'Error: Failed to summarize the article';
      }
      groqResponse = '';
    } finally {
      status = 'idle';
    }
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  let showCopiedMessage = false;

function copyHtmlToClipboard() {
  var html = document.querySelector("#readability-content");
  let HTMLBlob = new Blob([html.innerHTML], { type: 'text/html' });
  // add newlines between paragraphs for raw text
  for (let child of html.children) {
    child.appendChild(document.createTextNode('\n'));
  }
  let textBlob = new Blob([html.textContent ?? ''], { type: 'text/plain' });
  const clipboardItem = new window.ClipboardItem({
    'text/html': HTMLBlob,
    'text/plain': textBlob,
  });
  navigator.clipboard.write([clipboardItem]).then(() => {
    showCopiedMessage = true;
    setTimeout(() => {
      showCopiedMessage = false;
    }, 2000);
  });
}

let isEditModeEnabled = false;
function handleEditMode(){
  var content = document.querySelector("#readability-content");
  if (content.hasAttribute("contentEditable")) {
    content.removeAttribute("contentEditable");
    isEditModeEnabled = false;
  } else {
    content.setAttribute("contentEditable", true);
    isEditModeEnabled = true;
  }

}

//quit if pressing shortcut in text input box
function isInsideTextInput(i) {
  return (
    i instanceof HTMLImageElement ||
    i instanceof HTMLInputElement ||
    i instanceof HTMLTextAreaElement ||
    i.textbox ||
    (i.textContent && i.textContent == "") ||
    (i.ownerDocument &&
      i.ownerDocument.designMode &&
      i.ownerDocument.designMode.match(/on/i))
  );
}




// AUTO HIGHLGHT






// // Event listeners
// document.addEventListener('mouseup', (event) => {
//     // Only trigger if no modifier keys are pressed
//     if (!event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
//         toggleHighlight('yellow');
//     }
// });

// document.addEventListener('keydown', (event) => {
//     // Check for Ctrl+M (or Cmd+M on Mac)
//     if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
//         event.preventDefault(); // Prevent default browser behavior
//         toggleHighlight('yellow');
//     }
// });



</script>

  <!-- Sidebar -->
  <div class="max-w-[150px] bg-slate-200  h-full overflow-y-auto bg-slate-800 text-slate-200 z-10 transition-all duration-300" class:w-64={isExpanded} class:w-12={!isExpanded}>
    {#if isExpanded}
      <div class="">
        <div class="flex justify-between items-center">
          <button onclick={toggleExpand} class="text-slate-400 hover:text-slate-200 focus:outline-hidden">
            <ChevronLeft size={24} />
          </button>
        </div>
         
           
          <div class="space-y-2">
            <span class="text-xs font-medium">Exract Expert Excerpt </span>
            <div class="flex flex-row  "
            >
              <button 
                onclick={() => toggleMode('highlight')} 
                class={( activeMode == 'highlight' ? "bg-slate-400 " : "")  +
                     "px-2 py-1 bg-slate-900 text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-slate-400 flex items-center"
                  }
                
              >
                <Highlighter size={16} />
                <span class="ml-1">Highlighter</span>
              </button>
              <button 
                onclick={() => toggleMode('underline')} 
                class={( activeMode == 'underline' ? "bg-slate-400 " : "")  +
                "px-2 py-1 bg-slate-900 text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-slate-400 flex items-center"
                }
      
              >
                <Underline size={16} />
                <span class="ml-1">Underliner</span>
              </button>
              <button 
                onclick={() => toggleMode('eraser')} 
                class={( activeMode == 'eraser' ? "bg-slate-400 " : "")  +
                     "px-2 py-1 bg-slate-900 text-xs rounded-md focus:outline-hidden focus:ring-2 focus:ring-slate-400 flex items-center"
                }>
                <Eraser size={16} />
                <span class="ml-1">Eraser</span>
              </button>
            </div>
          </div>
        </div>

        
        <div class="space-y-4">
          <div class="flex space-x-2">
            <div class="flex-1">
              <span class="text-xs font-medium">Text size</span>
              <div class="flex bg-slate-700 rounded-md mt-1">
                <button onclick={() => onChangeTextSize('small')} class="flex-1 px-2 py-1 text-xs rounded-l-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">S</button>
                <button onclick={() => onChangeTextSize('medium')} class="flex-1 px-2 py-1 text-xs hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">M</button>
                <button onclick={() => onChangeTextSize('large')} class="flex-1 px-2 py-1 text-xs rounded-r-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">L</button>
              </div>
            </div>
            
            <!-- <div class="flex-1">
              <span class="text-xs font-medium">Theme</span>
              <div class="flex bg-slate-700 rounded-md mt-1">
                <button onclick={() => onChangeTheme('light')} class="flex-1 px-2 py-1 text-xs rounded-l-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">
                  <Sun size={16} />
                </button>
                <button onclick={() => onChangeTheme('dark')} class="flex-1 px-2 py-1 text-xs rounded-r-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">
                  <Moon size={16} />
                </button>
              </div>
            </div> -->
            
            <div class="flex-1">
              <span class="text-xs font-medium">Images</span>
              <div class="flex bg-slate-700 rounded-md mt-1">
                <button onclick={() => onToggleImages('show')} class="flex-1 px-2 py-1 text-xs rounded-l-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">
                  <Image size={16} />
                </button>
                <button onclick={() => onToggleImages('hide')} class="flex-1 px-2 py-1 text-xs rounded-r-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400">
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        
        <div class="space-y-2">                                                                       
          <div class="flex">

            <span class="text-xs font-medium">Words:</span>
            <div class="flex-1 text-xs bg-slate-700 rounded-md p-2">
              {article.word_count}

            </div>

                  <!-- Add the Copy button here -->
          <!-- Updated Copy button with feedback message -->
            <span class="text-xs font-medium">Copy</span>
            <div class="relative flex-1 bg-slate-700 rounded-md mt-1">
              <button 
                onclick={copyHtmlToClipboard}
                class="flex-1 px-2 py-1 text-xs rounded-r-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400"
              >
                <Clipboard size={16} />
              </button>
              {#if showCopiedMessage}
              <div class="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-500 text-white text-xs rounded-md">
                Copied!
              </div>
              {/if}
            </div>


            

                  <!-- Add the Copy button here -->
          <!-- Updated Copy button with feedback message -->
          <span class="text-xs font-medium">Edit</span>
          <div class="relative flex-1 bg-slate-700 rounded-md mt-1">
            <button 
              onclick={handleEditMode}
              
              class={( isEditModeEnabled ? "bg-slate-400 " : "") 
                + "flex-1 px-2 py-1 text-xs rounded-r-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400"
                }
                >
              <Pencil size={16} />
            </button>
            <!-- {#if showCopiedMessage}
            <div class="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-500 text-white text-xs rounded-md">
              Copied!
            </div>
            {/if} -->
          </div>

          
          </div>
         
           
          
          <input
            bind:value={summaryPrompt}
            placeholder="Ask AI any question..."
            class="w-full bg-slate-700 text-slate-200 border-slate-600 rounded-md p-2"
          />
          
          <div class="w-full inset-0 bg-linear-to-r from-red-400 via-orange-500 via-pink-300 to-yellow-300  rounded-lg animate-gradient">

          <button 
            onclick={summarizeArticle} 
            class="w-full bg-slate-700  rounded-lg p-2 m-[5px] hover:bg-slate-600 text-slate-200 px-4 py-2  flex items-center justify-center"
            disabled={status === 'calling-groq'}
          >

            <Bot size={16} class="mr-2" />
            {status === 'calling-groq' ? 'Answering with ' + model.split('-').slice(0,3).join('-') : 'AI Generate'}
          </button>
        </div>

        </div>



        {#if errorMessage}
          <div class="bg-red-500 text-white p-2 rounded-md">
            {errorMessage}
          </div>
        {/if}
        
        {#if groqResponse}
          <div class="bg-slate-700 text-md text-slate-200 rounded-md h-full h-[300px]">
            {groqResponse}
          </div>
        {/if}
      </div>
    {:else}
      <div class="p-2">
        <button 
          onclick={toggleExpand} 
          class="w-8 h-8 bg-slate-700 text-slate-200 rounded-md shadow-md hover:bg-slate-600 focus:outline-hidden focus:ring-2 focus:ring-slate-400 flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    {/if}
  </div>
  