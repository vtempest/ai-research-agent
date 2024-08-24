<p align="center">
<img width="200px" src="https://i.imgur.com/4GOOM9s.jpeg"> 
</p>

<p align="center">
<a href="https://discord.gg/SJdBqBz3tV">
    <img src="https://img.shields.io/discord/1130153053056684123.svg?label=Discord&logo=Discord&colorB=7289da&style=flat" alt="Join Discord"/>
</a>
</p>

[![NPM](https://nodei.co/npm/ai-research-agent.png?compact=true)](https://npmjs.org/package/ai-research-agent)

### [JS API Docs ](https://vtempest.github.io/ai-research-agent/docs/index.html)

###  Demos

* [Autocomplete Server Demo](https://qwksearch.com/)


* [Sample Output](https://github.com/vtempest/ai-research-agent/blob/master/test/data/)

* NPM Tests --  `npm run test` to run many tests custom to your data


> Being is Becoming: Whatever the future of research can be, that is what it must become.


#### 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 

 1. Search Web for query via metasearch of major engines or your custom data
 2. Extract text of top results with Tractor the Text Extractor.
 3. SEEKTOPIC: Extract Keyphrase Topics and Top Sentences that centralize those topics
 4. Rerank documents's chunks based on relevance to query,  using embeddings by convert text to concept vector of numbers within LLM  "concept space", and cosine similarity of query to topic, returning the sentences central to key relevant parts of the article.
 5. Research Agent prompt with key sentences from relevant sources to answer via Groq Llama, OpenAI, or Anthropic API Key and suggest follow-ups

#### 🚜📜 Tractor the Text Extractor

* Extract URL or HTML to main content with Readability or Postlight Parser, which is an improved version with 100+ custom adapters for major websites
* Strips to basic HTML for reading mode or saving research notes
*  Youtube - get full transcript for video if detected a youtube video
* PDF - Extracts formatted text from PDF with parsing of linebreaks, page headers, footnotes, and adding infer headings based on  standard deviation from average text height
* Cite - Extract author, date, source, and title from HTML using meta tags and common class names. Validates human name from author string to check against common list of 3k first names, last names, and organizations to infer if last name should be reversed starting by author last name (accounting for affixes/titles), since organizations are not reversed.

#### 🔤📊 SEEKTOPIC: Summarization, Extraction of Entities, Keywords, and Topic Outline Phrases Important to Context 

This can be used to find unique, domain-specific keyphrases using noun Ngrams.  The user can click on keyphrases or LLM can suggest questions based on them. The user can see highlighted just the most important sentences that centralize and tie in the core topics. It is possible to vectorize and compare the dot product similarity of query to keyphrases which are then mapped to parts of the document like section labels. This is more in line with how humans think of article organization into section headings and lead sentences which tie in concepts from others.

1. Split into sentences with exceptions for 222 common abbrev., numbers, URLs, etc.
2. Use this Wiki Phrases tokenizer to extract wiki topics, phrases, and nouns. It checks for spelling typos and uses Porter Stemmer to check root words if original word is not found.
3. Extract Noun Edgegrams. Stop words are allowed in the middle like "state of the art"
4. Fold smaller Ngrams that are subsets of larger ones by comparing weight into keyphrases 
5. Calculate named entities and phrase domain specificity to reward unique keyphrases, using WikiIDF.  Domains-specific examples in medical data would be "endocrinology" or in religion it is "thou shall" which can help build category label classifiers.  We can find repeated phrases that are unique to that document's field, as opposed to common phrases in all docs.
6. Pass to the next layer only a cut  of top keyphrases sorted by frequency ^ word count
7. Create a double-ring weighted graph mapping keyphrases as the central ring and each sentence that uses that concept on the outer ring and give each link weights to determine probability of going to that link 
8.  Weights sentences using TextRank noun keyphrase frequency to find which sentences centralize and tie together keyphrase concepts refered to most by other sentences. Based on the TextRank & PageRank algorithms, it randomly surfs links to nodes to find probability of being at that node, thus ranking influence. There's also random jumps to prevent stuck in a loop around same sentences.
9. Cut off top Number or percent (for larger docs) of top sentences and keyphrases by overall weight and graph centrality 
10. Returns Top Sentences (and  keyphrases for each sentence) and Top Keyphrases (and which sentences for each keyphrase). 
11. If the user clicks a keyphrase, or if there was a search query leading to doc, we can compare similarity of query to which keyphrase is most similar -- then we give that keyphrase a lot more weight and rerank everything from step #8 TextRank. 


#### 🌍📖 WORLD: Wikipedia Outline Relational Lexicon & Dictionary 

 Search and outline a research base using Wikipedia's 100k popular pages as the core topic phrases graph for LLM Research Agents. Most of the documents online (and by extension thinking in the collective conciousness) can revolve around core topic phrases linked as a graph.  If all the available docs are nodes, the links in the graph can be extracted Wiki page entities and mappings of dictionary phrases to their wiki page. These can serve as topic labels, keywords, and suggestions for LLM followup questions. Documents can be linked in a graph with: 1. wiki page entity recognition 2. frequent keyphrases 3. html links 4. research paper references 5. keyphrases to query in global web search 6. site-specific recommendations. These can lay the foundation for LLM Research Agents to fully grok, summarize, and outline a research base.   


* 240K total words & phrases, first 117K first-word or single words to check every token against. 100K Wikipedia Page Titles and links - Wikipedia most popular pages titles. Also includes domain specificity score and what letters should be capital.
* 84K  words and 67K phrases in dictionary lexicon  OpenEnglishWordNet, a better updated version of Wordnet - multiple definitions per term, 120k definitions, 45 concept categories
* JSON Prefix Trie  - arranged by sorting words and phrases for lookup by first word to tokenize by word, then find if it starts a phrase based on entries, for Phrase Extraction from a text.   There is ["unanimous consensus"](https://johnresig.com/blog/javascript-trie-performance-analysis/) that Prefix Trie [O(1) lookups](https://github.com/daviddwlee84/LeetCode/blob/master/Notes/DataStructure/Trie_PrefixTree.md) (instead of thaving to loop through the index for each lookup)  makes it the best data type for this task.

#### 📈📉 WRITFAT: Weight Relevance by Inference of Topics and Frequency Averages for Terms 


Calculate term specificity for a single doc with BM25 formula by using Wikipedia term frequencies as the baseline Inverse Frequency across Documents. WikiBM25 solves the need to pass in all docs to compute against all documents in a database. The problem with BM25 and TF-IDF is that a large set of documents is needed to find the words that are repeated often across all. These overused words are often the same list of words, so using Wikipedia's term frequencies ensures a common sense baseline against a neutral corpus.

Use this list to Replace or Combine with All Documents IDF - Many websites may have less than a hundred pages to search through and that is not enough to find which terms are domain-specific. They can score a single doc at a time to find the weight each word in query gets. Wikipedia IDf can be a baseline IDF to average with the All Docs IDF for uniqueness across the average public and the specific domain. 

Example: Given a query "Superbowl wins by year" we do not want to simply return docs filled with common words like year, but rather recognize Superbowl is more domains-specific. This requires precomputing IDF values across all docs, and for websites that may not have that many docs to start with may consider averaging their precomputed score with wikiIDF values to ensure most unique words get a score.

**LLM RAG Chunk to Query Similarity** - When we chunk a document into parts to find which to pass into a LLM prompt, they need to be weighted to relevance to the query. Semantic Embedding with a LLM not only takes resources to compute & store the vectors, it also [performs worse](https://youtu.be/9QJXvNiJIG8?si=ey4GbqtV8tD5WV2P&t=725) than BM25 on its own. Hybrid BM25 & Embeddings RAG is best, but there may not be time to compute BM25 idf scores across all doc chunks. We need a fast way to distinguish more unique words to give them more weight rather than common short words that get repeated a lot in an edge case paragraph. WikiBM25 is the best in use cases like realtime web search where chunking the text cannot be done beforehand. 

$$\text{score}(D,Q) = \sum_{i=1}^{N} \text{Wiki-IDF}(q_i) \times \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$

####  WikiIDF Term Specificity Statistics Metadata

- Phrase Starter Words and Single Words:  104556

- Total Terms:  204169

- Dict single words:  84493

- Dict phrases:  67444

All words in English Wikipedia are sorted by number of pages they are in for 325K words with frequencies of at least 32 wikipages, between 3 to 23 characters of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, but filtering out numbers and foreign language.

- *Total Terms (frequency>=32)*: 324896
- *Filesize (JSON, frequency>=32)*: 4MB 
- *Total Articles (Wiki-en-2020)*: 5,989,879



#### Autocomplete &  Query To Topic Phrase Tokenization 

Search-on-keystroke and load this JSON index for word and phrase completion, sorted by how common the terms are with IDF, for search autocomplete dropdown. Tokening by word can often have a meaning widely different than  if it is part of a phrase, so it is better to extract phrases by first-word next-words pairings. Search results will be more accurate if we infer likely phrases and search for those words occuring together and not just split into words and find frequency. Examples are "white house" or "state of the art" which should be searched as a phrase but would return different context if split into words. As Led Zeppelin famously put it: ♫ "'Cause you know sometimes words have two meanings."


#### QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp

Search document_text for all words of search_term ignoring casing except treat "words in quotes" as if a single word like in Google search. Uses negative lookaheads (?=
bar(?=bar) to find the 1st "bar" and ignore second. Single line function that can be used anywhere.


### Further Research



 * [GPT Researcher](https://github.com/assafelovic/gpt-researcher)
 * [NLP Papers Latest Updates](https://index.quantumstat.com)
 *  [Anthropic Persuation Overview](https://www.anthropic.com/research/measuring-model-persuasiveness)
 * [NLP Research Progress](https://github.com/sebastianruder/NLP-progress/)

 * [NLP Datasets](https://github.com/niderhoff/nlp-datasets?tab=readme-ov-file) 

* Mikhail Galkin, & Valentin Malykh. (2020). Wikipedia TF-IDF Dataset Release (v1.0). Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

* Wikimedia (2024). "API:Opensearch".
https://www.mediawiki.org/wiki/API:Opensearch

* Trelis Research (2024). "Mastering Retrieval for LLMs - BM25, Fine-tuned Embeddings, and Re-Rankers." July 5, 2024. https://www.youtube.com/watch?v=9QJXvNiJIG8

*   Vasnetsov, Andrey (2024). "BM42: New Baseline for Hybrid Search". Qdrant Blog. https://qdrant.tech/articles/bm42/ 

 * Hongyang Zhao and Qiang Xie 2021 J. Phys.: Conf. Ser. 2078 012021 "An Improved TextRank Multi-feature Fusion Algorithm For Keyword Extraction of Educational Resources" https://iopscience.iop.org/article/10.1088/1742-6596/2078/1/012021/pdf

 * Kazemi et al (2020). Biased TextRank: Unsupervised Graph-Based Content Extraction. Proceedings of the 28th International Conference on Computational Linguistics. https://aclanthology.org/2020.coling-main.144.pdf

 * Goodwin, Danny (2024). "HUGE Google Search document leak reveals inner workings of ranking algorithm", May 28, 2024. Search Engine Land. https://searchengineland.com/google-search-document-leak-ranking-442617
