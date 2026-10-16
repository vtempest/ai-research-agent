import { type LobeUser } from '@/types/user';

export interface UserAuthState {
  /** Whether the current local cache identity has been authoritatively selected. */
  isIdentityResolved?: boolean;
  isLoaded?: boolean;
  isSignedIn?: boolean;
  user?: LobeUser;
}

export const initialAuthState: UserAuthState = {};
