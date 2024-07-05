<p align="center">
<img src="https://i.imgur.com/5tCLYrA.png"  > 
</p>



### Wiki-BM25 -Term Specificity Search for a Single Doc

Calculate term specificity for a single doc with BM25 formula by using Wikipedia term frequencies as the baseline Inverse Frequency across Documents. 

Wiki-BM25 unlike BM25 solves the need to pass in all docs to compute against all documents in a database. The problem with BM25 and TF-IDF is that a large set of documents is needed to find the words that are repeated often across all. These overused words are often the same list of words, so using Wikipedia's term frequencies ensures a common sense baseline against a neutral corpus.

### Use Cases
- **WikiIDF** - Replace or Combine with All Documents IDF - Many websites may have less than a hundred pages to search through and that is not enough to find which terms are domain-specific. They can score a single doc at a time to find the weight each word in query gets. Wikipedia IDf can be a baseline IDF to average with the All Docs IDF for uniqueness across the average public and the specific domain.

- **DSEEK** - Domain-Specific Extraction of Entities and Keywords - This can be used to find unique, domain-specific keyphrases using noun Ngrams. Domains-specific examples in medical data would be "endocrinology" or in religion it is "thou shall" which can help build category label classifiers.  We can find repeated phrases that are unique to that document's field, as opposed to common phrases in all docs.

- **LLM RAG Chunk to Query Similarity** - As [explained in this video](https://youtu.be/9QJXvNiJIG8?si=aCX-1-vewhJtFqIb&t=1645), when we chunk a document into parts to find which to pass into a LLM prompt, they need to be weighted to relevance to the query. Semantic Embedding with a LLM not only takes resources to compute & store the vectors, it also [performs worse](https://youtu.be/9QJXvNiJIG8?si=ey4GbqtV8tD5WV2P&t=725) than BM25 on its own. Hybrid BM25 & Embeddings RAG is best, but there may not be time to compute BM25 idf scores across all doc chunks. We need a fast way to distinguish more unique words to give them more weight rather than common short words that get repeated a lot in an edge case paragraph. WikiBM25 is the best in use cases like realtime web search where chunking the text cannot be done beforehand. It is also possible to vectorize and compare the dot product similarity of query to keyphrases which are then mapped to parts of the document like section labels. This is more in line with how humans think of article organization into section headings and lead sentences which tie in concepts from others.

### Statistics

325K words with frequencies of at least 32 wikipages, between 3 to 23 characters of English alphanumerics like az09, punctuation like .-, and diacritics like éï, but filter out numbers and foreign language.

- *Total Articles (Wiki-en-2020)*: 5,989,879


- *Total Terms (frequency>=32)*: 324896
- *Filesize (JSON, frequency>=32)*: 4MB 


- *Total Terms (frequency>=16)*: 525674
- *Filesize (JSON, frequency>=16)*: 7MB 

- *Total Terms (frequency>=8)*: 860117
- *Filesize (JSON, frequency>=8)*: 11MB

### BM25 Formula

$$\text{score}(D,Q) = \sum_{i=1}^{N} \text{W-IDF}(q_i) \times \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$

### Wikipedia API Search

Function to query phrase in Wikipedia Search API and return page titles, images and first few sentences of each result.  Wikipedia Search API is has complex [documentation](https://www.mediawiki.org/wiki/API:Opensearch) and is dificult to parse and clean up results.

 * plainText = false, // Return plain text instead of HTML
 * summarySentenceLimit = 3, // Limit summary to this many sentences
 * limitSearchResults = 1, // Limit number of search results
 * images = true, // Include image in results
 * imageSize = 200, // Image size in pixels
 * searchInTitleOnly = false, // Search in title only
 * rerankByTitleSimilarity = true, // Rerank results by query to title Jaro-Winkler distance softmax
 * filterDisambiguation = true, // Filter disambiguation pages like "may refer to"


### References

*   Vasnetsov, Andrey (2024). "BM42: New Baseline for Hybrid Search". Qdrant Blog. https://qdrant.tech/articles/bm42/ 

> [Qdrant developed BM42](https://qdrant.tech/articles/bm42/) in 2024 to replace term frequency with average word weights by self-attention tansformer language models. This scores word importance better than BM25 in short documents which are too short to use word frequency as the key weight. BM42 is not used but it is benchmarked and implemented with Transformers.js BERT model.

* ritvikmath (2023). "BM25 : The Most Important Text Metric in Data Science". https://www.youtube.com/watch?v=ruBm9WywevM 

* Mikhail Galkin, & Valentin Malykh. (2020). Wikipedia TF-IDF Dataset Release (v1.0). Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

* Wikimedia (2024). "API:Opensearch".
https://www.mediawiki.org/wiki/API:Opensearch

* Trelis Research (2024). "Mastering Retrieval for LLMs - BM25, Fine-tuned Embeddings, and Re-Rankers." July 5, 2024. https://www.youtube.com/watch?v=9QJXvNiJIG8