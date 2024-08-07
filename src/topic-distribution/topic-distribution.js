import {isStopWord} from "../tokenize/stopwords";
import {stemRootWord} from "../tokenize/stemmer.js";

/**
 * Latent Dirichlet (pronounced Dee-ruesh-ley) allocation  is used
 * in natural language processing to discover abstract topics in a
 * collection of documents. It is a generative probabilistic model
 * that assumes documents are mixtures of topics, where a topic
 * is a probability distribution over words. LDA uses Bayesian
 * inference to simultaneously learn the topics and topic mixtures
 * that occur around each other in an unsupervised manner.
 * https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation
 * https://www.youtube.com/watch?v=aPRjj8i_6yE
 * https://www.geeksforgeeks.org/latent-dirichlet-allocation/
 * https://www.youtube.com/watch?v=yK7nN3FcgUs
 *
 * @param {string[]} sentences - Array of input sentences.
 * @param {Object} options - Configuration options for LDA.
 * @param {number} options.topicCount=10 - Number of topics to extract.
 * @param {number} options.numberOfTermsPerTopic=10 - Number of terms to show for each topic.
 * @param {number} options.alpha=0.1 - Dirichlet prior on document-topic distributions.
 * @param {number} options.beta=0.01 - Dirichlet prior on topic-word distributions.
 * @param {number} options.numberOfIterations=1000 - Number of iterations for the LDA algorithm.
 * @param {number} options.valueBurnIn=100 - Number of burn-in iterations.
 * @param {number} options.valueSampleLag=10 - Lag between samples.
 * @returns {Array} - Array of topics, each containing term-probability pairs.
 * @category Topics
 */
export function weighTopicDirichletDistribution(sentences, options = {}) {
  const {
    topicCount = 8,
    numberOfTermsPerTopic = 4,
    alpha = 0.1,
    beta = 0.01,
    numberOfIterations = 1000,
    valueBurnIn = 100,
    valueSampleLag = 10
  } = options;

  let processedDocuments = [];
  let termFrequency = {};
  let vocabulary = [];
  let originalVocabulary = {};
  const combinedStopwords = stopWords;

  // Preprocess documents
  sentences.forEach((sentence, sentenceIndex) => {
    if (!sentence) return;

    let words = sentence.split(/[\s,\"]+/);
    if (!words) return;

    processedDocuments[sentenceIndex] = [];

    words.forEach((word) => {
      let cleanedWord = word
        .toLowerCase()
        .replace(/[^a-z\'A-Z0-9\u00C0-\u00ff ]+/g, "");
      let stemmedWord = stemRootWord(cleanedWord);

      if (
        cleanedWord !== "" &&
        stemmedWord &&
        cleanedWord.length > 1 &&
        !isStopWord(cleanedWord.replace("'", "")) &&
        !isStopWord(stemmedWord)
      ) {
        if (termFrequency[stemmedWord]) {
          termFrequency[stemmedWord]++;
        } else {
          termFrequency[stemmedWord] = 1;
          vocabulary.push(stemmedWord);
          originalVocabulary[stemmedWord] = cleanedWord;
        }

        processedDocuments[sentenceIndex].push(vocabulary.indexOf(stemmedWord));
      }
    });
  });

  // LDA variables
  const vocabularySize = vocabulary.length;
  const documentCount = processedDocuments.length;

  // Initialize LDA state
  let topicAssignments = processedDocuments.map((doc) =>
    doc.map(() => Math.floor(Math.random() * topicCount))
  );

  let wordTopicCounts = Array.from({ length: vocabularySize }, () =>
    new Array(topicCount).fill(0)
  );
  let docTopicCounts = Array.from({ length: documentCount }, () =>
    new Array(topicCount).fill(0)
  );
  let wordTopicTotals = new Array(topicCount).fill(0);
  let docTopicTotals = processedDocuments.map((doc) => doc.length);

  let topicDocumentDist = Array.from({ length: documentCount }, () =>
    new Array(topicCount).fill(0)
  );
  let topicWordDist = Array.from({ length: topicCount }, () =>
    new Array(vocabularySize).fill(0)
  );
  let statsCount = 0;

  processedDocuments.forEach((doc, docIndex) => {
    doc.forEach((wordIndex, position) => {
      const topic = topicAssignments[docIndex][position];
      wordTopicCounts[wordIndex][topic]++;
      docTopicCounts[docIndex][topic]++;
      wordTopicTotals[topic]++;
    });
  });

  // Gibbs sampling
  for (let iteration = 0; iteration < numberOfIterations; iteration++) {
    processedDocuments.forEach((doc, docIndex) => {
      doc.forEach((wordIndex, position) => {
        const currentTopic = topicAssignments[docIndex][position];

        // Decrease counts for current topic assignment
        wordTopicCounts[wordIndex][currentTopic]--;
        docTopicCounts[docIndex][currentTopic]--;
        wordTopicTotals[currentTopic]--;
        docTopicTotals[docIndex]--;

        // Calculate topic probabilities
        const topicProbs = new Array(topicCount).fill(0);
        for (let topic = 0; topic < topicCount; topic++) {
          topicProbs[topic] =
            (((wordTopicCounts[wordIndex][topic] + beta) /
              (wordTopicTotals[topic] + vocabularySize * beta)) *
              (docTopicCounts[docIndex][topic] + alpha)) /
            (docTopicTotals[docIndex] + topicCount * alpha);
        }

        // Sample new topic
        const sum = topicProbs.reduce((a, b) => a + b, 0);
        const normalized = topicProbs.map((p) => p / sum);
        const r = Math.random();
        let cumulativeProb = 0;
        for (let i = 0; i < normalized.length; i++) {
          cumulativeProb += normalized[i];
          if (r < cumulativeProb) return i;
        }
        const newTopic = normalized.length - 1;

        topicAssignments[docIndex][position] = newTopic;

        // Increase counts for new topic assignment
        wordTopicCounts[wordIndex][newTopic]++;
        docTopicCounts[docIndex][newTopic]++;
        wordTopicTotals[newTopic]++;
        docTopicTotals[docIndex]++;
      });
    });

    // Update iteration status and collect samples if necessary
    if (iteration > valueBurnIn && valueSampleLag > 0 && iteration % valueSampleLag === 0) {
      for (let docIndex = 0; docIndex < documentCount; docIndex++) {
        for (let topic = 0; topic < topicCount; topic++) {
          topicDocumentDist[docIndex][topic] +=
            (docTopicCounts[docIndex][topic] + alpha) /
            (docTopicTotals[docIndex] + topicCount * alpha);
        }
      }
      for (let topic = 0; topic < topicCount; topic++) {
        for (let wordIndex = 0; wordIndex < vocabularySize; wordIndex++) {
          topicWordDist[topic][wordIndex] +=
            (wordTopicCounts[wordIndex][topic] + beta) /
            (wordTopicTotals[topic] + vocabularySize * beta);
        }
      }
      statsCount++;
    }
  }

  // Calculate final topic-word distribution
  let finalTopicWordDist;
  if (valueSampleLag > 0) {
    finalTopicWordDist = topicWordDist.map((row) =>
      row.map((val) => val / statsCount)
    );
  } else {
    finalTopicWordDist = wordTopicCounts.map((row, wordIndex) =>
      row.map(
        (count, topic) =>
          (count + beta) / (wordTopicTotals[topic] + vocabularySize * beta)
      )
    );
  }

  // Extract and format results
  let topicResults = [];
  finalTopicWordDist.forEach((topic, topicIndex) => {
    let topicTerms = topic.map((prob, wordIndex) => ({
      probability: prob,
      stemmedWord: vocabulary[wordIndex],
      originalWord: originalVocabulary[vocabulary[wordIndex]],
    }));

    topicTerms.sort((a, b) => b.probability - a.probability);

    // Always take the top numberOfTermsPerTopic terms, regardless of probability
    let topicResult = topicTerms
      .slice(0, numberOfTermsPerTopic)
      .map((term) => ({
        term: term.originalWord,
        probability: term.probability,
      }));

    topicResults.push(topicResult);
  });

  return topicResults;
}
