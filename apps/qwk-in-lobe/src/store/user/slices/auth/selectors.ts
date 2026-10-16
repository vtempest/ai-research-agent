import { type UserStore } from '@/store/user';

export const authSelectors = {
  isLoaded: (s: UserStore) => s.isLoaded,
  isLogin: (s: UserStore) => s.isSignedIn,
  isLoginWithAuth: (s: UserStore) => s.isSignedIn,
};
