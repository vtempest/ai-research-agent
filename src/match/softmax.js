/**
 * Calculates the Softmax of an array of numbers.
 * 
 * The <a href="https://en.wikipedia.org/wiki/Softmax_function">Softmax 
 * function</a> takes an array of arbitrary numbers and squashes it
 * to a vector of values between 0 and 1 that sum to 1, which allows the output
 * to be interpreted as a probability distribution over the possible classes. 
 * Softmax is used in multi-class classification problems where there are more than two
 * possible output classes.
 * 
 * @param {number[]} arr - The input array of numbers.
 * @returns {number[]} An array of Softmax probabilities corresponding to the input array.
 * 
 * @example
 * // Example 1: Image Classification Scores
 * // Consider a neural network output for classifying an image as a dog, cat, or bird
 * const classificationScores = [2.5, 1.8, 0.3];
 * const probabilities = calculateProbabilitySoftmax(classificationScores);
 * console.log(probabilities);
 * // Output: [0.5707, 0.3631, 0.0662]
 * // Interpretation: The image is most likely a dog (57.07% probability),
 * // followed by cat (36.31%), and least likely a bird (6.62%)
 * 
 * @example
 * // Example 2: Language Model Next Word Prediction
 * // Consider logits from a language model predicting the next word
 * const wordLogits = [-0.5, 0.2, 1.5, -1.0, 0.8];
 * const wordProbabilities = calculateProbabilitySoftmax(wordLogits);
 * console.log(wordProbabilities);
 * // Output: [0.0840, 0.1681, 0.4550, 0.0509, 0.2420]
 * // Interpretation: The model predicts the third word as most likely (45.50%),
 * // followed by the fifth word (24.20%), and so on
 * @category Relevance
 * @author
 *  [Ludwig Boltzmann (1868)](https://en.wikipedia.org/wiki/Softmax_function#History), 
 * 
 *  [John S. Bridle (1990)](https://link.springer.com/chapter/10.1007/978-3-642-76153-9_28)
 */
export function calculateProbabilitySoftmax(arr) {
    // Compute the maximum value in the array
    const maxVal = Math.max(...arr);
  
    // Compute the exponentials of the array values
    const exps = arr.map((x) => Math.exp(x - maxVal));
  
    // Compute the sum of the exponentials
    const sumExps = exps.reduce((acc, val) => acc + val, 0);
  
    // Compute the calculateSoftmax values
    const calculateSoftmaxArr = exps.map((x) => x / sumExps);
  
    return calculateSoftmaxArr;
  }