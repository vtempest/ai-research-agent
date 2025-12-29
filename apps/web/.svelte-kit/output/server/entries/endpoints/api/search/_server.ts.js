import "@langchain/langgraph/prebuilt";
import "@langchain/core/tools";
import "langchain/hub";
import "@langchain/openai";
import "@langchain/anthropic";
import "@langchain/groq";
import "@langchain/community/chat_models/perplexity";
import "@langchain/cloudflare";
import "@langchain/ollama";
import "@langchain/community/llms/togetherai";
import "@langchain/xai";
import "@langchain/google-vertexai-web";
import { c as convertURLSafeHTMLToHTML } from "../../../../chunks/BlockType.js";
import "js-yaml";
import { getDomainWithoutSuffix } from "tldts";
import { parseDate } from "chrono-node";
import "linkedom";
import "jszip";
import "katex";
import "marked";
import { json } from "@sveltejs/kit";
import "../../../../chunks/schema.js";
import "stripe";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import { p as proxyDomain, s as searxngDomain } from "../../../../chunks/customize-site.js";
import "resend";
import "../../../../chunks/validations.js";
async function searchWeb(query, options = {}) {
  const {
    category = "general",
    recency,
    privateSearxng = null,
    maxRetries = 3,
    page = 1,
    safesearch = false,
    lang = "en-US",
    proxy = null
  } = options;
  const CATEGORY_LIST = [
    "general",
    "news",
    "videos",
    "images",
    "science",
    "it",
    "files",
    "social+media"
  ];
  const RECENCY_ALLOWED_LIST = ["day", "week", "month", "year"];
  const SEARX_DOMAINS = [
    "baresearch.org",
    "copp.gg",
    "darmarit.org",
    "etsi.me",
    "fairsuch.net",
    "nogoo.me",
    "northboot.xyz",
    "nyc1.sx.ggtyler.dev",
    "ooglester.com",
    "opnxng.com",
    "paulgo.io",
    "priv.au",
    "s.trung.fun",
    "search.blitzw.in",
    "search.charliewhiskey.net",
    "search.citw.lgbt",
    "search.darkness.services",
    "search.datura.network",
    "search.dotone.nl",
    "search.gcomm.ch",
    "search.hbubli.cc",
    "search.im-in.space",
    "search.incogniweb.net",
    "search.inetol.net",
    "search.leptons.xyz",
    "search.nadeko.net",
    "search.ngn.tf",
    "search.ononoki.org",
    "search.privacyredirect.com",
    "search.sapti.me",
    "search.rowie.at",
    "search.projectsegfau.lt",
    "search.tommy-tran.com",
    "searx.aleteoryx.me",
    "searx.ankha.ac",
    "searx.be",
    "searx.colbster937.dev",
    "searx.daetalytica.io",
    "searx.dresden.network",
    "searx.foss.family",
    "searx.hu",
    "searx.juancord.xyz",
    "searx.lunar.icu",
    "searx.mxchange.org",
    "searx.namejeff.xyz",
    "searx.oakleycord.dev",
    "searx.ro",
    "searx.sev.monster",
    "searx.thefloatinglab.world",
    "searx.tiekoetter.com",
    "searx.tuxcloud.net",
    "searx.work",
    "searx.zhenyapav.com",
    "searxng.hweeren.com",
    "searxng.online",
    "searxng.shreven.org",
    "searxng.site",
    "skyrimhater.com",
    "sx.ca.zorby.top",
    "sx.catgirl.cloud",
    "sx.thatxtreme.dev",
    "sx.zorby.top",
    "xo.wtf"
  ];
  const searchDomain = privateSearxng || "https://" + SEARX_DOMAINS[Math.floor(Math.random() * SEARX_DOMAINS.length)];
  const categoryName = typeof category === "number" ? CATEGORY_LIST[category] : category;
  var url = `${searchDomain}/search?q=${encodeURIComponent(query)}&category_${categoryName}=1&language=${lang}${recency in RECENCY_ALLOWED_LIST ? "&time_range=" + recency : ""}&safesearch=${safesearch ? "1" : "0"}&pageno=${page}`;
  if (privateSearxng) url += "&format=json";
  if (proxy && !privateSearxng) url = proxy + url;
  const resultHTML = await (await fetch(url, {
    headers: {
      "accept-language": lang + ",en;q=0.9"
    }
  })).text();
  if (privateSearxng) {
    if (!resultHTML.startsWith("{")) return { error: "Private SearXNG instance did not return valid JSON" };
    var { results, suggestions, infoboxes } = JSON.parse(resultHTML);
    results = results.map((result) => {
      var title = result.title.replace(/<\/?[^>]+(>|$)/g, "");
      const TITLE_SPLITTERS_RE = /( [|\-\/:»] )|( - )|(\|)/;
      if (TITLE_SPLITTERS_RE.test(title)) {
        const splitTitle = title.split(TITLE_SPLITTERS_RE);
        if (splitTitle.length >= 2) {
          const longestPart = splitTitle.reduce(
            (acc, part) => part?.length > acc?.length ? part : acc,
            ""
          );
          if (longestPart.length > 10) {
            title = longestPart;
          }
        }
      }
      title = convertURLSafeHTMLToHTML(title);
      var url2 = result.url.replace(/&amp;/g, "&");
      var snippet = result.content?.replace(/<\/?[^>]+(>|$)/g, "");
      var score = Math.round(result.score * 100) / 100;
      var domain = result.url?.replace(/(http:\/\/|https:\/\/|www.)/gi, "").split("/")[0];
      let date = null, source = null;
      if (typeof result.metadata === "string") {
        const [datePart, sourcePart] = result.metadata.split("|").map((s) => s.trim());
        date = parseDate(result.metadata)?.toISOString().split("T")[0] || void 0;
        source = sourcePart || null;
      }
      if (!source) {
        source = getDomainWithoutSuffix(domain).replace(
          /\b\w/g,
          (l) => l.toUpperCase()
        );
        if (source.length < 5) source = source.toUpperCase();
      }
      var favicon = "https://www.google.com/s2/favicons?domain=" + result.url.match(
        /^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i
      )?.[0] + "&sz=16";
      return {
        title,
        url: url2,
        snippet,
        score,
        ...date ? { date } : {},
        ...source ? { source } : {},
        domain,
        favicon
      };
    });
    return { results, suggestions, infoboxes };
  }
  results = [];
  const resultRegex = /<article class="result[^>]*>[\s\S]*?<\/article>/g;
  const titleUrlRegex = /<h3><a href="([^"]*)"[^>]*>(.*?)<\/a><\/h3>/;
  const snippetRegex = /<p class="content">\s*(.*?)\s*<\/p>/;
  const enginesRegex = /<span>(bing|duckduckgo|yahoo|google)<\/span>/g;
  let match;
  while ((match = resultRegex.exec(resultHTML)) !== null) {
    const resultHtml = match[0];
    const titleUrlMatch = titleUrlRegex.exec(resultHtml);
    const snippetMatch = snippetRegex.exec(resultHtml);
    if (titleUrlMatch && titleUrlMatch[1] && titleUrlMatch[2]) {
      const url2 = convertURLSafeHTMLToHTML(titleUrlMatch[1]);
      let title = titleUrlMatch[2].replace(/<\/?[^>]+(>|$)/g, "");
      let snippet = snippetMatch ? snippetMatch[1].replace(/<\/?[^>]+(>|$)/g, "") : "";
      let engines = [];
      let engineMatch;
      while ((engineMatch = enginesRegex.exec(resultHtml)) !== null) {
        engines.push(engineMatch[1]);
      }
      title = convertURLSafeHTMLToHTML(title);
      snippet = convertURLSafeHTMLToHTML(snippet);
      results.push({ title, url: url2, snippet });
    }
  }
  if (results.length === 0 && maxRetries > 0) {
    results = await searchWeb(query, {
      ...options,
      maxRetries: maxRetries - 1,
      useProxy: true
    });
  }
  results = results.map((result) => {
    var favicon = "https://www.google.com/s2/favicons?domain=" + result.url.match(
      /^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i
    )?.[0];
    var domain = result.url?.replace(/(http:\/\/|https:\/\/|www.)/gi, "").split("/")[0];
    return {
      ...result,
      domain,
      favicon
    };
  });
  return results;
}
async function GET({ url }) {
  const {
    q: query,
    cat = "general",
    page = 1,
    lang = "en-US",
    safesearch = false,
    recency,
    publicInstances = false
  } = Object.fromEntries(url.searchParams.entries());
  let startTime = Date.now();
  if (!query) return json({ error: "Query parameter is required" });
  let results = await searchWeb(query, {
    category: cat,
    recency,
    safesearch,
    maxRetries: 6,
    privateSearxng: publicInstances ? false : searxngDomain,
    proxy: proxyDomain,
    lang,
    page
  });
  if (!results)
    results = await searchWeb(query, {
      category: cat,
      recency,
      safesearch,
      maxRetries: 6,
      privateSearxng: false,
      proxy: proxyDomain,
      lang,
      page
    });
  if (!results)
    return json({ error: "No results found" }, { status: 500 });
  let elapsedTime = Date.now() - startTime;
  return json({ ...results, elapsedTime });
}
export {
  GET
};
