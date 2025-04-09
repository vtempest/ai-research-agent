import {
  scrapeURL,
  extractContent,
  convertHTMLToBasicHTML,
} from "$ai-research-agent";

import { json } from "@sveltejs/kit";
import { proxy } from "$lib/server";

export async function GET({ url }) {
  const {
    url: urlToExtract,
    full: optionReturnAllHTML = false,
    basic: optionBasicHTML = false,
    proxylinks,
  } = Object.fromEntries(url.searchParams.entries());

  if (!urlToExtract)
    return json({ error: "URL parameter is required" }, { status: 500 });

  
  if (optionReturnAllHTML == "true") {
    let html = await scrapeURL(url);

    if (proxylinks && html)
      html = html.replace(
        /<head[^>]*>/i,
        "<head><base href='" + option.url.split("://")[1].split("/")[0] + "/'>"
      );

    if (optionBasicHTML)
      html = convertHTMLToBasicHTML(html, { url: urlToExtract });

    return json(html);
  }

  //use no proxy first
  let article = await extractContent(urlToExtract, {
    proxy: false,
    timeout: 4,
  });



  //as backup use via proxy puppeteer
  if (!article || article.error || article.html?.length < 1000)
    article = await extractContent(urlToExtract, {
      proxy,
      timeout: 10,
    });

  if (!article || article.error)
    return json({ error: article.error }, { status: 500 });

  // var html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <title>${article.title}</title></head>
  // <body>${article.cite + article.html}</body></html>`

  return json(article, {
    headers: {
      "Content-Type": "application/json",
      // "Cache-Control": "public, max-age=360000",
    },
  });
}
