export type UserType = Partial<{
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: number | null; // Unix timestamp in ms, or null if not verified
    image: string | null;
    subscription: number; // 0 by default
    isAdmin: boolean; // false by default
    createdAt: number; // Unix timestamp in ms
    apiKey: string;
    modifiedAt: number; // Unix timestamp in ms
    settings: {
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
      ShowURLPath: boolean;
      ShowHeadings: boolean;
      enableQueryExpansion: boolean;
      numberTopResultToExtract: number;
    }
  }>;


export  interface OAuthUserInfoType
    extends Partial<{
      email: string;
      name: string;
      picture: string;
      providerUserId: string;
      sub: string;
      email_verified: boolean;
    }> {}