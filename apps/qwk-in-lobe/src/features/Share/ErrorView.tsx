'use client';

import { Center } from '@lobehub/ui';
import { TRPCClientError } from '@trpc/client';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import NotFound from '@/components/404';

interface ShareErrorViewProps {
  error: unknown;
}

const ShareErrorView = memo<ShareErrorViewProps>(({ error }) => {
  const { t } = useTranslation('chat');

  const trpcError = error instanceof TRPCClientError ? error : null;
  const errorCode = trpcError?.data?.code;

  if (errorCode === 'UNAUTHORIZED') {
    return (
      <Center height={'100%'} padding={48}>
        <NotFound
          desc={t('sharePage.error.unauthorized.subtitle')}
          status={''}
          title={t('sharePage.error.unauthorized.title')}
        />
      </Center>
    );
  }

  if (errorCode === 'FORBIDDEN') {
    return (
      <Center height={'100%'} padding={48}>
        <NotFound
          desc={t('sharePage.error.forbidden.subtitle')}
          status={403}
          title={t('sharePage.error.forbidden.title')}
        />
      </Center>
    );
  }

  return (
    <Center height={'100%'} padding={48}>
      <NotFound
        desc={t('sharePage.error.notFound.subtitle')}
        title={t('sharePage.error.notFound.title')}
      />
    </Center>
  );
});

ShareErrorView.displayName = 'ShareErrorView';

export default ShareErrorView;
