import { UMAP } from "umap-js/lib/umap-js.js";


/**
 * ### UMAP: Convert Embeddings to 2D or 3D Graph
 * 
 * UMAP (Uniform Manifold Approximation and Projection) is a dimensionality reduction technique that 
 * takes high-dimensional embeddings and converts into lower-dimensional coordinates for visualization. 
 * 
 * 1. **Input**: The process starts with high-dimensional embeddings. These could be word embeddings, 
 *    image feature vectors, or any other type of high-dimensional data representation.
 * 
 * 2. **Dimensionality reduction**: UMAP algorithmically reduces the number of dimensions while trying 
 *    to preserve the structure of the data. It typically reduces the data to 2 or 3 dimensions for 
 *    easy visualization.
 * 
 * 3. **Topological approach**: UMAP uses concepts from topological data analysis and manifold 
 *    learning to perform this reduction. It constructs a high-dimensional graph representation and 
 *    then optimizes a low-dimensional layout to be as similar as possible.
 * 
 * 4. **Output**: The result is a set of 2D or 3D coordinates for each input embedding. These can be 
 *    plotted on a scatter plot, where each point represents an original high-dimensional datapoint.
 * 
 * 5. **Preservation of structure**: UMAP aims to keep similar items close together and dissimilar 
 *    items far apart in the lower-dimensional space, preserving both local and global structure of 
 *    the data.
 * 
 * 6. **Visualization**: The resulting UMAP coordinates can reveal clusters, patterns, and 
 *    relationships in the data that were not easily visible in the original high-dimensional space.
 * 
 * [Understanding UMAP](https://pair-code.github.io/understanding-umap/) <br>
 * [UMAP Algorithm Overview](https://www.youtube.com/watch?v=VPq4Ktf2zJ4) <br>
 * <img src="https://i.imgur.com/JEO6fE1.png" width="350px">
 * <img src="https://i.imgur.com/Wzat3qY.png" width="1000px">
 * 
 * @param {Object.<string, number[]>} embeddingsDict - The dictionary of embeddings.
 * @param {Object} [options]
 * @param {number} options.numberDimensions [default=2] - The number of dimensions for UMAP output.
 * @param {number} options.numberNeighbors [default=15] - The number of nearest neighbors for UMAP.
 * @param {number} options.numberDistance [default=0.1] - The minimum distance parameter for UMAP.
 * @returns {Promise<PlotDataPoint[]>} An array of plot data points.
 * @author [McInnes et al. (2018)](https://arxiv.org/abs/1802.03426) <br />
 * [Coenen et al. (2019)](https://pair-code.github.io/understanding-umap/)
 * @category Similarity
*/
export async function convertEmbeddingsToUMAP(embeddingsDict, options = {}) {
  const {
    numberDimensions = 2,
    numberNeighbors = 15,
    numberDistance = 0.1,
  } = options;

  const valuesArray = Object.values(embeddingsDict);

  const compressed_vectors = await new UMAP({
    nComponents: numberDimensions,
    nNeighbors: numberNeighbors,
    minDist: numberDistance,
  }).fitAsync(valuesArray);

  const originalKeys = Object.keys(embeddingsDict);

  let plotDataArray = [];
  for (let i = 0; i < originalKeys.length; i++) {
    let thisVec = compressed_vectors[i];

    plotDataArray.push({
      x: thisVec[0],
      y: thisVec[1],
      label: originalKeys[i],
    });
  }

  return plotDataArray;
}


/**
 * @typedef {Object} PlotDataPoint
 * @property {number} x - The x-coordinate in the UMAP plot.
 * @property {number} y - The y-coordinate in the UMAP plot.
 * @property {string} label - The label associated with this data point.
 */