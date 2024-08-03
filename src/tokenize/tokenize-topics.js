import stemmer from "./stemmer";

/**
 * Query Resolution to Phrase & Topic Tokenization -
 * returns a list of phrases that are found in WikiWorldModel 
 * that match the input phrase, or just the single word if found
 * @param {string} phrase
 * @param {Object} options
 * @param {Object} options.phrasesModel - remote model
 * @param {Object} options.typosModel - remote model
 * @param {number} options.checkTypos - check for typos
 * @param {number} options.checkRootWords - check for word's root stem
 * @returns {Array<Array>}  ex. [[50, 0, "Albert Einstein"] , [20, 5, "physics"]]
 */
export default function tokenizeTopicModel(phrase, options = {}) {
  let {
    phrasesModel, //pass in remote model
    typosModel,
    checkTypos = 0,
    checkRootWords = 1,
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
  if (checkTypos) words = words.map((word) => typosModel[word] || word);

  var topics = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    //Find next word phrase completion list
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    //check for root words like "gaming" -> "game"
    if (!possiblePhrases && checkRootWords) {
      var rootWord = stemmer(word);
      if (rootWord !== word)
        possiblePhrases = phrasesModel[rootWord.slice(0, 2)]
          ? phrasesModel[rootWord.slice(0, 2)][rootWord]
          : null;

      //TODO add label "root word"
    }

    //if word still not in dict, add it as a single word
    if (!possiblePhrases) topics.push([0, 0, word]);

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
        if (phrase && !phrase[0]) {
          phrase.push(word);
          singleWordObj = phrase;
        } else {
          //add next word to the phrase up to maxPhraseLength
          if (!isPhraseFound && nextWords.startsWith(phrase[0])) {
            phrase.push(word + " " + phrase[0]);
            topics.push(phrase?.slice(1,4)); // remove first which is next words

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
        singleWordObj = singleWordObj; //|| { full: word }; // could be not in dict but starter of phrases
        topics.push(singleWordObj?.slice(1,4));
      }
    }
  }


  return topics.filter(Boolean);
}

/**
 * Calculate overall domain-speicificity after Query Resolution to Phrases
 * @param {string} phrase
 * @returns {number} domain specificity 0-12~
 */
export function calculatePhraseSpecificity(phrase, options) {
  var tokensWithFreq = tokenizeWikiPhrases(phrase, options);

  return (
    tokensWithFreq.reduce((acc, r) => acc + (r[1] || 4), 0) /
    tokensWithFreq.length
  ).toFixed(1);
}
