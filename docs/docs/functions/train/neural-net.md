[ai-research-agent](../index.md) / train/neural-net

## Neural Net

### torch

### TORCH: Tensor Operations with the Reasoning Capacity of Humans 
<img src="https://i.imgur.com/vKBjkfd.png" width="360px" />

Torch is a powerful library for tensor computations and deep learning, offering 
a comprehensive set of tools for creating and manipulating multidimensional arrays.
 It provides a wide range of mathematical operations, and it includes a neural network module (torch.nn) that facilitates
 the construction of complex neural architectures through a modular approach, with
 various layer types and activation functions readily available. Torch also 
implements automatic differentiation, enabling efficient gradient computation for 
training neural networks, and offers optimization algorithms like Adam for parameter
 updates. Additionally, it includes utilities for saving and loading models, making 
it a versatile and complete framework for developing and deploying machine learning 
solutions.

 
1. Torch is a neural net matrix multiplication library that 
uses [PyTorch API syntax](https://pytorch.org/docs/stable/index.html) 
for tensors and neural nets. 
2. Uses [GPU.js](https://github.com/gpujs/gpu.js) acceleration
to translate matmul into WebGL shader code. GPU.js does matmul [faster 
than PyTorch](https://github.com/raphaelrk/matrix-mul-test). 
3. Neural Net API: MultiHeadSelfAttention, FullyConnected, Block, 
Embedding, PositionalEmbedding, ReLU, Softmax, Dropout, 
LayerNorm, CrossEntropyLoss.
4. Other Neural Nets: For LSTMs and CNNs, use
[Tensorflow.js](https://github.com/tensorflow/tfjs?tab=readme-ov-file) 
or [Brain.js](https://github.com/BrainJS/brain.js)

<pre>
1. Tensor Creation:
  - `tensor()`: Creates a new Tensor filled with given data
  - `zeros()`: Creates a new Tensor filled with zeros
  - `ones()`: Creates a new Tensor filled with ones
  - `randn()`: Creates a new Tensor filled with random values from a normal distribution
  - `rand()`: Creates a new Tensor filled with random values from a uniform distribution

2. Tensor Properties and Methods:
  - `backward()`: Performs backpropagation from this tensor backwards
  - `zero_grad()`: Clears the gradients stored in this tensor
  - `tolist()`: Returns the tensor's data as a JavaScript Array
  - Properties: `data`, `length`, `ndims`, `grad`

3. Basic Arithmetic Operations:
  - `add()`, `sub()`, `mul()`, `div()`: Element-wise arithmetic operations
  - `matmul()`: Matrix multiplication between two tensors
  - `pow()`: Element-wise power operation

4. Statistical Operations:
  - `sum()`: Gets the sum of the Tensor over a specified dimension
  - `mean()`: Gets the mean of the Tensor over a specified dimension
  - `variance()`: Gets the variance of the Tensor over a specified dimension

5. Tensor Manipulation:
  - `transpose()`: Transposes the tensor along two consecutive dimensions
  - `at()`: Returns elements from the tensor based on given indices
  - `masked_fill()`: Fills elements in the tensor based on a condition

6. Mathematical Functions:
  - `sqrt()`: Element-wise square root
  - `exp()`: Element-wise exponentiation
  - `log()`: Element-wise natural logarithm

7. Neural Network Layers (torch.nn):
  - `Linear()`: Applies a linear transformation
  - `MultiHeadSelfAttention()`: Applies a self-attention layer
  - `Embedding()`: Creates an embedding table for vocabulary
  - Activation functions: `ReLU()`, `Softmax()`

8. Optimization and Loss:
  - `optim.Adam()`: Adam optimizer for updating model parameters
  - `nn.CrossEntropyLoss()`: Computes Cross Entropy Loss

</pre>

 torch

#### Function

tensor(data, requires_grad = false, device = 'cpu') Creates a new Tensor filled with the given data

#### Function

zeros(*shape, requires_grad = false, device = 'cpu') Creates a new Tensor filled with zeros

#### Function

ones(*shape, requires_grad = false, device = 'cpu') Creates a new Tensor filled with ones

#### Function

tril(*shape, requires_grad = false, device = 'cpu') Creates a new 2D lower triangular Tensor

#### Function

randn(*shape, requires_grad = false, device = 'cpu', xavier = false) Creates a new Tensor filled with random values from a normal distribution

#### Function

rand(*shape, requires_grad = false, device = 'cpu') Creates a new Tensor filled with random values from a uniform distribution

#### Function

randint(low, high, *shape, requires_grad = false, device = 'cpu') Creates a new Tensor filled with random integers
Tensor Methods:

#### Method

tensor.backward() Performs backpropagation from this tensor backwards

#### Method

tensor.zero_grad() Clears the gradients stored in this tensor

#### Method

tensor.zero_grad_graph() Clears the gradients stored in this tensor and all tensors that led to it

#### Method

tensor.tolist() Returns the tensor's data as a JavaScript Array

#### Function

add(a, b) Performs element-wise addition of two tensors

#### Function

sub(a, b) Performs element-wise subtraction of two tensors

#### Function

neg(a) Returns the element-wise opposite of the given Tensor

#### Function

mul(a, b) Performs element-wise multiplication of two tensors

#### Function

div(a, b) Performs element-wise division of two tensors

#### Function

matmul(a, b) Performs matrix multiplication between two tensors

#### Function

sum(a, dim, keepdims = false) Gets the sum of the Tensor over a specified dimension

#### Function

mean(a, dim, keepdims = false) Gets the mean of the Tensor over a specified dimension

#### Function

variance(a, dim, keepdims = false) Gets the variance of the Tensor over a specified dimension

#### Function

transpose(a, dim1, dim2) Transposes the tensor along two consecutive dimensions

#### Function

at(a, index1, index2) Returns elements from the tensor based on given indices

#### Function

masked_fill(a, condition, value) Fills elements in the tensor based on a condition

#### Function

pow(a, n) Returns tensor raised to element-wise power

#### Function

sqrt(a) Returns element-wise square root of the tensor

#### Function

exp(a) Returns element-wise exponentiation of the tensor

#### Function

log(a) Returns element-wise natural log of the tensor

 torch.nn
Neural Network Layers:

#### Method

nn.Linear(in_size, out_size, device, bias, xavier) Applies a linear transformation to the input tensor

#### Method

nn.MultiHeadSelfAttention(in_size, out_size, n_heads, n_timesteps, dropout_prob, device) Applies a self-attention layer on the input tensor

#### Function

nn.FullyConnected(in_size, out_size, dropout_prob, device, bias) Applies a fully-connected layer on the input tensor

#### Function

nn.Block(in_size, out_size, n_heads, n_timesteps, dropout_prob, device) Applies a transformer Block layer on the input tensor

#### Function

nn.Embedding(in_size, embed_size) Creates an embedding table for vocabulary

#### Function

nn.PositionalEmbedding(input_size, embed_size) Creates a positional embedding table

#### Function

nn.ReLU() Applies Rectified Linear Unit activation function

#### Function

nn.Softmax() Applies Softmax activation function

#### Function

nn.Dropout(drop_prob) Applies dropout to input tensor

#### Function

nn.LayerNorm(n_embed) Applies Layer Normalization to input tensor

#### Function

nn.CrossEntropyLoss() Computes Cross Entropy Loss between target and input tensor

Optimization:
 optim.Adam(params, lr, reg, betas, eps) Adam optimizer for updating model parameters

Utility Functions:

#### Function

save(model, file) Saves the model reruning data blob (for you to save)

#### Function

load(model, loadedData) Loads the model from saved data

#### Author

[PyTorch Contributors](https://github.com/pytorch/pytorch/graphs/contributors),
 [Leao, E. et al (2022)](https://eduardoleao052.github.io/js-pytorch/site/index.html),
See also: [Brain.js](https://github.com/BrainJS/brain.js)

#### Properties

##### \_reshape()

```ts
static _reshape: (a, shape) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### add()

```ts
static add: (a, b) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### at()

```ts
static at: (a, idx1, idx2) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`idx1`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`idx2`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### broadcast()

```ts
static broadcast: (a, b) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### div()

```ts
static div: (a, b) => object;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

##### exp()

```ts
static exp: (a) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### getShape()

```ts
static getShape: (data, shape) => any[];
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`data`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`any`[]

</td>
<td>

`[]`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`[]

##### load()

```ts
static load: (model, loadedData) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`model`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`loadedData`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### log()

```ts
static log: (a) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### masked\_fill()

```ts
static masked_fill: (a, mask, condition, value) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`mask`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`condition`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### matmul()

```ts
static matmul: (a, b) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### mean()

```ts
static mean: (a, dim, keepdims) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`dim`

</td>
<td>

`number`

</td>
<td>

`-1`

</td>
</tr>
<tr>
<td>

`keepdims`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### mul()

```ts
static mul: (a, b) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### neg()

```ts
static neg: (a) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### nn

```ts
static nn: object;
```

###### Block

```ts
Block: typeof Block;
```

###### CrossEntropyLoss

```ts
CrossEntropyLoss: typeof CrossEntropyLoss;
```

###### Dropout

```ts
Dropout: typeof Dropout;
```

###### Embedding

```ts
Embedding: typeof Embedding;
```

###### FullyConnected

```ts
FullyConnected: typeof FullyConnected;
```

###### LayerNorm

```ts
LayerNorm: typeof LayerNorm;
```

###### Linear

```ts
Linear: typeof Linear;
```

###### Module

```ts
Module: typeof Module;
```

###### MultiHeadSelfAttention

```ts
MultiHeadSelfAttention: typeof MultiHeadSelfAttention;
```

###### PositionalEmbedding

```ts
PositionalEmbedding: typeof PositionalEmbedding;
```

###### ReLU

```ts
ReLU: typeof ReLU;
```

###### Softmax

```ts
Softmax: typeof Softmax;
```

##### ones()

```ts
static ones: (shape, requires_grad, device) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### optim

```ts
static optim: object;
```

###### Adam

```ts
Adam: typeof Adam;
```

##### Parameter

```ts
static Parameter: typeof Parameter;
```

##### pow()

```ts
static pow: (a, n) => object;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`n`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

##### rand()

```ts
static rand: (shape, requires_grad, device) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### randint()

```ts
static randint: (low, high, shape, requires_grad) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`low`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
</tr>
<tr>
<td>

`high`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`number`[]

</td>
<td>

`...`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### randn()

```ts
static randn: (shape, requires_grad, device, xavier) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
<tr>
<td>

`xavier`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### reshape()

```ts
static reshape: (a, shape) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### save()

```ts
static save: (model, file) => string;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`model`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`file`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### sqrt()

```ts
static sqrt: (a) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### tensor()

```ts
static tensor: (data, requires_grad, device) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`data`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### Tensor

```ts
static Tensor: typeof Tensor;
```

##### transpose()

```ts
static transpose: (a, dim1, dim2) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`dim1`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`dim2`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### tril()

```ts
static tril: (shape, requires_grad, device) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`

##### variance()

```ts
static variance: (a, dim, keepdims) => any;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`a`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`dim`

</td>
<td>

`number`

</td>
<td>

`-1`

</td>
</tr>
<tr>
<td>

`keepdims`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### zeros()

```ts
static zeros: (shape, requires_grad, device) => Tensor;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`shape`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`requires_grad`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

`device`

</td>
<td>

`string`

</td>
<td>

`"cpu"`

</td>
</tr>
</tbody>
</table>

###### Returns

`Tensor`