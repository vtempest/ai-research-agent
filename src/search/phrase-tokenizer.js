import fs from "fs";
/**
 * Query Resolution to Phrase & Topic Tokenization -
 * returns a list of phrases that are found in
 * the WikiWorldModel that match the input phrase, 
 * or just the single word if found
 * @param {string} phrase
 * @returns {Array}
 */
export default function queryPhraseTokenizer(phrase, options={}) {

  let {
    phrasesModel //pass in remote model
  } = options

  

  if (!phrasesModel) 
    phrasesModel = JSON.parse(
        fs.readFileSync("./data/wiki-phrases-model-240k.json", "utf8")
      );


  //strip non-alphanumeric characters from query
  phrase = phrase.replace(/[^a-zA-Z0-9\s]/g, "");

  //split into words
  var words = phrase.toLowerCase().split(/\W+/);
  var topics = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    //Find next word phrase completion list 
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    if (possiblePhrases) {
      var maxPhraseLength = 1;
      var singleWordObj = null;
      var isPhraseFound = false;

      //calculate max possible length of phrase of next words
      for (var p of possiblePhrases)
        if (p[0]?.length > maxPhraseLength) 
          maxPhraseLength = p[0].length;

      //grab that length of text from next words
      var nextWords =  "";
      for (var j = 1; j < words.length - i; j++) {
        nextWords += (words[i + j] || "") + " ";

        if (nextWords.length >= maxPhraseLength) break;
      }
      for (var phrase of possiblePhrases) {
        //if no next phrase, preserve the single word
        //it culd also be not in the dict first word
        if (phrase && !phrase[0]) {
          phrase.push(  word );
          singleWordObj = phrase;
        } else {
          //add next word to the phrase up to maxPhraseLength
          if (!isPhraseFound && nextWords.startsWith(phrase[0])) {
            phrase.push(  word + " " + phrase[0] );
            topics.push(phrase);


            //skip looping thru the next words added to phrase
            i += phrase[0]?.split(" ").length -1; //TODO fi

            //suppress single-word "red" if "red wine" is found
            isPhraseFound = true;

            break;
          }
        }
      }

      //if no phrases then add the single word
      if (!isPhraseFound) {
        singleWordObj = singleWordObj  //|| { full: word }; // could be not in dict but starter of hrases
        topics.push(singleWordObj);
      }
    }

    //if word not in dict, add it as a single word
    if (!possiblePhrases) 
      topics.push([0, 0, 0, 0, 0, word]);
  }

  // console.log(topics);

  return topics.filter(Boolean);;
}

/**
 * Calculate overall domain-speicificity after Query Resolution to Phrases
 * @param {string} phrase
 * @returns {number} domain specificity 0-12~
 */
export function calculatePhraseSpecificity(phrase) {
  var tokensWithFreq = queryPhraseTokenizer(phrase)

  return ( 
    tokensWithFreq.reduce((acc, r) => acc + (r[3] || 4), 0) / tokensWithFreq.length
  ).toFixed(1);
}
