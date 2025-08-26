import type {
  AgentPromptType,
  SearchResultType,
} from "ai-research-agent";
import type * as schema from "$lib/server/schema";

declare global {
  type SearchResult = SearchResultType;
  type AgentPrompt = AgentPromptType;
    
  type Article = typeof schema.articles.$inferSelect;
  type Message = typeof schema.messages.$inferSelect;
  type Chat = typeof schema.chats.$inferSelect;
  type File = typeof schema.files.$inferSelect;
  type Team = typeof schema.teams.$inferSelect;
  type User = typeof schema.users.$inferSelect & {
    settings: UserSettings;
  };
  type Session = typeof schema.sessions.$inferSelect;
  type Account = typeof schema.accounts.$inferSelect;
  type VerificationToken = typeof schema.verificationTokens.$inferSelect;

  type UserSettings = Partial<{
    provider: string;
    model: string;
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    providerApiKeys: Array<{
      provider: string;
      key: string;
    }>;
    theme: string;
    language: string;
    fontSize: number;
    fontFamily: string;
    searchEngines: Array<{
      name: string;
      status: string;
    }>;
    searchEngineDefault: string;
    OpenFirstResultInBackgroundTab: boolean;
    OpenFirstResultInSameTab: boolean;
    AutoSummarize: boolean;
    showURLPath: boolean;
    showHeadings: boolean;
    enableQueryExpansion: boolean;
    numberTopResultToExtract: number;
  }>;
  
  namespace App {
    interface Locals {
      db: Database;
      user: User | null;
    }
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
  
  interface Response {
    isLoading?: boolean;
    error?: string;
  }

  interface Window {
    appDockClickOnHover: Timeout | null;
    find(
      SearchString: string,
      CaseSensitive: boolean,
      Backwards: boolean,
      WrapAround: boolean,
      WholeWord: boolean,
      SearchInFrames: boolean,
      ShowDialog: boolean
    ): boolean;
  }
}

export {};
