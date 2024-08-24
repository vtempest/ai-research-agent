import { searchSTREAM, searchWeb } from "../../../../../";
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const query = url.searchParams.get('q');
    const categoryIndex = parseInt(url.searchParams.get('cat') || '0');
    const recencyIndex = parseInt(url.searchParams.get('recency') || '0');
    const maxTopResultsToExtract = parseInt(url.searchParams.get('limitExtract') || '4');

    let startTime = Date.now();
    if (!query) 
        return json({ error: 'Query parameter is required' })
        
    var selectedDomain = 
    "http://ec2-54-67-101-79.us-west-1.compute.amazonaws.com/searxng"

    // try {

    
  let results = await searchWeb(query, {
    categoryIndex,
    recencyIndex,
    maxRetries: 6,
    selectedDomain, 
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