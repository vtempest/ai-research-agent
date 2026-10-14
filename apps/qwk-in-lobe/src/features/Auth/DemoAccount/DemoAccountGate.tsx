'use client';

import { Center } from '@lobehub/ui';
import { Spin } from '@lobehub/ui/base-ui';
import { type ReactNode, useEffect, useState } from 'react';

import { sanitizeRedirectPath } from '@/utils/onboardingRedirect';

import { startDemoSession } from './startDemoSession';

const AUTH_PAGES = ['/signin', '/signup'];

const resolveTarget = () => {
  const target = sanitizeRedirectPath(
    new URLSearchParams(window.location.search).get('callbackUrl'),
  );
  return AUTH_PAGES.some((page) => target === page || target.startsWith(`${page}?`)) ? '/' : target;
};

/**
 * Replaces the sign-in / sign-up screen while the demo account is on: starts a
 * guest session (keeping any existing one) and opens the app. The Worker does
 * the same on a full page load (`resolveDemoBypass`); this covers in-app
 * navigation to these routes. If the demo session cannot be started, the
 * original screen (`fallback`) is shown.
 */
const DemoAccountGate = ({ fallback }: { fallback: ReactNode }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    startDemoSession()
      .then(() => {
        // The target is the main app, outside this auth SPA — full page load required
        if (!cancelled) window.location.replace(resolveTarget());
      })
      .catch((error) => {
        console.error('[demo-account] failed to start a demo session:', error);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return fallback;

  return (
    <Center height={240} width={'100%'}>
      <Spin />
    </Center>
  );
};

export default DemoAccountGate;
