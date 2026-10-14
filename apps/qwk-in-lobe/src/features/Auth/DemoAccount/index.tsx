'use client';

import { Flexbox, Icon } from '@lobehub/ui';
import { Button, Divider, Text, toast } from '@lobehub/ui/base-ui';
import { UserRound } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { sanitizeRedirectPath } from '@/utils/onboardingRedirect';

import { startDemoSession } from './startDemoSession';

/**
 * "Continue with demo account": skips account creation by starting a private
 * guest session (see `plugins/guest-session.ts`), then opens the app.
 * Callers render it only when `serverConfig.enableDemoAccount` is on (the
 * server sets it unless `AUTH_DISABLE_DEMO_ACCOUNT=1`).
 */
const DemoAccountButton = () => {
  const { t } = useTranslation('auth');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await startDemoSession();
      // The callback targets the main app, outside this auth SPA — full page load required
      window.location.href = sanitizeRedirectPath(
        new URLSearchParams(window.location.search).get('callbackUrl'),
      );
    } catch (error) {
      console.error('[demo-account] failed to start a demo session:', error);
      toast.error(t('betterAuth.demo.error'));
      setLoading(false);
    }
  };

  return (
    <Flexbox gap={8}>
      <Button
        block
        icon={<Icon icon={UserRound} />}
        loading={loading}
        size="large"
        type="primary"
        onClick={handleClick}
      >
        {t('betterAuth.demo.continue')}
      </Button>
      <Text align={'center'} fontSize={12} type={'secondary'}>
        {t('betterAuth.demo.hint')}
      </Text>
      <Divider style={{ marginBlock: 8 }}>
        <Text fontSize={12} type={'secondary'}>
          {t('betterAuth.signin.orContinueWith')}
        </Text>
      </Divider>
    </Flexbox>
  );
};

export default DemoAccountButton;
