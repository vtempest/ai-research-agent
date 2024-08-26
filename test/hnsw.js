import { HierarchicalNSW } from 'hnswlib-node';

const numDimensions = 8; // the length of data point vector that will be indexed.
const maxElements = 10; // the maximum number of data points.

// declaring and intializing index.
const index = new HierarchicalNSW('l2', numDimensions);
index.initIndex(maxElements);

// inserting data points to index.
for (let i = 0; i < maxElements; i++) {
  const point = new Array(numDimensions);
  for (let j = 0; j < numDimensions; j++) point[j] = Math.random();
  index.addPoint(point, i);
}

// saving index.
index.writeIndexSync('foo.dat');





// loading index.
// const index = new HierarchicalNSW('l2', 3);
index.readIndexSync('foo.dat');

// preparing query data points.
// const numDimensions = 8;
const query = new Array(numDimensions);
for (let j = 0; j < numDimensions; j++) query[j] = Math.random();

// searching k-nearest neighbor data points.
const numNeighbors = 3;
const result = index.searchKnn(query, numNeighbors);

console.log(result);