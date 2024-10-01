import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";

import { convertMarkdownToHTML } from "../../index.js"

/**
 * Generates a reply using an AI models: Groq, Claude, or OpenAI's GPT.
 * 
 * This function utilizes transformer-based language models:
 * 1. Input Embedding: Converts input text into numerical vectors.
 * 2. Positional Encoding: Adds position information to maintain word order.
 * 3. Multi-Head Attention: Processes relationships between words in parallel.
 * 4. Feed-Forward Networks: Further processes the attention output.
 * 5. Layer Normalization & Residual Connections: Stabilizes learning and 
 * prevents vanishing gradients.
 * 6. Output Layer: Generates probabilities for next tokens.
 * 
 * The model iteratively applies these steps to generate coherent 
 * and contextually relevant responses.
 * 
 * [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
 * 
 * 
 * [Transformers Explained Visually (Part 
 * 3)](https://towardsdatascience.com/transformers-explained-visually-part-3-multi-head-attention-deep-dive-1c1ff1024853)
 * 
 * "An important feature of a learning machine is that its teacher will often be very largely ignorant
 *  of quite what is going on inside." -A.M. Turing, 1950
 * @param {string} query - The user's input query.
 * @param {string} apiKey - The API key for authentication with Groq or OpenAI.
 * @param {string} model - The specific AI model to be used (e.g., GPT-4, Mixtral 8x7B).
 * @returns {Promise<{content: string, error: string}>} The generated AI response as HTML.
 * @category Generate
 * @author [AI Research Contributors (Sutskever's Top 30)](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 * 
 */
export async function generateLanguageModelReply(query, apiKey, model) {
  var aiResponse = { content: "", error: "" };
  try {
    const chat = new ChatGroq({
      apiKey,
      model,
    });

    const contextLimit = 5000;

    const messages = [new HumanMessage(query)];
    const response = await chat.invoke(messages);
    aiResponse.content = convertMarkdownToHTML(response.content);

  } catch (error) {
    aiResponse.error =
      error.response?.status === 429
        ? '<span style="color: red; outline: 1px solid red;">Rate limit exceeded. Please wait before trying again.</span>'
        : '<span style="color: red; outline: 1px solid red;">Failed to generate AI summary. Please try again later.</span>';
  }

  return aiResponse;
}
