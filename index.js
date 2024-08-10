// Search Web via SearXNG metasearch of all major search engines.
import { searchWeb } from "./src/search-web/search-web.js";

//SWEAR Search Web, Extract & Answer Research Agent
import { searchSTREAM } from "./src/search-web/answer-engine.js";

import { extract } from "./src/extractor/url-to-content/url-to-content.js";

import { extractSEEKTOPIC } from "./src/keyphrases/SEEKTOPIC-keyphrases.js";

import {
  weighRelevanceConceptVector,
  vectorizeTextAsConcept,
} from "./src/similarity/similarity-concept.js";

// core underlying functions

import { extractYoutubeText } from "./src/extractor/url-to-content/youtube-to-text.js";

import { extractPDF } from "./src/extractor/url-to-content/pdf-to-content.js";

import { weighTopicDirichletDistribution } from "./src/topic-distribution/topic-distribution.js";
import { calculateSimilarityByCharacter } from "./src/match/compare-letters.js";
import { autocompleteNextWords } from "./src/autocomplete/autocomplete.js";
import { tokenizeTopics } from "./src/tokenize/tokenize-topics.js";
import { splitSentences } from "./src/tokenize/sentences.js";
import { searchWikipedia } from "./src/wiki-api/search-wikipedia.js";
import { matchQUASAR } from "./src/match/match-quasar.js";
import { weighRelevanceTermFrequency } from "./src/match/weigh-relevance-frequency.js";

// Export all functions as named exports
export {
  calculateSimilarityByCharacter,
  extractPDF,
  extractYoutubeText,
  searchWeb,
  searchSTREAM,
  extract,
  extractSEEKTOPIC,
  weighRelevanceConceptVector,
  vectorizeTextAsConcept,
  autocompleteNextWords,
  tokenizeTopics,
  splitSentences,
  searchWikipedia,
  weighRelevanceTermFrequency,
  matchQUASAR,
  weighTopicDirichletDistribution,
};

//also export them as a single object
export default {
};
