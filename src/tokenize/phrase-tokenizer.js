import posTagger from "wink-pos-tagger";

/**
 * Query Resolution to Phrase & Topic Tokenization -
 * returns a list of phrases that are found in
 * the WikiWorldModel that match the input phrase, 
 * or just the single word if found
 * @param {string} phrase
 * @param {Object} options
 * @param {Object} options.phrasesModel - remote model
 * @param {Object} options.typosModel - remote model
 * @param {number} options.checkTypos - check for typos
 * @param {number} options.checkRootWords - 
 *  check for root word of a word: lemmas and normalizations
 * @returns {Array<Array>} [[u, c, l, p, full], ...]
 */
export default function tokenizeWikiPhrases(phrase, options={}) {

  let {
    phrasesModel, //pass in remote model
    typosModel,
    checkTypos = 0,
    checkRootWords = 1,
  } = options

  


  //strip non-alphanumeric characters from query an keep -'/
  phrase = phrase.replace(/[^a-zA-Z0-9\s\-\'\/]/g, "");

  //split into words
  var words = phrase.toLowerCase().split(/\W+/)

  //check for typos
  if (checkTypos)
    words = words.map(word => typosModel[word] || word); 



  var topics = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    //Find next word phrase completion list 
    var firstTwoLetters = word.slice(0, 2);
    var possiblePhrases = phrasesModel[firstTwoLetters]
      ? phrasesModel[firstTwoLetters][word]
      : null;

    // //check for typos
    // if (!possiblePhrases){
    //     var correctSpelling = typosModel[word];
    //     if (correctSpelling) 
    //       possiblePhrases = phrasesModel[correctSpelling.slice(0, 2)]
    //         ? phrasesModel[correctSpelling.slice(0, 2)][correctSpelling]
    //         : null;
    // }

    //check for root words like "gaming" -> "game"
    if (!possiblePhrases && checkRootWords){

        var rootWord = posTagger()
          .tagSentence(word)
          .map((r) => r.lemma || r.normal)[0];
        
          if (rootWord !== word) 
            possiblePhrases = phrasesModel[rootWord.slice(0, 2)]
              ? phrasesModel[rootWord.slice(0, 2)][rootWord]
              : null;

            //TODO add label "root word"

      }
        
      
    //if word still not in dict, add it as a single word
    if (!possiblePhrases) 
      topics.push([ 0, 0, 0, 0, word]);



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
            topics.push(phrase?.slice(1)); // remove first which is next words


            //skip looping thru the next words added to phrase
            i += phrase[0]?.split(" ").length ; //TODO fi

            //suppress single-word "red" if "red wine" is found
            isPhraseFound = true;

            break;
          }
        }
      }

      //if no phrases then add the single word
      if (!isPhraseFound) {
        singleWordObj = singleWordObj  //|| { full: word }; // could be not in dict but starter of phrases
        topics.push(singleWordObj?.slice(1));
      }
    }

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

/**
 * List of 320 commonly ignored "stop words" in queries
 * https://raw.githubusercontent.com/igorbrigadir/stopwords/master/en/spacy.txt
 */ 
export const stopWords = `a,about,above,across,after,afterwards,again,against,all,almost,alone,along,already,also,although,always,am,among,amongst,amount,an,and,another,any,anyhow,anyone,anything,anyway,anywhere,are,around,as,at,back,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,below,beside,besides,between,beyond,both,bottom,but,by,ca,call,can,cannot,could,did,do,does,doing,done,down,due,during,each,eight,either,eleven,else,elsewhere,empty,enough,even,ever,every,everyone,everything,everywhere,except,few,fifteen,fifty,first,five,for,former,formerly,forty,four,from,front,full,further,get,give,go,had,has,have,he,hence,her,here,hereafter,hereby,herein,hereupon,hers,herself,him,himself,his,how,however,hundred,i,if,in,indeed,into,is,it,its,itself,just,keep,last,latter,latterly,least,less,made,make,many,may,me,meanwhile,might,mine,more,moreover,most,mostly,move,much,must,my,myself,n't,name,namely,neither,never,nevertheless,next,nine,no,nobody,none,noone,nor,not,nothing,now,nowhere,n't,n't,of,off,often,on,once,one,only,onto,or,other,others,otherwise,our,ours,ourselves,out,over,own,part,per,perhaps,please,put,quite,rather,re,really,regarding,same,say,see,seem,seemed,seeming,seems,serious,several,she,should,show,side,since,six,sixty,so,some,somehow,someone,something,sometime,sometimes,somewhere,still,such,take,ten,than,that,the,their,them,themselves,then,thence,there,thereafter,thereby,therefore,therein,thereupon,these,they,third,this,those,though,three,through,throughout,thru,thus,to,together,too,top,toward,towards,twelve,twenty,two,under,unless,until,up,upon,us,used,using,various,very,via,was,we,well,were,what,whatever,when,whence,whenever,where,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,whoever,whole,whom,whose,why,will,with,within,without,would,yet,you,your,yours,yourself,yourselves,'d,'ll,'m,'re,'s,'ve,'d,'ll,'m,'re,'s,'ve`;
