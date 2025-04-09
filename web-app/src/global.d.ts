declare global {
  namespace App {
    interface Session {
      user: User | null;
      id: string;
    }

    interface PageData {
      flash?: FlashMessage;
    }

    interface User {
      token: string;
      email: string;
      username: string;
      name: string;
      id: string;
      isVerified: boolean;
      isAdmin: boolean;
    }

    interface FlashMessage {
      status: string;
      text: string;
    }

    interface Locals {
      db: Database;
      user: User | null;
      session: Session | null;
    }
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
  /**
   * @private
   */
  namespace Superforms {
    type Message = FlashMessage;
  }

  interface Window {
    appDockClickOnHover: Timeout | any;
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

  interface SearchResult
    extends Partial<{
      url: string;
      title: string;
      snippet: string;
      score: string;
      domain: string;
      favicon: string;
    }> {}

  interface Article
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

  interface AgentPrompt
    extends Partial<{
      prompt: string;
      context: string;
      tools: string[];
      variablesNotProvided: any[];
      error: string;
    }> {}

  interface Error 
  extends Partial<{
    error: string;
    message: string;
  }> {}

  interface OAuthUserInfo
    extends Partial<{
      email: string;
      name: string;
      picture: string;
      providerUserId: string;
      sub: string;
      email_verified: boolean;
    }> {}
  }

export {};
