import fs from "fs";


var dict = JSON.parse(fs.readFileSync("./data/wiki-world-model.json", "utf8"))

/**
 * Query Resolution to Phrase & Topic Tokenization - 
 * returns a list of phrases that are found in 
 * the WikiWorldModel that match the input phrase, or just the single word if found
 * 
 * @param {string} phrase 
 * @returns {Array<{n: string, s: number, f: number, full: string}>
 */
export default function queryPhraseTokenizer(phrase) {
    phrase = phrase.replace(/[^a-zA-Z0-9\s]/g, "");

    //split into words
    var words = phrase.toLowerCase().split(/[\s,\.]+/);
    var topics = []
    for (var i = 0; i < words.length; i++) {
        var word = words[i];

            
        var firstTwoLetters = word.slice(0, 2);
        var possiblePhrases = dict[firstTwoLetters] ? dict[firstTwoLetters][word] : null;


        if (possiblePhrases) {
            var maxPhraseLength = 1;
            var singleWordObj;
            var isPhraseFound = false;

            possiblePhrases.forEach(p=> {
                if (p.n?.length > maxPhraseLength)
                    maxPhraseLength = p.n.length
            
            });

            var nextWords = "";
            for (var j = 1; j<words.length-i; j++) {
                nextWords += (words[i+j] || "") + " " ;

                if(nextWords.length < maxPhraseLength)
                    break;
            }

            

            for (var phrase of possiblePhrases){
                if (phrase.s==1){
                    phrase.full = word
                    singleWordObj = (phrase);

                }

                if (phrase.s>1){
                    //add next word to the phrase up to maxPhraseLength
                                
                    if(!isPhraseFound && nextWords.startsWith(phrase.n)){
                        phrase.full = word + " " + phrase.n;
                        topics.push(phrase);

                        //skip looping thru the next words added to phrase
                       // i += phrase.n?.split(" ").length - 1; //TODO fi

                        //suppress single-word "red" if "red wine" is found
                        isPhraseFound = true;

                        break;
                    }

                }
            };

            //if no phrases then add the single word
            if (singleWordObj && !isPhraseFound){
                topics.push(singleWordObj);
            }

           
        }

         //if word not in dict, add it as a single word
         if (!possiblePhrases){
            topics.push({notDict: 1, full: word});
        }
    }

    return topics;
}