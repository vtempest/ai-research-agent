
/**
 * Agent prompt templates which have in brackets the needed 
 * variables and reformat the response in json with a callback.
 * @property {string} name - The name of the agent
 * @property {string} prompt - The prompt to use for the agent
 * @property {function} before - The function to use before the prompt
 * @property {function} after - The function to use after the prompt, stored in .data
 * @property {string[]} tools - The tools to use for the agent
 * @category Generate
*/
export const AGENT_PROMPTS = [
  {
    name: "question",
    template: `
    {article}
    Chat history: {chat_history}
    User query: {query}
      `,
    before: (prompt, params) => {
      prompt = addSelfIntroduction() + addCurrentDate() + prompt;
      return prompt;
    },
    after: null,
    // tools: ['get_weather']
  },
  {
    name: "summarize-bullets",
    template: `Summarize in 3 bullet points that provide key takeaways and bold topics phrases.
      
      {article}`,
    after: null,
    // tools: ['get_weather']

  },
  {
    name: "remember-user",
    after: null,
    template: `
Your task is to identify and extract factual memories about the user from their messages. 
Focus on extracting factual, biographical details that would be useful for future interactions.

1. **Analyze the user's message** for personal information
2. **Extract facts** in the following categories:
   - **Personal Identity**: Name, age, pronouns, family members
   - **Location**: Where they live, work, or are from (city, state, country)
   - **Professional**: Job title, company, industry, career goals
   - **Interests & Hobbies**: Activities they enjoy, sports, entertainment preferences
   - **Lifestyle**: Living situation, pets, relationships, habits
   - **Goals & Aspirations**: What they're working toward or want to achieve
   - **Preferences**: Likes, dislikes, opinions on topics
   - **Background**: Education, experiences, skills

3. **Format each extracted fact** as a clear, standalone statement
4. **Assign an importance level** (1-5) where:
   - 5 = Core identity (name, location, job)
   - 4 = Important personal details (family, major interests)
   - 3 = Moderate relevance (preferences, experiences)
   - 2 = Minor details (casual mentions)
   - 1 = Low relevance (temporary states)

## Output Format:
Return a JSON object with an array of extracted facts:
{
  "facts": [
    {
      "fact": "Clear statement about the user",
      "category": "One of the categories above",
      "importance": 1-5,
      "source": "Brief quote from user's message"
    }
  ]
}
## Guidelines:
- Only extract **explicitly stated** information - do not infer or assume
- Use the user's exact words when possible
- Focus on facts that would be useful for personalization
- Ignore temporary states unless they indicate lasting preferences
- Don't extract information that seems private or sensitive unless clearly shared

## Example:

**User Message**: "Hi, I'm Sarah and I work as a software engineer in Seattle.
 I love hiking and have two cats named Luna and Max."

**Output**:
{
  "facts": [
    {
      "fact": "User's name is Sarah",
      "category": "Personal Identity",
      "importance": 5,
      "source": "I'm Sarah"
    },
    {
      "fact": "User works as a software engineer",
      "category": "Professional",
      "importance": 5,
      "source": "I work as a software engineer"
    },
    {
      "fact": "User lives in Seattle",
      "category": "Location",
      "importance": 5,
      "source": "in Seattle"
    },
    {
      "fact": "User has two cats named Luna and Max",
      "category": "Lifestyle",
      "importance": 3,
      "source": "have two cats named Luna and Max"
    }
  ]
}
Summarize the following messages and chat history and extract relevant memory facts.

Chat history:
{chat_history}

User message:
{query}`
  },
  {
    name: "summarize",
    template: `As a professional summarizer, create a concise and comprehensive summary of the
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
    after: null,
  },
  {
    name: "suggest-followups",
    template: `
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

    User query:
    {query}
    Article:
    {article}
    `,
    after: (content, options = {}) =>
      content && extractJSONFromLanguageReply(content, "suggestions")
        ?.slice(0, options?.MAX_FOLLOWUP_QUESTIONS || 4)
        // ensure the question ends with a question mark or a period
        ?.map(q => (q.includes("?") || q.endsWith(".")) ? q : q + "?")
        // remove all asterisks like bold text
        ?.map(q => q.replaceAll("*", ""))
  },
  {
    name: "answer-cite-sources",
    template: `
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
  of the conversation with the user. 
  <context>
  {context}
  </context>
  Chat History: 
  {chat_history}
  User Query: {query}
    `,
    before: (prompt, params) => {
      prompt += addCurrentDate();
      return prompt;
    },
    after: null,
  },

  {
    name: "query-resolution",
    template: `You will be given a conversation history and a follow-up question.

      Your task is to rephrase user's question so that it becomes a
       clearer question with correct keyphrases in context of the conversation history. For example:
      Plan how to deeply research the question by breaking it into logical steps and provide one or multiple
      keyword phrases and questions in <question> </question> tags that need to be searched online.

      Instructions:
      - Provide the rephrased question(s) between the XML tags <question> and </question>.
      - Ensure the standalone question includes all necessary context from the conversation history.
      - If the follow-up question is already standalone, return it as is.
      - If the conversation history does not provide enough information to construct a standalone question, ask for clarification.
      - Preserve the original intent and sentiment
      - if multiple query steps are needed, provide all the query steps in <questions> </questions> tags.
    
    Example:
    1. Follow up question: What is the capital of France?
    Rephrased: 
    <question>Capital of france</question>
    
    2. Follow up question: What is the population of New York City?
    Rephrased: 
    <question>Population of New York City</question>
    
    3. Follow up question: What is Docker?
    Rephrased: 
    <question>What is Docker</question>
    
    Conversation:
    {chat_history}

    User query: {query}`,
    after: (content) => extractJSONFromLanguageReply(content, "question")
  },

  {
    name: "knowledge-graph-nodes",
    template: `
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
    after: null,
  },

  {
    name: "summary-longtext",
    template: `
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
    after: null,
  },
  {
    name: "results-relevance-filter",
    template: `
      You are an AI research assistant. From the following list of search results, choose the most relevant URLs for the query:  
**"{user_query}"**

Evaluate relevance by semantic similarity and keyword alignment. Rephrase the query to make it more specific and relevant to the search results. Return 3–5 links with a short justification.
{results}

    `,
    after: null,
  }
];



/**
* Extracts and cleans content between XML-style tags and returns a JSON object.
* @param {string} text - Input text to parse
* @param {string} [key='questions'] - Tag name to look for
* @category Generate
* @returns {Object[]} Array of objects containing cleaned content items
*/
export function extractJSONFromLanguageReply(text, key = null) {
  // Return empty string for invalid input
  if (!text || typeof text !== 'string') {
    return '';
  }

  //convert &lt; to < >
  text = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">")

  //if no key is provided, return all the lines that start with a number or a bullet point
  if (!key) {
    const lines = text.split('\n').filter(line => /^\d+[.)]\s*|\s*[-*•]\s/.test(line)).map(line => line.replace(/^\s*[-*•]|\d+[.)]\s*|[\u2022]\s*/g, ''));
    return lines;
  }

  // Find content between tags
  let startTag = `<${key}>`;
  let endTag = `</${key}>`;

  // Find all instances of content between tags
  let results = [];
  let currentIndex = 0;

  while (true) {
    const startIndex = text.indexOf(startTag, currentIndex);
    if (startIndex === -1) break;

    const endIndex = text.indexOf(endTag, startIndex);
    if (endIndex === -1) break;

    const contentStartIndex = startIndex + startTag.length;
    const content = text.slice(contentStartIndex, endIndex).trim();
    results.push(content);

    currentIndex = endIndex + endTag.length;
  }

  // Remove list markers and clean whitespace
  return results?.join('\n')
    .split('\n')
    .map(line => line.replace(/^\s*[-*•]|\d+[.)]\s*|[\u2022]\s*/gm, '').trim())
    .filter(line => line) || []
}

function addCurrentDate() {
  return `Today's date is ${new Date().toISOString()}. `;
}

function addSelfIntroduction() {
  return `You are a helpful assistant that can answer questions and search the web to provide information.`;
}