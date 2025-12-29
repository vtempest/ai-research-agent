import { pipeline } from "@huggingface/transformers";

/**
 * Generates the next words for a given prompt using a text generation model.
 * 
 * The DistilGPT2 model is a distilled, smaller version of OpenAI's GPT-2, featuring 
 * around 82 million parameters (~80MB), and available in Hugging Face Transformers 
 * for efficient next word (next-token) prediction tasks in English text. It is 
 * well-suited for sequence generation and can be used as a next word prediction 
 * model with code similar to GPT2, but offers faster and lighter inference compared 
 * to standard GPT-2.
 * Size & Architecture: DistilGPT2 has 6 layers, 12 attention heads, and 82 million
 *  parameters, with a model file size around 80MB.
 * Distillation: Created using knowledge distillation, it compresses the smallest 
 * GPT-2 (124M parameter) model, preserving most capabilities but running 
 * significantly faster and requiring less memory.
 * @see https://huggingface.co/Xenova/distilgpt2
 * @param {string} prompt - The input prompt to complete.
 * @param {Object} [options] - Generation options.
 * @param {number} [options.maxTokens=16] - Maximum number of new tokens to generate.
 * @param {string} [options.model='Xenova/distilgpt2'] - The model identifier to use.
 * @param {Object} [options.generationConfig] - Additional generation parameters for the model.
 * @returns {Promise<string[]>} - The generated text completions.
 */
export async function predictNextWordsWithSmallLocalModel(
  prompt,
  { maxTokens = 16, model = "Xenova/distilgpt2", modelParams = {} } = {}
) {
  const generator = await pipeline("text-generation", model, {
    dtype: "fp16",
    device: "cpu",
    max_new_tokens: maxTokens,
    temperature: 0.5,
    repetition_penalty: 1.2,
    ...modelParams,
  });
  if (!prompt) return new Error("Prompt is required");

  const output = await generator(prompt, { max_new_tokens: maxTokens });
  // Return all generated sequences, trimmed
  return output
    .map((res) => res.generated_text.trim())
    .join(" ")
    .replace(prompt, "").trim();
}

// Example usage:

var samplePrompts = [
    "what can help build ai is that",
    "well-suited for sequence generation and can be",
    "the flagship model is estimated to have",
]

for (var prompt of samplePrompts) {
console.log( prompt, "->", 
    await predictNextWordsWithSmallLocalModel(
    prompt
    )
  );
}
