/**
 *  TextRank algorithm weights each sentence based on number 
 *  of key phrases it has in common with other sentences.
 *  Takes an array of objects for each sentence's keyphrases. 
 *  Makes a weighted graph with edges that connect sentences 
 *  to matching keyphrases. Randomly surfs millions of times 
 *  and counts walks to each node to distribute probability of
 *  being at that node.
 *  
 * Hongyang Zhao and Qiang Xie 2021 J. Phys.: Conf. Ser. 2078 012021
 * "An Improved TextRank Multi-feature Fusion Algorithm For
 * Keyword Extraction of Educational Resources"
 * https://iopscience.iop.org/article/10.1088/1742-6596/2078/1/012021/pdf
 *
 * Pan, S. et al (2019). "An improved TextRank keywords extraction algorithm" 
 * https://dl.acm.org/doi/10.1145/3321408.3326659 https://doi.org/10.1145/3321408.3326659
 * 
 *  @param {Array<Object>} arraySentenceKeyphrases [{text, keyphrases}]
 *  @returns {Array<Object>} [{text, keyphrases, weight}] adds weights to array
 */
export default function TextRank(arraySentenceKeyphrases) {
  let graph = new WeightedGraph();

  arraySentenceKeyphrases = arraySentenceKeyphrases.map((value) => {
    value.weight = 0;
    return value;
  });

  for (let i = 0; i < arraySentenceKeyphrases.length; i++) {
    for (let j = i + 1; j < arraySentenceKeyphrases.length; j++) {
      var list1 = arraySentenceKeyphrases[i].keyphrases;
      var list2 = arraySentenceKeyphrases[j].keyphrases;
      let weight = 0;
      let intial = list1;
      let other = list2;
      if (list2.length >= list1.length) {
        intial = list2;
        other = list1;
      }
      other = other.map(v=>v.keyphrase);

      for (let i = 0; i < intial.length; i++) {
        if (other.includes(intial[i].keyphrase)) {
          weight += intial[i].weight/100;
        }
      }
      if (weight > 0) {
        graph.addEdge(arraySentenceKeyphrases[i].text, arraySentenceKeyphrases[j].text, weight);
      }
    }
  }

  let graphkey_list = graph.getAllVertices();

  if (graphkey_list.length == 0) {
    return ;//error
  }
  let key = graphkey_list[Math.floor(Math.random() * graphkey_list.length)];
  let vertex = graph.getVertex(key);
  let probability_list = [];
  for (let i = 0; i < 10000; i++) {
    let full_weight = 0;

    vertex.adjacent.forEach((value, key, map) => {
      full_weight += value;
    });

    vertex.adjacent.forEach((value, key, map) => {
      for (let x = 0; x < value; x++) {
        probability_list.push(key);
      }
    });

    let sentence =
      probability_list[Math.floor(Math.random() * probability_list.length)];

    for (var s = 0; s < arraySentenceKeyphrases.length; s++)
      if (arraySentenceKeyphrases[s].text == sentence) 
        arraySentenceKeyphrases[s].weight += 1;

    vertex = graph.getVertex(sentence);
    probability_list = [];
  }
  return arraySentenceKeyphrases;
}

class WeightedGraph {
  constructor() {
    this.vertices_map = new Map();
    this.size = 0;
  }

  addVertex(value) {
    this.size += 1;
    let vertex_to_add = new Vertex(value);
    this.vertices_map.set(value, vertex_to_add);
    return vertex_to_add;
  }

  getVertex(value) {
    if (this.vertices_map.has(value)) {
      return this.vertices_map.get(value);
    }
    return;
  }

  addEdge(a, b, weight) {
    if (!this.vertices_map.has(a)) {
      this.addVertex(a);
    }
    if (!this.vertices_map.has(b)) {
      this.addVertex(b);
    }
    this.vertices_map.get(a).adjacent.set(b, weight);
    this.vertices_map.get(b).adjacent.set(a, weight);
  }

  getAllVertices() {
    let result_list = [];
    this.vertices_map.forEach((value, key, map) => {
      result_list.push(key);
    });
    return result_list;
  }
}

class Vertex {
  constructor(value) {
    this.value = value;
    this.adjacent = new Map();
  }
}