/**
 * The [Softmax function](https://en.wikipedia.org/wiki/Softmax_function) 
 * takes an array of arbitrary numbers and squashes it to a vector of values 
 * between 0 and 1 that sum to 1, which allows the output to be interpreted 
 * as a probability distribution over the possible classes. Softmax is used 
 * in multi-class classification problems where there are more than two
 * possible output classes. 
 * 
 * <img width="350px"  src="https://i.imgur.com/O0OjAG5.png" > 
 * @param {number[]} arr - The input array of numbers.
 * @returns {number[]} An array of Softmax probabilities corresponding to the input array.
 * @example
 * // Example 1: Image Classification Scores
 * // Consider a neural network output for classifying an image as a dog, cat, or bird
 * const classificationScores = [2.5, 1.8, 0.3];
 * const probabilities = calculateProbabilitySoftmax(classificationScores);
 * console.log(probabilities);
 * // Output: [0.5707, 0.3631, 0.0662]
 * // Interpretation: The image is most likely a dog (57.07% probability),
 * // followed by cat (36.31%), and least likely a bird (6.62%)
 * @author
 *  [Boltzmann, L. (1868)](https://en.wikipedia.org/wiki/Softmax_function#History), 
 *  [Bridle, J.  (1990)](https://link.springer.com/chapter/10.1007/978-3-642-76153-9_28)
 */
export function calculateProbabilitySoftmax(arr) {
    // Compute the maximum value in the array
    const maxVal = Math.max(...arr);
  
    // Compute the exponentials of the array values
    const exps = arr.map((x) => Math.exp(x - maxVal));
  
    // Compute the sum of the exponentials
    const sumExps = exps.reduce((acc, val) => acc + val, 0);
  
    // Softmax is each exponential divided by the sum of exponentials
    const calculateSoftmaxArr = exps.map((x) => x / sumExps);
  
    return calculateSoftmaxArr;
}