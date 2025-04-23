[Documentation](../modules.md) / similarity/embeddings-to-graph

## Similarity

### convertEmbeddingsToUMAP()

```ts
function convertEmbeddingsToUMAP(embeddingsDict: object, options?: object): Promise<PlotDataPoint[]>;
```

Defined in: similarity/embeddings-to-graph.js:50

### UMAP: Convert Embeddings to 2D or 3D Graph

UMAP (Uniform Manifold Approximation and Projection) is a dimensionality reduction technique that 
takes high-dimensional embeddings and converts into lower-dimensional coordinates for visualization. 

1. **Input**: The process starts with high-dimensional embeddings. These could be word embeddings, 
   image feature vectors, or any other type of high-dimensional data representation.

2. **Dimensionality reduction**: UMAP algorithmically reduces the number of dimensions while trying 
   to preserve the structure of the data. It typically reduces the data to 2 or 3 dimensions for 
   easy visualization.

3. **Topological approach**: UMAP uses concepts from topological data analysis and manifold 
   learning to perform this reduction. It constructs a high-dimensional graph representation and 
   then optimizes a low-dimensional layout to be as similar as possible.

4. **Output**: The result is a set of 2D or 3D coordinates for each input embedding. These can be 
   plotted on a scatter plot, where each point represents an original high-dimensional datapoint.

5. **Preservation of structure**: UMAP aims to keep similar items close together and dissimilar 
   items far apart in the lower-dimensional space, preserving both local and global structure of 
   the data.

6. **Visualization**: The resulting UMAP coordinates can reveal clusters, patterns, and 
   relationships in the data that were not easily visible in the original high-dimensional space.

[Understanding UMAP](https://pair-code.github.io/understanding-umap/) 

[UMAP Algorithm Overview](https://www.youtube.com/watch?v=VPq4Ktf2zJ4) 

<img src="https://i.imgur.com/7H7DbnU.png" />
<img src="https://i.imgur.com/Wzat3qY.png" width="1000px" />
<img src="https://i.imgur.com/dlSgqi9.gif" width="1000px" alt="UMAP Arxiv pdfs search" />

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`embeddingsDict`

</td>
<td>

\{ \}

</td>
<td>

The dictionary of embeddings.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `numberDimensions`: `number`; `numberDistance`: `number`; `numberNeighbors`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.numberDimensions?`

</td>
<td>

`number`

</td>
<td>

[default=2] - The number of dimensions for UMAP output.

</td>
</tr>
<tr>
<td>

`options.numberDistance?`

</td>
<td>

`number`

</td>
<td>

[default=0.1] - The minimum distance parameter for UMAP.

</td>
</tr>
<tr>
<td>

`options.numberNeighbors?`

</td>
<td>

`number`

</td>
<td>

[default=15] - The number of nearest neighbors for UMAP.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`PlotDataPoint`[]&gt;

An array of plot data points.

#### Author

[McInnes et al. (2018)](https://arxiv.org/abs/1802.03426) <br />
[Coenen et al. (2019)](https://pair-code.github.io/understanding-umap/)
