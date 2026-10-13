'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Text } from '@lobehub/ui/base-ui';
import { createStaticStyles } from 'antd-style';
import { KeyRoundIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { isGuestEmail } from '@/libs/better-auth/guestEmail';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

import { createGuestKeyModal } from './createGuestKeyModal';
import { guestOpenRouterSelectors, useGuestOpenRouterStore } from './store';

export const GUEST_DEMO_PATH = '/demo';

const styles = createStaticStyles(({ css, cssVar }) => ({
  banner: css`
    padding-block: 12px;
    padding-inline: 16px;
    border: 1px solid ${cssVar.colorWarningBorder};
    border-radius: ${cssVar.borderRadiusLG};
    background: ${cssVar.colorWarningBg};
  `,
}));

/**
 * Shown to visitors without an account of their own. A guest has no server-side key
 * vault, so chatting in the demo needs their own OpenRouter key; this banner
 * asks for one and points at the guest chat once it is set.
 */
const GuestKeyBanner = () => {
  const { t } = useTranslation('qwksearch');
  const navigate = useNavigate();
  const isLoaded = useUserStore(authSelectors.isLoaded);
  const isLogin = useUserStore(authSelectors.isLogin);
  // Visitors are given a guest account automatically, so "signed in" alone
  // does not mean they have an account of their own.
  const isGuest = useUserStore((s) => isGuestEmail(userProfileSelectors.email(s)));
  const hasKey = useGuestOpenRouterStore(guestOpenRouterSelectors.hasKey);

  if (!isLoaded || (isLogin && !isGuest)) return null;

  const openDemo = () => navigate(GUEST_DEMO_PATH);

  return (
    <Flexbox
      horizontal
      align={'center'}
      className={styles.banner}
      gap={12}
      justify={'space-between'}
      wrap={'wrap'}
    >
      <Flexbox horizontal align={'center'} gap={10}>
        <KeyRoundIcon size={18} />
        <Text>{hasKey ? t('guestKey.banner.ready') : t('guestKey.banner.missing')}</Text>
      </Flexbox>
      <Flexbox horizontal gap={8}>
        {hasKey ? (
          <>
            <Button size={'small'} onClick={() => createGuestKeyModal()}>
              {t('guestKey.actions.manage')}
            </Button>
            <Button size={'small'} type={'primary'} onClick={openDemo}>
              {t('guestKey.banner.open')}
            </Button>
          </>
        ) : (
          <Button size={'small'} type={'primary'} onClick={() => createGuestKeyModal(openDemo)}>
            {t('guestKey.actions.add')}
          </Button>
        )}
      </Flexbox>
    </Flexbox>
  );
};

export default GuestKeyBanner;
