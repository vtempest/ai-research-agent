/**
 * @author vtempest <grokthiscontact@gmail.com>
 * @license AGPL-3.0 Organizations should email grokthiscontact@gmail.com 
 * to get a dual-use commercial license to remove the GPL requirements.
 */
export { searchWeb } from "./src/search/search-web.js";

export { searchSTREAM } from "./src/search/search-stream.js";

export { extractContent } from "./src/extractor/url-to-content/url-to-content.js";

export { scrapeURL } from "./src/extractor/url-to-content/scrape-url.js";

export { extractSEEKTOPIC } from "./src/topics/seektopic-keyphrases.js";

export { weighRelevanceConceptVectorAPI } from "./src/similarity/similarity-remote-api.js";

export { convertLanguageReplyToJSON } from "./src/agents/languagereply-to-json.js";

export { highlightCodeSyntax } from "./src/interface/highlight-code.js";

export {
  convertHTMLToEscapedHTML,
  convertMarkdownToHTML,
  copyHTMLToClipboard,
  convertURLToAbsoluteURL,
} from "./src/extractor/html-to-content/html-utils.js";

export { convertYoutubeToText } from "./src/extractor/url-to-content/youtube-to-text.js";

export { convertPDFToHTML } from "./src/extractor/pdf-to-html/pdf-to-html.js";

export { extractTopicTermGroupsLDA } from "./src/topics/topic-distribution.js";

export { weighSimilarityByCharacter } from "./src/match/compare-letters.js";

export { suggestNextWordCompletions } from "./src/tokenize/suggest-complete-word.js";

export { convertTextToTokens } from "./src/tokenize/text-to-topic-tokens.js";

export { splitSentences } from "./src/tokenize/text-to-sentences.js";

export { splitTextSemanticChars } from "./src/tokenize/text-to-chunks.js";

export { searchWikipedia } from "./src/search/search-wikipedia.js";

export { matchQUASAR } from "./src/match/match-quasar.js";

export { weighRelevanceTermFrequency } from "./src/match/weigh-relevance-frequency.js";

export { convertEmbeddingsToUMAP } from "./src/similarity/embeddings-to-graph.js";

export { getAgentPrompts } from "./src/agents/agent-prompts.ts";

export { searchEngines } from "./src/search/search-engines.js";

export {
  addEmbeddingVectorsToIndex,
  searchVectorIndex,
  getAllEmbeddings,
  convertTextToEmbedding,
  getEmbeddingModel,
} from "./src/similarity/similarity-vector.js";

export { convertDOCXToHTML } from "./src/extractor/url-to-content/docx-to-content.js";

export { extractMainContentFromHTML } from "./src/extractor/html-to-content/extract-content/extract-content-readability.js";

export { extractMainContentFromHTML2 } from "./src/extractor/html-to-content/extract-content/extract-content-mercury.js";

export { convertHTMLToBasicHTML } from "./src/extractor/html-to-content/html-to-basic-html.js";

export { extractCite } from "./src/extractor/html-to-cite/extract-cite.js";

export { stemWordToRoot } from "./src/tokenize/word-to-root-stem.js";


export { embedYoutubePlayer } from "./src/interface/youtube-embed.js";

export {
  generateLanguageModelReply,
  CHAT_MODELS,
} from "./src/agents/generate-reply-api.js";


export {
  convertOpenAPIToAgentTools
} from "./src/agents/api2ai.js";


// export {compileTopicModel} from "./src/dataset-export/compile-topic-model.js"
// export { torch } from "./src/train/neural-net.js";
// gpu.js needs bun compatibility

/** Export all functions as named exports
export {
  CHAT_MODELS,
  getAgentPrompts,
  generateLanguageModelReply,
  convertMarkdownToHTML,
  convertHTMLToEscapedHTML,
  convertPDFToHTML,
  extractContent,
  extractFavicon,
  embedYoutubePlayer,
  stemWordToRoot,
  copyHTMLToClipboard,
  extractCite,
  convertDOCXToHTML,
  convertLanguageReplyToJSON,
  extractMainContentFromHTML,
  extractMainContentFromHTML2,
  convertHTMLToBasicHTML,
  highlightCodeSyntax,
  addEmbeddingVectorsToIndex,
  convertEmbeddingsToUMAP,
  convertTextToEmbedding,
  convertTextToTokens,
  convertYoutubeToText,
  extractSEEKTOPIC,
  getAllEmbeddings,
  getEmbeddingModel,
  matchQUASAR,
  scrapeURL,
  searchSTREAM,
  searchWeb,
  searchWikipedia,
  searchVectorIndex,
  splitSentences,
  splitTextSemanticChars,
  // torch,
  suggestNextWordCompletions,
  weighSimilarityByCharacter,
  weighRelevanceConceptVectorAPI,
  weighRelevanceTermFrequency,
  extractTopicTermGroupsLDA,
};

 */
