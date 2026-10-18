'use client';

import { Flexbox, FormGroup } from '@lobehub/ui';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import { SettingsProfileRowSkeleton } from '@/components/Skeleton/Settings/Profile';
import SettingHeader from '@/features/Settings/features/SettingHeader';
import { useServerConfigStore } from '@/store/serverConfig';
import { serverConfigSelectors } from '@/store/serverConfig/selectors';
import { useToolStore } from '@/store/tool';
import { ComposioServerStatus } from '@/store/tool/slices/composioStore';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

import AvatarRow from './features/AvatarRow';
import ComposioAuthorizationList from './features/ComposioAuthorizationList';
import FullNameRow from './features/FullNameRow';
import InterestsRow from './features/InterestsRow';
import ProfileRow from './features/ProfileRow';
import UsernameRow from './features/UsernameRow';

interface ProfileSettingProps {
  showSettingHeader?: boolean;
}

const ProfileSetting = ({ showSettingHeader = true }: ProfileSettingProps) => {
  const isLogin = useUserStore(authSelectors.isLogin);
  const [userProfile, isUserLoaded] = useUserStore((s) => [
    userProfileSelectors.userProfile(s),
    s.isLoaded,
  ]);
  const enableComposio = useServerConfigStore(serverConfigSelectors.enableComposio);
  const [servers, isServersInit, useFetchUserComposioConnections] = useToolStore((s) => [
    s.composioServers,
    s.isComposioServersInit,
    s.useFetchUserComposioConnections,
  ]);
  const connectedServers = servers.filter((s) => s.status === ComposioServerStatus.ACTIVE);

  // Fetch Composio servers
  useFetchUserComposioConnections(enableComposio);

  // Only the core profile rows (avatar / name / username / email) gate on the
  // user record itself. Auth-providers (SSO) and Composio are independent, slower
  // sub-sections that render their own rows when ready — folding them into one
  // composite gate let a single slow/failed dependency skeleton the whole tab.
  const isLoading = !isUserLoaded;

  const { t } = useTranslation('auth');

  return (
    <>
      {showSettingHeader && <SettingHeader title={t('profile.title')} />}
      <FormGroup collapsible={false} gap={16} title={t('profile.account')} variant={'filled'}>
        <Flexbox style={{ display: isLoading ? 'flex' : 'none' }}>
          <SettingsProfileRowSkeleton />
          <Divider style={{ margin: 0 }} />
          <SettingsProfileRowSkeleton />
          <Divider style={{ margin: 0 }} />
          <SettingsProfileRowSkeleton />
          <Divider style={{ margin: 0 }} />
          <SettingsProfileRowSkeleton />
        </Flexbox>
        <Flexbox style={{ display: isLoading ? 'none' : 'flex' }}>
          <AvatarRow />

          <Divider style={{ margin: 0 }} />

          <FullNameRow />

          <Divider style={{ margin: 0 }} />

          <UsernameRow />

          <Divider style={{ margin: 0 }} />

          <InterestsRow />

          {isLogin && userProfile?.email && (
            <>
              <Divider style={{ margin: 0 }} />
            </>
          )}

          {enableComposio && isServersInit && connectedServers.length > 0 && (
            <>
              <Divider style={{ margin: 0 }} />
              <ProfileRow
                anchor={'profile-authorizations'}
                label={t('profile.authorizations.title')}
              >
                <ComposioAuthorizationList servers={connectedServers} />
              </ProfileRow>
            </>
          )}
        </Flexbox>
      </FormGroup>
    </>
  );
};

export default ProfileSetting;
