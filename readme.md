<p align="center">
    <img width="350px" src="https://i.imgur.com/8JvNmxU.jpeg">
</p>
<p align="center">
    Being is Becoming<br />
    Whatever Research Can Be,<br /> 
    That is What It Must Become.<br />
    If AI is Humanity's Last Invention, <br />
    Then Vector Space is the Final Frontier.<br />
</p>
<p align="center">
    <br />
    <a href="https://npmjs.org/package/ai-research-agent">
        <img src="https://nodei.co/npm/ai-research-agent.png?compact=true"
            alt="NPM badge for ai-research-agent">
    </a>
</p>
<p align="center">
    <a href="https://discord.gg/SJdBqBz3tV">
        <img src="https://img.shields.io/discord/1110227955554209923.svg?label=Chat&logo=Discord&colorB=7289da&style=flat"
            alt="Join Discord" />
    </a>
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/vtempest/ai-research-agent">
    <a href="https://github.com/vtempest/ai-research-agent/discussions">
    <img alt="GitHub Discussions"
        src="https://img.shields.io/github/discussions/vtempest/ai-research-agent">
    </a>
    <a href="https://github.com/vtempest/ai-research-agent/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/vtempest/ai-research-agent" />
    </a>
</p>
<p align="center">
    <a href="https://npmjs.org/package/ai-research-agent">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dy/ai-research-agent">
    </a>
    <a href="https://github.com/vtempest/ai-research-agent/actions/workflows/static.yml">
    <img src="https://github.com/vtempest/ai-research-agent/actions/workflows/static.yml/badge.svg" alt="Build Status">
    </a>
    <a href="http://makeapullrequest.com">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
            alt="PRs Welcome">
    </a>
    <a href="https://codespaces.new/vtempest/ai-research-agent">
    <img src="https://github.com/codespaces/badge.svg" width="150" height="20">
    </a>
</p>
<h3 align="center"><a href="https://airesearch.js.org/">Javascript Docs (airesearch.js.org)</a> <a href="https://qwksearch.com/">Live Demo (qwksearch.com)</a></h3>


### 🧠💻 Reimagine the Internet as Self-Organizing Mind Map

<p align="center">
    <video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768" width="550px" controls     />
</p>

Critical times call for critical thinkers to create a crowdsourced argument reasoning dataset, for AI models to recommend research quotes, evolve crowdsourced chain-of-thought reasoning, unlock faster ways to read long articles, monitor developments by topic modeling a knowledge base graph, and provide a public service of answers to research.

Language Models can distill the essence of collective thought into a vector space where every point has a weighted value representing its contribution to the overall decision-making process, leading to direct democratic AI economy where public votes reward influence. AI will show its reasoning based on what sentences and cites it used from the collective research, so that people can see it is aligned with our interests.  Research Agents recommend articles for human researchers working alongside AI to develop a summarized topic outline as a public service. The agents monitor for any related articles via web searches for keywords associated with that Topic Model. Users can upload research PDFs, then the app finds the citations full text and creates topic model and keyword summaries, then monitors that literature base and stores highlights. People will make personal knowledge bases of what influences them to create AI assistants cloning their mind-uploaded perspective. Similar apps are Anthropic Claude, Obsidian, SciSpace and Perplexity, showing that people need this new way of self-organizing information.



#### 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 

<p align="center">
<img width="350px"  src="https://i.imgur.com/l5AFrS0.png" > 
</p>

[searchSTREAM  Docs](https://airesearch.js.org/functions/searchSTREAM.html)

 1. Search Web for query via metasearch of major engines or your custom data
 2. Extract text of top results with Tractor the Text Extractor.
 3. SEEKTOPIC: Extract Keyphrase Topics and Top Sentences that centralize those topics
 4. Rerank documents's chunks based on relevance to query,  using embeddings by convert text to concept vector, get cosine similarity of query to topic, returning the sentences central to key relevant parts of the article.
 5. Research Agent prompt with key sentences from relevant sources to answer via Groq Llama, OpenAI, or Anthropic API Key and suggest follow-ups

#### 🔤📊 SEEKTOPIC: Summarization by Extracting Entities, Keyword Tokens, and Outline Phrases Important to Context 
<p align="center">
<img width="350px"  src="https://i.imgur.com/nMoDgz6.jpeg" > 
</p>

[extractSEEKTOPIC Docs](https://airesearch.js.org/functions/extractSEEKTOPIC.html)

 [SEEKTOPIC Sample Output](https://github.com/vtempest/ai-research-agent/blob/master/test/data/)


SEEKTOPIC can be used to find unique, domain-specific keyphrases using noun Ngrams.  The user can click on keyphrases or LLM can suggest questions based on them. The user can see highlighted just the most important sentences that centralize and tie in the core topics. It is possible to vectorize and compare the dot product similarity of query to keyphrases which are then mapped to parts of the document like section labels. This is more in line with how humans think of article organization into section headings and lead sentences which tie in concepts from others.

SEEKTOPIC extracts unique, domain-specific key phrases from a document using noun 
 n-grams and ranks sentences based on their centrality to the most frequently 
 referenced key phrase concepts,  enabling efficient extraction of 
 domain-specific content and provides a flexible framework for summarization.
 
 1. Sentence Segmentation: Split the text into sentences, accounting for 
    common abbreviations, numbers, URLs, and other exceptions.
 2. Tokenization and Phrase Extraction: Employ a Wiki Phrases tokenizer to 
    identify wiki topics, phrases, and nouns. This includes spell-checking 
    and root word verification using Porter Stemmer.
 3. Noun N-gram Extraction: Generate noun edge-grams, allowing for stop words 
    in the middle (e.g., "state of the art").
 4. Key Phrase Consolidation: Merge smaller n-grams that are subsets of 
    larger ones by comparing weights.
 5. Domain Specificity Calculation: Determine named entities and phrase 
    domain specificity using WikiIDF. This rewards unique key phrases 
    specific to the document's field (e.g., "endocrinology" in medical texts 
    or "thou shall" in religious texts).
 6. Key Phrase Filtering: Select top key phrases based on a combination of 
    frequency and word count.
 7. Graph Construction: Create a double-ring weighted graph with key phrases 
    in the central ring and sentences in the outer ring. Assign weights to 
    links based on concept usage probability.
 8. Sentence Weighting: Apply TextRank algorithm to weight sentences, 
    identifying those that centralize and connect key phrase concepts most 
    referenced by other sentences. This process, based on TextRank and 
    PageRank, includes random surfing and jumping to avoid loops.
 9. Top Results Selection: Select top sentences and key phrases based on 
    overall weight and graph centrality, using either a fixed number or 
    percentage for larger documents.
 10. Output Generation: Return top sentences (with associated key phrases) 
     and top key phrases (with associated sentences).
 11. Dynamic Reranking: If a user interacts with a key phrase or if there's a 
     search query leading to the document, compare query similarity to key 
     phrases, heavily weight the most similar key phrase, and reapply 
     TextRank from step 8.

#### 🚜📜 Tractor the Text Extractor

<p align="center">
<img width="350px"  src="https://i.imgur.com/cRewT07.png" > 
</p>

[extract Docs](https://airesearch.js.org/functions/extract.html)

1. Main Content Detection: Extract the main content from a URL by combining Mozilla Readability and Postlight Mercury algorithms, utilizing over 100 custom adapters for major sites for article, author, date HTML classes.
2. Basic HTML Standardization: Transform complex HTML into a simplified reading-mode format of basic HTML, making it ideal for research note archival and focused reading, with headings, images and links.
3. YouTube Transcript Processing: When a YouTube video URL is detected, retrieve the complete video transcript including both manual captions and auto-generated subtitles, maintaining proper timestamp synchronization and speaker identification where available.
4. PDF Text Extraction and Structure: Process PDF documents by extracting formatted text while intelligently handling line breaks, page headers, and footnotes. The system analyzes text height statistics to automatically infer heading levels, creating a properly structured document hierarchy based on standard deviation from mean text size.
5. Citation Information Extraction: Identify and extract citation metadata including author names, publication dates, sources, and titles using HTML meta tags and common class name patterns. The system validates author names against a comprehensive database of 90,000 first and last names, distinguishing between personal and organizational authors to properly format citations.
6. Author Name Formatting: Process author names by checking against known name databases, handling affixes and titles correctly, and determining whether to reverse the name order based on whether it's a personal or organizational author, ensuring proper citation formatting.
7. Content Validation: Verify the extracted content's completeness and accuracy by comparing results from multiple extraction methods, ensuring all essential elements are preserved and properly formatted for the intended use case.


#### 🕸️🖥️ Tardigrade the Web Crawler 
<p align="center">
<img src="https://i.imgur.com/XXXTprT.png" width="350px" /> 
</p>

[scrapeURL Docs](https://airesearch.js.org/functions/scrapeURL.html)

1. First Use Fetch API, check for bot detection. Scrape  any domain's URL to get its HTML, JSON, or Binary Buffer. 
Scraping internet pages is a [free speech right 
globally](https://blog.apify.com/is-web-scraping-legal/).
2. Features: timeout, redirects, default UA, referer as google, and bot 
detection checking. 
3. If fetch method does not get needed HTML, use Docker container wih proxy as backup.
4. [Setup Docker](https://github.com/vtempest/ai-research-agent/tree/master/src/crawler)
 container with NodeJS server API renders with puppeteer DOM to get all HTML loaded by
 secondary in-page API requests after the initial page request, including user login and cookie storage.
5. Bypass Cloudflare bot check: A webpage proxy that request through Chromium (puppeteer) - can be used
to bypass Cloudflare anti bot using cookie id javascript method.
6. Send your request to the server with the port 3000 and add your URL to the "url"
 query string like this: `http://localhost:3000/?url=https://example.org`. Pass in this proxy url in the fetch request.


#### 🌍📖 WORLD: Wikipedia Outline Relational Lexicon & Dictionary 

<p align="center">
<img width="350px"  src="https://i.imgur.com/ffaU3s7.jpeg" > 
</p>

[compileTopicModel Docs](https://github.com/vtempest/ai-research-agent/blob/master/src/datasets/compile-topic-model.js)

 Search and outline a research base using Wikipedia's 100k popular pages as the core topic phrases graph for LLM Research Agents. Most of the documents online (and by extension thinking in the collective conciousness) can revolve around core topic phrases linked as a graph.  If all the available docs are nodes, the links in the graph can be extracted Wiki page entities and mappings of dictionary phrases to their wiki page. These can serve as topic labels, keywords, and suggestions for LLM followup questions. Documents can be linked in a graph with: 1. wiki page entity recognition 2. frequent keyphrases 3. html links 4. research paper references 5. keyphrases to query in global web search 6. site-specific recommendations. These can lay the foundation for LLM Research Agents to fully grok, summarize, and outline a research base.   


* 240K total words & phrases, first 117K first-word or single words to check every token against. 100K Wikipedia Page Titles and links - Wikipedia most popular pages titles. Also includes domain specificity score and what letters should be capital.
* 84K  words and 67K phrases in dictionary lexicon  OpenEnglishWordNet, a better updated version of Wordnet - multiple definitions per term, 120k definitions, 45 concept categories
* JSON Prefix Trie  - arranged by sorting words and phrases for lookup by first word to tokenize by word, then find if it starts a phrase based on entries, for Phrase Extraction from a text.   There is ["unanimous consensus"](https://johnresig.com/blog/javascript-trie-performance-analysis/) that Prefix Trie [O(1) lookups](https://github.com/daviddwlee84/LeetCode/blob/master/Notes/DataStructure/Trie_PrefixTree.md) (instead of thaving to loop through the index for each lookup)  makes it the best data type for this task.

#### 📈📝 WRITEFAT: Weight Relevance by Inference of Topics, Entities, and Frequency Averages for Terms 

<p align="center">
<img width="350px"  src="https://i.imgur.com/e2uTpoh.png" > 
</p>

[weighRelevanceTermFrequency Docs](https://airesearch.js.org/functions/weighRelevanceTermFrequency.html)

$$\text{score}(D,Q) = \sum_{i=1}^{N} \text{Wiki-IDF}(q_i) \times \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$

Calculate term specificity for a single doc with BM25 formula by using Wikipedia term frequencies as the baseline Inverse Frequency across Documents. WikiBM25 solves the need to pass in all docs to compute against all documents in a database. The problem with BM25 and TF-IDF is that a large set of documents is needed to find the words that are repeated often across all. These overused words are often the same list of words, so using Wikipedia's term frequencies ensures a common sense baseline against a neutral corpus.

All words in English Wikipedia are sorted by number of pages they are in for 325K words with frequencies of at least 32 wikipages, between 3 to 23 characters of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, but filtering out numbers and foreign language.
 Use this list to Replace or Combine with All Documents IDF - Many websites may have less than a hundred pages to search through and that is not enough to find which terms are domain-specific. They can score a single doc at a time to find the weight each word in query gets. Wikipedia IDf can be a baseline IDF to average with the All Docs IDF for uniqueness across the average public and the specific domain. 

Example: Given a query "Superbowl wins by year" we do not want to simply return docs filled with common words like year, but rather recognize Superbowl is more domains-specific. This requires precomputing IDF values across all docs, and for websites that may not have that many docs to start with may consider averaging their precomputed score with wikiIDF values to ensure most unique words get a score.

Use Case: LLM RAG Chunk to Query Similarity - When we chunk a document into parts to find which to pass into a LLM prompt, they need to be weighted to relevance to the query. Semantic Embedding with a LLM not only takes resources to compute & store the vectors, it also [performs worse](https://youtu.be/9QJXvNiJIG8?si=ey4GbqtV8tD5WV2P&t=725) than BM25 on its own. Hybrid BM25 & Embeddings RAG is best, but there may not be time to compute BM25 idf scores across all doc chunks. We need a fast way to distinguish more unique words to give them more weight rather than common short words that get repeated a lot in an edge case paragraph. WikiBM25 is the best in use cases like realtime web search where chunking the text cannot be done beforehand. 



#### 🧩🔍 Autocomplete &  Query To Topic Phrase Tokenization 

<p align="center">
    <img width="350px" src="https://i.imgur.com/tMjFGe4.jpeg">
</p>

[suggestNextWordCompletions Docs](https://airesearch.js.org/functions/suggestNextWordCompletions.html)

Search-on-keystroke and load this JSON index for word and phrase completion, sorted by how common the terms are with IDF, for search autocomplete dropdown. Tokening by word can often have a meaning widely different than  if it is part of a phrase, so it is better to extract phrases by first-word next-words pairings. Search results will be more accurate if we infer likely phrases and search for those words occuring together and not just split into words and find frequency. Examples are "white house" or "state of the art" which should be searched as a phrase but would return different context if split into words. As Led Zeppelin famously put it: ♫ "'Cause you know sometimes words have two meanings."



### Further Research
* [Debate on Graph (arxiv)](https://arxiv.org/html/2409.03155v1)
* [Awesome-LLMs-Datasets](https://github.com/lmmlzn/Awesome-LLMs-Datasets)
* [AI Research Agent's NPM Dependecies](https://npmgraph.js.org/?q=ai-research-agent#hide=)
* [Tensorflow.js Demos](https://www.tensorflow.org/js/demos)
* [GPT Researcher](https://github.com/assafelovic/gpt-researcher)
* [NLP Papers Latest Updates](https://index.quantumstat.com)
*  [Anthropic Persuation Overview](https://www.anthropic.com/research/measuring-model-persuasiveness)
* [NLP Research Progress](https://github.com/sebastianruder/NLP-progress/)
* [NLP Datasets](https://github.com/niderhoff/nlp-datasets?tab=readme-ov-file) 
* [Mastering Retrieval for LLMs - BM25, Fine-tuned Embeddings, and Re-Rankers](https://www.youtube.com/watch?v=9QJXvNiJIG8)
* [BM42: New Baseline for Hybrid Search](https://qdrant.tech/articles/bm42/)
* [Google Search  Algorithm](https://searchengineland.com/google-search-document-leak-ranking-442617)
* [Understanding UMAP](https://pair-code.github.io/understanding-umap/)
* [Transformers Explained Visually (Part 3)](https://towardsdatascience.com/transformers-explained-visually-part-3-multi-head-attention-deep-dive-1c1ff1024853) 
* [Can LLMs Generate Novel Research Ideas?](https://arxiv.org/html/2409.04109v1)
* [Graph Algorithms Playground](https://playground.memgraph.com)
* [CommonCrawl C4 Download](https://huggingface.co/datasets/allenai/c4)