import { Client } from '@hey-api/client-fetch';
import { Options as Options_2 } from '@hey-api/client-fetch';
import { RequestResult } from '@hey-api/client-fetch';
import { TDataShape } from '@hey-api/client-fetch';

export declare type ClientOptions = {
    baseUrl: `${string}://${string}` | (string & {});
};

/**
 * ## Extract structured content and cite from any URL
 * ![Extractor](https://i.imgur.com/nNfHmct.png)
 *
 * ### 🚜📜 Tractor the Text Extractor
 * 1. Main Content Detection: Extract the main content from a URL by combining
 * Mozilla Readability and Postlight Mercury algorithms, utilizing over 100
 * custom adapters for major sites for article, author, date HTML classes.
 * 2. Basic HTML Standardization: Transform complex HTML into a simplified
 * reading-mode format of basic HTML, making it ideal for research note archival
 * and focused reading, with headings, images and links.
 * 3. YouTube Transcript Processing: When a YouTube video URL is detected,
 * retrieve the complete video transcript including both manual captions and
 * auto-generated subtitles, maintaining proper timestamp synchronization and
 * speaker identification where available.
 * 4. PDF to HTML: Process PDF documents by extracting
 * formatted text while intelligently handling line breaks, page headers,
 * footnotes. The system analyzes text height statistics to automatically
 * infer heading levels, creating a properly structured document hierarchy
 * based on standard deviation from mean text size.
 * 5. Citation Information Extraction: Identify and extract citation metadata
 * including author names, publication dates, sources, and titles using HTML
 * meta tags and common class name patterns. The system validates author names
 * against a comprehensive database of 90,000 first and last names,
 * distinguishing between personal and organizational authors to properly
 * format citations.
 * 6. Author Name Formatting: Process author names by checking against
 * known name databases, handling affixes and titles correctly, and determining
 * whether to reverse the name order based on whether it's a personal or
 * organizational author, ensuring proper citation formatting.
 *
 */
export declare const extractContent: <ThrowOnError extends boolean = false>(options: Options<ExtractContentData, ThrowOnError>) => RequestResult<ExtractContentResponses, ExtractContentErrors, ThrowOnError, "fields">;

export declare type ExtractContentData = {
    body?: never;
    path?: never;
    query: {
        /**
         * URL to extract content from (supports articles, PDFs, YouTube)
         */
        url: string;
        /**
         * Include images in output (default true)
         */
        images?: boolean;
        /**
         * Include hyperlinks in output (default true)
         */
        links?: boolean;
        /**
         * Preserve text formatting (default true)
         */
        formatting?: boolean;
        /**
         * Convert relative URLs to absolute (default true)
         */
        absoluteURLs?: boolean;
        /**
         * HTTP request timeout in seconds (default 5)
         */
        timeout?: number;
    };
    url: '/extract';
};

export declare type ExtractContentError = ExtractContentErrors[keyof ExtractContentErrors];

export declare type ExtractContentErrors = {
    /**
     * Server error or missing URL parameter
     */
    500: {
        /**
         * Error message
         */
        error?: string;
    };
};

export declare type ExtractContentResponse = ExtractContentResponses[keyof ExtractContentResponses];

export declare type ExtractContentResponses = {
    /**
     * Structured content extraction result
     */
    200: {
        /**
         * Article/video title
         */
        title: string;
        /**
         * Simplified HTML content with standardized structure
         */
        html: string;
        /**
         * APA citation with Last, First Initial format
         */
        cite: string;
        /**
         * Author name in Last, First Middle format
         */
        author_cite?: string;
        /**
         * Author surname only
         */
        author_short?: string;
        /**
         * Type of authorship
         */
        author_type?: 'single' | 'two-author' | 'more-than-two' | 'organization';
        /**
         * Original author string from source
         */
        author?: string;
        /**
         * Publication date in YYYY-MM-DD format
         */
        date?: string;
        /**
         * Publishing organization/site name
         */
        source?: string;
        /**
         * Clean text word count excluding HTML
         */
        word_count: number;
        /**
         * Canonical URL of the resource
         */
        url: string;
    };
};

export declare type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = Options_2<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * ## Search the web
 * ![AILogo](https://i.imgur.com/yYMTcTX.png)
 *
 * Search the web by sending a query via SearXNG metasearch engine of 100+ sources.
 * You can specify the type of content you want—such as general web results,
 * news articles, videos, images, science topics, files, or IT-related
 * information—by choosing the appropriate category.
 * Additional filters let you narrow results by recency (like results
 * from the past day, week, month, or year), language, and page number.
 * The API returns a structured list of results, each including a title, URL, snippet, domain, and other useful details, making it easy to display or analyze the information. This flexible and robust search tool is ideal for apps, research projects, and any situation where up-to-date, diverse web data is needed.
 * [Searxng Overview](https://medium.com/@elmo92/search-in-peace-with-searxng-an-alternative-search-engine-that-keeps-your-searches-private-accd8cddd6fc)
 *
 * **Web Search Stats**:
 * Google processses 90% of Web Search, 13.6 billion searches every day—almost 5 trillion per year.
 * Its search index exceeds 100,000,000 GB and covers 130 trillion pages.
 * Ranking uses over 200 factors, including keyword relevance, backlinks, page speed, and user experience; the top organic result gets about 22% of clicks, and ads allow monetizing keyword traffic.
 *
 */
export declare const searchWeb: <ThrowOnError extends boolean = false>(options: Options<SearchWebData, ThrowOnError>) => RequestResult<SearchWebResponses, SearchWebErrors, ThrowOnError, "fields">;

export declare type SearchWebData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Search query string
         */
        q: string;
        /**
         * Category - general, news, videos, images, science, files, it
         */
        cat?: 'general' | 'news' | 'videos' | 'images' | 'science' | 'files' | 'it';
        /**
         * Recency filter - filter results by time period
         */
        recency?: 'none' | 'day' | 'week' | 'month' | 'year';
        /**
         * Use public server instances (optional)
         */
        public?: boolean;
        /**
         * Pagination for results (optional)
         */
        page?: number;
        /**
         * Language
         */
        lang?: string;
    };
    url: '/search';
};

export declare type SearchWebError = SearchWebErrors[keyof SearchWebErrors];

export declare type SearchWebErrors = {
    /**
     * Missing required query parameter `q`
     */
    400: {
        error?: string;
    };
    /**
     * Server error when fetching search results
     */
    500: {
        error?: string;
    };
};

export declare type SearchWebResponse = SearchWebResponses[keyof SearchWebResponses];

export declare type SearchWebResponses = {
    /**
     * A list of search results
     */
    200: {
        results?: Array<{
            /**
             * Title of the search result
             */
            title?: string;
            /**
             * URL of the search result
             */
            url?: string;
            /**
             * Snippet of the text around the query
             */
            snippet?: string;
            /**
             * Domain of the search result
             */
            domain?: string;
            /**
             * Favicon of the search result
             */
            favicon?: string;
            /**
             * Path of the search result
             */
            path?: string;
            /**
             * Engines used to find the search result
             */
            engines?: Array<unknown>;
        }>;
    };
};

export declare type User = {
    /**
     * User supplied username
     */
    username?: string;
    /**
     * User email address
     */
    email?: string;
    /**
     * User password, MUST contain a mix of upper and lower case letters, as well as digits
     */
    password?: string;
};

/**
 * ## Generate language model reply using agent prompts
 *
 * - ❓ **Inputs**: 👄 Language Intelligence Provider, 🔑 API Key,  🤖 agent template name, 🧠 model name and options,
 * and 🆎 context variables for that agent
 * - 🤖 **Agent Instruction Templates**: [LangHub](https://smith.langchain.com/hub) template or custom:
 * question(query, chat_history), summarize-bullets(article), summarize(article),
 * suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
 * query-resolution(chat_history, query), knowledge-graph-nodes(query, article),
 * summary-longtext(summaries)
 * - 🧠 **How Language Models Work**: Language models learn from billions of text examples to
 * identify statistical patterns and structures across diverse sources, converting words into
 * high-dimensional vectors—numerical lists that capture meaning and relationships between concepts.
 * These mathematical representations allow models to understand that "king/queen" share properties
 * and "Paris/France" mirrors "Tokyo/Japan" through their transformer architecture, a neural network
 * backbone that processes information through multiple layers of analysis. The attention mechanism
 * enables the system to dynamically focus on relevant parts of input text when generating each word,
 * maintaining context like humans tracking conversation threads, while calculating probability scores
 * across the entire vocabulary for each word position based on processed context. Rather than retrieving
 * stored responses, models create novel text by selecting the most probable words given learned
 * patterns, maintaining coherence across long passages while adapting to specific prompt nuances
 * through deep pattern recognition.
 * **Self-Attention**: Each word creates three representations: Query (what it's looking for), Key (what
 * it offers), and Value (its actual content). For example, in "The cat sat on the mat," the word "cat"
 * has a Query vector that searches for actions, a Key vector that advertises itself as a subject, and
 * a Value vector containing its semantic meaning as an animal. The attention mechanism calculates how
 * much "cat" should focus on other words by comparing its Query with their Keys - finding high
 * similarity with "sat" (the action) - then combines the corresponding Value vectors to create a
 * contextualized representation where "cat" now understands it's the one doing the sitting.
 *
 * - 📚 **Learning Resources**:
 * [LLM Training Example](https://github.com/vtempest/ai-research-agent/blob/master/packages/neural-net/src/train/predict-next-word.js),
 * [LangChain ReactAgent Tools](https://medium.com/@terrycho/how-langchain-agent-works-internally-trace-by-using-langsmith-df23766e7fb4),
 * [Hugging Face Tutorials](https://huggingface.co/learn), [OpenAI Cookbook](https://cookbook.openai.com),
 * [Transformer Overview](https://jalammar.github.io/illustrated-transformer/),
 * [Building Transformer Guide](https://www.datacamp.com/tutorial/building-a-transformer-with-py-torch),
 * [PyTorch Overview](https://www.learnpytorch.io/pytorch_cheatsheet/)
 *
 * ### 👄  Language Intelligence Providers (LIPs)
 *
 * | 👄 Provider | 🤖 Model Families | 📚 Docs | 🔑 Keys | 💰 Valuation | 💸 Revenue (2024) | 💲 Cost (1M Output) |
 * | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
 * | **XAI** | Grok, Grok Vision | [Docs](https://docs.x.ai/docs#models) | [Keys](https://console.x.ai/) | \$80B | \$100M | \$15.00 |
 * | **Groq** | Llama, DeepSeek, Gemini, Mistral | [Docs](https://console.groq.com/docs/overview) | [Keys](https://console.groq.com/keys) | \$2.8B | - | \$0.79 |
 * | **Ollama** | llama, mistral, mixtral, vicuna, gemma, qwen, deepseek, openchat, openhermes, codelama, codegemma, llava, minicpm, wizardcoder, wizardmath, meditrion, falcon | [Docs](https://ollama.com/docs) | [Keys](https://ollama.com/settings/keys) | - | \$3.2M | \$0 |
 * | **OpenAI** | o1, o1-mini, o4, o4-mini, gpt-4, gpt-4-turbo, gpt-4-omni | [Docs](https://platform.openai.com/docs/overview) | [Keys](https://platform.openai.com/api-keys) | \$300B | \$3.7B | \$8.00 |
 * | **Anthropic** | Claude Sonnet, Claude Opus, Claude Haiku | [Docs](https://docs.anthropic.com/en/docs/welcome) | [Keys](https://console.anthropic.com/settings/keys) | \$61.5B | \$1B | \$15.00 |
 * | **TogetherAI** | Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena | [Docs](https://docs.together.ai/docs/quickstart) | [Keys](https://api.together.xyz/settings/api-keys) | \$3.3B | \$50M | \$0.90 |
 * | **Perplexity** | Sonar, Sonar Deep Research | [Docs](https://docs.perplexity.ai/models/model-cards) | [Keys](https://www.perplexity.ai/account/api/keys) | \$18B | \$20M | \$15.00 |
 * | **Cloudflare** | Llama, Gemma, Mistral, Phi, Qwen, DeepSeek, Hermes, SQL Coder, Code Llama | [Docs](https://developers.cloudflare.com/workers-ai/) | [Keys](https://dash.cloudflare.com/profile/api-tokens) | \$62.3B | \$1.67B | \$2.25 |
 * | **Google** | Gemini | [Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) | [Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys) | - | ~$400M | \$10.00 |
 *
 * ![agent_arch_viz](https://i.imgur.com/bailW5n.gif)
 * ![agent_arch_viz2](https://i.imgur.com/uW6E9VJ.gif)
 *
 */
export declare const writeLanguage: <ThrowOnError extends boolean = false>(options: Options<WriteLanguageData, ThrowOnError>) => RequestResult<WriteLanguageResponses, WriteLanguageErrors, ThrowOnError, "fields">;

export declare type WriteLanguageData = {
    body: {
        /**
         * 🤖 Agent name -  [LangHub](https://smith.langchain.com/hub) template or custom:
         * question(query, chat_history), summarize-bullets(article), summarize(article),
         * suggest-followups(chat_history, article) : string[], answer-cite-sources(context, chat_history, query),
         * query-resolution(chat_history, query), knowledge-graph-nodes(query, article),
         * summary-longtext(summaries)
         *
         */
        agent?: 'question' | 'summarize-bullets' | 'summarize' | 'suggest-followups' | 'answer-cite-sources' | 'query-resolution' | 'knowledge-graph-nodes' | 'summary-longtext';
        /**
         * 👄 LIPs Language Intelligence Providers
         */
        provider: 'groq' | 'openai' | 'anthropic' | 'together' | 'xai' | 'google' | 'perplexity' | 'ollama' | 'cloudflare';
        /**
         * 🔑 API key you provide for 👄 Language Intelligence Provider
         */
        key?: string;
        /**
         * 🤖 Model name for 👄 Language Intelligence Provider, leave blank for default
         */
        model?: 'dall-e-3' | 'whisper-1' | 'sora-video-gen' | 'palm2' | 'tii-falcon-40b' | 'cohere-command-rplus' | 'sonar-pro' | 'sonar' | 'sonar-reasoning-pro' | 'sonar-reasoning' | 'sonar-deep-research' | 'llama-3.1-sonar-small-128k-online' | 'llama-3.1-sonar-large-128k-online' | 'llama-3.1-sonar-huge-128k-online' | 'deepseek-r1-distill-llama-70b' | 'meta-llama/llama-4-maverick-17b-128e-instruct' | 'meta-llama/llama-4-scout-17b-16e-instruct' | 'llama-3.3-70b-versatile' | 'llama-3.3-70b-specdec' | 'llama-3.2-3b-preview' | 'llama-3.2-11b-vision-preview' | 'llama-3.2-90b-vision-preview' | 'llama-3.1-70b-versatile' | 'llama-3.1-8b-instant' | 'mixtral-8x7b-32768' | 'gemma2-9b-it' | 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-4' | 'gpt-3.5-turbo' | 'claude-opus-4-20250514' | 'claude-sonnet-4-20250514' | 'claude-sonnet-4-20250514-1106' | 'claude-3-7-sonnet-20250219' | 'claude-3-5-sonnet-20241022' | 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307' | 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo' | 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo' | 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo' | 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo' | 'meta-llama/Meta-Llama-3-70B-Instruct-Turbo' | 'meta-llama/Llama-3.2-3B-Instruct-Turbo' | 'meta-llama/Meta-Llama-3-8B-Instruct-Lite' | 'meta-llama/Meta-Llama-3-70B-Instruct-Lite' | 'meta-llama/Llama-3-8b-chat-hf' | 'meta-llama/Llama-3-70b-chat-hf' | 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF' | 'Qwen/Qwen2.5-Coder-32B-Instruct' | 'microsoft/WizardLM-2-8x22B' | 'google/gemma-2-27b-it' | 'google/gemma-2-9b-it' | 'databricks/dbrx-instruct' | 'deepseek-ai/deepseek-llm-67b-chat' | 'google/gemma-2b-it' | 'Gryphe/MythoMax-L2-13b' | 'meta-llama/Llama-2-13b-chat-hf' | 'mistralai/Mistral-7B-Instruct-v0.1' | 'mistralai/Mistral-7B-Instruct-v0.2' | 'mistralai/Mistral-7B-Instruct-v0.3' | 'mistralai/Mixtral-8x7B-Instruct-v0.1' | 'mistralai/Mixtral-8x22B-Instruct-v0.1' | 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO' | 'Qwen/Qwen2.5-7B-Instruct-Turbo' | 'Qwen/Qwen2.5-72B-Instruct-Turbo' | 'Qwen/Qwen2-72B-Instruct' | 'togethercomputer/StripedHyena-Nous-7B' | 'upstage/SOLAR-10.7B-Instruct-v1.0' | 'meta-llama/Llama-Vision-Free' | 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo' | 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo' | 'grok-beta' | 'grok-vision-beta' | 'gemini-2.5-pro-preview-05-06' | 'gemini-2.5-flash-preview-04-17' | 'gemini-2.0-flash-001' | 'gemini-2.0-flash-lite-001' | 'gemini-2.0-flash-live-preview-04-09' | 'imagen-3.0-generate-002' | 'imagen-3.0-fast-generate-001' | 'meta-llama/Llama-3.3-70B' | 'gemma-3' | 'gemma-2' | 'gemma';
        /**
         * 📄 Format of response. true=HTML, false=Markdown
         */
        html?: boolean;
        /**
         * 🔥 Controls response predictability:
         * - 0 to 1.0: 🎯 More deterministic, predictable responses
         * - 1.0 to 2.0: 🎨 More creative, varied responses
         *
         */
        temperature?: number;
        /**
         * (context for some agents) Use query to answer
         */
        query?: string;
        /**
         * (context for some agents) Chat history
         */
        chat_history?: string;
        /**
         * (context for some agents) Article to summarize
         */
        article?: string;
    };
    path?: never;
    query?: never;
    url: '/agents';
};

export declare type WriteLanguageError = WriteLanguageErrors[keyof WriteLanguageErrors];

export declare type WriteLanguageErrors = {
    /**
     * Server error or missing prompt parameter
     */
    500: {
        /**
         * Error message
         */
        error?: string;
    };
};

export declare type WriteLanguageResponse = WriteLanguageResponses[keyof WriteLanguageResponses];

export declare type WriteLanguageResponses = {
    /**
     * Generated language model response (in HTML or Markdown)
     */
    200: {
        /**
         * Generated language model response (in HTML or Markdown)
         */
        content?: string;
        /**
         * Structured JSON extract from response, in some agents
         */
        extact?: {
            [key: string]: unknown;
        };
    };
};

export { }
