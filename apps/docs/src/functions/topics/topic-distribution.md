[Documentation](../modules.md) / topics/topic-distribution

## Topics

### extractTopicTermGroupsLDA()

```ts
function extractTopicTermGroupsLDA(sentences: string[], options?: object): any[];
```

Defined in: [packages/ai-research-agent/src/topics/topic-distribution.js:31](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/topic-distribution.js#L31)

Latent Dirichlet (pronounced Dee-ruesh-ley) allocation  is used
in natural language processing to discover abstract topics in a
collection of documents. It is a generative probabilistic model
that assumes documents are mixtures of topics, where a topic
is a probability distribution over words. LDA uses Bayesian
inference to simultaneously learn the topics and topic mixtures
that occur around each other in an unsupervised manner. <br />

[Latent Dirichlet Allocation (LDA) with Gibbs Sampling 
 Explained](https://www.youtube.com/watch?v=aPRjj8i_6yE)<br />
[Latent Dirichlet Allocation](https://www.geeksforgeeks.org/latent-dirichlet-allocation/) <br />
[Topic Models (Youtube)](https://www.youtube.com/watch?v=yK7nN3FcgUs) <br />

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

`sentences`

</td>
<td>

`string`[]

</td>
<td>

Array of input sentences.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `alpha`: `number`; `beta`: `number`; `numberOfIterations`: `number`; `numberOfTermsPerTopic`: `number`; `topicCount`: `number`; `valueBurnIn`: `number`; `valueSampleLag`: `number`; \}

</td>
<td>

Configuration options for LDA.

</td>
</tr>
<tr>
<td>

`options.alpha?`

</td>
<td>

`number`

</td>
<td>

default=0.1 - Dirichlet prior on document-topic distributions.

</td>
</tr>
<tr>
<td>

`options.beta?`

</td>
<td>

`number`

</td>
<td>

default=0.01 - Dirichlet prior on topic-word distributions.

</td>
</tr>
<tr>
<td>

`options.numberOfIterations?`

</td>
<td>

`number`

</td>
<td>

default=1000 - Number of iterations for the LDA algorithm.

</td>
</tr>
<tr>
<td>

`options.numberOfTermsPerTopic?`

</td>
<td>

`number`

</td>
<td>

default=10 - Number of terms to show for each topic.

</td>
</tr>
<tr>
<td>

`options.topicCount?`

</td>
<td>

`number`

</td>
<td>

default=10 - Number of topics to extract.

</td>
</tr>
<tr>
<td>

`options.valueBurnIn?`

</td>
<td>

`number`

</td>
<td>

default=100 - Number of burn-in iterations.

</td>
</tr>
<tr>
<td>

`options.valueSampleLag?`

</td>
<td>

`number`

</td>
<td>

default=10 - Lag between samples.

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[]

- Array of topics, each containing term-probability pairs.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
