import ReadingModeControls from "./ReadingModeControls.svelte";
import {extractContent} from "ai-research-agent";


// import tailwind from "./tailwind.min.css?raw";


// Listen for the activateReadingMode message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in content script", request);
  if (request.action === "activateReadingMode") {
    toggleReadingMode();
    sendResponse({ success: true });
  }
});
    

/**
 * Toggles Reading Mode on the current page, with extracted content,
 * cite, markup tools, and AI generated summary.
 */
export async function toggleReadingMode() {

  //toggle from cache first
  if (window.originalHTML) {
    //toggle: revert back to original html
    if (document.querySelector("#readability-content")) {
      var readingModeHTML = document.documentElement.innerHTML;

      if (readingModeHTML.includes("readability-content"))
        window.readingModeHTML = readingModeHTML;

        document.documentElement.innerHTML = originalHTML;
    } else {
      //toggle: back to reading mode
      readingModeHTML = window.readingModeHTML;

      document.documentElement.innerHTML = readingModeHTML;
    }

    return; // exit if originalHTML exists
  }

  //preserve original html
//   if (!originalHTML.includes("readability-content"))
    window.originalHTML = document.documentElement.outerHTML;


  var url = document.location.href;

  var article = await extractContent(document, {
    url
  });


  if (article) {
    var {
      title,
      author_short,
      author_cite,
      author,
      date,
      source,
      html,
      cite,
      word_count,
    } = article;


  console.log(html);

    // Format the date if it exists
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    var year = formattedDate
      ? new Date(date).getFullYear()?.toString().slice(-2)
      : "";

    // Create a MLA-style citation

    const citation = [
      author_cite ? `${author_cite}.` : "",
      `"${title}."`,
      source ? `<i>${source}</i>,` : "",
      formattedDate ? `${formattedDate},` : "",

      ` ${url} `,
    ]
      .filter(Boolean)
      .join(" ");



/// toggle all css

toggleAllCSS()


    // Create a new body with extracted content
    var title = document.title;
 // 1. Create the overlay container
const overlay = document.createElement('div');
overlay.id = 'custom-reading-overlay';
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.zIndex = 999999; // Very high to ensure it's on top
overlay.style.background = 'rgba(255,255,255,0.98)'; // Slightly transparent background
overlay.style.overflow = 'auto';

// 2. Insert your content into the overlay
overlay.innerHTML = `
  <div class="flex flex-row h-screen overflow-hidden" style="background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%);">
    <div id="reading-mode-controls" class="w-[110px] min-w-[90px] max-w-[140px] overflow-y-auto text-black bg-gradient-to-b from-slate-100 to-slate-200 p-5 shadow-lg border-r border-slate-200">
      <!-- Sidebar content goes here -->
    </div>
    <div id="readability-content" class="flex-1 overflow-y-auto" style="padding: 60px 0; background: transparent;">
      <div class="max-w-3xl mx-auto font-serif text-lg leading-relaxed bg-white/90 rounded-2xl shadow-2xl px-10 py-12 my-10 border border-slate-200"
        style="box-shadow: 0 8px 32px 0 rgba(60,72,88,0.10); margin-left: 15vw; margin-right: 15vw;">
        <div contenteditable class="text-gray-500 mb-4 text-base tracking-wide italic">
          ${author_short ? author_short + " " + year : ""}    
        </div>
        <div class="border-b border-gray-200 text-sm text-gray-500 pb-2 mb-4">
          <p class="mt-2" contenteditable>${article.cite}</p>
        </div>
        <div class="text-2xl font-bold text-slate-700 mb-6 tracking-tight">
          ${article.title}    
        </div>
        <div id="article-text" class="prose prose-lg max-w-none text-slate-800" style="background: none; padding: 0 0 0 0; margin: 0;">
          ${article.html}
        </div>
      </div>
    </div>
  </div>
  <button id="close-reading-overlay" style="
    position: fixed; top: 32px; right: 40px; z-index: 1000000;
    background: #334155; color: #fff; border: none; border-radius: 6px;
    padding: 12px 20px; font-size: 22px; cursor: pointer; box-shadow: 0 2px 8px 0 rgba(30,41,59,0.10);
    transition: background 0.2s;
  " onmouseover="this.style.background='#475569'" onmouseout="this.style.background='#334155'">✕</button>
`;

// 3. Append the overlay to the body
document.body.appendChild(overlay);





// 4. Add a close button handler
document.getElementById('close-reading-overlay').onclick = () => {
  overlay.remove();
};






function toggleAllCSS() {

// Stores state for toggling
window.cssToggleState = {
  stylesheets: [],
  inlineStyles: new Map(),
  disabled: false
};


  // Disable if currently enabled
  if (!cssToggleState.disabled) {
    // Find all <style> and <link rel="stylesheet"> in the document (including <head>)
    cssToggleState.stylesheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    cssToggleState.stylesheets.forEach(el => {
      el.disabled = true; // disables stylesheet, works for both <style> and <link> [3][5]
    });

    // Store and remove all inline style attributes
    cssToggleState.inlineStyles.clear();
    document.querySelectorAll('[style]').forEach(el => {
      cssToggleState.inlineStyles.set(el, el.getAttribute('style'));
      el.removeAttribute('style');
    });

    cssToggleState.disabled = true;
  } else {
    // Re-enable all <style> and <link rel="stylesheet"> elements
    cssToggleState.stylesheets.forEach(el => {
      el.disabled = false;
    });

    // Restore all inline style attributes
    cssToggleState.inlineStyles.forEach((style, el) => {
      if (el) {
        el.setAttribute('style', style);
      }
    });

    cssToggleState.disabled = false;
  }
}



    // Initialize Svelte component
    new ReadingModeControls({
      target: document.getElementById("reading-mode-controls"),
      props: {
        onChangeTypography: changeTypography,
        onChangeTheme: changeTheme,
        onToggleImages: toggleImages,
        onToggleMarkupMode: toggleMarkupMode,
        onCollapseControls: toggleControls,
        article: article,
      },
    });

    // Apply initial styling
    applyStyles();

    // Add event listener for text selection
    document
      .getElementById("readability-content")
      .addEventListener("mouseup", handleTextSelection);

    document.body.setAttribute("style", "");
    document.documentElement.setAttribute("style", "");
    console.log("Reading Mode applied successfully");
  } else {
    console.error("Failed to extract content");
  }
}

function applyStyles() {
  const style = document.createElement('style');
  style.textContent = tailwind.toString() + styles.toString() ;
  document.head.appendChild(style);
}

function changeTextSize(size) {
  const content = document.getElementById("readability-content");
  content.style.fontSize =
    size === "small" ? "16px" : size === "medium" ? "18px" : "20px";
}

function changeTypography(type) {
  const content = document.getElementById("readability-content");
  content.style.fontFamily =
    type === "serif" ? "Georgia, serif" : "Arial, sans-serif";
}

function changeTheme(theme) {
  const content = document.getElementById("readability-content");
  if (theme === "light") {
    content.style.filter = "invert(0)";
  } else {
    content.style.filter = "invert(1)";
  }
}

function toggleImages(action) {
  const images = document.querySelectorAll("#readability-content img");
  images.forEach((img) => {
    img.style.display = action === "hide" ? "none" : "";
  });
}

function toggleControls() {
  const controls = document.getElementById("reading-mode-controls");
  const hamburger = document.getElementById("hamburger-menu");
  const content = document.getElementById("readability-content");

  if (controls.style.display === "none") {
    controls.style.display = "flex";
    hamburger.style.display = "none";
    content.style.marginTop = "5rem";
  } else {
    controls.style.display = "none";
    hamburger.style.display = "block";
    content.style.marginTop = "1rem";
  }
}




let currentMode = null;
function toggleMarkupMode(mode) {
  const content = document.getElementById("readability-content");

  if (currentMode === mode) {
    // Disable the current mode
    content.classList.remove(
      "highlight-cursor",
      "underline-cursor",
      "eraser-cursor"
    );
    currentMode = null;
  } else {
    // Enable the new mode
    content.classList.remove(
      "highlight-cursor",
      "underline-cursor",
      "eraser-cursor"
    );
    content.classList.add(`${mode}-cursor`);
    currentMode = mode;
  }
}


// MARKUP

function handleTextSelection() {
  if (!currentMode) return;

  const selection = window.getSelection();
  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString().trim();
  if (selectedText.length === 0) return;

  if (currentMode === "eraser") {
    eraseMarkup(range);
  } else if (currentMode === "highlight") {
    applyHighlight(range);
  } else if (currentMode === "underline") {
    applyUnderline(range);
  }

  selection.removeAllRanges();
}

function applyHighlight(range) {
  applyMarkup(range, "highlighted");
}

function applyUnderline(range) {
  applyMarkup(range, "underline-only");
}

function applyMarkup(range, className) {
  const iterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT,
    (node) =>
      range.intersectsNode(node)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
  );

  const nodesToWrap = [];
  let node;
  while ((node = iterator.nextNode())) {
    nodesToWrap.push(node);
  }

  nodesToWrap.forEach((node) => {
    const nodeRange = document.createRange();
    nodeRange.selectNodeContents(node);

    const intersectionRange = rangeIntersection(range, nodeRange);
    if (intersectionRange) {
      wrapRangeWithSpan(intersectionRange, className);
    }
  });
}

function wrapRangeWithSpan(range, className) {
  const span = document.createElement("span");
  span.className = className;
  range.surroundContents(span);
}

function rangeIntersection(range1, range2) {
  const start =
    range1.compareBoundaryPoints(Range.START_TO_START, range2) < 0
      ? range2.startContainer
      : range1.startContainer;
  const startOffset =
    range1.compareBoundaryPoints(Range.START_TO_START, range2) < 0
      ? range2.startOffset
      : range1.startOffset;
  const end =
    range1.compareBoundaryPoints(Range.END_TO_END, range2) > 0
      ? range2.endContainer
      : range1.endContainer;
  const endOffset =
    range1.compareBoundaryPoints(Range.END_TO_END, range2) > 0
      ? range2.endOffset
      : range1.endOffset;

  const intersectionRange = document.createRange();
  intersectionRange.setStart(start, startOffset);
  intersectionRange.setEnd(end, endOffset);

  return intersectionRange;
}


function eraseMarkup(range) {
  const iterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    (node) =>
      range.intersectsNode(node) &&
      (node.classList.contains("highlighted") ||
        node.classList.contains("underline-only") ||
        node.tagName.toLowerCase() === "i" ||
        node.tagName.toLowerCase() === "u")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
  );

  const nodesToUnwrap = [];
  let node;
  while ((node = iterator.nextNode())) {
    nodesToUnwrap.push(node);
  }

  nodesToUnwrap.forEach((node) => {
    const parent = node.parentNode;
    while (node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    parent.removeChild(node);
  });
}
