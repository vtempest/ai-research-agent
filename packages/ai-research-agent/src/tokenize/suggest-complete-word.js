/**
 * ### Autocomplete Topic Phrase Completions
 * <img width="350px"  src="https://i.imgur.com/0k5mO76.png" /> 
 * 
 * Completes the query with the most likely next words for phrases.
 * If typing 2+ letters of a word, returns all possible words matching those few letters.
 * 
 * 
 * @param {string} query - The input query which can be pertial words or phrases.
 * @param {Object} [options] 
 * @param {Object} options.phrasesModel - A custom phrases model to use for autocomplete suggestions.
 * @param {number} options.limitMaxResults default=10 - The maximum number of autocomplete suggestions to return.
 * @param {number} options.numberOfLastWordsToCheck default=5 - The number of last words in the query to check for phrase completions.
 * @returns {Promise<Array<Object>>} An array of autocomplete suggestions, each containing either a 'phrase' or 'word' property.
 * @example
 * // Basic usage
 * const suggestions = await suggestNextWordCompletions("self att");
 * // Possible output: [{ phrase: "self attention" }, { phrase: "self attract" }, { phrase: "self attack" }]
 * 
 * @example
 * // Using options
 * const customModel = await import("./custom-phrases-model.json");
 * const suggestions = await suggestNextWordCompletions("artificial int", {
 *   phrasesModel: customModel,
 *   limitMaxResults: 5,
 *   numberOfLastWordsToCheck: 3
 * });
 * // Possible output: [{ phrase: "artificial intelligence" }, { phrase: "artificial interpretation" }]
 * 
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @category Topics
*/
export async function suggestNextWordCompletions(query, options = {}) {
  var { 
    phrasesModel, //pass in remote model
    limitMaxResults = 10, //limit the number of results
    numberOfLastWordsToCheck = 5, // check last few words for their phrase completions
    optionShowFullQuery = true, //show full query in the result
  } = options;

  // if (!phrasesModel)
  //   phrasesModel = await import ( "../wordlists/wiki-phrases-model-240k.json");

  //strip non-alphanumeric characters from query and -'
  query = query.trim().replace(/[^a-zA-Z0-9\s\-\']/g, "");

  
  //split into words
  var words = query.toLowerCase().split(/\W+/);

  if (query.length < 1) return;

  let autocompletes = [];

  const lastWords = words.slice(-numberOfLastWordsToCheck);

  for (var i = 0; i < lastWords.length; i++) {
    var word = words[i];

    //Find next word query completion list
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    if (possiblePhrases) {
      var nextWords = words
        .slice(i + 1)
        .join(" ")
        .trim();

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
      .map((phrase) => ({ word: phrase }))
  );

  autocompletes = autocompletes.flat(2).slice(0, limitMaxResults)
  
  if (optionShowFullQuery)
    autocompletes = autocompletes.map((s) => {
      var name;
      if (s.word) name = words.slice(0, -1).join(" ") + " " + s.word;
      if (s.phrase) {
        name =
          words
            .join(" ")
            .slice(0, words.join(" ").lastIndexOf(s.phrase.split(" ")[0])) +
          " " +
          s.phrase;
      }
      return { name };
    })
    .filter(Boolean);

  return autocompletes;

}
