// // src/routes/api/vectorize/+server.js
// import { json } from '@sveltejs/kit';
// import phrases from './phrases-list-240k.json'

// export const GET = async ({ platform }) => {
//   const ai = platform?.env?.AI;
//   const vectorize = platform?.env?.VECTOR_DB;

//   if (!ai || !vectorize) {
//     return json({ error: 'Cloudflare AI or Vectorize binding missing.' }, { status: 500 });
//   }

//   const batchSize = 10;
//   let uploaded = 0;
//   for (let i = 0; i < phrases.length; i += batchSize) {
//     const batch = phrases.slice(i, i + batchSize);

//     // Generate embeddings using Workers AI
//     const embeddings = await ai.run('@cf/baai/bge-base-en-v1.5', { text: batch });
//     if (!embeddings?.data) {
//       return json({ error: 'AI embedding failed.' }, { status: 500 });
//     }

//     // Prepare vectors for upload
//     const vectors = embeddings.data.map((vector, idx) => ({
//       id: `phrase-${i + idx}`,
//       values: vector,
//       metadata: {
//         text: batch[idx],
//         timestamp: new Date().toISOString()
//       }
//     }));

//     // Upload to Vectorize
//     const result = await vectorize.upsert(vectors);
//     uploaded += result.count || vectors.length;
//     console.error(`Uploaded ${uploaded} of ${phrases.length} phrases`);
//   }

//   return json({ uploaded, total: phrases.length });
// };
