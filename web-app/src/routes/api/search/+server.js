import { searchSTREAM, searchWeb } from "$airesearchagent";
import { json } from "@sveltejs/kit";
import { searxngDomain, proxy } from "$lib/config/config.js";


export async function GET({ url }) {
  const query = url.searchParams.get("q");
  const category = parseInt(url.searchParams.get("cat") || "0");
  const recency = parseInt(url.searchParams.get("time") || "0");
  const optionUsePublicSearxng = (url.searchParams.get("public") || "false") === "true";
  const maxTopResultsToExtract = parseInt(
    url.searchParams.get("limitExtract") || "4"
  );
  const page = parseInt(url.searchParams.get("page") || "1");
  let startTime = Date.now();
  if (!query) return json({ error: "Query parameter is required" });

    // privateSearxng: searxngDomain,

  let results = await searchWeb(query, {
    category,
    recency,
    maxRetries: 6,
    // use custom or false to use the public instances
    privateSearxng: 
      optionUsePublicSearxng ? null : searxngDomain,
    proxy,
    page
  });

  if (!results) 
    return json(results, { status: 500 });
  

  let elapsedTime = Date.now() - startTime;
  let response = { results, elapsedTime };
  return json(response);
}
