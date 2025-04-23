// @ts-ignore
import {  searchWeb } from "$ai-research-agent";

import { json } from "@sveltejs/kit";
import { searxngDomain, proxy } from "$lib/server";


export async function GET({ url }) {
  const {
    q: query,
    cat = "general",
    page = 1,
    lang = "en-US",
    recency = 0,
    publicInstances = false,
  } = Object.fromEntries(url.searchParams.entries());


  let startTime = Date.now();
  if (!query) return json({ error: "Query parameter is required" });


    // use custom or false to use the public instances

  let results = await searchWeb(query, {
    category: cat,
    recency,
    maxRetries: 6,
    privateSearxng: publicInstances ? false : searxngDomain,
    proxy,
    lang,
    page
  });

  if (!results)
    results = await searchWeb(query, {
      category: cat,
      recency,
      maxRetries: 6,
      privateSearxng: false,
      proxy,
      lang,
      page
    });


  if (!results) 
    return json(results, { status: 500 });
  

  let elapsedTime = Date.now() - startTime;
  let response = { results, elapsedTime };
  return json(response);
}
