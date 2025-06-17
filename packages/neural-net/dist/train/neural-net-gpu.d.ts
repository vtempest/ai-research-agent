export namespace torch {
    export { Tensor };
    export { Parameter };
    export { add };
    export { neg };
    export { mul };
    export { div };
    export { matmul };
    export { exp };
    export { log };
    export { sqrt };
    export { pow };
    export { mean };
    export { masked_fill };
    export { variance };
    export { at };
    export { reshape };
    export { _reshape };
    export { transpose };
    export { tensor };
    export { randint };
    export { randn };
    export { rand };
    export { tril };
    export { ones };
    export { zeros };
    export { broadcast };
    export { save };
    export { load };
    export { nn };
    export { optim };
    export { getShape };
}
declare class Tensor {
    /**
     * Creates new instance of the Tensor class.
     * @param {object} data - Iterable containing the data to be stored in the Tensor.
     * @param {boolean} requires_grad - Whether to keep track of this tensor's gradients.
     * @param {string} device - Device to store Tensor. Either "gpu" or "cpu".
     */
    constructor(data: object, requires_grad?: boolean, device?: string);
    requires_grad: boolean;
    _data: object;
    shape: any[];
    _grad: any;
    children: any[];
    parents: any[];
    operation: any;
    visited: boolean;
    m: any;
    v: any;
    device: string;
    forwardKernel: any;
    backwardKernelA: any;
    backwardKernelB: any;
    batch_size: any;
    gpu: any;
    warned: boolean;
    /**
     * Returns the data in the Tensor.
     */
    get data(): object;
    /**
     * Returns the data's length'.
     */
    get length(): any;
    /**
     * Returns the number of dimensions in the Tensor.
     */
    get ndims(): number;
    /**
     * Returns the tensor's gradients.
     */
    get grad(): any;
    /**
     * Performs backward pass from THIS tensor backwards.
     * It fills every tensor that originated this one and that has requires_grad=true's gradients to their gradients relative to THIS tensor.
     */
    backward(grad?: null, child?: null): void;
    /**
     * Sends this Tensor to the provided device.
     * @param {string} device - Device to store Tensor. Either "gpu" or "cpu".
     * @param {boolean} requires_grad - Whether to keep track of this tensor's gradients.
     * @param {string} device - gpu or cpu: device to store Tensor.
     */
    to(device: string): void;
    /**
     * Reset this Tensor's gradients to zero.
     */
    zero_grad(): void;
    /**
     * Reset the gradients of this Tensor, and of all of the Tensors that led to it.
     */
    zero_grad_graph(): void;
    /**
     * Turns the data in the Tensor into a javascript list object.
     */
    tolist(): object;
    /**
     * Gets the sum of the Tensor over a specified dimension.
     * @param {number} dim - Dimension to sum over.
     * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
     * @returns {Tensor} - Final tensor.
     */
    sum(dim?: number, keepdims?: boolean): Tensor;
    /**
     * Gets the mean of the Tensor over a specified dimension.
     * @param {number} dim - Dimension to get mean over.
     * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
     * @returns {Tensor} - Final tensor.
     */
    mean(dim?: number, keepdims?: boolean): Tensor;
    /**
     * Gets the variance of the Tensor over a specified dimension.
     * @param {number} dim - Dimension to get variance over.
     * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
     * @returns {Tensor} - Final tensor.
     */
    variance(dim?: number, keepdims?: boolean): Tensor;
    /**
     * Add integer or other Tensor to this Tensor.
     * @param {any} other - Tensor or integer to be added to this Tensor.
     * @returns {object} New tensor.
     */
    add(other: any): object;
    /**
     * Subtract integer or other Tensor from this Tensor.
     * @param {any} other - Tensor or integer to be subtracted from this Tensor.
     * @returns {object} New tensor.
     */
    sub(other: any): object;
    /**
     * Get element-wise opposite of given tensor ( every element * (-1) )
     * @returns {object} New tensor.
     */
    neg(): object;
    /**
     * Multiply this Tensor by integer or other Tensor.
     * @param {any} other - Tensor or integer to multiply this Tensor by.
     * @returns {object} New tensor.
     */
    mul(other: any): object;
    /**
     * Divide this Tensor by integer or other Tensor.
     * @param {Tensor | number} other - Tensor or integer to divide this Tensor by.
     * @returns {Tensor} New tensor.
     */
    div(other: Tensor | number): Tensor;
    /**
     * Multiply this Tensor by integer or other Tensor.
     * @param {Tensor | number} other - Tensor or integer to multiply this Tensor by.
     * @returns {Tensor} New tensor.
     */
    matmul(other: Tensor | number): Tensor;
    /**
     * Get tensor to element-wise power of n.
     * @param {number} n - Exponent.
     * @returns {object} New tensor.
     */
    pow(n: number): object;
    /**
     * Get element-wise square root of given tensor.
     * @returns {object} New tensor.
     */
    sqrt(): object;
    /**
     * Get element-wise exponentiation of given tensor ( e^(every element) )
     * @returns {object} New tensor.
     */
    exp(): object;
    /**
     * Get element-wise natural log of given tensor ( ln(every element) )
     * @returns {object} New tensor.
     */
    log(): object;
    /**
     * Transpose the tensor along two consecutive dimensions:
     * @param {number} dim1 - First dimension.
     * @param {number} dim2 - Second dimension.
     * @returns {object} New tensor.
     */
    transpose(dim1: number, dim2: number): object;
    /**
     * In a tensor, returns a list of elements in [index1], or [index1][index2];
     * @param {object} index1 - List containing indexes to extract data from in first dimension.
     * @param {object} index2 - List containing indexes to extract data from in second dimension [OPTIONAL].
     * @returns {object} New tensor.
     * @example
     * let a = tensor([[1,1,2,3],
     *                 [6,7,8,9]])
     *
     * // Returns tensor([2,6,9]):
     * a.at([0,1,1], [2,0,3])
     *
     * // Returns tensor([[1,1,2,3],
     *                    [6,7,8,9],
     *                    [1,1,2,3]])
     * a.at([0,1,0])
     */
    at(index1: object, index2: object): object;
    /**
     * Where the "condition" function returns True in "mask" Tensor, the "value" will fill the "this" Tensor.
     * @param {Tensor} mask - "condition" will be applied in this tensor element-wise.
     * @param {function} condition - Function that returns True or False element-wise.
     * @param {number} value - Value to fill Tensor when condition is met.
     * @returns {object} New tensor.
     * @example
     * let a = tensor([[1,5,2,3],
     *                 [6,7,2,9]])
     *
     * // Returns tensor([[1,0,2,3],
     * //                 [0,0,2,0]])
     * a.masked_fill(mask, (el) => {return el > 3}, 0)
     */
    masked_fill(mask: Tensor, condition: Function, value: number): object;
    /**
     * Reshape the tensor into the new shape:
     * @param {object} shape - New tensor's shape.
     * @returns {object} New tensor.
     */
    reshape(shape: object): object;
}
declare class Parameter extends Tensor {
    /**
     * Creates new Parameter (an instance of the Tensor class that always tracks gradients).
     * @param {object} data - Iterable containing the data to be stored in the Tensor.
     */
    constructor(data: object);
}
declare function add(a: any, b: any): any;
declare function neg(a: any): any;
declare function mul(a: any, b: any): any;
declare function div(a: any, b: any): object;
declare function matmul(a: any, b: any): any;
declare function exp(a: any): any;
declare function log(a: any): any;
declare function sqrt(a: any): any;
declare function pow(a: any, n: any): object;
declare function mean(a: any, dim?: number, keepdims?: boolean): any;
declare function masked_fill(a: any, mask: any, condition: any, value: any): any;
declare function variance(a: any, dim?: number, keepdims?: boolean): any;
declare function at(a: any, idx1: any, idx2: any): any;
declare function reshape(a: any, shape: any): any;
declare function _reshape(a: any, shape: any): any;
declare function transpose(a: any, dim1: any, dim2: any): any;
declare function tensor(data: any, requires_grad?: boolean, device?: string): Tensor;
declare function randint(low?: number, high?: number, shape?: number[], requires_grad?: boolean): Tensor;
declare function randn(shape: any, requires_grad?: boolean, device?: string, xavier?: boolean): Tensor;
declare function rand(shape: any, requires_grad?: boolean, device?: string): Tensor;
declare function tril(shape: any, requires_grad?: boolean, device?: string): Tensor;
declare function ones(shape: any, requires_grad?: boolean, device?: string): Tensor;
declare function zeros(shape: any, requires_grad?: boolean, device?: string): Tensor;
declare function broadcast(a: any, b: any): Tensor;
declare function save(model: any, file: any): string;
declare function load(model: any, loadedData: any): any;
declare namespace nn {
    export { Module };
    export { Linear };
    export { MultiHeadSelfAttention };
    export { FullyConnected };
    export { Block };
    export { Embedding };
    export { PositionalEmbedding };
    export { ReLU };
    export { Softmax };
    export { Dropout };
    export { LayerNorm };
    export { CrossEntropyLoss };
}
declare namespace optim {
    export { Adam };
}
declare function getShape(data: any, shape?: any[]): any[];
declare class Module {
    mode: string;
    /**
     * Returns all model parameters in a list.
     * @returns {object} List with parameters in the model.
     */
    parameters(): object;
    /**
     * Sets module's mode to train, which influences layers like Dropout
     */
    train(): void;
    /**
     * Sets module's mode to eval, which influences layers like Dropout
     */
    eval(): void;
    /**
     * Returns an array of key/values of the enumerable properties of the Module
     * @returns {object} List with parameters in the model.
     */
    entries(): object;
}
declare class Linear extends Module {
    /**
     * Simple linear layer, with weight matrix and optional bias. Does not contain nonlinearity.
     *
     * @param {number} in_size - size of the last dimention of the input array.
     * @param {number} out_size - size of the last dimention of the output array.
     * @param {string} device - Device to perform Tensor operations. Either "gpu" or "cpu".
     * @param {boolean} bias - wether to include a bias term.
     * @param {boolean} xavier - Wether to use xavier initialization (divide by square root of first input dimension).
     */
    constructor(in_size: number, out_size: number, device?: string, bias?: boolean, xavier?: boolean);
    W: Tensor;
    b: Tensor;
    has_bias: boolean;
    /**
     * Performs forward pass through the Linear layer.
     * @param {Tensor} x - input Tensor.
     * @returns {Tensor} new Tensor. Out = (In @ W) + b.
     */
    forward(x: Tensor): Tensor;
}
declare class MultiHeadSelfAttention extends Module {
    /**
     * Full transformer Layer implementation.
     *
     *
   * [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
   *
   * [Transformers Explained Visually (Part
   * 3)](https://towardsdatascience.com/transformers-explained-visually-part-3-multi-head-attention-deep-dive-1c1ff1024853)
   *
     *
     * @param {number} in_size - size of the last dimention of the input array.
     * @param {number} out_size - size of the last dimention of the output array.
     * @param {number} n_heads - number of parallel heads to be computed (must equally divide in_size).
     * @param {number} n_timesteps - length of text sequence to be processed bt Transformer.
     * @param {number} dropout_prob - probability of zeroing each activation in dropout Layer.
     * @param {string} device - Device to perform Tensor operations. Either "gpu" or "cpu".
     */
    constructor(in_size: number, out_size: number, n_heads: number, n_timesteps: number, dropout_prob?: number, device?: string);
    Wk: Linear;
    Wq: Linear;
    Wv: Linear;
    residual_proj: Linear;
    mask: Tensor;
    att_dropout: Dropout;
    residual_dropout: Dropout;
    softmax: Softmax;
    H: number;
    /**
     * Performs Multi Head Self-Attention on "x" tensor.
     *
   * [Transformers Explained Visually (Part 3)](https://towardsdatascience.com/transformers-explained-visually-part-3-multi-head-attention-deep-dive-1c1ff1024853)
     * @param {Tensor} x - input Tensor.
     * @returns {Tensor} new Tensor.
     */
    forward(x: Tensor): Tensor;
}
declare class FullyConnected extends Module {
    /**
     * Small block composed of two Linear layers, a ReLU non-linearity and a Dropout layer.
     *
     * @param {number} in_size - size of the last dimention of the input array.
     * @param {number} out_size - size of the last dimention of the output array.
     * @param {number} dropout_prob - probability of zeroing each activation in dropout Layer.
     * @param {string} device - Device to perform Tensor operations. Either "gpu" or "cpu".
     * @param {boolean} bias - wether to include a bias term.
     */
    constructor(in_size: number, out_size: number, dropout_prob?: number, device?: string, bias?: boolean);
    l1: Linear;
    relu: ReLU;
    l2: Linear;
    dropout: Dropout;
    /**
     *  Passes "x" tensor through the Fully Connected layers.
     * @param {Tensor} x - input Tensor.
     * @returns {Tensor} new Tensor.
     */
    forward(x: Tensor): Tensor;
}
declare class Block extends Module {
    /**
     * Full transformer decoder block. Composed of Multi Head Self Attention, Fully connected layers and Layer Norms.
     *
     * @param {number} in_size - size of the last dimention of the input array.
     * @param {number} out_size - size of the last dimention of the output array.
     * @param {number} n_heads - number of parallel heads to be computed (must equally divide in_size).
     * @param {number} n_timesteps - length of text sequence to be processed by Transformer.
     * @param {number} dropout_prob - probability of zeroing each activation in dropout Layer.
     * @param {string} device - Device to perform Tensor operations. Either "gpu" or "cpu".
     */
    constructor(in_size: number, out_size: number, n_heads: number, n_timesteps: number, dropout_prob?: number, device?: string);
    att: MultiHeadSelfAttention;
    ln1: LayerNorm;
    fcc: FullyConnected;
    ln2: LayerNorm;
    /**
     * Passes "x" tensor through a full transformer Block.
     * @param {Tensor} x - input Tensor.
     * @returns {Tensor} new Tensor.
     */
    forward(x: Tensor): Tensor;
}
declare class Embedding extends Module {
    /**
     * Embedding class, turns indexes into vectors.
     *
     * @param {number} vocab_size - number of different indexes (vocabulary size).
     * @param {number} embed_size - size of the embedding vector generated.
     */
    constructor(vocab_size: number, embed_size: number);
    E: Tensor;
    /**
     * Extracts embedding from rows in "idx":
     * @param {Tensor} idx - rows to get embedding from.
     * @returns {Tensor} new Tensor. Out = (In @ W) + b.
     */
    forward(idx: Tensor): Tensor;
}
declare class PositionalEmbedding extends Module {
    /**
     * Embedding class, turns indexes into vectors based on it's position through an optimized lookup table.
     *
     * @param {number} input_size - number of different embeddings (size of the input).
     * @param {number} embed_size - size of the embedding vector generated.
     */
    constructor(input_size: number, embed_size: number);
    E: Tensor;
    /**
     * Gets embedding for timesteps in "idx" array.
     * @param {object} idx - Array [Batch x Timesteps]. Timesteps will be filled with positional embeddings.
     * @returns {Tensor} new Tensor.
     */
    forward(idx: object): Tensor;
}
declare class ReLU extends Module {
    /**
     * Performs forward pass through Rectified Linear Unit nonlinearity. Returns z if z>0 else 0.
     * @param {Tensor} z - input Tensor.
     * @returns {Tensor} new Tensor.
     */
    forward(z: Tensor): Tensor;
}
declare class Softmax extends Module {
    /**
     * Performs forward pass through Softmax nonlinearity.
     * @param {Tensor} z - input Tensor.
     * @param {number} dim - dimension across which to apply Softmax.
     * @returns {Tensor} new Tensor.
     */
    forward(z: Tensor, dim?: number): Tensor;
}
declare class Dropout extends Module {
    /**
     * Dropout class, added usually after other layers, to drop values to zero with given probability
     *
     * @param {number} drop_prob - probability to drop each value in input.
     */
    constructor(drop_prob: number);
    p: number;
    /**
     * Performs forward pass through Dropout layer. Sets random values to zero (this.p % of the total).
     * @param {Tensor} z - input Tensor.
     * @returns {Tensor} new Tensor.
     */
    forward(z: Tensor): Tensor;
}
declare class LayerNorm extends Module {
    /**
     * Layer Norm class, added usually after other layers to normalize across all of the output.
     *
     * @param {number} n_embed - size of the last dimention of the input.
     */
    constructor(n_embed: number);
    gamma: Tensor;
    beta: Tensor;
    forward(x: any): any;
}
declare class CrossEntropyLoss extends Module {
    /**
     * Performs forward pass through CrossEntropyLoss, returns loss.
     * @param {Tensor} z - Output from the last layer of the network. Must have shape like (*Batch dimentions, Number of possible classes).
     * @param {object} y - Correct indexes expected from the model.
     * @returns {object} Negative-log-likelihood loss of the model output.
     */
    forward(z: Tensor, y: object): object;
}
declare class Adam {
    /**
     * Adam optimizer class.
     * @param {(Parameter | Tensor)[]} params - List of all Parameter or Tensor (with requires_grad = True) to be optimized by Adam. "params" is usually set to nn.Module.parameters(), which automatically returns all parameters in a list form.
     * @param {number} lr - Scalar multiplying each learning step, controls speed of learning.
     * @param {number} reg - Scalar controling strength l2 regularization.
     * @param {(number)[]} betas - Two scalar floats controling how slowly the optimizer changes the "m" and "v" attributes.
     * @param {number} eps - Scalar added to denominator to stop it from ever going to zero.
     */
    constructor(params: (Parameter | Tensor)[], lr?: number, reg?: number, betas?: (number)[], eps?: number);
    params: (Tensor | Parameter)[];
    lr: number;
    reg: number;
    b1: number | undefined;
    b2: number | undefined;
    eps: number;
    /**
     * Updates all parameters in this.params with their gradients.
     */
    step(): void;
    /**
     * Sets all the gradients of self.params to zero.
     */
    zero_grad(): void;
}
export {};
