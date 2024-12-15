/**
 * 
 *  ### Agent Prompts
 * 
 *  1. summarize-bullets:
        - article
    2. summarize:
        - article
    3. suggest-followups:
        - chat_history
        - article
    4. answer:
        - chat_history
        - query
    5. query-resolution:
        - chat_history
        - query
    6. knowledge-graph-nodes:
        - query
        - article
    7. summary-longtext:
        - article
        - sections 
 *
 * Returns an object with agent prompts based on the provided agent name and options
 * Uses regex to detect any variables in %7Bbrackets%7D in the prompts
 * and replace them with values from the options object
 * Values inside brackets must be the matching variable name
 * @param {string} agentName - The name of the agent to generate prompts for.
 * @param {Object} [options] - An options object that can contain the following
 *   properties:
 *   - `context`: An object containing context variables to be used when
 *     generating the prompts.
 * @category Generate
 * @returns {<{prompt: string, variablesNotProvided: []}>} An object with agent prompts.
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @example
 *   var prompt = getAgentPrompts("summarize-bullets", {article})
 */
export function getAgentPrompts(agentName, options = {}) {
  var { context = {} } = options;

  var agentPrompts = [
    {
      name: "summarize-bullets",
      prompt: `Summarize in 3 bullet points that provide key takeaways and bold topics phrases.
      
      {article}`,
      tools: [],
    },
    {
      name: "summarize",
      prompt: `As a professional summarizer, create a concise and comprehensive summary of the
      provided text, be it an article, post, conversation, or passage, while adhering to these 
      guidelines:
    Craft a summary that is detailed, thorough, in-depth, and complex, while maintaining 
    clarity and conciseness.
    Incorporate main ideas and essential information, eliminating extraneous language and 
    focusing on critical aspects.
    Rely strictly on the provided text, without including external information.
    Format the summary in paragraph form for easy understanding.
    
    {article}
    `,
      tools: [],
    },
    {
      name: "suggest-followups",
      prompt: `
    You are a suggestion generator for an AI powered search engine. You will be given a 
    conversation below. You need to generate 4-5 suggestions based on the conversation. The
     suggestion should be relevant to the conversation that can be used by the user to ask 
     the chat model for more information.
    You need to make sure the suggestions are relevant to the conversation and are helpful 
    to the user. Keep a note that the user might use these suggestions to ask a chat model 
    for more information. 
    Make sure the suggestions are medium in length and are informative and relevant to the 
    conversation.

    Provide these suggestions separated by newlines between the XML tags <suggestions> and 
    </suggestions>. For example:

    <suggestions>
    Tell me more about SpaceX and their recent projects
    What is the latest news on SpaceX?
    Who is the CEO of SpaceX?
    </suggestions>

    Conversation:
    {chat_history}
    `,
      tools: [],
    },
    {
      name: "answer",
      prompt: `
  You are an expert at searching the web and answering user's queries. Generate a response that
    is informative and relevant to the user's query based on provided context (the context 
    consits of search results containing a brief description of the content of that page).
  You must use this context to answer the user's query in the best way possible. Use an 
  unbaised and journalistic tone in your response. Do not repeat the text.
  You must not tell the user to open any link or visit any website to get the answer. You must
    provide the answer in the response itself. If the user asks for links you can provide them.
    Your responses should be medium to long in length be informative and relevant to the user's
    query. You can use markdowns to format your response. You should use bullet points to list
      the information. Make sure the answer is not short and is informative.
  You have to cite the answer using [number] notation. You must cite the sentences with their
    relevent context number. You must cite each and every part of the answer so the user can 
    know where the information is coming from.
  Place these citations at the end of that particular sentence. You can cite the same sentence 
  multiple times if it is relevant to the user's query like [number1][number2].
  However you do not need to cite it using the same number. You can use different numbers to 
  cite the same sentence multiple times. The number refers to the number of the search result 
  (passed in the context) used to generate that part of the answer.

  Anything inside the following \`context\` HTML block provided below is for your knowledge 
  returned by the search engine and is not shared by the user. You have to answer question
  on the basis of it and cite the relevant information from it but you do not have to
  talk about the context in your response. If you think there's nothing relevant in the 
  search results, you can say that 'Hmm, sorry I could not find any relevant information 
  on this topic. Would you like me to search again or ask something else?'.
  Anything between the \`context\` is retrieved from a search engine and is not a part 
  of the conversation with the user. Today's date is ${new Date().toISOString()}
  <context>
  {context}
  </context>
  User Query: {query}
    `,
      tools: [],
    },

    {
      name: "query-resolution",
      prompt: `You will be given a conversation below and a follow up question. 
    You need to rephrase the follow-up question if needed so it is a standalone question 
    that can be used by the LLM to search the web for information.
  If it is a writing task or a simple hi, hello rather than a question, you need to return 
  \`not_needed\` as the response.
    
    Example:
    1. Follow up question: What is the capital of France?
    Rephrased: Capital of france
    
    2. Follow up question: What is the population of New York City?
    Rephrased: Population of New York City
    
    3. Follow up question: What is Docker?
    Rephrased: What is Docker
    
    Conversation:
    {chat_history}

Follow up question: {query}
Rephrased question:
`,
      tools: [],
    },

    {
      name: "knowledge-graph-nodes",
      prompt: `
  Your task is to construct a comprehensive Temporal Knowledge Graph
1. Read and understand the Document: Familiarize yourself with the essential elements, including
(but not limited to) ideas, events, people, organizations, impacts, and key points, along with 
any explicitly mentioned or inferred dates or chronology
  - Pretend the date found in 'Date' is the current date
  - Create an inferred chronology (e.g., "before the car crash" or "shortly after police 
  arrived") when exact dates or times are not available

2. Create Nodes: Designate each of the essential elements identified earlier as a node with 
a unique ID using random letters from the greek alphabet. Populate each node with relevant details.

3. Establish and Describe Edges: Determine the relationships between nodes, forming the edges 
of your knowledge graph. For each edge:
  - Specify the nodes it connects
  - Describe the relationship and its direction
  - Assign a confidence level (high, medium, low) indicating the certainty of the connection

4. Represent All Nodes: Make sure all nodes are included in the edge list

    `,
      tools: [],
    },

    {
      name: "summary-longtext",
      prompt: `
    1. Read Summarized Sections: Carefully review all the summarized sections of the document. 
    Ensure that you have a clear understanding of the main points, key details, and essential 
    information presented in each section.
    2. Identify Main Themes: As you go through the summarized sections, identify the main themes
     and topics that are prevalent throughout the document. Make a list of these themes as they
      will form the backbone of your final summary.
    3. Consolidate Information: Merge the information from the different summarized sections, 
    focusing on the main themes you have identified. Avoid redundancy and ensure that the 
    consolidated information flows logically.
    4. Preserve Essential Details: While consolidating, ensure that you preserve the essential 
    details and nuances that are crucial for understanding the document. Consider the type of 
    document and the level of detail required to accurately capture its essence.
    5. Check for Completeness: After drafting the final summary, review it to ensure that it 
    accurately represents the main ideas, themes, and essential details of the document.

    Please remember to be thorough, and ensure that the final summary is a true reflection of 
    the document’s content and purpose.
    <sections>
    Summarized Sections:
    {sections}
    </sections>
    `,
      tools: [],
    },
  ];

  var prompt = agentPrompts.filter(
    (prompt) =>
      prompt.name == agentName )?.[0] ;

  if (!prompt) {
    return {error: 'Agent not found'};
  }

  //use regex to detect any variables in brackets 
  //and replace them with values from options
  //values inside  must be the matching variable name
  var variablesNotProvided = [];

  prompt.prompt = prompt.prompt.replace(/\{(.+?)\}/g, (match, key) => {
    if (key in options) {
      return options[key];
    } else {
      variablesNotProvided.push(key);
      return "[not provided]";
    }
  });

  if (variablesNotProvided.length > 0) {
    prompt.variablesNotProvided = variablesNotProvided;
  }

  return prompt;
}
