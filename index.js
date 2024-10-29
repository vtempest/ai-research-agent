/**
 * #TODO
 * seek topic
 * login
 * follow ups
 * browser sidebar results
 * QwkSearch
 * QwkDocs
 * QwkTabs
 * QwkGraph
 * QwkAds
 * if select autocompelte in red.com go direct
 * share button. email to friends. login to social media and like follow
 * for each topic, next word prediction
 * auto search for topics in sidebar
 * 
 * prioritize sidebar - ai tips about this page
 */

import { searchWeb } from "./src/search/search-web.js";

import { searchSTREAM } from "./src/search/search-stream.js";

import { extractContent } from "./src/extractor/url-to-content/url-to-content.js";

import { scrapeURL } from "./src/extractor/url-to-content/scrape-url.js";

import { extractSEEKTOPIC } from "./src/topics/seektopic-keyphrases.js";

import { weighRelevanceConceptVectorAPI } from "./src/similarity/similarity-remote-api.js";
import {convertLanguageReplyToJSON} from "./src/generate/languagereply-to-json.js"

import {
  convertHTMLSpecialChars,
  convertMarkdownToHTML,
  copyHTMLToClipboard,
  convertURLToAbsoluteURL,
  convertMathLaTexToImage
} from "./src/extractor/html-to-content/html-utils.js";

import { convertYoutubeToText } from "./src/extractor/url-to-content/youtube-to-text.js";

import { convertPDFToHTML } from "./src/extractor/url-to-content/pdf-to-content.js";

import { extractTopicTermGroupsLDA } from "./src/topics/topic-distribution.js";

import { weighSimilarityByCharacter } from "./src/match/compare-letters.js";

import { suggestNextWordCompletions } from "./src/tokenize/suggest-complete-word.js";

import { convertTextToTokens } from "./src/tokenize/text-to-topic-tokens.js";

import { splitSentences } from "./src/tokenize/sentences.js";

import { splitTextSemanticChars } from "./src/tokenize/text-to-chunks.js";

import { searchWikipedia } from "./src/search/search-wikipedia.js";

import { matchQUASAR } from "./src/match/match-quasar.js";

import { weighRelevanceTermFrequency } from "./src/match/weigh-relevance-frequency.js";

import { convertEmbeddingsToUMAP } from "./src/similarity/embeddings-to-graph.js";

import {
  addEmbeddingVectorsToIndex,
  searchVectorIndex,
  getAllEmbeddings,
  convertTextToEmbedding,
  getEmbeddingModel,
  exportEmbeddingsIndex,
  importVectorIndexFromString,
} from "./src/similarity/similarity-vector.js";

// import { torch } from "./src/train/neural-net.js";

import { extractMainContentFromHTML } from "./src/extractor/html-to-content/extract-content/extractor1-content.js";
import { extractMainContentFromHTML2 } from "./src/extractor/html-to-content/extract-content/extractor2-content.js";
import { convertHTMLToBasicHTML } from "./src/extractor/html-to-content/html-to-basic-html.js";
import { extractCite } from "./src/extractor/html-to-cite/extract-cite.js";
// import {compileTopicModel} from "./src/dataset-import/compile-topic-model.js"
import { stemWordToRoot } from "./src/tokenize/word-to-root-stem.js";
import { extractFavicon } from "./src/extractor/html-to-cite/url-to-favicon.js";
import { embedYoutubePlayer } from "./src/extractor/url-to-content/youtube-embed.js";

import { generateLanguageModelReply } from "./src/generate/generate-reply-api.js";

// Export all functions as named exports
export {
  generateLanguageModelReply,
  convertMarkdownToHTML,
  importVectorIndexFromString,
  convertHTMLSpecialChars,
  convertPDFToHTML,
  extractContent,
  extractFavicon,
  embedYoutubePlayer,
  stemWordToRoot,
  copyHTMLToClipboard,
  convertMathLaTexToImage,
  extractCite,
  convertLanguageReplyToJSON,
  extractMainContentFromHTML,
  extractMainContentFromHTML2,
  convertHTMLToBasicHTML,
  exportEmbeddingsIndex,
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

