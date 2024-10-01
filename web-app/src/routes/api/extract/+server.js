import { extract, scrapeURL} from "$airesearchagent";
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  
  let urlToExtract = url.searchParams.get("url");
  
  let optionReturnFullHtml = url.searchParams.get("full");

  if (!urlToExtract) 
    return json({error: "URL parameter is required" }, { status: 500 });

  if (optionReturnFullHtml == "true") {
    let html = await scrapeURL(urlToExtract);
    console.log(html);
    var domain = urlToExtract.split("://")[1].split("/")[0];
    // html = (html || "").replace(/<head[^>]*>/i, "<head><base href='" + domain + "/'>")

    return json(html);
  }

  let results = await extract(urlToExtract);

  if (!results || results.error)
    return json(results)

  return json(results,{
    headers: {  
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=360000'
    }
  });
}
