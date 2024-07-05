import { pipeline } from '@xenova/transformers';

async function printTokenEmbeddings(text) {
  // Load the all-MiniLM-L6-v2 model
  const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  // Tokenize the input text
  const { input_ids, attention_mask } = await model.tokenizer(text);

  // Get the model outputs
  const outputs = await model(text);

  // The outputs are already the last hidden state
  const lastHiddenState = outputs.data;
  console.log('Last hidden state:', lastHiddenState); 

  // Decode tokens
  const tokens = await model.tokenizer.decode(input_ids[0], { skip_special_tokens: false });

  // Print embedding values for each token
  console.log('Embedding values for each token:');
  tokens.split(" ").forEach((token, index) => {
    const embedding = Math.floor( lastHiddenState[index] * 10000) /1000;
    console.log(`Token: ${token}, Embedding (first 5 values): ${embedding}`);
  });
}

// Example usage
const text = "A leading social media platform announced today that it had suffered a massive data breach, potentially exposing the personal information of over 50 million users. The compromised data includes email addresses, phone numbers, and encrypted passwords. Cybersecurity experts are urging users to change their passwords immediately and enable two-factor authentication to protect their accounts."
  
printTokenEmbeddings(text);