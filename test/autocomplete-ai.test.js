import { pipeline } from '@huggingface/transformers';

const max_new_tokens = 16;

const generator = await pipeline('text-generation', 'Xenova/distilgpt2',{
    dtype: 'fp16', 
    device: 'cpu',
    max_new_tokens,
    temperature: 1,
    top_k: 50,
    top_p: 1,
    repetition_penalty: 1.2,
    no_repeat_ngram_size: 2,
    num_beams: 2,
    num_return_sequences: 2,
});

const prompt = 'Cloning an Hard Drive and '
const output = await generator(prompt, { max_new_tokens }); // Generates the next word

console.log(output[0].generated_text);
 