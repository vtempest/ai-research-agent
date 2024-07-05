import { pipeline } from '@xenova/transformers';

async function printTokenEmbeddings(text) {
  // Load the all-MiniLM-L6-v2 model
  const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  // Tokenize the input text
  const tokenized = await model.tokenizer(text);
  console.log('Tokenized result:', JSON.stringify(tokenized, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));

  // Get the model outputs
  const outputs = await model(text);
  // Attempt to extract input_ids
  let input_ids;
  if (tokenized && typeof tokenized === 'object') {
    if ('input_ids' in tokenized) {
      input_ids = tokenized.input_ids;
    } else if ('ids' in tokenized) {
      input_ids = tokenized.ids;
    } else {
      console.error('Unable to find input_ids in tokenized result');
      return;
    }
  } else {
    console.error('Unexpected tokenized result type:', typeof tokenized);
    return;
  }

  console.log('Extracted input_ids:', input_ids);

  // Ensure input_ids is an array of integers
  if (!Array.isArray(input_ids) || input_ids.length === 0 || !input_ids.every(Number.isInteger)) {
    console.error('input_ids is not a non-empty array of integers:', input_ids);
    return;
  }

  // Get the CLS token embedding (first token)
  const clsEmbedding = outputs[0];

  // Decode tokens
  const decodedText = await model.tokenizer.decode(input_ids, { skip_special_tokens: false });
  console.log('Decoded text:', decodedText);

  // Get individual tokens
  const tokens = await Promise.all(input_ids.map(id => model.tokenizer.decode([id], { skip_special_tokens: false })));

  // Print tokens and their CLS weights
  console.log("Tokens and their CLS weights:");
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const clsWeight = clsEmbedding[i];
    console.log(`Token: "${token}", CLS Weight: ${clsWeight}`);
  }

  // Split text into word parts
  const wordParts = text.split(/\b/);

  // Print word parts and their average CLS weights
  console.log("\nWord parts and their average CLS weights:");
  let tokenIndex = 0;
  for (const wordPart of wordParts) {
    if (wordPart.trim() === '') continue;  // Skip empty word parts

    let totalWeight = 0;
    let tokenCount = 0;
    let currentWord = '';

    // Sum weights for all tokens in this word part
    while (tokenIndex < tokens.length) {
      currentWord += tokens[tokenIndex].replace('##', '');
      totalWeight += clsEmbedding[tokenIndex];
      tokenCount++;
      tokenIndex++;

      if (currentWord === wordPart) break;
      if (currentWord.length > wordPart.length) {
        tokenIndex--;
        tokenCount--;
        totalWeight -= clsEmbedding[tokenIndex];
        break;
      }
    }

    const averageWeight = totalWeight / tokenCount;
    console.log(`Word part: "${wordPart}", Average CLS Weight: ${averageWeight.toFixed(6)}`);
  }
}

// Example usage
printTokenEmbeddings("Hello, how are you today?")
  .catch(error => console.error('An error occurred:', error));