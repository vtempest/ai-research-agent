import katex from "katex";
import { marked } from "marked";
import hljs from "highlight.js";
function convertMathLaTexToImage(html) {
  try {
    const replacedHtml = html.replace(
      /<math>(.*?)<\/math>|\[document.*?\[\/document>/gs,
      (match, p1) => {
        const curlyBracesContent = p1.match(/{([^}]*)}(?!.*})/) ?? [];
        const documentClassContent = p1.match(
          /\[document.*?\[\/document>/gs
        ) ?? [];
        if (!curlyBracesContent && !documentClassContent) return match;
        var equationFormula = curlyBracesContent[0] ?? documentClassContent[0];
        equationFormula = equationFormula?.replace(/\\/g, "\\").replace(/\[documentclass.*?\[/g, "").replace(/\[\/document>/g, "").replace(/\[.+\]/g, "");
        var htmlEquation = katex.renderToString(equationFormula, {
          throwOnError: false,
          output: "html",
          displayMode: false,
          strict: false
        });
        return htmlEquation;
      }
    );
    return replacedHtml;
  } catch (e) {
    console.log(e);
    return html;
  }
}
function convertURLSafeHTMLToHTML(str, toStandardHTML = true) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    " ": "&nbsp;",
    "'": "&#39;",
    "`": "&#96;",
    "¢": "&cent;",
    "£": "&pound;",
    "¥": "&yen;",
    "€": "&euro;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;"
  };
  for (let i = 160; i <= 255; i++) {
    entityMap[String.fromCharCode(i)] = `&#${i};`;
  }
  if (toStandardHTML) {
    const reverseEntityMap = Object.fromEntries(
      Object.entries(entityMap).map(([k, v]) => [v, k])
    );
    reverseEntityMap["&apos;"] = "'";
    reverseEntityMap["&laquo;"] = "«";
    reverseEntityMap["&raquo;"] = "»";
    const entityRegex = new RegExp(
      Object.keys(reverseEntityMap).join("|") + "|&#[0-9]+;|&#x[0-9a-fA-F]+;",
      "g"
    );
    str = str.replace(entityRegex, (entity) => {
      if (entity.startsWith("&#x")) {
        return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
      } else if (entity.startsWith("&#")) {
        return String.fromCharCode(parseInt(entity.slice(2, -1), 10));
      }
      return reverseEntityMap[entity] || entity;
    });
    str = str.replace(/[\u0300-\u036f]/g, "");
    return str;
  } else {
    const charRegex = new RegExp(`[${Object.keys(entityMap).join("")}]`, "g");
    return str.replace(charRegex, (char) => entityMap[char]);
  }
}
function convertMarkdownToHTML(content, toHtml = true) {
  if (!toHtml) return convertHTMLToMarkdown(content);
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-"
  });
  return content?.length ? marked.parse(content) : "";
}
function convertHTMLToMarkdown(html) {
  var markdown = html.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, content) => {
    return "#".repeat(parseInt(level)) + " " + content.trim() + "\n\n";
  }).replace(/<strong>(.*?)<\/strong>/g, "**$1**").replace(/<b>(.*?)<\/b>/g, "**$1**").replace(/<em>(.*?)<\/em>/g, "*$1*").replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
    return content.replace(/<li>(.*?)<\/li>/g, "* $1\n") + "\n";
  }).replace(/<ol>(.*?)<\/ol>/gs, (match, content) => {
    let index = 1;
    return content.replace(/<li>(.*?)<\/li>/g, () => `${index++}. $1
`) + "\n";
  }).replace(/<p>(.*?)<\/p>/g, "$1\n\n").replace(/<img src="(.*?)" alt="(.*?)".*?\/>/g, "![$2]($1)").replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)").replace(/<[^>]*>/g, "").trim();
  return markdown;
}
export {
  convertMarkdownToHTML as a,
  convertMathLaTexToImage as b,
  convertURLSafeHTMLToHTML as c
};
