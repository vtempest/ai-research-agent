import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useUserStore } from '@/store/user';

afterEach(() => {
  // Reset store state
  useUserStore.setState({
    isSignedIn: false,
    user: undefined,
  });
});

describe('createAuthSlice', () => {
  describe('logout', () => {
    it('clears the user and signed-in flag', async () => {
      const { result } = renderHook(() => useUserStore());

      useUserStore.setState({ isSignedIn: true, user: { id: 'user-1' } });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.isSignedIn).toBe(false);
      expect(result.current.user).toBeUndefined();
    });
  });
});
