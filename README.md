## WikiBM25 Term Frequency

Calculate term specificity for a single doc with BM25 formula by using Wikipedia term frequencies as the baseline Inverse Frequency across Documents. 

WikiBM25 unlike BM25 solves the need to pass in all docs to compute against all documents in a database. The problem with BM25 and TF-IDF is that a large set of documents is needed to find the words that are repeated often across all. These oversaturated words are commonly the same words so using Wikipedia's term frequencies ensures a common sense baseline. Many websites may have less than a hundred pages to search through. They can score a single doc at a time to find the weight each word in query gets. 

[Qdrant developed BM42](https://qdrant.tech/articles/bm42/) in 2024 to replace term frequency with average word weights by self-attention tansformer language models. This scores word importance better than BM25 in short documents which are too short to use word frequency as the key weight.



### Statistics

- *Total Articles (Wiki-en-2020)*: 5,989,879 

- *Total Terms (frequency>=8)*: 947,609
- *Filesize (JSON, frequency>=8)*: 12MB

- *Total Terms (frequency>=3)*: 2,055,950
- *Filesize (JSON, frequency>=3)*: 27MB

### BM25 Formula

$$
\text{score}(D,Q) = \sum_{i=1}^{N} \text{IDF}(q_i) \times \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}
$$

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

* ritvikmath (2023). "BM25 : The Most Important Text Metric in Data Science". https://www.youtube.com/watch?v=ruBm9WywevM 

* Smart Data Analytics (2020). "Wikipedia_TF_IDF_Dataset". Github repository. https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset?tab=readme-ov-file

* Wikimedia (2024). "API:Opensearch".
https://www.mediawiki.org/wiki/API:Opensearch