import fs from "fs";


var dict = fs.readFileSync("./data/world-model-phrase-tree.json", "utf8");
dict = JSON.parse(dict);


export default function queryPhrase(phrase) {
    //split into words
    var words = phrase.toLowerCase().split(/[\s,\.]+/);
    var topics = []
    for (var i = 0; i < words.length; i++) {
        var word = words[i];

            
        var firstTwoLetters = word.slice(0, 2);
        var possiblePhrases = dict[firstTwoLetters] ? dict[firstTwoLetters][word] : null;


        if (possiblePhrases) {
            var maxPhraseLength = 1;
            possiblePhrases.forEach(p=> {
                if (p.s > maxPhraseLength)
                    maxPhraseLength = p.s
            
            })
            var nextWords = "";
            for (var j = 1; j < maxPhraseLength; j++) 
                nextWords += (words[i+j] || "") + " " ;

            possiblePhrases.forEach(phrase => {
                if (phrase.s==1){
                    phrase.full = word
                    topics.push(phrase);

                }

                if (phrase.s>1){
                    //add next word to the phrase up to maxPhraseLength
                                
                    // console.log( nextWords + "============" + phrase.n);
                    if(nextWords.startsWith(phrase.n)){
                        phrase.full = word + " " + phrase.n;
                        topics.push(phrase);
                    }

                }
            });

        }
    }

    return topics;
}