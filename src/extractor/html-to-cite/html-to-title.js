/**
 * Extract title from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} title
 */
export default function extractTitle(document) {
  var title, arrTitles;

  if (typeof title == "undefined") {
    arrTitles = document.getElementsByClassName("og:title"); //Try og:title
    if (arrTitles.length <= 0) 
      arrTitles = document.getElementsByClassName("DC.title");
    if (arrTitles.length <= 0) 
      arrTitles = document.getElementsByClassName("headline");
    if (arrTitles.length <= 0) {
      var arrMeta = document.getElementsByTagName("meta");
      for (var i = 0; i < arrMeta.length; i++) {
        if (arrMeta[i].getAttribute("property") == "og:title") {
          title = arrMeta[i].content;
        } 
      }
    }

    if (typeof title == "undefined") 
      title = document.title;

    if (typeof title != "undefined") {
      if (title.indexOf("|") != -1) 
        title = title.slice(0, title.indexOf("|") - 1);
      if (title.indexOf("--") != -1) 
        title = title.slice(0, title.indexOf("--") - 1);
      if (title.indexOf(" - ") != -1) 
        title = title.slice(0, title.indexOf(" - "));
    }
  }

  return title;
}
