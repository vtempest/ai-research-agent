import { json } from '@sveltejs/kit';

// import topicModel from '$ai-research-agent/data/wiki-phrases-model-240k.json'


export async function GET({ url }) {
    
    var topicModel = await fetch('https://raw.githubusercontent.com/vtempest/'+
        'ai-research-agent/master/data/wiki-phrases-model-240k.json')
        .then(r => r.json());
    
    return json(topicModel, {
        headers: {  
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=360000'
        }
        }
    );
    
}