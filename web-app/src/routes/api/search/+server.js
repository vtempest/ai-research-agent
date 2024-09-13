import { searchSTREAM, searchWeb } from "../../../../../";
import { json } from '@sveltejs/kit';
import { searxngDomain } from "$lib/config/config.js";

export async function GET({ url }) {
    const query = url.searchParams.get('q');
    const category = parseInt(url.searchParams.get('cat') || '0');
    const recency = parseInt(url.searchParams.get('time') || '0');
    const maxTopResultsToExtract = parseInt(url.searchParams.get('limitExtract') || '4');

    let startTime = Date.now();
    if (!query) 
        return json({ error: 'Query parameter is required' })
        

    
  let results = await searchWeb(query, {
    category,
    recency,
    maxRetries: 6,
    customSearxngDomain: searxngDomain,
  });
  

        // const results = await searchSTREAM(query, {
        //     categoryIndex,
        //     recencyIndex,
        //     maxTopResultsToExtract,
        //     selectedDomain

        // });


        if (!results  ) {
            return json(results, {status: 500});
        }

        let elapsedTime = Date.now() - startTime;
        let response = {results, elapsedTime}
        return new Response(JSON.stringify(response), {
            headers: { 'Content-Type': 'application/json' }
        });
    // } catch (error) {
    //     return new Response(JSON.stringify({ error: 'An error occurred while fetching search results' }), {
    //         status: 500,
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    // }
}