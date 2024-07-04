import { pipeline, AutoTokenizer, AutoModel } from '@xenova/transformers';
const modelName = 'Xenova/bert-base-NER-uncased';
const tokenizer = await AutoTokenizer.from_pretrained(modelName);
const model = await AutoModel.from_pretrained(modelName);
/**

[Qdrant developed BM42](https://qdrant.tech/articles/bm42/) in 2024 to replace term 
frequency with average word weights by self-attention tansformer language models. 
This scores word importance better than BM25 in short documents which are too short 
to use word frequency as the key weight.

 */


async function processNEROutput(text) {
  // Tokenize the input text
  const encodedInput = await tokenizer(text, {
    return_tensors: 'pt',
    padding: true,
    truncation: true,
  });

  // Get the model output
  const output = await model(encodedInput);

  // Extract logits from the output
  const logits = output.logits;

  // Get the tokens
  const tokens = await tokenizer.decode(encodedInput.input_ids[0], { skip_special_tokens: false });

  // Process each token
  const results = [];
  for (let i = 0; i < logits.dims[1]; i++) {
    const tokenLogits = logits.data.slice(i * 9, (i + 1) * 9);
    const probabilities = softmax(tokenLogits);
    const predictedClass = probabilities.indexOf(Math.max(...probabilities));
    const avverageProb = probabilities.reduce((acc, val) => acc + val, 0) / probabilities.length;
    results.push({
      token: tokens.split(/\s/)[i-1],
      predictedLabel: decodeNERLabel(predictedClass),
      avverageProb
        
    });
  }

  return results;
}

// Helper function to apply softmax
function softmax(arr) {
  const expValues = arr.map(Math.exp);
  const sumExp = expValues.reduce((acc, val) => acc + val, 0);
  return expValues.map(exp => exp / sumExp);
}

// Function to decode NER label
function decodeNERLabel(index) {
  const labels = ['O', 'B-PER', 'I-PER', 'B-ORG', 'I-ORG', 'B-LOC', 'I-LOC', 'B-MISC', 'I-MISC'];
  return labels[index];
}

// Usage example
async function main() {
  const text = "OpenAI is an artificial intelligence company based in San Francisco.";
  try {
    const nerResults = await processNEROutput(text);
    nerResults.forEach(result => {
      console.log(`Token: ${result.token}, Predicted Label: ${result.predictedLabel}`);
      console.log(`Probabilities: ${result.avverageProb}`);
      console.log('---');
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();