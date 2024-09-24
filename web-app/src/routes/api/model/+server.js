import { json } from '@sveltejs/kit';

import topicModel from '../../../../../data/wiki-phrases-model-240k.json'


export async function GET({ url, fetch }) {

    return json(topicModel, {
        headers: {  
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=360000'
        }
        }
    );
    
}