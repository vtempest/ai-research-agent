
/**
 * Extract author cite info from document using common class names and looking for "by " line in text
 *
 * @param {document} document document or dom object with article content
 * @returns {string} author
 */
export default function extractAuthor(document) {
  var arrAuthors,  author;

  arrAuthors = document.getElementsByClassName("author"); //Try author
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("Author");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("sailthru.author");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("byl");
  if (arrAuthors.length <= 0)
    arrAuthors = document.getElementsByClassName("byline");

  if (arrAuthors.length > 0) author = arrAuthors[0]?.textContent.trim();

  //youtube channel name
  if (arrAuthors.length <= 0)
    author = document
      .querySelectorAll("link[itemprop='name']")?.[0]
      ?.getAttribute("content");

  if (typeof author == "undefined") {
    arrAuthors = document.getElementsByClassName("author");
    if (arrAuthors.length <= 0) {
      arrAuthors = document.getElementsByClassName("byline");
    }
    if (arrAuthors.length > 0) {
      author = arrAuthors[0].innerText.trim(); //If anything found, assign Name the innerText
      if (author.indexOf("\n") != -1) {
        author = author.slice(0, author.indexOf("\n") + 1);
      } 

    }
  }

  if (typeof author == "undefined") 
    Array.from(document.getElementsByTagName("div"))
    .concat(Array.from(document.getElementsByTagName("span")))
    .forEach((div) => {
      if (
        div.id.search(/author/i) > -1 ||
        div.className.search(/author/i) > -1 ||
        div.id.search(/byline/i) > -1 ||
        div.className.search(/byline/i) > -1
      ) {
        author = div.innerText.trim();
        if (author.indexOf("\n") > 0) {
          author = author.slice(0, author.indexOf("\n") + 1);
        } 
      }
    })

  author = author?.trim().replace(/by /gi, '') || "";

  return author;
}
