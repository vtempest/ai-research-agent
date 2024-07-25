import { json } from '@sveltejs/kit';
import { config } from 'dotenv';

config();
export async function GET({ url, fetch }) {

    const githubUrl = process.env.PHRASES_MODEL_URL;

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

        // Return the JSON data
        return json(data);
    } catch (error) {
        console.error('Error fetching GitHub JSON:', error);
        return json({ error: 'Failed to fetch GitHub JSON' }, { status: 500 });
    }
}