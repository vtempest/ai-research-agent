import {stemWordToRoot} from "./word-to-root-stem.js";
import {isWordCommonIgnored} from "./stopwords.js";
/**
 * @typedef {Object} Token
 * @property {number} termCategory - The category of the term
 * @property {number} uniqueness - The uniqueness score of the term
 * @property {string} term - The actual term or phrase
 */
/**
 * ### Convert Text Query to Topic Phrase Tokens
 * <img width="350px"  src="https://i.imgur.com/NDrmSRQ.png" /> 
 * 
 * Returns a list of phrases that are found in Wiki Titles/ dictionary phrases World Model 
 * that match the input phrase, or just the single word if found. Search results will be
 *  more accurate if we infer likely phrases and search for those words occuring together and
 *  not just split into words and find frequency. Examples are "white house" or "state of the art"
 *  which should be searched as a phrase but would return different context if split into words.
 *  As Led Zeppelin famously put it: ♫ "'Cause you know sometimes words have two meanings."
 * 
 * @param {string} phrase
 * @param {Object} [options]
  * @param {Object} options.phrasesModel - remote model
 * @param {Object} options.typosModel - remote model
 * @param {number} options.checkTypos - check for typos
 * @param {number} options.ignoreStopWords - ignore 300+ overused words
 * @param {number} options.checkRootWords - check for word's root stem
 * @returns {Array<{termCategory: number, uniqueness: number, term: string}>} 
 * @example
 *   const result = convertTextToTokens("The president of the united states is in the white house", { phrasesModel, typosModel });
 *   console.log(result);
 *  
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @category Topics
*/
export function convertTextToTokens(phrase, options = {}) {
  let {
    phrasesModel, //pass in remote model
    typosModel,
    checkTypos = 0,
    checkRootWords = 1,
    ignoreStopWords = 1,
  } = options;

  if (!phrasesModel )
    throw new Error("Missing phrasesModel ");
  
  if (!phrase)
    throw new Error("Missing  phrase");
  
  //strip non-alphanumeric characters from query an keep -'/
  phrase = phrase.replace(/[^a-zA-Z0-9\s\-\'\/]/g, " ");

  //split into words
  var words = phrase.toLowerCase().split(/\W+/);

  //check for typos
  
  if (checkTypos && typosModel) words = words.map((word) => typosModel[word] || word);

  var topics = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    //ignore 300+ common stop words
    if (ignoreStopWords && isWordCommonIgnored(word)) {//todo include as ignored
      topics.push([word, 0, 0, "" ]);
      continue;
    }

    //Find next word phrase completion list
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    //check for root words like "gaming" -> "game"
    if (!possiblePhrases && checkRootWords) {
      var rootWord = stemWordToRoot(word);
      if (rootWord !== word)
        possiblePhrases = phrasesModel[rootWord.slice(0, 2)]
          ? phrasesModel[rootWord.slice(0, 2)][rootWord]
          : null;

      //TODO add label "root word"
    }

    //if word still not in dict, add it as a single word
    if (!possiblePhrases) topics.push([word, 0, 0, "" ]);

    if (possiblePhrases) {
      var maxPhraseLength = 1; 
      var singleWordObj = null;
      var isPhraseFound = false;

      //calculate max possible length of phrase of next words
      for (var p of possiblePhrases)
        if (p[0]?.length > maxPhraseLength) maxPhraseLength = p[0].length;

      //grab that length of text from next words
      var nextWords = "";
      for (var j = 1; j < words.length - i; j++) {
        nextWords += (words[i + j] || "") + " ";

        if (nextWords.length >= maxPhraseLength) break;
      }

      for (var phrase of possiblePhrases) {
        //if no next phrase, preserve the single word
        //it culd also be not in the dict first word
        if (phrase && !phrase[0] && !singleWordObj) {
          phrase = phrase?.slice(1,3)
          phrase.unshift(word); //add to start
          singleWordObj = phrase;
        } else {
          //add next word to the phrase up to maxPhraseLength
          if (!isPhraseFound && nextWords.startsWith(phrase[0])) {
            var fullPhrase = word + " " + phrase[0]
            phrase = phrase?.slice(1,3)
            phrase.unshift(fullPhrase);
            topics.push(phrase); // remove first which is next words

            //skip looping thru the next words added to phrase
            i += phrase[0]?.split(" ").length; //TODO fi

            //suppress single-word "red" if "red wine" is found
            isPhraseFound = true;

            break;
          }
        }
      }

      //if no phrases then add the single word
      if (!isPhraseFound) {
        singleWordObj = singleWordObj; 
        //// could be not in dict but starter of phrases
        topics.push(singleWordObj);
      }
    }
  }


  return topics.filter(Boolean);
}
