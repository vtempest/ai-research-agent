import { json } from '@sveltejs/kit';
export async function GET({ url, fetch }) {


    const githubUrl = 'https://raw.githubusercontent.com/vtempest/ai-research-agent/master/data/wiki-phrases-model-240k.json'
    if (!githubUrl) {
        return json({ error: 'No GitHub URL provided' }, { status: 400 });
    }

    try {
        // Fetch the raw content from GitHub
        const response = await fetch(githubUrl);

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const data = await response.json();

        return json(data, {
            headers: {  
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=360000'
            }
            }
        );
        
        // Return the JSON data
        // return json(data);
    } catch (error) {
        console.error('Error fetching GitHub JSON:', error);
        return json({ error: 'Failed to fetch GitHub JSON' }, { status: 500 });
    }
}