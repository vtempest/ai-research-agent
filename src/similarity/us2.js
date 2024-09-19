const assert = require('node:assert');
const usearch = require('usearch');
const index = new usearch.Index({ metric: 'l2sq', connectivity: 16, dimensions: 3 });
index.add(42n, new Float32Array([0.2, 0.6, 0.4]));
const dimensions = index.dimensions(); // Get the number of dimensions

console.log(dimensions)
const results = index.search(new Float32Array([0.2, 0.6, 0.4]), 1);

assert(index.size() === 1);
assert.deepEqual(results.keys, new BigUint64Array([42n]));
assert.deepEqual(results.distances, new Float32Array([0]));

index.remove(42n);