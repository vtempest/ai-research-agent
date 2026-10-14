'use client';

import { createModal, useModalContext } from '@lobehub/ui/base-ui';
import { t } from 'i18next';

import GuestKeyForm from './GuestKeyForm';

const GuestKeyModalContent = ({ onSaved }: { onSaved?: () => void }) => {
  const { close } = useModalContext();

  return (
    <GuestKeyForm
      onSaved={() => {
        close();
        onSaved?.();
      }}
    />
  );
};

export const createGuestKeyModal = (onSaved?: () => void) =>
  createModal({
    content: <GuestKeyModalContent onSaved={onSaved} />,
    footer: null,
    maskClosable: true,
    title: t('guestKey.title', { ns: 'qwksearch' }),
    width: 'min(92vw, 480px)',
  });
