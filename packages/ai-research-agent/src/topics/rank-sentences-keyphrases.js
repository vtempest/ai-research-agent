/**
 * Rank sentences based on their centrality to key phrases.
 * This function implements the TextRank algorithm to weight each sentence
 * based on the number of key phrases it shares with other sentences.
 * It creates a weighted graph where edges connect sentences to matching
 * keyphrases, then performs random walks to distribute probabilities.
 *
 * <br /> 
 * 1. Hongyang Zhao and Qiang Xie 2021 J. Phys.: Conf. Ser. 2078 012021
 *    "An Improved TextRank Multi-feature Fusion Algorithm For
 *    Keyword Extraction of Educational Resources"
 *    https://iopscience.iop.org/article/10.1088/1742-6596/2078/1/012021/pdf
 * <br />
 * 2. Pan, S. et al (2019). "An improved TextRank keywords extraction algorithm"
 *    https://dl.acm.org/doi/10.1145/3321408.3326659
 *    https://doi.org/10.1145/3321408.3326659
 * @param {Array<Object>} sentencesWithKeyphrases Array of objects, each containing (text, keyphrases)
 * @returns {Array<Object>} Updated array with added weights: text, keyphrases, weight
 */
export function rankSentencesCentralToKeyphrase(
  sentencesWithKeyphrases,
  options = {}
) {
  const {
    ITERATIONS = 1000, // Perform random walks to distribute weights
    RESET_INTERVAL = 100, // Reset to a random vertex to avoid getting stuck
  } = options;

  // Define graph data structure
  const graph = {
    vertices: new Map(),
    size: 0,

    // Add a new vertex to the graph
    addVertex: function (value) {
      this.size += 1;
      const newVertex = { value, adjacent: new Map() };
      this.vertices.set(value, newVertex);
      return newVertex;
    },

    // Retrieve a vertex from the graph
    getVertex: function (value) {
      return this.vertices.get(value);
    },

    // Add a weighted edge between two vertices
    addEdge: function (vertexA, vertexB, weight) {
      if (!this.vertices.has(vertexA)) {
        this.addVertex(vertexA);
      }
      if (!this.vertices.has(vertexB)) {
        this.addVertex(vertexB);
      }
      this.vertices.get(vertexA).adjacent.set(vertexB, weight);
      this.vertices.get(vertexB).adjacent.set(vertexA, weight);
    },

    // Get all vertex values in the graph
    getAllVertices: function () {
      return Array.from(this.vertices.keys());
    },
  };

  // Initialize weights for all sentences
  sentencesWithKeyphrases = sentencesWithKeyphrases.map((sentence) => ({
    ...sentence,
    weight: 0,
  }));

  // Build the graph by connecting sentences based on shared keyphrases
  for (let i = 0; i < sentencesWithKeyphrases.length; i++) {
    for (let j = i + 1; j < sentencesWithKeyphrases.length; j++) {
      const keyphrases1 = sentencesWithKeyphrases[i].keyphrases;
      const keyphrases2 = sentencesWithKeyphrases[j].keyphrases;
      let edgeWeight = 0;
      let longerList = keyphrases1;
      let shorterList = keyphrases2;

      // Ensure we're comparing the shorter list to the longer one
      if (keyphrases2.length >= keyphrases1.length) {
        longerList = keyphrases2;
        shorterList = keyphrases1;
      }
      shorterList = shorterList.map((k) => k.keyphrase);

      // Calculate edge weight based on shared keyphrases
      for (let k = 0; k < longerList.length; k++) {
        if (shorterList.includes(longerList[k].keyphrase)) {
          edgeWeight += longerList[k].weight / 100;
        }
      }

      // Add edge to graph if there's a connection
      if (edgeWeight > 0) {
        graph.addEdge(
          sentencesWithKeyphrases[i].text,
          sentencesWithKeyphrases[j].text,
          edgeWeight
        );
      }
    }
  }

  const allVertices = graph.getAllVertices();

  if (allVertices.length === 0) return;

  // Start random walk from a random vertex
  let currentVertex = graph.getVertex(
    allVertices[Math.floor(Math.random() * allVertices.length)]
  );
  let probabilityDistribution = [];
  for (let i = 0; i < ITERATIONS; i++) {
    let totalWeight = 0;

    // Calculate total weight of adjacent edges
    currentVertex.adjacent.forEach((weight) => {
      totalWeight += weight;
    });

    // Build probability distribution for next step
    currentVertex.adjacent.forEach((weight, adjacentVertex) => {
      for (let x = 0; x < weight; x++) {
        probabilityDistribution.push(adjacentVertex);
      }
    });

    // Choose next vertex based on probability distribution
    let nextSentence =
      probabilityDistribution[
        Math.floor(Math.random() * probabilityDistribution.length)
      ];

    // Update weight of the chosen sentence
    for (let s = 0; s < sentencesWithKeyphrases.length; s++) {
      if (sentencesWithKeyphrases[s].text === nextSentence) {
        sentencesWithKeyphrases[s].weight += 1;
        break;
      }
    }

    // Periodically reset to a random vertex to avoid getting stuck in small clusters
    if (i % RESET_INTERVAL === 0) {
      nextSentence =
        allVertices[Math.floor(Math.random() * allVertices.length)];
    }

    currentVertex = graph.getVertex(nextSentence);
    probabilityDistribution = [];
  }

  return sentencesWithKeyphrases;
}
