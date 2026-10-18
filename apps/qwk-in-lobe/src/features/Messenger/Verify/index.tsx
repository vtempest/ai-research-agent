'use client';

import { Flexbox } from '@lobehub/ui';
import { Button } from '@lobehub/ui/base-ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import useSWR from 'swr';

import Loading from '@/components/Loading/BrandTextLoading';
import { messengerKeys } from '@/libs/swr/keys';
import { messengerService } from '@/services/messenger';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

import { type MessengerPlatform } from '../constants';
import { getMessengerErrorMessage } from '../i18n';
import Body from './Body';
import { Heading, IconRow, styles } from './Body/shared';

const isSupportedPlatform = (value: string): value is MessengerPlatform =>
  value === 'telegram' || value === 'slack' || value === 'discord';

const MessengerVerifyPage = memo(() => {
  const { t } = useTranslation('messenger');
  const [searchParams] = useSearchParams();

  const randomId = searchParams.get('random_id') ?? '';
  const imType = searchParams.get('im_type') ?? '';
  const platform = isSupportedPlatform(imType) ? imType : null;

  // There is no sign-in: the local user's session is ready once the store loads.
  const sessionPending = !useUserStore(authSelectors.isLoaded);
  const isSignedIn = useUserStore(authSelectors.isLogin);
  const user = useUserStore(userProfileSelectors.userProfile);

  // Used in the success state to deep-link the user back to the bot.
  const platformsSWR = useSWR(messengerKeys.availablePlatforms(), () =>
    messengerService.availablePlatforms(),
  );

  const tokenSWR = useSWR(randomId && isSignedIn ? messengerKeys.peek(randomId) : null, async () =>
    messengerService.peekLinkToken(randomId),
  );

  const tokenStatus = tokenSWR.data?.status;
  const activeToken = tokenSWR.data?.status === 'active' ? tokenSWR.data : null;
  const consumedToken = tokenSWR.data?.status === 'consumed' ? tokenSWR.data : null;

  // Refresh-friendly: if the user already has a link for *this* (platform,
  // tenant) pair, skip the token flow entirely and jump to the success state.
  // Without this, refreshing the page after a successful link looks like an
  // expired-token error (the random_id token gets consumed on confirm).
  //
  // Scoping by tenant is critical for Slack multi-workspace: a user already
  // linked to workspace A must not short-circuit when verifying workspace B,
  // otherwise confirmLink for B never runs. We prefer the live token's
  // tenantId; if the token was already consumed we use the consumed-marker's
  // tenantId so the success state still scopes correctly. Falling back to
  // an unscoped (`__any__`) lookup is reserved for the genuine expired case.
  const tokenResolved = !tokenSWR.isLoading;
  const scopedTenantId = activeToken?.tenantId ?? consumedToken?.tenantId;
  const tokenScopeKey =
    tokenStatus === 'active' || tokenStatus === 'consumed' ? (scopedTenantId ?? '') : '__any__';
  const existingLinkSWR = useSWR(
    isSignedIn && tokenResolved && platform ? messengerKeys.myLink(platform, tokenScopeKey) : null,
    async () =>
      messengerService.getMyLink(
        platform!,
        tokenStatus === 'active' || tokenStatus === 'consumed' ? scopedTenantId : undefined,
      ),
  );

  if (!randomId) {
    return (
      <Flexbox align="center" className={styles.card} gap={24}>
        <Heading subtitle={t('verify.error.missingToken')} title={t('verify.error.title')} />
      </Flexbox>
    );
  }

  if (
    sessionPending ||
    // Wait for the token peek so the existing-link lookup below can scope by
    // tenantId (otherwise a Slack workspace-A link short-circuits workspace-B
    // verification). isSignedIn is required for tokenSWR to fire at all.
    (isSignedIn && tokenSWR.isLoading) ||
    existingLinkSWR.isLoading
  ) {
    return <Loading debugId="MessengerVerify" />;
  }

  // With a single local account there is no other account to switch to, so
  // the "switch account" action opens the messenger settings instead.
  const signInUrl = platform ? `/settings/messenger/${platform}` : '/settings/messenger';

  // Only reachable when the local user failed to load.
  if (!isSignedIn) {
    return (
      <Flexbox align="center" className={styles.card} gap={32}>
        {platform && <IconRow platform={platform} />}
        <Heading title={t('verify.error.title')} />
        <Button block size="large" type="primary" onClick={() => window.location.reload()}>
          {t('retry', { ns: 'common' })}
        </Button>
      </Flexbox>
    );
  }

  if (!platform) {
    return (
      <Flexbox align="center" className={styles.card} gap={24}>
        <Heading subtitle={t('verify.error.expired')} title={t('verify.error.title')} />
      </Flexbox>
    );
  }

  // No active token. Two sub-cases the user needs to tell apart:
  // - `consumed`: a previous confirmLink succeeded and burned the token.
  //   If the current account has the matching link, fall through to the
  //   body's success state (refresh-after-link). Otherwise the user is
  //   signed into a different LobeHub account than the one they linked
  //   with — surface the dedicated "alreadyConsumed" copy so they know
  //   the link did succeed (and they need to switch accounts).
  // - `expired`: TTL ran out before binding. Show the existing copy.
  if (!existingLinkSWR.data && tokenStatus !== 'active') {
    if (tokenSWR.error) {
      return (
        <Flexbox align="center" className={styles.card} gap={24}>
          <Heading
            subtitle={getMessengerErrorMessage(tokenSWR.error, t, 'verify.error.expired')}
            title={t('verify.error.title')}
          />
        </Flexbox>
      );
    }

    if (tokenStatus === 'consumed') {
      return (
        <Flexbox align="center" className={styles.card} gap={24}>
          <Heading
            subtitle={t('verify.error.alreadyConsumed')}
            title={t('verify.error.alreadyConsumedTitle')}
          />
        </Flexbox>
      );
    }

    return (
      <Flexbox align="center" className={styles.card} gap={24}>
        <Heading subtitle={t('verify.error.expired')} title={t('verify.error.title')} />
      </Flexbox>
    );
  }

  const platformMeta = platformsSWR.data?.find(
    (p) =>
      p.id ===
      (existingLinkSWR.data?.platform ??
        activeToken?.platform ??
        consumedToken?.platform ??
        platform),
  );
  const lobeAccount = user?.email || user?.fullName || user?.username || '';
  const userAvatar = user?.avatar || undefined;

  return (
    <Body
      existingLink={existingLinkSWR.data ?? null}
      lobeAccount={lobeAccount}
      platform={platform}
      platformMeta={platformMeta}
      randomId={randomId}
      signInUrl={signInUrl}
      tokenData={activeToken}
      userAvatar={userAvatar}
    />
  );
});

MessengerVerifyPage.displayName = 'MessengerVerifyPage';

export default MessengerVerifyPage;
