/**
 * TORCH: Tensor Operations with the Reasoning Capacity of Humans
 * 1. TensorFlow.js for matrix operations and GPU acceleration
 * 2. Added proper tensor memory management with dispose() methods
 * 3. Used TensorFlow.js WebGL backend for improved performance
 * 4. Preserved the original PyTorch-like API
 * 
 * 
 * # Missing Functions for TensorFlow.js Migration

Based on the original GPU.js code and the TensorFlow.js refactoring, here are all the functions that need to be implemented:

## Core Mathematical Operations (CPU Fallback Functions)

### 1. **_add(a, b)** - Element-wise addition with broadcasting
- Handles number + number, array + number, array + array
- Implements broadcasting for different shaped tensors
- Used as fallback when GPU operations aren't available

### 2. **_mul(a, b)** - Element-wise multiplication with broadcasting  
- Similar structure to _add but for multiplication
- Handles all combinations of numbers and arrays
- Implements broadcasting logic

### 3. **_div(a, b)** - Element-wise division with broadcasting
- Division operation with broadcasting support
- Handles edge cases like division by zero
- Supports all tensor shape combinations

### 4. **_neg(a)** - Element-wise negation
- Simple unary operation: multiply each element by -1
- Recursive for multi-dimensional arrays

### 5. **_pow(a, n)** - Element-wise power operation
- Raises each element to power n
- Recursive implementation for arrays

### 6. **_sqrt(a)** - Element-wise square root
- Math.sqrt for numbers, recursive for arrays
- Used in variance calculations and optimizations

### 7. **_exp(a)** - Element-wise exponential (e^x)
- Natural exponential function
- Critical for activation functions and loss calculations

### 8. **_log(a)** - Element-wise natural logarithm
- Natural log function
- Used in loss functions and mathematical operations

## Matrix Operations

### 9. **_matmul(a, b, kernel)** - Matrix multiplication
- **CRITICAL**: Core matrix multiplication logic
- Must handle 2D and higher-dimensional tensors
- The `kernel` parameter was used for GPU.js, needs CPU fallback
- Implements proper matrix multiplication algorithm

### 10. **_transpose(a, dim)** - Matrix transposition
- Transposes along specified dimensions
- Handles multi-dimensional arrays
- Essential for backpropagation

## Tensor Manipulation

### 11. **_reshape(a, shape)** - Tensor reshaping
- Changes tensor dimensions while preserving total elements
- Includes helper function `_build()`
- Used extensively in neural network layers

### 12. **_at(a, idx1, idx2)** - Index-based element access
- Extracts elements at specified indices
- Supports 1D and 2D indexing
- Used for embedding lookups and advanced indexing

### 13. **_masked_fill(a, mask, condition, value)** - Conditional filling
- Fills tensor elements based on condition
- Used in attention mechanisms (masking future tokens)
- Essential for transformer architectures

## Statistical Operations

### 14. **_sum(a, dim, keepdims)** - Summation along dimensions
- Reduces tensor along specified dimension
- Handles keepdims parameter for maintaining dimensions
- Used in loss calculations and reductions

### 15. **_mean(a, dim, keepdims)** - Mean along dimensions  
- Average calculation along specified dimension
- Used in layer normalization and loss functions

### 16. **_variance(a, dim, keepdims)** - Variance calculation
- Statistical variance along dimensions
- Critical for layer normalization and batch normalization

## Broadcasting Operations

### 17. **broadcast(a, b)** - Tensor broadcasting
- Makes tensors compatible for element-wise operations
- Complex logic for handling different shapes
- Includes helper function `_broadcast()`

### 18. **broadcastUp(inElement, outElement)** - Shape expansion
- Expands tensor dimensions to match target shape
- Used in gradient calculations
- Includes helper function `_broadcastUp()`

## Utility Functions

### 19. **_tensorInitializer(shape, valueFunc)** - Tensor creation helper
- Creates tensors with specified shape and initialization function
- Used by zeros(), ones(), rand(), randn()

### 20. **requiresGrad(a)** - Gradient requirement checker
- Determines if tensor needs gradient computation
- Used throughout automatic differentiation

### 21. **getShape(data, shape)** - Shape determination
- Recursively determines tensor dimensions
- Validates tensor homogeneity
- Critical for tensor operations

### 22. **assureArray(a)** - Array conversion utility
- Converts various inputs to array format
- Handles null values and tensor objects

### 23. **getData(a)** - Data extraction utility
- Extracts raw data from tensors or returns primitives
- Used throughout the codebase

## Neural Network Specific Functions

### 24. **_relu(z)** - ReLU activation helper
- Creates mask for ReLU activation
- Returns 1 for positive values, small value for negative
- Used in ReLU layer implementation

### 25. **save(model, file)** - Model serialization
- Converts model to JSON string for saving
- Preserves weights, gradients, and optimizer states

### 26. **load(model, loadedData)** - Model deserialization  
- Loads model from saved JSON data
- Includes helper function `loadParameters()`

## Missing from TensorFlow.js Migration

When migrating to TensorFlow.js, you need to implement:

1. **CPU fallback versions** of all mathematical operations
2. **TensorFlow.js integration** for GPU operations  
3. **Memory management** with proper tensor disposal
4. **Device switching** logic (GPU/CPU)
5. **Gradient tape integration** for automatic differentiation

## Implementation Priority

**HIGH PRIORITY:**
- _matmul() - Core to all neural networks
- _add(), _mul(), _div() - Basic arithmetic
- broadcast() - Essential for tensor operations
- _reshape() - Critical for layer operations

**MEDIUM PRIORITY:**  
- Statistical functions (_mean, _variance, _sum)
- _transpose(), _at(), _masked_fill()
- Utility functions (getShape, assureArray, getData)

**LOW PRIORITY:**
- Initialization and serialization functions
- Helper functions and optimizations

Each function needs both a TensorFlow.js optimized version (for GPU) and a pure JavaScript fallback version (for CPU or when TensorFlow.js is unavailable).

 */

import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';  // Enable WebGL backend for GPU acceleration

function getShape(data, shape = []) {
  if (data instanceof Array && data.length === 0) {
    return [0];
  }
  if (typeof data === "number") {
    if (JSON.stringify(shape) === "[]") {
      return [1];
    }
    return shape;
  }
  if (typeof data[0] === "number" && Array.isArray(data)) {
    for (const element of data) {
      if (typeof element != "number") {
        throw new Error("The requested array has an inhomogeneous shape.");
      }
    }
    shape.push(data.length);
    return shape;
  }
  if (Array.isArray(data[0])) {
    let elementLength = data[0].length;
    for (const element of data) {
      if (typeof element != "object" && typeof element != "number") {
        throw new Error("TypeError: the input data is not a number.");
      } else if (Array.isArray(element) && elementLength != element.length) {
        throw new Error("The requested array has an inhomogeneous shape.");
      } else if (Array.isArray(element)) {
        elementLength = element.length;
      }
    }
    shape.push(data.length);
  }
  return getShape(data[0], shape);
}

function assureArray(a) {
  if (Array.isArray(a)) {
    return a;
  } else if (typeof a === "number") {
    return [a];
  } else if (a === null) {
    return a;
  }
  return a._data;
}

function getData(a) {
  if (Array.isArray(a)) {
    return a;
  }
  if (typeof a === "number") {
    return a;
  }
  return a._data;
}

class Tensor {
  requires_grad = false;
  _data;
  shape;
  _grad;
  children;
  parents;
  operation;
  visited = false;
  m;
  v;
  device;
  _tfTensor;  // Store TensorFlow.js tensor
  batch_size;
  warned;

  /**
   * Creates new instance of the Tensor class.
   * @param {object} data - Iterable containing the data to be stored in the Tensor.
   * @param {boolean} requires_grad - Whether to keep track of this tensor's gradients.
   * @param {string} device - Device to store Tensor. Either "gpu" or "cpu".
   */
  constructor(data, requires_grad = false, device = "cpu") {
    if (typeof data === "object") {
      this._data = data;
    } else if (typeof data === "number") {
      this._data = [data];
    } else {
      throw Error('Your argument "data" is not a number or an iterable.');
    }
    this.shape = getShape(data);
    this.device = device;
    this.requires_grad = requires_grad;
    this.batch_size = null;
    this.warned = false;
    
    // Create TensorFlow.js tensor for GPU operations
    this._createTfTensor();
    
    if (this.requires_grad) {
      this._grad = zeros(this.shape);
    }
    this.children = [];
    this.parents = [];
    this.operation = null;
    this.visited = false;
  }

  /**
   * Creates TensorFlow.js tensor from data
   */
  _createTfTensor() {
    if (this.device === "gpu") {
      this._tfTensor = tf.tensor(this._data, this.shape);
    }
  }

  /**
   * Dispose TensorFlow.js tensor to prevent memory leaks
   */
  _disposeTfTensor() {
    if (this._tfTensor) {
      this._tfTensor.dispose();
      this._tfTensor = null;
    }
  }

  /**
   * Returns the data in the Tensor.
   */
  get data() {
    return this._data;
  }

  /**
   * Returns the data's length'.
   */
  get length() {
    return this._data.length;
  }

  /**
   * Returns the number of dimensions in the Tensor.
   */
  get ndims() {
    return this.shape.length;
  }

  /**
   * Returns the tensor's gradients.
   */
  get grad() {
    return this._grad?.data;
  }

  /**
   * Performs backward pass from THIS tensor backwards.
   */
  backward(grad = null, child = null) {
    if (!this.requires_grad) {
      throw new Error("this tensor has requires_grad set to False");
    }
    if (grad === null) {
      grad = ones(this.shape);
      this.children = [];
    }
    this._grad = new Tensor(_add(this._grad?.data, grad.data));
    if (child != null) {
      const idx = this.children.indexOf(child);
      this.children.splice(idx, 1);
    }
    if (this.operation != null) {
      if (this.children.length === 0) {
        this.operation.backward(this._grad, this);
      }
    }
  }

  /**
   * Sends this Tensor to the provided device.
   */
  to(device) {
    this.device = device;
    if (device === "gpu" && !this._tfTensor) {
      this._createTfTensor();
    } else if (device === "cpu" && this._tfTensor) {
      this._disposeTfTensor();
    }
  }

  // ... [Additional tensor methods remain the same] ...

  /**
   * Multiply this Tensor by integer or other Tensor using matrix multiplication.
   */
  matmul(other) {
    const operation = new MatMul();
    return operation.forward(this, other);
  }

  /**
   * Dispose resources when tensor is no longer needed
   */
  dispose() {
    this._disposeTfTensor();
  }
}

class MatMul {
  cache;
  /**
   * Performs matrix multiplication between two tensors.
   */
  forward(a, b) {
    this.cache = [a, b];
    let aData = a.data;
    let bData = b.data;
    
    if (a.shape.length < b.shape.length) {
      aData = broadcastUp(aData, bData);
    } else {
      bData = broadcastUp(bData, aData);
    }
    
    // Use TensorFlow.js for GPU operations if available
    let resultData;
    if (a.device === "gpu" && b.device === "gpu" && a._tfTensor && b._tfTensor) {
      // Create temporary tensors if needed for broadcast
      const aTensor = Array.isArray(aData) !== Array.isArray(a.data) ? 
                     tf.tensor(aData) : a._tfTensor;
      const bTensor = Array.isArray(bData) !== Array.isArray(b.data) ? 
                     tf.tensor(bData) : b._tfTensor;
      
      const tfResult = tf.matMul(aTensor, bTensor);
      resultData = tfResult.arraySync();
      
      // Clean up temporary tensors
      if (aTensor !== a._tfTensor) aTensor.dispose();
      if (bTensor !== b._tfTensor) bTensor.dispose();
      tfResult.dispose();
    } else {
      // CPU fallback using simplified matrix multiplication
      resultData = _matmul(aData, bData);
    }
    
    const z = new Tensor(
      resultData,
      requiresGrad(a) || requiresGrad(b)
    );
    
    if (a instanceof Tensor && requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
    }
    if (b instanceof Tensor && requiresGrad(b)) {
      z.parents.push(b);
      b.children.push(z);
    }
    z.operation = this;
    return z;
  }
  
  backward(dz, z) {
    const [a, b] = this.cache;
    
    if (requiresGrad(a)) {
      const dzData = dz.data;
      let b_T = _transpose(b.data, b.ndims - 2);
      b_T = broadcastUp(b_T, dzData);
      
      // Use TensorFlow.js for GPU operations if available
      let daData;
      if (dz.device === "gpu" && b.device === "gpu" && dz._tfTensor && b._tfTensor) {
        const dzTensor = dz._tfTensor;
        const bTransposed = tf.tensor(b_T);
        const daResult = tf.matMul(dzTensor, bTransposed);
        daData = daResult.arraySync();
        bTransposed.dispose();
        daResult.dispose();
      } else {
        daData = _matmul(dzData, b_T);
      }
      
      let da = new Tensor(daData);
      da = broadcast(da, a);
      a.backward(da, z);
    }
    
    if (requiresGrad(b)) {
      const dzData = dz.data;
      let a_T = _transpose(a.data, a.ndims - 2);
      a_T = broadcastUp(a_T, dzData);
      
      // Use TensorFlow.js for GPU operations if available
      let dbData;
      if (dz.device === "gpu" && a.device === "gpu" && dz._tfTensor && a._tfTensor) {
        const aTransposed = tf.tensor(a_T);
        const dzTensor = dz._tfTensor;
        const dbResult = tf.matMul(aTransposed, dzTensor);
        dbData = dbResult.arraySync();
        aTransposed.dispose();
        dbResult.dispose();
      } else {
        dbData = _matmul(a_T, dzData);
      }
      
      let db = new Tensor(dbData);
      db = broadcast(db, b);
      b.backward(db, z);
    }
  }
}

// Simplified CPU-based matrix multiplication (fallback)
function _matmul(a, b) {
  if (typeof a === "number") {
    throw new Error("Cannot perform MatMul with given shapes.");
  }
  if (typeof a[0][0] === "object") {
    return a.map(
      (element, idx) => _matmul(element, b[idx])
    );
  } else {
    if (a[0].length === b.length && typeof a[0][0] === "number") {
      // Simple CPU matrix multiplication
      const rows = a.length;
      const cols = b[0].length;
      const shared = b.length;
      const result = Array(rows).fill(0).map(() => Array(cols).fill(0));
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let sum = 0;
          for (let k = 0; k < shared; k++) {
            sum += a[i][k] * b[k][j];
          }
          result[i][j] = sum;
        }
      }
      return result;
    } else {
      throw Error(
        `Cannot perform Matrix Multiplication: cannot broadcast ${[
          a.length,
          a[0].length
        ]} and ${[b.length, b[0].length]}`
      );
    }
  }
}

// [Additional operation classes and helper functions...]

const torch = {
  Tensor,
  Parameter,
  add,
  neg,
  mul,
  div,
  matmul,
  exp,
  log,
  sqrt,
  pow,
  mean,
  masked_fill,
  variance,
  at,
  reshape,
  _reshape,
  transpose,
  tensor,
  randint,
  randn,
  rand,
  tril,
  ones,
  zeros,
  broadcast,
  save,
  load,
  nn,
  optim,
  getShape
};

export { torch };
