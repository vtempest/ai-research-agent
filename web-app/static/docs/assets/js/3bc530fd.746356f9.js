"use strict";(self.webpackChunkopenapi_docusaurus=self.webpackChunkopenapi_docusaurus||[]).push([["1490"],{62316:function(e,n,r){r.r(n),r.d(n,{default:()=>a,frontMatter:()=>t,metadata:()=>i,assets:()=>l,toc:()=>h,contentTitle:()=>c});var i=JSON.parse('{"id":"functions/similarity/similarity-vector","title":"similarity-vector","description":"ai-research-agent / similarity/similarity-vector","source":"@site/docs/functions/similarity/similarity-vector.md","sourceDirName":"functions/similarity","slug":"/functions/similarity/similarity-vector","permalink":"/docs/functions/similarity/similarity-vector","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"functions","previous":{"title":"similarity-remote-api","permalink":"/docs/functions/similarity/similarity-remote-api"},"next":{"title":"usearch","permalink":"/docs/functions/similarity/usearch"}}'),s=r("85893"),d=r("50065");let t={},c=void 0,l={},h=[{value:"Other",id:"other",level:2},{value:"AutoTokenizer",id:"autotokenizer",level:3},{value:"Type Parameters",id:"type-parameters",level:4},{value:"calculateCosineSimilarity()",id:"calculatecosinesimilarity",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Similarity",id:"similarity",level:2},{value:"addEmbeddingVectorsToIndex()",id:"addembeddingvectorstoindex",level:3},{value:"VSEARCH: Vector Similarity Embedding Approximation in RAM-Limited Cluster Hierarchy",id:"vsearch-vector-similarity-embedding-approximation-in-ram-limited-cluster-hierarchy",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Author",id:"author",level:4},{value:"convertTextToEmbedding()",id:"converttexttoembedding",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"getAllEmbeddings()",id:"getallembeddings",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"getEmbeddingModel()",id:"getembeddingmodel",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"searchVectorIndex()",id:"searchvectorindex",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Throws",id:"throws",level:4},{value:"Example",id:"example",level:4},{value:"weighRelevanceConceptVector()",id:"weighrelevanceconceptvector",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4}];function o(e){let n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/functions/",children:"ai-research-agent"})," / similarity/similarity-vector"]}),"\n",(0,s.jsx)(n.h2,{id:"other",children:"Other"}),"\n",(0,s.jsx)(n.h3,{id:"autotokenizer",children:"AutoTokenizer"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"type AutoTokenizer<>: AutoTokenizer;\n"})}),"\n",(0,s.jsx)(n.h4,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:(0,s.jsx)("th",{children:"Type Parameter"})})}),(0,s.jsx)("tbody",{})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"calculatecosinesimilarity",children:"calculateCosineSimilarity()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function calculateCosineSimilarity(vectorA, vectorB): number\n"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Cosine_similarity",children:"Cosine similarity"})," gets similarity of two\nvectors by whether they have the same direction (similar) or are poles apart. Cosine similarity\nis often used with text representations to compare how similar two documents or sentences\nare to each other. The output of cosine similarity ranges from -1 to 1, where -1 means the\ntwo vectors are completely dissimilar, and 1 indicates maximum similarity."]}),"\n",(0,s.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"vectorA"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"}),"[]"]})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"vectorB"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"}),"[]"]})}),(0,s.jsx)("td",{})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})}),"\n",(0,s.jsx)(n.p,{children:"-1 to 1 similarity score"}),"\n",(0,s.jsx)(n.h2,{id:"similarity",children:"Similarity"}),"\n",(0,s.jsx)(n.h3,{id:"addembeddingvectorstoindex",children:"addEmbeddingVectorsToIndex()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function addEmbeddingVectorsToIndex(documentVectors, options?): Promise<HierarchicalNSW>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"vsearch-vector-similarity-embedding-approximation-in-ram-limited-cluster-hierarchy",children:"VSEARCH: Vector Similarity Embedding Approximation in RAM-Limited Cluster Hierarchy"}),"\n",(0,s.jsx)("img",{src:"https://i.imgur.com/nvJ7fzO.png",width:"350px"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Compile hnswlib-node or NGT algorithm C++ to WASM JS for efficient similarity search."}),"\n",(0,s.jsx)(n.li,{children:"Vector index is split by K-means into regional clusters, each being a\nspecific size to fit in RAM. This is better than popular vector engines that\nrequire costly 100gb-RAM servers because they load all the vectors at once."}),"\n",(0,s.jsx)(n.li,{children:"Vectors for centroids of each cluster are stored in a list in SQL, each\ncluster's binary quantized data is exported as base64 string to SQL, S3, etc."}),"\n",(0,s.jsx)(n.li,{children:"Search: Embed Query, Compare to each cluster centroid to pick top clusters,\ndownload  base64 strings for those clusters, load each into WASM, find top neighbors\nper cluster, merge results sorted by distance."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/yahoojapan/NGT/wiki",children:"NGT Algorithm"}),"\n",(0,s.jsx)(n.a,{href:"https://github.com/yahoojapan/NGT/blob/main/lib/NGT/Clustering.h#L82",children:"NGT Cluster"}),"\n",(0,s.jsx)(n.a,{href:"https://qdrant.tech/articles/memory-consumption/",children:"https://qdrant.tech/articles/memory-consumption/"}),"\n",(0,s.jsx)(n.a,{href:"https://lancedb.com",children:"Lancedb"}),"\n",(0,s.jsx)(n.a,{href:"https://unum-cloud.github.io/usearch/javascript/index.html",children:"Usearch"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ann-benchmarks.com",children:"ANN Benchmarks"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://ann-benchmarks.com/glove-100-angular_10_angular.png",alt:"Benchmark"})}),"\n",(0,s.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"documentVectors"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"string"}),"[]"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"An array of document texts to be vectorized."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:["{ ",(0,s.jsx)(n.code,{children:"maxElements"}),": ",(0,s.jsx)(n.code,{children:"number"}),"; ",(0,s.jsx)(n.code,{children:"numDimensions"}),": ",(0,s.jsx)(n.code,{children:"number"}),"; }"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"Optional parameters for vector generation and indexing."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.maxElements"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The maximum number of data points."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.numDimensions"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The length of data point vector that will be indexed."})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"HierarchicalNSW"}),">"]}),"\n",(0,s.jsx)(n.p,{children:"The created HNSW index."}),"\n",(0,s.jsx)(n.h4,{id:"author",children:"Author"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://arxiv.org/abs/1603.09320",children:"Malkov et al. (2016)"}),","]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"converttexttoembedding",children:"convertTextToEmbedding()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function convertTextToEmbedding(text, options?): Promise<{\n  embedding: number[];\n  embeddingsDict: {};\n }>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Text embeddings convert words or phrases into numerical vectors in a high-dimensional\nspace, where each dimension represents a semantic feature extracted by a model like\nMiniLM-L6-v2. In this concept space, words with similar meanings have vectors that\nare close together, allowing for quantitative comparisons of semantic similarity.\nThese vector representations enable powerful applications in natural language processing,\nincluding semantic search, text classification, and clustering, by leveraging the\ngeometric properties of the embedding space to capture and analyze the relationships\nbetween words and concepts.\n",(0,s.jsx)(n.a,{href:"https://www.youtube.com/watch?v=sNa_uiqSlJo&t=129s",children:"Text Embeddings, Classification, and Semantic Search\n(Youtube)"})]}),"\n",(0,s.jsx)("img",{src:"https://i.imgur.com/wtJqEqX.png",width:"350"}),"\n",(0,s.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"text"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The text to embed."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:["{ ",(0,s.jsx)(n.code,{children:"pipeline"}),": ",(0,s.jsx)(n.code,{children:"AutoTokenizer"}),"; ",(0,s.jsx)(n.code,{children:"precision"}),": ",(0,s.jsx)(n.code,{children:"number"}),"; }"]})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.pipeline"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"AutoTokenizer"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The pipeline to use for embedding."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.precision"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"default=4 - The number of decimal places to round to."})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<{\n",(0,s.jsx)(n.code,{children:"embedding"}),": ",(0,s.jsx)(n.code,{children:"number"}),"[];\n",(0,s.jsx)(n.code,{children:"embeddingsDict"}),": {};\n}>"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"getallembeddings",children:"getAllEmbeddings()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function getAllEmbeddings(index, precision): number[][]\n"})}),"\n",(0,s.jsx)(n.p,{children:"Retrieves all embeddings from the HNSW index."}),"\n",(0,s.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Default value"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"index"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"HierarchicalNSW"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"undefined"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The HNSW index containing the embeddings."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"precision"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"8"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"default=8 - The number of decimal places to round to."})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"number"}),"[][]"]}),"\n",(0,s.jsx)(n.p,{children:"An array of embedding vectors.\n*"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"getembeddingmodel",children:"getEmbeddingModel()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function getEmbeddingModel(options?): Promise<AutoTokenizer>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Initialize HuggingFace Transformers pipeline for embedding text."}),"\n",(0,s.jsx)("img",{src:"https://i.imgur.com/3R5Tsrf.png",width:"350px"}),"\n",(0,s.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:["{ ",(0,s.jsx)(n.code,{children:"modelName"}),": ",(0,s.jsx)(n.code,{children:"string"}),"; ",(0,s.jsx)(n.code,{children:"pipelineName"}),": ",(0,s.jsx)(n.code,{children:"string"}),"; }"]})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.modelName"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:'default="Xenova/all-MiniLM-L6-v2" -\nThe name of the model to use'})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.pipelineName"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:'default "feature-extraction",'})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"AutoTokenizer"}),">"]}),"\n",(0,s.jsx)(n.p,{children:"The pipeline.\n*"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"searchvectorindex",children:"searchVectorIndex()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function searchVectorIndex(\n   index, \n   query, \n   options?): Promise<object[]>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Searches the vector index for the nearest neighbors of a given query."}),"\n",(0,s.jsx)("img",{src:"https://github.com/NJU-RINC/hnsw-visulize/blob/master/path.gif?raw=true",width:"350px"}),"\n",(0,s.jsx)("img",{src:"https://i.imgur.com/ZAAfogK.png",width:"350px"}),"\n",(0,s.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"index"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"HierarchicalNSW"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The HNSW index to search."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"query"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The query string to search for."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:["{ ",(0,s.jsx)(n.code,{children:"numNeighbors"}),": ",(0,s.jsx)(n.code,{children:"number"}),"; }"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"Optional parameters for the search."})})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options.numNeighbors"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"number"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"The number of nearest neighbors to return."})})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"object"}),"[]>"]}),"\n",(0,s.jsx)(n.p,{children:"A promise that resolves to an array of nearest neighbors, each with an id and distance."}),"\n",(0,s.jsx)(n.h4,{id:"throws",children:"Throws"}),"\n",(0,s.jsx)(n.p,{children:"If there's an error during the search process."}),"\n",(0,s.jsx)(n.h4,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const index = await addEmbeddingVectorsToIndex(documentVectors);\nconst results = await searchVectorIndex(index, 'example query');\nconsole.log(results); // [{id: 3, distance: 0.1}, {id: 7, distance: 0.2}, ...]\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"weighrelevanceconceptvector",children:"weighRelevanceConceptVector()"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function weighRelevanceConceptVector(\n   documents, \n   query, \n   options?): Promise<object[]>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Rerank documents's chunks based on relevance to query,\nbased on cosine similarity of their concept vectors generated\nby a 20MB MiniLM transformer model downloaded locally."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://www.youtube.com/watch?v=5MaWmXwxFNQ&t=323s",children:"A Complete Overview of Word Embeddings"})}),"\n",(0,s.jsx)(n.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Parameter"}),(0,s.jsx)("th",{children:"Type"}),(0,s.jsx)("th",{children:"Description"})]})}),(0,s.jsxs)("tbody",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"documents"})})}),(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"string"}),"[]"]})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"query"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})})}),(0,s.jsx)("td",{})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"options"}),"?"]})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"Object"})})}),(0,s.jsx)("td",{})]})]})]}),"\n",(0,s.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Promise"}),"<",(0,s.jsx)(n.code,{children:"object"}),"[]>"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{}),"\n"]})]})}function a(e={}){let{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},50065:function(e,n,r){r.d(n,{Z:function(){return c},a:function(){return t}});var i=r(67294);let s={},d=i.createContext(s);function t(e){let n=i.useContext(d);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),i.createElement(d.Provider,{value:n},e.children)}}}]);