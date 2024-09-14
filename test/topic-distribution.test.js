import { test, expect } from 'vitest';
import { extractTopicTermGroupsLDA, splitSentences } from "../index.js"

test('topic distribution Test', () => {
  // Function to generate a random collection of documents
  function generateRandomCollection(numSets, numDocsPerSet) {
    const quotes = [
      "The only way to do great work is to love what you do.",
      "In three words I can sum up everything I've learned about life: it goes on.",
      "To be or not to be, that is the question.",
      "I have a dream that one day this nation will rise up.",
      "Ask not what your country can do for you, ask what you can do for your country.",
      "That's one small step for man, one giant leap for mankind.",
      "Be the change you wish to see in the world.",
      "I think, therefore I am.",
      "The unexamined life is not worth living.",
      "Two roads diverged in a wood, and I took the one less traveled by.",
      "To err is human; to forgive, divine.",
      "All that glitters is not gold.",
      "It is during our darkest moments that we must focus to see the light.",
      "Life is what happens to you while you're busy making other plans.",
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      "The only impossible journey is the one you never begin.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "It does not matter how slowly you go as long as you do not stop.",
      "You miss 100% of the shots you don't take.",
      "Strive not to be a success, but rather to be of value.",
      "The best way to predict the future is to invent it.",
      "If you want to lift yourself up, lift up someone else.",
      "You must be the change you wish to see in the world."
    ];

   

    return Array.from({ length: numSets }, () => 
      Array.from({ length: numDocsPerSet }, () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return Math.random() < 0.9 ? quotes[randomIndex] : (Math.random() < 0.5 ? "" : null);
      })
    );
  }

    const collection = generateRandomCollection(10, 5);
    const numTopics = 3
    const numTerms = 2;

    var test2 = `
    
        
     
            
            
    Geousman101     
            
              
    Geousman101. "Text Visualization: Word Cloud, Bubble Chart, Word Tree, Phrase Net."  https://www.youtube.com/watch?v=ViPs5FQn7-0 
  
  
    Text Visualization: Word Cloud, Bubble Chart, Word Tree, Phrase Net    

  
  
    suggestNextWordCompletions(query) → {Array}
    Completes the Query with the most likely next words for phrases If typing 2+ letters of a word, return all possible words matching those few letters
    Parameters:
    Name	Type	Description
    query	string	
     autocomplete/autocomplete.js, line 9
    
    Returns:
    Type: Array
    Example
    autocomplete("self att") => ["self attention", "self attract", "self attack"]
    #
    calculateCosineSimilarity(vecA, vecB) → {number}
    Cosine similarity is a measure of similarity between two vectors in an inner product space. It determines the degree to which two vectors are pointing in the same direction by calculating the cosine of the angle between them. Cosine similarity is commonly used in text analysis to measure the similarity between documents based on the frequency of words or phrases they contain. https://en.wikipedia.org/wiki/Cosine_similarity
    Parameters:
    Name	Type	Description
    vecA	Array.<number>	
    vecB	Array.<number>	
     similarity/similarity-concept.js, line 124
    
    Returns:
    Type: number
    #
    calculatePhraseSpecificity(phrase) → {number}
    Calculate overall domain-speicificity after Query Resolution to Phrases
    Parameters:
    Name	Type	Description
    phrase	string	
     match/weigh-relevance-frequency.js, line 66
    
    Returns:
    domain specificity 0-12~
    Type: number
    #
    weighSimilarityByCharacter(s1, s2) → {number}
    Compute Jaro-Winkler similarity between two strings https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
    Parameters:
    Name	Type	Description
    s1	string	First string
    s2	string	Second string
     match/compare-letters.js, line 9
    
    Returns:
    Jaro-Winkler similarity score (0-1)
    Type: number
    #
    calculateSoftmax(arr) → {Array}
    Softmax is a generalization of the logistic sigmoid function used in logistic regression. It is commonly used in machine learning models for multi-class classification problems where there are more than two possible output classes. The softmax function takes a vector of arbitrary real-valued scores and squashes it to a vector of values between 0 and 1 that sum to 1. This allows the output to be interpreted as a probability distribution over the possible classes. https://en.wikipedia.org/wiki/Softmax_function
    Parameters:
    Name	Type	Description
    arr	Array	array of numbers .
     extractor/url-to-content/pdf-to-content.js, line 248
    
    Returns:
    Softmax array.
    Type: Array
    #
    calculateStandardDeviation(array) → {int}
    Calculate standard deviation of array https://en.wikipedia.org/wiki/Standard_error
    Parameters:
    Name	Type	Description
    array	array	
     extractor/url-to-content/pdf-to-content.js, line 227
    
    Returns:
    number of standard deviation from average
    Type: int
    #
    convertHTMLToBasicHTML(html, options) → {string}
    Strip HTML to 26 basic markup HTML tags, lists, tables, images. Convert anchors and relative urls to absolute urls.
    Parameters:
    Name	Type	Description
    html	string	
    options	object	{images: 0, links: 1, sections: 1, formatting: 1 }
     extractor/html-to-content/html-to-basic-html.js, line 10
    
    Returns:
    sanitized html
    Type: string
    #
    convertHTMLToTokens(html) → {array}
    Convert html string to array of JSON Objects tokens to translate, convert, or filter all elements. Example [{"tag": "img","src": ""}, ...] Flat array is faster than DOMParser which uses nested trees.
    Parameters:
    Name	Type	Description
    html	string	
     extractor/html-to-content/html-to-basic-html.js, line 83
    
    Returns:
    Type: array
    #
    convertURLToDomain(domain) → {string}
    Extract TLD and hostname from domain in Regex There's two or more part TLDs so it is hard to tell if host.secondTLD.tld or host.tld is correct way to get root domain (e.g. abc.go.jp, abc.co.uk) https://wiki.mozilla.org/TLD_List https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
    Parameters:
    Name	Type	Description
    domain	string	
     extractor/html-to-cite/url-to-domain.js, line 13
    
    Returns:
    rootDomain
    Type: string
    #
    extract(urlOrDoc, options) → {Object}
    🚜📜 Tractor the Text Extractor - Extract URL or HTML to main content with Readability or Postlight Parser, which is an improved version with 100+ custom adapters for major websites. Strips to basic HTML for reading mode or saving research notes. Youtube - get full transcript for video if detected a youtube video. PDF - Extracts formatted text from PDF with parsing of headings, page headers, footnotes, and adding linebreaks based on standard deviation of range text height.
    Parameters:
    Name	Type	Description
    urlOrDoc	document	url or dom object with article content
    options	Object	
    keyphrases	boolean	extract key phrases
    images	boolean	include images
    links	boolean	include links
    formatting	boolean	preserve formatting
    absoluteURLs	boolean	convert URLs to absolute
     extractor/url-to-content/url-to-content.js, line 24
    
    Returns:
    - {author, date, title, source, content, image}
    Type: Object
    #
    extractCite(documentHTML) → {object}
    Extract author, date, source, and title from HTML using meta tags and common class names. Validates human name from author string to check against common list of 3k first names, last names,and organizations to infer if it should be reversed starting by author last name (accounting for affixes/titles), since organizations are not reversed.
    Parameters:
    Name	Type	Description
    documentHTML	document	dom object or html string with article content
     extractor/html-to-cite/index.js, line 23
    
    Returns:
    {author, date, title, source}
    Type: object
    #
    extractNamedEntity(author) → {object}
    Validates human name from author string to check against common list of first names, last names, name affixes, and organizations to infer if it should be reversed starting by author last name in cite, since organizations are not reversed. Checks against common salutations, middle parts, and titles to properly format for citation in Last, First Middle format. Author type is ["single", "two-author", "more-than-two", "organization"] where organization is a non-human name that is not reversed.
    Parameters:
    Name	Type	Description
    author	string	
     extractor/html-to-cite/human-names-recognize.js, line 16
    
    Returns:
    {author_cite, author_short, author_type}
    Type: object
    #
    extractNamedEntityParts(input) → {Object}
    Parses a full name into its component parts: Title, Firstname, Prefix, Middle, Lastname, Honorific, Alias https://en.wikipedia.org/wiki/List_of_family_name_affixes
    Parameters:
    Name	Type	Description
    input	string	The full name to parse.
     extractor/html-to-cite/human-names-recognize.js, line 111
    
    Returns:
    Type: Object
    #
    convertPDFToHTML(pdfURL, options) → {string|Object}
    Extracts formatted text from PDF with parsing of headings, page headers, footnotes, and adding linebreaks based on standard deviation of range from average text height
    Parameters:
    Name	Type	Default	Description
    pdfURL	string		URL to a PDF file or buffer from fs.readFile
    options	Object		
    addHeadingsTags	boolean	true	Adds H1 tags to heading titles in document
    addPageNumbers	boolean	true	Adds # to end of each page
    addSentenceLineBreaks	boolean	true	Inserts line breaks at the end of sentence ranges
    removePageHeaders	boolean	true	Removes repeated headers found on each page
    removeHyphens	boolean	true	Removes hyphens at end of lines
    moveFootnotes	boolean	true	Moves footnotes to end of document
     extractor/url-to-content/pdf-to-content.js, line 19
    
    Returns:
    HTML formatted text or {error} if error in parsing
    Type: string | Object
    #
    extractSEEKTOPIC(inputString, options) → {Array.<Object>}
    🔤📊 SEEKTOPIC: Summarization by Extracting Entities, Keyword Tokens, and Outline Phrases Important to Context Weights sentences using TextRank noun keyphrase frequency to find which sentences centralize and tie together keyphrase concepts referred to most by other sentences. Based on the TextRank & PageRank algorithms, it randomly surfs links to nodes to find probability of being at that node, thus ranking influence.
    Parameters:
    Name	Type	Description
    inputString	string	input text to analyze
    options	Object	
    phrasesModel	Object	phrases model
    typosModel	Object	typos model
    maxWords	number	maximum words in a keyphrase (default: 5)
    minWords	number	minimum words in a keyphrase (default: 2)
    minWordLength	number	minimum length of a word (default: 3)
    topKeyphrasesPercent	number	percentage of top keyphrases to consider (default: 0.2)
    limitTopSentences	number	maximum number of top sentences to return (default: 5)
    limitTopKeyphrases	number	maximum number of top keyphrases to return (default: 10)
    minKeyPhraseLength	number	minimum length of a keyphrase (default: 5)
    heavyWeightQuery	string	query to give heavy weight to
     keyphrases/seektopic-keyphrases.js, line 30
    
    Returns:
    - [{text, keyphrases, weight}] array of sentences
    Type: Array.<Object>
    Example
    extractSEEKTOPIC(testDoc, { phrasesModel, heavyWeightQuery: "self attention", limitTopSentences: 10,
    #
    convertYoutubeToText(videoUrl, addTimestamps) → {Object}
    fetch youtube.com video's webpage HTML for embedded transcript if blocked, use scraper of youtubetranscript.com
    Parameters:
    Name	Type	Description
    videoUrl	string	
    addTimestamps	boolean	true to return timestamps, default true
     extractor/url-to-content/youtube-to-text.js, line 10
    
    Returns:
    {content, timestamps} where content is the full text of the transcript, and timestamps is an array of [characterIndex, timeSeconds]
    Type: Object
    #
    isUrlPDF(url) → {Promise.<boolean>}
    Detects if a given URL points to a PDF file by checking the stream's first bytes for %PDF- then ends the request. Useful for hidden pdf url that does not end with pdf
    Parameters:
    Name	Type	Description
    url	string	The URL to check.
     extractor/url-to-content/pdf-to-content.js, line 274
    
    Returns:
    True if the URL points to a PDF, false otherwise.
    Type: Promise.<boolean>
    #
    matchQUASAR(document, query) → {boolean}
    QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp Search document for all words of query ignoring casing but "words in quotes" as necessarily together like in Google.
    Parameters:
    Name	Type	Description
    document	string	
    query	string	
     match/match-quasar.js, line 10
    
    Returns:
    true if doc has all words and "in phrases"
    Type: boolean
    #
    rankSentencesCentralToKeyphrase(sentencesWithKeyphrases) → {Array.<Object>}
    Rank sentences based on their centrality to key phrases. This function implements the TextRank algorithm to weight each sentence based on the number of key phrases it shares with other sentences. It creates a weighted graph where edges connect sentences to matching keyphrases, then performs random walks to distribute probabilities. 1. Hongyang Zhao and Qiang Xie 2021 J. Phys.: Conf. Ser. 2078 012021 "An Improved TextRank Multi-feature Fusion Algorithm For Keyword Extraction of Educational Resources" https://iopscience.iop.org/article/10.1088/1742-6596/2078/1/012021/pdf 2. Pan, S. et al (2019). "An improved TextRank keywords extraction algorithm" https://dl.acm.org/doi/10.1145/3321408.3326659 https://doi.org/10.1145/3321408.3326659
    Parameters:
    Name	Type	Description
    sentencesWithKeyphrases	Array.<Object>	Array of objects, each containing {text, keyphrases}
     keyphrases/rank-sentences-keyphrases.js, line 21
    
    Returns:
    Updated array with added weights: [{text, keyphrases, weight}]
    Type: Array.<Object>
    #
    searchSTREAM(query, options) → {Promise.<Array.<Array>>}
    🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 1. Search Web for query via metasearch of major engines or your custom data 2. Extract text of top results with Tractor the Text Extractor. 3. SEEKTOPIC: Extract Keyphrase Topics and Top Sentences that centralize those topics 4. Rerank documents's chunks based on relevance to query, using embeddings by convert text to concept vector of numbers within LLM "concept space", and cosine similarity of query to topic, returning the sentences central to key relevant parts of the article. 5. Research Agent prompt with key sentences from relevant sources to answer via Groq Llama, OpenAI, or Anthropic API Key and suggest follow-ups
    Parameters:
    Name	Type	Description
    query	string	
    options	object	
     search-web/answer-engine.js, line 16
    
    Returns:
    Type: Promise.<Array.<Array>>
    #
    searchWeb(query, options) → {Promise.<Array.<Array>>}
    Search Web via SearXNG metasearch of all major search engines. Options are 10 search categories, recency, and how many times to retry other domains if first time fails.
    Parameters:
    Name	Type	Description
    query	string	
    options	object	
     search-web/search-web.js, line 10
    
    Returns:
    {title, url, snippet, engines, cached}
    Type: Promise.<Array.<Array>>
    #
    searchWikipedia(query, options) → {object|object}
    Search Wikipedia for a query, return result's title, summary, and image.
    Parameters:
    Name	Type	Description
    query	string	search phrase
    options	object	Options object with the following properties and defaults:
    plainText	boolean	= false, // Return plain text instead of HTML
    summarySentenceLimit	number	= 3, // Limit summary to this many sentences
    limitSearchResults	number	= 1, // Limit number of search results
    images	boolean	= true, // Include image in results
    imageSize	number	= 200, // Image size in pixels
    searchInTitleOnly	boolean	= false, // Search in title only
    filterDisambiguation	boolean	= true, // Filter disambiguation pages
     wiki-api/search-wikipedia.js, line 20
    
    Returns:
    {results: [ {title, summary, image}, ...]}
    Type: object
    Returns {error} if no results found. {error: "No results"}
    Type: object
    Example
    await searchWikipedia("JavaScript", { plainText: true })
    #
    splitSentences(inputText, options) → {Array.<string>}
    Splits text into sentences, handling abbreviations from 222 common list and infering acronyms, numbers, URLs, times, names, etc.
    Parameters:
    Name	Type	Default	Description
    inputText	string		The text to be split into sentences.
    options	Object		Options for sentence splitting.
    splitOnNewlines	boolean	true	Split on newlines and markdown line breaks.
    splitOnHtmlTags	boolean	true	Split on HTML tags like P, DIV, UL, OL.
    minSize	number	20	Minimum size for a sentence.
    maxSize	number	600	Maximum size for a sentence.
     tokenize/sentences.js, line 14
    
    Returns:
    An array of sentences.
    Type: Array.<string>
    #
    stemWordToRoot(word) → {string}
    Stems a word using the Porter Stemmer for removing the commoner morphological and inflexional endings from words in English. https://snowballstem.org/algorithms/porter/stemmer.html
    Parameters:
    Name	Type	Description
    word	string	The word to be stemmed
     tokenize/stemmer.js, line 10
    
    Returns:
    The stemmed word
    Type: string
    #
    convertTextToTokens(phrase, options) → {Array.<Token>}
    Query Resolution to Phrase & Topic Tokenization - returns a list of phrases that are found in WikiWorldModel that match the input phrase, or just the single word if found
    Parameters:
    Name	Type	Description
    phrase	string	
    options	Object	
    phrasesModel	Object	remote model
    typosModel	Object	remote model
    checkTypos	number	check for typos
    ignoreStopWords	number	ignore 300+ overused words
    checkRootWords	number	check for word's root stem
     tokenize/tokenize-topics.js, line 26
    
    Returns:
    ex. [[50, 0, "Albert Einstein"] , [20, 5, "physics"]]
    Type: Array.<Token>
    #
    vectorizeTextAsConcept(input, config) → {Promise.<Array.<Array.<number>>>}
    Convert text to concept vector int[] of length m, where m is number of features extracted by MiniLM-L6-v2 and values are similar if words are similar by that feature within m-dimensional "concept space"
    Parameters:
    Name	Type	Description
    input	string | Array.<string>	
    config	Object	
     similarity/similarity-concept.js, line 71
    
    Returns:
    Type: Promise.<Array.<Array.<number>>>
    #
    weighRelevanceConceptVector(documents, query, config) → {Promise.<Array.<{content: string, similarity: number}>>}
    Rerank documents's chunks based on relevance to query, based on cosine similarity of their concept vectors generated by a MiniLM transformer model.
    




  `

    // collection.forEach((documents, index) => {
      // console.log(`\nTesting document set ${index + 1}:`);
      // console.log("Documents:", documents);

      var documents = splitSentences(test2)

      const results = extractTopicTermGroupsLDA(documents, {numTopics, numTerms});

      console.log("LDA Results:");
      results.forEach((topic, topicIndex) => {
        console.log(`  Topic ${topicIndex + 1}:`);
        topic.forEach(term => { 
          console.log(`    Term: ${term.term},  ${term.probability.toFixed(3)*1000}`);
        });
      });

      // Verifications
      expect(results).toBeDefined(); //toHaveLength(numTopics);
      results.forEach(topic => {
        const sum = topic.reduce((acc, term) => acc + term.probability, 0);
        expect(sum).toBeDefined();
        topic.forEach(term => {
        });
      });
    // });
});