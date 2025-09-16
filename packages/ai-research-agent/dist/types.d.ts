export declare interface AgentPromptType
extends Partial<{
    prompt: string;
    context: string;
    tools: string[];
    variablesNotProvided: any[];
    error: string;
}> {}

export declare interface ArticleType
extends Partial<{
    url: string;
    title: string;
    html: string;
    cite: string;
    author: string;
    author_cite: string;
    author_type: string;
    date: string;
    source: string;
    word_count: number;
    error: string;
}> {}

export declare interface SearchResultType
extends Partial<{
    url: string;
    title: string;
    snippet: string;
    score: string;
    domain: string;
    favicon: string;
    source: string;
}> {}

export { }
