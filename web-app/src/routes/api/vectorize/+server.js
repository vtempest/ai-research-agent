import { 
  addEmbeddingVectorsToIndex, 
  searchVectorIndex, getAllEmbeddings,
  getEmbeddingModel,
  exportEmbeddingsIndex,
  convertTextToEmbedding,
  torch

 } from "$airesearchagent";
 import { json } from '@sveltejs/kit';

 
  

export async function GET({ url }) {


    const  pipeline = await getEmbeddingModel();

      const documents = [
        "The quick brown fox jumps over the lazy dog",
        "Lorem ipsum dolor sit amet",
        "foxes are red",
        "foxes are not blue",
        "foxes like to hunt their prey",
      ];
      const query = "What does the fox eat?";
  
  
    let documentVectors = [];
  
    for (let doc of documents) 
      documentVectors.push(await convertTextToEmbedding(doc, { pipeline }));
  
    const {index} = await addEmbeddingVectorsToIndex(documentVectors, {pipeline});
  
    const result = await searchVectorIndex(index, query, {pipeline});
    console.log(result);
    
    const base64 = await exportEmbeddingsIndex(index, 1536, 100000);
    // console.log(base64);
  
    // // var index2 = await importVectorIndexFromString(base64)
  
  
    // const result2 = await searchVectorIndex(index2, query, {pipeline});
    // console.log(result2);

    return json({
      message: "Model trained successfully",
      result: result
    })
    
}

