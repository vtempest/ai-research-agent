
/**
 * Completes the Query with the most like next words for phrases
 * @param {string} query
 * @returns {Array}
 */
export default function queryAutocomplete(query, options = {}) {
  //strip non-alphanumeric characters from query
  query = query.trim().replace(/[^a-zA-Z0-9\s]/g, "");

  let {
    phrasesModel, //pass in remote model
    limitMaxResults = 10,
  } = options;


  //split into words
  var words = query.toLowerCase().split(/\W+/);

  if (query.length < 1) return;

  let autocompletes = [];

  var topics = [];
  // check last few words and return all their phrase completions
  const numberOfLastWordsToCheck = 5;
  const lastWords = words.slice(-numberOfLastWordsToCheck);

  for (var i = 0; i < lastWords.length; i++) {
    var word = words[i];

    //Find next word query completion list
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    if (possiblePhrases) {
      var nextWords = words.slice(i + 1).join(" ").trim();

      // if(nextWords){
      // console.log("nextWords", nextWords);
      // console.log("possiblePhrases", possiblePhrases);
      // }
      possiblePhrases = possiblePhrases
        .filter((phrase) =>
          phrase[0] ? phrase[0].startsWith(nextWords) : false
        )
        .map((phrase) => ({ phrase: word + " " + phrase[0], obj: phrase }));

      var possiblePhrasesInput = JSON.parse(JSON.stringify(possiblePhrases));
      autocompletes.push(possiblePhrasesInput);
    }

  }

  //if typing 2 letters of first word,
  // return all possible first words matched what is typed in
  let lastWord = words[words.length - 1];
  autocompletes.push(
    Object.keys(phrasesModel[lastWord.slice(0, 2)])
      .filter((phrase) => phrase.startsWith(lastWord))
      .map((phrase) => ({ word: phrase })) // , next:  phrasesModel[lastWord.slice(0, 2)][phrase]
  );

  autocompletes = autocompletes.flat(2).slice(0, limitMaxResults);

  return autocompletes;
}
