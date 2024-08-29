/**
 * Strip HTML to ~30 basic markup HTML tags, lists, tables, images.
 * Convert anchors and relative urls to absolute urls. Basic HTML supports the same
 * elements as Markdown, which is used in writing plain text. Markdown is converted
 * to HTML anyways to display it, and it is better to edit basic HTML in a rich text editor.
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
    allowedAttributes = "text,tag,href,src,type,width,height,id,data".split(","),
  } = options;


  allowTags = allowTags.split(",");
  if (links) allowTags.push("a");
  if (images) allowTags.push("img");
  if (videos) allowTags = allowTags
    .concat("video,source,embed,object".split(","))


  if (!formatting) allowTags = ["text"];
  allowTags.push("text");

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
      var urlValue = el.href || el.src;

        const matchdomain = url.match(/^(https?:\/\/[^\/]+)/i);
        const domain =  matchdomain ? matchdomain[1] : null;

    
      if ( urlValue) {
        urlValue = decodeURI(urlValue);

        if (urlValue.startsWith("//")) urlValue = "https:" + urlValue;

        //anchor links should be on same page or open external
        // if (urlValue[0] == "#") urlValue = url + urlValue;
          if (urlValue[0] == "/") urlValue = domain + urlValue;

        if (urlValue.startsWith("./"))
          urlValue =  url.slice(0,url.lastIndexOf("/")) + urlValue;
        

        if (!urlValue.startsWith("http") && urlValue[0] != "#")  
          urlValue = url.slice(0, url.lastIndexOf('/')+1) + "/" + urlValue;

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
    .replace(/ \s+/g, " ")
    .replace(/<p><\/p>/g, " ")
    .replace(/[\r\n\t]+/g, " "); //remove linebreaks



  html = convertHTMLSpecialChars(html
    .replace(/&lt;/gi, " ")
    .replace(/&gt;/gi, " ")
    ).replace(/&nbsp;/g, " ");
  


    // CNN news edge case of data=attr <> inside of attr
  const reHTMLInsideDataAttr =  /(["'])(?:(?!(?:\1|<)).)*?(?:<(?:(?!["'<>]).)*?>)?(?:(?!(?:\1|<)).)*?\1/gis;
  if (reHTMLInsideDataAttr.test(html) ) 
    html= html.replaceAll(reHTMLInsideDataAttr, "");


  return basicHtml;
}

/**
 * Convert html string to array of JSON Objects tokens to translate,
 * convert, or filter all elements. Example [{"tag": "img","src": ""}, ...]
 * Flat array is faster than DOMParser which uses nested trees.
 * @param {string} html
 * @returns {array}
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
  );

  
  const reHTMLInsideDataAttr =  /(["'])(?:(?!(?:\1|<)).)*?(?:<(?:(?!["'<>]).)*?>)?(?:(?!(?:\1|<)).)*?\1/gis;
  

  var chunks = html.split("<");

  for (var chunk of chunks) {
    if (!chunk.includes(">")) continue;


    var [element, text] = chunk.split(">");

    if (element.includes("<")) {

      if (reHTMLInsideDataAttr.test(html) ) {
        html= html.replaceAll(reHTMLInsideDataAttr, "");
        return convertHTMLToTokens(html);
      }
      // console.log("HTML inside data attr", element);
      // if (reHTMLInsideDataAttr.test(chunk) ) {
      //   chunk = chunk.replaceAll(reHTMLInsideDataAttr, " ");

      //   var [element, text] = chunk.split(">");
      // }

    }

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
    } else { //has attributes
      

      var tag = element.substring(0, attributesIndex);
      domElement.tag = tag;
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



/**
 * Converts HTML special characters like &<>"'`&rsquo; to & escaped codes or vice versa.
 * It handles named entities, decimal numeric character references, and hexadecimal numeric character references.
 *
 * @param {string} str - The string to process.
 * @param {boolean} unescape  default=true - If true, converts & codes to characters. 
 *                                     If false, converts characters to codes.
 * @return {string} The processed string.
 * @category Extractor
 * @example
 * convertHTMLSpecialChars('&lt;p&gt;This &amp; that &copy; 2023 &quot;Quotes&quot; &#39;Apostrophes&#39; &euro;100 &#x263A;&lt;/p&gt;', true)
 * // Returns: "<p>This & that © 2023 "Quotes" 'Apostrophes' €100 ☺</p>"
 */
export function convertHTMLSpecialChars(str, unescape = true ) {
  
  const entityMap  = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    ' ': '&nbsp;',
    "'": '&#39;',
    '`': '&#96;',
    '¢': '&cent;',
    '£': '&pound;',
    '¥': '&yen;',
    '€': '&euro;',
    '©': '&copy;',
    '®': '&reg;',
    '™': '&trade;',
  };

  // Add numeric character references for Latin-1 Supplement characters
  for (let i = 160; i <= 255; i++) {
    entityMap[String.fromCharCode(i)] = `&#${i};`;
  }

  if (unescape) {
    // Create a reverse mapping for unescaping
    const reverseEntityMap = 
      Object.fromEntries(Object.entries(entityMap).map(([k, v]) => [v, k]));
    
    // Add alternative representations
    reverseEntityMap['&apos;'] = "'";
    reverseEntityMap['&laquo;'] = '«';
    reverseEntityMap['&raquo;'] = '»';
    
    // Regex to match all types of HTML entities
    const entityRegex = new RegExp(
      Object.keys(reverseEntityMap).join('|') + '|&#[0-9]+;|&#x[0-9a-fA-F]+;',
      'g'
    );



    str = str.replace(entityRegex, entity => {
      if (entity.startsWith('&#x')) {
        // Convert hexadecimal numeric character reference
        return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
      } else if (entity.startsWith('&#')) {
        // Convert decimal numeric character reference
        return String.fromCharCode(parseInt(entity.slice(2, -1), 10));
      }
      // Convert named entity
      return reverseEntityMap[entity] || entity;
    });

    str = str.replace(/[\u0300-\u036f]/g, "") //special chars

    return str;
  } else {
    // Regex to match all characters that need to be escaped
    const charRegex = new RegExp(`[${Object.keys(entityMap).join('')}]`, 'g');
    return str.replace(charRegex, char => entityMap[char]);
  }
}
