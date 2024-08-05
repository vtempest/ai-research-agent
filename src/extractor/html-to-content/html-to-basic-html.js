/**
 * Strip HTML to 26 basic markup HTML tags, lists, tables, images.
 * Convert anchors and relative urls to absolute urls.
 *
 * @param {string} html
 * @param {object} options {images: 0, links: 1, sections: 1, formatting: 1 }
 * @returns {string} sanitized html
 * @category Extractor
 */
export  function convertHTMLToBasicHTML(html, options = {}) {
  var {
    images = 1,
    links = 1,
    formatting = 1,
    url = "",
    allowTags = "br,p,u,b,i,em,strong,h1,h2,h3,h4,h5,h6,blockquote,code,\
      ul,ol,li,dd,dl,table,th,tr,td",
  } = options;

  allowTags = allowTags.split(",");
  if (links) allowTags.push("a");
  if (images) allowTags.push("img");

  if (!formatting) allowTags = ["text"];
  allowTags.push("text");

  var allowedAttributes = ["text", "tag", "href", "src"];

  // Convert html string to array like [{tag:"p",attr:""},{text:""}]
  var basicHtml = convertHTMLToTokens(html)
    .filter(
      (token) =>
        token.text ||
        (token.tag[0] == "/"
          ? allowTags.includes(token.tag?.substring(1))
          : allowTags.includes(token.tag))
    )
    .map((el) => {
      for (var key of Object.keys(el))
        if (!allowedAttributes.includes(key)) delete el[key];

      //convert relative urls to absolute urls
      var urlValue = el.href; //|| el.src;
      if ( urlValue) {
        if (urlValue.startsWith("//")) urlValue = "https:" + urlValue;

        if (urlValue[0] == "#") urlValue = url + urlValue;
        try {
          if (urlValue[0] == "/") urlValue = new URL(url).origin + urlValue;
        } catch (e) {}

        if (el.href) el.href = urlValue;
        if (el.src) el.src = urlValue;
      }

      return el;
    })
    .reduce((acc, el) => {
      if (el.text) acc += el.text;
      else if (el.tag)
        acc += `<${el.tag}${Object.keys(el)
          .filter((key) => key != "tag")
          .map((key) => " " + key + '="' + el[key] + '"')
          .join(" ")}>`;
      return acc;
    }, "")
    .replace(/[\u0300-\u036f]/g, "") //special chars
    .replace(/ \s+/g, " ")
    .replace(/<p><\/p>/g, " ")
    .replace(/[\r\n\t]+/g, " "); //remove linebreaks

  return basicHtml;
}

/**
 * Convert html string to array of JSON Objects tokens to translate,
 * convert, or filter all elements. Example [{"tag": "img","src": ""}, ...]
 * Flat array is faster than DOMParser which uses nested trees.
 * @param {string} html
 * @returns {array}
 * @category Extractor
 */
export function convertHTMLToTokens(html) {
  if (!html) return;
  var dom = [];

  //remove script style to prevent it from counting as text
  html = html.replace(
    /(<(noscript|script|style)\b[^>]*>).*?(<\/\2>)/gis,
    "$1$3"
  );

  var chunks = html.split("<");

  for (var chunk of chunks) {
    if (!chunk.includes(">")) continue;


    var [element, text] = chunk.split(">");


    //if closing tag, add it but dont stop and also  in next step 
    // add text after </a> as text node
    if (element[0] == "/") 
      dom.push({ tag: element });


    if (element[0] == "!") continue; //skip comments

    var domElement = {};
    //if has attributes
    var attributesIndex = element.indexOf(" ");

    if (attributesIndex == -1) {
      domElement.tag = element;
    } else {
      var tag = element.substring(0, attributesIndex);
      domElement.tag = tag;

      //insert attr into domElement
      element
        .substring(attributesIndex)
        .split(" ")
        .forEach((attr) => {
          var [key, value] = attr.split("=");

          if (key && value) domElement[key] = value?.replace(/"/g, "");
        });
    }

    // style and script, add their content to "content" and dont treat as text
    if (["style", "script", "noscript"].includes(domElement.tag)) {
      domElement.content = text;
      continue;
    }

    dom.push(domElement);

    //if text node push as {text:""}
    if (text && text.trim().length) dom.push({ tag: "text", text: text });
  }


  return dom;
}
