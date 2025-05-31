import {
  scrapeURL,
  extractContent,
  convertHTMLToBasicHTML,
} from "$ai-research-agent";

import { json } from "@sveltejs/kit";
import { proxyDomain, initializeUser } from '$lib/server';

export async function GET({ url, locals }) {
  const {
    url: urlToExtract,
    full: optionReturnAllHTML = false,
    basic: optionBasicHTML = false,
    proxylinks,
  } = Object.fromEntries(url.searchParams.entries());

  if (!urlToExtract)
    return json({ error: "URL parameter is required" }, { status: 500 });

  let user = await initializeUser(locals);

  
  if (optionReturnAllHTML == "true") {
    let html = await scrapeURL(url);

    if (optionBasicHTML)
      html = convertHTMLToBasicHTML(html, { url: urlToExtract });

    return json({html});
  }

  //use no proxy first
  let article = await extractContent(urlToExtract, {
    proxy: false,
    timeout: 4,
  });



  //as backup use via proxy puppeteer
  if (!article || article.error || article.html?.length < 1000)
    article = await extractContent(urlToExtract, {
      proxy: proxyDomain,
      timeout: 10,
    });

  if (!article || article.error)
    return json({ error: article.error }, { status: 500 });

  return json(article);
}
