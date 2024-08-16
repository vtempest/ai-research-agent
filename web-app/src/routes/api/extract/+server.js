import { extract, fetchURL } from "../../../../..";

export async function GET({ url }) {
  let urlToExtract = url.searchParams.get("url");

  if (!urlToExtract) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let results = await extract(urlToExtract);

  if (!results || results.error)
    return new Response(JSON.stringify(results), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
  // } catch (error) {
  //     return new Response(JSON.stringify({ error: 'An error occurred while fetching search results' }), {
  //         status: 500,
  //         headers: { 'Content-Type': 'application/json' }
  //     });
  // }
}
