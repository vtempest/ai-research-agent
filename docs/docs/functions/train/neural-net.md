[Documentation](../modules.md) / train/neural-net

## Neural Net

### torch

Defined in: train/neural-net.js:2224

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

#### Author

[PyTorch Contributors](https://github.com/pytorch/pytorch/graphs/contributors),
 [Leao, E. et al (2022)](https://eduardoleao052.github.io/js-pytorch/site/index.html),
See also: [Brain.js](https://github.com/BrainJS/brain.js)

#### Properties

##### \_reshape()

```ts
static _reshape: (a: any, shape: any) => any;
```

Defined in: train/neural-net.js:2242

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
static add: (a: any, b: any) => any;
```

Defined in: train/neural-net.js:2228

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
static at: (a: any, idx1: any, idx2: any) => any;
```

Defined in: train/neural-net.js:2240

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
static broadcast: (a: any, b: any) => Tensor;
```

Defined in: train/neural-net.js:2251

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
static div: (a: any, b: any) => any;
```

Defined in: train/neural-net.js:2231

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

##### exp()

```ts
static exp: (a: any) => any;
```

Defined in: train/neural-net.js:2233

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
static getShape: (data: any, shape: any[]) => any[];
```

Defined in: train/neural-net.js:2257

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
static load: (model: any, loadedData: any) => any;
```

Defined in: train/neural-net.js:2253

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
static log: (a: any) => any;
```

Defined in: train/neural-net.js:2234

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
static masked_fill: (a: any, mask: any, condition: any, value: any) => any;
```

Defined in: train/neural-net.js:2238

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
static matmul: (a: any, b: any) => any;
```

Defined in: train/neural-net.js:2232

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
static mean: (a: any, dim: number, keepdims: boolean) => any;
```

Defined in: train/neural-net.js:2237

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
static mul: (a: any, b: any) => any;
```

Defined in: train/neural-net.js:2230

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
static neg: (a: any) => any;
```

Defined in: train/neural-net.js:2229

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

Defined in: train/neural-net.js:2255

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Block`

</td>
<td>

*typeof* `Block`

</td>
<td>

train/neural-net.js:2075

</td>
</tr>
<tr>
<td>

`CrossEntropyLoss`

</td>
<td>

*typeof* `CrossEntropyLoss`

</td>
<td>

train/neural-net.js:2082

</td>
</tr>
<tr>
<td>

`Dropout`

</td>
<td>

*typeof* `Dropout`

</td>
<td>

train/neural-net.js:2080

</td>
</tr>
<tr>
<td>

`Embedding`

</td>
<td>

*typeof* `Embedding`

</td>
<td>

train/neural-net.js:2076

</td>
</tr>
<tr>
<td>

`FullyConnected`

</td>
<td>

*typeof* `FullyConnected`

</td>
<td>

train/neural-net.js:2074

</td>
</tr>
<tr>
<td>

`LayerNorm`

</td>
<td>

*typeof* `LayerNorm`

</td>
<td>

train/neural-net.js:2081

</td>
</tr>
<tr>
<td>

`Linear`

</td>
<td>

*typeof* `Linear`

</td>
<td>

train/neural-net.js:2072

</td>
</tr>
<tr>
<td>

`Module`

</td>
<td>

*typeof* `Module`

</td>
<td>

train/neural-net.js:2071

</td>
</tr>
<tr>
<td>

`MultiHeadSelfAttention`

</td>
<td>

*typeof* `MultiHeadSelfAttention`

</td>
<td>

train/neural-net.js:2073

</td>
</tr>
<tr>
<td>

`PositionalEmbedding`

</td>
<td>

*typeof* `PositionalEmbedding`

</td>
<td>

train/neural-net.js:2077

</td>
</tr>
<tr>
<td>

`ReLU`

</td>
<td>

*typeof* `ReLU`

</td>
<td>

train/neural-net.js:2078

</td>
</tr>
<tr>
<td>

`Softmax`

</td>
<td>

*typeof* `Softmax`

</td>
<td>

train/neural-net.js:2079

</td>
</tr>
</tbody>
</table>

##### ones()

```ts
static ones: (shape: any, requires_grad: boolean, device: string) => Tensor;
```

Defined in: train/neural-net.js:2249

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

Defined in: train/neural-net.js:2256

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Adam`

</td>
<td>

*typeof* `Adam`

</td>
<td>

train/neural-net.js:2084

</td>
</tr>
</tbody>
</table>

##### Parameter

```ts
static Parameter: typeof Parameter;
```

Defined in: train/neural-net.js:2227

##### pow()

```ts
static pow: (a: any, n: any) => any;
```

Defined in: train/neural-net.js:2236

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

`any`

##### rand()

```ts
static rand: (shape: any, requires_grad: boolean, device: string) => Tensor;
```

Defined in: train/neural-net.js:2247

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
static randint: (low: number, high: number, shape: number[], requires_grad: boolean) => Tensor;
```

Defined in: train/neural-net.js:2245

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
static randn: (shape: any, requires_grad: boolean, device: string, xavier: boolean) => Tensor;
```

Defined in: train/neural-net.js:2246

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
static reshape: (a: any, shape: any) => any;
```

Defined in: train/neural-net.js:2241

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
static save: (model: any, file: any) => string;
```

Defined in: train/neural-net.js:2252

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
static sqrt: (a: any) => any;
```

Defined in: train/neural-net.js:2235

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
static tensor: (data: any, requires_grad: boolean, device: string) => Tensor;
```

Defined in: train/neural-net.js:2244

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

Defined in: train/neural-net.js:2226

##### transpose()

```ts
static transpose: (a: any, dim1: any, dim2: any) => any;
```

Defined in: train/neural-net.js:2243

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
static tril: (shape: any, requires_grad: boolean, device: string) => Tensor;
```

Defined in: train/neural-net.js:2248

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
static variance: (a: any, dim: number, keepdims: boolean) => any;
```

Defined in: train/neural-net.js:2239

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
static zeros: (shape: any, requires_grad: boolean, device: string) => Tensor;
```

Defined in: train/neural-net.js:2250

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
