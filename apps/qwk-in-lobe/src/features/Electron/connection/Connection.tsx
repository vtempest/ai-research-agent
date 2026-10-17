import { Center, Flexbox } from '@lobehub/ui';
import { Drawer } from '@lobehub/ui/base-ui';
import { cssVar } from 'antd-style';
import { Suspense, useCallback } from 'react';

import { BrandTextLoading } from '@/components/Loading';
import UserInfo from '@/features/User/UserInfo';
import { useElectronStore } from '@/store/electron';
import { isMacOS } from '@/utils/platform';

import RemoteStatus from './RemoteStatus';

const isMac = isMacOS();

const Connection = () => {
  const [isOpen, setConnectionDrawerOpen] = useElectronStore((s) => [
    s.isConnectionDrawerOpen,
    s.setConnectionDrawerOpen,
  ]);

  const handleClose = useCallback(() => {
    setConnectionDrawerOpen(false);
  }, [setConnectionDrawerOpen]);

  return (
    <>
      <RemoteStatus
        onClick={() => {
          setConnectionDrawerOpen(true);
        }}
      />
      <Drawer
        noHeader
        height={'100vh'}
        open={isOpen}
        placement={'top'}
        style={{
          background: cssVar.colorBgLayout,
        }}
        styles={{
          bodyContent: { padding: 0 },
          // Clears the Electron title bar, which only overlaps the drawer off macOS.
          extra: { insetBlockStart: isMac ? 12 : 46, insetInlineEnd: 6 },
        }}
        onClose={handleClose}
      >
        <Suspense
          fallback={
            <Center style={{ height: '100%' }}>
              <BrandTextLoading debugId="Connection" />
            </Center>
          }
        >
          <Center style={{ height: '100%', overflow: 'auto', padding: 24 }}>
            <Flexbox style={{ maxWidth: 560, width: '100%' }}>
              {/* There is no sign-in: the connection drawer just shows who the app runs as. */}
              <UserInfo />
            </Flexbox>
          </Center>
        </Suspense>
      </Drawer>
    </>
  );
};

export default Connection;
