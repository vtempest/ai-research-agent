import { Flexbox } from '@lobehub/ui';
import { type FC } from 'react';

import BusinessPanelContent from '@/business/client/features/User/BusinessPanelContent';
import UserPanelAccountSection from '@/business/client/features/User/UserPanelAccountSection';
import UserPanelStatistics from '@/business/client/features/User/UserPanelStatistics';
import UserPanelWorkspaceSection from '@/business/client/features/User/UserPanelWorkspaceSection';
import Menu, { type MenuProps } from '@/components/Menu';
import UserInfo from '@/features/User/UserInfo';
import { serverConfigSelectors, useServerConfigStore } from '@/store/serverConfig';

import { useMenu } from './useMenu';

const PanelContent: FC<{ closePopover: () => void }> = ({ closePopover }) => {
  const enableBusinessFeatures = useServerConfigStore(serverConfigSelectors.enableBusinessFeatures);
  const { mainItems } = useMenu();

  const handleMenuClick: MenuProps['onClick'] = () => {
    closePopover();
  };

  return (
    <Flexbox gap={2} style={{ minWidth: 300 }}>
      <UserInfo avatarProps={{ clickable: false }} />
      <UserPanelStatistics />
      {enableBusinessFeatures && <BusinessPanelContent />}
      <UserPanelWorkspaceSection onSwitch={closePopover} />

      <Menu items={mainItems ?? []} onClick={handleMenuClick} />

      <UserPanelAccountSection onNavigate={closePopover} />
    </Flexbox>
  );
};

export default PanelContent;
