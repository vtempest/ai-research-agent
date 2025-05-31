import hljs from 'highlight.js';
// import CopyButtonPlugin from 'highlightjs-copy';

/**
 * Take a node and make it so that any code blocks are syntax highlighted.
 * @param {Node} node - The node to be highlighted.
 * @returns {Object} An object with a destroy method to clean up the mutation observer.
 * @category HTML Utilities
 * @example
 */
export function highlightCodeSyntax(node) {
  
  hljs.addPlugin(
    new CopyButtonPlugin({
      autohide: false, // Always show the copy button
    })
  );
  
    // Import highlight.js dynamically to avoid SSR issues
      // Function to highlight a single node
      const highlight = (element) => {
        // Get language from class if specified (e.g., class="language-javascript")
        const languageClass = Array.from(element.classList)
          .find(className => className.startsWith('language-'));
        const language = languageClass ? languageClass.replace('language-', '') : null;
        

        // Only highlight if it hasn't been highlighted before
        if (!element.dataset.highlighted) {
          if (language) {
            element.innerHTML = hljs.highlight(element.textContent, { language }).value;
          } else {
            element.innerHTML = hljs.highlightAuto(element.textContent).value;
          }
          element.dataset.highlighted = 'true';
        }
      };
  
      // If the node is a code element, highlight it
      if (node.tagName?.toLowerCase() === 'code') {
        highlight(node);
      }
  
      // Find and highlight all code elements within the node
      node.querySelectorAll('code').forEach(highlight);
  
      // Optional: Setup mutation observer to handle dynamically added code elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // ELEMENT_NODE
              if (node.tagName?.toLowerCase() === 'code') {
                highlight(node);
              }
              node.querySelectorAll('code').forEach(highlight);
            }
          });
        });
      });
  
      observer.observe(node, {
        childList: true,
        subtree: true
      });
  
      return {
        destroy() {
          observer.disconnect();
        }
      };
  }

  
/**
 * Adds a copy button to highlightjs code blocks
 */
class CopyButtonPlugin {
  /**
   * Create a new CopyButtonPlugin class instance
   * @param {Object} [options] - Functions that will be called when a copy event fires
   * @param {CopyCallback} [options.callback]
   * @param {Hook} [options.hook]
   * @param {String} [options.lang] Defaults to the document body's lang attribute and falls back to "en"
   * @param {Boolean} [options.autohide=true] Automatically hides the copy button until a user hovers the code block. Defaults to False
   */
  constructor(options = {}) {
    this.hook = options.hook;
    this.callback = options.callback;
    this.lang = options.lang || document.documentElement.lang || "en";
    this.autohide =
      typeof options.autohide !== "undefined" ? options.autohide : true;
  }
  "after:highlightElement"({ el, text }) {
    // If the code block already has a copy button, return.
    if (el.parentElement.querySelector(".hljs-copy-button")) return;

    let { hook, callback, lang, autohide } = this;

    // Create the copy button and append it to the codeblock.
    let container = Object.assign(document.createElement("div"), {
      className: "hljs-copy-container",
    });
    container.dataset.autohide = autohide;

    let button = Object.assign(document.createElement("button"), {
      innerHTML: locales[lang]?.[0] || "Copy",
      className: "hljs-copy-button",
    });
    button.dataset.copied = false;

    el.parentElement.classList.add("hljs-copy-wrapper");
    el.parentElement.appendChild(container);
    container.appendChild(button);

    // Add a custom proprety to the container so that the copy button can reference and match its theme values.
    container.style.setProperty(
      "--hljs-theme-background",
      window.getComputedStyle(el).backgroundColor
    );
    container.style.setProperty(
      "--hljs-theme-color",
      window.getComputedStyle(el).color
    );
    container.style.setProperty(
      "--hljs-theme-padding",
      window.getComputedStyle(el).padding
    );

    button.onclick = function () {
      if (!navigator.clipboard) return;

      let newText = text;
      if (hook && typeof hook === "function") {
        newText = hook(text, el) || text;
      }

      navigator.clipboard
        .writeText(newText)
        .then(function () {
          button.innerHTML = locales[lang]?.[1] || "Copied!";
          button.dataset.copied = true;

          let alert = Object.assign(document.createElement("div"), {
            role: "status",
            className: "hljs-copy-alert",
            innerHTML: locales[lang]?.[2] || "Copied to clipboard",
          });
          el.parentElement.appendChild(alert);

          setTimeout(() => {
            button.innerHTML = locales[lang]?.[0] || "Copy";
            button.dataset.copied = false;
            el.parentElement.removeChild(alert);
            alert = null;
          }, 2000);
        })
        .then(function () {
          if (typeof callback === "function") return callback(newText, el);
        });
    };
  }
}