import { extractContent, scrapeURL,
   convertHTMLToBasicHTML} from "$airesearchagent";
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  
  let urlToExtract = url.searchParams.get("url");
  let optionReturnFullHtml = url.searchParams.get("full");
  let optionBasicHTML = url.searchParams.get("basic");
  let optionProxyLinks = url.searchParams.get("proxylinks") || true;

  
  if (!urlToExtract) 
    return json({error: "URL parameter is required" }, { status: 500 });

  if (optionReturnFullHtml == "true") {
    let html = await scrapeURL(urlToExtract);

    if(optionProxyLinks && html)
      html = html.replace(/<head[^>]*>/i, "<head><base href='" + 
        urlToExtract.split("://")[1].split("/")[0] + "/'>")

    // if(optionBasicHTML)
      html = convertHTMLToBasicHTML(html, {url: urlToExtract})
  
    return json(html);
  }

  let results = await extractContent(urlToExtract);

  if (!results || results.error)
    return json(results)

  return json(results,{
    headers: {  
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=360000'
    }
  });
}
