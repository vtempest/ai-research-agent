import { searchWeb } from "./src/search-web/search-web.js";

import { searchSTREAM } from "./src/search-web/search-stream.js/index.js";

import { extract } from "./src/extractor/url-to-content/url-to-content.js";

import { scrapeURL } from "./src/extractor/url-to-content/scrape-url.js";

import { extractSEEKTOPIC } from "./src/topics/seektopic-keyphrases.js";

import {
  weighRelevanceConceptVector,
  vectorizeTextAsConcept,
  weighRelevanceConceptVectorAPI,
} from "./src/similarity/similarity-concept.js";

// core underlying functions

import { convertHTMLSpecialChars } from "./src/extractor/html-to-content/html-to-basic-html.js";
import { extractYoutubeText } from "./src/extractor/url-to-content/youtube-to-text.js";

import { extractPDF } from "./src/extractor/url-to-content/pdf-to-content.js";

import { weighTopicDirichletDistribution } from "./src/topic-distribution/topic-distribution.js";
import { calculateSimilarityByCharacter } from "./src/match/compare-letters.js";
import { suggestNextWordCompletions } from "./src/autocomplete/autocomplete.js";
import { tokenizeTopics } from "./src/tokenize/tokenize-topics.js";
import { splitSentences } from "./src/tokenize/sentences.js";
import { searchWikipedia } from "./src/search-web/search-wikipedia.js";
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
  scrapeURL,
  extractSEEKTOPIC,
  weighRelevanceConceptVector,
  weighRelevanceConceptVectorAPI,
  vectorizeTextAsConcept,
  suggestNextWordCompletions,
  tokenizeTopics,
  splitSentences,
  searchWikipedia,
  weighRelevanceTermFrequency,
  matchQUASAR,
  weighTopicDirichletDistribution,
  convertHTMLSpecialChars,
};


