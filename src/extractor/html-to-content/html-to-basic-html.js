import { convertHTMLSpecialChars } from "./html-special-chars.js";

/**
 * Strip HTML to ~30 basic markup HTML tags, lists, tables, images.
 * Convert anchors and relative urls to absolute urls. Basic HTML supports the same
 * elements as Markdown, which is used in writing plain text. Markdown is converted
 * to HTML anyways to display it, and it is better to edit basic HTML in a rich text editor.
 *
 * [Mozilla DOM Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) <br />
 * [Source Code of Browser HTML DOM](https://chromium.googlesource.com/chromium/src/+/HEAD/third_party/blink/renderer/core/dom/) <br />
 * [How Blink Works](https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit#heading=h.v5plba74lfde) <br />
 * [RegExp JS V8 Code](https://github.com/v8/v8/blob/94cde7c7f3fffc62f621e43f65be3d517b8a9f3d/src/regexp/regexp-compiler.cc#L3827)
 * @param {string} html Any page's HTML to process
 * @param {object} options
 * @param {boolean} options.images default=true - Whether to include images
 * @param {boolean} options.links default=true - Whether to include links
 * @param {boolean} options.videos default=true - Whether to include videos or not
 * @param {boolean} options.formatting default=true - Whether to include formatting
 * @param {string} options.url  base URL for converting relative URLs to absolute
 * @param {string} options.allowTags default="br,p,u,b,i ,em,strong,h1,h2,h3,h4, h5,h6,blockquote,
 * code,ul,ol,li,dd,dl, table,th,tr,td,sub,sup" - Comma-separated list of allowed HTML tags
 * @param {string} options.allowedAttributes default="text,tag,href, src,type,width, height,id,data"
 *   List of allowed HTML attributes
 * @returns {string} basic text formatting html
 * @category Extractor
 */
export function convertHTMLToBasicHTML(html, options = {}) {

  var {
    images = 1,
    links = 1,
    videos = true,
    formatting = 1,
    url = "",
    allowTags = "br,p,u,b,i,em,strong,h1,h2,h3,h4,h5,h6,blockquote,code,\
      ul,ol,li,dd,dl,table,th,tr,td,sub,sup",
    allowedAttributes = "href,src,type,width,height,id,data",
  } = options;

  allowTags = allowTags.split(",");
  if (links) allowTags.push("a");
  if (images) allowTags.push("img");
  if (videos)
    allowTags = allowTags.concat("video,source,embed,object".split(","));

  if (!formatting) allowTags = ["text"];
  allowTags.push("text");


  allowedAttributes = allowedAttributes.split(",").concat("text,tagName".split(","));

  // Convert html string to array like [{tag:"p",attr:""},{text:""}]
  var basicHtml = convertHTMLToTokens(html)
    .filter(
      (token) =>
        token.text ||
        (token.tagName[0] == "/"
          ? allowTags.includes(token.tagName?.substring(1).toLowerCase())
          : allowTags.includes(token.tagName.toLowerCase()))
    )
    .map((el) => {
      for (var key of Object.keys(el))
        if (!allowedAttributes.includes(key)) delete el[key];

      //convert relative urls to absolute urls
      var urlValue = el.href || el.src;

      const matchdomain = url.match(/^(https?:\/\/[^\/]+)/i);
      const domain = matchdomain ? matchdomain[1] : null;

      if (urlValue) {
        urlValue = decodeURI(urlValue);

        if (urlValue.startsWith("//")) urlValue = "https:" + urlValue;

        //anchor links should be on same page or open external
        // if (urlValue[0] == "#") urlValue = url + urlValue;
        if (urlValue[0] == "/") urlValue = domain + urlValue;

        if (urlValue.startsWith("./"))
          urlValue = url.slice(0, url.lastIndexOf("/")) + urlValue;

        if (!urlValue.startsWith("http") && urlValue[0] != "#")
          urlValue = url.slice(0, url.lastIndexOf("/") + 1) + "/" + urlValue;

        if (el.href) el.href = urlValue;
        if (el.src) el.src = urlValue;
      }

      return el;
    })
    .reduce((acc, el) => {
      acc +=  el.text ? `${el.text}` :
      `<${el.tagName}${Object.keys(el).length>1 ? " ": ""}${Object.keys(el)
       .filter((key) => key != "tagName" && key != "text")
       .map((key) => `${key}="${el[key]}"`)
       .join(" ")}>`;
      return acc;
    }, "")
    .replace(/ \s+/g, " ")
    .replace(/<p><\/p>/g, " ")
    .replace(/[\r\n\t]+/g, " "); //remove linebreaks

  html = convertHTMLSpecialChars(
    html.replace(/&lt;/gi, " ").replace(/&gt;/gi, " ")
  ).replace(/&nbsp;/g, " ");

  // CNN news edge case of data=attr <> inside of attr
  const reHTMLInsideDataAttr =
    /(["'])(?:(?!(?:\1|<)).)*?(?:<(?:(?!["'<>]).)*?>)?(?:(?!(?:\1|<)).)*?\1/gis;
  if (reHTMLInsideDataAttr.test(html))
    html = html.replaceAll(reHTMLInsideDataAttr, "");

  return basicHtml;
}

/**
 * Convert relative URL to absolute URL using base URL.
 * @param {string} base base url of the domain
 * @param {string} relative partial urls like ../images/image.jpg #hash
 * @returns {string} absolute URL
 * @private
 */
export function convertURLAbsoluteURL(base, relative) {
  // Remove hash from base URL
  base = base.replace(/#.*$/, "");

  // If the relative URL is a full URL, return it
  if (/^[a-z][a-z0-9+.-]*:/i.test(relative)) {
    return relative;
  }

  // If relative URL starts with '//', add scheme from base
  if (relative.substring(0, 2) === "//") {
    return base.split("://")[0] + ":" + relative;
  }

  // If relative URL starts with '/', replace everything after the host in base
  if (relative.charAt(0) === "/") {
    return base.replace(/\/([^\/]+)$/, "").replace(/\/+$/, "") + relative;
  }

  // Remove file part from base
  base = base.replace(/\/[^\/]+$/, "");

  // Handle relative URLs
  while (relative.substring(0, 3) === "../") {
    relative = relative.substring(3);
    base = base.replace(/\/[^\/]+$/, "");
  }
  relative = relative.replace(/^\.\//, "");

  // Combine base and relative
  return base.replace(/\/+$/, "") + "/" + relative;
}

/**
 * Convert html string to array of JSON Objects tokens to translate,
 * convert, or filter all elements.
 * Flat array is faster than DOMParser which uses nested trees.
 * @param {string} html
 * @returns {array}  Example [{"tag": "img","src": ""}, ...]
 * @category Extractor
 * @private
 */
export function convertHTMLToTokens(html) {
  if (!html) return;
  var dom = [];

  //remove script style to prevent it from counting as text
  html = html.replace(
    /(<(noscript|script|style)\b[^>]*>).*?(<\/\2>)/gis,
    "$1$3"
  )
  // .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  // .replace(/<!--[\s\S]*?-->/g, '');


  const reHTMLInsideDataAttr =
    /(["'])(?:(?!(?:\1|<)).)*?(?:<(?:(?!["'<>]).)*?>)?(?:(?!(?:\1|<)).)*?\1/gis;

  var chunks = html.split("<");

  for (var chunk of chunks) {
    if (!chunk.includes(">")) continue;

    var [element, text] = chunk.split(">");

    if (element.includes("<")) {
      if (reHTMLInsideDataAttr.test(html)) {
        html = html.replaceAll(reHTMLInsideDataAttr, "");
        return convertHTMLToTokens(html);
      }
    }

    //if closing tag, add it but dont stop and also  in next step
    // add text after </a> as text node
    if (element[0] == "/") dom.push({ tagName: element });

    if (element[0] == "!") continue; //skip comments

    var domElement = {};
    //if has attributes
    var attributesIndex = element.indexOf(" ");

    if (attributesIndex == -1) {
      domElement.tagName = element;
    } else {
      //has attributes

      var tag = element.substring(0, attributesIndex);
      domElement.tagName = tag;
      // there can be spaces and <> inside of attr strings
      //TODO cnn news edge case of data=attr <> inside of attr
      //insert attr into domElement
      element
        .substring(attributesIndex)
        .match(/\w+=("(?:[^"\\]|\\.\s)*")/g)
        ?.forEach((attr) => {
          var key = attr.split("=")[0];
          var value = attr.slice(key.length + 2, -1);

          if (key && value) domElement[key] = value?.replace(/"/g, "");
        });
    }

    // style and script, add their content to "content" and dont treat as text
    if (["style", "script", "noscript"].includes(domElement.tagName)) {
      domElement.content = text;
      continue;
    }

    dom.push(domElement);

    //if text node push as {text:""}
    if (text && text.trim().length) dom.push({ tagName: "text", text: text });
  }

  // dom = addDOMFunctions(dom);

  return dom;
};

export function addDOMFunctions(domObject) {
    //assign to all objects for easy chain calling
    domObject = domObject || Object.prototype;

    domObject =  Object.assign(domObject, {
    querySelectorAll: function (querySelector) {

      if (querySelector.includes(",")) //multiple selectors
       var selectors = querySelector.split(",").map((sel) => sel.trim());

      var type = selector[0];
      selector = selector.substring(1);

      if (type == ".")
        //class
        return this.filter((el) => el.class == selector);
      if (type == "#")
        //id
        return this.filter((el) => el.id == selector);
      if (type == "[")
        //attribute
        return this.filter((el) => el[selector] !== undefined);
      //tag
      else return this.filter(({ tagName }) => tagName == selector);
    },
    querySelector: function (selector) {
      return this.querySelectorAll(selector)[0];
    },
    getTextContent: function () {
      return this.reduce(
        (acc, { text }) => (acc += text ? text + "\n" : ""),
        ""
      );
    },
    getAttribute: function (attr) {
      return this.map((el) => el[attr]).filter(Boolean);
    },
    getElementsByTagName: function (tag) {
      return this.filter(({ tagName: t }) => t == tag).map(addDOMFunctions);
    },
    getElementsByClassName: function (className) {
      return this.filter((el) => el.class == className);
    },
    getElementById: function (id) {
      return this.filter((el) => el.id == id);
    },
    getInnerHTML: function () {
      return this.reduce((acc, el) => {
          
         acc +=  el.text ? `${el.text}` :
         `<${el.tagName} ${Object.keys(el)
          .filter((key) => key != "tagName" && key != "text")
          .map((key) => `${key}="${el[key]}"`)
          .join(" ")}>`;
        return acc;
      }, "");
    },
  });


  domObject.innerHTML = domObject.getInnerHTML();
  domObject.textContent = domObject.getTextContent();


  return domObject;
}