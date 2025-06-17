/**
 * Calculate the semantic similarity between one text and a list of
 * other sentences by comparing their embeddings.
 * https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task
 *
 * <img src="https://i.imgur.com/ex2UWnu.png" width="350px" />
 * @param {string} source_sentence The string that you wish to
 * compare the other strings with. This can be a phrase, sentence,
 * or longer passage, depending on the model being used.
 * @param {Array<string>} sentences A list of strings which will be compared
 * against the source_sentence.
 * @param {Object} [options]
  * @param {string} options.model default="sentence-transformers/all-MiniLM-L6-v2"
 * @param {string} options.HF_API_KEY Required https://huggingface.co/settings/tokens
 * @returns array of 0-1 similarity scores for each sentence
  * @category Similarity
  */
export function weighRelevanceConceptVectorAPI(source_sentence: string, sentences: Array<string>, options?: {
    model: string;
    HF_API_KEY: string;
}): Promise<unknown>;
