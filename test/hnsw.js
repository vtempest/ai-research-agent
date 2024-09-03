import { HierarchicalNSW } from "hnswlib-node";
import { vectorizeTextAsConcept} from "../index.js";

const documents = [
  "The quick brown fox jumps over the lazy dog",
  "Lorem ipsum dolor sit amet",
  "foxes are red",
  "foxes are not blue",
  "foxes like to hunt their prey",
];
const query = "What does the fox eat?";

var documentVectors = [];
for (var doc of documents)
  documentVectors.push((await vectorizeTextAsConcept(doc))[0]);

// console.log(documentVectors);

const numDimensions = 384; // the length of data point vector that will be indexed.
const maxElements = 100; // the maximum number of data points.


// declaring and intializing index.
const index = new HierarchicalNSW("l2", numDimensions);
index.initIndex(maxElements, 16, 200, 100);

// inserting data points to index.
for (let i = 0; i < documentVectors.length; i++) {
  index.addPoint(documentVectors[i], i);
}

// saving index.
// index.writeIndexSync("vectors.dat");

// index.readIndexSync("vectors.dat");

// preparing query data points.
// const numDimensions = 8;
var queryVector = (await vectorizeTextAsConcept(query))[0];

// searching k-nearest neighbor data points.
const numNeighbors = 5;
const result = index.searchKnn(queryVector, numNeighbors);

console.log(result);
