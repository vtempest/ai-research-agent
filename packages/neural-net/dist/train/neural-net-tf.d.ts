export namespace torch {
    export { Tensor };
    export let Parameter: any;
    export let add: any;
    export let neg: any;
    export let mul: any;
    export let div: any;
    export let matmul: any;
    export let exp: any;
    export let log: any;
    export let sqrt: any;
    export let pow: any;
    export let mean: any;
    export let masked_fill: any;
    export let variance: any;
    export let at: any;
    export let reshape: any;
    export let _reshape: any;
    export let transpose: any;
    export let tensor: any;
    export let randint: any;
    export let randn: any;
    export let rand: any;
    export let tril: any;
    export let ones: any;
    export let zeros: any;
    export let broadcast: any;
    export let save: any;
    export let load: any;
    export let nn: any;
    export let optim: any;
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
    _tfTensor: any;
    batch_size: any;
    warned: boolean;
    /**
     * Creates TensorFlow.js tensor from data
     */
    _createTfTensor(): void;
    /**
     * Dispose TensorFlow.js tensor to prevent memory leaks
     */
    _disposeTfTensor(): void;
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
     */
    backward(grad?: null, child?: null): void;
    /**
     * Sends this Tensor to the provided device.
     */
    to(device: any): void;
    /**
     * Multiply this Tensor by integer or other Tensor using matrix multiplication.
     */
    matmul(other: any): Tensor;
    /**
     * Dispose resources when tensor is no longer needed
     */
    dispose(): void;
}
declare function getShape(data: any, shape?: any[]): any[];
export {};
