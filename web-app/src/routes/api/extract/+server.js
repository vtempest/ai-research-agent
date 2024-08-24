import { extract} from "../../../../..";
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  let urlToExtract = url.searchParams.get("url");

  if (!urlToExtract) 
    return json({error: "Query parameter is required" }, { status: 500 });

  let results = await extract(urlToExtract);

  if (!results || results.error)
    return json(results, { status: 500 })

  return json(results);
}
