'use client';

import { Flexbox } from '@lobehub/ui';
import { memo } from 'react';

import DataStatistics from '@/features/User/DataStatistics';
import UserInfo from '@/features/User/UserInfo';
import WorkspaceLink from '@/features/Workspace/WorkspaceLink';

const UserBanner = memo(() => {
  return (
    <Flexbox gap={12} paddingBlock={8}>
      <WorkspaceLink style={{ color: 'inherit' }} to="/settings/profile">
        <UserInfo />
      </WorkspaceLink>
      <WorkspaceLink style={{ color: 'inherit' }} to="/settings/stats">
        <DataStatistics paddingInline={12} />
      </WorkspaceLink>
    </Flexbox>
  );
});

export default UserBanner;
